export const absoluteUrl = (path: string): string => {
  return import.meta.env.DRUPAL_BASE_URL + path;
};

/**
 * Set edge cache headers for the response for ISR-like behavior
 */
export const setEdgeCacheHeaders = (
  headers: (HeadersInit | undefined) & Headers,
) => {
  if (headers) {
    const maxAge = 60; // 1 minute
    const revalidateSeconds = 60 * 60; // 1 hour
    headers.set(
      "Cache-Control",
      `public, s-max-age=${maxAge}, stale-while-revalidate=${revalidateSeconds}`,
    );
  }
};
