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
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Professional",
    price: "$79",
    period: "per month",
    description: "Best for growing companies",
    features: ["Up to 200 employees", "All features", "Priority support", "50GB storage", "Advanced analytics", "API access"],
    popular: true,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For large organizations",
    features: ["Unlimited employees", "Custom features", "24/7 dedicated support", "Unlimited storage", "Custom integrations", "SLA guarantee"],
    popular: false,
    color: "from-indigo-500 to-indigo-600"
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md text-green-400 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-green-500/30 shadow-lg shadow-green-500/20">
            <TrendingUp className="w-4 h-4 animate-pulse" />
            <span>Flexible Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start free for 30 days. No credit card required. Cancel anytime.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 ${
                plan.popular ? 'border-blue-500 scale-105 shadow-2xl shadow-blue-500/30' : 'border-gray-700/50'
              } hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-500/50">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="flex items-end justify-center space-x-2">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  {plan.period !== "contact sales" && (
                    <span className="text-gray-500 mb-2">/{plan.period.split(' ')[1]}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">{plan.period}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`block w-full py-4 text-center rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:scale-105'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
