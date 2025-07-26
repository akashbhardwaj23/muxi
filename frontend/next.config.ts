import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [{
      hostname : "res.cloudinary.com"
    }]
  }
};

console.log('--- BUILD ENVIRONMENT DEBUG ---');
console.log('NEXT_PUBLIC_FIREBASE_DATABASE_URL:', process.env.NEXT_PUBLIC_APIKEY);
console.log('NEXT_PUBLIC_FIREBASE_API_KEY:', process.env.NEXT_PUBLIC_DATABASE_URL);
console.log('--- END DEBUG ---');

export default nextConfig;
