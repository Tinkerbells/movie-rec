interface ITmdbImageLoader {
  src: string;
  width: number;
}
export const TmdbImageLoader = ({ src }: ITmdbImageLoader) => {
  return `https://image.tmdb.org/t/p/w400/${src}`;
};
