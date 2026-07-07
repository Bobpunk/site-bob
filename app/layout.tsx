import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Bob Dev | Full Stack Developer",
  description:
    "Software de alta performance, arquitetado para crescer. Desenvolvedor Full Stack com foco em arquitetura robusta e soluções escaláveis.",
  keywords: [
    "desenvolvedor full stack",
    "next.js",
    "node.js",
    "nestjs",
    "typescript",
    "react native",
    "postgresql",
    "redis",
    "software arquitetura",
    "freelancer developer",
  ],
  authors: [{ name: "Bob Dev" }],
  openGraph: {
    title: "Bob Dev | Full Stack Developer",
    description:
      "Software de alta performance, arquitetado para crescer. Desenvolvedor Full Stack com foco em arquitetura robusta.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} dark h-full scroll-smooth`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-copper focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-copper-ink focus:shadow-lg focus:outline-none"
        >
          Pular para o conteúdo principal
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
