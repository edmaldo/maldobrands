"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  vendor: string;
  product_url: string;
};

type OutfitItem = {
  id: string;
  position: number;
  products: Product | Product[] | null;
};

type Outfit = {
  id: string;
  title: string;
  description: string | null;
  outfit_items: OutfitItem[];
};

type StoryScene = {
  id: string;
  scene_number: number;
  image: string | null;
  caption: string | null;
  dialogue: string | null;
  outfit_id: string | null;
};

type StoryReaderProps = {
  title: string;
  scenes: StoryScene[];
  outfits: Outfit[];
};

export default function StoryReader({
  title,
  scenes,
  outfits,
}: StoryReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentScene, setCurrentScene] = useState(0);

  const outfitMap = new Map(outfits.map((outfit) => [outfit.id, outfit]));

  /*
   * Track the currently visible scene.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      const width = container.clientWidth;

      if (!width) return;

      const index = Math.round(container.scrollLeft / width);

      setCurrentScene(Math.max(0, Math.min(index, scenes.length - 1)));
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [scenes.length]);

  /*
   * Navigate to a scene.
   */
  const goToScene = (index: number) => {
    const container = containerRef.current;

    if (!container) return;

    const nextIndex = Math.max(0, Math.min(index, scenes.length - 1));

    container.scrollTo({
      left: nextIndex * container.clientWidth,
      behavior: "smooth",
    });

    setCurrentScene(nextIndex);
  };

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToScene(currentScene + 1);
      }

      if (event.key === "ArrowLeft") {
        goToScene(currentScene - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentScene]);

  return (
    <section className="relative w-full bg-white text-neutral-900">
      {/* Scene counter */}
      <div className="absolute left-6 top-6 z-30 sm:left-10 sm:top-8">
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
          {String(currentScene + 1).padStart(2, "0")} /{" "}
          {String(scenes.length).padStart(2, "0")}
        </span>
      </div>

      {/* Previous arrow */}
      <button
        type="button"
        onClick={() => goToScene(currentScene - 1)}
        disabled={currentScene === 0}
        aria-label="Previous scene"
        className="group absolute left-5 top-[42%] z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/70 text-neutral-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <ArrowLeft
          size={19}
          strokeWidth={1}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={() => goToScene(currentScene + 1)}
        disabled={currentScene === scenes.length - 1}
        aria-label="Next scene"
        className="group absolute right-5 top-[42%] z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/70 text-neutral-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md disabled:pointer-events-none disabled:opacity-0 md:flex"
      >
        <ArrowRight
          size={19}
          strokeWidth={1}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      {/* Horizontal scenes */}
      <div
        ref={containerRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {scenes.map((scene) => {
          const outfit = scene.outfit_id
            ? outfitMap.get(scene.outfit_id)
            : null;

          return (
            <article key={scene.id} className="relative min-w-full snap-center">
              {/* Scene image */}
              <div className="relative h-[72vh] min-h-[500px] w-full overflow-hidden bg-neutral-100">
                {scene.image ? (
                  <img
                    src={scene.image}
                    alt={`${title} — scene ${scene.scene_number}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-300">
                        {title}
                      </p>

                      <p className="mt-3 text-xs text-neutral-300">
                        Scene {String(scene.scene_number).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                )}

                {/* Very subtle bottom fade */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Scene content */}
              <div className="px-6 pb-12 pt-8 sm:px-10 sm:pb-14">
                <div className="mx-auto max-w-4xl">
                  <div className="text-center">
                    {scene.caption && (
                      <p className="mx-auto max-w-2xl text-base font-light leading-7 text-neutral-500 sm:text-lg">
                        {scene.caption}
                      </p>
                    )}

                    {scene.dialogue && (
                      <p className="mx-auto mt-3 max-w-3xl text-2xl font-light leading-9 tracking-tight text-neutral-900 sm:text-3xl">
                        “{scene.dialogue}”
                      </p>
                    )}
                  </div>

                  {/* Outfit */}
                  {outfit && (
                    <div className="mt-9 border-t border-neutral-200 pt-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
                            Wearing
                          </p>

                          <h2 className="mt-1 text-base font-light text-neutral-900">
                            {outfit.title}
                          </h2>
                        </div>

                        <Link
                          href={`/outfits?outfit=${outfit.id}`}
                          className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 transition hover:text-neutral-900"
                        >
                          View look →
                        </Link>
                      </div>

                      {/* Products */}
                      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                        {[...(outfit.outfit_items ?? [])]
                          .sort((a, b) => a.position - b.position)
                          .map((item) => {
                            const product = Array.isArray(item.products)
                              ? item.products[0]
                              : item.products;

                            if (!product?.product_url) {
                              return null;
                            }

                            return (
                              <a
                                key={item.id}
                                href={product.product_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-[150px] border border-neutral-200 px-4 py-3 transition hover:border-neutral-400"
                              >
                                <span className="block truncate text-xs text-neutral-800">
                                  {product.name}
                                </span>

                                <span className="mt-1 block text-[9px] uppercase tracking-[0.15em] text-neutral-400">
                                  {product.vendor} ↗
                                </span>
                              </a>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Scene progress */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            type="button"
            aria-label={`Go to scene ${index + 1}`}
            onClick={() => goToScene(index)}
            className={`h-[2px] transition-all duration-300 ${
              index === currentScene
                ? "w-8 bg-neutral-900"
                : "w-3 bg-neutral-300 hover:bg-neutral-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
