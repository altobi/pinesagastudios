/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Website', // Replace 'Website' with your repository name
  assetPrefix: '/Website/', // Replace 'Website' with your repository name
}

module.exports = nextConfig 