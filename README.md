https://api.themoviedb.org/3

https://developers.themoviedb.org/3/getting-started/introduction

https://developers.themoviedb.org/3/trending/get-trending
https://developers.themoviedb.org/3/movies/get-movie-details

- install next auth (logging by email / password)

- create a page that lists the trending movies of the day or month

- movie details page

- search feature, results are clickable and redirect to the movie details page

- store movie data in the database

- home made inifinte scroll on the movie list (hand rolled)

- refresh data once a day

- edit move data (title required)

- remove movies

- advanced search

- Récupérer plusieurs catégories et pouvoir changer le produit de catégorie ?

# Features

- axios pour les requêtes
- env-var pour parser les variables d'environnement
- zod pour valider les données
- prisma pour la gestion de la base de données
- docker pour la base de données de dev
- script pour sync les trending movies (remplace la db par les nouvelles données)

# Setup

- Ensure that `pnpm` is installed

```bash
pnpm install
```

- Copy the .env file to .env.local

```bash
cp .env .env.local
```

- Add `TMDB_API_KEY` to .env.local

- Start the docker container

```bash
docker compose up -d
```

- Run the migrations

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

# Start the app

```bash
docker compose up -d
pnpm dev
```

## Login

Use `test@test.com` and `pwd` as credentials.

# Refreshing the trending movies database

```bash
pnpm sync
```
