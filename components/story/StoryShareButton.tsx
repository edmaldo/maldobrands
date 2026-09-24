"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

type StoryShareButtonProps = {
  storySlug: string;
  storyTitle: string;
};

export default function StoryShareButton({
  storySlug,
  storyTitle,
}: StoryShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/story/${storySlug}?part=1`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: storyTitle,
          url,
        });
        return;
      } catch {
        // User cancelled the native share sheet.
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy story link:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${storyTitle}`}
      className="inline-flex shrink-0 items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-neutral-400 transition hover:text-neutral-900"
    >
      <Share2 size={13} strokeWidth={1.4} />

      <span>{copied ? "Copied" : "Share"}</span>
    </button>
  );
}
