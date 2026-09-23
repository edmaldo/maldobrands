import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export type StoryCardPart = {
  id: string;
  story_id: string;
  part_number: number;
  caption: string | null;
  cover_image: string | null;
};

type StoryCardProps = {
  part: StoryCardPart;
  storySlug: string;
};

export default function StoryCard({ part, storySlug }: StoryCardProps) {
  const supabase = createClient();

  const coverImageUrl = part.cover_image
    ? supabase.storage.from("story-parts").getPublicUrl(part.cover_image).data
        .publicUrl
    : null;

  return (
    <Link
      href={`/story/${storySlug}?part=${part.part_number}`}
      className="group block w-[180px] shrink-0 sm:w-[200px] lg:w-[220px]"
    >
      {/* 9:16 Story Part Image */}
      <div className="relative aspect-[9/16] overflow-hidden bg-neutral-200">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={part.caption ? part.caption : `Part ${part.part_number}`}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              GZM
            </span>
          </div>
        )}

        {/* Subtle hover overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/[0.04]" />
      </div>

      {/* Part Information */}
      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          Part {part.part_number}
        </div>

        {part.caption && (
          <p className="mt-2 text-sm font-light leading-5 text-neutral-700">
            {part.caption}
          </p>
        )}
      </div>
    </Link>
  );
}
