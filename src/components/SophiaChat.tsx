import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  X, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  Check, 
  ArrowRight, 
  Loader2, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
  RefreshCw,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../data";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  isServiceSelector?: boolean;
}

export const SophiaChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"name" | "email" | "phone" | "service" | "completed">("name");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with exactly one message from Sophia
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      if (messages.length === 0) {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setMessages([
            {
              id: "msg-welcome",
              sender: "bot",
              text: "Aslamoalikum this is Sophia Your AI help agent Please provide your full name"
            }
          ]);
          setIsTyping(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, messages.length]);

  // Autoscroll helper
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Secure data submission
  const submitData = (nameValue: string, phoneValue: string, emailValue: string, selectedServiceTitle: string, isFinal: boolean = true) => {
    if (isFinal) {
      setIsSubmitting(true);
      setIsTyping(true);
    }

    const encodedName = encodeURIComponent(nameValue || name || "Sophia Chatbot Agent");
    const encodedPhone = encodeURIComponent(phoneValue);
    const encodedEmail = encodeURIComponent(emailValue);
    const encodedService = encodeURIComponent(selectedServiceTitle);
    const targetUrl = `https://script.google.com/macros/s/AKfycbxjjAwiSdR6uiYtZQUUSrxw86PV8QW_hgwjrGRN1xLkH35s8idxjyr4wwM60koaMkp-/exec?name=${encodedName}&phone=${encodedPhone}&email=${encodedEmail}&service=${encodedService}`;

    fetch(targetUrl, {
      method: "GET",
      mode: "no-cors"
    })
    .then(() => {
      console.log("Sophia secure transmission completed:", selectedServiceTitle);
    })
    .catch((err) => {
      console.warn("Sophia telemetry handled", err);
    })
    .finally(() => {
      if (isFinal) {
        setIsSubmitting(false);
        setIsTyping(false);
        setStep("completed");

        const successMsg = selectedServiceTitle === "None / Just Callback"
          ? `Perfect! Your technical support callback has been scheduled. Our team will contact you at ${phoneValue} (and email ${emailValue}) very shortly.`
          : `Thank you! Your interest in "${selectedServiceTitle}" has been logged successfully. An expert engineer will call you back on ${phoneValue} (or reach out via ${emailValue}) shortly.`;

        setMessages(prev => [
          ...prev,
          {
            id: `bot-completed-${Date.now()}`,
            sender: "bot",
            text: successMsg
          }
        ]);
      }
    });
  };

  // Handle name submission
  const processNameInput = (val: string) => {
    setErrorText("");
    const trimmed = val.trim();
    if (!trimmed) return;
    if (trimmed.length < 2) {
      setErrorText("Please enter a valid name.");
      return;
    }

    setName(trimmed);
    setInputVal("");

    // Add user's name message
    setMessages(prev => [
      ...prev,
      { id: `user-name-${Date.now()}`, sender: "user", text: trimmed }
    ]);

    // Bot responds and requests email
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-email-select-${Date.now()}`,
          sender: "bot",
          text: `Thank you, ${trimmed}! Please provide your email address for direct technical document transmission (second step):`
        }
      ]);
      setStep("email");
      setIsTyping(false);
    }, 1000);
  };

  // Handle email submission
  const processEmailInput = (val: string) => {
    setErrorText("");
    const trimmed = val.trim();
    if (!trimmed) return;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setErrorText("Please enter a valid email address.");
      return;
    }

    setEmail(trimmed);
    setInputVal("");

    // Add user's email message
    setMessages(prev => [
      ...prev,
      { id: `user-email-${Date.now()}`, sender: "user", text: trimmed }
    ]);

    // Bot responds and requests phone
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-phone-select-${Date.now()}`,
          sender: "bot",
          text: "Perfect! Now please provide your phone number so a site inspector can coordinate with you:"
        }
      ]);
      setStep("phone");
      setIsTyping(false);
    }, 1000);
  };

  // Handle phone submission
  const processPhoneInput = (val: string) => {
    setErrorText("");
    const trimmed = val.trim();
    if (!trimmed) return;

    // Standard phone validation regex
    const phoneRegex = /^[0-9+\-\s()]{7,18}$/;
    if (!phoneRegex.test(trimmed)) {
      setErrorText("Please enter a valid phone number.");
      return;
    }

    setPhone(trimmed);
    setInputVal("");

    // Add user's phone message
    setMessages(prev => [
      ...prev,
      { id: `user-phone-${Date.now()}`, sender: "user", text: trimmed }
    ]);

    // IMMEDIATE background submission (handles client skipping further selections)
    submitData(name, trimmed, email, "None / Just Callback", false);

    // Bot responds and requests service
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `bot-service-select-${Date.now()}`,
          sender: "bot",
          text: "Excellent! I have registered your phone number. To speed up your response, please select the service you are interested in below, or close this chat if you just need a general callback:",
          isServiceSelector: true
        }
      ]);
      setStep("service");
      setIsTyping(false);
    }, 1000);
  };

  const handleSendForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "name") {
      processNameInput(inputVal);
    } else if (step === "email") {
      processEmailInput(inputVal);
    } else if (step === "phone") {
      processPhoneInput(inputVal);
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setMessages(prev => [
      ...prev,
      { id: `user-srv-${Date.now()}`, sender: "user", text: `I am interested in ${serviceTitle}` }
    ]);
    submitData(name, phone, email, serviceTitle, true);
  };

  // Quick Questions handlers
  const handleQuickQuestion = (questionCode: "cabling" | "splitters") => {
    let questionText = "";
    let answerText = "";

    if (questionCode === "cabling") {
      questionText = "Which network cabling is best for 4K security cameras?";
      answerText = "We recommend Cat6 or Cat6A over Cat5e! Cat6/6A double the transmission frequency bandwidth (up to 250MHz-500MHz). This prevents packet loss and frame jitter, ensuring your 4K ultra-high-definition CCTV streams remain smooth up to 100 meters.";
    } else {
      questionText = "What is the difference between active and passive splitters?";
      answerText = "Active splitters require electric power to route and boost optical signals across extremely long distances. Passive splitters (PLC glass prisms used in GPON fiber networks) require no power, split single fibers into multiple paths (e.g. 1:8 to 1:32), and are highly reliable with zero electrical failure points.";
    }

    // Add user question message
    setMessages(prev => [
      ...prev,
      { id: `uq-${Date.now()}`, sender: "user", text: questionText }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: `uq-ans-${Date.now()}`, sender: "bot", text: answerText }
      ]);
      setIsTyping(false);

      if (step === "name" || step === "email" || step === "phone") {
        setTimeout(() => {
          setIsTyping(true);
          const reminderMsg = step === "name"
            ? "Please enter your full name below so I can address you!"
            : step === "email"
              ? "Please enter your email address below so we can send you documentation!"
              : "Please enter your phone number below so we can schedule a quick callback!";
          setMessages(prev => [
            ...prev,
            { id: `uq-remind-${Date.now()}`, sender: "bot", text: reminderMsg }
          ]);
          setIsTyping(false);
        }, 800);
      }
    }, 1000);
  };

  const handleReset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setStep("name");
    setMessages([]);
    setInputVal("");
    setErrorText("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: "msg-welcome-re",
          sender: "bot",
          text: "Aslamoalikum this is Sophia Your AI help agent Please provide your full name"
        }
      ]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div id="sophia-chatbot-root" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 select-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="absolute bottom-18 right-0 w-[calc(100vw-32px)] sm:w-[390px] h-[72vh] sm:h-[550px] min-h-[400px] max-h-[550px] bg-white border border-slate-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col p-[1px] bg-gradient-to-b from-orange-500/20 via-white to-orange-100/20"
          >
            {/* Main Inner Container */}
            <div className="w-full h-full bg-white rounded-2xl flex flex-col overflow-hidden">
              
              {/* Header banner */}
              <div className="p-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-[#D95B16]/20 animate-ping opacity-75" />
                    <div className="relative w-10 h-10 rounded-full bg-orange-50 border border-orange-100 p-[1px] overflow-hidden flex items-center justify-center text-[#D95B16]">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                        <Bot size={18} className="text-[#D95B16] animate-pulse" />
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-slate-800 tracking-wide">Sophia</span>
                      <span className="text-[8px] font-mono font-extrabold uppercase bg-orange-50 text-[#D95B16] px-1.5 py-0.5 rounded border border-orange-100 flex items-center gap-0.5 tracking-wider">
                        <Sparkles size={8} className="animate-spin" style={{ animationDuration: "3s" }} /> AI ASSISTANT
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">CoreGuard Technical Help</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleReset}
                    title="Reset Conversation"
                    className="p-1.5 text-slate-400 hover:text-slate-750 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-750 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => {
                    const isUser = msg.sender === "user";
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30, delay: idx * 0.04 }}
                        className={`flex gap-2.5 max-w-[88%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                      >
                        {/* Avatar */}
                        <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs border transition-transform duration-300 ${
                          isUser
                            ? "bg-orange-50 border-orange-100 text-[#D95B16] hover:rotate-12"
                            : "bg-slate-100 border-slate-200 text-slate-600 hover:-rotate-12"
                        }`}>
                          {isUser ? <User size={13} /> : <Bot size={13} />}
                        </div>

                        {/* Content block */}
                        <div className="space-y-2 text-left">
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed transition-all duration-200 ${
                            isUser
                              ? "bg-[#D95B16] text-white rounded-tr-none font-medium shadow-[0_4px_12px_rgba(217,91,22,0.15)]"
                              : "bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none shadow-sm"
                          }`}>
                            {msg.text}
                          </div>

                          {/* Interactive Service Buttons (without Skip button) */}
                          {msg.isServiceSelector && step === "service" && (
                            <div className="mt-3.5 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              {SERVICES.map((srv) => (
                                <button
                                  key={srv.id}
                                  disabled={isSubmitting}
                                  onClick={() => handleSelectService(srv.title)}
                                  className="w-full text-left bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-200 text-slate-700 hover:text-[#D95B16] px-3.5 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-200 cursor-pointer group disabled:opacity-50"
                                >
                                  <span className="truncate">{srv.title}</span>
                                  <ArrowRight size={12} className="text-slate-400 group-hover:text-[#D95B16] group-hover:translate-x-0.5 transition-all" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Bot Typing Simulator */}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 max-w-[80%] mr-auto items-center"
                  >
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-600">
                      <Bot size={13} />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D95B16] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#D95B16] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#D95B16] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Assistant Pills Area - Floating cleanly above input, only in name/email/phone step */}
              {(step === "name" || step === "email" || step === "phone") && (
                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex flex-col gap-1.5">
                  <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider font-extrabold text-left flex items-center gap-1">
                    <Sparkles size={10} className="text-[#D95B16]" />
                    <span>Quick Questions</span>
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    <button
                       type="button"
                       onClick={() => handleQuickQuestion("cabling")}
                       className="shrink-0 bg-white hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 text-slate-600 hover:text-[#D95B16] px-3 py-1.5 rounded-full text-[10.5px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <HelpCircle size={11} className="text-[#D95B16]" />
                      <span>Cat6 vs Cat5e</span>
                    </button>
                    <button
                       type="button"
                       onClick={() => handleQuickQuestion("splitters")}
                       className="shrink-0 bg-white hover:bg-orange-50/50 border border-slate-200 hover:border-orange-200 text-slate-600 hover:text-[#D95B16] px-3 py-1.5 rounded-full text-[10.5px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <HelpCircle size={11} className="text-[#D95B16]" />
                      <span>Optical Splitters</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Error Alert Display */}
              {errorText && (
                <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2.5 text-[11px] text-red-600 text-left animate-in shake duration-200">
                  <AlertCircle size={13} className="shrink-0 text-red-500" />
                  <span>{errorText}</span>
                </div>
              )}

              {/* Form Input Container */}
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                {(step === "name" || step === "email" || step === "phone") ? (
                  <form onSubmit={handleSendForm} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type={step === "email" ? "email" : "text"}
                        required
                        placeholder={
                          step === "name"
                            ? "Type your full name + hit Enter..."
                            : step === "email"
                              ? "Type email + hit Enter (second option)..."
                              : "Type phone number + hit Enter..."
                        }
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        className="w-full bg-white border border-slate-200 focus:border-[#D95B16] focus:ring-1 focus:ring-[#D95B16]/30 rounded-xl pl-9 pr-3 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all font-semibold"
                      />
                      {step === "name" ? (
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                      ) : step === "email" ? (
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                      ) : (
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="p-3 bg-[#D95B16] hover:bg-[#C2410C] active:scale-95 text-white rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/10 border-none"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                ) : step === "service" ? (
                  <div className="text-center text-[11px] font-mono text-slate-500 py-2.5 flex items-center justify-center gap-2 bg-slate-100 rounded-xl border border-slate-200">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={12} className="animate-spin text-[#D95B16]" />
                        <span className="text-[#D95B16]">Transmitting secure telemetry...</span>
                      </>
                    ) : (
                      <>
                        <Cpu size={12} className="text-[#D95B16] animate-pulse" />
                        <span>Tap service above (phone is already submitted!)</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <div className="text-center text-[11px] font-mono text-emerald-600 py-1.5 flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <Check size={12} className="text-emerald-500" />
                      <span>Support Transmission Completed</span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="w-full py-2.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-[#D95B16] hover:text-[#C2410C] rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw size={12} />
                      <span>Start a New Session</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full shadow-[0_12px_35px_rgba(217,91,22,0.25)] transition-all duration-300 cursor-pointer group active:scale-95 ${
            isOpen 
              ? "bg-slate-900 border border-slate-800 text-white hover:border-slate-700" 
              : "bg-[#D95B16] border border-transparent text-white hover:bg-[#C2410C] hover:scale-105"
          }`}
          aria-label="Toggle Sophia Support Assistant"
        >
          {isOpen ? (
            <X className="h-5.5 w-5.5" />
          ) : (
            <>
              {unreadCount > 0 && (
                <span className="absolute top-[-3.5px] right-[-3.5px] flex h-5.5 w-5.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow ring-2 ring-white animate-bounce">
                  {unreadCount}
                </span>
              )}
              <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform text-white" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
