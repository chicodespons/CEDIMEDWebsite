import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_STRAPI_API_URL || "localhost",
        port: "8080",
        pathname: "/uploads/**/*",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      }
    ]
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    // Check if the fileLoaderRule exists before proceeding
    if (fileLoaderRule) {
      // Modify the file loader rule to ignore *.svg
      fileLoaderRule.exclude = /\.svg$/i;

      // Push the new rules for handling SVGs
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        }
      );
    } else {
      // If there's no existing rule for SVGs, simply add the SVGR rule
      config.module.rules.push({
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      });
    }

    return config;
  },
};

export default withNextIntl(nextConfig);
