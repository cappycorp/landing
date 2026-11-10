import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// names + descriptors from branding/03-Product-Identities/*/README.md
export const products: { name: string; desc: string; tag: string; icon: ReactNode }[] = [
  { name: "CappyBar", desc: "Technical search for developers", tag: "search", icon: <><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4.5 4.5" /></> },
  { name: "CappyStack", desc: "Tools and infrastructure for developers", tag: "infra", icon: <><path d="M12 3 21 8l-9 5-9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></> },
  { name: "CappyDev", desc: "Developer tools", tag: "tools", icon: <><path d="M8 7 3 12l5 5" /><path d="m16 7 5 5-5 5" /><path d="m14 4-4 16" /></> },
  { name: "CappyLabs", desc: "Research in Rust, AI and systems", tag: "research", icon: <><path d="M9 3h6" /><path d="M10 3v6l-5.2 9.1A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-2.9L14 9V3" /><path d="M7.5 15h9" /></> },
  { name: "CappyWatch", desc: "Monitoring and observability", tag: "monitor", icon: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /><path d="m7 12 3-3 3 2 4-4" /></> },
  { name: "CappyWebhook", desc: "Webhook debugging", tag: "debug", icon: <><circle cx="12" cy="6" r="2.5" /><circle cx="6" cy="17" r="2.5" /><circle cx="18" cy="17" r="2.5" /><path d="m10.8 8.2-3.6 6.6M13.2 8.2l3.6 6.6M8.5 17h7" /></> },
];

export function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

// ticks every `ms` while motion is allowed; returns the tick count
function useTick(ms: number, still: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setN((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [ms, still]);
  return n;
}

const queries = ["tokio select! timeout", "postgres index bloat", "rust lifetime elision"];

function SearchArt({ still }: { still: boolean }) {
  const tick = useTick(90, still);
  // each query: type it, hold ~1.5s, move on
  const span = 40;
  const q = queries[Math.floor(tick / span) % queries.length];
  const typed = still ? q : q.slice(0, tick % span);
  const done = typed.length === q.length;
  return (
    <>
      <div className="search">
        <Icon>{products[0].icon}</Icon>
        <span>{typed}<i className="caret" /></span>
      </div>
      <div className="results">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} animate={{ opacity: done ? 1 : 0.35, x: done ? 0 : -4 }} transition={{ delay: done ? i * 0.08 : 0 }}>
            {["docs.rs", "Stack Overflow", "GitHub issue"][i]}
          </motion.div>
        ))}
      </div>
    </>
  );
}

function StackArt({ still }: { still: boolean }) {
  const layers = ["M120 20 220 70 120 120 20 70Z", "M20 100 120 150 220 100", "M20 130 120 180 220 130"];
  return (
    <svg className="layers" viewBox="0 0 240 200" aria-hidden="true">
      {layers.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill={i === 0 ? "var(--cc-accent-2)" : "none"}
          stroke="var(--fg)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          animate={still ? undefined : { y: [0, -10 + i * 3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function DevArt() {
  return (
    <div className="code" aria-hidden="true">
      <span className="c">{"// ship it, quietly"}</span>{"\n"}
      <span className="k">fn</span>{" main() {\n"}
      {"  cappy::build("}<span className="k">"useful"</span>{");\n"}
      {"}"}<i className="caret" />
    </div>
  );
}

function LabsArt({ still }: { still: boolean }) {
  const rings = [
    { rx: 110, ry: 34, rot: -18, label: "Rust", dur: 14 },
    { rx: 96, ry: 30, rot: 28, label: "AI", dur: 18 },
    { rx: 70, ry: 22, rot: 80, label: "Systems", dur: 11 },
  ];
  return (
    <svg className="orbit" viewBox="-130 -90 260 180" aria-hidden="true">
      {rings.map((r) => (
        <g key={r.label} transform={`rotate(${r.rot})`}>
          <ellipse rx={r.rx} ry={r.ry} fill="none" stroke="#cfcfcf" />
          <circle cx={still ? r.rx : 0} r="4" fill="var(--bg)">
            {!still && (
              <animateMotion dur={`${r.dur}s`} repeatCount="indefinite" path={`M${r.rx} 0A${r.rx} ${r.ry} 0 1 1 ${-r.rx} 0A${r.rx} ${r.ry} 0 1 1 ${r.rx} 0`} />
            )}
          </circle>
        </g>
      ))}
      <circle r="18" fill="var(--bg)" />
      <circle r="30" fill="none" stroke="var(--bg)" strokeOpacity="0.3" />
      {rings.map((r, i) => (
        <text key={r.label} x={[-118, 70, -30][i]} y={[-58, -62, 78][i]} fill="#6b6b6b" fontSize="10" fontFamily="var(--cc-mono)" letterSpacing="1.5">
          {r.label.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}

const heights = [38, 52, 44, 70, 48, 60, 40, 82, 56, 46, 64, 50, 42, 58];

function WatchArt({ still }: { still: boolean }) {
  return (
    <>
      <p className="watch-status"><i /> All systems normal</p>
      <div className="bars" aria-hidden="true">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            className={i === 7 ? "hot" : undefined}
            style={{ height: `${h}%` }}
            animate={still ? undefined : { scaleY: [1, 0.6 + ((i * 37) % 40) / 100, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.09, ease: "easeInOut" }}
          />
        ))}
      </div>
    </>
  );
}

const hooks = [
  ["POST", "/hooks/stripe", "200", "12ms"],
  ["POST", "/hooks/github", "202", "31ms"],
  ["POST", "/hooks/slack", "200", "9ms"],
  ["PUT", "/hooks/linear", "204", "18ms"],
];

function WebhookArt({ still }: { still: boolean }) {
  const tick = useTick(1600, still);
  // newest first: rotate the list one step per tick
  const rows = Array.from({ length: 4 }, (_, i) => ({ id: tick - i, row: hooks[(((tick - i) % 4) + 4) % 4] }));
  return (
    <div className="log" aria-hidden="true">
      <AnimatePresence initial={false} mode="popLayout">
        {rows.map(({ id, row }) => (
          <motion.div key={id} layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <b>{row[0]}</b>
            <span>{row[1]}</span>
            <span className="ok">{row[2]}</span>
            <span className="ms">{row[3]}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// feeds the cursor position to the cell's CSS spotlight
function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export default function Products() {
  const still = useReducedMotion() ?? false;
  const art = [
    <SearchArt still={still} />,
    <StackArt still={still} />,
    <DevArt />,
    <LabsArt still={still} />,
    <WatchArt still={still} />,
    <WebhookArt still={still} />,
  ];
  return (
    <ul className="bento">
      {products.map((p, i) => (
        <motion.li
          key={p.name}
          className={p.name === "CappyLabs" ? "cell dark" : "cell"}
          onPointerMove={spotlight}
          initial={still ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mono eyebrow">{String(i + 1).padStart(2, "0")} · {p.tag}</p>
          <h3>{p.name}</h3>
          <p>{p.desc}</p>
          <div className="art">{art[i]}</div>
        </motion.li>
      ))}
    </ul>
  );
}
