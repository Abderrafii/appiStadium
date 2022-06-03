const {paths} = require('./Utils/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'http://localhost:8000/api/admin',
    },
    reactStrictMode: false,
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
