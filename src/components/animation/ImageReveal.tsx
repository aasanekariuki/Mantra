import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface ImageRevealProps {
  className?: string;
  tone?: "ember" | "indigo" | "neutral";
  label?: string;
}

export function ImageReveal({ className, tone = "neutral", label }: ImageRevealProps) {
  const reduced = usePrefersReducedMotion();

  const gradient =
    tone === "ember"
      ? "from-ember/25 via-graphite to-ink"
      : tone === "indigo"
      ? "from-indigo/25 via-graphite to-ink"
      : "from-graphite to-ink-soft";

  return (
    <div className={cn("relative overflow-hidden bg-graphite", className)}>
      <motion.div
        initial={reduced ? { scaleY: 1 } : { scaleY: 1 }}
        whileInView={reduced ? {} : { scaleY: [1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
        className="absolute inset-0 z-10 bg-ink"
      />
      <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)} />
      {label && (
        <span className="absolute bottom-4 left-4 z-20 text-xs text-paper/60">{label}</span>
      )}
    </div>
  );
}
