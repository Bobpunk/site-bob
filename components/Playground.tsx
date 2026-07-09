"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const SnakeGame = dynamic(
  () => import("./SnakeGame").then((mod) => mod.SnakeGame),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square w-full max-w-[352px] items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
          <p className="font-mono text-xs tracking-[0.18em] text-muted">
            CARREGANDO...
          </p>
        </div>
      </div>
    ),
  },
);

export function Playground() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  return (
    <section id="playground" className="scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="annotation">Playground</p>
          <h2 className="font-display mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            Snake clássico em <span className="text-copper">tempo real</span>
          </h2>
          <p className="mt-4 text-muted">
            Setas ou WASD para mover. Clique ou Espaço para reiniciar. A cada
            comida a cobra cresce e a velocidade aumenta. Snake clássico
            renderizado com Phaser, carregado sob demanda.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-copper/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-blue/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-faint/60" />
              <span className="ml-auto font-mono text-[11px] tracking-[0.2em] text-faint">
                {gameOver ? "GAME OVER" : `SCORE: ${String(score).padStart(3, "0")}`}
              </span>
            </div>
            <div className="flex justify-center p-6">
              <SnakeGame
                onScoreChange={setScore}
                onGameOverChange={setGameOver}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
