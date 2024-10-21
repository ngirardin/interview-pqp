import { queryTrendingMoviesAdd } from "@/models/queryTrendingMoviesAdd";
import { queryTrendingMoviesClear } from "@/models/queryTrendingMoviesClear";

import { tmdbGetTrending } from "./themoviedb/tmdbGetTrending";

export async function refreshTrendingMovies() {
  const trendingMovies = await tmdbGetTrending();

  await queryTrendingMoviesClear();
  await queryTrendingMoviesAdd(trendingMovies);

  console.log(`${trendingMovies.length} trending movies stored successfully`);
}

refreshTrendingMovies();
