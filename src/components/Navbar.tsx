import React, { useState, useEffect } from "react";
import logo from "../assets/images/coreguard_logo_1782336134989.jpg";
import { Phone, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentRoute: { page: string; serviceId?: string };
  onNavigate: (route: { page: string; serviceId?: string }) => void;
  contactPhone: string;
  onTriggerQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, contactPhone, onTriggerQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent, targetPage: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate({ page: targetPage });
  };

  const isActive = (pageName: string) => currentRoute.page === pageName;

  const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .04 5.33.04 12.04c0 2.12.56 4.18 1.62 6.01L0 24l6.2-1.62A11.88 11.88 0 0 0 12 24c6.63 0 11.96-5.33 11.96-11.96 0-3.19-1.24-6.18-3.44-8.56zM12 21.5c-1.3 0-2.58-.34-3.7-.98l-.27-.16L5.07 20l1.78-2.9-.18-.29A8.5 8.5 0 1 1 20.5 12 8.48 8.48 0 0 1 12 21.5zM17.06 14.22c-.28-.14-1.64-.8-1.9-.89-.26-.09-.45-.14-.64.14-.18.28-.69.89-.85 1.07-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.64-1.54-.88-2.1-.23-.55-.46-.48-.64-.49-.16-.01-.36-.01-.55-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.94 2.98 4.7 4.18 1.31.55 2.33.88 3.13 1.13.5.15.96.13 1.32.08.4-.06 1.64-.67 1.88-1.32.24-.65.24-1.21.17-1.32-.06-.12-.23-.18-.5-.32z" />
    </svg>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md bg-white' : 'bg-white/90'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate({ page: 'home' })}>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 flex items-center justify-center bg-white">
              <img src={logo} alt="CoreGuard Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-extrabold text-sm text-slate-900 uppercase tracking-tight">CoreGuard</span>
              <span className="text-[10px] text-slate-500 font-mono">Secure • Connect • Protect</span>
            </div>
          </div>

          {/* Center: primary links */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Home', path: '/' },
              { id: 'services', label: 'Services', path: '/services' },
              { id: 'about', label: 'About', path: '/about' },
              { id: 'why-us', label: 'Why Us', path: '/why-us' },
              { id: 'contact', label: 'Contact', path: '/contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={link.path}
                onClick={(e) => handleNavLinkClick(e, link.id)}
                className={`text-sm font-medium ${isActive(link.id) ? 'text-[#D95B16]' : 'text-slate-700 hover:text-[#D95B16]'} transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <a href={`tel:${contactPhone}`} className="hidden md:inline-flex items-center gap-2 text-sm text-slate-700 px-3 py-2 rounded-md hover:bg-slate-50">
              <Phone size={16} />
              <span className="font-medium">{contactPhone}</span>
            </a>

            <button onClick={onTriggerQuote} className="hidden md:inline-flex items-center gap-2 bg-[#D95B16] hover:bg-[#C2410C] text-white px-4 py-2 rounded-lg text-sm font-semibold">
              <Sparkles size={14} />
              <span>Get a Quote</span>
            </button>

            <a href="https://wa.me/923185826202" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center p-2 rounded-md bg-emerald-50 text-[#25D366] hover:bg-emerald-100">
              <WhatsAppIcon className="w-5 h-5" />
            </a>

            {/* Mobile: menu toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md bg-slate-50 border border-slate-100">
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer (simple) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-sm"
          >
            <div className="px-4 py-4 space-y-3">
              {[ 'home','services','about','why-us','contact' ].map((id) => (
                <a key={id} href="#" onClick={(e) => handleNavLinkClick(e, id)} className="block text-base font-medium text-slate-700 py-2 px-2 rounded hover:bg-slate-50">
                  {id === 'why-us' ? 'Why Us' : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100">
                <button onClick={() => { setMobileMenuOpen(false); onTriggerQuote(); }} className="w-full bg-[#D95B16] text-white py-2 rounded-lg font-semibold">Get a Quote</button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
