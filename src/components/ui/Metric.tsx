import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface MetricProps {
  value: number | null;
  suffix?: string;
  label: string;
  placeholder?: string;
}

export function Metric({ value, suffix = "", label, placeholder = "Building" }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === null) return;
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="border-t border-line pt-6">
      <p className="font-display text-4xl text-paper md:text-5xl">
        {value === null ? (
          <span className="text-mist">{placeholder}</span>
        ) : (
          <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            {display.toLocaleString()}
            {suffix}
          </motion.span>
        )}
      </p>
      <p className="mt-2 text-sm text-mist">{label}</p>
    </div>
  );
}
