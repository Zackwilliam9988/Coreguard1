import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ExternalLink, 
  ArrowUp, 
  Sparkles, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Zap,
  Users,
  Coins,
  Award,
  Headphones,
  Camera,
  Layers,
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  FileDown
} from "lucide-react";

import { SERVICES as DEFAULT_SERVICES, BENEFITS as DEFAULT_BENEFITS, STATS as DEFAULT_STATS, FAQS as DEFAULT_FAQS } from "./data";
import { Service, Benefit, Stat, FAQItem } from "./types";
import { LucideIcon } from "./components/LucideIcon";
import { FloatingGeometrics } from "./components/FloatingGeometrics";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { QuoteDialog } from "./components/QuoteDialog";
import { NetworkBackground } from "./components/NetworkBackground";
import { ServiceDetailView } from "./components/ServiceDetailView";
import { ContactPage } from "./components/ContactPage";
import { ServicesPage } from "./components/ServicesPage";
import { AboutPage } from "./components/AboutPage";
import { WhyUsPage } from "./components/WhyUsPage";
import { Navbar } from "./components/Navbar";
import { CCTVCamera } from "./components/CCTVCamera";
import { SuccessNotification } from "./components/SuccessNotification";
import { CustomCursor } from "./components/CustomCursor";
import { SophiaChat } from "./components/SophiaChat";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Application Dynamic States (manageable from Backend)
  const [services, setServices] = useState<Service[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  
  // Manageable Contact Details
  const [contactInfo, setContactInfo] = useState({
    phone: "+92 318 5826202",
    email: "support@coreguard.com",
    address: "I-8 Markaz, Executive Tower, Islamabad",
    latitude: "33.6844",
    longitude: "73.0479",
    whatsapp: "+92 318 5826202"
  });

  // Manageable Hero & About Config
  const [heroInfo, setHeroInfo] = useState({
    title1: "Powering Networks",
    title2: "Through",
    highlightText: "Security & Precision",
    tagline: "Professional HD CCTV, high-capacity fusion splicing, and robust structured cabling solutions designed to keep your business fully connected and absolutely secure.",
    cta1: "Get a Quote",
    cta2: "Explore Services"
  });

  const [aboutInfo, setAboutInfo] = useState({
    title: "Who We Are",
    tagline: "Secure. Connect. Protect.",
    headline: "Your Premier Infrastructure Systems Engineering Team",
    description1: "CoreGuard has emerged as a premier technology solution provider, introducing extreme attention-to-detail into hardware installations. We service commercial buildings, residential hubs, and industrial warehouses, laying fast optical fibers and smart networks.",
    description2: "Our engineering guidelines bypass general shortcuts, delivering certified calibrations, neat cabling, and lifetime peace of mind. Let us protect what matters to you with the highest standard in security systems."
  });

  // General App States
  const [currentRoute, setCurrentRoute] = useState<{ page: string; serviceId?: string }>({ page: "home" });
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Interactive Modals
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<Service | null>(null);

  // Public Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [showGlobalSuccess, setShowGlobalSuccess] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Load persistence database from localStorage on mount
  useEffect(() => {
    // Services
    const savedServices = localStorage.getItem("coreguard_services_db");
    if (savedServices) {
      try {
        const parsed = JSON.parse(savedServices) as Service[];
        const migrated = parsed.map(s => {
          if (s.id === "biometric-system" && (!s.imageUrl || s.imageUrl.includes("imimg.com") || s.imageUrl.includes("photo-1563986768609-322da13575f3"))) {
            return { ...s, imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=600&q=80" };
          }
          return s;
        });
        setServices(migrated);
        localStorage.setItem("coreguard_services_db", JSON.stringify(migrated));
      } catch (e) {
        setServices(DEFAULT_SERVICES);
      }
    } else {
      setServices(DEFAULT_SERVICES);
    }

    // Benefits
    const savedBenefits = localStorage.getItem("coreguard_benefits_db");
    if (savedBenefits) {
      try {
        setBenefits(JSON.parse(savedBenefits));
      } catch (e) {
        setBenefits(DEFAULT_BENEFITS);
      }
    } else {
      setBenefits(DEFAULT_BENEFITS);
    }

    // Stats
    const savedStats = localStorage.getItem("coreguard_stats_db");
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        setStats(DEFAULT_STATS);
      }
    } else {
      setStats(DEFAULT_STATS);
    }

    // FAQs
    const savedFaqs = localStorage.getItem("coreguard_faqs_db");
    if (savedFaqs) {
      try {
        setFaqs(JSON.parse(savedFaqs));
      } catch (e) {
        setFaqs(DEFAULT_FAQS);
      }
    } else {
      setFaqs(DEFAULT_FAQS);
    }

    // Contact info
    const savedContact = localStorage.getItem("coreguard_contact_db");
    if (savedContact) {
      try {
        setContactInfo(JSON.parse(savedContact));
      } catch (e) {}
    }

    // Hero Customization
    const savedHero = localStorage.getItem("coreguard_hero_db");
    if (savedHero) {
      try {
        setHeroInfo(JSON.parse(savedHero));
      } catch (e) {}
    }

    // About Customization
    const savedAbout = localStorage.getItem("coreguard_about_db");
    if (savedAbout) {
      try {
        setAboutInfo(JSON.parse(savedAbout));
      } catch (e) {}
    }
  }, []);

  // Sync to database savers
  const saveServicesToStorage = (updated: Service[]) => {
    localStorage.setItem("coreguard_services_db", JSON.stringify(updated));
    setServices(updated);
  };

  const saveContactToStorage = (updated: typeof contactInfo) => {
    localStorage.setItem("coreguard_contact_db", JSON.stringify(updated));
    setContactInfo(updated);
  };

  const saveHeroToStorage = (updated: typeof heroInfo) => {
    localStorage.setItem("coreguard_hero_db", JSON.stringify(updated));
    setHeroInfo(updated);
  };

  const saveAboutToStorage = (updated: typeof aboutInfo) => {
    localStorage.setItem("coreguard_about_db", JSON.stringify(updated));
    setAboutInfo(updated);
  };

  const saveBenefitsToStorage = (updated: Benefit[]) => {
    localStorage.setItem("coreguard_benefits_db", JSON.stringify(updated));
    setBenefits(updated);
  };

  const saveStatsToStorage = (updated: Stat[]) => {
    localStorage.setItem("coreguard_stats_db", JSON.stringify(updated));
    setStats(updated);
  };



  // Core loading trigger mimics security sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 150);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 12;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Sticky header and back-to-top thresholds
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 600) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced path and hash-based routing system
  const parseCurrentRoute = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;
    
    if (path === "/contact" || path === "/contact/" || hash === "#/contact" || hash === "#contact") {
      return { page: "contact" };
    }
    if (path === "/services" || path === "/services/" || hash === "#/services" || hash === "#services") {
      return { page: "services" };
    }
    if (path === "/about" || path === "/about/" || hash === "#/about" || hash === "#about") {
      return { page: "about" };
    }
    if (path === "/why-us" || path === "/why-us/" || hash === "#/why-us" || hash === "#why-us") {
      return { page: "why-us" };
    }
    
    const servicePathMatch = path.match(/^\/service\/([^/]+)/);
    if (servicePathMatch) {
      return { page: "service", serviceId: servicePathMatch[1] };
    }
    
    const serviceHashMatch = hash.match(/^#\/service\/([^/]+)/);
    if (serviceHashMatch) {
      return { page: "service", serviceId: serviceHashMatch[1] };
    }
    
    const params = new URLSearchParams(search);
    const serviceId = params.get("service");
    if (serviceId) {
      return { page: "service", serviceId };
    }
    
    return { page: "home" };
  };

  const navigateTo = (route: { page: string; serviceId?: string }) => {
    let url = "/";
    if (route.page === "service" && route.serviceId) {
      url = `/service/${route.serviceId}`;
    } else if (route.page === "services") {
      url = "/services";
    } else if (route.page === "about") {
      url = "/about";
    } else if (route.page === "why-us") {
      url = "/why-us";
    } else if (route.page === "contact") {
      url = "/contact";
    }
    
    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event("popstate"));
  };

  useEffect(() => {
    const checkRoute = () => {
      const parsed = parseCurrentRoute();
      
      // Dynamic premium page loading transitions
      setPageLoading(true);
      setTimeout(() => {
        setCurrentRoute(parsed);
        setPageLoading(false);
        window.scrollTo(0, 0);
      }, 350);
    };

    checkRoute();

    window.addEventListener("popstate", checkRoute);
    window.addEventListener("hashchange", checkRoute);

    return () => {
      window.removeEventListener("popstate", checkRoute);
      window.removeEventListener("hashchange", checkRoute);
    };
  }, []);



  const triggerQuote = (serviceId?: string) => {
    setPreselectedService(serviceId);
    setQuoteDialogOpen(true);
  };

  const selectServiceDetail = (service: Service) => {
    navigateTo({ page: "service", serviceId: service.id });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      setShowGlobalSuccess(true);
      setContactForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => {
        setContactSuccess(false);
      }, 5000);
    }, 1200);
  };



  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC] font-sans text-slate-800">
        <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-dashed border-orange-500 animate-[spin_40s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full border border-dotted border-orange-600 animate-[spin_60s_linear_infinite_reverse]" />
        </div>

        <div className="relative text-center max-w-sm px-6">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full border border-slate-200 shadow-xl relative animate-bounce overflow-hidden flex items-center justify-center">
              <img 
                src="/src/assets/images/coreguard_logo_1782336134989.jpg" 
                alt="CoreGuard Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
            CORE<span className="text-[#D95B16]">GUARD</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#D95B16] font-bold mt-1.5">
            Secure . Connect . Protect
          </p>

          <div className="mt-8">
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-100">
              <div 
                className="h-full bg-[#D95B16] rounded-full transition-all duration-150"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2">
              <span className="text-[#D95B16] font-semibold animate-pulse">
                {loadingProgress < 40 ? "Checking Hardware Interfaces..." : 
                 loadingProgress < 80 ? "Verifying Telecom Trunking..." : 
                 "Workspace Initialized."}
              </span>
              <span>{Math.min(loadingProgress, 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-850 overflow-x-hidden selection:bg-orange-100 selection:text-slate-900 relative">
      <CustomCursor />
      
      {/* INTERACTIVE SOPHIA CHATBOT ASSISTANT */}
      <SophiaChat />

      {/* FLOAT BACK TO TOP */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-8 z-40 flex items-center justify-center h-10 w-10 rounded-full bg-white text-slate-700 hover:text-[#D95B16] border border-slate-200 shadow-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 animate-in slide-in-from-bottom-5"
          aria-label="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* BACKGROUND FLOATING PLEXUS LINES & PASTEL GEOMETRICS */}
      <NetworkBackground />
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-30">
        <FloatingGeometrics />
      </div>

      {/* NEW GLASSMORPHISM PREMIUM NAVBAR */}
      <Navbar 
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        contactPhone={contactInfo.phone}
        onTriggerQuote={(srvId) => triggerQuote(srvId)}
      />

      {/* CONDITIONAL MAIN CONTENT DISPLAY */}
      <AnimatePresence mode="wait">
        {currentRoute.page === "services" ? (
          <ServicesPage 
            key="services-page"
            services={services}
            onSelectService={(s) => selectServiceDetail(s)}
            onBackToHome={() => navigateTo({ page: "home" })}
            onTriggerQuote={(srvId) => triggerQuote(srvId)}
          />
        ) : currentRoute.page === "service" ? (
          (() => {
            const selectedService = services.find(s => s.id === currentRoute.serviceId);
            if (!selectedService) return <div className="pt-32 pb-24 text-center text-slate-500 font-mono text-sm">Service not found.</div>;
            return (
              <ServiceDetailView 
                key={`service-${currentRoute.serviceId}`}
                service={selectedService} 
                onBack={() => navigateTo({ page: "home" })} 
                onBook={(srvId) => triggerQuote(srvId)} 
              />
            );
          })()
        ) : currentRoute.page === "contact" ? (
          <ContactPage 
            key="contact-page"
            contactInfo={contactInfo} 
            onTriggerQuote={(srvId) => triggerQuote(srvId)} 
          />
        ) : currentRoute.page === "about" ? (
          <AboutPage key="about-page" />
        ) : currentRoute.page === "why-us" ? (
          <WhyUsPage key="why-us-page" />
        ) : (
          <motion.div
            key="home-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* HERO SECTION - Premium, light-colored professional CCTV security parallax background */}
            <section id="home" className="relative min-h-[92vh] flex items-center pt-32 pb-24 overflow-hidden z-10 bg-slate-50">
              {/* Parallax Background Container */}
              <div 
                className="absolute inset-0 z-0 bg-no-repeat transition-all duration-500"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=2560&q=100')`,
                  backgroundAttachment: 'fixed',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />

              {/* Light-colored premium semi-transparent overlays for high contrast readability of dark text */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px] z-1" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-slate-50 z-1" />

              {/* Active Monitor Status Widget */}
              <div className="absolute top-10 left-10 text-[10px] font-mono text-slate-600 font-bold z-10 tracking-widest uppercase flex items-center gap-2 bg-white/85 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D95B16] animate-ping" />
                <span>MONITOR ACTIVE // SECURE SYSTEM</span>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-4xl mx-auto">
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                    className="font-display font-black text-4xl sm:text-5xl lg:text-7xl text-slate-900 tracking-tight leading-[1.05] pt-12"
                  >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
                      {heroInfo.title1}
                    </span>
                    <span className="block text-slate-800 font-semibold mt-2 text-2xl sm:text-3.5xl lg:text-4.5xl font-sans tracking-wide">
                      {heroInfo.title2}
                    </span>
                    <span className="block font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D95B16] via-orange-500 to-orange-700 font-sans tracking-normal uppercase text-4.5xl sm:text-6xl lg:text-7.5xl mt-3 px-4 pb-1">
                      {heroInfo.highlightText}
                    </span>
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-slate-700 text-base sm:text-xl leading-relaxed max-w-3xl font-medium bg-white/80 px-6 py-3.5 rounded-2xl border border-slate-200/60 backdrop-blur-md shadow-sm"
                  >
                    {heroInfo.tagline}
                  </motion.p>

                  {/* Action buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 w-full"
                  >
                    <button 
                      onClick={() => triggerQuote()}
                      className="w-full sm:w-auto relative overflow-hidden rounded-xl bg-[#D95B16] hover:bg-[#C2410C] text-white font-extrabold py-4 px-10 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] cursor-pointer text-center text-sm flex items-center justify-center gap-2.5 group"
                    >
                      <span className="tracking-wider uppercase">{heroInfo.cta1}</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                    </button>
                    
                    <button 
                      onClick={() => navigateTo({ page: "services" })}
                      className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-black py-4 px-10 rounded-xl transition-all duration-300 text-center text-sm hover:scale-[1.03] active:scale-[0.98] shadow-sm tracking-wider uppercase cursor-pointer"
                    >
                      {heroInfo.cta2}
                    </button>
                  </motion.div>

                  {/* Trust metrics summaries under CTA */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55 }}
                    className="grid grid-cols-2 gap-8 sm:gap-20 pt-12 border-t border-slate-200 w-full max-w-xl mx-auto"
                  >
                    <div className="text-center">
                      <span className="block font-sans font-black text-3xl sm:text-4.5xl text-[#D95B16]">500+</span>
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-2 font-bold">HQ Projects</span>
                    </div>
                    <div className="text-center">
                      <span className="block font-sans font-black text-3xl sm:text-4.5xl text-emerald-650 text-emerald-600">300+</span>
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-2 font-bold">Active Sites</span>
                    </div>
                  </motion.div>

                </div>
              </div>
            </section>

      {/* BRIEF INTRODUCTION SECTION - High-End Overview, Get Quote & Support Hub */}
      <section id="introduction" className="py-24 bg-white border-y border-slate-200/60 relative overflow-hidden">
        {/* Subtle grid decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,91,22,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,91,22,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono text-[#D95B16] uppercase tracking-widest font-extrabold bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full inline-block">
              INTEGRATION ARCHITECTURE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 tracking-tight mt-4">
              Premium CCTV, Fiber & Datacenter Solutions
            </h2>
            <p className="text-slate-500 text-base mt-4 leading-relaxed font-sans">
              CoreGuard engineers high-integrity surveillance, precision optical loops, and robust biometric directories. We deliver certified enterprise-grade infrastructure tailored to withstand critical modern demands.
            </p>
          </div>

          {/* Quick Pillars Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-slate-200/70 rounded-2xl p-7 text-left relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(217,91,22,0.05)] hover:border-orange-200/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              {/* Dynamic decorative hover bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#D95B16] group-hover:to-orange-500 rounded-t-2xl transition-all duration-300" />
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2 mt-2">Secure Surveillance</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Professional 4K IP camera setups with advanced neural motion triggers, infrared night-vision, and encrypted smartphone live feeds.
              </p>
            </div>

            <div className="bg-white border border-slate-200/70 rounded-2xl p-7 text-left relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(217,91,22,0.05)] hover:border-orange-200/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              {/* Dynamic decorative hover bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#D95B16] group-hover:to-orange-500 rounded-t-2xl transition-all duration-300" />
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2 mt-2">Fiber Optic Splicing</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Core-alignment fusion splicing, OTDR optical distance mapping, and precise ribbon terminations to achieve micro-decibel loss ratings.
              </p>
            </div>

            <div className="bg-white border border-slate-200/70 rounded-2xl p-7 text-left relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(217,91,22,0.05)] hover:border-orange-200/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              {/* Dynamic decorative hover bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#D95B16] group-hover:to-orange-500 rounded-t-2xl transition-all duration-300" />
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2 mt-2">Network Infrastructure</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Gigabit Cat6 modular structured cabling layouts, custom hardware routing, and enterprise firewall setup for seamless bandwidth coverage.
              </p>
            </div>
          </div>

          {/* DUAL ACTION HERO ENGAGEMENT CENTER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            
            {/* GET A QUOTE CARD */}
            <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 text-left relative overflow-hidden shadow-md group">
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,91,22,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,91,22,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <h3 className="font-sans font-black text-2xl text-slate-900 mb-3">
                Get a Professional Quote
              </h3>
              
              <p className="text-slate-650 text-slate-600 text-xs leading-relaxed mb-8 max-w-md font-sans">
                Need customized cost projections for your site? Access our interactive quote generator to compile budget estimates based on camera unit count, splicing nodes, and structural wire lengths.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => triggerQuote()}
                  className="bg-[#D95B16] hover:bg-[#C2410C] text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
                >
                  <span>Launch Quote Simulator</span>
                  <ChevronRight size={14} className="stroke-[2.5]" />
                </button>
                <button 
                  onClick={() => navigateTo({ page: "services" })}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 text-xs py-3.5 px-6 rounded-xl font-bold transition-all text-center uppercase tracking-wider cursor-pointer"
                >
                  Browse Full Catalog
                </button>
              </div>
            </div>

            {/* EXPLORE SERVICES CARD - REPLACED SUPPORT OPTIONS CARD */}
            <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 text-left relative overflow-hidden shadow-md group">
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,91,22,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,91,22,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <h3 className="font-sans font-black text-2xl text-slate-900 mb-3">
                Explore Full Systems Catalog
              </h3>
              
              <p className="text-slate-650 text-slate-600 text-xs leading-relaxed mb-8 max-w-md font-sans">
                Dive into our complete separate database of technical solutions. Inspect hardware standards, 4K camera options, OTDR fiber testing specifications, and request immediate custom site blueprints.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button 
                  onClick={() => navigateTo({ page: "services" })}
                  className="bg-[#D95B16] hover:bg-[#C2410C] text-white font-extrabold py-3.5 px-7 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} className="stroke-[2.5]" />
                  <span>Explore Services Now</span>
                </button>
                <a 
                  href="#contact"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 text-xs py-3.5 px-6 rounded-xl font-bold transition-all text-center uppercase tracking-wider text-center"
                >
                  Contact Support Direct
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ABOUT US DIVISION SECTION - Modern Tech Stylings */}
      <section id="about" className="py-24 relative overflow-hidden bg-[#F8FAFC] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            
            {/* Left Column visual high-quality equipment checklist */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.04),0_1px_3px_rgba(0,0,0,0.01)] rounded-3xl p-8 text-left relative overflow-hidden group hover:border-orange-200 transition-all duration-300">
                <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-[#D95B16] to-orange-450 text-orange-500 bg-orange-500" />
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-orange-500/5 blur-2xl pointer-events-none" />
                
                <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight mb-5">
                  Why Professional Installation Outperforms DIY
                </h3>

                <ul className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-100/50 hover:bg-slate-50 hover:border-slate-200/60 transition-all duration-200">
                    <CheckCircle2 size={14} className="text-[#D95B16] shrink-0 mt-0.5" />
                    <span><b className="text-slate-850 text-slate-800">Proper Angle Mapping:</b> CCTV camera field calculations to completely bypass blindspots or high glare reflection planes.</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-100/50 hover:bg-slate-50 hover:border-slate-200/60 transition-all duration-200">
                    <CheckCircle2 size={14} className="text-[#D95B16] shrink-0 mt-0.5" />
                    <span><b className="text-slate-850 text-slate-800">Structured Conduits:</b> Protective metallic trunking shields Cat6/fiber cables against physical rodents, sun cracking, or high voltage interference.</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-100/50 hover:bg-slate-50 hover:border-slate-200/60 transition-all duration-200">
                    <CheckCircle2 size={14} className="text-[#D95B16] shrink-0 mt-0.5" />
                    <span><b className="text-slate-850 text-slate-800">Certified Fusion Splicing:</b> Standard mechanical connectors lose over 0.5dB signal, while fusion splicing maintains standard 0.02dB.</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/60 border border-slate-100/50 hover:bg-slate-50 hover:border-slate-200/60 transition-all duration-200">
                    <CheckCircle2 size={14} className="text-[#D95B16] shrink-0 mt-0.5" />
                    <span><b className="text-slate-850 text-slate-800">DDNS Firewalls Mappings:</b> Secure configurations to isolate camera remote networks from third-party botnets or ransomware.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] font-mono text-slate-400 font-medium">
                  Approved under certified physical networking criteria.
                </div>
              </div>
            </div>

            {/* Right Column details copy editable dynamically */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-3.5 py-1 text-[11px] text-[#D95B16] font-mono font-bold uppercase tracking-wider">
                <span>{aboutInfo.title}</span>
              </div>

              <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-900 tracking-tight">
                {aboutInfo.headline}
              </h2>

              <div className="space-y-4 text-slate-500 text-sm leading-relaxed">
                <p>{aboutInfo.description1}</p>
                <p>{aboutInfo.description2}</p>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-200/60">
                <div className="text-left">
                  <span className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">Main Headquarters</span>
                  <span className="block text-sm text-slate-800 font-bold mt-1 pr-1">{contactInfo.address}</span>
                </div>
                <div className="h-10 w-px bg-slate-200 self-center" />
                <div className="text-left">
                  <span className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">Priority Mail</span>
                  <a href={`mailto:${contactInfo.email}`} className="block text-sm text-[#D95B16] font-bold hover:underline mt-1">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US Promise section */}
      <section id="why-choose-us" className="py-24 bg-white border-y border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono text-[#D95B16] uppercase tracking-widest font-extrabold bg-orange-50 border border-orange-100 px-3.5 py-1 rounded-full inline-block">
              Why Choose CoreGuard
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-900 tracking-tight mt-3">
              We Guarantee Zero Weakness in Fiber & Security Links
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              We utilize certified enterprise testing equipment to assure maximum physical protection and optical performance parameters.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {benefits.map((b) => (
              <div 
                key={b.id}
                className="bg-white border border-slate-200/60 hover:border-orange-300 p-6 rounded-2xl text-left hover:bg-white hover:shadow-[0_12px_36px_rgba(217,91,22,0.06)] transition-all duration-300 relative group"
              >
                {/* Visual Accent point */}
                <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-[#D95B16] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Context copy */}
                <div>
                  <h4 className="font-display font-semibold text-slate-900 group-hover:text-[#D95B16] transition-colors mb-1.5 leading-snug">
                    {b.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Logos trust stripe */}
          <div className="mt-16 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left md:max-w-md">
              <span className="block text-[8px] font-mono text-[#D95B16] uppercase tracking-widest font-black">Global Hardware Handshake Standards</span>
              <span className="block text-xs text-slate-500 font-semibold mt-0.5">Configured exclusively with certified telecom, coax, and optical patch cords.</span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[10.5px] text-slate-400 font-mono tracking-widest font-bold">
              <span className="hover:text-[#D95B16] transition-colors cursor-pointer">HIKVISION</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="hover:text-[#D95B16] transition-colors cursor-pointer">DAHUA</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="hover:text-[#D95B16] transition-colors cursor-pointer">UBIQUITI</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="hover:text-[#D95B16] transition-colors cursor-pointer">CISCO CO.</span>
            </div>
          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION SECTION */}
      <section id="faq" className="py-24 bg-[#F8FAFC] border-b border-slate-200/60 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,91,22,0.008)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,91,22,0.008)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono text-[#D95B16] uppercase tracking-widest font-extrabold bg-orange-50 border border-orange-100 px-3.5 py-1 rounded-full inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-900 tracking-tight mt-3">
              Certified Technical Intelligence & Support Answers
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Have technical questions about optical distribution parameters, security system integrity, or active networks? Explore answers curated by our senior field engineers.
            </p>
          </div>

          {/* Accordion Layout */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={faq.id} 
                  className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden shadow-[0_2px_10px_rgba(15,23,42,0.01)] ${
                    isOpen ? "border-orange-300 shadow-[0_4px_20px_rgba(217,91,22,0.05)]" : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <div className={`p-2 rounded-xl border shrink-0 transition-all duration-300 ${
                        isOpen ? "bg-orange-50 border-orange-200 text-[#D95B16]" : "bg-slate-50 border-slate-100 text-slate-400 group-hover:text-[#D95B16] group-hover:bg-orange-50/50"
                      }`}>
                        <HelpCircle size={16} />
                      </div>
                      <span className={`font-sans font-semibold text-sm sm:text-base leading-snug transition-colors duration-200 ${
                        isOpen ? "text-[#D95B16] font-bold" : "text-slate-800"
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <div className={`p-1 rounded-lg border transition-all duration-300 ${
                      isOpen ? "bg-orange-50 border-orange-100 text-[#D95B16]" : "bg-slate-50 border-slate-100 text-slate-400"
                    }`}>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 bg-slate-50/30">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT ESTIMATOR DISPATCH SECTION */}
      <section id="contact" className="py-24 sm:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-stretch">
            
            {/* Left Column: Coordinates details */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-8 text-left">
              <div className="text-left space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-3.5 py-1 text-[11px] text-[#D95B16] font-mono font-bold uppercase tracking-wider">
                  <span>Contact Hub</span>
                </div>
                
                <h2 className="font-display font-medium text-3xl sm:text-4xl text-slate-900 tracking-tight">
                  Initiate System Infrastructure
                </h2>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  Ready to deploy high performance optical loops, biometric log systems, or HD CCTVs? Fill out our system inspection request or contact our Islamabad headquarters.
                </p>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#D95B16] shadow-xs shrink-0">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-450 font-bold">Direct Hotline</span>
                      <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-sm font-bold text-slate-900 hover:text-[#D95B16] transition-colors font-sans">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#D95B16] shadow-xs shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-450 font-bold">Mailbox</span>
                      <a href={`mailto:${contactInfo.email}`} className="text-sm font-bold text-slate-900 hover:text-[#D95B16] transition-colors font-sans">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#D95B16] shadow-xs shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-450 font-bold">Islamabad Head Office</span>
                      <span className="text-sm font-bold text-slate-900">
                        {contactInfo.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Contact Dispatch form */}
            <div className="lg:col-span-7">
              <div className="border border-slate-200/80 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.06)] rounded-3xl p-7 sm:p-9 text-left relative overflow-hidden">
                {/* Tech bar accent top */}
                <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-[#D95B16] via-orange-500 to-orange-400" />
                
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Schedule Technical Inspection
                </h3>
                <p className="text-[#D95B16] text-[10.5px] tracking-wider font-mono uppercase mb-6 font-bold mt-0.5">
                  No-obligation site estimation parameters
                </p>

                {contactSuccess ? (
                  <div className="py-12 text-center text-slate-700">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 border border-orange-200 text-[#D95B16] shadow-sm">
                      <CheckCircle size={28} className="animate-bounce" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-slate-950 mb-1.5">Dispatch Request Created!</h4>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                      We have compiled your submission values. An experienced site analyst will address your needs within 60 minutes.
                    </p>
                    <button 
                      onClick={() => setContactSuccess(false)}
                      className="mt-6 text-xs text-[#D95B16] font-semibold underline hover:text-orange-700"
                    >
                      Submit separate inquiry route
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                        Client Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-200"
                        disabled={contactSubmitting}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                          Phone Stream
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="e.g. +92 300 0000000"
                          className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-200"
                          disabled={contactSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                          Mail Channel
                        </label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-200"
                          disabled={contactSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                        Scope Description
                      </label>
                      <textarea 
                        required
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us about camera layouts, biometrics nodes, or networking obstacles..."
                        className="w-full bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-200 resize-none"
                        disabled={contactSubmitting}
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full bg-[#D95B16] hover:bg-[#C2410C] text-white font-bold py-3.5 px-5 rounded-xl transition-all shadow-[0_4px_20px_rgba(217,91,22,0.15)] hover:shadow-[0_4px_25px_rgba(217,91,22,0.25)] hover:-translate-y-0.5 cursor-pointer text-center text-sm flex items-center justify-center gap-2 disabled:opacity-85 disabled:pointer-events-none active:scale-[0.98]"
                    >
                      {contactSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Initiating technical dispatch channels...</span>
                        </>
                      ) : (
                        <span>Request Inspection & Estimate</span>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED PREMIUM LIGHT ENTERPRISE FOOTER */}
      <footer className="bg-slate-100 text-slate-600 pt-16 pb-8 text-left relative border-t border-slate-200 z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-200 text-sm">
            
            {/* Column 1 info and desc */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full border border-slate-200 overflow-hidden bg-white shrink-0 shadow-sm">
                  <img 
                    src="/src/assets/images/coreguard_logo_1782336134989.jpg" 
                    alt="CoreGuard Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-display font-black text-lg text-slate-900 leading-none uppercase">
                  Core<span className="text-[#D95B16]">Guard</span>
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed text-xs font-medium">
                A premium tech services provider specialized in corporate structured cabling trunkings, biometrics controls, smart optical fibers terminations, and high-definition CCTV security configurations.
              </p>
              <div className="flex gap-2.5 pt-2 text-[9px] font-mono uppercase tracking-wider font-bold">
                <span className="text-[#D95B16] hover:underline cursor-pointer">secure</span>
                <span className="text-slate-300">|</span>
                <span className="text-[#D95B16] hover:underline cursor-pointer">connect</span>
                <span className="text-slate-300">|</span>
                <span className="text-[#D95B16] hover:underline cursor-pointer">protect</span>
              </div>
            </div>

            {/* Column 2 navigation links */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-sans font-extrabold text-[11px] uppercase tracking-widest text-slate-800 font-bold">Portal Index</h4>
              <ul className="space-y-2 text-xs font-semibold text-slate-500 font-mono">
                <li><button onClick={() => navigateTo({ page: "home" })} className="hover:text-[#D95B16] text-left transition-colors cursor-pointer">Home landing</button></li>
                <li><button onClick={() => navigateTo({ page: "services" })} className="hover:text-[#D95B16] text-left transition-colors cursor-pointer">Solutions Catalog</button></li>
                <li><button onClick={() => navigateTo({ page: "about" })} className="hover:text-[#D95B16] text-left transition-colors cursor-pointer">About Engineering</button></li>
                <li><button onClick={() => navigateTo({ page: "why-us" })} className="hover:text-[#D95B16] text-left transition-colors cursor-pointer">Certified Promise</button></li>
                <li><button onClick={() => navigateTo({ page: "contact" })} className="hover:text-[#D95B16] text-left transition-colors cursor-pointer">Security Dispatch</button></li>
              </ul>
            </div>

            {/* Column 3 Quick request actions */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="font-sans font-extrabold text-[11px] uppercase tracking-widest text-slate-800 font-bold">Key Solutions</h4>
              <ul className="space-y-2 text-xs text-slate-500 font-semibold font-mono">
                <li><button onClick={() => triggerQuote("cctv-install")} className="hover:text-[#D95B16] text-left cursor-pointer transition-colors">CCTV HD Deployments</button></li>
                <li><button onClick={() => triggerQuote("fiber-splicing")} className="hover:text-[#D95B16] text-left cursor-pointer transition-colors">Optical Fiber Splicing</button></li>
                <li><button onClick={() => triggerQuote("network-setup")} className="hover:text-[#D95B16] text-left cursor-pointer transition-colors">Enterprise Setup Routing</button></li>
                <li><button onClick={() => triggerQuote("biometric-system")} className="hover:text-[#D95B16] text-left cursor-pointer transition-colors">SSID & Biometric Loggers</button></li>
              </ul>
            </div>

            {/* Column 4 dispatch support info */}
            <div className="lg:col-span-2 space-y-3.5">
              <h4 className="font-sans font-extrabold text-[11px] uppercase tracking-widest text-slate-800 font-bold">Support Desk</h4>
              <p className="text-xs text-slate-500 leading-normal font-medium">
                Islamabad HQ Hub Block:<br />
                {contactInfo.address}
              </p>
              <div className="pt-2">
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 hover:bg-orange-150 text-[#D95B16] py-2 px-3.5 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider hover:shadow-md transition-all cursor-pointer"
                >
                  <Phone size={10} /> Call Dispatch Priority
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium mt-8">
            <span>Copyright © 2026 CoreGuard Technology Services Company. All Rights Reserved.</span>
            <div className="flex gap-4 font-mono text-[9px] uppercase tracking-wider items-center">
              <span className="hover:text-[#D95B16] cursor-pointer">Terms</span>
              <span>•</span>
              <span className="hover:text-[#D95B16] cursor-pointer">Privacy Protocol</span>
            </div>
          </div>

        </div>
      </footer>
      {/* ESTIMATE QUOTE TRIGGER OVERLAY */}
      <QuoteDialog 
        isOpen={quoteDialogOpen}
        onClose={() => { setQuoteDialogOpen(false); setPreselectedService(undefined); }}
        preselectedServiceId={preselectedService}
        services={services}
        onSuccess={() => setShowGlobalSuccess(true)}
      />

      {/* DEDICATED THEMATIC SUCCESS NOTIFICATION */}
      <SuccessNotification 
        isOpen={showGlobalSuccess}
        onClose={() => setShowGlobalSuccess(false)}
      />

    </div>
  );
}
