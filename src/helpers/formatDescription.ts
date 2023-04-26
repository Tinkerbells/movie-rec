export const formatDescription = (description: string) => {
  const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  const a = description.split(" ").slice(0, 20);
  if (a[a.length - 1]?.indexOf(punctuation)) {
    a.pop();
  }
  return a.join(" ") + "...";
};
