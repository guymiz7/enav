export const BASE_PATH =
  process.env.NODE_ENV === "production" ? "/enav" : "";

export const asset = (p: string) =>
  `${BASE_PATH}${p.startsWith("/") ? p : `/${p}`}`;
