import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Phone, 
  Menu, 
  X, 
  ChevronRight,
  LogOut,
  Sliders,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentRoute: { page: string; serviceId?: string };
  onNavigate: (route: { page: string; serviceId?: string }) => void;
  contactPhone: string;
  onTriggerQuote: () => void;
  isLoggedIn: boolean;
  onShowAdmin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  contactPhone,
  onTriggerQuote,
  isLoggedIn,
  onShowAdmin,
  onLogout
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPage: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate({ page: targetPage });
  };

  const isActive = (pageName: string) => {
    return currentRoute.page === pageName;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-45 transition-all duration-300 font-sans ${
          scrolled 
            ? "bg-white/95 border-b border-slate-100 shadow-[0_10px_30px_rgba(217,91,22,0.06)] backdrop-blur-lg py-3.5" 
            : "bg-white/80 border-b border-slate-100 backdrop-blur-sm py-5"
        }`}
      >
        {/* Futuristic premium multi-tone laser glow bar at the absolute top */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#D95B16] via-[#EA580C] via-[#F97316] to-transparent opacity-90 animate-pulse" />


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* BRAND LOGO - UPDATED WITH CUSTOM CIRCULAR IMAGE LOGO */}
            <div 
              onClick={() => onNavigate({ page: "home" })}
              className="flex items-center gap-3 group cursor-pointer select-none"
            >
              {/* Custom image logo with active status dot */}
              <div className="relative w-10 h-10 rounded-full border border-[#D95B16]/30 overflow-hidden transition-all duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(217,91,22,0.15)] group-hover:shadow-[0_0_20px_rgba(217,91,22,0.25)] bg-slate-50 shrink-0">
                <img 
                  src="/src/assets/images/coreguard_logo_1782336134989.jpg" 
                  alt="CoreGuard Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Active scan status dot */}
                <span className="absolute top-0.5 right-0.5 flex h-2 w-2 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D95B16] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D95B16]"></span>
                </span>
              </div>
              
              <div className="text-left flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className="block font-display font-black text-xl tracking-tight text-slate-950 leading-none uppercase">
                    Core<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D95B16] to-[#EA580C] group-hover:from-[#EA580C] group-hover:to-[#D95B16] transition-all duration-500">Guard</span>
                  </span>
                  <span className="text-[8px] font-mono font-bold text-[#D95B16] bg-[#D95B16]/10 border border-[#D95B16]/25 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    PRO
                  </span>
                </div>
                <span className="block text-[7px] font-mono tracking-widest uppercase font-black text-slate-500 group-hover:text-[#D95B16] transition-colors mt-1.5">
                  SECURE • CONNECT • PROTECT
                </span>
              </div>
            </div>

            {/* DESKTOP NAVIGATION LINKS WITH UNDERLINE EFFECTS */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-widest uppercase text-slate-600">
              <div className="relative py-2">
                <a 
                  href="/" 
                  onClick={(e) => handleNavLinkClick(e, "home")}
                  className={`transition-colors duration-300 ${isActive("home") ? "text-[#D95B16]" : "hover:text-[#D95B16]"}`}
                >
                  Home
                </a>
                {isActive("home") && (
                  <motion.div layoutId="activeUnderline" className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-[#D95B16] rounded-full shadow-[0_2px_8px_rgba(217,91,22,0.4)]" />
                )}
              </div>

              <div className="relative py-2">
                <a 
                  href="/services" 
                  onClick={(e) => handleNavLinkClick(e, "services")}
                  className={`transition-colors duration-300 ${isActive("services") || currentRoute.page === "service" ? "text-[#D95B16]" : "hover:text-[#D95B16]"}`}
                >
                  Services
                </a>
                {(isActive("services") || currentRoute.page === "service") && (
                  <motion.div layoutId="activeUnderline" className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-[#D95B16] rounded-full shadow-[0_2px_8px_rgba(217,91,22,0.4)]" />
                )}
              </div>

              <div className="relative py-2">
                <a 
                  href="/about" 
                  onClick={(e) => handleNavLinkClick(e, "about")}
                  className={`transition-colors duration-300 ${isActive("about") ? "text-[#D95B16]" : "hover:text-[#D95B16]"}`}
                >
                  About Us
                </a>
                {isActive("about") && (
                  <motion.div layoutId="activeUnderline" className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-[#D95B16] rounded-full shadow-[0_2px_8px_rgba(217,91,22,0.4)]" />
                )}
              </div>

              <div className="relative py-2">
                <a 
                  href="/why-us" 
                  onClick={(e) => handleNavLinkClick(e, "why-us")}
                  className={`transition-colors duration-300 ${isActive("why-us") ? "text-[#D95B16]" : "hover:text-[#D95B16]"}`}
                >
                  Why Us
                </a>
                {isActive("why-us") && (
                  <motion.div layoutId="activeUnderline" className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-[#D95B16] rounded-full shadow-[0_2px_8px_rgba(217,91,22,0.4)]" />
                )}
              </div>

              <div className="relative py-2">
                <a 
                  href="/contact" 
                  onClick={(e) => handleNavLinkClick(e, "contact")}
                  className={`transition-colors duration-300 ${isActive("contact") ? "text-[#D95B16]" : "hover:text-[#D95B16]"}`}
                >
                  Contact
                </a>
                {isActive("contact") && (
                  <motion.div layoutId="activeUnderline" className="absolute bottom-[-2px] left-0 right-0 h-[2.5px] bg-[#D95B16] rounded-full shadow-[0_2px_8px_rgba(217,91,22,0.4)]" />
                )}
              </div>
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-5">
              <a 
                href={`tel:${contactPhone.replace(/\s+/g, "")}`} 
                className="text-xs font-mono font-bold text-slate-600 hover:text-[#D95B16] transition-colors flex items-center gap-1.5"
              >
                <Phone size={13} className="text-[#D95B16]" />
                <span>{contactPhone}</span>
              </a>

              {isLoggedIn ? (
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-1">
                  <button 
                    onClick={onShowAdmin}
                    className="p-1.5 text-slate-500 hover:text-[#D95B16] rounded-lg transition-colors cursor-pointer"
                    title="Open Admin Controls"
                  >
                    <Sliders size={14} />
                  </button>
                  <button 
                    onClick={onLogout}
                    className="p-1.5 text-slate-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={onTriggerQuote}
                  className="bg-[#D95B16] hover:bg-[#C2410C] text-white text-xs font-black py-2.5 px-5 rounded-xl transition-all shadow-md hover:shadow-lg shadow-orange-500/10 hover:scale-[1.03] cursor-pointer uppercase tracking-wider font-mono"
                >
                  Get Quote
                </button>
              )}
            </div>

            {/* MOBILE NAVIGATION BUTTONS */}
            <div className="flex md:hidden items-center gap-3">
              <a 
                href={`tel:${contactPhone.replace(/\s+/g, "")}`} 
                className="p-2.5 text-[#D95B16] bg-slate-50 border border-slate-150 rounded-xl shadow-sm cursor-pointer"
                aria-label="Call Direct Line"
              >
                <Phone size={14} />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 bg-slate-50 border border-slate-150 text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer shadow-sm flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative"
                aria-label="Toggle Menu"
              >
                <div className="w-5 h-3.5 relative flex flex-col justify-between">
                  <span className={`block absolute h-0.5 w-5 bg-slate-200 rounded-full transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 top-[6px]" : "top-0"}`} />
                  <span className={`block absolute h-0.5 w-5 bg-slate-200 rounded-full transform transition-all duration-300 ease-in-out top-[6px] ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                  <span className={`block absolute h-0.5 w-5 bg-slate-200 rounded-full transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? "-rotate-45 top-[6px]" : "top-[12px]"}`} />
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* MOBILE SMOOTH FULL-SCREEN SLIDING DRAWER WITH FROSTED-GLASS EFFECT */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-start overflow-hidden">
            {/* Ambient Dark backdrop with high blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
            />
            
            {/* Premium Sliding Panel (Sliding Down from Top) */}
            <motion.nav 
              initial={{ y: "-100%", opacity: 0.95 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0.95 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="relative w-full max-h-[92vh] bg-white border-b border-slate-100 p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-3xl overflow-y-auto rounded-b-3xl"
            >
              {/* Soft visual glow element in background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-[#D95B16]/5 to-transparent blur-[50px] pointer-events-none" />
              
              <div className="relative z-10">
                {/* Header Section inside panel */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full border border-[#D95B16]/20 overflow-hidden bg-slate-50">
                      <img 
                        src="/src/assets/images/coreguard_logo_1782336134989.jpg" 
                        alt="CoreGuard Logo" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="font-display font-black text-lg text-slate-900 uppercase tracking-tight">
                      Core<span className="text-[#D95B16]">Guard</span>
                    </span>
                  </div>

                  {/* Elegant close button with rotational transition */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-xl transition-all cursor-pointer group active:scale-95"
                    aria-label="Close menu"
                  >
                    <div className="w-5 h-3.5 relative flex flex-col justify-between">
                      <span className="block absolute h-0.5 w-5 bg-slate-700 rounded-full transform rotate-45 top-[6px]" />
                      <span className="block absolute h-0.5 w-5 bg-slate-700 rounded-full transform -rotate-45 top-[6px]" />
                    </div>
                  </button>
                </div>

                {/* Directory Title */}
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-extrabold block mb-4">
                  Navigation Matrix
                </span>

                {/* Staggered Navigation Items */}
                <motion.div 
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.35 // Delay child fade-ins slightly after menu opens
                      }
                    }
                  }}
                  className="flex flex-col gap-3"
                >
                  {[
                    { path: "/", id: "home", num: "01", label: "Home Landing", sub: "Core overview & system highlights" },
                    { path: "/services", id: "services", num: "02", label: "Solutions Catalog", sub: "Fiber optics, CCTV & networking specifications" },
                    { path: "/about", id: "about", num: "03", label: "About Credentials", sub: "Our background, certifications & capabilities" },
                    { path: "/why-us", id: "why-us", num: "04", label: "Quality Promise", sub: "Why leading businesses trust CoreGuard Pro" },
                    { path: "/contact", id: "contact", num: "05", label: "Priority Contact Hub", sub: "Schedule immediate on-site visits" }
                  ].map((item) => {
                    const isCurrent = isActive(item.id) || (item.id === "services" && currentRoute.page === "service");
                    return (
                      <motion.div
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, x: 25 },
                          show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 150, damping: 20 } }
                        }}
                      >
                        <a 
                          href={item.path} 
                          onClick={(e) => handleNavLinkClick(e, item.id)}
                          className={`group w-full p-4 rounded-xl border transition-all duration-300 flex items-center justify-between text-left ${
                            isCurrent 
                              ? "bg-orange-500/10 border-[#D95B16]/30 text-[#D95B16]" 
                              : "bg-slate-50/50 hover:bg-slate-50 border-slate-100 text-slate-600 hover:text-[#D95B16]"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-mono font-black ${isCurrent ? "text-[#D95B16]" : "text-slate-400 group-hover:text-[#D95B16]"} transition-colors`}>
                              {item.num}
                            </span>
                            <div>
                              <span className="block text-sm font-bold tracking-tight">
                                {item.label}
                              </span>
                              <span className="block text-[10px] text-slate-500 group-hover:text-slate-400 mt-0.5 font-medium">
                                {item.sub}
                              </span>
                            </div>
                          </div>
                          <ChevronRight size={14} className={`transition-transform duration-300 ${isCurrent ? "text-[#D95B16] translate-x-1" : "text-slate-400 group-hover:text-[#D95B16] group-hover:translate-x-1"}`} />
                        </a>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Drawer Footer controls and hotline metrics */}
              <div className="relative z-10 mt-8 pt-6 border-t border-slate-100">
                <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl flex flex-col gap-3.5 mb-5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D95B16] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D95B16]"></span>
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-extrabold">
                      Direct Command Line
                    </span>
                  </div>
                  
                  <a 
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-3 hover:text-[#D95B16] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#D95B16]/10 border border-[#D95B16]/20 flex items-center justify-center text-[#D95B16]">
                      <Phone size={15} className="animate-pulse" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono uppercase font-black text-slate-500">Call Priority Support</span>
                      <span className="block text-sm font-black text-[#D95B16] tracking-tight">{contactPhone}</span>
                    </div>
                  </a>
                </div>

                {isLoggedIn ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setMobileMenuOpen(false); onShowAdmin(); }}
                      className="flex-1 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sliders size={13} />
                      <span>Admin Control Center</span>
                    </button>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-3 rounded-xl cursor-pointer transition-all flex items-center justify-center"
                      title="Terminate Session"
                    >
                      <LogOut size={14} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onTriggerQuote(); }}
                    className="w-full bg-[#D95B16] hover:bg-[#C2410C] text-white font-black py-3.5 rounded-xl shadow-lg shadow-orange-500/10 text-xs tracking-wider uppercase cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={13} className="text-white" />
                    <span>Get Secure Architectural Quote</span>
                  </button>
                )}
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
