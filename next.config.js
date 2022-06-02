const {paths} = require('./Utils/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'https://appistadium.herokuapp.com/api/admin',
    },
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
