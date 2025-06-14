import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    remotePatterns: [
      // Local development Strapi
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Current production/staging Strapi
      {
        protocol: "https",
        hostname: "strapi.cedimed.brussels",
        port: "8080",
        pathname: "/uploads/**/*",
      },
      // Temporary development Strapi (from your env)
      {
        protocol: "http",
        hostname: "oso004o8co8sog0s8o04s40k.188.245.222.221.sslip.io",
        pathname: "/uploads/**",
      },
      // Placeholder service
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
