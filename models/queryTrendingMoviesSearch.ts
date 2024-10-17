import prisma from "@/lib/db";
import { TrendingMovies } from "@prisma/client";

type Params = {
  query: string;
};

export const queryTrendingMoviesSearch = async (params: Params): Promise<TrendingMovies[]> => {
  return prisma.trendingMovies.findMany({
    where: {
      OR: [
        {
          title: {
            contains: params.query,
            mode: "insensitive",
          },
        },
        {
          overview: {
            contains: params.query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
};
