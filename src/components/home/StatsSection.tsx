import { Users, Briefcase, CheckCircle2, Heart } from "lucide-react";

const stats = [
  { label: "Active Users", value: "10K+", icon: Users, growth: "+25%" },
  { label: "Companies", value: "500+", icon: Briefcase, growth: "+40%" },
  { label: "Tasks Completed", value: "1M+", icon: CheckCircle2, growth: "+85%" },
  { label: "Satisfaction", value: "99%", icon: Heart, growth: "+5%" }
];

export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.growth}
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
