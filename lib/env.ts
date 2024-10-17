import envVar from "env-var";

export const env = {
  TMDB_API_KEY: envVar.get("TMDB_API_KEY").required().asString(),
};
