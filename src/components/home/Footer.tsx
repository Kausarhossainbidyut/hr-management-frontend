import { useState, type FormEvent } from "react";
import {
  Briefcase,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  Send,
} from "lucide-react";

const socials = [
  { name: "Facebook", Icon: Facebook, href: "#" },
  { name: "Twitter", Icon: Twitter, href: "#" },
  { name: "LinkedIn", Icon: Linkedin, href: "#" },
  { name: "Instagram", Icon: Instagram, href: "#" },
];

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <p className="text-sm text-emerald-400">
        You're subscribed. Watch your inbox for updates.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-lg border border-gray-700/50 bg-gray-800/80 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/40"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gray-800 bg-gray-950 px-4 pb-10 pt-16 text-gray-400">
      {/* Accent line at the very top of the footer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-6 flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50">
                <Briefcase className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
                  HR Pro
                </span>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <p className="mb-6 max-w-sm leading-relaxed text-gray-400">
              The most comprehensive HR management solution for modern businesses.
              Streamline operations and empower your workforce.
            </p>
            <div className="flex space-x-3">
              {socials.map(({ name, Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700/50 bg-gray-800/80 backdrop-blur-sm transition-all hover:scale-110 hover:border-blue-500 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title} className="lg:col-span-1">
              <h4 className="mb-4 text-lg font-bold text-white">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block rounded transition-colors hover:translate-x-1 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="mb-4 text-lg font-bold text-white">Stay updated</h4>
            <p className="mb-4 text-sm leading-relaxed text-gray-500">
              Product news and HR tips, once a month. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HR Pro Management System. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Made with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500 [animation:heartbeat_1.8s_ease-in-out_infinite]" />
              <span className="text-sm text-gray-500">for better workplaces</span>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/80 text-gray-400 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.1); }
          60% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  );
}