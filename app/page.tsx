import { tmdbGetTrending } from "@/lib/themoviedb/tmdbGetTrending";

export default async function Home() {
  const trending = await tmdbGetTrending();

  return <div>{JSON.stringify(trending, null, 2)}</div>;
}
