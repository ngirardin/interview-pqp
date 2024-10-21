import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSessionOrRedirect } from "@/lib/auth/getSession";
import { queryTrendingMoviesGet } from "@/models/queryTrendingMovieGet";

type Props = {
  params: {
    movieId: string;
  };
};

export default async function MoviePage(props: Props) {
  await getSessionOrRedirect();

  const movieId = Number(props.params.movieId);
  const movie = await queryTrendingMoviesGet({ movieId });

  return (
    <div className="space-y-2">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="h-8">
            {movie.title}
            {movie.originalTitle !== movie.title && ` (${movie.originalTitle})`}
          </CardTitle>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Progress className="w-24" value={movie.voteAverage * 10} /> {movie.voteAverage} ({movie.voteCount} votes)
            </div>
            {movie.popularity > 100 && <Badge>Popular</Badge>}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2 text-sm">
          <Image
            className="rounded-md aspect-video"
            src={`https://image.tmdb.org/t/p/w500${movie.backdropPath}`}
            alt={movie.title}
            width={500}
            height={500}
          />

          <div className="border border-red-500h-16 overflow-hidden">{movie.overview}</div>

          <p>Released {movie.releaseDate?.toDateString()}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
