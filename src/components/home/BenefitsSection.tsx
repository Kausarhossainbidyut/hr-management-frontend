import { useEffect, useRef, useState } from "react";
import { Zap, Lock, Cloud, Smartphone, Globe, Settings } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for instant load times",
    color: "text-yellow-500",
    glow: "shadow-yellow-500/30",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "Enterprise-grade encryption and data protection",
    color: "text-green-500",
    glow: "shadow-green-500/30",
  },
  {
    icon: Cloud,
    title: "Cloud-Based",
    description: "Access anywhere, anytime from any device",
    color: "text-blue-500",
    glow: "shadow-blue-500/30",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Fully responsive mobile and tablet experience",
    color: "text-purple-500",
    glow: "shadow-purple-500/30",
  },
  {
    icon: Globe,
    title: "Multi-Location",
    description: "Manage teams across multiple offices and regions",
    color: "text-indigo-500",
    glow: "shadow-indigo-500/30",
  },
  {
    icon: Settings,
    title: "Highly Customizable",
    description: "Tailor the system to your workflow",
    color: "text-orange-500",
    glow: "shadow-orange-500/30",
  },
];

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${index * 90}ms` : "0ms",
      }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/80 p-8 shadow-lg backdrop-blur-md transition-all duration-700 ease-out hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Animated gradient border sweep on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-[1px] rounded-2xl bg-[conic-gradient(from_var(--angle),transparent_0%,rgba(96,165,250,0.5)_10%,transparent_20%)] [animation:spin_3s_linear_infinite]" />
      </div>

      <div className="relative">
        {/* Icon with glowing halo */}
        <div className="relative mb-4 inline-flex">
          <div
            className={`absolute inset-0 rounded-full bg-current opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20 ${benefit.color}`}
          />
          <benefit.icon
            className={`relative h-12 w-12 ${benefit.color} drop-shadow-lg transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6`}
          />
        </div>

        <h3 className="mb-2 text-xl font-bold text-white">{benefit.title}</h3>
        <p className="text-gray-400">{benefit.description}</p>
      </div>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900/50 px-4 py-20">
      {/* Ambient floating blur shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl [animation:float1_9s_ease-in-out_infinite]" />
        <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl [animation:float2_11s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl [animation:float1_13s_ease-in-out_infinite]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              HR Pro
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Built with cutting-edge technology to deliver exceptional performance and user experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin {
          to { --angle: 360deg; }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -30px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, 25px); }
        }
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