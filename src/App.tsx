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
    phone: "+92 300 1234567",
    email: "support@coreguard.com",
    address: "I-8 Markaz, Executive Tower, Islamabad",
    latitude: "33.6844",
    longitude: "73.0479",
    whatsapp: "+92 300 1234567"
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

  // Authentication & Click States
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Admin Panel Control States
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<"services" | "contact" | "content" | "security">("services");
  
  // Admin Editing Forms
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({
    title: "",
    price: "",
    description: "",
    fullDescription: "",
    iconName: "Shield",
    hot: false,
    imageUrl: ""
  });
  const [isAddingNewService, setIsAddingNewService] = useState(false);

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
          if (s.id === "biometric-system" && (!s.imageUrl || s.imageUrl.includes("imimg.com"))) {
            return { ...s, imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80" };
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

    // Is logged in session persisted
    const savedLoginSession = localStorage.getItem("coreguard_is_logged_in");
    if (savedLoginSession === "true") {
      setIsLoggedIn(true);
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

  // Reset core database to pre-filled factory defaults
  const handleResetToDefaults = () => {
    if (confirm("Are you sure you want to reset all dynamic modifications? This will clear the backend data database and reload the initial default copy.")) {
      localStorage.removeItem("coreguard_services_db");
      localStorage.removeItem("coreguard_benefits_db");
      localStorage.removeItem("coreguard_stats_db");
      localStorage.removeItem("coreguard_contact_db");
      localStorage.removeItem("coreguard_hero_db");
      localStorage.removeItem("coreguard_about_db");
      
      setServices(DEFAULT_SERVICES);
      setBenefits(DEFAULT_BENEFITS);
      setStats(DEFAULT_STATS);
      setContactInfo({
        phone: "+92 300 1234567",
        email: "support@coreguard.com",
        address: "I-8 Markaz, Executive Tower, Islamabad",
        latitude: "33.6844",
        longitude: "73.0479",
        whatsapp: "+92 300 1234567"
      });
      setHeroInfo({
        title1: "Powering Networks",
        title2: "Through",
        highlightText: "Security & Precision",
        tagline: "Professional HD CCTV, high-capacity fusion splicing, and robust structured cabling solutions designed to keep your business fully connected and absolutely secure.",
        cta1: "Get a Quote",
        cta2: "Explore Services"
      });
      setAboutInfo({
        title: "Who We Are",
        tagline: "Secure. Connect. Protect.",
        headline: "Your Premier Infrastructure Systems Engineering Team",
        description1: "CoreGuard has emerged as a premier technology solution provider, introducing extreme attention-to-detail into hardware installations. We service commercial buildings, residential hubs, and industrial warehouses, laying fast optical fibers and smart networks.",
        description2: "Our guidelines bypass general shortcuts, delivering certified calibrations, neat cabling, and lifetime peace of mind. Let us protect what matters to you with the highest standard in security systems."
      });
      alert("Database reset to factory defaults successfully!");
    }
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
    
    if (path === "/adminlogin" || path === "/adminlogin/" || hash === "#/adminlogin" || hash === "#adminlogin") {
      return { page: "adminlogin" };
    }
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
    } else if (route.page === "adminlogin") {
      url = "/adminlogin";
    }
    
    window.history.pushState(null, "", url);
    window.dispatchEvent(new Event("popstate"));
  };

  const navigateToAdmin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateTo({ page: "adminlogin" });
  };

  const clearAdminRoute = () => {
    if (window.location.pathname === "/adminlogin" || window.location.pathname === "/adminlogin/") {
      window.history.pushState(null, "", "/");
    } else if (window.location.hash === "#/adminlogin" || window.location.hash === "#adminlogin") {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  useEffect(() => {
    const checkRoute = () => {
      const parsed = parseCurrentRoute();
      
      if (parsed.page === "adminlogin") {
        if (isLoggedIn) {
          setShowAdminPanel(true);
        } else {
          setShowLoginModal(true);
        }
      } else {
        setShowAdminPanel(false);
        setShowLoginModal(false);
        
        // Dynamic premium page loading transitions
        setPageLoading(true);
        setTimeout(() => {
          setCurrentRoute(parsed);
          setPageLoading(false);
          window.scrollTo(0, 0);
        }, 350);
      }
    };

    checkRoute();

    window.addEventListener("popstate", checkRoute);
    window.addEventListener("hashchange", checkRoute);

    return () => {
      window.removeEventListener("popstate", checkRoute);
      window.removeEventListener("hashchange", checkRoute);
    };
  }, [isLoggedIn]);

  // Admin login authentication
  const handleAdminVerify = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check credentials inside localstorage or fallback
    const configuredEmail = localStorage.getItem("coreguard_admin_email") || "admin@coreguard.com";
    const configuredPassword = localStorage.getItem("coreguard_admin_password") || "admin";

    if (loginEmail.trim() === configuredEmail && loginPassword.trim() === configuredPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("coreguard_is_logged_in", "true");
      setShowLoginModal(false);
      setLoginError("");
      setLoginEmail("");
      setLoginPassword("");
      setShowAdminPanel(true);
    } else {
      setLoginError("Invalid administrative credentials. Attempt logged.");
    }
  };

  // Admin sign out
  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("coreguard_is_logged_in");
    setShowAdminPanel(false);
    clearAdminRoute();
  };

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

  // Service admin forms handlings
  const handleEditClick = (srv: Service) => {
    setEditingServiceId(srv.id);
    setServiceForm(srv);
    setIsAddingNewService(false);
  };

  const handleAddNewServiceClick = () => {
    setIsAddingNewService(true);
    setEditingServiceId(null);
    setServiceForm({
      id: "srv-" + Date.now(),
      title: "New Custom Service",
      price: "Rs 1,500 – 4,500",
      description: "Quick summary of this security or networking solution description.",
      fullDescription: "Detailed breakdown explaining scope specifications, deployment guides, hardware standards, calibrations, and warranty parameters.",
      iconName: "Shield",
      hot: false,
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"
    });
  };

  const handleSaveService = () => {
    if (!serviceForm.title) {
      alert("Title field is mandatory.");
      return;
    }

    if (isAddingNewService) {
      const updated = [...services, serviceForm as Service];
      saveServicesToStorage(updated);
      setIsAddingNewService(false);
    } else if (editingServiceId) {
      const updated = services.map(s => s.id === editingServiceId ? { ...s, ...serviceForm } as Service : s);
      saveServicesToStorage(updated);
      setEditingServiceId(null);
    }
    setServiceForm({
      title: "",
      price: "",
      description: "",
      fullDescription: "",
      iconName: "Shield",
      hot: false,
      imageUrl: ""
    });
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this service options?")) {
      const updated = services.filter(s => s.id !== id);
      saveServicesToStorage(updated);
    }
  };

  // Settings downloader
  const handleExportData = () => {
    const backupObj = {
      services,
      contactInfo,
      heroInfo,
      aboutInfo,
      benefits,
      stats,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "coreguard_backup_database.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
      
      {/* FLOATING ACTION OVERLAY FOR ACTIVE ADMINS */}
      {isLoggedIn && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md relative z-50 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-amber-600 text-white rounded font-mono text-[9px] font-bold">MODE: ACTIVE ADMIN</span>
            <span>You are authenticated as an administrator. Access panel via <a href="/adminlogin" onClick={navigateToAdmin} className="underline font-bold">/adminlogin</a>.</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAdminPanel(true)}
              className="bg-slate-900 text-white px-2.5 py-1 rounded hover:bg-slate-800 transition-colors text-[11px] font-mono font-bold"
            >
              Management Panel
            </button>
            <button 
              onClick={handleAdminLogout}
              className="text-slate-950 font-bold underline text-[11px]"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

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
        isLoggedIn={isLoggedIn}
        onShowAdmin={() => setShowAdminPanel(true)}
        onLogout={handleAdminLogout}
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
              <div className="p-3.5 bg-orange-50 text-[#D95B16] rounded-xl inline-block mb-4.5 shadow-sm group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(217,91,22,0.15)] transition-all duration-300">
                <Camera size={20} className="group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">Secure Surveillance</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Professional 4K IP camera setups with advanced neural motion triggers, infrared night-vision, and encrypted smartphone live feeds.
              </p>
            </div>

            <div className="bg-white border border-slate-200/70 rounded-2xl p-7 text-left relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(217,91,22,0.05)] hover:border-orange-200/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              {/* Dynamic decorative hover bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#D95B16] group-hover:to-orange-500 rounded-t-2xl transition-all duration-300" />
              <div className="p-3.5 bg-orange-50 text-[#D95B16] rounded-xl inline-block mb-4.5 shadow-sm group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(217,91,22,0.15)] transition-all duration-300">
                <Layers size={20} className="group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">Fiber Optic Splicing</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                Core-alignment fusion splicing, OTDR optical distance mapping, and precise ribbon terminations to achieve micro-decibel loss ratings.
              </p>
            </div>

            <div className="bg-white border border-slate-200/70 rounded-2xl p-7 text-left relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(217,91,22,0.05)] hover:border-orange-200/50 hover:-translate-y-1 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              {/* Dynamic decorative hover bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#D95B16] group-hover:to-orange-500 rounded-t-2xl transition-all duration-300" />
              <div className="p-3.5 bg-orange-50 text-[#D95B16] rounded-xl inline-block mb-4.5 shadow-sm group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(217,91,22,0.15)] transition-all duration-300">
                <Shield size={20} className="group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <h3 className="font-display font-bold text-lg text-slate-900 mb-2">Network Infrastructure</h3>
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
                className="bg-white border border-slate-200/60 hover:border-orange-300 p-6 rounded-2xl flex gap-4 text-left hover:bg-white hover:shadow-[0_12px_36px_rgba(217,91,22,0.06)] transition-all duration-300 relative group"
              >
                {/* Visual Accent point */}
                <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-[#D95B16] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon in clean backing */}
                <div className="p-3 bg-white border border-slate-200 text-[#D95B16] rounded-xl shrink-0 h-fit shadow-xs">
                  <LucideIcon name={b.iconName} size={20} />
                </div>
                
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
              <a href="/adminlogin" onClick={navigateToAdmin} className="hover:text-[#D95B16] cursor-pointer">Admin Access</a>
              <span>•</span>
              <span className="hover:text-[#D95B16] cursor-pointer">Terms</span>
              <span>•</span>
              <span className="hover:text-[#D95B16] cursor-pointer">Privacy Protocol</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ADMINISTRATIVE LOGIN POPUP */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={clearAdminRoute} />
          
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 text-slate-800">
            <button 
              onClick={clearAdminRoute}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-800 p-1 bg-slate-50 border border-slate-150 rounded-full cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <Lock size={22} className="animate-pulse" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">Administration Portal</h3>
              <p className="text-[10px] uppercase tracking-wider font-mono text-indigo-600 font-bold mt-1">Authorized Operations Only</p>
            </div>

            {/* Quick credentials helper banner - very user friendly! */}
            <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl p-3 mb-5 leading-relaxed text-left">
              <span className="font-bold">Credential Configs:</span>
              <p className="mt-0.5">Use email <code className="bg-amber-100 rounded px-1 text-[11px] font-bold">admin@coreguard.com</code> and password <code className="bg-amber-100 rounded px-1 text-[11px] font-bold">admin</code> to log in. You can change these details in the panel setting.</p>
            </div>

            <form onSubmit={handleAdminVerify} className="space-y-4 text-left">
              {loginError && (
                <div className="bg-red-50 border border-red-250 text-red-750 p-3 rounded-lg text-xs font-semibold">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                  Email ID
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@coreguard.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">
                  Secret Key
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-2.5 rounded-lg transition-all shadow-md shadow-indigo-600/10 cursor-pointer text-sm font-sans"
              >
                Establish Secure Session
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MASTER INTUITIVE ADMINISTRATIVE OVERLAY WORKSPACE */}
      {showAdminPanel && isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={clearAdminRoute} />
          
          <div className="relative w-full max-w-4xl h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header Area */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-850 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-800 text-indigo-400 rounded-lg border border-slate-700">
                  <Shield size={22} />
                </div>
                <div className="text-left">
                  <h3 className="font-display font-medium text-lg text-white">Dynamic Content Customizer</h3>
                  <p className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-black">Authorized Active Session • CoreGuard DB</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2.5">
                <button 
                  onClick={handleExportData}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-300 py-1.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                  title="Download current database configuration backup"
                >
                  <FileDown size={14} /> Export Backup
                </button>
                <button 
                  onClick={handleResetToDefaults}
                  className="bg-slate-800 hover:bg-slate-750 text-amber-400 py-1.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                  title="Reset database variables to factory pre-sets"
                >
                  <RotateCcw size={14} /> Clear DB
                </button>
                <button 
                  onClick={clearAdminRoute}
                  className="p-1 bg-slate-800 rounded-full text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Inner Dashboard Layout */}
            <div className="flex flex-1 overflow-hidden">
              
              {/* Dashboard Side navigation */}
              <div className="w-56 bg-slate-50 border-r border-slate-200 p-4.5 space-y-2 text-left hidden sm:block shrink-0">
                <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest font-black mb-3">WORKSPACE ENTITIES</span>
                
                <button 
                  onClick={() => setActiveAdminTab("services")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${activeAdminTab === "services" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-650 hover:bg-slate-200/50"}`}
                >
                  <Layers size={14} /> Dynamic Services ({services.length})
                </button>
                <button 
                  onClick={() => setActiveAdminTab("contact")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${activeAdminTab === "contact" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-650 hover:bg-slate-200/50"}`}
                >
                  <Phone size={14} /> Contact Details
                </button>
                <button 
                  onClick={() => setActiveAdminTab("content")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${activeAdminTab === "content" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-650 hover:bg-slate-200/50"}`}
                >
                  <Edit size={14} /> Hero & About Content
                </button>
                <button 
                  onClick={() => setActiveAdminTab("security")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${activeAdminTab === "security" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-650 hover:bg-slate-200/50"}`}
                >
                  <Lock size={14} /> Admin Access Set
                </button>

                <div className="pt-24 text-[10px] text-slate-400 leading-relaxed font-mono">
                  <span>Changes reflect instantly across the public interface upon clicking save blocks. Data keeps persistent.</span>
                </div>
              </div>

              {/* Central Editing Pane */}
              <div className="flex-1 p-6 overflow-y-auto text-left">
                
                {/* Fallback segment selector for smaller devices */}
                <div className="flex sm:hidden overflow-x-auto gap-1 pb-4 mb-4 border-b border-slate-100 shrink-0 select-none">
                  <button 
                    onClick={() => setActiveAdminTab("services")}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0 ${activeAdminTab === "services" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
                  >
                    Services ({services.length})
                  </button>
                  <button 
                    onClick={() => setActiveAdminTab("contact")}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0 ${activeAdminTab === "contact" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
                  >
                    Contacts
                  </button>
                  <button 
                    onClick={() => setActiveAdminTab("content")}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0 ${activeAdminTab === "content" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
                  >
                    Headline Texts
                  </button>
                  <button 
                    onClick={() => setActiveAdminTab("security")}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0 ${activeAdminTab === "security" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"}`}
                  >
                    Access Key
                  </button>
                </div>

                {/* TAB 1: SERVICES CATALOG MANAGEMENT */}
                {activeAdminTab === "services" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                      <div>
                        <h4 className="font-display font-bold text-lg text-slate-905">Dynamic Services Catalog</h4>
                        <p className="text-xs text-slate-450 mt-0.5 text-slate-500">Edit values, prices, icons, cover photos, or upload custom hardware solutions.</p>
                      </div>
                      <button 
                        onClick={handleAddNewServiceClick}
                        className="bg-indigo-600 hover:bg-indigo-750 text-white flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <Plus size={14} /> Add New Service
                      </button>
                    </div>

                    {/* Form for Editing or Adding a single service */}
                    {(editingServiceId || isAddingNewService) && (
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4 animate-in slide-in-from-top duration-200 relative">
                        <button 
                          onClick={() => { setEditingServiceId(null); setIsAddingNewService(false); }}
                          className="absolute top-4 right-4 text-xs font-mono text-slate-450 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                        <h5 className="font-display font-black text-sm text-indigo-700 uppercase tracking-wide">
                          {isAddingNewService ? "New Service Configuration Parameters" : `Modify Service ID: ${editingServiceId}`}
                        </h5>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">Service Title</label>
                            <input 
                              type="text" 
                              value={serviceForm.title || ""} 
                              onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                              placeholder="e.g. CCTV HD Deployment"
                              className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">Cover Image custom Link</label>
                            <input 
                              type="text" 
                              value={serviceForm.imageUrl || ""} 
                              onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                              placeholder="Unsplash URL or custom layout link"
                              className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">Icon Name (Lucide standard)</label>
                            <select 
                              value={serviceForm.iconName || "Shield"} 
                              onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                              className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                            >
                              <option value="Camera">Camera (CCTV)</option>
                              <option value="Cable">Cable (Fiber Trunk)</option>
                              <option value="Network">Network (Enterprise Switch)</option>
                              <option value="Wrench">Wrench (Diagnostics)</option>
                              <option value="Activity">Activity (Reflectometer)</option>
                              <option value="Fingerprint">Fingerprint (Biometrics)</option>
                              <option value="Shuffle">Shuffle (Structured cabling)</option>
                              <option value="Smartphone">Smartphone (DDNS App)</option>
                              <option value="Layers">Layers (Calibration)</option>
                              <option value="Lock">Lock (Access control)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">Quick Description (Grid display limit)</label>
                          <input 
                            type="text" 
                            value={serviceForm.description || ""} 
                            onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                            placeholder="Brief 1-sentence descriptor for gallery cards lookup..."
                            className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1">Extended full description (Detailed Modal lookup)</label>
                          <textarea 
                            rows={3}
                            value={serviceForm.fullDescription || ""} 
                            onChange={(e) => setServiceForm({ ...serviceForm, fullDescription: e.target.value })}
                            placeholder="List physical wire thickness, DB signal limits, configurations warranty, hardware handshakes..."
                            className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 resize-none font-sans"
                          />
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <label className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 select-none">
                            <input 
                              type="checkbox" 
                              checked={serviceForm.hot || false}
                              onChange={(e) => setServiceForm({ ...serviceForm, hot: e.target.checked })}
                              className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 rounded"
                            />
                            Markup with 'Popular' tag highlight
                          </label>
                          <div className="ml-auto flex gap-2">
                            <button 
                              onClick={() => { setEditingServiceId(null); setIsAddingNewService(false); }}
                              className="px-3 bg-white border border-slate-200 text-slate-650 text-xs py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                            >
                              Go Back
                            </button>
                            <button 
                              onClick={handleSaveService}
                              className="px-4.5 bg-indigo-600 text-white text-xs py-1.5 font-bold rounded-lg hover:bg-indigo-755 flex items-center gap-1 cursor-pointer"
                            >
                              <Save size={13} /> Save Change
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Table of active dynamic services */}
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px] font-bold">
                            <th className="p-3">Solution / Service</th>
                            <th className="p-3 hidden sm:table-cell font-mono text-[10px] font-bold">Lucide Icon</th>
                            <th className="p-3 text-right">Operational Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 font-sans">
                          {services.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50/50">
                              <td className="p-3">
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={s.imageUrl} 
                                    className="h-10 w-10 object-cover rounded-md border border-slate-200" 
                                    alt="" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div>
                                    <span className="font-bold text-slate-900 block">{s.title}</span>
                                    {s.hot && <span className="inline-block px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[8px] font-bold uppercase tracking-widest rounded mt-0.5">Popular</span>}
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 hidden sm:table-cell font-mono text-slate-500">{s.iconName}</td>
                              <td className="p-3 text-right">
                                <div className="inline-flex gap-2">
                                  <button 
                                    onClick={() => handleEditClick(s)}
                                    className="p-1.5 bg-slate-50 text-slate-650 hover:text-indigo-600 rounded border border-slate-150 cursor-pointer"
                                    title="Edit fields"
                                  >
                                    <Edit size={13} />
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteService(s.id)}
                                    className="p-1.5 bg-slate-50 text-slate-650 hover:text-[#EF4444] rounded border border-slate-150 cursor-pointer"
                                    title="Delete service node"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2: CONTACT DETAILS */}
                {activeAdminTab === "contact" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-lg text-slate-900">Dynamic Contact Setup</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Alter support hotlines, corporate email routes, Islamabad office coordinates, and live node parameters.</p>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        saveContactToStorage(contactInfo);
                        alert("Contact properties compiled and locked successfully!");
                      }} 
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">Dispatch Support Hotline</label>
                          <input 
                            type="text" 
                            required
                            value={contactInfo.phone}
                            onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-250/70 rounded-lg px-3 py-2 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">Official Mail Room</label>
                          <input 
                            type="email" 
                            required
                            value={contactInfo.email}
                            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-250/70 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">HQ Office Address</label>
                        <input 
                          type="text" 
                          required
                          value={contactInfo.address}
                          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-250/70 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">Location Latitude Coordinate</label>
                          <input 
                            type="text" 
                            required
                            value={contactInfo.latitude}
                            onChange={(e) => setContactInfo({ ...contactInfo, latitude: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-250/70 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">Location Longitude Coordinate</label>
                          <input 
                            type="text" 
                            required
                            value={contactInfo.longitude}
                            onChange={(e) => setContactInfo({ ...contactInfo, longitude: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-250/70 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="px-5 bg-indigo-600 text-white font-bold py-2 rounded-lg text-xs hover:bg-indigo-750 inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Save size={13} /> Commit Contact Profiles
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* TAB 3: CONTENT MANAGEMENTS (Hero, Headline, Descs) */}
                {activeAdminTab === "content" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-lg text-slate-900">Dynamic Text Configuration</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Customize hero marketing statements and technical parameters of the about division instantly.</p>
                    </div>

                    <div className="space-y-6">
                      
                      {/* Hero Section settings form */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          saveHeroToStorage(heroInfo);
                          alert("Hero statements committed and saved!");
                        }}
                        className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4"
                      >
                        <h5 className="font-sans font-bold text-xs uppercase tracking-widest text-[#EF4444] border-b border-slate-200 pb-2">1. Hero Splash Headers</h5>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Headline Part 1</label>
                            <input 
                              type="text" 
                              required
                              value={heroInfo.title1}
                              onChange={(e) => setHeroInfo({ ...heroInfo, title1: e.target.value })}
                              className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Headline Connector (italic)</label>
                            <input 
                              type="text" 
                              required
                              value={heroInfo.title2}
                              onChange={(e) => setHeroInfo({ ...heroInfo, title2: e.target.value })}
                              className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Primary Accented Highlight Word</label>
                          <input 
                            type="text" 
                            required
                            value={heroInfo.highlightText}
                            onChange={(e) => setHeroInfo({ ...heroInfo, highlightText: e.target.value })}
                            className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none font-bold text-indigo-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Hero Tagline text (Paragraph description)</label>
                          <textarea 
                            rows={2}
                            required
                            value={heroInfo.tagline}
                            onChange={(e) => setHeroInfo({ ...heroInfo, tagline: e.target.value })}
                            className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none resize-none font-sans"
                          />
                        </div>

                        <div className="pt-1">
                          <button 
                            type="submit"
                            className="px-4 bg-indigo-600 text-white font-bold py-1.5 rounded-lg text-xs hover:bg-indigo-750 inline-flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <Save size={12} /> Sync Hero Splash
                          </button>
                        </div>
                      </form>

                      {/* About Division details form */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          saveAboutToStorage(aboutInfo);
                          alert("About page statements saved successfully!");
                        }}
                        className="bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 space-y-4"
                      >
                        <h5 className="font-sans font-bold text-xs uppercase tracking-widest text-[#EF4444] border-b border-slate-200 pb-2">2. About Division Credentials</h5>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Top Category Tag</label>
                            <input 
                              type="text" 
                              required
                              value={aboutInfo.title}
                              onChange={(e) => setAboutInfo({ ...aboutInfo, title: e.target.value })}
                              className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Accented Subline Slogan</label>
                            <input 
                              type="text" 
                              required
                              value={aboutInfo.tagline}
                              onChange={(e) => setAboutInfo({ ...aboutInfo, tagline: e.target.value })}
                              className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 font-bold text-[#EF4444]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Main About Section Title Headline</label>
                          <input 
                            type="text" 
                            required
                            value={aboutInfo.headline}
                            onChange={(e) => setAboutInfo({ ...aboutInfo, headline: e.target.value })}
                            className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">First paragraph overview (Core capabilities)</label>
                          <textarea 
                            rows={3}
                            required
                            value={aboutInfo.description1}
                            onChange={(e) => setAboutInfo({ ...aboutInfo, description1: e.target.value })}
                            className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 resize-none font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Second paragraph overview (Inclusions warranting)</label>
                          <textarea 
                            rows={2}
                            required
                            value={aboutInfo.description2}
                            onChange={(e) => setAboutInfo({ ...aboutInfo, description2: e.target.value })}
                            className="w-full bg-white border border-slate-250/70 rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-indigo-500 resize-none font-sans"
                          />
                        </div>

                        <div className="pt-1">
                          <button 
                            type="submit"
                            className="px-4 bg-indigo-600 text-white font-bold py-1.5 rounded-lg text-xs hover:bg-indigo-755 inline-flex items-center gap-1 cursor-pointer shadow-sm"
                          >
                            <Save size={12} /> Sync About Credentials
                          </button>
                        </div>
                      </form>

                    </div>
                  </div>
                )}

                {/* TAB 4: ACCESS CREDENTIALS CONFIGURATIONS */}
                {activeAdminTab === "security" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-lg text-slate-900">Change Admin Access Credentials</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Customize your authorized email and security password for accessing the workspace customizer.</p>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const emailInput = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
                        const passInput = (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value;
                        
                        if (emailInput.trim().length < 5 || passInput.trim().length < 4) {
                          alert("Email must be at least 5 letters and password at least 4 letters.");
                          return;
                        }

                        localStorage.setItem("coreguard_admin_email", emailInput.trim());
                        localStorage.setItem("coreguard_admin_password", passInput.trim());
                        alert("Administrative credentials saved successfully! Use them on your next login prompt.");
                      }}
                      className="space-y-4 max-w-md bg-slate-50 border border-slate-200/80 rounded-2xl p-5"
                    >
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">Configure Admin Email ID</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          defaultValue={localStorage.getItem("coreguard_admin_email") || "admin@coreguard.com"}
                          className="w-full bg-white border border-slate-250/70 rounded-lg px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-1.5">Configure Administrative Password</label>
                        <input 
                          type="text" 
                          name="password"
                          required
                          defaultValue={localStorage.getItem("coreguard_admin_password") || "admin"}
                          className="w-full bg-white border border-slate-250/70 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono font-bold"
                        />
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="px-5 bg-indigo-600 text-white font-bold py-2 rounded-lg text-xs hover:bg-indigo-750 inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Save size={13} /> Update Access Details
                        </button>
                      </div>
                    </form>
                  </div>
                )}

              </div>

            </div>

            {/* Bottom bar inside panel */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-[11px] text-slate-400 font-mono shrink-0">
              Workspace sync engine active. Change parameters reactively. Made for CoreGuard administration.
            </div>

          </div>
        </div>
      )}

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
