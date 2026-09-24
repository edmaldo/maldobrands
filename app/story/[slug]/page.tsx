import { notFound } from "next/navigation";
import { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import StoryReader, {
  type StoryReaderPart,
  type StoryReaderOutfit,
  type StoryReaderProduct,
  type StoryReaderStory,
  type StoryReaderExtraItem,
} from "@/components/story/StoryReader";

type Genre = {
  id: string;
  name: string;
  slug: string;
};

type StoryGenre = {
  genres: Genre | Genre[] | null;
};

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

type SupabaseOutfit = {
  id: string;
  title: string;
  image_path: string | null;
  outfit_items: OutfitItem[];
};

type StoryPartOutfit = {
  outfit: SupabaseOutfit | SupabaseOutfit[] | null;
};

type StoryPartItem = {
  extra_item: SupabaseExtraItem | SupabaseExtraItem[] | null;
};

type SupabaseExtraItem = {
  id: string;
  name: string;
  brand: string | null;
  image_url: string | null;
  item_url: string | null;
};

type SupabaseStoryPart = {
  id: string;
  story_id: string;
  part_number: number;
  caption: string | null;
  cover_image: string | null;
  video_url: string | null;
  story_part_outfits: StoryPartOutfit[];
  story_parts_items: StoryPartItem[];
};

type SupabaseStory = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  status: string;
  story_genres: StoryGenre[];
  story_parts: SupabaseStoryPart[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: story } = await supabase
    .from("stories")
    .select("title, description, cover_image")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!story) {
    return {
      title: "Story | GZM",
    };
  }

  let coverImageUrl: string | null = null;

  if (story.cover_image) {
    if (
      story.cover_image.startsWith("http://") ||
      story.cover_image.startsWith("https://")
    ) {
      coverImageUrl = story.cover_image;
    } else {
      coverImageUrl = supabase.storage
        .from("story-images")
        .getPublicUrl(story.cover_image).data.publicUrl;
    }
  }

  return {
    title: `${story.title} | GZM`,
    description: story.description ?? undefined,

    openGraph: {
      title: story.title,
      description: story.description ?? undefined,
      type: "article",
      ...(coverImageUrl
        ? {
            images: [
              {
                url: coverImageUrl,
                width: 1200,
                height: 630,
                alt: story.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description ?? undefined,
      ...(coverImageUrl
        ? {
            images: [coverImageUrl],
          }
        : {}),
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  /*
   * =========================================================
   * LOAD STORY
   * =========================================================
   */

  const { data: storyData, error: storyError } = await supabase
    .from("stories")
    .select(
      `
        id,
        title,
        slug,
        description,
        cover_image,
        status,

        story_genres (
          genres (
            id,
            name,
            slug
          )
        ),

        story_parts (
          id,
          story_id,
          part_number,
          caption,
          cover_image,
          video_url,

          story_part_outfits (
            outfit:outfits (
              id,
              title,
              image_path,

              outfit_items (
                id,
                position,

                products (
                  id,
                  name,
                  vendor,
                  product_url
                )
              )
            )
          ),

          story_parts_items (
            extra_item:extra_items (
              id,
              name,
              brand,
              image_url,
              item_url
            )
          )
        )
      `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (storyError || !storyData) {
    console.error("Error loading story:", storyError);
    notFound();
  }

  const story = storyData as unknown as SupabaseStory;

  /*
   * =========================================================
   * SORT PARTS
   * =========================================================
   */

  const sortedParts = [...(story.story_parts ?? [])].sort(
    (a, b) => a.part_number - b.part_number,
  );

  /*
   * =========================================================
   * FORMAT STORY PARTS
   * =========================================================
   */

  const parts: StoryReaderPart[] = sortedParts.map((part) => {
    /*
     * Resolve the 9:16 story-part image.
     */
    let coverImage: string | null = null;

    if (part.cover_image) {
      if (
        part.cover_image.startsWith("http://") ||
        part.cover_image.startsWith("https://")
      ) {
        coverImage = part.cover_image;
      } else {
        coverImage = supabase.storage
          .from("story-parts")
          .getPublicUrl(part.cover_image).data.publicUrl;
      }
    }

    const extraItems: StoryReaderExtraItem[] =
      part.story_parts_items
        ?.map((relationship) => {
          const rawItem = relationship.extra_item;

          if (!rawItem) return null;

          const item = Array.isArray(rawItem) ? rawItem[0] : rawItem;

          if (!item) return null;

          let extraItemImage: string | null = null;

          if (item.image_url) {
            if (
              item.image_url.startsWith("http://") ||
              item.image_url.startsWith("https://")
            ) {
              extraItemImage = item.image_url;
            } else {
              extraItemImage = supabase.storage
                .from("extra-item-image")
                .getPublicUrl(item.image_url).data.publicUrl;
            }
          }

          return {
            id: item.id,
            name: item.name,
            brand: item.brand,
            imageUrl: extraItemImage,
            itemUrl: item.item_url,
          };
        })
        .filter((item): item is StoryReaderExtraItem => item !== null) ?? [];

    /*
     * Resolve outfits associated with this part.
     */
    const outfits: StoryReaderOutfit[] =
      part.story_part_outfits
        ?.map((relationship) => {
          const rawOutfit = relationship.outfit;

          if (!rawOutfit) return null;

          const outfit = Array.isArray(rawOutfit) ? rawOutfit[0] : rawOutfit;

          if (!outfit) return null;

          /*
           * Resolve outfit image.
           */
          let outfitImage = "";

          if (outfit.image_path) {
            if (
              outfit.image_path.startsWith("http://") ||
              outfit.image_path.startsWith("https://")
            ) {
              outfitImage = outfit.image_path;
            } else {
              outfitImage = supabase.storage
                .from("outfit-images")
                .getPublicUrl(outfit.image_path).data.publicUrl;
            }
          }

          /*
           * Convert outfit products into the
           * shape expected by StoryReader.
           */
          const items: StoryReaderProduct[] = (outfit.outfit_items ?? [])
            .map((item) => {
              if (!item.products) return null;

              const product = Array.isArray(item.products)
                ? item.products[0]
                : item.products;

              if (!product) return null;

              return {
                id: product.id,
                name: product.name,
                vendor: product.vendor,
                productUrl: product.product_url,
                position: item.position,
              };
            })
            .filter((item): item is StoryReaderProduct => item !== null)
            .sort((a, b) => a.position - b.position);

          return {
            id: outfit.id,
            title: outfit.title,
            image: outfitImage,
            items,
          };
        })
        .filter((outfit): outfit is StoryReaderOutfit => outfit !== null) ?? [];

    return {
      id: part.id,
      story_id: part.story_id,
      part_number: part.part_number,
      caption: part.caption,
      cover_image: coverImage,
      video_url: part.video_url,
      outfits,
      extraItems,
    };
  });

  /*
   * =========================================================
   * STORY DATA FOR READER
   * =========================================================
   */

  const readerStory: StoryReaderStory = {
    id: story.id,
    title: story.title,
    description: story.description,
    slug: story.slug,
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   *
   * StoryReader owns the entire reader experience:
   *
   * - story title
   * - part navigation
   * - horizontal swipe/scroll
   * - 9:16 media
   * - captions
   * - outfits
   * - product links
   */

  return <StoryReader story={readerStory} parts={parts} />;
}
