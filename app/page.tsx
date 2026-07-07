import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { TechStack } from "@/components/TechStack";
import { Portfolio } from "@/components/Portfolio";
import { Playground } from "@/components/Playground";
import { Contato } from "@/components/Contato";

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col flex-1">
      <Hero />
      <Sobre />
      <TechStack />
      <Portfolio />
      <Playground />
      <Contato />
    </main>
  );
}