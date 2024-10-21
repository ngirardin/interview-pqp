"use client";

import { TrendingMovies } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

import { MovieGrid } from "@/components/MovieGrid";

type Props = {
  onLoadMore?: (params: { page: number }) => Promise<TrendingMovies[]>;
  movies: TrendingMovies[];
};

export const InfiniteMovieGridClient = (props: Props) => {
  const [movies, setMovies] = useState<TrendingMovies[]>(props.movies);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (props.onLoadMore === undefined || loading) {
      return;
    }

    setLoading(true);
    const newMovies = await props.onLoadMore({ page });

    setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    setPage((prevPage) => prevPage + 1);

    setLoading(false);
  }, [loading, page, props]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore]);

  return (
    <div>
      <MovieGrid movies={movies} />

      {loading && <div className="flex justify-center items-center font-bold my-4">Loading...</div>}
    </div>
  );
};
