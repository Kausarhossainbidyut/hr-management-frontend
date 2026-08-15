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
    gradient: "from-blue-600/90 to-indigo-600/90"
  },
  {
    title: "Attendance Tracking",
    description: "Real-time attendance monitoring system",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    gradient: "from-purple-600/90 to-pink-600/90"
  },
  {
    title: "Task Management",
    description: "Organize and track team productivity",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    gradient: "from-green-600/90 to-emerald-600/90"
  },
  {
    title: "Analytics Dashboard",
    description: "Data-driven insights and reporting",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    gradient: "from-orange-600/90 to-red-600/90"
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold border border-blue-200/50 shadow-sm">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Trusted by 500+ Companies Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Workplace
              </span>
              <span className="block text-4xl md:text-6xl mt-2">Management</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Empower your organization with the most comprehensive HR management solution. 
              <span className="font-semibold text-gray-900"> Streamline operations, boost productivity, and delight your employees</span> with our all-in-one platform.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl shadow-blue-500/40 font-semibold text-lg flex items-center space-x-3 hover:scale-105 transform"
              >
                <span>Start Free 30-Day Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 flex items-center space-x-2"
              >
                <span>Watch Demo</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-600 font-medium ml-2">5.0 (2,543 reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Side - Image Slider */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-end p-8`}>
                    <div className="text-white space-y-2">
                      <h3 className="text-3xl font-bold">{slide.title}</h3>
                      <p className="text-lg text-white/90">{slide.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Slider Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-2xl opacity-60 animate-pulse delay-1000"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="text-xl font-bold text-gray-900">98.5%</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 animate-float delay-500">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <p className="text-xl font-bold text-gray-900">10,482</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
