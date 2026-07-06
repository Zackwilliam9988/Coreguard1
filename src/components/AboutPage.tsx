import React from "react";
import { motion } from "motion/react";
import { 
  Shield, 
  Eye, 
  Target, 
  Award, 
  Users, 
  Cpu, 
  Globe, 
  CheckCircle2, 
  TrendingUp, 
  Zap, 
  Heart 
} from "lucide-react";

export const AboutPage: React.FC = () => {
  const coreValues = [
    {
      icon: Shield,
      title: "Absolute Protection",
      description: "We deploy defense-grade surveillance systems and rigorous protocols to protect digital and physical critical infrastructure.",
      color: "from-[#D95B16]/10 to-[#EA580C]/10",
      accentColor: "#D95B16"
    },
    {
      icon: Cpu,
      title: "Pristine Calibration",
      description: "Our optical fiber splices and network cabling systems adhere to nanosecond response budgets and 100% loss-free validation.",
      color: "from-[#EA580C]/10 to-[#F97316]/10",
      accentColor: "#EA580C"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Enterprise operations require constant uptime. We provide rapid emergency support dispatch within 2 hours.",
      color: "from-[#F97316]/10 to-[#D95B16]/10",
      accentColor: "#F97316"
    }
  ];

  const teamMembers = [
    {
      name: "Ahtesham Akram",
      role: "Lead Infrastructure Architect",
      specialty: "High-capacity Fiber & CCTV Systems",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Rao Ubaidullah Javed",
      role: "Senior Security Engineer",
      specialty: "Biometric Access Control & CCTV Maintenance",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Muhammad Maaz",
      role: "Chief Network Solutions Architect",
      specialty: "Enterprise Switching, Splicing & Datacenters",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const milestones = [
    { year: "2018", title: "Enterprise Conception", desc: "CoreGuard begins high-end commercial cabling & CCTV rollouts in Islamabad." },
    { year: "2020", title: "Fiber Splice Core", desc: "Acquired state-of-the-art OTDR core-alignment splicing units to service optical feeds." },
    { year: "2022", title: "Smart City Contract", desc: "Deployed integrated surveillance systems covering major commercial zones." },
    { year: "2025", title: "Biometric Integration Hub", desc: "Launched central biometric database syncing cloud metrics for 50+ enterprise sites." }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-800 font-sans relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(217,91,22,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(217,91,22,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION FOR ABOUT US */}
        <div className="text-left mb-16 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none mb-6"
          >
            Engineering Pristine <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D95B16] to-[#EA580C]">Security Landscapes</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-xl leading-relaxed font-sans"
          >
            CoreGuard is a specialized high-performance security systems integrator and infrastructure engineering collective. We service commercial buildings, residential hubs, and industrial warehouses, laying fast optical fibers, smart networks, and unified CCTV grids.
          </motion.p>
        </div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-100 rounded-3xl p-8 relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-2xl pointer-events-none" />
            <h3 className="text-2xl font-black font-sans mb-4 tracking-tight text-slate-900 mt-2">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              To engineer and maintain bulletproof security grids, high-speed networking paths, and automated bio-tracking modules that guarantee commercial clients continuous uptime, maximum asset protection, and streamlined oversight.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-slate-100 rounded-3xl p-8 relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-2xl pointer-events-none" />
            <h3 className="text-2xl font-black font-sans mb-4 tracking-tight text-slate-900 mt-2">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              To be Pakistan's standard in mission-critical infrastructure integration. We envision automated commercial grids where biometric flow, 4K intelligent surveillance, and redundant fiber links seamlessly collaborate on a single secure platform.
            </p>
          </motion.div>
        </div>

        {/* CORE VALUES */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-4 font-sans">
              The Principles Behind CoreGuard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => {
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 relative transition-all duration-300 group hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                  <h4 className="text-lg font-black text-slate-900 mb-2 mt-2 font-sans group-hover:text-[#D95B16] transition-colors">{value.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ACHIEVEMENTS / HISTORIC TIMELINE */}
        <div className="mb-20 bg-slate-50 border border-slate-100 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,91,22,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,91,22,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          <div className="text-left mb-12">
            <h2 className="text-3xl font-black font-sans text-slate-900 mt-4">Proven Service Trajectory</h2>
          </div>

          <div className="relative border-l-2 border-slate-200 pl-6 sm:pl-10 space-y-12">
            {milestones.map((m, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative text-left"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 h-4 w-4 rounded-full bg-white border-2 border-[#D95B16] shadow-[0_2px_8px_rgba(217,91,22,0.3)]" />
                
                <span className="text-sm font-mono font-black text-[#D95B16] bg-[#D95B16]/5 px-3 py-1 rounded-md border border-[#D95B16]/10 inline-block mb-2">
                  {m.year}
                </span>
                <h4 className="text-xl font-bold font-sans text-slate-900">{m.title}</h4>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl font-sans leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PROFESSIONAL TEAM SECTION */}
        <div className="mb-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mt-4 font-sans">
              Our Senior Engineering Team
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Meet the specialists leading on-site configurations, OTDR laser calculations, and enterprise CCTV network deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md hover:border-orange-500/20 hover:shadow-lg transition-all duration-300 text-left group"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] font-mono font-bold text-[#D95B16] bg-[#D95B16]/10 border border-[#D95B16]/20 px-2 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                </div>
                
                <div className="p-5 text-center">
                  <h4 className="text-base font-bold text-slate-900 font-sans group-hover:text-[#D95B16] transition-colors">{member.name}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">{member.role}</p>
                  <p className="text-[10px] text-slate-400 mt-1.5 font-mono uppercase">{member.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
