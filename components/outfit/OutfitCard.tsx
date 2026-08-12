import { Outfit } from "@/data/demoOutfits";

type OutfitCardProps = {
  outfit: Outfit;
  onClick: () => void;
};

export default function OutfitCard({ outfit, onClick }: OutfitCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={outfit.image}
          alt={outfit.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/30" />

        <div className="absolute bottom-0 p-6 text-white opacity-0 transition duration-300 group-hover:opacity-100">
          <h3 className="text-xl font-semibold">{outfit.title}</h3>

          <p className="mt-2 text-sm">View Outfit →</p>
        </div>
      </div>
    </div>
  );
}
