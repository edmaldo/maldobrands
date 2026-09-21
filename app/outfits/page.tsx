"use client";

import { useEffect, useState } from "react";

import OutfitHeader from "@/components/layout/OutfitHeader";
import OutfitGallery from "@/components/outfit/OutfitGallery";
import OutfitDetailModal, {
  type Outfit,
} from "@/components/outfit/OutfitDetailModal";

import { createClient } from "@/lib/supabase/client";

export default function AllOutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
   * Load all outfits from Supabase
   */
  useEffect(() => {
    async function loadOutfits() {
      const supabase = createClient();

      setLoading(true);
      setError(null);

      const { data, error } = await supabase
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
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading outfits:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      /*
       * Convert Supabase data into the Outfit
       * shape expected by our components.
       */
      const formattedOutfits: Outfit[] = (data ?? []).map((outfit) => {
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

      const sharedOutfitId = new URLSearchParams(window.location.search).get(
        "outfit",
      );

      if (sharedOutfitId) {
        const sharedOutfit = formattedOutfits.find(
          (outfit) => outfit.id === sharedOutfitId,
        );

        if (sharedOutfit) {
          setSelectedOutfit(sharedOutfit);
        }
      }
    }

    loadOutfits();
  }, []);

  /*
   * Open outfit modal
   */
  const handleSelectOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
  };

  /*
   * Close outfit modal
   */
  const handleCloseModal = () => {
    setSelectedOutfit(null);
  };

  return (
    <>
      <OutfitHeader />

      <main className="min-h-screen bg-neutral-50">
        {/* Page Header */}
        <section className="mx-auto max-w-7xl px-8 pb-4 pt-16">
          <div className="flex items-center justify-between gap-8">
            {/* Title */}
            <div className="flex shrink-0 items-center gap-5">
              <h1 className="text-3xl font-light uppercase tracking-[0.35em] text-neutral-800">
                Outfits
              </h1>

              <span className="h-5 w-px bg-neutral-300" />

              <p className="text-base leading-6 text-neutral-500">
                A curated collection
              </p>
            </div>

            {/* Header Advertisement */}
            <div className="hidden min-h-[70px] flex-1 items-center justify-center border border-neutral-200 bg-white lg:flex">
              <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
                Advertisement
              </span>
            </div>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <p className="text-sm text-neutral-400">Loading looks...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex min-h-[50vh] items-center justify-center px-6">
            <div className="text-center">
              <p className="text-sm text-red-500">Unable to load outfits.</p>

              <p className="mt-2 text-xs text-neutral-400">{error}</p>
            </div>
          </div>
        )}

        {/* Gallery */}
        {!loading && !error && (
          <OutfitGallery
            category=""
            outfits={outfits}
            onSelectOutfit={handleSelectOutfit}
          />
        )}

        {/* Outfit Modal */}
        <OutfitDetailModal
          outfit={selectedOutfit}
          isOpen={selectedOutfit !== null}
          onClose={handleCloseModal}
        />
      </main>
    </>
  );
}
