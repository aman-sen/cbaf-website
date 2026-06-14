"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { icon: "💰", target: 28000000, label: "Total Funds Raised", format: (v: number) => `₹${(v / 10000000).toFixed(1)}Cr+` },
  { icon: "👥", target: 12400, label: "Lives Impacted", format: (v: number) => `${Math.round(v).toLocaleString("en-IN")}+` },
  { icon: "🌳", target: 8500, label: "Trees Planted", format: (v: number) => `${Math.round(v).toLocaleString("en-IN")}+` },
  { icon: "👩", target: 3200, label: "Women Empowered", format: (v: number) => `${Math.round(v).toLocaleString("en-IN")}+` },
  { icon: "📚", target: 5800, label: "Students Educated", format: (v: number) => `${Math.round(v).toLocaleString("en-IN")}+` },
  { icon: "🤝", target: 320, label: "Active Volunteers", format: (v: number) => `${Math.round(v)}+` },
  { icon: "🏕️", target: 124, label: "Campaigns Completed", format: (v: number) => `${Math.round(v)}` },
  { icon: "🗺️", target: 48, label: "Districts Reached", format: (v: number) => `${Math.round(v)}` },
];

function Counter({ target, format }: { target: number; format: (v: number) => string }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const dur = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      setValue(target * ease);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <div ref={ref} className="font-display text-3xl font-bold text-white">
      {format(value)}
    </div>
  );
}

export function ImpactStats() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-green-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-4 border border-green-500/30">
            Our Impact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Numbers That Matter
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Every rupee raised translates directly into change on the ground.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <Counter target={stat.target} format={stat.format} />
              <div className="text-xs text-gray-400 mt-2 leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
