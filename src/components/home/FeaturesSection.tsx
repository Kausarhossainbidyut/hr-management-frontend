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
  ChevronRight 
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Complete employee lifecycle management from onboarding to exit with detailed profiles, documents, and performance tracking",
    gradient: "from-blue-500 to-cyan-500",
    delay: "0"
  },
  {
    icon: Clock,
    title: "Smart Attendance",
    description: "Automated attendance tracking with geofencing, facial recognition, and real-time notifications for late arrivals",
    gradient: "from-purple-500 to-pink-500",
    delay: "100"
  },
  {
    icon: Calendar,
    title: "Leave Management",
    description: "Streamlined leave requests with automated workflows, balance tracking, and instant approval notifications",
    gradient: "from-orange-500 to-red-500",
    delay: "200"
  },
  {
    icon: ClipboardList,
    title: "Task Management",
    description: "Assign, prioritize, and track tasks with deadlines, dependencies, and real-time progress monitoring",
    gradient: "from-green-500 to-emerald-500",
    delay: "300"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive dashboards with customizable reports, KPI tracking, and predictive insights",
    gradient: "from-indigo-500 to-purple-500",
    delay: "400"
  },
  {
    icon: Briefcase,
    title: "Department Hub",
    description: "Organize teams by departments with role-based access, budgets, and resource allocation",
    gradient: "from-yellow-500 to-orange-500",
    delay: "500"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Real-time alerts for important events, pending approvals, and deadline reminders",
    gradient: "from-pink-500 to-rose-500",
    delay: "600"
  },
  {
    icon: FileCheck,
    title: "Document Manager",
    description: "Secure document storage with version control, digital signatures, and compliance tracking",
    gradient: "from-teal-500 to-cyan-500",
    delay: "700"
  },
  {
    icon: PieChart,
    title: "Payroll Integration",
    description: "Seamless payroll processing with automated calculations, tax compliance, and salary slips",
    gradient: "from-violet-500 to-purple-500",
    delay: "800"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Target className="w-4 h-4" />
            <span>Comprehensive Features</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools designed to simplify HR management and boost organizational efficiency
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                <span className="text-sm">Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
