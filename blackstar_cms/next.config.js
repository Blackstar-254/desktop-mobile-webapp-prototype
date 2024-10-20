/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');
const { reroutes } = await import('./make_routes.cjs');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  rewrites: async () => {
    return [...reroutes.rewrites];
  },
  transpilePackages: ['geist'],

  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

export default config;
