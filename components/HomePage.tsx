"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Header from "./layout/Header";

import { createClient } from "@/lib/supabase/client";

type Genre = {
  id: string;
  name: string;
  slug: string;
};

type StoryGenre = {
  genres: Genre | Genre[] | null;
};

type Story = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  status: string;
  created_at: string;
  story_genres: StoryGenre[];
};

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState("all");

  const [stories, setStories] = useState<Story[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /*
   * Load published stories from Supabase.
   */
  useEffect(() => {
    async function loadStories() {
      const supabase = createClient();

      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("stories")
        .select(
          `
          id,
          title,
          slug,
          description,
          cover_image,
          status,
          created_at,
          story_genres (
            genres (
              id,
              name,
              slug
            )
          )
        `,
        )
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading stories:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setStories((data ?? []) as Story[]);
      setLoading(false);
    }

    loadStories();
  }, []);

  /*
   * Determine whether a story belongs
   * to the currently selected genre.
   */
  const storyMatchesGenre = (story: Story) => {
    if (selectedGenre === "all") {
      return true;
    }

    return story.story_genres?.some((storyGenre) => {
      if (!storyGenre.genres) return false;

      const genres = Array.isArray(storyGenre.genres)
        ? storyGenre.genres
        : [storyGenre.genres];

      return genres.some((genre) => genre?.slug === selectedGenre);
    });
  };

  const filteredStories = stories.filter(storyMatchesGenre);

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-neutral-400">
            GZM Fashion
          </p>

          <h1 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-6xl">
            Stories worth wearing.
          </h1>

          <p className="mt-6 max-w-xl text-base font-light leading-7 text-neutral-500 sm:text-lg">
            Little stories, strange adventures, and the outfits that make them
            happen.
          </p>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm text-neutral-400">Loading stories...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex min-h-[40vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm text-red-500">Unable to load stories.</p>

            <p className="mt-2 max-w-md text-xs text-neutral-400">{error}</p>
          </div>
        </div>
      )}

      {/* Stories */}
      {!loading && !error && (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          {filteredStories.length === 0 ? (
            <div className="border-t border-neutral-200 py-20 text-center">
              <p className="text-sm text-neutral-400">No stories found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStories.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/story/${story.slug}`}
                  className={`group ${
                    index === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Story Image */}
                  <div
                    className={`relative overflow-hidden bg-neutral-200 ${
                      index === 0 ? "aspect-[16/10]" : "aspect-[4/5]"
                    }`}
                  >
                    {story.cover_image ? (
                      <img
                        src={story.cover_image}
                        alt={story.title}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                          GZM
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Story Information */}
                  <div className="mt-5">
                    <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1">
                      {story.story_genres?.map((storyGenre) => {
                        if (!storyGenre.genres) return null;

                        const genres = Array.isArray(storyGenre.genres)
                          ? storyGenre.genres
                          : [storyGenre.genres];

                        return genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400"
                          >
                            {genre.name}
                          </span>
                        ));
                      })}
                    </div>

                    <h2 className="text-2xl font-light tracking-tight text-neutral-900 transition group-hover:text-neutral-500 sm:text-3xl">
                      {story.title}
                    </h2>

                    {story.description && (
                      <p className="mt-3 max-w-xl text-sm font-light leading-6 text-neutral-500">
                        {story.description}
                      </p>
                    )}

                    <div className="mt-5 text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition group-hover:text-neutral-900">
                      Read story →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
