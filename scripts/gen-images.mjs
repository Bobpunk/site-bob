// Gera as imagens SVG fictícias do site (covers do portfólio + retrato).
// Uso: node scripts/gen-images.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outProjetos = join(root, "public", "projetos");
mkdirSync(outProjetos, { recursive: true });

const C = {
  bg: "#0a101b",
  surface: "#0f1826",
  line: "#1d2b44",
  lineStrong: "#2e4266",
  fg: "#e8eef7",
  muted: "#8ca2c0",
  faint: "#5c7396",
  copper: "#e2985a",
  copperBright: "#f0b27e",
  blue: "#5b8bc9",
  blueBright: "#9cc3f0",
};

const MONO = "'IBM Plex Mono', ui-monospace, 'Cascadia Code', monospace";

const defs = `
  <defs>
    <pattern id="gridS" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${C.blue}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
    <pattern id="gridL" width="120" height="120" patternUnits="userSpaceOnUse">
      <path d="M 120 0 L 0 0 0 120" fill="none" stroke="${C.blue}" stroke-opacity="0.12" stroke-width="1"/>
    </pattern>
    <linearGradient id="copperGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.copperBright}"/>
      <stop offset="1" stop-color="${C.copper}"/>
    </linearGradient>
  </defs>`;

function crosshair(x, y) {
  return `<g stroke="${C.copper}" stroke-opacity="0.55" stroke-width="1.5">
    <line x1="${x - 9}" y1="${y}" x2="${x + 9}" y2="${y}"/>
    <line x1="${x}" y1="${y - 9}" x2="${x}" y2="${y + 9}"/>
  </g>`;
}

