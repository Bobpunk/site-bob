"use client";

import { useState } from "react";
import Image from "next/image";
import { projetos } from "@/lib/data/projetos";
import { CategoriaProjeto, type Projeto } from "@/types/projeto";
import { Reveal } from "@/components/Reveal";

type Aba = "corporativo" | "tecnico";

const abas: { id: Aba; label: string; descricao: string }[] = [
  {
    id: "corporativo",
    label: "Soluções Corporativas",
    descricao: "Projetos com foco em negócio e resultados para clientes.",
  },
  {
    id: "tecnico",
    label: "Experiência Técnica / R&D",
    descricao:
      "Arquitetura complexa, cache em Redis e manipulação em tempo real.",
  },
];

function ProjetoCard({ projeto }: { projeto: Projeto }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-copper/50 hover:shadow-xl hover:shadow-black/40">
      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface-elevated">
        <Image
          src={projeto.imagemUrl}
          alt={`Ilustração do projeto ${projeto.nome}`}
          width={1200}
          height={675}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-mono text-lg font-semibold tracking-tight text-foreground">
          {projeto.nome}
        </h3>

        <p className="mt-2 text-sm font-medium leading-relaxed text-copper-bright">
          {projeto.descricaoNegocio}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {projeto.descricao}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {projeto.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-surface-elevated px-2.5 py-1 font-mono text-xs text-muted ring-1 ring-inset ring-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {projeto.link && (
          <a
            href={projeto.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-copper hover:text-copper-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          >
            Ver projeto
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

export function Portfolio() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>("corporativo");

  const projetosFiltrados = projetos.filter(
    (p) =>
      p.categoria ===
      (abaAtiva === "corporativo"
        ? CategoriaProjeto.Corporativo
        : CategoriaProjeto.Tecnico),
  );

  const abaAtual = abas.find((a) => a.id === abaAtiva)!;

  return (
    <section id="portfolio" className="relative scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="annotation">Portfólio</p>
          <h2 className="font-display mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            Projetos que unem <span className="text-copper">performance</span> e
            propósito
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Filtro de projetos por público"
              className="inline-flex w-fit rounded-xl border border-border bg-surface p-1"
            >
              {abas.map((aba) => {
                const ativa = aba.id === abaAtiva;
                return (
                  <button
                    key={aba.id}
                    role="tab"
                    aria-selected={ativa}
                    aria-controls={`painel-${aba.id}`}
                    id={`aba-${aba.id}`}
                    onClick={() => setAbaAtiva(aba.id)}
                    className={`h-10 rounded-lg px-4 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper ${
                      ativa
                        ? "bg-copper text-copper-ink shadow-md shadow-copper/20"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {aba.label}
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs tracking-wide text-faint">
              {abaAtual.descricao}
            </p>
          </div>
        </Reveal>

        <div
          role="tabpanel"
          id={`painel-${abaAtiva}`}
          aria-labelledby={`aba-${abaAtiva}`}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projetosFiltrados.map((projeto) => (
            <ProjetoCard key={projeto.id} projeto={projeto} />
          ))}
        </div>
      </div>
    </section>
  );
}
