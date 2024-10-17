import { queryTrendingMoviesSearch } from "@/models/queryTrendingMoviesSearch";
import { SearchFormClient } from "./SearchForm.client";

export default function SearchPage() {
  const handleSearch = async (query: string) => {
    "use server";

    return queryTrendingMoviesSearch({ query });
  };

  return <SearchFormClient handleSearch={handleSearch} />;
}
