import { queryTrendingMoviesList } from "@/models/queryTrendingMoviesList";
import { InfiniteMovieGridClient } from "../components/InfiniteMovieGridclient";

export default async function Home() {
  const trendingMovies = await queryTrendingMoviesList({ page: 1 });

  const handleLoadMore = async (params: { page: number }) => {
    "use server";

    return await queryTrendingMoviesList({ page: params.page });
  };

  return <InfiniteMovieGridClient onLoadMore={handleLoadMore} movies={trendingMovies} />;
}
