import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/branches',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
