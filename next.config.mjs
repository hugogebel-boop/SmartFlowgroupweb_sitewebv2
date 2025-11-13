const isProd = process.env.NODE_ENV === 'production';
const repoName = 'SmartFlowgroupweb_sitewebv2';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? `/${repoName}` : undefined,
  assetPrefix: isProd ? `/${repoName}/` : undefined,
};

export default nextConfig;
