import prisma from "@/lib/db";
import { ApiTrending } from "@/lib/themoviedb/tmdbGetTrending";

export const queryTrendingMoviesAdd = async (trendingMovies: ApiTrending) => {
  await prisma.trendingMovies.createMany({
    data: trendingMovies.map((item) => ({
      id: item.id,
      originalTitle: item.original_title,
      mediaType: item.media_type,
      originalLanguage: item.original_language,
      releaseDate: new Date(item.release_date),
      title: item.title,
      overview: item.overview,
      adult: item.adult,
      popularity: item.popularity,
      video: item.video,
      voteAverage: item.vote_average,
      voteCount: item.vote_count,
      backdropPath: item.backdrop_path,
      posterPath: item.poster_path,
      genreIds: item.genre_ids,
    })),
  });
};
