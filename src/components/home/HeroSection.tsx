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
      {/* Animated Dark Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 backdrop-blur-sm text-blue-300 px-5 py-2.5 rounded-full text-sm font-semibold border border-blue-500/30 shadow-lg shadow-blue-500/20 animate-pulse">
              <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
              <span>Trusted by 500+ Companies Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Workplace
              </span>
              <span className="block text-4xl md:text-6xl mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Management</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Empower your organization with the most comprehensive HR management solution. 
              <span className="font-semibold text-white"> Streamline operations, boost productivity, and delight your employees</span> with our all-in-one platform.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg flex items-center space-x-3 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Start Free 30-Day Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </Link>
              <Link
                to="/login"
                className="group px-8 py-4 bg-gray-800/80 backdrop-blur-sm text-gray-200 rounded-xl hover:bg-gray-700 transition-all shadow-lg border-2 border-gray-700 hover:border-blue-500 font-semibold text-lg flex items-center space-x-2 hover:scale-105"
              >
                <span>Watch Demo</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
                <span className="text-sm text-gray-400 font-medium ml-2">5.0 (2,543 reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image Slider with Dark Glass Effect */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-700/50 backdrop-blur-sm">
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
                  {/* Dark overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
                </div>
              ))}
              
              {/* Slider Indicators with Dark Glass Effect */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-gray-900/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-gray-700/50">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all rounded-full ${
                      index === currentSlide 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 w-8 h-2.5 shadow-lg shadow-blue-500/50' 
                        : 'bg-gray-600 hover:bg-gray-500 w-2.5 h-2.5'
                    }`}
                  />
                ))}
              </div>

              {/* Enhanced Decorative Elements - Brighter for dark mode */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Enhanced Floating Cards with Dark Glass Morphism */}
            <div className="absolute -top-8 -left-8 bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 animate-float border border-gray-700/50 hover:scale-110 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/50">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Attendance</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">98.5%</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 animate-float border border-gray-700/50 hover:scale-110 transition-transform duration-300" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Active Users</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">10,482</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
