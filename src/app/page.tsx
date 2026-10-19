import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Cv } from "@/components/sections/cv/Cv";
import { Projects } from "@/components/sections/projects/Projects";
import { profile } from "@/data/content";

// One-page portfolio, sections in nav order; projects come first
export default function Home() {
  return (
    <>
      {/* Page heading for screen readers; no visible hero */}
      <h1 className="sr-only">
        {profile.name}, {profile.role}
      </h1>
      <Projects />
      <Cv />
      <About />
      <Contact />
    </>
  );
}
