/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    serverComponentsExternalPackages: ["appwrite"],
  },
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
        pathname: "/c2cdd5",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
