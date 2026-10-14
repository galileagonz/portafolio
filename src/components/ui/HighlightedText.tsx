type HighlightedTextProps = {
  text: string;
  highlight: string;
  // "marker" is static; "marker-draw" sweeps in once on load
  markerClassName?: string;
};

// Wraps the first match of a phrase in a yellow marker
export function HighlightedText({ text, highlight, markerClassName = "marker" }: HighlightedTextProps) {
  const start = highlight ? text.indexOf(highlight) : -1;
  if (start === -1) return text;

  return (
    <>
      {text.slice(0, start)}
      <mark className={markerClassName}>{highlight}</mark>
      {text.slice(start + highlight.length)}
    </>
  );
}
