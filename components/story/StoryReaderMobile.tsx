"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export type StoryReaderMobileProduct = {
  id: string;
  name: string;
  vendor: string;
  productUrl: string;
  position: number;
};

export type StoryReaderMobileOutfit = {
  id: string;
  title: string;
  image: string;
  items: StoryReaderMobileProduct[];
};

export type StoryReaderMobilePart = {
  id: string;
  story_id: string;
  part_number: number;
  caption: string | null;
  cover_image: string | null;
  video_url?: string | null;
  outfits?: StoryReaderMobileOutfit[];
};

export type StoryReaderMobileStory = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
};

type StoryReaderMobileProps = {
  story: StoryReaderMobileStory;
  parts: StoryReaderMobilePart[];
};

export default function StoryReaderMobile({
  story,
  parts,
}: StoryReaderMobileProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sortedParts = [...parts].sort((a, b) => a.part_number - b.part_number);

  const [activeIndex, setActiveIndex] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);

  const activePart = sortedParts[activeIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToPart(activeIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        goToPart(activeIndex - 1);
      }

      if (event.key === "Escape") {
        setShopOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const goToPart = (index: number) => {
    const container = scrollRef.current;

    if (!container) return;

    const safeIndex = Math.min(Math.max(index, 0), sortedParts.length - 1);

    container.scrollTo({
      left: safeIndex * container.clientWidth,
      behavior: "smooth",
    });

    setActiveIndex(safeIndex);
  };

  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);

    setActiveIndex(Math.min(Math.max(index, 0), sortedParts.length - 1));
  };

  if (sortedParts.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="px-6 py-20 text-center">
          <p className="text-sm text-neutral-400">
            This story doesn't have any parts yet.
          </p>

          <Link
            href="/stories"
            className="mt-6 inline-block text-[10px] uppercase tracking-[0.25em] text-neutral-700"
          >
            ← Back to Stories
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      {/* Header */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[68px] items-center justify-between px-5">
        <Link
          href="/stories"
          aria-label="Back to stories"
          className="pointer-events-auto rounded-full p-2 text-white/90 backdrop-blur-sm transition hover:bg-white/10"
        >
          <ChevronLeft size={21} strokeWidth={1.4} />
        </Link>

        <div className="flex text-center text-white">
          <span className="gzm-g">G</span>
          <span className="gzm-z">Z</span>
          <span className="gzm-m">M</span>
        </div>

        <Link
          href="/stories"
          aria-label="Close story"
          className="pointer-events-auto rounded-full p-2 text-white/90 backdrop-blur-sm transition hover:bg-white/10"
        >
          <X size={20} strokeWidth={1.4} />
        </Link>
      </header>

      {/* Story progress */}
      <div className="pointer-events-none absolute inset-x-0 top-[58px] z-30 flex gap-1.5 px-5">
        {sortedParts.map((part, index) => (
          <div
            key={part.id}
            className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/30"
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                index <= activeIndex ? "w-full bg-white" : "w-0"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Story media */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none"
      >
        {sortedParts.map((part) => (
          <section
            key={part.id}
            className="relative h-full min-w-full shrink-0 snap-center bg-neutral-950"
          >
            {part.video_url ? (
              <video
                src={part.video_url}
                poster={
                  part.cover_image
                    ? getStoryPartImage(part.cover_image)
                    : undefined
                }
                className="h-full w-full object-cover"
                controls
                playsInline
              />
            ) : part.cover_image ? (
              <img
                src={getStoryPartImage(part.cover_image)}
                alt={part.caption || `Part ${part.part_number}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                  GZM
                </span>
              </div>
            )}

            {/* Image overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />

            {/* Part number */}
            <div className="absolute left-5 top-[82px]">
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/75">
                Part {part.part_number} of {sortedParts.length}
              </p>
            </div>

            {/* Caption */}
            {(part.caption || story.title) && (
              <div className="absolute inset-x-5 bottom-[118px]">
                <p
                  className="text-[28px] leading-[1.05] text-white"
                  style={{
                    fontFamily: '"Times New Roman", "Bodoni 72", Didot, serif',
                  }}
                >
                  {story.title}
                </p>

                {part.caption && (
                  <p className="mt-3 max-w-[340px] text-[14px] leading-5 text-white/90">
                    {part.caption}
                  </p>
                )}
              </div>
            )}

            {/* Previous / next tap targets */}
            <button
              type="button"
              aria-label="Previous part"
              onClick={() => goToPart(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="absolute inset-y-[100px] left-0 z-10 w-1/3 disabled:pointer-events-none"
            />

            <button
              type="button"
              aria-label="Next part"
              onClick={() => goToPart(activeIndex + 1)}
              disabled={activeIndex === sortedParts.length - 1}
              className="absolute inset-y-[100px] right-0 z-10 w-1/3 disabled:pointer-events-none"
            />

            {/* Visible arrows */}
            <button
              type="button"
              aria-label="Previous part"
              onClick={() => goToPart(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/80 backdrop-blur-sm disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronLeft size={22} strokeWidth={1.3} />
            </button>

            <button
              type="button"
              aria-label="Next part"
              onClick={() => goToPart(activeIndex + 1)}
              disabled={activeIndex === sortedParts.length - 1}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white/80 backdrop-blur-sm disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronRight size={22} strokeWidth={1.3} />
            </button>
          </section>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-5 pb-6">
        <button
          type="button"
          onClick={() => setShopOpen(true)}
          className="mx-auto flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-5 py-3 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:bg-black/40"
        >
          Shop the Looks
          <span className="text-white/60">↑</span>
        </button>

        <div className="mt-4 text-center">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/55">
            Swipe to explore
          </span>
        </div>
      </div>

      {/* Shop sheet backdrop */}
      {shopOpen && (
        <button
          type="button"
          aria-label="Close shopping panel"
          onClick={() => setShopOpen(false)}
          className="absolute inset-0 z-40 bg-black/35 backdrop-blur-[2px]"
        />
      )}

      {/* Shop sheet */}
      <aside
        className={`absolute inset-x-0 bottom-0 z-50 max-h-[78vh] overflow-y-auto rounded-t-[24px] bg-[#faf9f6] text-neutral-900 shadow-2xl transition-transform duration-300 ${
          shopOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto w-full max-w-xl px-5 pb-8 pt-4">
          {/* Sheet handle */}
          <div className="mx-auto h-1 w-10 rounded-full bg-neutral-300" />

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-neutral-400">
                Part {activePart.part_number}
              </p>

              <h2
                className="mt-1 text-2xl text-neutral-800"
                style={{
                  fontFamily: '"Times New Roman", "Bodoni 72", Didot, serif',
                }}
              >
                Shop the Looks
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShopOpen(false)}
              aria-label="Close shopping panel"
              className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800"
            >
              <X size={20} strokeWidth={1.4} />
            </button>
          </div>

          {activePart.outfits && activePart.outfits.length > 0 ? (
            <div className="mt-7 space-y-8">
              {activePart.outfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="border-b border-neutral-200 pb-8 last:border-b-0"
                >
                  <div className="flex gap-4">
                    <div className="h-[150px] w-[112px] shrink-0 overflow-hidden bg-neutral-100">
                      <img
                        src={outfit.image}
                        alt={outfit.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-xl leading-tight text-neutral-800"
                        style={{
                          fontFamily:
                            '"Times New Roman", "Bodoni 72", Didot, serif',
                        }}
                      >
                        {outfit.title}
                      </h3>

                      <div className="mt-3">
                        {[...outfit.items]
                          .sort((a, b) => a.position - b.position)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-3 border-b border-neutral-200 py-3 last:border-b-0"
                            >
                              <span className="min-w-0 text-xs leading-4 text-neutral-600">
                                {item.name}
                              </span>

                              <a
                                href={item.productUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex shrink-0 items-center gap-1 text-[9px] uppercase tracking-[0.12em] text-neutral-500 transition hover:text-neutral-900"
                              >
                                Shop
                                <ExternalLink size={10} strokeWidth={1.3} />
                              </a>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-7 border-t border-neutral-200 pt-5 text-xs text-neutral-400">
              No looks are associated with this part.
            </p>
          )}

          {/* Affiliate disclaimer */}
          <div className="mt-2 border-t border-neutral-200 pt-5 text-center">
            <p className="text-[9px] leading-4 text-neutral-400">
              GZM may earn a commission from qualifying purchases.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}

/*
 * Supabase Storage helper for story-part images.
 */
function getStoryPartImage(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const supabase = createClient();

  return supabase.storage.from("story-parts").getPublicUrl(path).data.publicUrl;
}
