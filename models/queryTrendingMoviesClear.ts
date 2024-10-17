import prisma from "@/lib/db";

export const queryTrendingMoviesClear = async () => {
  await prisma.trendingMovies.deleteMany();
};
