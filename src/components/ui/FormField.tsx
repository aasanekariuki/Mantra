import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Sparkles } from "lucide-react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

function FloatingObject({
  className = "",
  delay = 0,
  duration = 6,
  children,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -4, 0],
              rotate: [0, 8, 0],
              scale: [1, 1.05, 1],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative space-y-2">
      {/* Subtle Floating Sparkle Accent on Label */}
      <FloatingObject className="-top-1 -right-1" delay={0.2} duration={5}>
        <Sparkles size={12} className="text-ember/40" />
      </FloatingObject>

      {/* Label with Glow Accent on Focus */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="block text-xs font-mono uppercase tracking-wider text-mist transition-colors duration-200 group-focus-within:text-paper"
        >
          {label}
        </label>
      </div>

      {/* Input Field Slot Wrapper */}
      <div className="relative group">
        <div className="relative z-10">{children}</div>

        {/* Dynamic Focus Glow Highlight Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-0.5 rounded-xl bg-gradient-to-r from-ember/0 via-ember/20 to-neon-cyan/0 opacity-0 blur-sm transition-opacity duration-300 group-focus-within:opacity-100"
        />
      </div>

      {/* Animated Error Message Container */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            role="alert"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, height: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-1.5 pt-1 text-xs font-mono text-ember">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}