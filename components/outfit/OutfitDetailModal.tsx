"use client";

import { X } from "lucide-react";

type OutfitDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OutfitDetailModal({
  isOpen,
  onClose,
}: OutfitDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          h-[80vh]
          w-[90vw]
          max-w-[900px]
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            rounded-full
            p-2
            transition
            text-neutral-300
            hover:bg-neutral-400
          "
        >
          <X size={22} />
        </button>

        <div className="grid h-full grid-cols-2">
          {/* Left Side */}

          <div className="overflow-hidden bg-neutral-100">
            <img
              src="https://picsum.photos/700/1000"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Side */}

          <div className="overflow-y-auto p-10">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
              Women
            </p>

            <h2 className="mt-10 text-3xl font-thin text-neutral-500">
              Weekend in SoHo
            </h2>

            <p className="mt-5 leading-7 text-neutral-600">
              Relaxed tailoring paired with soft summer tones for everyday city
              wear.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center justify-between border-b pb-4 text-neutral-500">
                <span>Graphic Tee</span>
                <button className="text-sm underline">Shop →</button>
              </div>

              <div className="flex items-center justify-between border-b pb-4 text-neutral-500">
                <span>Pink Maxi Skirt</span>
                <button className="text-sm underline">Shop →</button>
              </div>

              <div className="flex items-center justify-between border-b pb-4 text-neutral-500">
                <span>Silver Ballet Flats</span>
                <button className="text-sm underline">Shop →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