// Moldura comum dos covers: fundo, grid, cantos e rodapé de prancha técnica.
function cover({ id, nome, categoria, fig, motif }) {
  const W = 1200;
  const H = 675;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ilustração do projeto ${nome}">
  ${defs}
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#gridS)"/>
  <rect width="${W}" height="${H}" fill="url(#gridL)"/>
  ${crosshair(36, 36)}${crosshair(W - 36, 36)}${crosshair(36, H - 36)}${crosshair(W - 36, H - 36)}
  ${motif}
  <g font-family="${MONO}">
    <text x="64" y="${H - 74}" font-size="30" font-weight="600" fill="${C.fg}" letter-spacing="2">${nome}</text>
    <text x="64" y="${H - 44}" font-size="15" fill="${C.faint}" letter-spacing="3">${fig} · ${categoria.toUpperCase()}</text>
  </g>
  <g font-family="${MONO}" font-size="14" fill="${C.copper}" opacity="0.85">
    <text x="${W - 64}" y="${H - 44}" text-anchor="end" letter-spacing="3">BOB.DEV</text>
  </g>
</svg>`;
}

// Janela de app estilizada usada dentro dos motifs
function janela(x, y, w, h, titulo) {
  return `
  <g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${C.surface}" stroke="${C.lineStrong}"/>
    <line x1="${x}" y1="${y + 44}" x2="${x + w}" y2="${y + 44}" stroke="${C.line}"/>
    <circle cx="${x + 26}" cy="${y + 22}" r="6" fill="${C.copper}" opacity="0.9"/>
    <circle cx="${x + 48}" cy="${y + 22}" r="6" fill="${C.blue}" opacity="0.7"/>
    <circle cx="${x + 70}" cy="${y + 22}" r="6" fill="${C.faint}" opacity="0.6"/>
    <text x="${x + w - 22}" y="${y + 28}" text-anchor="end" font-family="${MONO}" font-size="14" fill="${C.faint}" letter-spacing="2">${titulo}</text>
  </g>`;
}

/* ── Motifs por projeto ─────────────────────────────── */

const medbooking = () => {
  const cells = [];
  const startX = 420;
  const startY = 190;
  const destaque = new Set([9, 12, 17, 24]);
  for (let i = 0; i < 28; i++) {
    const cx = startX + (i % 7) * 72;
    const cy = startY + Math.floor(i / 7) * 62;
    const hot = destaque.has(i);
    cells.push(
      `<rect x="${cx}" y="${cy}" width="58" height="48" rx="8" fill="${hot ? C.copper : C.surface}" fill-opacity="${hot ? 0.9 : 1}" stroke="${hot ? C.copperBright : C.line}"/>`,
    );
    if (hot)
      cells.push(
        `<circle cx="${cx + 29}" cy="${cy + 24}" r="5" fill="${C.bg}"/>`,
      );
  }
  return `
  ${janela(360, 120, 620, 430, "medbooking.app/agenda")}
  <g font-family="${MONO}" font-size="14" fill="${C.muted}">
    ${["SEG", "TER", "QUA", "QUI", "SEX", "SAB", "DOM"].map((d, i) => `<text x="${449 + i * 72}" y="${178}" text-anchor="middle" letter-spacing="1">${d}</text>`).join("")}
  </g>
  ${cells.join("")}
  <g transform="translate(222,300)">
    <circle r="86" fill="${C.surface}" stroke="${C.lineStrong}" stroke-width="2"/>
    <circle r="86" fill="none" stroke="${C.copper}" stroke-width="4" stroke-dasharray="270 271" stroke-linecap="round" transform="rotate(-90)"/>
    <line x1="0" y1="0" x2="0" y2="-46" stroke="${C.fg}" stroke-width="4" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="30" y2="18" stroke="${C.copperBright}" stroke-width="4" stroke-linecap="round"/>
    <circle r="6" fill="${C.copperBright}"/>
  </g>`;
};

const landingLaiza = () => `
  ${janela(300, 100, 600, 470, "laiza.com.br")}
  <rect x="340" y="180" width="290" height="26" rx="6" fill="${C.fg}" opacity="0.92"/>
  <rect x="340" y="218" width="220" height="26" rx="6" fill="${C.fg}" opacity="0.55"/>
  <rect x="340" y="272" width="360" height="12" rx="6" fill="${C.muted}" opacity="0.4"/>
  <rect x="340" y="294" width="310" height="12" rx="6" fill="${C.muted}" opacity="0.3"/>
  <rect x="340" y="342" width="170" height="44" rx="10" fill="url(#copperGrad)"/>
  <rect x="524" y="342" width="150" height="44" rx="10" fill="none" stroke="${C.lineStrong}"/>
  <g>
    <rect x="340" y="430" width="160" height="104" rx="10" fill="${C.surface}" stroke="${C.line}"/>
    <rect x="516" y="430" width="160" height="104" rx="10" fill="${C.surface}" stroke="${C.line}"/>
    <rect x="692" y="430" width="160" height="104" rx="10" fill="${C.surface}" stroke="${C.line}"/>
    <circle cx="372" cy="462" r="12" fill="${C.blue}" opacity="0.8"/>
    <circle cx="548" cy="462" r="12" fill="${C.copper}" opacity="0.8"/>
    <circle cx="724" cy="462" r="12" fill="${C.blueBright}" opacity="0.8"/>
  </g>
  <g transform="translate(760,150)">
    <rect x="0" y="0" width="180" height="220" rx="12" fill="${C.surface}" stroke="${C.copper}" stroke-opacity="0.6"/>
    <circle cx="90" cy="82" r="42" fill="${C.copper}" opacity="0.25" stroke="${C.copper}"/>
    <circle cx="90" cy="70" r="20" fill="${C.copper}" opacity="0.7"/>
    <path d="M 52 122 Q 90 96 128 122 L 128 140 L 52 140 Z" fill="${C.copper}" opacity="0.7"/>
    <rect x="36" y="160" width="108" height="10" rx="5" fill="${C.muted}" opacity="0.5"/>
    <rect x="52" y="182" width="76" height="10" rx="5" fill="${C.muted}" opacity="0.3"/>
  </g>`;

const cashflow = () => {
  const bars = [92, 150, 118, 196, 164, 238, 210];
  const barSvg = bars
    .map((h, i) => {
      const x = 420 + i * 76;
      return `<rect x="${x}" y="${470 - h}" width="46" height="${h}" rx="8" fill="${i === 5 ? "url(#copperGrad)" : C.blue}" fill-opacity="${i === 5 ? 1 : 0.45}"/>`;
    })
    .join("");
  const pts = bars.map((h, i) => `${443 + i * 76},${450 - h - 26}`).join(" ");
  return `
  ${janela(360, 110, 620, 440, "cashflow.app/dashboard")}
  ${barSvg}
  <polyline points="${pts}" fill="none" stroke="${C.copperBright}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  ${bars.map((h, i) => `<circle cx="${443 + i * 76}" cy="${450 - h - 26}" r="7" fill="${C.bg}" stroke="${C.copperBright}" stroke-width="3"/>`).join("")}
  <g transform="translate(180,240)">
    <circle r="92" fill="${C.surface}" stroke="${C.lineStrong}" stroke-width="2"/>
    <text x="0" y="-12" text-anchor="middle" font-family="${MONO}" font-size="16" fill="${C.muted}" letter-spacing="2">SALDO</text>
    <text x="0" y="26" text-anchor="middle" font-family="${MONO}" font-size="30" font-weight="600" fill="${C.copperBright}">+32%</text>
  </g>`;
};

