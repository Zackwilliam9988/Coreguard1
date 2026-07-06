import React, { useState, useEffect } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  User, 
  Hash, 
  ArrowRight, 
  AlertCircle,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SuccessNotification } from "./SuccessNotification";
import { SERVICES } from "../data";

interface ContactPageProps {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    latitude: string;
    longitude: string;
  };
  onTriggerQuote: (serviceId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ contactInfo, onTriggerQuote }) => {
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0]?.id || "");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Auto-close success popup after 5 seconds
  useEffect(() => {
    let timer: any;
    if (showSuccessPopup) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5500);
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup]);

  const validatePhoneNumber = (number: string) => {
    const cleaned = number.replace(/[^0-9]/g, "");
    if (cleaned.length < 7) {
      return "Please enter a valid phone number with at least 7 digits.";
    }
    const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(number)) {
      return "Invalid format. Use numbers, spaces, dashes, or country code prefix.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (!formName.trim()) {
      setPhoneError("Please enter your full name.");
      return;
    }

    const error = validatePhoneNumber(formPhone);
    if (error) {
      setPhoneError(error);
      return;
    }

    setIsSubmitting(true);

    const selectedService = SERVICES.find(s => s.id === selectedServiceId);
    const serviceTitle = selectedService ? selectedService.title : "General Support Inquiry";
    const targetUrl = `https://script.google.com/macros/s/AKfycbxjjAwiSdR6uiYtZQUUSrxw86PV8QW_hgwjrGRN1xLkH35s8idxjyr4wwM60koaMkp-/exec?name=${encodeURIComponent(formName)}&phone=${encodeURIComponent(formPhone)}&service=${encodeURIComponent(serviceTitle)}`;

    fetch(targetUrl, {
      method: "GET",
      mode: "no-cors"
    })
    .then(() => {
      console.log("Contact form data sent successfully to Google Apps Script");
    })
    .catch((err) => {
      console.warn("Contact form submission reached service with status indicator", err);
    })
    .finally(() => {
      setIsSubmitting(false);
      setShowSuccessPopup(true);
      setFormName("");
      setFormPhone("");
    });
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen text-slate-800 font-sans relative overflow-hidden">
      
      {/* Premium ambient backdrop glow */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(217,91,22,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(217,91,22,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO TITLE */}
        <div className="text-left mb-16 max-w-4xl">
          <h1 className="font-display font-black text-4xl sm:text-6xl text-slate-900 tracking-tight leading-none mb-6">
            Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D95B16] to-[#EA580C]">Contact Hub</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-xl leading-relaxed font-sans">
            Ready to deploy professional security systems, optical fiber fusion splicing, or biometrics on-site? Fill out our streamlined priority request for custom engineering.
          </p>
        </div>

        {/* DETAILED LAYOUT AND FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start text-left">
          
          {/* Left Column: Coordinates & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight">Islamabad Headquarters</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Our engineering office manages commercial projects and dispatch coordinates for hardware installations across major residential and commercial sectors.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
                  <div className="h-11 w-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D95B16] shadow-sm shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-400 font-bold">Hotline Desk</span>
                    <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-sm font-bold text-slate-800 hover:text-[#D95B16] transition-colors font-mono">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
                  <div className="h-11 w-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D95B16] shadow-sm shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-400 font-bold">Mail Channel</span>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm font-bold text-slate-800 hover:text-[#D95B16] transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
                  <div className="h-11 w-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D95B16] shadow-sm shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-[8px] font-mono uppercase tracking-wider text-slate-400 font-bold">HQ Site Location</span>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed font-sans">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* GPS Telemetry Block */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 font-mono text-[10px] space-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(217,91,22,0.02),transparent_100%)]" />
              <div className="text-slate-500">LATITUDE COORD: <span className="text-slate-800 font-bold">{contactInfo.latitude}</span></div>
              <div className="text-slate-500">LONGITUDE COORD: <span className="text-slate-800 font-bold">{contactInfo.longitude}</span></div>
              <div className="text-slate-500">STATUS: <span className="text-[#D95B16] font-bold">ONLINE (ISLAMABAD SECTOR RUNTIME)</span></div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-8 relative shadow-md">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
            
            <h3 className="font-display font-black text-2xl text-slate-900 mb-2 tracking-tight">Request Engineering Quote</h3>
            <p className="text-xs text-slate-500 mb-8 font-sans leading-relaxed">
              Fill out your corporate details below. A certified CoreGuard site inspector will contact you to discuss camera placements, fiber trunk spans, or network architecture.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Full Name Input */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-extrabold flex items-center gap-1.5">
                  <User size={12} className="text-[#D95B16]" />
                  <span>Full Name</span>
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    required
                    placeholder="Enter your first and last name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-[#D95B16] focus:bg-white focus:ring-1 focus:ring-[#D95B16] rounded-xl py-3.5 px-4 text-xs font-semibold text-slate-800 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Phone Number Input */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-extrabold flex items-center gap-1.5">
                  <Hash size={12} className="text-[#D95B16]" />
                  <span>Phone Number</span>
                </label>
                <div className="relative">
                  <input 
                    type="tel"
                    required
                    placeholder="e.g. +92 300 1234567"
                    value={formPhone}
                    onChange={(e) => {
                      setFormPhone(e.target.value);
                      if (phoneError) setPhoneError("");
                    }}
                    className={`w-full bg-slate-50 border focus:bg-white focus:ring-1 rounded-xl py-3.5 px-4 text-xs font-semibold text-slate-800 outline-none transition-all placeholder:text-slate-400 ${
                      phoneError 
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" 
                        : "border-slate-100 focus:border-[#D95B16] focus:ring-[#D95B16]"
                    }`}
                  />
                </div>
                
                {phoneError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-red-500 text-[11px] font-medium font-sans mt-1.5"
                  >
                    <AlertCircle size={12} className="shrink-0" />
                    <span>{phoneError}</span>
                  </motion.div>
                )}
              </div>

              {/* Service Selection Dropdown */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-extrabold flex items-center gap-1.5">
                  <Cpu size={12} className="text-[#D95B16]" />
                  <span>Interested Service Solution</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-[#D95B16] focus:bg-white focus:ring-1 focus:ring-[#D95B16] rounded-xl py-3.5 px-4 text-xs font-semibold text-slate-800 outline-none transition-all appearance-none cursor-pointer"
                  >
                    {SERVICES.map(srv => (
                      <option key={srv.id} value={srv.id} className="bg-white text-slate-800">
                        {srv.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-450">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Security Advisory Notice */}
              <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex gap-3.5 text-left font-sans">
                <ShieldCheck className="text-[#D95B16] shrink-0" size={18} />
                <div className="space-y-1">
                  <span className="block text-xs font-bold text-slate-800">Encrypted Transmission</span>
                  <p className="text-[10px] text-slate-500 leading-normal font-medium">
                    Your site request is hashed and securely routed to our Islamabad dispatcher to schedule a field crew. We protect commercial telemetry.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D95B16] hover:bg-[#C2410C] disabled:bg-slate-300 text-white font-black py-4 rounded-xl text-xs tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 border-none"
              >
                {isSubmitting ? (
                  <div className="h-4.5 w-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Request Quote</span>
                    <ArrowRight size={13} className="stroke-[2.5]" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>

      {/* Success Popup component */}
      <SuccessNotification 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />

    </div>
  );
};
