import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import StoryReader from "@/components/story/StoryReader";

type Genre = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  vendor: string;
  product_url: string;
};

type OutfitItem = {
  id: string;
  position: number;
  products: Product | Product[] | null;
};

type Outfit = {
  id: string;
  title: string;
  description: string | null;
  image_path: string | null;
  outfit_items: OutfitItem[];
};

type StoryGenre = {
  genres: Genre | Genre[] | null;
};

type StoryScene = {
  id: string;
  scene_number: number;
  image: string | null;
  caption: string | null;
  dialogue: string | null;
  outfit_id: string | null;
};

type Story = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  status: string;
  story_genres: StoryGenre[];
  story_scenes: StoryScene[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: storyData, error: storyError } = await supabase
    .from("stories")
    .select(
      `
        id,
        title,
        slug,
        description,
        cover_image,
        status,
        story_genres (
          genres (
            id,
            name,
            slug
          )
        ),
        story_scenes (
          id,
          scene_number,
          image,
          caption,
          dialogue,
          outfit_id
        )
      `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (storyError || !storyData) {
    notFound();
  }

  const story = storyData as Story;

  /*
   * Sort scenes.
   */
  const rawScenes = [...(story.story_scenes ?? [])].sort(
    (a, b) => a.scene_number - b.scene_number,
  );

  /*
   * Resolve story images on the server.
   */
  const scenes = rawScenes.map((scene) => {
    let imageUrl: string | null = null;

    if (scene.image) {
      if (
        scene.image.startsWith("http://") ||
        scene.image.startsWith("https://")
      ) {
        imageUrl = scene.image;
      } else {
        imageUrl = supabase.storage
          .from("story-images")
          .getPublicUrl(scene.image).data.publicUrl;
      }
    }

    return {
      ...scene,
      image: imageUrl,
    };
  });

  /*
   * Find all outfits used by the story.
   */
  const outfitIds = [
    ...new Set(
      scenes
        .map((scene) => scene.outfit_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  let outfits: Outfit[] = [];

  if (outfitIds.length > 0) {
    const { data: outfitData } = await supabase
      .from("outfits")
      .select(
        `
        id,
        title,
        description,
        image_path,
        outfit_items (
          id,
          position,
          products (
            id,
            name,
            vendor,
            product_url
          )
        )
      `,
      )
      .in("id", outfitIds);

    outfits = (outfitData ?? []) as Outfit[];
  }

  /*
   * Flatten genres.
   */
  const genres =
    story.story_genres?.flatMap((storyGenre) => {
      if (!storyGenre.genres) return [];

      return Array.isArray(storyGenre.genres)
        ? storyGenre.genres
        : [storyGenre.genres];
    }) ?? [];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* ==========================================
          GZM HEADER
          ========================================== */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          {/* GZM Monogram */}
          <Link
            href="/"
            aria-label="GZM Fashion home"
            className="gzm-logo relative block h-[58px] w-[90px] shrink-0"
          >
            <span className="gzm-g">G</span>
            <span className="gzm-z">Z</span>
            <span className="gzm-m">M</span>
          </Link>

          {/* Story genres */}
          <div className="hidden items-center gap-3 sm:flex">
            {genres.map((genre, index) => (
              <div key={genre.id} className="flex items-center gap-3">
                {index > 0 && <span className="text-neutral-300">/</span>}

                <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500">
                  {genre.name}
                </span>
              </div>
            ))}
          </div>

          {/* Back */}
          <Link
            href="/"
            className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 transition hover:text-neutral-900"
          >
            All Stories
          </Link>
        </div>
      </header>

      {/* ==========================================
          COMPACT STORY INTRO
          ========================================== */}
      <section className="border-b border-neutral-200 px-6 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {genres.length > 0 && (
                <div className="mb-2 flex items-center gap-3">
                  {genres.map((genre, index) => (
                    <div key={genre.id} className="flex items-center gap-3">
                      {index > 0 && <span className="text-neutral-300">/</span>}

                      <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
                        {genre.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-light tracking-tight text-neutral-900 sm:text-4xl">
                {story.title}
              </h1>
            </div>

            {story.description && (
              <p className="max-w-md text-sm font-light leading-6 text-neutral-500 sm:text-right">
                {story.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          STORY READER
          ========================================== */}
      <StoryReader title={story.title} scenes={scenes} outfits={outfits} />

      {/* ==========================================
          END
          ========================================== */}
      <section className="border-t border-neutral-200 px-6 py-24 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
          The End
        </p>

        <h2 className="mt-4 text-2xl font-light text-neutral-900 sm:text-3xl">
          More stories await.
        </h2>

        <Link
          href="/"
          className="mt-7 inline-block border border-neutral-300 px-6 py-3 text-[9px] uppercase tracking-[0.25em] text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
        >
          Explore GZM
        </Link>
      </section>
    </main>
  );
}
