type HighlightedTextProps = {
  text: string;
  highlight: string;
};

// Wraps the first match of a phrase in a yellow marker
export function HighlightedText({ text, highlight }: HighlightedTextProps) {
  const start = highlight ? text.indexOf(highlight) : -1;
  if (start === -1) return text;

  return (
    <>
      {text.slice(0, start)}
      <mark className="marker">{highlight}</mark>
      {text.slice(start + highlight.length)}
    </>
  );
}
