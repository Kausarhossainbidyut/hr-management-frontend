import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900/30 to-gray-800/50 -z-10" />
      
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 shadow-2xl shadow-blue-500/30 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-pulse">
              <Zap className="w-5 h-5 text-yellow-300 animate-bounce" />
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to Transform Your HR?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join 500+ companies already using HR Pro to streamline their operations. 
              Start your free 30-day trial today - no credit card required!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="group px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl font-bold text-lg flex items-center space-x-3 hover:scale-105 transform"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all font-bold text-lg border-2 border-white/30 hover:border-white/50"
              >
                Schedule Demo
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
              <div className="flex items-center space-x-2 text-white/90">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">No credit card needed</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
