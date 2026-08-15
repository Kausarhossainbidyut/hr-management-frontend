import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  CheckCircle2,
  Users 
} from "lucide-react";

const heroImages = [
  {
    title: "Employee Management",
    description: "Comprehensive employee profiles and records",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  },
  {
    title: "Attendance Tracking",
    description: "Real-time attendance monitoring system",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
  },
  {
    title: "Task Management",
    description: "Organize and track team productivity",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
  },
  {
    title: "Analytics Dashboard",
    description: "Data-driven insights and reporting",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Cleaner Gradient Background - Less distracting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm text-blue-300 px-6 py-3 rounded-full text-sm font-bold border border-blue-500/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white">Trusted by 500+ Companies Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mt-2">
                Workplace
              </span>
              <span className="block text-gray-100 mt-2">Management</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl font-medium">
              Empower your organization with the most comprehensive HR management solution. 
              <span className="block text-white font-semibold mt-2">Streamline operations, boost productivity, and delight your employees.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Link
                to="/register"
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center space-x-3 shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all duration-300 hover:scale-105"
              >
                <span>Start Free 30-Day Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group px-10 py-5 bg-gray-800/90 backdrop-blur-sm text-white rounded-2xl hover:bg-gray-700 transition-all shadow-xl border-2 border-gray-700 hover:border-blue-500 font-bold text-lg flex items-center space-x-2"
              >
                <span>Watch Demo</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges - Cleaner */}
            <div className="flex items-center gap-2 pt-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-base text-gray-300 font-semibold ml-2">5.0 Rating</span>
              <span className="text-gray-500">•</span>
              <span className="text-base text-gray-400">2,543 Reviews</span>
            </div>
          </div>

          {/* Right Side - Image Slider - Cleaner Design */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
              {heroImages.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Better overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />
                </div>
              ))}
              
              {/* Cleaner Slider Indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 bg-gray-900/80 backdrop-blur-xl px-5 py-3 rounded-full ring-1 ring-white/10">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all rounded-full ${
                      index === currentSlide 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-3 shadow-lg shadow-blue-500/50' 
                        : 'bg-gray-600 hover:bg-gray-500 w-3 h-3'
                    }`}
                  />
                ))}
              </div>

              {/* Softer Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Cleaner Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 p-5 ring-1 ring-white/10 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Attendance Rate</p>
                  <p className="text-3xl font-black text-white">98.5%</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 p-5 ring-1 ring-white/10 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Active Users</p>
                  <p className="text-3xl font-black text-white">10,482</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
