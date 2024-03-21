/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.opendota.com",
      },
      { protocol: "https", hostname: "cdn.cloudflare.steamstatic.com" },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
