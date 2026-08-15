import { useEffect, useRef, useState } from "react";
import { Shield, UserCheck, Users, CheckCircle2, Award } from "lucide-react";

const roleCards = [
  {
    role: "Admin",
    icon: Shield,
    color: "from-blue-600 to-blue-700",
    description: "Complete system control with advanced administrative capabilities",
    features: [
      "Full system access & control",
      "User & role management",
      "Department configuration",
      "System-wide analytics",
      "Security & compliance",
      "API & integration settings",
    ],
    stats: [
      { label: "Users", value: "Unlimited" },
      { label: "Access", value: "100%" },
    ],
  },
  {
    role: "Manager",
    icon: UserCheck,
    color: "from-purple-600 to-purple-700",
    description: "Department and team leadership with approval workflows",
    features: [
      "Team oversight & management",
      "Leave request approvals",
      "Task assignment & tracking",
      "Performance reviews",
      "Department analytics",
      "Budget monitoring",
    ],
    stats: [
      { label: "Teams", value: "Multiple" },
      { label: "Reports", value: "Advanced" },
    ],
  },
  {
    role: "Employee",
    icon: Users,
    color: "from-green-600 to-green-700",
    description: "Personal workspace for daily tasks and self-service",
    features: [
      "Attendance check-in/out",
      "Leave applications",
      "Task updates & comments",
      "Personal dashboard",
      "Document access",
      "Team collaboration",
    ],
    stats: [
      { label: "Tasks", value: "Unlimited" },
      { label: "Dashboard", value: "Personal" },
    ],
  },
];

function RoleCard({
  card,
  index,
}: {
  card: (typeof roleCards)[number];
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
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
      className={`group relative overflow-hidden rounded-2xl border-2 border-gray-700/50 bg-gray-800/80 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${card.color}`} />
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[100px] bg-gray-700/20 opacity-50" />

      <div
        className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg shadow-blue-500/50 transition-all duration-300 group-hover:scale-110`}
      >
        <card.icon className="h-8 w-8 text-white" />
      </div>

      <h3 className="mb-3 text-2xl font-bold text-white">{card.role}</h3>
      <p className="mb-6 text-gray-400">{card.description}</p>

      <div className="mb-6 flex items-center space-x-8 border-b border-gray-700 pb-6">
        {card.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {card.features.map((item) => (
          <li key={item} className="flex items-start text-gray-300">
            <CheckCircle2 className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 w-full rounded-xl bg-gradient-to-r ${card.color} py-3.5 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg`}
      >
        Get Started
      </button>
    </div>
  );
}

export function RoleCardsSection() {
  return (
    <section id="roles" className="bg-gray-900/50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-gray-800/80 px-5 py-2.5 text-sm font-semibold text-purple-400 shadow-lg shadow-purple-500/20 backdrop-blur-md">
            <Award className="h-4 w-4" />
            <span>Role-Based Access</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Designed for Every Team Member
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Tailored experiences and permissions for Admin, Manager, and Employee roles
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {roleCards.map((card, index) => (
            <RoleCard key={card.role} card={card} index={index} />
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