const metadriver = () => {
  const nodes = [
    [600, 330, "CORE", C.copper],
    [380, 200, "SCHEMA_A", C.blue],
    [380, 460, "SCHEMA_B", C.blue],
    [820, 200, "REDIS", C.copperBright],
    [820, 460, "WS_SYNC", C.blueBright],
    [600, 140, "REGISTRY", C.muted],
    [600, 520, "PG", C.blue],
  ];
  const links = [
    [1, 0],
    [2, 0],
    [0, 3],
    [0, 4],
    [5, 0],
    [0, 6],
  ];
  const linkSvg = links
    .map(([a, b]) => {
      const [x1, y1] = nodes[a];
      const [x2, y2] = nodes[b];
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.lineStrong}" stroke-width="2" stroke-dasharray="7 7"/>`;
    })
    .join("");
  const nodeSvg = nodes
    .map(
      ([x, y, label, cor], i) => `
    <g transform="translate(${x},${y})">
      <rect x="-74" y="-30" width="148" height="60" rx="12" fill="${C.surface}" stroke="${cor}" stroke-width="${i === 0 ? 3 : 1.5}"/>
      <text x="0" y="6" text-anchor="middle" font-family="${MONO}" font-size="17" fill="${i === 0 ? C.copperBright : C.fg}" letter-spacing="2">${label}</text>
    </g>`,
    )
    .join("");
  return linkSvg + nodeSvg;
};

const trampro = () => {
  const filas = [0, 1, 2]
    .map((f) => {
      const y = 200 + f * 120;
      const docs = [0, 1, 2, 3]
        .map(
          (d) =>
            `<rect x="${300 + d * 74}" y="${y}" width="56" height="66" rx="8" fill="${C.surface}" stroke="${d === 0 ? C.copper : C.line}"/>
         <line x1="${312 + d * 74}" y1="${y + 18}" x2="${344 + d * 74}" y2="${y + 18}" stroke="${C.faint}" stroke-width="3"/>
         <line x1="${312 + d * 74}" y1="${y + 33}" x2="${336 + d * 74}" y2="${y + 33}" stroke="${C.faint}" stroke-width="3" opacity="0.6"/>
         <line x1="${312 + d * 74}" y1="${y + 48}" x2="${340 + d * 74}" y2="${y + 48}" stroke="${C.faint}" stroke-width="3" opacity="0.35"/>`,
        )
        .join("");
      return `${docs}
      <line x1="612" y1="${y + 33}" x2="700" y2="${y + 33}" stroke="${C.copper}" stroke-width="2.5" stroke-dasharray="8 8" marker-end="url(#seta)"/>`;
    })
    .join("");
  return `
  <defs><marker id="seta" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="${C.copper}" stroke-width="1.8"/></marker></defs>
  <text x="300" y="168" font-family="${MONO}" font-size="15" fill="${C.faint}" letter-spacing="3">FILA REDIS · PROCESSOS</text>
  ${filas}
  <g transform="translate(790,180)">
    <rect width="230" height="340" rx="14" fill="${C.surface}" stroke="${C.lineStrong}"/>
    <text x="24" y="42" font-family="${MONO}" font-size="15" fill="${C.muted}" letter-spacing="2">WORKERS</text>
    ${[0, 1, 2, 3]
      .map(
        (w) => `
      <g transform="translate(24,${68 + w * 66})">
        <circle cx="16" cy="16" r="10" fill="none" stroke="${w < 3 ? C.copperBright : C.faint}" stroke-width="3"/>
        <circle cx="16" cy="16" r="4" fill="${w < 3 ? C.copperBright : C.faint}"/>
        <rect x="42" y="8" width="120" height="7" rx="3.5" fill="${C.blue}" opacity="${w < 3 ? 0.75 : 0.25}"/>
        <rect x="42" y="21" width="84" height="7" rx="3.5" fill="${C.blue}" opacity="${w < 3 ? 0.45 : 0.15}"/>
      </g>`,
      )
      .join("")}
  </g>`;
};

