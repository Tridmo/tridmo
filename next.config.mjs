import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join('src/styles')],
        prependData: `@import "variables.scss";`
    },
};

export default nextConfig;
