export const useFormatDate = (dateNumber: number): string => {
  const date = new Date(dateNumber);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
