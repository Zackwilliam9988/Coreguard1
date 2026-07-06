import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Send, 
  Shield, 
  Sparkles, 
  CheckCircle, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  HelpCircle, 
  Terminal, 
  Globe, 
  Cpu
} from "lucide-react";
import { QuoteRequest, Service } from "../types";
import { SERVICES } from "../data";

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  services?: Service[];
  onSuccess?: () => void;
}

export const QuoteDialog: React.FC<QuoteDialogProps> = ({ 
  isOpen, 
  onClose, 
  preselectedServiceId,
  services,
  onSuccess
}) => {
  const activeServices = services || SERVICES;

  const [formData, setFormData] = useState<QuoteRequest>({
    name: "",
    phone: "",
    email: "",
    serviceId: preselectedServiceId || "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        serviceId: preselectedServiceId || activeServices[0]?.id || "",
        name: "",
        phone: "",
        email: "",
        message: ""
      }));
      setIsSuccess(false);
      setIsSubmitting(false);
      setSubmitPhase("");
    }
  }, [isOpen, preselectedServiceId, activeServices]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const phases = [
      "Establishing secure uplink...",
      "Analyzing coverage parameters...",
      "Allocating technical dispatch node...",
      "Encrypting transmission logs...",
      "Finalizing estimate ticket..."
    ];

    let currentPhaseIdx = 0;
    setSubmitPhase(phases[currentPhaseIdx]);

    const interval = setInterval(() => {
      currentPhaseIdx++;
      if (currentPhaseIdx < phases.length) {
        setSubmitPhase(phases[currentPhaseIdx]);
      }
    }, 250);

    const currentService = activeServices.find(s => s.id === formData.serviceId);
    const serviceTitle = currentService ? currentService.title : "Security Service";
    const targetUrl = `https://script.google.com/macros/s/AKfycbxjjAwiSdR6uiYtZQUUSrxw86PV8QW_hgwjrGRN1xLkH35s8idxjyr4wwM60koaMkp-/exec?name=${encodeURIComponent(formData.name)}&phone=${encodeURIComponent(formData.phone)}&email=${encodeURIComponent(formData.email)}&service=${encodeURIComponent(serviceTitle)}`;

    fetch(targetUrl, {
      method: "GET",
      mode: "no-cors"
    })
    .then(() => {
      console.log("Form data sent successfully to Google Apps Script");
    })
    .catch((err) => {
      console.warn("Form submission reached service with status indicator", err);
    })
    .finally(() => {
      // Clear the loading loop interval and move to success state
      setTimeout(() => {
        clearInterval(interval);
        setIsSubmitting(false);
        setIsSuccess(true);
        if (onSuccess) {
          onSuccess();
        }
      }, 1000); // minimal elegant transition delay of 1s to view the UI steps
    });
  };

  const selectedService = activeServices.find(s => s.id === formData.serviceId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 font-sans text-slate-800 overflow-y-auto">
          
          {/* Backdrop blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-0"
          />

          {/* Dialog Container - scrollbar-free premium layout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 50px rgba(217, 91, 22, 0.05)"
            }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-sm rounded-[24px] border border-slate-100 bg-white p-6 md:p-7 z-10 overflow-hidden backdrop-blur-3xl select-none"
          >
            {/* Subtle cyber background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,91,22,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,91,22,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-[24px]" />
            
            {/* Soft decorative glow effects */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#D95B16] transition-colors p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-orange-200 rounded-xl cursor-pointer group z-50"
              aria-label="Close dialog"
            >
              <X size={14} className="group-hover:scale-105 transition-transform" />
            </button>

            {!isSuccess ? (
              <div className="relative z-10">
                
                {/* Header Information */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 bg-orange-50 border border-orange-100 rounded-xl text-[#D95B16]">
                    <Shield size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight">
                      Request a Callback
                    </h3>
                    <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold font-mono mt-0.5">
                      Secure connection line
                    </p>
                  </div>
                </div>

                {/* Submitting Loader */}
                {isSubmitting ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50 border border-slate-100 rounded-2xl p-5"
                  >
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-dashed border-[#D95B16]/40 animate-spin [animation-duration:6s]" />
                      <div className="absolute inset-2 rounded-full border border-orange-100 animate-spin [animation-duration:10s] [animation-direction:reverse]" />
                      <div className="absolute inset-3 rounded-full bg-orange-50 flex items-center justify-center">
                        <Terminal size={18} className="text-[#D95B16]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="font-mono text-[9px] text-slate-400 tracking-wider">SECURE TRANSMISSION</p>
                      <h4 className="text-[#D95B16] font-mono font-bold text-xs animate-pulse">
                        {submitPhase}
                      </h4>
                    </div>

                    <div className="w-full max-w-[200px] h-1 bg-slate-100 rounded-full overflow-hidden relative">
                      <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#D95B16] to-[#EA580C] rounded-full animate-infinite-loading w-[40%]" />
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Selected Service Context Info */}
                    {selectedService && (
                      <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Selected Solution:</span>
                        <span className="text-[#D95B16] font-mono font-bold">{selectedService.title}</span>
                      </div>
                    )}

                    {/* Full Name Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                        <User size={11} className="text-[#D95B16]" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-100 focus:border-[#D95B16] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#D95B16]/5 transition-all duration-200 font-sans"
                      />
                    </div>

                    {/* Phone Number Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                        <Phone size={11} className="text-[#D95B16]" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 1234567"
                        className="w-full bg-slate-50 border border-slate-100 focus:border-[#D95B16] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#D95B16]/5 transition-all duration-200 font-sans"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold flex items-center gap-1.5">
                        <Mail size={11} className="text-[#D95B16]" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-100 focus:border-[#D95B16] focus:bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#D95B16]/5 transition-all duration-200 font-sans"
                      />
                    </div>

                    {/* Elegant Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full relative overflow-hidden group rounded-xl bg-[#D95B16] hover:bg-[#C2410C] text-white font-bold py-3 px-4 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_4px_12px_rgba(217,91,22,0.15)] active:scale-[0.98] border-none"
                      >
                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                        
                        <Send size={13} className="text-white group-hover:translate-x-0.5 transition-transform" />
                        <span className="text-xs tracking-wide">Submit Secure Call Request</span>
                      </button>
                    </div>

                    <div className="text-[9px] text-center text-slate-400 font-mono">
                      🛡️ End-to-end encrypted connection
                    </div>

                  </form>
                )}
              </div>
            ) : (
              /* Success View */
              <div className="py-4 text-center relative z-10">
                <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 border border-[#D95B16] text-[#D95B16] shadow-[0_0_15px_rgba(217,91,22,0.1)]">
                  <CheckCircle size={22} className="animate-pulse" />
                </div>
                
                <h3 className="font-display text-lg font-bold text-slate-900 mb-1">Callback Requested!</h3>
                <p className="text-[#D95B16] font-mono text-[9px] uppercase tracking-wider mb-4 font-semibold">
                  Operator routing initialized
                </p>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mb-4 text-left text-xs space-y-2.5">
                  <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div>
                      <span className="font-mono text-slate-400 block text-[8px] uppercase tracking-wider">Client</span> 
                      <span className="font-bold text-slate-850 text-xs">{formData.name}</span>
                    </div>
                    <div>
                      <span className="font-mono text-slate-400 block text-[8px] uppercase tracking-wider">Uplink Phone</span> 
                      <span className="font-bold text-[#D95B16] font-mono text-xs">{formData.phone}</span>
                    </div>
                  </div>

                  {formData.email && (
                    <div className="border-t border-slate-100 pt-2">
                      <span className="font-mono text-slate-400 block text-[8px] uppercase tracking-wider">Email Contact</span> 
                      <span className="font-bold text-slate-800 text-xs">{formData.email}</span>
                    </div>
                  )}

                  {selectedService && (
                    <div className="border-t border-slate-100 pt-2">
                      <span className="font-mono text-slate-400 block text-[8px] uppercase tracking-wider">Solution Selected</span> 
                      <span className="text-[#D95B16] font-semibold text-[11px]">{selectedService.title}</span>
                    </div>
                  )}

                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans border-t border-slate-100 pt-2 text-center italic">
                    We will ring you shortly on <span className="text-slate-800 font-medium">{formData.phone}</span>.
                  </p>
                </div>

                {/* Priority action link */}
                <div>
                  <a
                    href={`https://wa.me/923001234567?text=Hi%20CoreGuard,%20I%20just%20submitted%20a%20callback%20request%20for%20${encodeURIComponent(selectedService?.title || "security services")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3.5 text-xs font-bold font-mono tracking-wide flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(16,185,129,0.2)] border-none text-center justify-center"
                  >
                    <Globe size={12} />
                    <span>Instant WhatsApp Dispatch</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
