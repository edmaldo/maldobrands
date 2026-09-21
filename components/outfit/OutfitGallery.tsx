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
      {category && (
        <h2 className="mb-8 font-light uppercase tracking-[0.45em] text-neutral-700">
          {category}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {outfits.map((outfit, index) => (
          <div key={outfit.id} className="contents">
            <OutfitCard
              outfit={outfit}
              onClick={() => onSelectOutfit(outfit)}
            />

            {/* Advertisement after every 3 outfits */}
            {(index + 1) % 3 === 0 && (
              <div className="col-span-1 flex min-h-[90px] items-center justify-center border border-neutral-200 bg-white sm:col-span-2 lg:col-span-3">
                <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
                  Advertisement
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
