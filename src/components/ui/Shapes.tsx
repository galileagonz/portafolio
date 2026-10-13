// Decorative SVG shapes; color comes from text-* classes via currentColor

type ShapeProps = {
  className?: string;
  // Adds a chunky theme-aware outline
  outlined?: boolean;
};

const outline = "stroke-line [stroke-width:3] [paint-order:stroke]";

// Builds a star polygon with the given number of points
function starPoints(points: number, inner: number) {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 48 : 48 * inner;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    coords.push(`${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`);
  }
  return coords.join(" ");
}

export function Star({
  className = "",
  outlined = false,
  points = 8,
  inner = 0.5,
}: ShapeProps & { points?: number; inner?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" className={className} overflow="visible">
      <polygon
        points={starPoints(points, inner)}
        fill="currentColor"
        strokeLinejoin="round"
        className={outlined ? outline : undefined}
      />
    </svg>
  );
}

// Four-point sparkle with curved sides
export function Sparkle({ className = "", outlined = false }: ShapeProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" className={className} overflow="visible">
      <path
        d="M50 2C53 35 65 47 98 50 65 53 53 65 50 98 47 65 35 53 2 50 35 47 47 35 50 2Z"
        fill="currentColor"
        strokeLinejoin="round"
        className={outlined ? outline : undefined}
      />
    </svg>
  );
}

const blobs = [
  "M47.5 4.6c13.2-1.6 29.4 4.2 37.4 15.6 8.3 11.8 9.2 29.6 3.3 43.3-6 14-18.4 25.4-33.6 28.8C39.4 95.6 21 91 11.6 78.8 2.4 66.8 2.4 47.6 7.4 33.4 12.6 18.6 31 6.6 47.5 4.6Z",
  "M58.2 6.4c12 3.4 20.6 14.4 26.6 25.8 6.2 11.6 10.4 25.4 5.2 37.2-5.4 12.4-20 21.6-34.2 22.8-14.4 1.2-30.6-5-39.4-16.8C7.6 63.8 6.2 46 11.8 32.6 17.6 18.8 30.8 8 44.4 5.4c4.6-.8 9.4-.4 13.8 1Z",
  "M50.6 3.8c11 .4 19.8 9.2 28.4 16.6 8.4 7.4 18 15.2 18.6 26.4.6 11.4-8 21.6-16.6 29.4-8.8 8-19.6 15.6-31.4 15.6-12 0-23.6-7.2-30.8-16.8C11.6 65.4 2 52.6 4.2 39.8 6.4 27 19.8 18.8 30.6 11.8 36.6 7.8 43.4 3.6 50.6 3.8Z",
];

// Organic blob; pick a preset with variant
export function Blob({ className = "", outlined = false, variant = 0 }: ShapeProps & { variant?: 0 | 1 | 2 }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" className={className} overflow="visible">
      <path d={blobs[variant]} fill="currentColor" className={outlined ? outline : undefined} />
    </svg>
  );
}

// Wavy underline-style stroke
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 200 24" className={className} fill="none" overflow="visible">
      <path
        d="M4 12c12-12 20-12 32 0s20 12 32 0 20-12 32 0 20 12 32 0 20-12 32 0 20 12 32 0"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Solid circle with optional ring outline
export function Circle({ className = "", outlined = false }: ShapeProps) {
  return (
    <span
      aria-hidden="true"
      className={`block aspect-square rounded-full bg-current ${outlined ? "border-3 border-line" : ""} ${className}`}
    />
  );
}
