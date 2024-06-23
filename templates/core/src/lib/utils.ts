export const absoluteUrl = (path: string): string => {
  return import.meta.env.DRUPAL_BASE_URL + path;
};
