import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join('src/styles')],
        prependData: `@import "variables.scss";`
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pub-5ae581681d8842d3920213d40f223944.r2.dev',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
