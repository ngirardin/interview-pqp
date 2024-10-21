# Intro

## Features

- Home page with the trending movies of the day, using infinite scroll
- Search page
- Movie details page with edit form and delete button
- All the pages are protected by authentication, with hashed passwords

## Tech

- Daily trending movies are stored in the database, and refreshable using a PNPM script or an API call
- Axios + Zod to fetch and validate data from the TMDB API
- Postgres database, launched with docker. Migrations and requests using Prisma
- Secrets are stored in a .env file, parsed using `env-var`
- Type checking, linting and unused dependencies checking from a PNPM script (`pnpm validate`)

# Setup

- Ensure that `pnpm` and `docker` are installed

- Install dependencies:

```bash
pnpm install
```

- Copy the .env file to .env.local:

```bash
cp .env .env.local
```

- Add your `TMDB_API_KEY` to .env.local

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

## Manually

```bash
pnpm refresh
```

## Periodically

Create a cron job that runs the `pnpm refresh` or calls `GET /api/refresh`.
