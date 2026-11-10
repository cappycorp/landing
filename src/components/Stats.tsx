import { useReducedMotion } from "motion/react";
import CountUp from "./CountUp";

export default function Stats() {
  const still = useReducedMotion() ?? false;
  return (
    <section className="stats" aria-label="CappyCorp in numbers">
      <div className="stat"><strong><CountUp to={6} pad={2} still={still} /></strong><p>Products, one family.</p></div>
      <div className="stat"><strong><CountUp to={1} pad={2} still={still} /></strong><p>Capybara holding it all together.</p></div>
      <div className="stat"><strong>∞</strong><p>Curiosity. It's in the tagline.</p></div>
    </section>
  );
}
