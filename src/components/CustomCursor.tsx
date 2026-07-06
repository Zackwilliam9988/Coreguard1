import React, { useState, useEffect, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const trailRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      try {
        // Check if mouse is hovering over an interactive/clickable element
        const target = e.target as HTMLElement;
        const hoverSelector = "button, a, select, input, [role='button'], .cursor-pointer, .clickable";
        const isInteractive = target && typeof target.closest === "function" && (target.closest(hoverSelector) !== null);
        setIsHovered(!!isInteractive);
      } catch (err) {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Motorized smooth LERP trail movement for the outer glowing ring and direct positioning of the dot
    let animId: number;
    const updateTrail = () => {
      if (ringRef.current && dotRef.current) {
        // Move outer ring 15% towards inner pointer on each frame for organic drag lag
        const dx = mouseRef.current.x - trailRef.current.x;
        const dy = mouseRef.current.y - trailRef.current.y;
        
        trailRef.current.x += dx * 0.15;
        trailRef.current.y += dy * 0.15;
        
        ringRef.current.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(updateTrail);
    };

    animId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[1000]">
      {/* Outer Glow Ring with trail lag */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-150 ease-out ${
          isHovered 
            ? "h-10 w-10 border-[#D95B16] bg-[#D95B16]/10 shadow-[0_0_20px_rgba(217,91,22,0.4)]" 
            : "h-6 w-6 border-[#D95B16]/50 bg-transparent shadow-[0_0_10px_rgba(217,91,22,0.15)]"
        }`}
        style={{
          willChange: "transform"
        }}
      />
      
      {/* Inner Pin-Point Laser Dot */}
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-[#D95B16] shadow-[0_0_8px_#D95B16] transition-transform duration-100 ${
          isHovered ? "scale-150 bg-[#D95B16] shadow-[0_0_10px_#D95B16]" : "scale-100"
        }`}
        style={{
          willChange: "transform"
        }}
      />
    </div>
  );
};
