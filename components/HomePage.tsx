"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Header from "@/components/layout/Header";
import StoryFeatureCard, {
  type StoryFeatureCardStory,
} from "@/components/story/StoryFeatureCard";

import OutfitCard from "@/components/outfit/OutfitCard";
import OutfitDetailModal, {
  type Outfit,
} from "@/components/outfit/OutfitDetailModal";

import { createClient } from "@/lib/supabase/client";

type Genre = {
  id: string;
  name: string;
  slug: string;
};

type StoryGenre = {
  genres: Genre | Genre[] | null;
};

type Story = StoryFeatureCardStory & {
  status: string;
  created_at: string;
  story_genres: StoryGenre[];
};

export default function HomePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomepage() {
      const supabase = createClient();

      setLoading(true);

      /*
       * =========================
       * STORIES
       * =========================
       */

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
          created_at,
          story_genres (
            genres (
              id,
              name,
              slug
            )
          )
        `,
        )
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);

      if (storyError) {
        console.error("Error loading homepage stories:", storyError);
      }

      setStories((storyData ?? []) as Story[]);

      /*
       * =========================
       * OUTFITS
       * =========================
       */

      const { data: outfitData, error: outfitError } = await supabase
        .from("outfits")
        .select(
          `
          id,
          title,
          description,
          image_path,
          category,
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
        .order("created_at", { ascending: false })
        .limit(6);

      if (outfitError) {
        console.error("Error loading homepage outfits:", outfitError);
      }

      /*
       * Convert Supabase outfits into the
       * shape expected by OutfitCard / Modal.
       */
      const formattedOutfits: Outfit[] = (outfitData ?? []).map((outfit) => {
        const imageUrl = supabase.storage
          .from("outfit-images")
          .getPublicUrl(outfit.image_path).data.publicUrl;

        const items =
          outfit.outfit_items
            ?.map((item) => {
              if (!item.products) return null;

              const product = Array.isArray(item.products)
                ? item.products[0]
                : item.products;

              if (!product) return null;

              return {
                id: product.id,
                name: product.name,
                vendor: product.vendor,
                productUrl: product.product_url,
                position: item.position,
              };
            })
            .filter(
              (
                item,
              ): item is {
                id: string;
                name: string;
                vendor: string;
                productUrl: string;
                position: number;
              } => item !== null,
            ) ?? [];

        return {
          id: outfit.id,
          title: outfit.title,
          description: outfit.description,
          image: imageUrl,
          category: outfit.category,
          items,
        };
      });

      setOutfits(formattedOutfits);
      setLoading(false);
    }

    loadHomepage();
  }, []);

  return (
    <main className="min-h-screen bg-[#faf9f6] text-neutral-900">
      <Header />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:min-h-[650px] lg:grid-cols-[0.82fr_1.18fr]">
          {/* Hero Copy */}
          <div className="order-2 flex flex-col items-center justify-center px-6 py-12 text-center sm:px-10 lg:order-1 lg:items-start lg:px-16 lg:py-10 lg:text-left xl:px-20">
            <h1 className="font-editorial max-w-xl text-5xl font-normal leading-[0.9] tracking-[-0.045em] text-neutral-900 sm:text-6xl lg:text-[6.2rem]">
              Fashion
              <br />
              lives in
              <br />
              stories.
            </h1>

            <div className="mt-6 max-w-md">
              <p className="text-lg font-normal leading-7 text-neutral-700 sm:text-xl">
                Contemporary looks.
                <br />
                Imagined worlds.
                <br />
                Real style.
              </p>
            </div>

            <Link
              href="/stories"
              className="mt-8 inline-flex w-fit items-center gap-4 border-b border-neutral-900 pb-2 text-[10px] uppercase tracking-[0.3em] text-neutral-900 transition hover:gap-6"
            >
              Explore Stories
              <span className="text-base">→</span>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="order-1 relative h-[72vh] min-h-[420px] max-h-[680px] bg-neutral-200 lg:order-2 lg:h-auto lg:min-h-0 lg:max-h-none">
            <img
              src="/images/gzm-hero.png"
              alt="GZM fashion editorial"
              className="h-full w-full object-cover"
            />

            {/* Editorial side labels */}
            <div className="absolute right-6 top-8 hidden sm:block">
              <div className="flex flex-col gap-3 text-[9px] uppercase tracking-[0.35em] text-white drop-shadow-md">
                <span>Characters</span>
                <span>Outfits</span>
                <span>Ideas</span>
                <span>A more stylish</span>
                <span>point of view</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================
          HOW GZM WORKS
      ====================================================== */}

      <section className="border-b border-neutral-200 bg-[#faf9f6] px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex items-center justify-center">
            <div className="flex w-full max-w-[700px] items-center justify-center gap-5">
              <span className="h-px w-16 shrink-0 bg-neutral-300" />

              <h2 className="font-editorial whitespace-nowrap text-center text-sm uppercase tracking-[0.35em] text-neutral-800">
                How GZM Works
              </h2>

              <span className="h-px w-16 shrink-0 bg-neutral-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Step 1 */}
            <div className="px-6 text-center md:border-r md:border-neutral-200">
              <span className="text-[10px] tracking-[0.35em] text-neutral-400">
                01
              </span>

              <h3 className="font-editorial mt-4 text-2xl font-normal uppercase tracking-[0.08em]">
                Read the Story
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-sm font-light leading-6 text-neutral-500">
                Step into new worlds through original stories and characters.
              </p>

              <div className="mt-7 text-3xl font-light text-neutral-500">♧</div>
            </div>

            {/* Step 2 */}
            <div className="px-6 py-10 text-center md:border-r md:border-neutral-200 md:py-0">
              <span className="text-[10px] tracking-[0.35em] text-neutral-400">
                02
              </span>

              <h3 className="font-editorial mt-4 text-2xl font-normal uppercase tracking-[0.08em]">
                Discover the Looks
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-sm font-light leading-6 text-neutral-500">
                Explore the outfits from each story, curated in detail.
              </p>

              <div className="mt-7 text-3xl font-light text-neutral-500">♧</div>
            </div>

            {/* Step 3 */}
            <div className="px-6 text-center">
              <span className="text-[10px] tracking-[0.35em] text-neutral-400">
                03
              </span>

              <h3 className="font-editorial mt-4 text-2xl font-normal uppercase tracking-[0.08em]">
                Shop the Pieces
              </h3>

              <p className="mx-auto mt-4 max-w-xs text-sm font-light leading-6 text-neutral-500">
                Shop the styles through our curated vendor links.
              </p>

              <div className="mt-7 text-3xl font-light text-neutral-500">♧</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED STORIES
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-editorial text-xl uppercase tracking-[0.45em] text-neutral-800 sm:text-2xl">
            Featured Stories
          </h2>

          <Link
            href="/stories"
            className="hidden text-[9px] uppercase tracking-[0.3em] text-neutral-500 transition hover:text-black sm:block"
          >
            View All Stories →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-[4/5] animate-pulse bg-neutral-200"
              />
            ))}
          </div>
        ) : stories.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {stories.map((story) => (
              <StoryFeatureCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="border-t border-neutral-200 py-16 text-center">
            <p className="text-sm text-neutral-400">No featured stories yet.</p>
          </div>
        )}

        <Link
          href="/stories"
          className="mt-8 block text-[9px] uppercase tracking-[0.3em] text-neutral-500 sm:hidden"
        >
          View All Stories →
        </Link>
      </section>

      {/* =====================================================
          FEATURED OUTFITS
      ====================================================== */}

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-editorial text-xl uppercase tracking-[0.45em] text-neutral-800 sm:text-2xl">
              Featured Outfits
            </h2>

            <Link
              href="/outfits"
              className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 transition hover:text-black"
            >
              View All Outfits →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-[3/4] animate-pulse bg-neutral-200"
                />
              ))}
            </div>
          ) : outfits.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {outfits.map((outfit) => (
                <div key={outfit.id}>
                  <OutfitCard
                    outfit={outfit}
                    onClick={() => setSelectedOutfit(outfit)}
                  />

                  <p className="mt-3 text-[9px] uppercase tracking-[0.22em] text-neutral-500">
                    {outfit.title}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-t border-neutral-200 py-16 text-center">
              <p className="text-sm text-neutral-400">
                No featured outfits yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BRAND STATEMENT
      ====================================================== */}

      <section className="border-t border-neutral-200">
        <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-2">
          {/* Statement */}
          <div className="relative flex items-center overflow-hidden bg-[#e9e4dc] px-8 py-20 sm:px-14 lg:px-16">
            <div className="absolute -left-20 top-0 h-full w-1/2 rotate-[25deg] bg-white/20 blur-3xl" />

            <div className="relative z-10 max-w-xl">
              <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-500">
                More Than Outfits
              </p>

              <h2 className="font-editorialmt-6 text-5xl font-normal leading-[0.95] tracking-[-0.04em] text-neutral-900 sm:text-6xl">
                A world of
                <br />
                style and ideas.
              </h2>

              <div className="mt-7 h-px w-12 bg-neutral-700" />

              <p className="font-editorial mt-7 max-w-md text-lg leading-7 text-neutral-700">
                GZM blends fashion, storytelling, and culture for a more
                inspired way to see style.
              </p>

              <Link
                href="/stories"
                className="mt-9 inline-flex items-center gap-4 border-b border-neutral-700 pb-2 text-[9px] uppercase tracking-[0.3em] text-neutral-800 transition hover:gap-6"
              >
                Explore the Universe
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>

          {/* Statement Image */}
          <div className="relative min-h-[420px] bg-neutral-200">
            <img
              src="/images/gzm-world.png"
              alt="GZM fashion world"
              className="h-full w-full object-cover"
            />

            <div className="absolute right-7 top-8 flex flex-col gap-3 text-[9px] uppercase tracking-[0.35em] text-white drop-shadow-md">
              <span>Different</span>
              <span>Characters</span>
              <span>Different Places</span>
              <span>A Common</span>
              <span>Obsession</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUTFIT MODAL
      ====================================================== */}

      <OutfitDetailModal
        outfit={selectedOutfit}
        isOpen={selectedOutfit !== null}
        onClose={() => setSelectedOutfit(null)}
      />
    </main>
  );
}
