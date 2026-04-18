import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Avoid wrong workspace root when multiple lockfiles exist on the machine / CI
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
