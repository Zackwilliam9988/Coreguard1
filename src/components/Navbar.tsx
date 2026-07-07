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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.65-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.057-.378-.018-.53-.074-.152-.707-1.7-.97-2.324-.262-.624-.524-.524-.724-.553-.198-.028-.399-.028-.592-.028-.2 0-.52.074-.792.372-.272.299-.988.968-.988 2.481 0 1.512 1.102 2.977 1.256 3.182.154.205 1.664 2.646 4.013 3.747 1.41.662 2.507.87 3.377.93 1.048.077 1.632-.125 2.022-.381.502-.33.799-.72.918-1.097.12-.377.06-.704-.03-.885-.09-.181-.333-.297-.63-.447z" />
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
