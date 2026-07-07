import React, { useState } from "react";
import { Service } from "../types";
import { LucideIcon } from "./LucideIcon";
import { 
  Search, 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  BookOpen, 
  Cpu, 
  Sliders, 
  Compass, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldAlert,
  MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicesPageProps {
  services: Service[];
  onSelectService: (service: Service) => void;
  onBackToHome: () => void;
  onTriggerQuote: (serviceId?: string) => void;
}

// Highly realistic and domain-specific engineering specs for local security/telecom services
const serviceTelemetry: Record<string, { label: string; val: string }[]> = {
  "cctv-install": [
    { label: "Optimum Feed", val: "4K UHD IP Streams" },
    { label: "Night Vision", val: "100m Smart IR Array" },
    { label: "Storage Mode", val: "RAID Resilient Local/Cloud" }
  ],
  "fiber-splicing": [
    { label: "Splicer Tech", val: "Fujikura Core Thermal" },
    { label: "Insertion Loss", val: "<0.02 dB Decibel Limit" },
    { label: "Standard Class", val: "ITU-T G.652 Single-mode" }
  ],
  "network-setup": [
    { label: "Port Capacity", val: "10 Gbps Backplane Link" },
    { label: "AP Coverage", val: "Beamforming 3D Mapping" },
    { label: "VLAN Segments", val: "Isolated Layer 3 Routing" }
  ],
  "cctv-repair": [
    { label: "SLA Response", val: "<60 Mins Urgent Dispatch" },
    { label: "Replacement Mode", val: "Genuine Manufacturer OEM" },
    { label: "Diagnostic Check", val: "RF Signal/Voltage Sweep" }
  ],
  "fiber-testing": [
    { label: "Scan Method", val: "OTDR Dual 1310/1550nm" },
    { label: "Fault Precision", val: "Within ±1 Centimeter" },
    { label: "Max Sweep Line", val: "120 Kilometer Range" }
  ],
  "biometric-system": [
    { label: "Detection Engine", val: "Dynamic Facial / IR Biometrics" },
    { label: "Capture Latency", val: "Instant <0.2 Seconds" },
    { label: "Lock Interface", val: "Electromagnetic Dry Relay" }
  ],
  "structured-cabling": [
    { label: "Wire Standard", val: "Cat6/6A Shielded Twisted-Pair" },
    { label: "Frequency Max", val: "500 MHz Solid Performance" },
    { label: "Conduit Shielding", val: "Weatherproof Armored Trunking" }
  ],
  "remote-cctv": [
    { label: "Remote Access", val: "Encrypted SSL/TLS DDNS" },
    { label: "Client Platform", val: "Native iOS / Android Apps" },
    { label: "Ping Threshold", val: "<80ms Packet Latency" }
  ]
};

const fallbackTelemetry = [
  { label: "SLA Warranty", val: "1-Year Commercial Full" },
  { label: "Support Status", val: "24/7 Priority Remote Help" },
  { label: "Hardware Sourcing", val: "Original Brand Certified" }
];

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onSelectService,
  onBackToHome,
  onTriggerQuote,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "security" | "fiber" | "network">("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter categories helper
  const filteredServices = services.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "security") {
      return matchesSearch && (s.id.includes("cctv") || s.id.includes("biometric") || s.id.includes("home"));
    }
    if (selectedCategory === "fiber") {
      return matchesSearch && s.id.includes("fiber");
    }
    if (selectedCategory === "network") {
      return matchesSearch && (s.id.includes("network") || s.id.includes("cabling") || s.id.includes("support"));
    }
    return matchesSearch;
  });

  // Framer motion variants for coordinated container staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.97 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 110, 
        damping: 18 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 10,
      transition: { duration: 0.2 } 
    }
  };

  const filterTabs = [
    { id: "all", label: "All Systems" },
    { id: "security", label: "Surveillance & Access" },
    { id: "fiber", label: "Fiber Optics (OTDR)" },
    { id: "network", label: "Structured Networking" }
  ] as const;

  return (
    <div className="pt-32 pb-28 bg-white min-h-screen text-slate-800 font-sans relative overflow-hidden">
      
      {/* Decorative High-Tech Background Lines and Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* Visual Ambient Orange Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(217,91,22,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(217,91,22,0.02),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(217,91,22,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation Return Hook */}
        <div className="mb-10 text-left">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2.5 text-xs font-bold font-mono tracking-widest text-[#D95B16] hover:text-[#EA580C] uppercase transition-all duration-300 cursor-pointer bg-slate-50 border border-slate-100 hover:border-orange-200 px-4.5 py-2.5 rounded-full shadow-sm"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
            <span>Return to Landing</span>
          </motion.button>
        </div>

        {/* HERO HEADER SECTION WITH TECHNICAL METADATA */}
        <div className="text-left mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              
              <h1 className="font-display font-black text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none">
                Our Security & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D95B16] to-[#EA580C]">
                  Networking Solutions
                </span>
              </h1>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl pt-1">
                Deploying certified network topologies and military-grade surveillance structures across Islamabad, Rawalpindi, and Punjab. Select any solution below to inspect micro-decibel metrics and target specifications.
              </p>
            </div>
            
            {/* Quick stats panel */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-8 shadow-md self-start lg:self-auto relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-transparent pointer-events-none" />
              <div>
                <span className="block text-3xl font-black text-slate-900 leading-none tracking-tight">{services.length}</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold mt-1.5 block">Capabilities</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div>
                <span className="block text-3xl font-black text-[#D95B16] leading-none tracking-tight">Zero</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold mt-1.5 block">Loss Rate</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div>
                <span className="block text-3xl font-black text-[#EA580C] leading-none tracking-tight">100%</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold mt-1.5 block">Certified</span>
              </div>
            </motion.div>
          </div>
        </div>



        {/* GRID OF SERVICES WITH ADVANCED STAGGER AND CARD RENDERS */}
        <AnimatePresence mode="popLayout">
          {filteredServices.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {filteredServices.map((service) => {
                return (
                  <motion.div
                    layout
                    key={service.id}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    onClick={() => onSelectService(service)}
                    className="bg-white border border-slate-100 rounded-3xl p-5.5 relative flex flex-col justify-between shadow-md hover:shadow-xl hover:border-orange-100 transition-all duration-300 group overflow-hidden cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="relative w-full h-44 rounded-[2rem] overflow-hidden mb-5 border border-slate-100 bg-slate-50 shadow-sm">
                        <img 
                          src={service.imageUrl || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80"} 
                          alt={service.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 text-[8px] font-mono font-black text-slate-900 bg-white/90 px-3 py-1 rounded-full uppercase tracking-[0.28em] shadow-sm">
                          {service.id.includes("fiber") ? "OTDR FIBER" : service.id.includes("cctv") ? "SURVEILLANCE" : service.id.includes("biometric") ? "ACCESS" : "NETWORK"}
                        </span>
                        {service.hot && (
                          <span className="absolute bottom-3 right-3 text-[9px] font-semibold text-white bg-[#D95B16] px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                            POPULAR
                          </span>
                        )}
                      </div>

                      <div className="mb-3 text-left">
                        <h3 className="font-sans font-black text-xl text-slate-900 group-hover:text-[#D95B16] transition-colors duration-300 tracking-tight leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed text-left font-sans min-h-[72px]">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-100 mt-auto flex flex-col sm:flex-row sm:items-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onSelectService(service); }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D95B16] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span>Explore more</span>
                        <ChevronRight size={14} className="stroke-[3]" />
                      </button>
                      
                      <a 
                        href={`https://wa.me/923185826202?text=${encodeURIComponent(`Hello, I would like to contact CoreGuard about the ${service.title} service.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#1f4f2f] hover:text-white text-xs font-semibold uppercase tracking-widest px-4 py-3 rounded-2xl border border-[#DDEBDF] bg-emerald-50 hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
                        title="Contact on WhatsApp"
                      >
                        <MessageCircle size={16} className="text-[#25D366]" />
                        <span>Contact</span>
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-slate-50 border border-slate-100 rounded-3xl max-w-xl mx-auto mt-6"
            >
              <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-100 text-[#D95B16] flex items-center justify-center mx-auto mb-4">
                <ShieldAlert size={22} />
              </div>
              <h3 className="text-slate-900 font-bold text-base mb-1.5">No Infrastructure Found</h3>
              <p className="text-slate-550 text-xs font-sans max-w-sm mx-auto leading-relaxed">
                No security hardware or structural parameters matched "{searchQuery}". Restructure your query or clear filters to examine standard scopes.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="mt-5 bg-[#D95B16]/10 hover:bg-[#D95B16]/20 border border-[#D95B16]/30 text-[#D95B16] px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all tracking-widest cursor-pointer"
              >
                Reset Filter Parameters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
