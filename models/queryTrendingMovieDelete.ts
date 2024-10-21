import prisma from "@/lib/db";

type Params = {
  movieId: number;
};

export const queryTrendingMovieDelete = async (params: Params) => {
  await prisma.trendingMovies.delete({
    where: {
      id: params.movieId,
    },
  });
};
