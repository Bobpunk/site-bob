"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/Reveal";

const ClientPhaserGame = dynamic(
  () => import("./PhaserGame").then((mod) => mod.PhaserGame),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-video w-full items-center justify-center bg-surface" style={{ minHeight: "400px" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
          <p className="font-mono text-xs tracking-[0.18em] text-muted">
            MONTANDO O BALANÇO...
          </p>
        </div>
      </div>
    ),
  },
);

export function Playground() {
  return (
    <section id="playground" className="scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="annotation">Playground</p>
          <h2 className="font-display mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            Um parquinho de <span className="text-copper">física em tempo real</span>
          </h2>
          <p className="mt-4 text-muted">
            Clique para empurrar o balanço — cada clique dá impulso na direção
            do movimento, como um empurrão de verdade. Simulação de pêndulo
            amortecido renderizada com Phaser, carregada sob demanda sem pesar
            no carregamento inicial da página.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-copper/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-blue/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-faint/60" />
              <span className="ml-auto font-mono text-[11px] tracking-[0.2em] text-faint">
                BALANCO.SCENE — PHASER 3
              </span>
            </div>
            <ClientPhaserGame />
            <div className="border-t border-border px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-faint">
              FIG.03 — PÊNDULO AMORTECIDO · θ&#39;&#39; = −ω²·sin(θ) − c·θ&#39;
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
