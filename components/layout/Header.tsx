"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

type HeaderProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  "Cool",
  "Spring/Summer",
  "Fall/Winter",
  "Luxury",
  "Business",
];

export default function Header({
  selectedCategory,
  onCategoryChange,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      {/* Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <div className="gzm-logo" aria-label="GZM">
          <span className="gzm-g">G</span>
          <span className="gzm-z">Z</span>
          <span className="gzm-m">M</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`text-sm uppercase tracking-[0.15em] transition ${
                  isActive ? "text-black" : "text-neutral-500 hover:text-black"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex items-center justify-center p-1 text-black md:hidden"
        >
          {menuOpen ? (
            <X size={25} strokeWidth={1.5} />
          ) : (
            <Menu size={25} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-neutral-200 bg-white px-5 py-6 md:hidden">
          <div className="flex flex-col">
            {categories.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`border-b border-neutral-100 py-4 text-left text-sm uppercase tracking-[0.18em] transition last:border-b-0 ${
                    isActive
                      ? "text-black"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
