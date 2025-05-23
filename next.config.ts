import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.montek.dev",
        pathname: "**"
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "**"
      },
    ]
  } 
};

export default nextConfig;
