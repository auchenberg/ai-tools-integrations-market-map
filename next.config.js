/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.logo.dev'],
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