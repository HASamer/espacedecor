import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/catalog", // send users to the homepage
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;