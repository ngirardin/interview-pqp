import { MovieCard } from "@/components/movieCard";
import { queryTrendingMoviesList } from "@/models/queryTrendingMoviesList";

export default async function Home() {
  const trendingMovies = await queryTrendingMoviesList();

  return (
    <div className="grid grid-cols-4 gap-4">
      {trendingMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
