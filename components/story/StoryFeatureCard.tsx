import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export type StoryFeatureCardStory = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  story_genres?: {
    genres:
      | {
          id: string;
          name: string;
          slug: string;
        }
      | {
          id: string;
          name: string;
          slug: string;
        }[]
      | null;
  }[];
};

type StoryFeatureCardProps = {
  story: StoryFeatureCardStory;
};

export default function StoryFeatureCard({ story }: StoryFeatureCardProps) {
  const supabase = createClient();

  const coverImageUrl = story.cover_image
    ? supabase.storage.from("story-hero").getPublicUrl(story.cover_image).data
        .publicUrl
    : null;

  const genres =
    story.story_genres?.flatMap((storyGenre) => {
      if (!storyGenre.genres) return [];

      return Array.isArray(storyGenre.genres)
        ? storyGenre.genres
        : [storyGenre.genres];
    }) ?? [];

  return (
    <Link href={`/story/${story.slug}`} className="group block">
      {/* Story Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={story.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              GZM
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/[0.04]" />
      </div>

      {/* Story Information */}
      <div className="mt-5">
        {genres.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
            {genres.map((genre) => (
              <span
                key={genre.id}
                className="text-[10px] uppercase tracking-[0.2em] text-neutral-400"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-light tracking-tight text-neutral-900 transition group-hover:text-neutral-500 sm:text-3xl">
          {story.title}
        </h2>

        {story.description && (
          <p className="mt-3 max-w-xl text-sm font-light leading-6 text-neutral-500">
            {story.description}
          </p>
        )}

        <div className="mt-5 text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-neutral-900">
          Read story →
        </div>
      </div>
    </Link>
  );
}
