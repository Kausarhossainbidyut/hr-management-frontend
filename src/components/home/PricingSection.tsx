import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, TrendingUp } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "per month",
    description: "Perfect for small teams",
    features: ["Up to 50 employees", "Basic features", "Email support", "5GB storage", "Mobile app access"],
    popular: false,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Professional",
    price: "$79",
    period: "per month",
    description: "Best for growing companies",
    features: [
      "Up to 200 employees",
      "All features",
      "Priority support",
      "50GB storage",
      "Advanced analytics",
      "API access",
    ],
    popular: true,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For large organizations",
    features: [
      "Unlimited employees",
      "Custom features",
      "24/7 dedicated support",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
    color: "from-indigo-500 to-indigo-600",
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof pricingPlans)[number];
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
      className={`relative rounded-2xl border-2 bg-gray-800/80 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 ${
        plan.popular
          ? "border-blue-500 shadow-2xl shadow-blue-500/30 md:scale-105"
          : "border-gray-700/50"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <span className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/50">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-8 text-center">
        <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
        <p className="mb-6 text-gray-400">{plan.description}</p>
        <div className="flex items-end justify-center space-x-2">
          <span
            className={`bg-gradient-to-r ${plan.color} bg-clip-text text-5xl font-bold text-transparent`}
          >
            {plan.price}
          </span>
          {plan.period !== "contact sales" && (
            <span className="mb-2 text-gray-500">/{plan.period.split(" ")[1]}</span>
          )}
        </div>
        {plan.period === "contact sales" && (
          <p className="mt-2 text-sm text-gray-500">{plan.period}</p>
        )}
      </div>

      <ul className="mb-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-300">
            <CheckCircle2 className="mr-3 h-5 w-5 flex-shrink-0 text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/register"
        className={`block w-full rounded-xl py-4 text-center font-semibold transition-all ${
          plan.popular
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/50 hover:scale-105 hover:shadow-xl"
            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
        }`}
      >
        {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
      </Link>
    </div>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-900/50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-green-500/30 bg-gray-800/80 px-5 py-2.5 text-sm font-semibold text-green-400 shadow-lg shadow-green-500/20 backdrop-blur-md">
            <TrendingUp className="h-4 w-4" />
            <span>Flexible Pricing</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Choose Your Perfect Plan
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Start free for 30 days. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
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