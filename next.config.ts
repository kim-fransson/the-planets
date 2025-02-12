import type { NextConfig } from "next";
import localesPlugin from "@react-aria/optimize-locales-plugin";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    if (!isServer) {
      // Don't include any locale strings in the client JS bundle.
      config.plugins.push(localesPlugin.webpack({ locales: [] }));
    }

    return config;
  },
};

export default nextConfig;
