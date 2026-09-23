"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 sm:py-2">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label="GZM Fashion home"
            className="gzm-logo"
            onClick={() => setMenuOpen(false)}
          >
            <span className="gzm-g">G</span>
            <span className="gzm-z">Z</span>
            <span className="gzm-m">M</span>
          </Link>

          <div className="hidden sm:block">
            <span className="text-[11px] font-light uppercase tracking-[0.45em] text-neutral-800">
              Stories Worth Wearing
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-5 md:flex">
          <Link
            href="/stories"
            className="text-sm uppercase tracking-[0.15em] text-neutral-700 transition hover:text-black"
          >
            Stories
          </Link>

          <span aria-hidden="true" className="text-neutral-300">
            |
          </span>

          <Link
            href="/outfits"
            className="text-sm uppercase tracking-[0.15em] text-neutral-700 transition hover:text-black"
          >
            Outfits
          </Link>
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
            <Link
              href="/stories"
              onClick={() => setMenuOpen(false)}
              className="border-b border-neutral-100 py-4 text-sm uppercase tracking-[0.18em] text-neutral-700 transition hover:text-black"
            >
              Stories
            </Link>

            <Link
              href="/outfits"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-sm uppercase tracking-[0.18em] text-neutral-700 transition hover:text-black"
            >
              Outfits
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
