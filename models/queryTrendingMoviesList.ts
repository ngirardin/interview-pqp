import prisma from "@/lib/db";
import { TrendingMovies } from "@prisma/client";

export const queryTrendingMoviesList = async (): Promise<TrendingMovies[]> => {
  return prisma.trendingMovies.findMany();
};
