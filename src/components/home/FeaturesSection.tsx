import { useEffect, useRef, useState } from "react";
import {
  Users,
  Clock,
  Calendar,
  ClipboardList,
  BarChart3,
  Briefcase,
  Bell,
  FileCheck,
  PieChart,
  Target,
  ChevronRight,
  X,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description:
      "Complete employee lifecycle management from onboarding to exit with detailed profiles, documents, and performance tracking",
    gradient: "from-blue-500 to-cyan-500",
    details: [
      "Digital onboarding checklists with e-signatures",
      "Centralized employee profiles and org chart",
      "Document storage with expiry reminders",
      "Offboarding workflows that revoke access automatically",
    ],
  },
  {
    icon: Clock,
    title: "Smart Attendance",
    description:
      "Automated attendance tracking with geofencing, facial recognition, and real-time notifications for late arrivals",
    gradient: "from-purple-500 to-pink-500",
    details: [
      "Geofenced check-in/out from the mobile app",
      "Optional facial recognition for kiosk mode",
      "Live late-arrival and absence alerts for managers",
      "Exportable timesheets for payroll",
    ],
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description:
      "Streamlined leave requests with automated workflows, balance tracking, and instant approval notifications",
    gradient: "from-orange-500 to-red-500",
    details: [
      "Custom leave policies per department or region",
      "Real-time balance tracking for every employee",
      "One-tap approvals with automatic calendar blocking",
      "Team calendar view to spot overlapping time off",
    ],
  },
  {
    icon: ClipboardList,
    title: "Task Management",
    description:
      "Assign, prioritize, and track tasks with deadlines, dependencies, and real-time progress monitoring",
    gradient: "from-green-500 to-emerald-500",
    details: [
      "Kanban and list views for every team",
      "Task dependencies with automatic deadline shifts",
      "Progress tracking rolled up to manager dashboards",
      "Comments and file attachments on every task",
    ],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive dashboards with customizable reports, KPI tracking, and predictive insights",
    gradient: "from-indigo-500 to-purple-500",
    details: [
      "Drag-and-drop custom report builder",
      "Attrition and headcount forecasting",
      "Department-level KPI scorecards",
      "Scheduled report exports to email or Slack",
    ],
  },
  {
    icon: Briefcase,
    title: "Department Hub",
    description:
      "Organize teams by departments with role-based access, budgets, and resource allocation",
    gradient: "from-yellow-500 to-orange-500",
    details: [
      "Role-based permissions per department",
      "Budget tracking against headcount plans",
      "Resource allocation across projects",
      "Department-level activity feeds",
    ],
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Real-time alerts for important events, pending approvals, and deadline reminders",
    gradient: "from-pink-500 to-rose-500",
    details: [
      "Configurable alerts by event type and role",
      "Digest mode to reduce notification fatigue",
      "Push, email, and in-app delivery",
      "Escalation reminders for pending approvals",
    ],
  },
  {
    icon: FileCheck,
    title: "Document Manager",
    description:
      "Secure document storage with version control, digital signatures, and compliance tracking",
    gradient: "from-teal-500 to-cyan-500",
    details: [
      "Version history for every document",
      "Built-in e-signature requests",
      "Compliance expiry tracking and alerts",
      "Granular access controls per folder",
    ],
  },
  {
    icon: PieChart,
    title: "Payroll Integration",
    description:
      "Seamless payroll processing with automated calculations, tax compliance, and salary slips",
    gradient: "from-violet-500 to-purple-500",
    details: [
      "Automatic salary calculations from attendance and leave",
      "Regional tax compliance built in",
      "Digital salary slips delivered every cycle",
      "Direct sync with major accounting tools",
    ],
  },
];

type Feature = (typeof features)[number];

function FeatureModal({
  feature,
  onClose,
}: {
  feature: Feature;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg animate-[modalIn_0.25s_ease-out] overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800 shadow-2xl">
        <div className={`h-1.5 w-full bg-gradient-to-r ${feature.gradient}`} />

        <div className="p-8">
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl shadow-blue-500/50`}
          >
            <feature.icon className="h-7 w-7 text-white" />
          </div>

          <h3 id="feature-modal-title" className="mb-3 text-2xl font-bold text-white">
            {feature.title}
          </h3>
          <p className="mb-6 leading-relaxed text-gray-400">{feature.description}</p>

          <ul className="space-y-3">
            {feature.details.map((detail) => (
              <li key={detail} className="flex items-start text-gray-300">
                <CheckCircle2 className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <span className="text-sm">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({
  feature,
  index,
  onLearnMore,
}: {
  feature: Feature;
  index: number;
  onLearnMore: (feature: Feature) => void;
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
      style={{ transitionDelay: visible ? `${(index % 3) * 90}ms` : "0ms" }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/80 p-8 shadow-lg backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div
          className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl shadow-blue-500/50 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
        >
          <feature.icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
          {feature.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-400">
          {feature.description}
        </p>
        <button
          onClick={() => onLearnMore(feature)}
          className="flex items-center text-sm font-semibold text-blue-400 transition-transform hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          <span>Learn more</span>
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  return (
    <section id="features" className="relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/50 via-gray-900/30 to-gray-800/50" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-gray-800/80 px-5 py-2.5 text-sm font-semibold text-blue-400 shadow-lg shadow-blue-500/20 backdrop-blur-md">
            <Target className="h-4 w-4" />
            <span>Comprehensive Features</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Everything You Need in{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              One Place
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Powerful tools designed to simplify HR management and boost organizational efficiency
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              onLearnMore={setActiveFeature}
            />
          ))}
        </div>
      </div>

      {activeFeature && (
        <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} />
      )}

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