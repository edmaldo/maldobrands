"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type OutfitDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OutfitDetailModal({
  isOpen,
  onClose,
}: OutfitDetailModalProps) {
  // Lock the background page while the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        overflow-hidden
        bg-black/40
        p-4
        backdrop-blur-sm
        sm:p-6
      "
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          flex
          h-[90vh]
          w-full
          max-w-[900px]
          flex-col
          overflow-y-auto
          overscroll-contain
          no-scrollbar
          rounded-3xl
          bg-white
          shadow-2xl

          md:grid
          md:h-[80vh]
          md:grid-cols-2
          md:overflow-hidden
        "
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute
            right-4
            top-4
            z-30
            rounded-full
            bg-white/80
            p-2
            text-neutral-400
            backdrop-blur-sm
            transition
            hover:bg-white
            hover:text-neutral-700

            md:right-5
            md:top-5
          "
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        {/* IMAGE */}
        <div
          className="
            flex
            w-full
            shrink-0
            items-center
            justify-center
            bg-neutral-100
            px-6
            py-6

            md:h-full
            md:px-0
            md:py-0
          "
        >
          <div
            className="
              aspect-[3/4]
              w-full
              max-w-[360px]
              overflow-hidden

              md:h-full
              md:max-w-none
              md:aspect-auto
            "
          >
            <img
              src="https://picsum.photos/700/1000"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div
          className="
            w-full
            shrink-0
            px-6
            py-8

            sm:px-8

            md:h-full
            md:overflow-y-auto
            md:px-10
            md:py-10
          "
        >
          {/* Category */}
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
            Women
          </p>

          {/* Title */}
          <h2
            className="
              mt-6
              text-3xl
              font-thin
              leading-tight
              text-neutral-500

              sm:text-4xl

              md:mt-10
              md:text-3xl
            "
          >
            Weekend in SoHo
          </h2>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-md
              text-base
              leading-7
              text-neutral-600
            "
          >
            Relaxed tailoring paired with soft summer tones for everyday city
            wear.
          </p>

          {/* Products */}
          <div className="mt-8 sm:mt-10">
            <div className="flex items-center justify-between gap-4 border-b border-neutral-300 py-4 text-neutral-500">
              <span>Graphic Tee</span>

              <button
                type="button"
                className="shrink-0 text-sm underline underline-offset-4 transition hover:text-black"
              >
                Shop →
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-neutral-300 py-4 text-neutral-500">
              <span>Pink Maxi Skirt</span>

              <button
                type="button"
                className="shrink-0 text-sm underline underline-offset-4 transition hover:text-black"
              >
                Shop →
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-neutral-300 py-4 text-neutral-500">
              <span>Silver Ballet Flats</span>

              <button
                type="button"
                className="shrink-0 text-sm underline underline-offset-4 transition hover:text-black"
              >
                Shop →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
