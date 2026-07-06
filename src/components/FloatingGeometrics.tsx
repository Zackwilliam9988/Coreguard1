import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ShapeConfig {
  id: number;
  className: string;
  factorX: number;
  factorY: number;
  clickScaleMultiplier: number;
  clickRotateMultiplier: number;
  width: string;
  height: string;
  glowColor: string;
  render: () => React.ReactNode;
}

export const FloatingGeometrics: React.FC = () => {
  // Motion values to track mouse position normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery-smooth spring values for natural physics feel
  const springConfig = { damping: 25, stiffness: 80 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Click physics controller (compresses/expands on click, then springs back)
  const clickSpring = useSpring(0, { damping: 12, stiffness: 200 });

  useEffect(() => {
    // Track normalized mouse movement coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    // React physically to clicking anywhere on the screen
    const handleMouseDown = () => {
      clickSpring.set(1);
      setTimeout(() => {
        clickSpring.set(0);
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [mouseX, mouseY, clickSpring]);

  // List of high-fidelity multicolored futuristic cyber shapes
  const SHAPES: ShapeConfig[] = [
    {
      id: 1,
      className: "absolute top-[8%] left-[15%]",
      factorX: -60,
      factorY: -45,
      clickScaleMultiplier: 1.4,
      clickRotateMultiplier: 45,
      width: "w-16",
      height: "h-16",
      glowColor: "rgba(6, 182, 212, 0.4)", // Cyan
      render: () => (
        <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-400/30 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center justify-center">
          <div className="w-4 h-4 bg-cyan-400/50 rounded" />
        </div>
      ),
    },
    {
      id: 2,
      className: "absolute top-[5%] left-[42%]",
      factorX: 75,
      factorY: -60,
      clickScaleMultiplier: 1.25,
      clickRotateMultiplier: -35,
      width: "w-20",
      height: "h-20",
      glowColor: "rgba(139, 92, 246, 0.4)", // Violet
      render: () => (
        <div className="w-20 h-20 bg-violet-600/10 border border-violet-400/30 rotate-[15deg] rounded-3xl shadow-[0_0_20px_rgba(139,92,246,0.15)] flex items-center justify-center">
          <div className="w-6 h-6 border border-violet-400/40 rounded-full animate-ping" />
        </div>
      ),
    },
    {
      id: 3,
      className: "absolute top-[12%] right-[12%]",
      factorX: -80,
      factorY: 90,
      clickScaleMultiplier: 1.35,
      clickRotateMultiplier: 25,
      width: "w-14",
      height: "h-14",
      glowColor: "rgba(244, 63, 94, 0.4)", // Rose
      render: () => (
        <div className="w-14 h-14 bg-rose-500/10 border border-rose-400/30 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center justify-center">
          <div className="w-3 h-3 bg-rose-400/60 rounded-full" />
        </div>
      ),
    },
    {
      id: 4,
      className: "absolute top-[18%] left-[28%]",
      factorX: 40,
      factorY: 35,
      clickScaleMultiplier: 1.2,
      clickRotateMultiplier: -20,
      width: "w-24",
      height: "h-24",
      glowColor: "rgba(16, 185, 129, 0.4)", // Emerald
      render: () => (
        <div className="w-24 h-24 bg-emerald-500/5 border border-emerald-400/25 rotate-[-12deg] rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.1)] flex items-center justify-center">
          <div className="w-12 h-12 border border-dashed border-emerald-400/30 rounded-xl" />
        </div>
      ),
    },
    {
      id: 5,
      className: "absolute top-[25%] left-[8%]",
      factorX: -55,
      factorY: -70,
      clickScaleMultiplier: 1.3,
      clickRotateMultiplier: 50,
      width: "w-16",
      height: "h-16",
      glowColor: "rgba(245, 158, 11, 0.4)", // Amber
      render: () => (
        <svg className="w-16 h-16 text-amber-500/15 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)] fill-current stroke-amber-400/40" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="50,15 90,85 10,85" />
        </svg>
      ),
    },
    {
      id: 6,
      className: "absolute top-[22%] right-[25%]",
      factorX: 70,
      factorY: 75,
      clickScaleMultiplier: 1.3,
      clickRotateMultiplier: -30,
      width: "w-20",
      height: "h-20",
      glowColor: "rgba(59, 130, 246, 0.4)", // Blue
      render: () => (
        <div className="w-20 h-20 bg-blue-600/10 border border-blue-400/30 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center justify-center">
          <div className="w-5 h-5 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full" />
        </div>
      ),
    },
    {
      id: 7,
      className: "absolute top-[32%] right-[8%]",
      factorX: -90,
      factorY: -50,
      clickScaleMultiplier: 1.4,
      clickRotateMultiplier: 60,
      width: "w-16",
      height: "h-16",
      glowColor: "rgba(236, 72, 153, 0.4)", // Pink
      render: () => (
        <svg className="w-16 h-16 text-pink-500/10 drop-shadow-[0_0_15px_rgba(236,72,153,0.2)] fill-current stroke-pink-400/40" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
        </svg>
      ),
    },
    {
      id: 8,
      className: "absolute top-[45%] left-[5%]",
      factorX: 50,
      factorY: -95,
      clickScaleMultiplier: 1.35,
      clickRotateMultiplier: -40,
      width: "w-12",
      height: "h-12",
      glowColor: "rgba(6, 182, 212, 0.4)", // Cyan
      render: () => (
        <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-400/30 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.15)]" />
      ),
    },
    {
      id: 9,
      className: "absolute top-[35%] left-[34%]",
      factorX: -60,
      factorY: 65,
      clickScaleMultiplier: 1.25,
      clickRotateMultiplier: 45,
      width: "w-16",
      height: "h-16",
      glowColor: "rgba(139, 92, 246, 0.4)", // Violet
      render: () => (
        <div className="w-16 h-16 bg-violet-600/10 border border-violet-400/25 rotate-[35deg] rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.12)]" />
      ),
    },
    {
      id: 10,
      className: "absolute top-[58%] left-[45%]",
      factorX: 85,
      factorY: -85,
      clickScaleMultiplier: 1.3,
      clickRotateMultiplier: -45,
      width: "w-24",
      height: "h-20",
      glowColor: "rgba(16, 185, 129, 0.4)", // Emerald
      render: () => (
        <svg className="w-24 h-20 text-emerald-500/15 drop-shadow-[0_0_20px_rgba(16,185,129,0.25)] fill-current rotate-[-15deg] stroke-emerald-400/30" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="0,100 100,50 50,100" />
        </svg>
      ),
    },
    {
      id: 11,
      className: "absolute top-[54%] right-[35%]",
      factorX: -65,
      factorY: 100,
      clickScaleMultiplier: 1.35,
      clickRotateMultiplier: 55,
      width: "w-16",
      height: "h-16",
      glowColor: "rgba(245, 158, 11, 0.4)", // Amber
      render: () => (
        <svg className="w-16 h-16 text-amber-500/15 drop-shadow-[0_0_15px_rgba(245,158,11,0.2)] fill-current rotate-[45deg] stroke-amber-400/40" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
        </svg>
      ),
    },
    {
      id: 12,
      className: "absolute bottom-[23%] left-[10%]",
      factorX: -80,
      factorY: -65,
      clickScaleMultiplier: 1.3,
      clickRotateMultiplier: -35,
      width: "w-16",
      height: "h-16",
      glowColor: "rgba(244, 63, 94, 0.4)", // Rose
      render: () => (
        <div className="w-16 h-16 bg-rose-600/10 border border-rose-400/30 rotate-[22deg] rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.15)] flex items-center justify-center">
          <div className="w-5 h-5 bg-rose-400/30 rounded" />
        </div>
      ),
    },
    {
      id: 13,
      className: "absolute bottom-[10%] left-[15%]",
      factorX: 100,
      factorY: 70,
      clickScaleMultiplier: 1.45,
      clickRotateMultiplier: 40,
      width: "w-14",
      height: "h-14",
      glowColor: "rgba(6, 182, 212, 0.4)", // Cyan
      render: () => (
        <svg className="w-14 h-14 text-cyan-500/15 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)] fill-current rotate-12 stroke-cyan-400/35" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="50,15 100,85 0,85" />
        </svg>
      ),
    },
    {
      id: 14,
      className: "absolute bottom-[8%] left-[38%]",
      factorX: -55,
      factorY: -55,
      clickScaleMultiplier: 1.25,
      clickRotateMultiplier: -20,
      width: "w-20",
      height: "h-20",
      glowColor: "rgba(139, 92, 246, 0.4)", // Violet
      render: () => (
        <div className="w-20 h-20 bg-violet-600/10 border border-violet-400/25 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.12)]" />
      ),
    },
    {
      id: 15,
      className: "absolute bottom-[6%] left-[26%]",
      factorX: 75,
      factorY: -100,
      clickScaleMultiplier: 1.35,
      clickRotateMultiplier: 60,
      width: "w-14",
      height: "h-14",
      glowColor: "rgba(16, 185, 129, 0.4)", // Emerald
      render: () => (
        <svg className="w-14 h-14 text-emerald-500/15 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] fill-current stroke-emerald-400/40" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" />
        </svg>
      ),
    },
    {
      id: 16,
      className: "absolute bottom-[11%] right-[35%]",
      factorX: -100,
      factorY: 60,
      clickScaleMultiplier: 1.4,
      clickRotateMultiplier: -60,
      width: "w-24",
      height: "h-16",
      glowColor: "rgba(59, 130, 246, 0.4)", // Blue
      render: () => (
        <svg className="w-24 h-16 text-blue-500/15 drop-shadow-[0_0_20px_rgba(59,130,246,0.2)] fill-current rotate-[-30deg] stroke-blue-400/35" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="0,50 100,50 50,100" />
        </svg>
      ),
    },
    {
      id: 17,
      className: "absolute bottom-[4%] right-[24%]",
      factorX: 70,
      factorY: 65,
      clickScaleMultiplier: 1.3,
      clickRotateMultiplier: 30,
      width: "w-20",
      height: "h-20",
      glowColor: "rgba(244, 63, 94, 0.4)", // Rose
      render: () => (
        <div className="w-20 h-20 bg-rose-600/10 border border-rose-400/25 rotate-[40deg] rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.12)]" />
      ),
    },
    {
      id: 18,
      className: "absolute bottom-[12%] right-[6%]",
      factorX: -45,
      factorY: -45,
      clickScaleMultiplier: 1.25,
      clickRotateMultiplier: 15,
      width: "w-24",
      height: "h-24",
      glowColor: "rgba(6, 182, 212, 0.4)", // Cyan
      render: () => (
        <div className="w-24 h-24 bg-cyan-600/5 border border-cyan-400/20 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.08)] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-dashed border-cyan-400/30 animate-[spin_10s_linear_infinite]" />
        </div>
      ),
    },
    {
      id: 19,
      className: "absolute top-[61%] right-[16%]",
      factorX: 100,
      factorY: 100,
      clickScaleMultiplier: 1.4,
      clickRotateMultiplier: -40,
      width: "w-28",
      height: "h-20",
      glowColor: "rgba(139, 92, 246, 0.4)", // Violet
      render: () => (
        <svg className="w-28 h-20 text-violet-500/10 drop-shadow-[0_0_25px_rgba(139,92,246,0.2)] fill-current rotate-[10deg] stroke-violet-400/30" strokeWidth="1" viewBox="0 0 100 100">
          <polygon points="0,100 100,100 80,0" />
        </svg>
      ),
    },
    {
      id: 20,
      className: "absolute top-[13%] left-[4%]",
      factorX: -55,
      factorY: 55,
      clickScaleMultiplier: 1.35,
      clickRotateMultiplier: 25,
      width: "w-14",
      height: "h-14",
      glowColor: "rgba(16, 185, 129, 0.4)", // Emerald
      render: () => (
        <div className="w-14 h-14 bg-emerald-600/10 border border-emerald-400/30 rotate-[15deg] rounded shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center justify-center">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        </div>
      ),
    },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {SHAPES.map((shape, index) => {
        // Individual dynamic transforms for parallax depth and direction
        const transX = useTransform(mouseXSpring, (v) => v * shape.factorX);
        const transY = useTransform(mouseYSpring, (v) => v * shape.factorY);

        // Click visual feedbacks
        const dynamicScale = useTransform(clickSpring, [0, 1], [1, shape.clickScaleMultiplier]);
        const dynamicRotate = useTransform(clickSpring, [0, 1], [0, shape.clickRotateMultiplier]);

        return (
          <motion.div
            key={shape.id}
            className={shape.className}
            style={{
              x: transX,
              y: transY,
              scale: dynamicScale,
              rotate: dynamicRotate,
            }}
            // Animate continues floating loop movement to respond even when cursor is stationary
            animate={{
              y: [0, -18, 18, 0],
              x: [0, 12, -12, 0],
              rotate: [0, 12, -12, 0],
            }}
            transition={{
              duration: 7 + (index % 5) * 2,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            {shape.render()}
          </motion.div>
        );
      })}
    </div>
  );
};
