export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  // @ts-ignore
  return date.toLocaleDateString("en-US", options);
};
