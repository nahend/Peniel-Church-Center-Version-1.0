const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.imgix.net" },
      { protocol: "https", hostname: "*.vercel.app" }
    ]
  }
};

export default nextConfig;
