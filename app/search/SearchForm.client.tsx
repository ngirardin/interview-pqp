"use client";

import { TrendingMovies } from "@prisma/client/edge";
import { useState } from "react";

import { MovieGrid } from "@/components/MovieGrid";
import { Input } from "@/components/ui/input";

type Props = {
  handleSearch: (query: string) => Promise<TrendingMovies[]>;
};

export const SearchFormClient = (props: Props) => {
  const [movies, setMovies] = useState<TrendingMovies[] | undefined>(undefined);

  const handleSearch = async (query: string) => {
    const movies = await props.handleSearch(query);
    setMovies(movies);
  };

  return (
    <div className="space-y-4">
      <div className="w-fit flex gap-2 mt-4">
        <Input
          className="w-64"
          placeholder="Search for a movie"
          name="query"
          autoFocus={true}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {movies !== undefined && (
        <>
          {movies.length === 0 ? (
            <div className="flex justify-center items-center font-bold my-4">No movies found</div>
          ) : (
            <>
              <div>{movies.length} results</div>
              <MovieGrid movies={movies} />
            </>
          )}
        </>
      )}
    </div>
  );
};
