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

  // Normal homepage:
  // use the metadata defined in layout.tsx.
  if (!outfitId) {
    return {};
  }

  const supabase = await createClient();

  const { data: outfit } = await supabase
    .from("outfits")
    .select("title, description, image_path")
    .eq("id", outfitId)
    .single();

  // Invalid outfit ID:
  // fall back to the metadata defined in layout.tsx.
  if (!outfit) {
    return {};
  }

  const imageUrl = supabase.storage
    .from("outfit-images")
    .getPublicUrl(outfit.image_path).data.publicUrl;

  const title = `${outfit.title} — GZM`;

  return {
    title,
    description: outfit.description,

    openGraph: {
      title,
      description: outfit.description,
      url: `/?outfit=${outfitId}`,
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
      title,
      description: outfit.description,
      images: [imageUrl],
    },
  };
}

export default function Page() {
  return <HomePage />;
}
