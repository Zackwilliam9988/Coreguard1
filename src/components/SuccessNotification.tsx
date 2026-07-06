import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";

interface SuccessNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function SuccessNotification({ 
  isOpen, 
  onClose, 
  duration = 5000 
}: SuccessNotificationProps) {
  const onCloseRef = useRef(onClose);
  
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onCloseRef.current();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-hidden select-none">
          {/* Ambient Blurred Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Glowing Animated Modal Body */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 text-center text-slate-800 z-10 overflow-hidden shadow-2xl"
          >
            {/* Grid Pattern Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,91,22,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,91,22,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Elegant Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-[#D95B16] p-1.5 hover:bg-slate-50 rounded-full cursor-pointer transition-all duration-300 border border-transparent hover:border-orange-100"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>

            {/* Premium Animated Glowing Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Outer Ring with Accent Orange glow */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full border border-dashed border-[#D95B16]/40"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-5 rounded-full border border-dotted border-orange-200/50"
                />

                {/* Inner Glowing Core */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="h-16 w-16 bg-orange-50 border-2 border-[#D95B16] rounded-full flex items-center justify-center text-[#D95B16] shadow-[0_0_20px_rgba(217,91,22,0.15)]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <Check size={32} strokeWidth={3.5} className="drop-shadow-[0_0_4px_rgba(217,91,22,0.3)]" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Header / Title */}
            <h3 className="font-sans font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#D95B16] to-[#EA580C] tracking-wider uppercase mb-1">
              REQUEST RECEIVED
            </h3>
            
            <p className="text-slate-800 font-bold text-base mb-4 font-sans">
              Thank you for contacting us.
            </p>
            
            {/* Body text with precise requirements */}
            <div className="space-y-4 text-slate-500 text-sm leading-relaxed mb-6 font-medium font-sans">
              <p>
                Your request has been successfully received and assigned to our support team.
              </p>
              <p>
                One of our representatives will contact you within the next 24 hours.
              </p>
              <p className="text-[#D95B16] font-bold uppercase tracking-widest text-[11px] pt-1">
                Thank you for choosing us.
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={onClose}
              className="w-full bg-[#D95B16] hover:bg-[#C2410C] text-white font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer border-none"
            >
              Dismiss Window
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
