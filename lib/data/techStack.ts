export interface PilarTechStack {
  id: string;
  titulo: string;
  descricao: string;
  tecnologias: { nome: string; icone: string }[];
}

export const pilaresTechStack: PilarTechStack[] = [
  {
    id: "linguagem-base",
    titulo: "Linguagem Base",
    descricao: "Tipagem estática em toda a stack — front, back e mobile.",
    tecnologias: [{ nome: "TypeScript", icone: "TS" }],
  },
  {
    id: "back-end",
    titulo: "Back-end",
    descricao: "APIs escaláveis, tipadas e com arquitetura modular.",
    tecnologias: [
      { nome: "Node.js", icone: "Node" },
      { nome: "NestJS", icone: "Ne" },
    ],
  },
  {
    id: "front-end-web",
    titulo: "Front-end Web",
    descricao: "SSR, ISR e otimização Core Web Vitals nativa.",
    tecnologias: [{ nome: "Next.js", icone: "Next" }],
  },
  {
    id: "mobile",
    titulo: "Mobile",
    descricao: "iOS e Android com um único código base.",
    tecnologias: [
      { nome: "React Native", icone: "RN" },
      { nome: "Expo", icone: "Expo" },
    ],
  },
  {
    id: "jogos",
    titulo: "Jogos / Interatividade",
    descricao: "Interfaces ricas e experiências interativas no browser.",
    tecnologias: [{ nome: "Phaser", icone: "Ph" }],
  },
  {
    id: "banco-cache",
    titulo: "Banco e Cache",
    descricao: "Dados transacionais com latência mínima via cache.",
    tecnologias: [
      { nome: "PostgreSQL", icone: "PG" },
      { nome: "Redis", icone: "Re" },
      { nome: "Drizzle ORM", icone: "Dz" },
    ],
  },
  {
    id: "infraestrutura",
    titulo: "Infraestrutura",
    descricao: "Containers OCI, sem overhead de daemon — mais rápido que Docker.",
    tecnologias: [{ nome: "Podman", icone: "Pod" }],
  },
];