import zod from "zod";
import axios from "axios";
import { env } from "../env";

export type ApiTrending = Awaited<ReturnType<typeof tmdbGetTrending>>;

const pages = 10;

export const tmdbGetTrending = async () => {
  const results = await Promise.all(Array.from({ length: pages }).map((_, i) => getPage(i + 1)));
  return results.flat();
};

const getPage = async (page: number) => {
  const res = await axios.get("https://api.themoviedb.org/3/trending/movie/day", {
    params: {
      language: "en-US",
      page,
    },
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
        poster_path: zod.string().nullable(),
        media_type: zod.literal("movie"),
        adult: zod.boolean(),
        original_language: zod.string(),
        genre_ids: zod.array(zod.number()),
        popularity: zod.number(),
        release_date: zod.string().transform((v) => (v.length > 0 ? new Date(v) : null)),
        video: zod.boolean(),
        vote_average: zod.number(),
        vote_count: zod.number(),
      }),
    ),
  });

  const data = schema.parse(res.data);

  return data.results;
};
