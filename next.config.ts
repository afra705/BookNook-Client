import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "books.google.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "www.wenesyzadolik.org.uk",
      // },
      // {
      //   protocol: "https",
      //   hostname: "img.magnific.com",
      // },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
