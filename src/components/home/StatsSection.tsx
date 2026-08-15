import { useEffect, useRef, useState } from "react";
import { Users, Briefcase, CheckCircle2, Heart } from "lucide-react";

const stats = [
  { label: "Active Users", value: "10K+", icon: Users, growth: "+25%" },
  { label: "Companies", value: "500+", icon: Briefcase, growth: "+40%" },
  { label: "Tasks Completed", value: "1M+", icon: CheckCircle2, growth: "+85%" },
  { label: "Satisfaction", value: "99%", icon: Heart, growth: "+5%" },
];

/** Splits "10K+" into { number: 10, prefix: "", suffix: "K+" } so it can be counted up. */
function parseValue(raw: string) {
  const match = raw.match(/^(\D*)([\d.]+)(\D*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, number: parseFloat(numStr), suffix, decimals };
}

function useCountUp(target: string, active: boolean, duration = 1400) {
  const { prefix, number, suffix, decimals } = parseValue(target);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(number * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, number, duration]);

  return `${prefix}${display.toFixed(decimals)}${suffix}`;
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const displayValue = useCountUp(stat.value, visible);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/80 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 shadow-lg shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <stat.icon className="h-6 w-6 text-white" />
          </div>
          <span className="rounded-full border border-green-500/30 bg-green-900/30 px-3 py-1.5 text-xs font-bold text-green-400 shadow-sm transition-transform duration-300 group-hover:scale-110">
            {stat.growth}
          </span>
        </div>
        <div className="mb-1 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent tabular-nums">
          {displayValue}
        </div>
        <div className="text-sm font-semibold text-gray-400">{stat.label}</div>
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="bg-gray-800/30 px-4 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}