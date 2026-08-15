import OutfitCard from "./OutfitCard";
import type { Outfit } from "./OutfitDetailModal";

type OutfitGalleryProps = {
  category: string;
  outfits: Outfit[];
  onSelectOutfit: (outfit: Outfit) => void;
};

export default function OutfitGallery({
  category,
  outfits,
  onSelectOutfit,
}: OutfitGalleryProps) {
  return (
    <section className="mx-auto max-w-7xl px-8 py-12">
      <h2 className="mb-8 ont-light uppercase tracking-[0.45em] text-neutral-700">
        {category}
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {outfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            onClick={() => onSelectOutfit(outfit)}
          />
        ))}
      </div>
    </section>
  );
}
