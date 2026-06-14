// 

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "plus.unsplash.com",   pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com",  pathname: "/**" },
      { protocol: "https", hostname: "*.supabase.co",       pathname: "/**" },
    ],
  },
};
module.exports = nextConfig;