import { useReducedMotion } from "motion/react";
import { products } from "./Products";
import markUrl from "../../branding/01-Logo/Primary/capybara-mark-white.svg?url";

type Pt = { x: number; y: number };
const CW = 236; // chip size
const CH = 52;

// horizontal: 3 chips left, 3 right. vertical (mobile): 3 on top, 3 below.
function layout(vertical: boolean) {
  if (!vertical) {
    const c = { x: 500, y: 210 };
    const ys = [70, 210, 350];
    return {
      w: 1000, h: 420, c,
      chips: products.map((_, i) => {
        const left = i < 3;
        const at = { x: left ? 40 : 724, y: ys[i % 3] - CH / 2 };
        const from: Pt = { x: left ? at.x + CW : at.x, y: ys[i % 3] };
        const to: Pt = { x: left ? c.x - 70 : c.x + 70, y: c.y };
        const mx = (from.x + to.x) / 2;
        return { at, w: CW, d: `M${from.x} ${from.y}C${mx} ${from.y} ${mx} ${to.y} ${to.x} ${to.y}` };
      }),
    };
  }
  const c = { x: 200, y: 400 };
  const xs = [70, 200, 330];
  const w = 124;
  return {
    w: 400, h: 800, c,
    chips: products.map((_, i) => {
      const top = i < 3;
      const at = { x: xs[i % 3] - w / 2, y: top ? 30 : 718 };
      const from: Pt = { x: xs[i % 3], y: top ? at.y + CH : at.y };
      const to: Pt = { x: c.x, y: top ? c.y - 70 : c.y + 70 };
      const my = (from.y + to.y) / 2;
      return { at, w, d: `M${from.x} ${from.y}C${from.x} ${my} ${to.x} ${my} ${to.x} ${to.y}` };
    }),
  };
}

function Diagram({ vertical, still }: { vertical: boolean; still: boolean }) {
  const L = layout(vertical);
  return (
    <svg className={vertical ? "v" : "h"} viewBox={`0 0 ${L.w} ${L.h}`} role="img" aria-label="CappyCorp at the center, connected to its six products">
      {L.chips.map((ch, i) => (
        <g key={i}>
          <path className="flow" d={ch.d} fill="none" stroke={i % 2 ? "#9a9a9a" : "var(--cc-accent)"} strokeWidth="1.5" />
          {!still && (
            <circle r="3.5" fill={i % 2 ? "var(--fg)" : "var(--cc-accent)"}>
              <animateMotion dur={`${2.6 + i * 0.35}s`} repeatCount="indefinite" path={ch.d} keyPoints={i < 3 ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear" />
            </circle>
          )}
        </g>
      ))}
      {L.chips.map((ch, i) => {
        const p = products[i];
        const w = ch.w;
        return (
          <g key={p.name} transform={`translate(${ch.at.x} ${ch.at.y})`}>
            <rect width={w} height={CH} rx="12" fill="var(--bg)" stroke="var(--cc-line)" />
            <g transform="translate(14 15) scale(0.92)" fill="none" stroke="var(--fg)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {p.icon}
            </g>
            <text className="chip-name" x="44" y={vertical ? 24 : 32} fontSize={vertical ? 12 : 15}>{vertical ? p.name.replace("Cappy", "") : p.name}</text>
            {vertical ? (
              <text className="chip-tag" x="44" y="40">{p.tag}</text>
            ) : (
              <text className="chip-tag" x={w - 14} y="31" textAnchor="end">{p.tag}</text>
            )}
          </g>
        );
      })}
      <g transform={`translate(${L.c.x - 64} ${L.c.y - 64})`}>
        <rect x="-6" y="-6" width="140" height="140" rx="34" fill="var(--cc-accent-2)" opacity="0.6" />
        <rect width="128" height="128" rx="30" fill="var(--bg)" stroke="var(--cc-accent)" strokeWidth="1.5" />
        <image href={markUrl} x="22" y="30" width="84" height="66" />
      </g>
    </svg>
  );
}

export default function FamilyDiagram() {
  const still = useReducedMotion() ?? false;
  return (
    <div className="diagram">
      <Diagram vertical={false} still={still} />
      <Diagram vertical still={still} />
    </div>
  );
}
