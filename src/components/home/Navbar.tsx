import { Link } from "react-router-dom";
import { Briefcase, ArrowRight } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-900/70 backdrop-blur-xl border-b border-gray-700/50 z-50 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-glow">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                HR Pro
              </span>
              <p className="text-xs text-gray-400 -mt-0.5 font-medium">Management System</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105">Features</a>
            <a href="#roles" className="text-gray-300 hover:text-indigo-400 font-medium transition-all duration-300 hover:scale-105">Roles</a>
            <a href="#pricing" className="text-gray-300 hover:text-purple-400 font-medium transition-all duration-300 hover:scale-105">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-pink-400 font-medium transition-all duration-300 hover:scale-105">Reviews</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-5 py-2.5 text-gray-300 hover:text-blue-400 font-semibold transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="group relative px-7 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
