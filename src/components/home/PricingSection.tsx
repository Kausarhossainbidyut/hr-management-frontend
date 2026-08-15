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
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>Flexible Pricing</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free for 30 days. No credit card required. Cancel anytime.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${
                plan.popular ? 'border-purple-500 scale-105' : 'border-gray-100'
              } hover:shadow-2xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
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
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`block w-full py-4 text-center rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
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
