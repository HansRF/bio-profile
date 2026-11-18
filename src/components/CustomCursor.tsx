import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface CustomCursorProps {
  enabled: boolean;
}

export function CustomCursor({ enabled }: CustomCursorProps) {
  const [isDesktopFinePointer, setIsDesktopFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 420, damping: 32, mass: 0.4 });
  const ringY = useSpring(cursorY, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncCapability = () => {
      setIsDesktopFinePointer(pointerQuery.matches && !motionQuery.matches);
    };

    syncCapability();
    pointerQuery.addEventListener('change', syncCapability);
    motionQuery.addEventListener('change', syncCapability);

    return () => {
      pointerQuery.removeEventListener('change', syncCapability);
      motionQuery.removeEventListener('change', syncCapability);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled || !isDesktopFinePointer) {
      root.classList.remove('custom-cursor-active');
      return;
    }

    root.classList.add('custom-cursor-active');

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('a, button, [role="button"], input, textarea');
      setIsInteractive(Boolean(interactiveEl));
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      root.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, isDesktopFinePointer, cursorX, cursorY]);

  if (!enabled || !isDesktopFinePointer || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {/* Outer spring ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-violet-500/[0.1] backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isInteractive ? 42 : 28,
          height: isInteractive ? 42 : 28,
          scale: isPressed ? 0.85 : 1,
          borderColor: isInteractive
            ? 'rgba(250, 204, 21, 0.9)'
            : 'rgba(167, 139, 250, 0.6)',
        }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner precision dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FDE047]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isInteractive ? 0 : isPressed ? 1.4 : 1,
          opacity: isInteractive ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  );
}
