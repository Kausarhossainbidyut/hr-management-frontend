import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HR Pro
              </span>
              <p className="text-xs text-gray-500 -mt-1">Management System</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
            <a href="#roles" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Roles</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reviews</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="group px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 font-medium flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
