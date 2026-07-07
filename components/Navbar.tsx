"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#tech-stack", label: "Stack" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#playground", label: "Playground" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="#main-content"
          className="rounded-md font-mono text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
        >
          <span className="text-copper">bob</span>
          <span className="text-faint">@</span>
          <span>dev</span>
          <span className="text-faint">:~$</span>
          <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-copper/80 motion-safe:animate-pulse" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contato"
            className="ml-3 inline-flex h-9 items-center rounded-lg border border-copper/40 bg-copper/10 px-4 text-sm font-semibold text-copper-bright transition-colors hover:bg-copper/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          >
            Contato
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuAberto((v) => !v)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          className="rounded-md p-2 text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {menuAberto ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuAberto && (
        <div
          id="menu-mobile"
          className="border-t border-border bg-background/95 px-6 py-4 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuAberto(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-muted hover:bg-surface-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contato"
              onClick={() => setMenuAberto(false)}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-copper px-4 text-base font-semibold text-copper-ink hover:bg-copper-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
