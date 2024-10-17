import prisma from "@/lib/db";
import { TrendingMovies } from "@prisma/client";

type Params = {
  movieId: number;
};

export const queryTrendingMoviesGet = async (params: Params): Promise<TrendingMovies> => {
  return prisma.trendingMovies.findUniqueOrThrow({
    where: {
      id: params.movieId,
    },
  });
};
