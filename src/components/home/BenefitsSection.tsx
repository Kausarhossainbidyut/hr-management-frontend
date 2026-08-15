import { Zap, Lock, Cloud, Smartphone, Globe, Settings } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance for instant load times",
    color: "text-yellow-500"
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "Enterprise-grade encryption and data protection",
    color: "text-green-500"
  },
  {
    icon: Cloud,
    title: "Cloud-Based",
    description: "Access anywhere, anytime from any device",
    color: "text-blue-500"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Fully responsive mobile and tablet experience",
    color: "text-purple-500"
  },
  {
    icon: Globe,
    title: "Multi-Location",
    description: "Manage teams across multiple offices and regions",
    color: "text-indigo-500"
  },
  {
    icon: Settings,
    title: "Highly Customizable",
    description: "Tailor the system to your workflow",
    color: "text-orange-500"
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">HR Pro</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with cutting-edge technology to deliver exceptional performance and user experience
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <benefit.icon className={`w-12 h-12 ${benefit.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
