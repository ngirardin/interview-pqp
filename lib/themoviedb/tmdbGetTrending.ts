import zod from "zod";
import axios from "axios";
import { env } from "../env";

export type ApiTrending = Awaited<ReturnType<typeof tmdbGetTrending>>;

export const tmdbGetTrending = async () => {
  const res = await axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US", {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_API_KEY}`,
    },
  });

  const schema = zod.object({
    page: zod.number(),
    results: zod.array(
      zod.object({
        backdrop_path: zod.string().nullable(),
        id: zod.number(),
        title: zod.string(),
        original_title: zod.string(),
        overview: zod.string(),
        poster_path: zod.string(),
        media_type: zod.literal("movie"),
        adult: zod.boolean(),
        original_language: zod.string(),
        genre_ids: zod.array(zod.number()),
        popularity: zod.number(),
        release_date: zod.string(),
        video: zod.literal(false),
        vote_average: zod.number(),
        vote_count: zod.number(),
      }),
    ),
  });

  const data = schema.parse(res.data);

  return data.results;
};
