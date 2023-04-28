import { RECOMMENDATIONS_COUNT } from "@/consts";

export const generateGenrePrompt = (
  genres: string[],
  isMovies: boolean,
  query: string
) => {
  return `Give me recommendations of ${RECOMMENDATIONS_COUNT} ${
    isMovies ? "movies" : "series"
  } ${
    genres.length > 0 && // eslint-disable-line
    "in thies genres" + genres.join(" ") + "all come together"
  } ${query && "and this description query - " + query.trim()} 
  } Provide a  RFC8259 compliant JSON response following this format without deviation.
[{
  "title": "movie title",
}]
The JSON response:`;
};

export const generateSimilarPrompt = (
  favorites: string[],
  isMovies: boolean
) => {
  return `Give me recommendations of ${RECOMMENDATIONS_COUNT} ${
    isMovies ? "movies" : "series"
  } similar to those ones ${favorites.join(
    " "
  )} Provide a  RFC8259 compliant JSON response following this format without deviation.
[{
  "title": "movie title",
}]
The JSON response:`;
};

export const generateUpdatePrompt = () => {
  return `Give me another ${RECOMMENDATIONS_COUNT} 
Provide a  RFC8259 compliant JSON response following this format without deviation.
[{
  "title": "movie title",
}]
The JSON response:
`;
};
