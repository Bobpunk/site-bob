import { pilaresTechStack } from "@/lib/data/techStack";
import { Reveal } from "@/components/Reveal";

export function TechStack() {
  return (
    <section id="tech-stack" className="relative scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="annotation">Tech Stack</p>
          <h2 className="font-display mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            As ferramentas certas para{" "}
            <span className="text-copper">cada camada</span>
          </h2>
          <p className="mt-4 text-muted">
            Uma stack coesa em TypeScript de ponta a ponta — escolhida por
            performance, tipagem e velocidade de entrega, não por moda.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pilaresTechStack.map((pilar, i) => (
            <Reveal key={pilar.id} delay={(i % 3) * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-copper/50">
                <span
                  className="pointer-events-none absolute right-5 top-5 font-mono text-[11px] tracking-[0.18em] text-faint"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="pr-10 text-lg font-semibold text-foreground">
                  {pilar.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pilar.descricao}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {pilar.tecnologias.map((tech) => (
                    <span
                      key={tech.nome}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-sm font-medium text-foreground transition-colors group-hover:border-border-strong"
                    >
                      <span
                        className="font-mono text-xs font-semibold text-copper"
                        aria-hidden="true"
                      >
                        {tech.icone}
                      </span>
                      {tech.nome}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
