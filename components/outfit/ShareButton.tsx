"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

type ShareButtonProps = {
  outfitId: string;
  outfitTitle: string;
};

export default function ShareButton({
  outfitId,
  outfitTitle,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/?outfit=${encodeURIComponent(
      outfitId,
    )}`;

    // Use the native share sheet on supported phones/browsers
    if (navigator.share) {
      try {
        await navigator.share({
          title: outfitTitle,
          text: `Take a look at this GZM outfit: ${outfitTitle}`,
          url: shareUrl,
        });

        return;
      } catch {
        // User cancelled the native share sheet.
        // Don't show an error.
        return;
      }
    }

    // Desktop / browsers without navigator.share
    try {
      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy share link:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="
        inline-flex
        items-center
        gap-2
        text-sm
        text-neutral-500
        transition
        hover:text-black
      "
    >
      {copied ? (
        <>
          <Check size={16} strokeWidth={1.5} />
          Link copied
        </>
      ) : (
        <>
          <Share2 size={16} strokeWidth={1.5} />
          Share
        </>
      )}
    </button>
  );
}
