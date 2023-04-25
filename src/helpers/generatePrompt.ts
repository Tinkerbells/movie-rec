export const generateGenrePrompt = (genres: string[], query?: string) => {
  return `Give me recommendations of 5 movies in this genres ${genres.join(
    " "
  )} all comes together ${
    query && "and this description query - " + `"` + query.trim() + `"`
  } :
          [{
          \"title\": \"Movie title\", 
          \"description\": \"Movie description in 20 words\"
          }]
          The JSON object is:"`;
};

export const generateSimilarPrompt = (favorites: string[]) => {
  return `Give me recommendations of 5 movies similar to those ones ${favorites.join(
    " "
  )} 
  } :
          [{
          \"title\": \"Movie title\", 
          \"description\": \"Movie description in 20 words\"
          }]
          The JSON object is:"`;
};
