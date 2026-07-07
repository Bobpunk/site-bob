import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Há um package-lock.json na pasta pai; fixa a raiz do workspace aqui.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      // Adicionar domínios de imagens quando o banco estiver ativo
    ],
  },
};

export default nextConfig;
