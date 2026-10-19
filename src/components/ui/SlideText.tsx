type SlideTextProps = {
  text: string;
  // Color of the copy that slides in on hover
  copyClassName?: string;
};

const slide = "block transition-[translate] duration-300 ease-[cubic-bezier(.7,0,.3,1)]";

// Text slides up and a colored copy replaces it; parent needs "group"
export function SlideText({ text, copyClassName = "text-accent" }: SlideTextProps) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <span className={`${slide} group-hover:-translate-y-full group-focus-visible:-translate-y-full`}>{text}</span>
      <span
        aria-hidden="true"
        className={`${slide} absolute inset-0 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 ${copyClassName}`}
      >
        {text}
      </span>
    </span>
  );
}
