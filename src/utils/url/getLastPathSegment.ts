/**
 * Returns the last segment of a URL pathname.
 * 
 * Examples:
 *  "/dashboard/users/123" -> "123"
 *  "/dashboard/users/" -> "users"
 *  "/" -> null
 */
export function getLastPathSegment(path: string): string | null {
  if (!path) return null;

  // Remove query params and hash if someone passes full URL
  const cleanPath = path.split("?")[0].split("#")[0];

  const segments = cleanPath
    .split("/")
    .filter(Boolean);

  return segments.length ? segments.at(-1)! : null;
}