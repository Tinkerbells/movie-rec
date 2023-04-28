import { tmdbApi } from "@/api";
import { type TmdbResponse } from "@/types/tmdb";

const api = tmdbApi();

export const getMovie = async (query: string) => {
  const res = await api.get<TmdbResponse>("/search/movie", {
    params: { query: query },
  });
  return res.data;
};
