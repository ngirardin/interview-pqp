import { TrendingMovies } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

type Props = {
  movie: TrendingMovies;
};

export const MovieCard = (props: Props) => {
  return (
    <Link href={`/movie/${props.movie.id}`}>
      <Card className="h-full">
        <CardContent className="relative flex flex-col gap-2 text-sm">
          {props.movie.popularity > 100 && <Badge className="w-fit absolute top-4 right-4">Popular</Badge>}
          <Image
            className="rounded-md mt-6"
            src={`https://image.tmdb.org/t/p/w500${props.movie.posterPath}`}
            alt={props.movie.title}
            width={500}
            height={500}
          />

          <div className="flex items-center gap-2 justify-between">
            <Progress className="flex-1" value={props.movie.voteAverage * 10} /> {props.movie.voteAverage} (
            {props.movie.voteCount} votes)
          </div>

          <CardTitle>
            {props.movie.title}
            {props.movie.originalTitle !== props.movie.title && ` (${props.movie.originalTitle})`}
          </CardTitle>

          <div className="truncate">{props.movie.overview}</div>

          <p className="text-red-500">Genre: {props.movie.genreIds.join(", ")}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
