import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function Contato() {
  return (
    <section id="contato" className="relative scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="blueprint-grid blueprint-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <Reveal className="relative z-10 mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface/80 px-6 py-14 text-center shadow-2xl shadow-black/40 backdrop-blur sm:px-14">
          <p className="annotation justify-center text-center">
            Vamos trabalhar juntos
          </p>

          <h2 className="font-display mx-auto mt-5 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
            Tem um projeto em mente?{" "}
            <span className="text-copper">O alicerce começa aqui.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Seja para arquitetar um sistema do zero, otimizar uma aplicação
            existente ou transformar uma ideia em código — estou pronto para
            ajudar.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="mailto:bob@example.com"
              className="inline-flex h-14 items-center gap-2 rounded-xl bg-copper px-8 text-base font-semibold text-copper-ink shadow-lg shadow-copper/20 transition-all hover:bg-copper-bright hover:shadow-copper/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Enviar E-mail
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center gap-2 rounded-xl border border-border-strong bg-surface-elevated/60 px-8 text-base font-semibold text-foreground transition-colors hover:border-blue hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
          </div>

          <p className="mt-8 font-mono text-xs tracking-[0.18em] text-faint">
            RESPOSTA EM ATÉ 24H · ORÇAMENTO SEM COMPROMISSO
          </p>
        </div>
      </Reveal>
    </section>
  );
}
