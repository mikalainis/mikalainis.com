/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/consultancy.html',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
