"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

type Genre = {
  label: string;
  value: string;
};

type HeaderProps = {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
};

const genres: Genre[] = [
  { label: "Fantasy", value: "fantasy" },
  { label: "Comedy", value: "comedy" },
  { label: "Adventure", value: "adventure" },
  { label: "Romance", value: "romance" },
  { label: "Mystery", value: "mystery" },
  { label: "Slice of Life", value: "slice-of-life" },
];

export default function Header({ selectedGenre, onGenreChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  const genreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        genreRef.current &&
        !genreRef.current.contains(event.target as Node)
      ) {
        setGenreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenreChange = (genre: string) => {
    onGenreChange(genre);
    setGenreOpen(false);
    setMenuOpen(false);
  };

  const handleAllStories = () => {
    onGenreChange("all");
    setGenreOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleAllStories}
            aria-label="Explore GZM stories"
            className="gzm-logo cursor-pointer"
          >
            <span className="gzm-g">G</span>
            <span className="gzm-z">Z</span>
            <span className="gzm-m">M</span>
          </button>

          <div className="hidden sm:block">
            <span className="text-[11px] font-light uppercase tracking-[0.45em] text-neutral-800">
              Stories Worth Wearing
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center md:flex">
          {/* Genres Dropdown */}
          <div ref={genreRef} className="relative">
            <button
              type="button"
              onClick={() => setGenreOpen(!genreOpen)}
              aria-expanded={genreOpen}
              className="flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-neutral-700 transition hover:text-black"
            >
              <span>
                {selectedGenre === "all"
                  ? "Genres"
                  : (genres.find((genre) => genre.value === selectedGenre)
                      ?.label ?? "Genres")}
              </span>

              <ChevronDown
                size={15}
                strokeWidth={1.5}
                className={`transition-transform ${
                  genreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {genreOpen && (
              <div className="absolute right-0 top-full mt-4 w-52 border border-neutral-200 bg-white py-2 shadow-sm">
                <button
                  type="button"
                  onClick={handleAllStories}
                  className={`block w-full px-5 py-3 text-left text-xs uppercase tracking-[0.15em] transition ${
                    selectedGenre === "all"
                      ? "text-black"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  All Stories
                </button>

                <div className="my-1 border-t border-neutral-100" />

                {genres.map((genre) => {
                  const isActive = selectedGenre === genre.value;

                  return (
                    <button
                      key={genre.value}
                      type="button"
                      onClick={() => handleGenreChange(genre.value)}
                      className={`block w-full px-5 py-3 text-left text-xs uppercase tracking-[0.15em] transition ${
                        isActive
                          ? "text-black"
                          : "text-neutral-500 hover:text-black"
                      }`}
                    >
                      {genre.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Divider */}
          <span aria-hidden="true" className="mx-5 h-5 w-px bg-neutral-300" />

          {/* All Outfits */}
          <Link
            href="/outfits"
            className="text-sm uppercase tracking-[0.15em] text-neutral-700 transition hover:text-black"
          >
            All Outfits
          </Link>
        </nav>

        {/* Mobile Menu */}
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
            {/* All Stories */}
            <button
              type="button"
              onClick={handleAllStories}
              className={`border-b border-neutral-100 py-4 text-left text-sm uppercase tracking-[0.18em] transition ${
                selectedGenre === "all"
                  ? "text-black"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              All Stories
            </button>

            {/* Genres */}
            <div className="py-3">
              <p className="mb-1 py-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Genres
              </p>

              {genres.map((genre) => {
                const isActive = selectedGenre === genre.value;

                return (
                  <button
                    key={genre.value}
                    type="button"
                    onClick={() => handleGenreChange(genre.value)}
                    className={`block w-full py-3 text-left text-sm uppercase tracking-[0.15em] transition ${
                      isActive
                        ? "text-black"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    {genre.label}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200 pt-2">
              <Link
                href="/outfits"
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-sm uppercase tracking-[0.18em] text-neutral-700 transition hover:text-black"
              >
                All Outfits
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
