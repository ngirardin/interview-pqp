import axios from "axios";
import { z } from "zod";

import { env } from "../env";

type Params = {
  movieId: number;
};

export const tmdbGetDetails = async (params: Params): Promise<Movie> => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.movieId}`, {
    params: {
      append_to_response: "credits,images,recommendations,reviews,videos",
    },
    headers: {
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
    },
  });

  return movieSchema.parse(data);
};

const castSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
});

const crewSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

const imageSchema = z.object({
  aspect_ratio: z.number(),
  height: z.number(),
  iso_639_1: z.string().nullable(),
  file_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  width: z.number(),
});

const videoSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
});

const reviewSchema = z.object({
  author: z.string(),
  author_details: z.object({
    name: z.string(),
    username: z.string(),
    avatar_path: z.string().nullable(),
    rating: z.number().nullable(),
  }),
  content: z.string(),
  created_at: z.string(),
  id: z.string(),
  updated_at: z.string(),
  url: z.string(),
});

const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable(),
      backdrop_path: z.string().nullable(),
    })
    .nullable(),
  budget: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  homepage: z.string().nullable(),
  id: z.number(),
  imdb_id: z.string().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string().nullable(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    }),
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    }),
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number().nullable(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    }),
  ),
  status: z.string(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  credits: z.object({
    cast: z.array(castSchema),
    crew: z.array(crewSchema),
  }),
  images: z.object({
    backdrops: z.array(imageSchema),
    logos: z.array(imageSchema),
    posters: z.array(imageSchema),
  }),
  recommendations: z.object({
    page: z.number(),
    results: z.array(
      z.object({
        adult: z.boolean(),
        backdrop_path: z.string().nullable(),
        id: z.number(),
        title: z.string(),
        original_language: z.string(),
        original_title: z.string(),
        overview: z.string(),
        poster_path: z.string().nullable(),
        media_type: z.string(),
        genre_ids: z.array(z.number()),
        popularity: z.number(),
        release_date: z.string(),
        video: z.boolean(),
        vote_average: z.number(),
        vote_count: z.number(),
      }),
    ),
    total_pages: z.number(),
    total_results: z.number(),
  }),
  reviews: z.object({
    page: z.number(),
    results: z.array(reviewSchema),
    total_pages: z.number(),
    total_results: z.number(),
  }),
  videos: z.object({
    results: z.array(videoSchema),
  }),
});

export type Movie = z.infer<typeof movieSchema>;
