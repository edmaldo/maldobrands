import StoryCard, { type StoryCardPart } from "./StoryCard";

type StoryGalleryProps = {
  storySlug: string;
  parts: StoryCardPart[];
};

export default function StoryGallery({ storySlug, parts }: StoryGalleryProps) {
  if (parts.length === 0) {
    return null;
  }

  const sortedParts = [...parts].sort((a, b) => a.part_number - b.part_number);

  return (
    <section className="w-full">
      <div className="story-scrollbar flex gap-5 overflow-x-auto px-5 pb-7 sm:px-8">
        {sortedParts.map((part) => (
          <StoryCard key={part.id} part={part} storySlug={storySlug} />
        ))}
      </div>
    </section>
  );
}
