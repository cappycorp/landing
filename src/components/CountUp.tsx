import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

// counts from 0 to `to` the first time it scrolls into view; renders the final value on the server
export default function CountUp({ to, decimals = 0, pad = 0, suffix = "", still }: { to: number; decimals?: number; pad?: number; suffix?: string; still?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const fmt = (v: number) => v.toFixed(decimals).padStart(pad, "0") + suffix;

  useEffect(() => {
    if (!inView || still) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => ref.current && (ref.current.textContent = fmt(v)) });
    return () => c.stop();
  }, [inView, still]);

  return <span ref={ref}>{fmt(to)}</span>;
}
