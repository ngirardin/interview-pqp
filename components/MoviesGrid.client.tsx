"use client";

import { TrendingMovies } from "@prisma/client";
import { MovieCard } from "./MovieCard";
import { useState } from "react";
import { Button } from "./ui/button";

type Props = {
  onLoadMore: (params: { page: number }) => Promise<TrendingMovies[]>;
  movies: TrendingMovies[];
};

export const MoviesGrid = (props: Props) => {
  const [movies, setMovies] = useState<TrendingMovies[]>(props.movies);
  const [page, setPage] = useState(0);

  const handleLoadMore = async () => {
    const newMovies = await props.onLoadMore({ page: page + 1 });
    setMovies([...movies, ...newMovies]);
    setPage(page + 1);
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      <Button onClick={handleLoadMore}>Load More</Button>
    </div>
  );
};
