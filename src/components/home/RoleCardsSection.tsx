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
    <section id="roles" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            <span>Role-Based Access</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Designed for Every Team Member
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored experiences and permissions for Admin, Manager, and Employee roles
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {roleCards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${card.color}`} />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent rounded-bl-[100px] opacity-50" />
              
              <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                <card.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {card.role}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {card.description}
              </p>

              <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{card.stats.users || card.stats.teams || card.stats.tasks}</p>
                  <p className="text-xs text-gray-500">{Object.keys(card.stats)[0]}</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{Object.values(card.stats)[1]}</p>
                  <p className="text-xs text-gray-500">{Object.keys(card.stats)[1]}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {card.features.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button className={`mt-8 w-full py-3 bg-gradient-to-r ${card.color} text-white rounded-xl font-semibold hover:shadow-xl transition-all`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
