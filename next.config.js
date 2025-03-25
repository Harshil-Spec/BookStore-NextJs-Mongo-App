// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_PUBLIC_MONGO_URI: process.env.MONGO_URI,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            { key: "Referrer-Policy", value: "no-referrer" }, // or change to 'no-referrer'
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  
