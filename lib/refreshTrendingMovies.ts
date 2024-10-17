import { queryTrendingMoviesClear } from "@/models/queryTrendingMoviesClear";
import { tmdbGetTrending } from "./themoviedb/tmdbGetTrending";
import { queryTrendingMoviesAdd } from "@/models/queryTrendingMoviesAdd";

async function refrehsTrendingMovies() {
  const trendingMovies = await tmdbGetTrending();

  await queryTrendingMoviesClear();
  await queryTrendingMoviesAdd(trendingMovies);

  console.log(`${trendingMovies.length} trending movies stored successfully`);
}

refrehsTrendingMovies();
