import Image from "next/image";
import { TrendingMovies } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

type Props = {
  movie: TrendingMovies;
};

export const MovieCard = (props: Props) => {
  return (
    <Link href={`/movie/${props.movie.id}`}>
      <Card className="h-full">
        <CardContent className="flex flex-col gap-2 text-sm">
          <Image
            className="rounded-md"
            src={`https://image.tmdb.org/t/p/w500${props.movie.posterPath}`}
            alt={props.movie.title}
            width={500}
            height={500}
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Progress className="w-24" value={props.movie.voteAverage * 10} /> {props.movie.voteAverage} (
              {props.movie.voteCount} votes)
            </div>
            {props.movie.popularity > 100 && <Badge>Popular</Badge>}
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
