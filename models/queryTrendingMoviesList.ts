import prisma from "@/lib/db";
import { TrendingMovies } from "@prisma/client";

type Params = {
  page: number;
};

const pageSize = 20;

export const queryTrendingMoviesList = async (params: Params): Promise<TrendingMovies[]> => {
  return prisma.trendingMovies.findMany({
    skip: (params.page - 1) * pageSize,
    take: pageSize,
  });
};
