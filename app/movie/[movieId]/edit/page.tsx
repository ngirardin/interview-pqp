import { revalidatePath } from "next/cache";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { queryTrendingMoviesGet } from "@/models/queryTrendingMovieGet";
import { queryTrendingMovieUpdate } from "@/models/queryTrendingMovieUpdate";

type Props = {
  params: {
    movieId: string;
  };
};

export default async function EditMoviePage(props: Props) {
  const movieId = Number(props.params.movieId);
  const details = await queryTrendingMoviesGet({ movieId });

  const handleEdit = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const overview = formData.get("overview") as string;

    console.log(movieId, title, overview);
    await queryTrendingMovieUpdate({ movieId, title, overview });

    revalidatePath(`/movie/${movieId}`);
  };

  return (
    <div>
      <form action={handleEdit} className="space-y-4 max-w-xl">
        <div>
          <div className="font-bold">Title</div>
          <Input type="text" name="title" defaultValue={details.title} required={true} />
        </div>

        <div>
          <div className="font-bold">Overview</div>
          <Textarea className="h-52" name="overview" defaultValue={details.overview ?? ""} required={true} />
        </div>

        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
