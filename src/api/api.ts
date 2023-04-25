import { env } from "@/env.mjs";
import axios from "axios";

export const tmdbApi = () => {
  return axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
      api_key: env.TMDB_API_KEY,
    },
  });
};
