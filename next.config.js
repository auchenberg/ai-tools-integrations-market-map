/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'img.logo.dev',
            }
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.json$/,
            type: 'json',
        });
        return config;
    },
}

module.exports = nextConfig 