const logitrack = () => `
  ${janela(280, 100, 640, 470, "logitrack.io/rotas")}
  <g stroke="${C.line}" stroke-width="1.5" opacity="0.8">
    ${[190, 260, 330, 400, 470].map((y) => `<line x1="300" y1="${y}" x2="900" y2="${y}"/>`).join("")}
    ${[380, 470, 560, 650, 740, 830].map((x) => `<line x1="${x}" y1="164" x2="${x}" y2="550"/>`).join("")}
  </g>
  <polyline points="340,500 470,500 470,400 560,400 560,300 700,300 700,230 830,230"
    fill="none" stroke="${C.copper}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="14 10"/>
  <circle cx="340" cy="500" r="12" fill="${C.blue}" stroke="${C.bg}" stroke-width="3"/>
  <g transform="translate(830,230)">
    <circle r="26" fill="${C.copper}" opacity="0.22"/>
    <path d="M 0 -20 C 12 -20 20 -11 20 0 C 20 13 0 30 0 30 C 0 30 -20 13 -20 0 C -20 -11 -12 -20 0 -20 Z" fill="${C.copperBright}"/>
    <circle cy="-1" r="7" fill="${C.bg}"/>
  </g>
  <g transform="translate(950,150)">
    <rect width="200" height="150" rx="12" fill="${C.surface}" stroke="${C.lineStrong}"/>
    <text x="20" y="36" font-family="${MONO}" font-size="14" fill="${C.muted}" letter-spacing="2">LATÊNCIA</text>
    <text x="20" y="76" font-family="${MONO}" font-size="34" font-weight="600" fill="${C.copperBright}">84ms</text>
    <text x="20" y="112" font-family="${MONO}" font-size="14" fill="${C.faint}">p99 · streams</text>
  </g>`;

const dofusReceitas = () => {
  const leaf = (x, y, cor) => `
    <g transform="translate(${x},${y})">
      <rect x="-52" y="-24" width="104" height="48" rx="10" fill="${C.surface}" stroke="${cor}" stroke-opacity="0.8"/>
      <circle cx="-30" cy="0" r="9" fill="${cor}" opacity="0.7"/>
      <rect x="-12" y="-5" width="52" height="10" rx="5" fill="${C.muted}" opacity="0.5"/>
    </g>`;
  return `
  <g stroke="${C.lineStrong}" stroke-width="2" stroke-dasharray="6 6" fill="none">
    <path d="M 600 240 L 400 360"/>
    <path d="M 600 240 L 600 360"/>
    <path d="M 600 240 L 800 360"/>
    <path d="M 400 400 L 320 500"/>
    <path d="M 400 400 L 480 500"/>
    <path d="M 800 400 L 720 500"/>
    <path d="M 800 400 L 880 500"/>
  </g>
  <g transform="translate(600,210)">
    <rect x="-84" y="-34" width="168" height="68" rx="12" fill="${C.surface}" stroke="${C.copper}" stroke-width="2.5"/>
    <text x="0" y="-2" text-anchor="middle" font-family="${MONO}" font-size="16" fill="${C.copperBright}" letter-spacing="1">RECEITA</text>
    <text x="0" y="20" text-anchor="middle" font-family="${MONO}" font-size="13" fill="${C.faint}">cache O(1)</text>
  </g>
  ${leaf(400, 384, C.blue)}${leaf(600, 384, C.blueBright)}${leaf(800, 384, C.blue)}
  ${leaf(320, 524, C.faint)}${leaf(480, 524, C.faint)}${leaf(720, 524, C.faint)}${leaf(880, 524, C.faint)}`;
};

