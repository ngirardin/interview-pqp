import { getSessionOrRedirect } from "@/lib/auth/getSessionOrRedirect";
import { queryTrendingMoviesSearch } from "@/models/queryTrendingMoviesSearch";

import { SearchFormClient } from "./SearchForm.client";

export default async function SearchPage() {
  await getSessionOrRedirect();

  const handleSearch = async (query: string) => {
    "use server";

    return queryTrendingMoviesSearch({ query });
  };

  return <SearchFormClient handleSearch={handleSearch} />;
}
