"use client";

import Link from "next/link";

export default function LegalHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center px-5 py-5 sm:px-8 sm:py-6">
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

          <span className="hidden sm:block text-[11px] font-light uppercase tracking-[0.45em] text-neutral-800">
            Curated Looks
          </span>
        </div>
      </div>
    </header>
  );
}
