export const generateGenrePrompt = (genres: string[], query?: string) => {
  return `Give me recommendations of 3 movies in this genres ${genres.join(
    " "
  )} all comes together ${
    query && "and this description query - " + query.trim()
  } Provide a  RFC8259 compliant JSON response following this format without deviation.
[{
  "title": "movie title",
  "description": "movie description about 25 words",
}]
The JSON response:`;
};

export const generateSimilarPrompt = (favorites: string[]) => {
  return `Give me recommendations of 3 movies similar to those ones ${favorites.join(
    " "
  )} Provide a  RFC8259 compliant JSON response following this format without deviation.
[{
  "title": "movie title",
  "description": "movie description about 25 words",
}]
The JSON response:`;
};
