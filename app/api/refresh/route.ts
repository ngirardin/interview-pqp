import { NextResponse } from "next/server";

import { refreshTrendingMovies } from "@/lib/refreshTrendingMovies";

export async function GET() {
  await refreshTrendingMovies();

  return NextResponse.json({ message: "Trending movies refreshed" });
}
