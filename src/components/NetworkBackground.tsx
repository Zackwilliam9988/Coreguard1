import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 65;
    const connectionDistance = 120;
    const mouseConnectionDistance = 180;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      // Cap height to prevent endless drawing on very long pages
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      // Update and draw particles
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle with alternating tech colors
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const color = idx % 3 === 0 
          ? `rgba(0, 212, 255, ${p.alpha * 0.95})` // Cyan (#00D4FF)
          : idx % 3 === 1 
            ? `rgba(0, 102, 255, ${p.alpha * 0.95})` // Blue (#0066FF)
            : `rgba(123, 97, 255, ${p.alpha * 0.95})`; // Purple (#7B61FF)
        ctx.fillStyle = color;
        ctx.fill();
        
        // Dynamic glow on particles
        if (p.radius > 2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = idx % 3 === 0 ? "#00D4FF" : "#7B61FF";
        } else {
          ctx.shadowBlur = 0;
        }
      });
      ctx.shadowBlur = 0; // Reset shadow

      // Draw lines between particles (Plexus/Mesh Network)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Alternate line colors between cyan, blue, purple
            const strokeColor = i % 2 === 0 
              ? `rgba(0, 212, 255, ${opacity})` 
              : `rgba(123, 97, 255, ${opacity})`;
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections to mouse
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = p1.x - mouseRef.current.x;
          const dy = p1.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseConnectionDistance) {
            const opacity = (1 - dist / mouseConnectionDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 1.5})`; // Tech Cyan hover link
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Draw a subtle secondary ring around mouse
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 179, ${opacity})`; // Accent mint/teal
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Listen to parent container resize using ResizeObserver instead of window onresize for safety
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener("mousemove", handleMouseMove as any);
    parent.addEventListener("mouseleave", handleMouseLeave as any);

    // Initial draw trigger
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      parent.removeEventListener("mousemove", handleMouseMove as any);
      parent.removeEventListener("mouseleave", handleMouseLeave as any);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-normal"
      aria-hidden="true"
    />
  );
};
