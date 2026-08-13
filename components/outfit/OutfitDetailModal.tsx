"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export type OutfitProduct = {
  id: string;
  name: string;
  vendor: string;
  productUrl: string;
  position: number;
};

export type Outfit = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  items: OutfitProduct[];
};

type OutfitDetailModalProps = {
  outfit: Outfit | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function OutfitDetailModal({
  outfit,
  isOpen,
  onClose,
}: OutfitDetailModalProps) {
  // Prevent the page behind the modal from scrolling
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Don't render anything if there isn't an outfit selected
  if (!isOpen || !outfit) return null;

  // Make sure products appear in their database-defined order
  const sortedItems = [...outfit.items].sort((a, b) => a.position - b.position);

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
      {/* MODAL */}
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
          modal-scrollbar
          pr-2
          overscroll-contain
          rounded-3xl
          bg-white
          shadow-2xl

          md:grid
          md:h-[80vh]
          md:min-h-0
          md:grid-cols-2
          md:overflow-hidden
        "
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close outfit details"
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

        {/* =========================
            OUTFIT IMAGE
        ========================== */}
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
            md:min-h-0
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
              md:w-full
              md:max-w-none
              md:aspect-auto
            "
          >
            <img
              src={outfit.image}
              alt={outfit.title}
              className="
                h-full
                w-full
                object-contain
              "
            />
          </div>
        </div>

        {/* =========================
            DETAILS
        ========================== */}
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
          {/* TITLE */}
          <h2
            className="
              text-3xl
              font-thin
              leading-tight
              text-neutral-500

              sm:text-4xl

              md:text-3xl
            "
          >
            {outfit.title}
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5
              max-w-md
              text-base
              leading-7
              text-neutral-600
            "
          >
            {outfit.description}
          </p>

          {/* =========================
              PRODUCTS
          ========================== */}
          <div className="mt-8 sm:mt-10">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-neutral-300
                  py-4
                  text-neutral-500
                "
              >
                {/* PRODUCT NAME */}
                <div className="min-w-0">
                  <span className="block truncate">{item.name}</span>
                </div>

                {/* SHOP LINK */}
                <a
                  href={item.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    shrink-0
                    text-sm
                    underline
                    underline-offset-4
                    transition
                    hover:text-black
                  "
                >
                  Shop →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
