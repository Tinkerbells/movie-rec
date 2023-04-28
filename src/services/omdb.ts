import { omdbApi } from "@/api";
import { type OmdbResponse } from "@/types/omdb";

const api = omdbApi();

export const getOmdbMovie = async (title: string) => {
  const res = await api.get<OmdbResponse>(`/?t=${title}&plot=short`);
  return res.data;
};
