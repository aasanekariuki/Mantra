import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Sparkles, Shield, Compass } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function FloatingObject({
  className = "",
  delay = 0,
  duration = 7,
  children,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
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
              y: [0, -8, 0],
              rotate: [0, 6, 0],
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

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop Overlay */}
          <motion.div
            className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="group relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            {/* Ambient Corner Glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-ember/20 blur-3xl transition-all duration-500 group-hover:bg-ember/30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-neon-cyan/15 blur-3xl transition-all duration-500 group-hover:bg-neon-cyan/25"
            />

            {/* Cyber Grid Accent Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 107, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Floating Decorative Elements */}
            <FloatingObject className="-top-3 -left-3 hidden sm:block" delay={0.2} duration={6}>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-line/60 bg-ink/80 text-ember shadow-lg backdrop-blur-md">
                <Sparkles size={14} />
              </div>
            </FloatingObject>

            <FloatingObject className="-bottom-3 -right-3 hidden sm:block" delay={0.5} duration={7}>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-line/60 bg-ink/80 text-neon-cyan shadow-lg backdrop-blur-md">
                <Compass size={14} />
              </div>
            </FloatingObject>

            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-line/50 pb-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line/80 bg-ink/60 text-ember">
                  <Shield size={16} />
                </span>
                <h3 id="modal-title" className="font-display text-xl sm:text-2xl text-paper">
                  {title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-ink/60 text-mist transition-all duration-200 hover:border-ember/40 hover:bg-ink hover:text-ember focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ember"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="relative z-10 mt-6 text-sm sm:text-base leading-relaxed text-mist">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}