import prisma from "@/lib/db";

type Params = {
  movieId: number;
  title: string;
  overview: string;
};

export const queryTrendingMovieUpdate = async (params: Params) => {
  "use server";

  return await prisma.trendingMovies.update({
    where: { id: params.movieId },
    data: { title: params.title, overview: params.overview },
  });
};
