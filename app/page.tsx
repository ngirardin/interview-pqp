import { MoviesGrid } from "@/components/MoviesGrid.client";
import { queryTrendingMoviesList } from "@/models/queryTrendingMoviesList";

export default async function Home() {
  const trendingMovies = await queryTrendingMoviesList({ page: 1 });

  const handleLoadMore = async (params: { page: number }) => {
    "use server";

    return await queryTrendingMoviesList({ page: params.page });
  };

  return <MoviesGrid onLoadMore={handleLoadMore} movies={trendingMovies} />;
}
