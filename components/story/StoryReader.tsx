"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import StoryReaderMobile from "./StoryReaderMobile";

export type StoryReaderProduct = {
  id: string;
  name: string;
  vendor: string;
  productUrl: string;
  position: number;
};

export type StoryReaderOutfit = {
  id: string;
  title: string;
  image: string;
  items: StoryReaderProduct[];
};

export type StoryReaderPart = {
  id: string;
  story_id: string;
  part_number: number;
  caption: string | null;
  cover_image: string | null;
  video_url?: string | null;

  outfits?: StoryReaderOutfit[];
};

export type StoryReaderStory = {
  id: string;
  title: string;
  description: string | null;
  slug: string;
};

type StoryReaderProps = {
  story: StoryReaderStory;
  parts: StoryReaderPart[];
};

export default function StoryReader({ story, parts }: StoryReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sortedParts = [...parts].sort((a, b) => a.part_number - b.part_number);

  const searchParams = useSearchParams();
  const requestedPart = Number(searchParams.get("part"));

  const initialIndex =
    Number.isInteger(requestedPart) &&
    requestedPart >= 1 &&
    requestedPart <= sortedParts.length
      ? requestedPart - 1
      : 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  /*
   * Prevent the page behind the reader from
   * scrolling while the reader is active.
   */
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container || initialIndex === 0) return;

    container.scrollTo({
      left: initialIndex * container.clientWidth,
      behavior: "instant",
    });

    setActiveIndex(initialIndex);
  }, [initialIndex]);

  /*
   * Update the active part when the user
   * horizontally scrolls/swipes.
   */
  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    const index = Math.round(container.scrollLeft / container.clientWidth);

    setActiveIndex(Math.min(Math.max(index, 0), sortedParts.length - 1));
  };

  /*
   * Navigate to a specific part.
   */
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

  const goNext = () => {
    if (activeIndex < sortedParts.length - 1) {
      goToPart(activeIndex + 1);
    }
  };

  const goPrevious = () => {
    if (activeIndex > 0) {
      goToPart(activeIndex - 1);
    }
  };

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  if (sortedParts.length === 0) {
    return (
      <main className="min-h-screen bg-[#faf9f6]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
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

  const activePart = sortedParts[activeIndex];

  return (
    <>
      {/* MOBILE */}
      <div className="xl:hidden">
        <StoryReaderMobile story={story} parts={sortedParts} />
      </div>

      {/* DESKTOP */}
      <div className="hidden xl:block">
        <main className="flex h-screen flex-col overflow-hidden bg-[#faf9f6] text-neutral-900">
          {/* =====================================================
          TOP BAR
      ====================================================== */}

          <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-neutral-200 px-6 sm:px-8">
            <Link
              href="/stories"
              className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 transition hover:text-neutral-900"
            >
              ← All Stories
            </Link>

            <div className="flex text-center">
              <span className="gzm-g">G</span>
              <span className="gzm-z">Z</span>
              <span className="gzm-m">M</span>
            </div>

            <Link
              href="/stories"
              aria-label="Close story"
              className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800"
            >
              <X size={20} strokeWidth={1.4} />
            </Link>
          </header>

          {/* =====================================================
          READER
      ====================================================== */}

          <div className="grid min-h-0 flex-1 grid-cols-[250px_minmax(0,1fr)_360px]">
            {/* ===================================================
            LEFT — PART NAVIGATION
        ==================================================== */}

            <aside className="hidden min-h-0 w-[250px] shrink-0 overflow-y-auto border-r border-neutral-200 px-5 py-5 lg:block story-scrollbar">
              <div className="mb-8">
                <h2
                  className="mt-3 text-2xl leading-tight text-neutral-800"
                  style={{
                    fontFamily: '"Times New Roman", "Bodoni 72", Didot, serif',
                  }}
                >
                  {story.title}
                </h2>

                {story.description && (
                  <p className="mt-3 text-xs leading-5 text-neutral-500">
                    {story.description}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                {sortedParts.map((part, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={part.id}
                      type="button"
                      onClick={() => goToPart(index)}
                      className={`group flex w-full gap-3 rounded-sm p-2 text-left transition ${
                        isActive ? "bg-white" : "hover:bg-white/60"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="h-[72px] w-[48px] shrink-0 overflow-hidden bg-neutral-200">
                        {part.cover_image ? (
                          <img
                            src={getStoryPartImage(part.cover_image)}
                            alt={`Part ${part.part_number}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <span className="text-[8px] text-neutral-400">
                              GZM
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Part Info */}
                      <div className="flex min-w-0 items-center">
                        <p
                          className={`text-[10px] uppercase tracking-[0.18em] ${
                            isActive ? "text-neutral-900" : "text-neutral-400"
                          }`}
                        >
                          Part {part.part_number}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* ===================================================
            CENTER — STORY MEDIA
        ==================================================== */}

            <section className="relative min-h-0 overflow-hidden bg-neutral-100">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none"
              >
                {sortedParts.map((part) => (
                  <div
                    key={part.id}
                    className="relative flex h-full min-w-full shrink-0 snap-center items-center justify-center"
                  >
                    <div className="relative h-full max-h-full w-full">
                      {part.video_url ? (
                        <video
                          src={part.video_url}
                          poster={
                            part.cover_image
                              ? getStoryPartImage(part.cover_image)
                              : undefined
                          }
                          className="h-full w-full object-contain"
                          controls
                          playsInline
                        />
                      ) : part.cover_image ? (
                        <img
                          src={getStoryPartImage(part.cover_image)}
                          alt={part.caption || `Part ${part.part_number}`}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                            GZM
                          </span>
                        </div>
                      )}

                      {/* Previous */}
                      <button
                        type="button"
                        onClick={goPrevious}
                        disabled={activeIndex === 0}
                        aria-label="Previous part"
                        className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-neutral-700 shadow-sm backdrop-blur transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
                      >
                        <ChevronLeft size={22} strokeWidth={1.4} />
                      </button>

                      {/* Next */}
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={activeIndex === sortedParts.length - 1}
                        aria-label="Next part"
                        className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-neutral-700 shadow-sm backdrop-blur transition hover:bg-white disabled:pointer-events-none disabled:opacity-0"
                      >
                        <ChevronRight size={22} strokeWidth={1.4} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Part Counter */}
              <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-white/85 px-4 py-2 text-[10px] tracking-[0.18em] text-neutral-700 shadow-sm backdrop-blur">
                  {activeIndex + 1} / {sortedParts.length}
                </div>
              </div>
            </section>

            {/* ===================================================
            RIGHT — STORY + SHOPPING
        ==================================================== */}

            <aside className="story-scrollbar hidden min-h-0 overflow-y-auto border-l border-neutral-200 bg-[#faf9f6] px-7 py-8 xl:block">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
                  Part {activePart.part_number}
                </p>

                {activePart.caption && (
                  <p
                    className="mt-5 text-2xl leading-tight text-neutral-800"
                    style={{
                      fontFamily:
                        '"Times New Roman", "Bodoni 72", Didot, serif',
                    }}
                  >
                    {activePart.caption}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-neutral-200" />

              {/* Shop */}
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[10px] uppercase tracking-[0.28em] text-neutral-800">
                    Shop the Looks
                  </h3>
                </div>

                <div className="mt-6 space-y-8">
                  {activePart.outfits?.map((outfit) => (
                    <div key={outfit.id}>
                      {/* Outfit */}
                      <div className="flex gap-4">
                        {/* Outfit Image */}
                        <div className="h-[150px] w-[112px] shrink-0 overflow-hidden bg-neutral-100">
                          <img
                            src={outfit.image}
                            alt={outfit.title}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        {/* Outfit + Products */}
                        <div className="min-w-0 flex-1">
                          <h4
                            className="text-lg leading-tight text-neutral-800"
                            style={{
                              fontFamily:
                                '"Times New Roman", "Bodoni 72", Didot, serif',
                            }}
                          >
                            {outfit.title}
                          </h4>

                          <div className="mt-4">
                            {outfit.items
                              .sort((a, b) => a.position - b.position)
                              .map((item) => (
                                <a
                                  key={item.id}
                                  href={item.productUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between gap-3 border-b border-neutral-200 py-3 transition-colors hover:bg-neutral-50"
                                >
                                  <span className="min-w-0 text-xs leading-4 text-neutral-600">
                                    {item.name}
                                  </span>

                                  <span className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                                    Shop
                                    <ExternalLink size={11} strokeWidth={1.3} />
                                  </span>
                                </a>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!activePart.outfits || activePart.outfits.length === 0) && (
                    <p className="border-t border-neutral-200 pt-5 text-xs text-neutral-400">
                      No looks are associated with this part.
                    </p>
                  )}
                  {/* Affiliate Disclaimer */}
                  <div className="border-t border-neutral-200 pt-5 text-center">
                    <p className="text-[9px] leading-4 text-neutral-400">
                      GZM may earn a commission from qualifying purchases.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* =====================================================
          MOBILE PART BAR
      ====================================================== */}

          <div className="flex shrink-0 items-center justify-between border-t border-neutral-200 bg-[#faf9f6] px-5 py-3 xl:hidden">
            <button
              type="button"
              onClick={goPrevious}
              disabled={activeIndex === 0}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 disabled:opacity-30"
            >
              ← Previous
            </button>

            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">
              Part {activeIndex + 1} / {sortedParts.length}
            </span>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === sortedParts.length - 1}
              className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </main>
      </div>
    </>
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
