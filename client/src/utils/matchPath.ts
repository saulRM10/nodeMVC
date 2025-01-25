// Utility to match dynamic paths
export const matchPath = (
  pathname: string,
  pattern: string,
  exceptions: string[] = [],
) => {
  const pathParts = pathname.split("/").filter(Boolean);
  const patternParts = pattern.split("/").filter(Boolean);

  if (
    pathParts.length !== patternParts.length ||
    exceptions.includes(pathname)
  ) {
    return false;
  }

  return patternParts.every(
    (part, i) => part.startsWith(":") || part === pathParts[i],
  );
};
