const {paths} = require('./Utils/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: process.env.API_URL || "https://appistadium-dev.herokuapp.com/api/admin",
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL || "https://appistadium-dev.herokuapp.com/api/admin",
    },
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
