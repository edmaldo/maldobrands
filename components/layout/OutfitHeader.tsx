"use client";

import Link from "next/link";

export default function OutfitHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label="Explore all GZM looks"
            className="gzm-logo cursor-pointer"
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

        {/* Right: Home */}
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.15em] text-neutral-700 transition hover:text-black"
        >
          Home
        </Link>
      </div>
    </header>
  );
}
