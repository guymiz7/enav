/** @type {import('next').NextConfig} */
const repo = "enav";
// Only apply basePath when deploying to GitHub Pages (project page lives under /enav).
// On Vercel and other hosts the site is served from the root.
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
