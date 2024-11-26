/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["res.cloudinary.com"],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "res.cloudinary.com",
    //     pathname: "**",
    //   },
    // ],
  },
};

export default nextConfig;
