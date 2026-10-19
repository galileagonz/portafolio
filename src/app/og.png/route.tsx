import { ImageResponse } from "next/og";
import { hero, profile, ui } from "@/data/content";

// Prerendered to out/og.png by the static export
export const dynamic = "force-static";

// ImageResponse can't read CSS variables; mirrors globals.css light tokens
const colors = {
  bg: "#FBF9FF",
  ink: "#1E1433",
  muted: "#5B4B7A",
  violet: "#7C4DFF",
  onViolet: "#FFFFFF",
  sun: "#FFD84D",
};

// Social share card: monogram, name, role and a yellow accent
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: colors.bg,
          color: colors.ink,
          borderBottom: `24px solid ${colors.sun}`,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.violet,
            color: colors.onViolet,
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          {ui.monogram}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: colors.muted, letterSpacing: 4, textTransform: "uppercase" }}>
            {hero.eyebrow}
          </div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1, marginTop: 20 }}>{profile.firstName}</div>
          <div style={{ fontSize: 48, fontWeight: 700, color: colors.muted, marginTop: 16 }}>{profile.lastNames}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
