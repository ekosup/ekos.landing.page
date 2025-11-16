import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
};

export default createMDX()(nextConfig);
