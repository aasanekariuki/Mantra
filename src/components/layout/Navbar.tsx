import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Compass, Sparkles, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrolled } from "../../hooks/useScrollProgress";
import { cn } from "../../lib/utils";
import { MobileMenu } from "./MobileMenu";

const links = [
  { label: "About", to: "/about" },
  { label: "What We Do", to: "/programs" },
  { label: "Community", to: "/community" },
  { label: "Research", to: "/research" },
  { label: "Stories", to: "/stories" },
];

function FloatingObject({
  className = "",
  delay = 0,
  duration = 6,
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
              y: [0, -6, 0],
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

export function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-line/80 bg-ink/80 backdrop-blur-xl shadow-lg shadow-black/40"
            : "border-transparent bg-transparent"
        )}
      >
        {/* Ambient Top Glow Layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-20 w-3/4 max-w-4xl bg-ember/15 blur-2xl transition-opacity duration-500"
        />

        <div
          className={cn(
            "container-mantra relative z-10 flex items-center justify-between transition-all duration-300",
            scrolled ? "py-3.5" : "py-6"
          )}
        >
          {/* Brand Logo with Glow Badge Accent */}
          <Link
            to="/"
            className="group relative flex items-center gap-2 font-display text-xl tracking-tight text-paper transition-transform duration-200 active:scale-95"
            onClick={() => setOpen(false)}
          >
            <span className="relative">
              MANTRA
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-ember transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 rounded-full border border-line/60 bg-ink-soft/40 px-3 py-1.5 backdrop-blur-md md:flex shadow-inner">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-xs font-mono tracking-wide uppercase transition-all duration-200",
                    isActive
                      ? "text-paper font-semibold"
                      : "text-mist hover:text-paper hover:bg-ink-soft/60"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full border border-ember/40 bg-ember/10 shadow-[0_0_12px_rgba(255,107,0,0.2)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Area & Floating Visual Accents */}
          <div className="hidden items-center gap-4 md:flex relative">
            <FloatingObject className="-left-6 -top-2" delay={0.2} duration={5}>
              <Sparkles size={12} className="text-ember/50" />
            </FloatingObject>

            <FloatingObject className="-right-4 -bottom-2" delay={0.6} duration={7}>
              <Compass size={12} className="text-neon-cyan/40" />
            </FloatingObject>

            <Link
              to="/get-involved"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ember/60 bg-ember/10 px-5 py-2 text-xs font-mono uppercase tracking-wider text-ember backdrop-blur-md transition-all duration-300 hover:border-ember hover:bg-ember hover:text-ink shadow-[0_0_15px_rgba(255,107,0,0.15)] hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] active:scale-95"
            >
              <span>Get Involved</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile Menu Button Trigger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line/60 bg-ink-soft/60 text-paper transition-all duration-200 hover:border-ember/40 hover:bg-ink-soft active:scale-90 md:hidden"
          >
            <motion.div
              initial={false}
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X size={20} className="text-ember" /> : <Menu size={20} />}
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}