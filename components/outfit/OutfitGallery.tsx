import OutfitCard from "./OutfitCard";
import { demoOutfits } from "@/data/demoOutfits";

type OutfitGalleryProps = {
  category: string;
  onSelectOutfit: () => void;
};

export default function OutfitGallery({
  category,
  onSelectOutfit,
}: OutfitGalleryProps) {
  return (
    <section className="mx-auto max-w-7xl px-8 py-12">
      <h2 className="serif-gray-header mb-10 text-4xl">{category}</h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {demoOutfits.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            outfit={outfit}
            onClick={onSelectOutfit}
          />
        ))}
      </div>
    </section>
  );
}