const iaSupermario = () => {
  const px = [];
  // Personagem pixelado abstrato (paleta cobre) em grid 8x8
  const mapa = [
    "..XXXX..",
    ".XXXXXX.",
    ".XOXXOX.",
    ".XXXXXX.",
    "..XXXX..",
    ".X.XX.X.",
    "XX.XX.XX",
    ".X....X.",
  ];
  mapa.forEach((row, r) => {
    [...row].forEach((c, col) => {
      if (c === ".") return;
      const cor = c === "O" ? C.bg : C.copper;
      px.push(
        `<rect x="${330 + col * 34}" y="${200 + r * 34}" width="30" height="30" rx="4" fill="${cor}" ${c === "X" ? `fill-opacity="${0.55 + ((r + col) % 3) * 0.18}"` : ""}/>`,
      );
    });
  });
  const layers = [3, 4, 2];
  const nn = [];
  layers.forEach((n, li) => {
    const x = 720 + li * 130;
    for (let i = 0; i < n; i++) {
      const y = 360 - (n - 1) * 45 + i * 90;
      nn.push(
        `<circle cx="${x}" cy="${y}" r="17" fill="${C.surface}" stroke="${li === 2 ? C.copperBright : C.blue}" stroke-width="2.5"/>`,
      );
      if (li < layers.length - 1) {
        for (let j = 0; j < layers[li + 1]; j++) {
          const y2 = 360 - (layers[li + 1] - 1) * 45 + j * 90;
          nn.unshift(
            `<line x1="${x + 17}" y1="${y}" x2="${x + 113}" y2="${y2}" stroke="${C.lineStrong}" stroke-width="1.5" opacity="0.8"/>`,
          );
        }
      }
    }
  });
  return `
  <text x="330" y="170" font-family="${MONO}" font-size="15" fill="${C.faint}" letter-spacing="3">AGENTE · GERAÇÃO 42</text>
  ${px.join("")}
  <text x="720" y="170" font-family="${MONO}" font-size="15" fill="${C.faint}" letter-spacing="3">REDE NEAT</text>
  ${nn.join("")}`;
};

const covers = [
  { id: "medbooking", nome: "MedBooking", categoria: "Solução Corporativa", fig: "FIG.04", motif: medbooking() },
  { id: "landing-laiza", nome: "Landing_Laiza", categoria: "Solução Corporativa", fig: "FIG.05", motif: landingLaiza() },
  { id: "cashflow", nome: "CashFlow", categoria: "Solução Corporativa", fig: "FIG.06", motif: cashflow() },
  { id: "metadriver", nome: "MetaDriver", categoria: "R&D Técnico", fig: "FIG.07", motif: metadriver() },
  { id: "trampro", nome: "TramPRO", categoria: "R&D Técnico", fig: "FIG.08", motif: trampro() },
  { id: "logitrack", nome: "LogiTrack", categoria: "R&D Técnico", fig: "FIG.09", motif: logitrack() },
  { id: "dofus-receitas", nome: "Dofus_Receitas", categoria: "R&D Técnico", fig: "FIG.10", motif: dofusReceitas() },
  { id: "ia-supermario", nome: "IA_SuperMario", categoria: "R&D Técnico", fig: "FIG.11", motif: iaSupermario() },
];

for (const c of covers) {
  writeFileSync(join(outProjetos, `${c.id}.svg`), cover(c));
  console.log(`✔ public/projetos/${c.id}.svg`);
}

