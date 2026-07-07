import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const trajetoria = [
  {
    fase: "Infância",
    titulo: "Primeiro contato com computadores",
    descricao: "A curiosidade que virou ofício: montar, desmontar e entender.",
  },
  {
    fase: "Base técnica",
    titulo: "Técnico de informática",
    descricao: "Hardware, redes e o hábito de diagnosticar qualquer problema.",
  },
  {
    fase: "Operação",
    titulo: "Analista de suporte",
    descricao: "Sistemas em produção, usuários reais e pressão de verdade.",
  },
  {
    fase: "Hoje",
    titulo: "Full Stack em tempo integral",
    descricao: "Arquitetura, escalabilidade e segurança desde o primeiro commit.",
  },
];

export function Sobre() {
  return (
    <section id="sobre" className="relative scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <Image
              src="/retrato.svg"
              alt="Retrato ilustrado do desenvolvedor em estilo de desenho técnico, com fones e óculos cobre diante de um laptop"
              width={800}
              height={960}
              className="h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] tracking-[0.18em] text-faint lg:text-left">
            FIG.02 — O ARQUITETO POR TRÁS DO CÓDIGO
          </p>
        </Reveal>

        <div>
          <Reveal>
            <p className="annotation">O Diferencial</p>
            <h2 className="font-display mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Senioridade construída na prática,{" "}
              <span className="text-copper">camada por camada</span>.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Meu primeiro contato com computadores começou ainda na infância.
                Desde então, construí uma longa bagagem prática — passei por
                técnico de informática, analista de suporte, e hoje me dedico
                integralmente à programação Full Stack.
              </p>
              <p>
                Essa vivência me deu a capacidade de aprender qualquer
                ferramenta rapidamente e entender sistemas de ponta a ponta:
                desde um PC que não liga até uma arquitetura distribuída que
                precisa escalar para milhões de usuários. Em cada projeto,
                escalabilidade, baixa latência e segurança de dados entram
                desde o primeiro dia — o alicerce vem antes do telhado.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <ol className="mt-10 space-y-0">
              {trajetoria.map((etapa, i) => (
                <li key={etapa.fase} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < trajetoria.length - 1 && (
                    <span
                      className="absolute left-[7px] top-6 h-full w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-2 ${
                      i === trajetoria.length - 1
                        ? "border-copper bg-copper/30"
                        : "border-border-strong bg-surface"
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.18em] text-copper">
                      {etapa.fase.toUpperCase()}
                    </p>
                    <p className="mt-1 font-semibold text-foreground">{etapa.titulo}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{etapa.descricao}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-10 border-l-2 border-copper pl-4 text-base italic text-muted">
              Construindo o futuro com base em décadas de evolução tecnológica.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
