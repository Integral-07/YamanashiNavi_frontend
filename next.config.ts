import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {

  async rewrites(){
    return[
      {
        source: '/api/:path*',
        destination: "https://c3c6-133-23-3-117.ngrok-free.app/api/:path*/",
      }
    ]
  }
};