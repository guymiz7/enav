// Only prefix assets with /enav when building for GitHub Pages.
// On Vercel (and any other host) the site is served from the root.
export const BASE_PATH =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github-pages"
    ? "/enav"
    : "";

export const asset = (p: string) =>
  `${BASE_PATH}${p.startsWith("/") ? p : `/${p}`}`;
