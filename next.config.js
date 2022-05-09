const { paths } = require('./Utils/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // {
      //   source: paths.HOME,
      //   destination: '/home',
      //   permanent: false,
      // },
    ];
  },
};

module.exports = nextConfig;
