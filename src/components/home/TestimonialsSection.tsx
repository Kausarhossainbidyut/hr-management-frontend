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
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Loved by HR Teams Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear what our customers have to say
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-200"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
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
