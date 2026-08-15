import { Users, Briefcase, CheckCircle2, Heart } from "lucide-react";

const stats = [
  { label: "Active Users", value: "10K+", icon: Users, growth: "+25%" },
  { label: "Companies", value: "500+", icon: Briefcase, growth: "+40%" },
  { label: "Tasks Completed", value: "1M+", icon: CheckCircle2, growth: "+85%" },
  { label: "Satisfaction", value: "99%", icon: Heart, growth: "+5%" }
];

export function StatsSection() {
  return (
    <section className="py-16 px-4 bg-gray-800/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold text-green-400 bg-green-900/30 px-3 py-1.5 rounded-full border border-green-500/30 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {stat.growth}
                  </span>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                <div className="text-sm text-gray-400 font-semibold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
