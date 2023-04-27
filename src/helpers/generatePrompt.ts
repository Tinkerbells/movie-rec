import { RECOMMENDATIONS_COUNT } from "@/consts";

export const generateGenrePrompt = (genres: string[], query?: string) => {
  return `Give me recommendations of ${RECOMMENDATIONS_COUNT} movies in this genres ${genres.join(
    " "
  )} all comes together ${
    query && "and this description query - " + query.trim()
  } Provide a  RFC8259 compliant JSON response following this format without deviation.
[{
  "title": "movie title",
}]
The JSON response:`;
};

export const generateSimilarPrompt = (favorites: string[]) => {
  return `Give me recommendations of ${RECOMMENDATIONS_COUNT} movies similar to those ones ${favorites.join(
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
