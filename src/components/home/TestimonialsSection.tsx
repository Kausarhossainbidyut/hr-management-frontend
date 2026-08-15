import { useEffect, useRef, useState } from "react";
import { Star, MessageSquare, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "Tech Corp",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "This system transformed our HR operations. Employee satisfaction increased by 40% within 3 months!",
  },
  {
    name: "Michael Chen",
    role: "Operations Manager",
    company: "Global Solutions",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "The best investment we made. Reduced administrative work by 60% and improved team productivity significantly.",
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "StartUp Inc",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "Incredibly intuitive and powerful. Our team adopted it in days, not weeks. Highly recommended!",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 110}ms` : "0ms" }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/80 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <Quote className="absolute right-6 top-6 h-16 w-16 text-gray-700/30 transition-colors duration-500 group-hover:text-purple-500/20" />

      <div className="relative">
        <div className="mb-4 flex items-center space-x-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="mb-6 leading-relaxed text-gray-300">"{testimonial.text}"</p>
        <div className="flex items-center space-x-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            loading="lazy"
            className="h-14 w-14 rounded-full border-2 border-blue-500/50 object-cover shadow-lg shadow-blue-500/30"
          />
          <div>
            <p className="font-bold text-white">{testimonial.name}</p>
            <p className="text-sm text-gray-400">{testimonial.role}</p>
            <p className="text-xs text-gray-500">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-800/50 via-gray-900/30 to-gray-800/50" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full border border-purple-500/30 bg-gray-800/80 px-5 py-2.5 text-sm font-semibold text-purple-400 shadow-lg shadow-purple-500/20 backdrop-blur-md">
            <MessageSquare className="h-4 w-4" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Loved by HR Teams Worldwide
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-400">
            Don't just take our word for it - hear what our customers have to say
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}