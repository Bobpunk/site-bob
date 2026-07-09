"use client";

import { useEffect, useRef, useCallback } from "react";
import Phaser from "phaser";

const GRID = 16;
const SCALE = 22;
const SIZE = GRID * SCALE;

const COLORS = {
  bg: 0x0a101b,
  grid: 0x1a2740,
  gridCenter: 0x5b8bc9,
  snakeHead: 0x1a2333,
  snakeBody: 0xe2985a,
  food: 0x5b8bc9,
  foodGlow: 0x8cb8e8,
};

let onScoreChange: ((s: number) => void) | null = null;
let onGameOverChange: ((g: boolean) => void) | null = null;

class SnakeScene extends Phaser.Scene {
  private snake: { x: number; y: number }[] = [];
  private direction = { x: 1, y: 0 };
  private nextDirection = { x: 1, y: 0 };
  private food = { x: 0, y: 0 };
  private score = 0;
  private gameOver = false;
  private moveTimer = 0;
  private moveInterval = 150;
  private baseInterval = 150;
  private graphics!: Phaser.GameObjects.Graphics;
  private gameOverTexts: Phaser.GameObjects.Text[] = [];

  constructor() {
    super({ key: "SnakeScene" });
  }

  create() {
    const g = this.add.graphics();
    this.graphics = g;

    this.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
      event.preventDefault();
      const key = event.key;
      if (["ArrowUp", "w", "W"].includes(key) && this.direction.y !== 1)
        this.nextDirection = { x: 0, y: -1 };
      if (["ArrowDown", "s", "S"].includes(key) && this.direction.y !== -1)
        this.nextDirection = { x: 0, y: 1 };
      if (["ArrowLeft", "a", "A"].includes(key) && this.direction.x !== 1)
        this.nextDirection = { x: -1, y: 0 };
      if (["ArrowRight", "d", "D"].includes(key) && this.direction.x !== -1)
        this.nextDirection = { x: 1, y: 0 };
      if (key === " ") this.restart();
    });

    this.input.on("pointerdown", () => {
      if (this.gameOver) this.restart();
    });

    this.restart();
  }

  restart() {
    this.snake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.score = 0;
    this.gameOver = false;
    this.moveTimer = 0;
    this.moveInterval = this.baseInterval;
    this.gameOverTexts.forEach((t) => t.destroy());
    this.gameOverTexts = [];
    onScoreChange?.(0);
    onGameOverChange?.(false);
    this.spawnFood();
    this.draw();
  }

  private spawnFood() {
    let pos: { x: number; y: number };
    do {
      pos = {
        x: Phaser.Math.Between(1, GRID - 2),
        y: Phaser.Math.Between(1, GRID - 2),
      };
    } while (this.snake.some((s) => s.x === pos.x && s.y === pos.y));
    this.food = pos;
  }

  update(_time: number, delta: number) {
    if (this.gameOver) return;

    this.moveTimer += delta;
    if (this.moveTimer < this.moveInterval) return;
    this.moveTimer = 0;

    this.direction = { ...this.nextDirection };

    const head = this.snake[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y,
    };

    if (
      newHead.x < 0 ||
      newHead.x >= GRID ||
      newHead.y < 0 ||
      newHead.y >= GRID
    ) {
      this.endGame();
      return;
    }

    if (this.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
      this.endGame();
      return;
    }

    this.snake.unshift(newHead);

    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score++;
      this.moveInterval = Math.max(60, this.baseInterval - this.score * 4);
      this.spawnFood();
      onScoreChange?.(this.score);
    } else {
      this.snake.pop();
    }

    this.draw();
  }

  private endGame() {
    this.gameOver = true;
    onGameOverChange?.(true);
    this.draw();
  }

  private draw() {
    const g = this.graphics;
    g.clear();

    g.fillStyle(COLORS.bg, 1);
    g.fillRect(0, 0, SIZE, SIZE);

    g.lineStyle(1, COLORS.grid, 0.3);
    for (let x = 0; x <= GRID; x++) {
      g.lineBetween(x * SCALE, 0, x * SCALE, SIZE);
    }
    for (let y = 0; y <= GRID; y++) {
      g.lineBetween(0, y * SCALE, SIZE, y * SCALE);
    }

    const cx = Math.floor(GRID / 2) * SCALE;
    const cy = Math.floor(GRID / 2) * SCALE;
    g.lineStyle(1.5, COLORS.gridCenter, 0.2);
    g.lineBetween(cx - 4, cy, cx + 4, cy);
    g.lineBetween(cx, cy - 4, cx, cy + 4);

    const fx = this.food.x * SCALE + SCALE / 2;
    const fy = this.food.y * SCALE + SCALE / 2;
    g.fillStyle(COLORS.foodGlow, 0.2);
    g.fillCircle(fx, fy, SCALE * 0.6);
    g.fillStyle(COLORS.food, 1);
    g.fillCircle(fx, fy, SCALE * 0.35);

    for (let i = 0; i < this.snake.length; i++) {
      const seg = this.snake[i];
      const sx = seg.x * SCALE + SCALE / 2;
      const sy = seg.y * SCALE + SCALE / 2;
      const radius = SCALE * 0.4 - (i === 0 ? 0 : 1);

      if (i === 0) {
        g.fillStyle(COLORS.snakeHead, 1);
      } else {
        g.fillStyle(COLORS.snakeBody, 0.9 - (i / this.snake.length) * 0.4);
      }

      g.fillCircle(sx, sy, radius);

      if (i === 0 && !this.gameOver) {
        g.fillStyle(0xffffff, 1);
        g.fillCircle(sx - 3, sy - 3, 2);
        g.fillCircle(sx + 3, sy - 3, 2);
        g.fillStyle(0x1a2333, 1);
        g.fillCircle(sx - 2 + this.direction.x, sy - 3 + this.direction.y, 1);
        g.fillCircle(sx + 4 + this.direction.x, sy - 3 + this.direction.y, 1);
      }
    }

    if (this.gameOver) {
      const txt = this.add
        .text(SIZE / 2, SIZE / 2, "GAME OVER", {
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "28px",
          color: "#e2985a",
          letterSpacing: 6,
        })
        .setOrigin(0.5)
        .setAlpha(0);
      this.gameOverTexts.push(txt);
      this.tweens.add({
        targets: txt,
        alpha: 1,
        duration: 300,
        ease: "Cubic.easeOut",
      });
    }
  }
}

export function SnakeGame({
  onScoreChange: scoreCb,
  onGameOverChange: gameOverCb,
}: {
  onScoreChange?: (s: number) => void;
  onGameOverChange?: (g: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    onScoreChange = scoreCb ?? null;
    onGameOverChange = gameOverCb ?? null;
  });

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: SIZE,
      height: SIZE,
      parent: containerRef.current,
      backgroundColor: "#0a101b",
      scene: [SnakeScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: { width: 160, height: 160 },
        max: { width: SIZE, height: SIZE },
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  const handleRestart = useCallback(() => {
    const scene = gameRef.current?.scene.getScene("SnakeScene") as SnakeScene | undefined;
    scene?.restart();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        className="w-full overflow-hidden rounded-lg"
        style={{ maxWidth: `${SIZE}px` }}
      />
      <button
        onClick={handleRestart}
        className="rounded-md bg-copper px-5 py-2 font-mono text-xs font-semibold tracking-[0.12em] text-copper-ink transition-colors hover:bg-copper-bright"
      >
        ↻ REINICIAR
      </button>
    </div>
  );
}