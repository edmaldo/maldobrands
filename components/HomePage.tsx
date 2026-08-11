"use client";

import { useState } from "react";

import Header from "./layout/Header";
import OutfitGallery from "./outfit/OutfitGallery";
import OutfitDetailModal from "./outfit/OutfitDetailModal";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Women");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <OutfitGallery
        category={selectedCategory}
        onSelectOutfit={() => setIsModalOpen(true)}
      />

      <OutfitDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
