/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "enav";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
