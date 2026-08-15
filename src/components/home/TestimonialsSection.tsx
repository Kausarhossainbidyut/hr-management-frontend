import { Star, MessageSquare } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "Tech Corp",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "This system transformed our HR operations. Employee satisfaction increased by 40% within 3 months!"
  },
  {
    name: "Michael Chen",
    role: "Operations Manager",
    company: "Global Solutions",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "The best investment we made. Reduced administrative work by 60% and improved team productivity significantly."
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "StartUp Inc",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "Incredibly intuitive and powerful. Our team adopted it in days, not weeks. Highly recommended!"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900/30 to-gray-800/50 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md text-purple-400 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <MessageSquare className="w-4 h-4 animate-pulse" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by HR Teams Worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it - hear what our customers have to say
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/50 shadow-lg shadow-blue-500/30"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
