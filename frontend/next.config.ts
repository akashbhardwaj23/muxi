import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [{
      hostname : "res.cloudinary.com"
    }]
  }
};

  console.log("Next config is ", process.env.NEXT_PUBLIC_APIKEY);
  console.log("Next config is ", process.env.NEXT_PUBLIC_AUTHDOMAIN);
  console.log("Next config is ", process.env.NEXT_PUBLIC_PROJECTID);
  console.log("Next config is ", process.env.NEXT_PUBLIC_DATABASE_URL); 
  console.log("Next config is ", process.env.NEXT_PUBLIC_STORAGE_BUCKET);
  console.log("Next config is ", process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID);
  console.log("Next config is ", process.env.NEXT_PUBLIC_APP_ID);


export default nextConfig;
