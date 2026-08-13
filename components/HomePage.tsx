"use client";

import { useEffect, useState } from "react";

import Header from "./layout/Header";
import OutfitGallery from "./outfit/OutfitGallery";
import OutfitDetailModal, { type Outfit } from "./outfit/OutfitDetailModal";

import { createClient } from "@/lib/supabase/client";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Explore GZM");

  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /*
   * Get outfits from Supabase
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
       * Convert the Supabase data into the
       * shape our React components expect.
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
    }

    loadOutfits();
  }, []);

  /*
   * User clicks an outfit card
   */
  const handleSelectOutfit = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
  };

  /*
   * User closes the modal
   */
  const handleCloseModal = () => {
    setSelectedOutfit(null);
  };

  /*
   * Filter outfits by category.
   *
   * "Explore GZM" shows everything.
   */
  const filteredOutfits =
    selectedCategory === "Explore GZM"
      ? outfits
      : outfits.filter((outfit) => outfit.category === selectedCategory);

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

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
          category={selectedCategory}
          outfits={filteredOutfits}
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
  );
}
