import { CategoriaProjeto, type Projeto } from "@/types/projeto";

// Mock isolado — substituir por chamada Drizzle quando o banco estiver ativo.
// Substitua este import em components/Portfolio.tsx por:
//   import { getProjetos } from "@/lib/db/queries";
//   import { CategoriaProjeto, type Projeto } from "@/types/projeto";
// O componente permanece inalterado pois consome o mesmo tipo Projeto.

export const projetos: Projeto[] = [
  {
    id: "medbooking",
    nome: "MedBooking",
    descricao:
      "Plataforma de agendamento médico com arquitetura serverless, cache Redis para disponibilidade em tempo real e PostgreSQL para dados transacionais.",
    descricaoNegocio:
      "Otimização de Custos — redução de no-shows e agendamento inteligente com notificações automatizadas.",
    categoria: CategoriaProjeto.Corporativo,
    stack: ["PHP8+", "MARIADB", "TAILWIND.CSS"],
    imagemUrl: "/projetos/medbooking.svg",
    link: null,
  },
  {
    id: "landing-laiza",
    nome: "Landing_Laiza",
    descricao:
      "Landing page de alta conversão com Next.js App Router, animações CSS otimizadas e formulário de captura integrado.",
    descricaoNegocio:
      "Presença Digital — página profissional que converte visitantes em leads qualificados para o negócio da cliente.",
    categoria: CategoriaProjeto.Corporativo,
    stack: ["TypeScript", "Next.js", "Tailwind CSS"],
    imagemUrl: "/projetos/landing-laiza.svg",
    link: null,
  },
  {
    id: "cashflow",
    nome: "CashFlow",
    descricao:
      "Sistema de controle financeiro pessoal com dashboard interativo, categorização automática e relatórios exportáveis.",
    descricaoNegocio:
      "Segurança dos seus Dados — controle financeiro completo com criptografia e armazenamento local seguro.",
    categoria: CategoriaProjeto.Corporativo,
    stack: ["PHP8+", "PDO", "SESSIONS", "MARIADB","CSS PURO"],
    imagemUrl: "/projetos/cashflow.svg",
    link: null,
  },
  {
    id: "metadriver",
    nome: "MetaDriver",
    descricao:
      "Motor de metadados para sistemas distribuídos — mapeamento dinâmico de schemas, caching em Redis e sincronização em tempo real via WebSockets.",
    descricaoNegocio:
      "Arquitetura Avançada — manipulação de dados em tempo real com cache distribuído e consistência eventual.",
    categoria: CategoriaProjeto.Tecnico,
    stack: ["JS VANILLA", "TAILWIND.CSS"],
    imagemUrl: "/projetos/metadriver.svg",
    link: null,
  },
  {
    id: "trampro",
    nome: "TramPRO",
    descricao:
      "Sistema de rastreamento de processos judiciais com filas Redis, processamento assíncrono e integração com APIs de tribunais brasileiros.",
    descricaoNegocio:
      "Processamento Assíncrono — arquitetura orientada a eventos para manipular grandes volumes de dados jurídicos com baixa latência.",
    categoria: CategoriaProjeto.Tecnico,
    stack: ["TypeScript", "DrizzleORM", "NestJS", "PostgreSQL", "Redis", "Podman"],
    imagemUrl: "/projetos/trampro.svg",
    link: null,
  },
  {
    id: "logitrack",
    nome: "LogiTrack",
    descricao:
      "Plataforma de rastreamento logístico com geolocalização, atualizações em tempo real e painel de analytics para rotas de entrega.",
    descricaoNegocio:
      "Tempo Real — pipeline de eventos com Redis Streams para tracking de entregas com latência inferior a 100ms.",
    categoria: CategoriaProjeto.Tecnico,
    stack: ["PHP8+","Laravel 11", "MariaDB","Samctum"],
    imagemUrl: "/projetos/logitrack.svg",
    link: null,
  },
  {
    id: "dofus-receitas",
    nome: "Dofus_Receitas",
    descricao:
      "Ferramenta interativa de crafting para o jogo Dofus, com árvore de dependências de receitas, cache Redis para consultas instantâneas e UI em React.",
    descricaoNegocio:
      "Performance com Cache — Redis reduz consultas complexas de árvore de crafting de O(n²) para O(1) em chamadas subsequentes.",
    categoria: CategoriaProjeto.Tecnico,
    stack: ["Python3+","Flask","JS Vanilla", "CSS3+"],
    imagemUrl: "/projetos/dofus-receitas.svg",
    link: null,
  },
  {
    id: "ia-supermario",
    nome: "IA_SuperMario",
    descricao:
      "Projeto experimental de IA com algoritmo genético (NEAT) aplicado ao Super Mario World — os agentes aprendem a jogar sozinhos.",
    descricaoNegocio:
      "R&D — exploração de algoritmos evolutivos e redes neurais para tomada de decisão em ambientes complexos.",
    categoria: CategoriaProjeto.Tecnico,
    stack: ["Python3+","PYautogui","Keras","OpenCV"],
    imagemUrl: "/projetos/ia-supermario.svg",
    link: null,
  },
];