/* ── Retrato fictício (Sobre) ───────────────────────── */
const retrato = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="960" viewBox="0 0 800 960" role="img" aria-label="Retrato ilustrado do desenvolvedor em estilo de desenho técnico">
  ${defs}
  <rect width="800" height="960" fill="${C.bg}"/>
  <rect width="800" height="960" fill="url(#gridS)"/>
  <rect width="800" height="960" fill="url(#gridL)"/>
  ${crosshair(40, 40)}${crosshair(760, 40)}${crosshair(40, 920)}${crosshair(760, 920)}

  <circle cx="400" cy="420" r="250" fill="${C.blue}" opacity="0.07"/>
  <circle cx="400" cy="420" r="250" fill="none" stroke="${C.blue}" stroke-opacity="0.35" stroke-dasharray="4 10"/>

  <!-- Busto estilizado -->
  <g stroke-linecap="round">
    <path d="M 400 200 C 330 200 296 258 296 330 C 296 402 340 462 400 462 C 460 462 504 402 504 330 C 504 258 470 200 400 200 Z"
      fill="${C.surface}" stroke="${C.lineStrong}" stroke-width="3"/>
    <path d="M 296 320 C 288 236 336 178 400 178 C 464 178 512 236 504 320 C 492 268 470 244 400 244 C 330 244 308 268 296 320 Z"
      fill="${C.line}" stroke="${C.lineStrong}" stroke-width="2"/>
    <!-- Óculos cobre -->
    <g fill="none" stroke="${C.copper}" stroke-width="5">
      <rect x="312" y="316" width="76" height="58" rx="16"/>
      <rect x="412" y="316" width="76" height="58" rx="16"/>
      <line x1="388" y1="340" x2="412" y2="340"/>
      <line x1="312" y1="336" x2="296" y2="330"/>
      <line x1="488" y1="336" x2="504" y2="330"/>
    </g>
    <path d="M 366 416 Q 400 436 434 416" fill="none" stroke="${C.muted}" stroke-width="4"/>
    <!-- Ombros / moletom -->
    <path d="M 220 700 C 220 560 300 496 400 496 C 500 496 580 560 580 700 L 580 760 L 220 760 Z"
      fill="${C.surface}" stroke="${C.lineStrong}" stroke-width="3"/>
    <path d="M 352 496 L 400 560 L 448 496" fill="none" stroke="${C.line}" stroke-width="3"/>
    <line x1="400" y1="560" x2="400" y2="700" stroke="${C.line}" stroke-width="3" stroke-dasharray="2 10"/>
    <!-- Fones -->
    <path d="M 286 320 C 268 210 330 140 400 140 C 470 140 532 210 514 320"
      fill="none" stroke="${C.copperBright}" stroke-width="9"/>
    <rect x="266" y="304" width="34" height="72" rx="14" fill="${C.copper}"/>
    <rect x="500" y="304" width="34" height="72" rx="14" fill="${C.copper}"/>
  </g>

  <!-- Laptop -->
  <g transform="translate(400,806)">
    <rect x="-190" y="-64" width="380" height="24" rx="8" fill="${C.line}" stroke="${C.lineStrong}"/>
    <rect x="-160" y="-176" width="320" height="112" rx="10" fill="${C.surface}" stroke="${C.lineStrong}" stroke-width="2"/>
    <g font-family="${MONO}" font-size="15" fill="${C.blueBright}">
      <text x="-140" y="-146">const stack = [</text>
      <text x="-118" y="-122" fill="${C.copperBright}">"ts", "next", "nest"</text>
      <text x="-140" y="-98" fill="${C.blueBright}">];</text>
    </g>
  </g>

  <!-- Cotas de desenho técnico -->
  <g font-family="${MONO}" font-size="15" fill="${C.faint}" letter-spacing="2">
    <line x1="620" y1="200" x2="620" y2="460" stroke="${C.faint}" stroke-width="1.5"/>
    <line x1="608" y1="200" x2="632" y2="200" stroke="${C.faint}" stroke-width="1.5"/>
    <line x1="608" y1="460" x2="632" y2="460" stroke="${C.faint}" stroke-width="1.5"/>
    <text x="640" y="336" writing-mode="tb" letter-spacing="4">FULL STACK</text>
    <text x="72" y="880" letter-spacing="3">FIG.02 — O ARQUITETO</text>
    <text x="72" y="908" letter-spacing="3" fill="${C.copper}">DESDE A INFÂNCIA ATÉ A NUVEM</text>
  </g>
</svg>`;

writeFileSync(join(root, "public", "retrato.svg"), retrato);
console.log("✔ public/retrato.svg");
