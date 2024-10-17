import { TrendingMovies } from "@prisma/client";
import { MovieCard } from "./MovieCard";

type Props = {
  movies: TrendingMovies[];
};

export const MovieGrid = (props: Props) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {props.movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
