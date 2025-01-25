export const toSnakeCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, "_");
};
