type Props = {
  params: {
    movieId: string;
  };
};

export default function EditMoviePage(props: Props) {
  return <div>{props.params.movieId}</div>;
}
