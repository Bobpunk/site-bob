Atue como um Arquiteto de Software e Desenvolvedor Full Stack Senior. Crie uma landing page de alta conversão, moderna e profissional (Dark Mode), que equilibre autoridade técnica (para recrutadores) com foco em soluções de negócio (para clientes freelancer).

1. Hero Section
Título: "Software de Alta Performance, Arquitetado para Crescer."
Subtítulo: "Do código à infraestrutura: transformo problemas complexos em soluções escaláveis, seguras e ágeis. Desenvolvedor Full Stack com uma longa bagagem em tecnologia e foco em arquitetura robusta."
CTAs (dois botões): "Contratar como Desenvolvedor" | "Solicitar Orçamento de Projeto".

2. Sobre Mim (O Diferencial)
Redija um texto que conte minha trajetória sem expor números exatos de idade ou tempo: meu primeiro contato com computadores começou ainda na infância, e desde então construí uma longa bagagem prática — passei por técnico de informática, analista de suporte, e hoje me dedico integralmente à programação Full Stack. Enfatize que minha senioridade vem dessa vivência acumulada com tecnologia, da capacidade de aprender qualquer ferramenta rapidamente e do foco constante em escalabilidade, baixa latência, segurança de dados e arquitetura eficiente desde o primeiro dia. Encerre a seção (ou o rodapé do site) com a linha: "Construindo o futuro com base em décadas de evolução tecnológica."

3. Tech Stack (organizada por pilares, conforme tabela abaixo)
- Linguagem Base: TypeScript
- Back-end: Node.js + NestJS
- Front-end Web: Next.js (App Router)
- Mobile: React Native + Expo
- Jogos / Interatividade: Phaser
- Banco e Cache: PostgreSQL + Redis (com Drizzle ORM)
- Infraestrutura: Podman

4. Portfólio (com filtro/abas por público)
Crie um layout com duas abas/filtros para segmentar a audiência sem assustar o cliente leigo e, ao mesmo tempo, impressionar o recrutador técnico:
- Aba "Soluções Corporativas" (foco em negócio, para clientes): MedBooking, Landing_Laiza, CashFlow. Use termos como "Otimização de Custos", "Agendamento Inteligente" e "Segurança dos seus Dados".
- Aba "Experiência Técnica / R&D" (foco em complexidade, para recrutadores): MetaDriver, TramPRO, LogiTrack, Dofus_Receitas, IA_SuperMario. Aqui o destaque é a arquitetura, o uso de Redis para cache e a capacidade de manipular dados em tempo real.

5. Playground
Inclua uma seção "Playground" com um componente Phaser para demonstrar interatividade e a capacidade de criar interfaces ricas.

6. Requisitos Técnicos de Implementação
- Front-end em Next.js (App Router), com o Phaser implementado via import dinâmico (sem SSR) e componente client-side.
- Layout limpo, com foco em performance (Core Web Vitals) e acessibilidade.
- O back-end e o banco de dados serão integrados no futuro (PostgreSQL + Redis + Drizzle ORM). Portanto, modele os dados do portfólio usando uma interface/type chamada Projeto (ex.: id, nome, descricao, categoria, stack, imagemUrl, link), e não um array estático solto — isso garante que, ao trocar os dados mockados por uma chamada real ao banco via Drizzle, baste substituir o import, sem refatorar a estrutura de componentes.

7. Roadmap de Execução (siga exatamente esta ordem, uma etapa por vez, e aguarde confirmação antes de avançar para a próxima)

Etapa 1 — Setup do Projeto
Criar projeto Next.js (App Router) + TypeScript + Tailwind CSS. Configurar ESLint, estrutura de pastas (app/, components/, lib/, types/) e o arquivo de tema Dark Mode.

Etapa 2 — Tipagem e Dados Mockados
Criar o arquivo types/projeto.ts com a interface Projeto. Criar lib/data/projetos.ts com um array mockado tipado, já dividido por categoria (corporativo / tecnico).

Etapa 3 — Hero Section
Implementar o componente Hero com título, subtítulo e os dois CTAs, responsivo e com toque visual moderno (gradientes sutis, tipografia forte).

Etapa 4 — Seção Sobre Mim
Implementar o componente Sobre com o texto da trajetória e a frase de encerramento no rodapé.

Etapa 5 — Tech Stack
Implementar o componente TechStack exibindo os pilares em cards ou grid, com ícones das tecnologias.

Etapa 6 — Portfólio com Filtro
Implementar o componente Portfolio consumindo os dados de lib/data/projetos.ts, com toggle/abas entre "Soluções Corporativas" e "Experiência Técnica/R&D".

Etapa 7 — Playground com Phaser
Implementar o componente Playground com import dinâmico do Phaser (ssr: false), isolado em um Client Component, sem travar o carregamento do restante da página.

Etapa 8 — CTA Final e Footer
Implementar a seção final de contato/CTA e o rodapé com a frase de encerramento e links (GitHub, LinkedIn, e-mail).

Etapa 9 — Revisão de Performance e Acessibilidade
Rodar checklist de Core Web Vitals (lazy loading de imagens, fontes otimizadas, atributos alt, contraste no Dark Mode, navegação por teclado).

Etapa 10 — Preparação para Integração Futura
Confirmar que todos os dados mockados estão isolados em lib/data/, prontos para serem substituídos por chamadas Drizzle + PostgreSQL sem alterar os componentes.

Não avance para a etapa seguinte sem antes apresentar o resultado da etapa atual para revisão.