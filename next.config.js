/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    basePath: '/beyaldiz-web',
    output: 'export',
    distDir: 'dist',
    images: {
        unoptimized: true,
    },
  }
   
  module.exports = nextConfig