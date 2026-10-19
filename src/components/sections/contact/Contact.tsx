import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { contactSection, sections } from "@/data/content";
import { ContactForm } from "./ContactForm";
import { CopyEmail } from "./CopyEmail";

const meta = sections.find((s) => s.id === "contacto")!;

// Contact: copyable email and socials beside the form
export function Contact() {
  return (
    <Section
      id={meta.id}
      title={meta.title!}
      aside={
        <div className="space-y-8">
          <p className="text-lead text-ink-muted">{contactSection.intro}</p>
          <CopyEmail />
          <SocialLinks />
        </div>
      }
    >
      <ScrollReveal amount={0.1} delay={0.1}>
        <h3 className="mb-6 font-display text-title font-bold">{contactSection.formTitle}</h3>
        <ContactForm />
      </ScrollReveal>
    </Section>
  );
}
