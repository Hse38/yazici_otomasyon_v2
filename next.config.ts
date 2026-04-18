import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Avoid wrong workspace root when multiple lockfiles exist on the machine / CI
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/favicon.png" }];
  },
};

export default nextConfig;
