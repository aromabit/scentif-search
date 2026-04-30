/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  asePath: process.env.NODE_ENV === "production" ? "/scentif-search" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
