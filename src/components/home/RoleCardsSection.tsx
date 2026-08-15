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
      "API & integration settings"
    ],
    stats: { users: "Unlimited", access: "100%" }
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
      "Budget monitoring"
    ],
    stats: { teams: "Multiple", reports: "Advanced" }
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
      "Team collaboration"
    ],
    stats: { tasks: "Unlimited", dashboard: "Personal" }
  }
];

export function RoleCardsSection() {
  return (
    <section id="roles" className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md text-purple-400 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <Award className="w-4 h-4 animate-pulse" />
            <span>Role-Based Access</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Designed for Every Team Member
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tailored experiences and permissions for Admin, Manager, and Employee roles
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {roleCards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border-2 border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${card.color}`} />
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-700/20 rounded-bl-[100px] opacity-50" />
              
              <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-500/50`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">
                {card.role}
              </h3>
              <p className="text-gray-400 mb-6">
                {card.description}
              </p>

              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-700">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{card.stats.users || card.stats.teams || card.stats.tasks}</p>
                  <p className="text-xs text-gray-500 capitalize">{Object.keys(card.stats)[0]}</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{Object.values(card.stats)[1]}</p>
                  <p className="text-xs text-gray-500 capitalize">{Object.keys(card.stats)[1]}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {card.features.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button className={`mt-8 w-full py-3.5 bg-gradient-to-r ${card.color} text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
