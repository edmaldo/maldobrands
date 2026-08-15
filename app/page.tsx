import type { Metadata } from "next";

import HomePage from "@/components/HomePage";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  searchParams: Promise<{
    outfit?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { outfit: outfitId } = await searchParams;

  // Normal homepage
  if (!outfitId) {
    return {
      title: "GZM — Contemporary Fashion, Curated",
      description:
        "GZM is a curated contemporary fashion platform exploring the ideas, styles, and looks shaping what feels relevant now — with the reasoning behind why they work.",
    };
  }

  const supabase = await createClient();

  const { data: outfit } = await supabase
    .from("outfits")
    .select(
      `
      title,
      description,
      image_path
      `,
    )
    .eq("id", outfitId)
    .single();

  // Invalid outfit ID
  if (!outfit) {
    return {
      title: "GZM — Contemporary Fashion, Curated",
      description:
        "GZM is a curated contemporary fashion platform exploring the ideas, styles, and looks shaping what feels relevant now — with the reasoning behind why they work.",
    };
  }

  const imageUrl = supabase.storage
    .from("outfit-images")
    .getPublicUrl(outfit.image_path).data.publicUrl;

  return {
    title: `${outfit.title} — GZM`,
    description: outfit.description,

    openGraph: {
      title: `${outfit.title} — GZM`,
      description: outfit.description,
      url: `https://maldobrands.vercel.app/?outfit=${outfitId}`,
      siteName: "GZM",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: outfit.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${outfit.title} — GZM`,
      description: outfit.description,
      images: [imageUrl],
    },
  };
}

export default function Page() {
  return <HomePage />;
}
