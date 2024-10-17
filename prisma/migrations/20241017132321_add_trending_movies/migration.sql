-- CreateTable
CREATE TABLE "trending_movies" (
    "id" INTEGER NOT NULL,
    "backdrop_path" TEXT,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_path" TEXT,
    "media_type" TEXT NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "original_language" TEXT NOT NULL,
    "genre_ids" INTEGER[],
    "popularity" DOUBLE PRECISION NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "video" BOOLEAN NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,

    CONSTRAINT "trending_movies_pkey" PRIMARY KEY ("id")
);
