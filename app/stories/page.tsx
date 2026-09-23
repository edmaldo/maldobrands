"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import StoryGallery from "@/components/story/StoryGallery";
import type { StoryCardPart } from "@/components/story/StoryCard";
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
  story_parts: StoryCardPart[];
};

export default function StoriesPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
   * Load genres and published stories
   * with their story parts.
   */
  useEffect(() => {
    async function loadStoriesPage() {
      const supabase = createClient();

      setLoading(true);
      setError(null);

      const [genresResult, storiesResult] = await Promise.all([
        /*
         * Load genres from the genres table.
         */
        supabase.from("genres").select("id, name, slug").order("name"),

        /*
         * Load published stories and their parts.
         */
        supabase
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
            ),

            story_parts (
              id,
              story_id,
              part_number,
              caption,
              cover_image
            )
          `,
          )
          .eq("status", "published")
          .order("created_at", { ascending: false }),
      ]);

      /*
       * Handle genre error.
       */
      if (genresResult.error) {
        console.error("Error loading genres:", genresResult.error);
        setError(genresResult.error.message);
        setLoading(false);
        return;
      }

      /*
       * Handle story error.
       */
      if (storiesResult.error) {
        console.error("Error loading stories:", storiesResult.error);
        setError(storiesResult.error.message);
        setLoading(false);
        return;
      }

      setGenres(genresResult.data ?? []);
      setStories((storiesResult.data ?? []) as Story[]);
      setLoading(false);
    }

    loadStoriesPage();
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

      const storyGenres = Array.isArray(storyGenre.genres)
        ? storyGenre.genres
        : [storyGenre.genres];

      return storyGenres.some((genre) => genre?.slug === selectedGenre);
    });
  };

  const filteredStories = stories.filter(storyMatchesGenre);

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-editorial text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              STORIES
            </h1>

            <p className="mt-2 text-sm font-light leading-6 text-neutral-500 sm:text-base">
              Explore the antics of our silly characters
            </p>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-neutral-200 pt-5">
            {/* All */}
            <button
              type="button"
              onClick={() => setSelectedGenre("all")}
              className={`text-[10px] uppercase tracking-[0.2em] transition ${
                selectedGenre === "all"
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              All
            </button>

            {/* Supabase Genres */}
            {genres.map((genre) => {
              const isActive = selectedGenre === genre.slug;

              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => setSelectedGenre(genre.slug)}
                  className={`text-[10px] uppercase tracking-[0.2em] transition ${
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  {genre.name}
                </button>
              );
            })}
          </div>
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
        <section className="mx-auto max-w-7xl pb-24">
          {filteredStories.length === 0 ? (
            <div className="mx-5 border-t border-neutral-200 py-20 text-center sm:mx-8">
              <p className="text-sm text-neutral-400">No stories found.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredStories.map((story) => (
                <section key={story.id}>
                  {/* Story Header */}
                  <div className="mx-5 mb-6 sm:mx-8">
                    <div className="flex items-baseline gap-4">
                      <h2 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
                        {story.title}
                      </h2>

                      {story.story_genres?.length > 0 && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {story.story_genres.map((storyGenre) => {
                            if (!storyGenre.genres) return null;

                            const storyGenres = Array.isArray(storyGenre.genres)
                              ? storyGenre.genres
                              : [storyGenre.genres];

                            return storyGenres.map((genre) => (
                              <span
                                key={genre.id}
                                className="text-[10px] uppercase tracking-[0.2em] text-neutral-400"
                              >
                                {genre.name}
                              </span>
                            ));
                          })}
                        </div>
                      )}
                    </div>

                    {story.description && (
                      <p className="mt-2 max-w-xl text-sm font-light leading-6 text-neutral-500">
                        {story.description}
                      </p>
                    )}
                  </div>

                  {/* Story Parts */}
                  <StoryGallery
                    storySlug={story.slug}
                    parts={story.story_parts ?? []}
                  />
                </section>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
