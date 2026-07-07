"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";

const COLORS = {
  bg: 0x0a101b,
  gridBlue: 0x5b8bc9,
  frame: 0x5b8bc9,
  frameDark: 0x2e4266,
  rope: 0x8ca2c0,
  copper: 0xe2985a,
  copperBright: 0xf0b27e,
  skin: 0xf0c9a0,
  hair: 0x4a3222,
  shirt: 0xe2985a,
  pants: 0x5b8bc9,
  fg: 0xe8eef7,
  faint: 0x5c7396,
};

/**
 * Balanço interativo: uma criança em um balanço com física de pêndulo.
 * Cada clique dá um empurrão na direção do movimento.
 */
class BalancoScene extends Phaser.Scene {
  private angle = 0.18; // rad — começa com um leve balanço
  private angVel = 0;
  private pivotX = 0;
  private pivotY = 0;
  private ropeLen = 260;

  private swing!: Phaser.GameObjects.Container;
  private pernas!: Phaser.GameObjects.Container;
  private estatico!: Phaser.GameObjects.Graphics;
  private hint!: Phaser.GameObjects.Text;
  private hintVisivel = true;
  private lastW = 0;
  private lastH = 0;

  constructor() {
    super({ key: "BalancoScene" });
  }

  create() {
    this.input.setDefaultCursor("pointer");
    this.buildWorld();

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      // Empurra na direção do movimento atual (amplifica como um empurrão real)
      const dir =
        Math.abs(this.angVel) > 0.08
          ? Math.sign(this.angVel)
          : this.angle >= 0
            ? -1
            : 1;
      this.angVel = Phaser.Math.Clamp(this.angVel + dir * 0.85, -2.6, 2.6);

      // Ondinha de feedback no ponto do clique
      const ripple = this.add.circle(pointer.x, pointer.y, 6);
      ripple.setStrokeStyle(2, COLORS.copperBright, 0.9);
      this.tweens.add({
        targets: ripple,
        radius: 34,
        alpha: 0,
        duration: 450,
        ease: "Cubic.easeOut",
        onComplete: () => ripple.destroy(),
      });

      if (this.hintVisivel) {
        this.hintVisivel = false;
        this.tweens.add({ targets: this.hint, alpha: 0, duration: 400 });
      }
    });

    this.scale.on("resize", () => {
      const { width, height } = this.scale;
      if (width !== this.lastW || height !== this.lastH) this.buildWorld();
    });
  }

  private buildWorld() {
    const { width, height } = this.scale;
    this.lastW = width;
    this.lastH = height;

    this.estatico?.destroy();
    this.swing?.destroy();
    this.hint?.destroy();

    const groundY = height - 42;
    const topBarY = Math.max(56, height * 0.16);
    this.pivotX = width / 2;
    this.pivotY = topBarY + 4;
    this.ropeLen = Math.max(150, groundY - topBarY - 74);

    const g = this.add.graphics();
    this.estatico = g;

    // Papel milimetrado
    g.lineStyle(1, COLORS.gridBlue, 0.05);
    for (let x = 0; x <= width; x += 24) g.lineBetween(x, 0, x, height);
    for (let y = 0; y <= height; y += 24) g.lineBetween(0, y, width, y);
    g.lineStyle(1, COLORS.gridBlue, 0.1);
    for (let x = 0; x <= width; x += 120) g.lineBetween(x, 0, x, height);
    for (let y = 0; y <= height; y += 120) g.lineBetween(0, y, width, y);

    // Marcas de canto (prancha técnica)
    g.lineStyle(1.5, COLORS.copper, 0.55);
    for (const [cx, cy] of [
      [28, 28],
      [width - 28, 28],
      [28, height - 28],
      [width - 28, height - 28],
    ]) {
      g.lineBetween(cx - 8, cy, cx + 8, cy);
      g.lineBetween(cx, cy - 8, cx, cy + 8);
    }

    // Chão
    g.lineStyle(3, COLORS.frameDark, 1);
    g.lineBetween(width * 0.08, groundY, width * 0.92, groundY);

    // Arco pontilhado do alcance do balanço (cota de engenharia)
    g.fillStyle(COLORS.faint, 0.35);
    for (let a = -0.95; a <= 0.95; a += 0.07) {
      const px = this.pivotX + Math.sin(a) * (this.ropeLen + 46);
      const py = this.pivotY + Math.cos(a) * (this.ropeLen + 46);
      if (py < groundY - 4) g.fillCircle(px, py, 1.6);
    }

    // Estrutura em A
    const barHalf = Math.min(width * 0.26, this.ropeLen * 0.9);
    const legSpread = barHalf + Math.min(width * 0.07, 56);
    g.lineStyle(6, COLORS.frame, 1);
    g.lineBetween(this.pivotX - barHalf, topBarY, this.pivotX + barHalf, topBarY);
    g.lineStyle(5, COLORS.frame, 0.9);
    g.lineBetween(this.pivotX - barHalf + 4, topBarY, this.pivotX - legSpread, groundY);
    g.lineBetween(this.pivotX + barHalf - 4, topBarY, this.pivotX + legSpread, groundY);
    // Travessas
    g.lineStyle(3, COLORS.frameDark, 1);
    const midY = (topBarY + groundY) / 2 + 14;
    g.lineBetween(this.pivotX - barHalf - (legSpread - barHalf) * 0.55, midY, this.pivotX - barHalf + 22, midY);
    g.lineBetween(this.pivotX + barHalf - 22, midY, this.pivotX + barHalf + (legSpread - barHalf) * 0.55, midY);

    // Pino do pivô
    g.fillStyle(COLORS.copperBright, 1);
    g.fillCircle(this.pivotX, this.pivotY, 5);

    this.buildSwing();

    this.hint = this.add
      .text(this.pivotX, topBarY - 28, "CLIQUE PARA EMPURRAR", {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "12px",
        color: "#8ca2c0",
        letterSpacing: 3,
      })
      .setOrigin(0.5)
      .setAlpha(this.hintVisivel ? 1 : 0);
  }

  private buildSwing() {
    const L = this.ropeLen;
    const gap = 34;

    const corpo = this.add.graphics();

    // Cordas
    corpo.lineStyle(3, COLORS.rope, 1);
    corpo.lineBetween(-gap, 0, -gap, L - 6);
    corpo.lineBetween(gap, 0, gap, L - 6);
    // Elos
    corpo.fillStyle(COLORS.rope, 0.7);
    for (let y = 14; y < L - 10; y += 22) {
      corpo.fillCircle(-gap, y, 2);
      corpo.fillCircle(gap, y, 2);
    }

    // Assento
    corpo.fillStyle(COLORS.copper, 1);
    corpo.fillRoundedRect(-gap - 8, L - 6, gap * 2 + 16, 12, 5);

    // ── Criança ──
    // Tronco (camiseta)
    corpo.fillStyle(COLORS.shirt, 1);
    corpo.fillRoundedRect(-13, L - 72, 26, 48, 9);
    // Braços segurando as cordas
    corpo.lineStyle(6, COLORS.shirt, 1);
    corpo.lineBetween(-9, L - 60, -gap + 2, L - 38);
    corpo.lineBetween(9, L - 60, gap - 2, L - 38);
    // Mãos
    corpo.fillStyle(COLORS.skin, 1);
    corpo.fillCircle(-gap + 2, L - 36, 5);
    corpo.fillCircle(gap - 2, L - 36, 5);
    // Cabeça
    corpo.fillCircle(0, L - 92, 17);
    // Cabelo
    corpo.fillStyle(COLORS.hair, 1);
    corpo.beginPath();
    corpo.arc(0, L - 94, 17, Math.PI, 0, false);
    corpo.fillPath();
    corpo.fillCircle(-11, L - 88, 4);
    corpo.fillCircle(11, L - 88, 4);
    // Olhos + sorriso
    corpo.fillStyle(0x1a2333, 1);
    corpo.fillCircle(-6, L - 90, 2);
    corpo.fillCircle(6, L - 90, 2);
    corpo.lineStyle(2, 0x1a2333, 1);
    corpo.beginPath();
    corpo.arc(0, L - 86, 7, 0.35, Math.PI - 0.35, false);
    corpo.strokePath();

    // Pernas (container separado para animar o "impulso")
    const pernasG = this.add.graphics();
    pernasG.lineStyle(7, COLORS.pants, 1);
    // Coxas
    pernasG.lineBetween(-6, 0, -8, 20);
    pernasG.lineBetween(6, 0, 10, 20);
    // Canelas
    pernasG.lineStyle(6, COLORS.pants, 1);
    pernasG.lineBetween(-8, 20, -6, 40);
    pernasG.lineBetween(10, 20, 14, 40);
    // Tênis
    pernasG.fillStyle(COLORS.copperBright, 1);
    pernasG.fillRoundedRect(-13, 38, 14, 8, 4);
    pernasG.fillRoundedRect(8, 38, 14, 8, 4);

    this.pernas = this.add.container(0, L - 26, [pernasG]);
    this.swing = this.add.container(this.pivotX, this.pivotY, [corpo, this.pernas]);
    this.swing.rotation = this.angle;
  }

  update(_time: number, delta: number) {
    const dt = Math.min(delta / 1000, 0.05);

    // Pêndulo amortecido: θ'' = -ω²·sin(θ) − c·θ'
    const omega2 = 4.6;
    const damping = 0.12;
    const angAcc = -omega2 * Math.sin(this.angle) - damping * this.angVel;
    this.angVel += angAcc * dt;
    this.angle += this.angVel * dt;

    if (this.swing) this.swing.rotation = this.angle;
    // As pernas "chutam" acompanhando a velocidade — dá vida ao movimento
    if (this.pernas) {
      this.pernas.rotation = Phaser.Math.Clamp(this.angVel * 0.35, -0.6, 0.6);
    }
  }
}

export function PhaserGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: Math.max(320, width),
      height: Math.max(240, height),
      parent: containerRef.current,
      backgroundColor: "#0a101b",
      scene: [BalancoScene],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="aspect-video w-full overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  );
}
