import Link from "next/link";

/**
 * Diagrama de arquitetura de referência — a "prancha técnica" do hero.
 * SVG inline para animar as linhas de fluxo com CSS (sem custo de JS).
 */
function DiagramaArquitetura() {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-copper/90" />
        <span className="h-2.5 w-2.5 rounded-full bg-blue/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-faint/60" />
        <span className="ml-auto font-mono text-[11px] tracking-[0.2em] text-faint">
          ARQUITETURA.SVG
        </span>
      </div>

      <svg
        viewBox="0 0 560 430"
        className="block w-full"
        role="img"
        aria-label="Diagrama de arquitetura: cliente conectado à API NestJS, que consulta cache Redis e banco PostgreSQL"
      >
        {/* grid de fundo */}
        <defs>
          <pattern id="hero-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--color-blue)"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="560" height="430" fill="url(#hero-grid)" />

        {/* fluxos */}
        <g
          className="diagram-flow"
          stroke="var(--color-copper)"
          strokeWidth="2"
          fill="none"
          strokeOpacity="0.85"
        >
          <path d="M 280 96 L 280 176" />
          <path d="M 236 232 C 170 260 150 290 150 330" />
          <path d="M 324 232 C 390 260 410 290 410 330" />
        </g>

        {/* etiquetas de fluxo */}
        <g fontFamily="var(--font-plex-mono)" fontSize="11" fill="var(--color-faint)">
          <text x="292" y="140">https · &lt;40ms</text>
          <text x="80" y="290">cache hit · &lt;1ms</text>
          <text x="418" y="290">drizzle · pool</text>
        </g>

        {/* nós */}
        <g fontFamily="var(--font-plex-mono)" textAnchor="middle">
          <g>
            <rect x="192" y="40" width="176" height="56" rx="12" fill="var(--color-surface-elevated)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
            <circle className="diagram-node" cx="212" cy="68" r="4" fill="var(--color-blue-bright)" />
            <text x="288" y="73" fontSize="15" fill="var(--color-foreground)" letterSpacing="2">CLIENTE</text>
          </g>

          <g>
            <rect x="192" y="176" width="176" height="56" rx="12" fill="var(--color-surface-elevated)" stroke="var(--color-copper)" strokeWidth="2" />
            <circle className="diagram-node" cx="212" cy="204" r="4" fill="var(--color-copper-bright)" />
            <text x="288" y="209" fontSize="15" fill="var(--color-copper-bright)" letterSpacing="2">API · NESTJS</text>
          </g>

          <g>
            <rect x="62" y="330" width="176" height="56" rx="12" fill="var(--color-surface-elevated)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
            <circle className="diagram-node" cx="82" cy="358" r="4" fill="var(--color-copper)" style={{ animationDelay: "0.6s" }} />
            <text x="150" y="363" fontSize="15" fill="var(--color-foreground)" letterSpacing="2">REDIS</text>
          </g>

          <g>
            <rect x="322" y="330" width="176" height="56" rx="12" fill="var(--color-surface-elevated)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
            <circle className="diagram-node" cx="342" cy="358" r="4" fill="var(--color-blue)" style={{ animationDelay: "1.2s" }} />
            <text x="410" y="363" fontSize="15" fill="var(--color-foreground)" letterSpacing="2">POSTGRES</text>
          </g>
        </g>
      </svg>

      <figcaption className="border-t border-border px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-faint">
        FIG.01 — ARQUITETURA DE REFERÊNCIA · P50 &lt; 40MS
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:pt-40 lg:pb-32">
      {/* papel milimetrado ao fundo */}
      <div className="blueprint-grid blueprint-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-blue/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="annotation animate-rise">Full Stack &amp; Arquitetura de Software</p>

          <h1
            className="font-display animate-rise mt-6 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Software de Alta Performance,{" "}
            <span className="text-copper">Arquitetado</span> para Crescer.
          </h1>

          <p
            className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "160ms" }}
          >
            Do código à infraestrutura: transformo problemas complexos em
            soluções escaláveis, seguras e ágeis. Desenvolvedor Full Stack com
            uma longa bagagem em tecnologia e foco em arquitetura robusta.
          </p>

          <div
            className="animate-rise mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="#contato"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-copper px-7 text-base font-semibold text-copper-ink shadow-lg shadow-copper/20 transition-all hover:bg-copper-bright hover:shadow-copper/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Contratar como Desenvolvedor
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="#contato"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface-elevated/60 px-7 text-base font-semibold text-foreground transition-colors hover:border-blue hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Solicitar Orçamento de Projeto
            </Link>
          </div>

          <dl
            className="animate-rise mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6 font-mono"
            style={{ animationDelay: "320ms" }}
          >
            <div>
              <dt className="text-[11px] tracking-[0.18em] text-faint">UPTIME ALVO</dt>
              <dd className="mt-1 text-xl font-semibold text-foreground">99.9%</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.18em] text-faint">LATÊNCIA P50</dt>
              <dd className="mt-1 text-xl font-semibold text-foreground">&lt;40ms</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.18em] text-faint">STACK</dt>
              <dd className="mt-1 text-xl font-semibold text-copper">TS · E2E</dd>
            </div>
          </dl>
        </div>

        <div className="animate-rise" style={{ animationDelay: "280ms" }}>
          <DiagramaArquitetura />
        </div>
      </div>
    </section>
  );
}
