export enum CategoriaProjeto {
  Corporativo = "corporativo",
  Tecnico = "tecnico",
}

export type StackItem =
  | "TypeScript"
  | "Node.js"
  | "NestJS"
  | "Next.js"
  | "React Native"
  | "Expo"
  | "Phaser"
  | "PostgreSQL"
  | "Redis"
  | "Drizzle ORM"
  | "Podman"
  | "React"
  | "Tailwind CSS"
  | string;

export interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  descricaoNegocio: string;
  categoria: CategoriaProjeto;
  stack: StackItem[];
  imagemUrl: string;
  link: string | null;
}