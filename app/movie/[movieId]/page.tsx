import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getSessionOrRedirect } from "@/lib/auth/getSessionOrRedirect";
import { tmdbGetDetails } from "@/lib/themoviedb/tmdbGetDetails";
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

  const details = await tmdbGetDetails({ movieId });

  return (
    <div className="flex gap-2">
      <div className="flex-1 space-y-4">
        {/* Left col */}

        <div className="font-bold text-3xl">
          {movie.title}
          {movie.originalTitle !== movie.title && ` (${movie.originalTitle})`}
        </div>

        <div className="font-bold text-xl">{details.tagline}</div>

        <div>
          <span className="font-bold">Starring:</span>{" "}
          {details.credits.cast
            .slice(0, 6)
            .map((cast) => cast.name)
            .join(", ")}
        </div>

        <div>
          <Badge variant="default">{details.genres.map((genre) => genre.name).join(", ")}</Badge>
        </div>

        <div>{movie.overview}</div>

        <iframe
          key={details.videos.results[0].id}
          id="ytplayer"
          width="400"
          height="180"
          src={`https://www.youtube.com/embed/${details.videos.results[0].key}?autoplay=1&origin=http://localhost:3000`}
          frameBorder="0"
        ></iframe>

        {details.reviews.results.slice(0, 4).map((review) => (
          <div key={review.id} className="text-sm">
            <div className="font-bold">{review.author}</div>
            <div>{review.content}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {/* Right col */}
        <Image
          key={details.id}
          src={`https://image.tmdb.org/t/p/w500${details.images.posters[0].file_path}`}
          alt={details.title}
          width={200}
          height={300}
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Progress className="w-24" value={movie.voteAverage * 10} /> {movie.voteAverage} ({movie.voteCount} votes)
          </div>
          {movie.popularity > 100 && <Badge>Popular</Badge>}
        </div>

        <div>
          <span className="font-bold">Release Date:</span> {details.release_date}
        </div>

        <div>
          <span className="font-bold">Runtime:</span> {details.runtime} minutes
        </div>

        <div>
          <span className="font-bold">Budget:</span> ${details.budget}
        </div>
        <div className="ml-auto w-fit flex gap-2">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
    </div>
  );
}
