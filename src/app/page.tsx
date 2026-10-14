import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Cv } from "@/components/sections/cv/Cv";
import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";

// One-page portfolio, sections in nav order
export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Cv />
      <About />
      <Contact />
    </>
  );
}
