import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Sparkles, Calendar, ShieldCheck, ExternalLink } from "lucide-react";
import type { ResearchItem } from "../../types/content";
import { ScrollReveal } from "../animation/ScrollReveal";
import { Tag } from "../ui/Tag";

interface ExtendedResearchItem extends ResearchItem {
  downloadUrl?: string;
  url?: string;
}

export function ResearchCard({
  item,
  index = 0,
  onDownload,
}: {
  item: ExtendedResearchItem;
  index?: number;
  onDownload?: (item: ExtendedResearchItem) => void;
}) {
  const targetUrl = item.downloadUrl || item.url || "#";
  const isExternal = targetUrl.startsWith("http");

  const handleActionClick = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (onDownload) {
      e.preventDefault();
      onDownload(item);
    }
  };

  return (
    <ScrollReveal delay={index * 0.05} className="h-full">
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-line hover:bg-ink-soft/80 shadow-lg hover:shadow-2xl md:p-7">
        {/* Subtle Ambient Hover Glow */}
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-neon-cyan/10 blur-2xl transition-all duration-500 group-hover:bg-ember/20 group-hover:blur-3xl"
        />

        {/* Floating Mini Decorative Icon */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-16 z-10 hidden sm:block"
          animate={{
            y: [0, -6, 0],
            rotate: [0, 8, 0],
          }}
          transition={{
            duration: 4 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-line/60 bg-ink/60 text-ember/70 backdrop-blur-md transition-colors duration-300 group-hover:border-ember/40 group-hover:text-ember">
            <Sparkles size={12} />
          </div>
        </motion.div>

        <div className="relative z-10">
          {/* Header Metadata Row */}
          <div className="flex items-center justify-between gap-3">
            <Tag tone="ember">{item.type}</Tag>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-ink/60 text-mist/80 transition-colors duration-300 group-hover:border-ember/40 group-hover:text-ember">
              <FileText size={15} />
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-5 font-display text-xl leading-snug text-paper transition-colors duration-200 group-hover:text-ember">
            {item.title}
          </h3>

          {/* Summary */}
          <p className="mt-3 text-sm leading-relaxed text-mist group-hover:text-paper-dim">
            {item.summary}
          </p>
        </div>

        {/* Card Footer / Status Badge */}
        <div className="relative z-10 mt-6 border-t border-line/50 pt-4">
          <div className="flex items-center justify-between text-xs font-mono text-mist/80">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-neon-cyan/80" />
              <span>{item.date}</span>
            </div>

            {item.sample ? (
              <span className="flex items-center gap-1 text-neon-amber/90">
                <ShieldCheck size={13} />
                Sample Content
              </span>
            ) : (
              <a
                href={targetUrl}
                download={!isExternal}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={handleActionClick}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-ember font-medium transition-all duration-200 hover:bg-ember/10 hover:text-ember focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ember"
                aria-label={`Download ${item.title}`}
              >
                {isExternal ? <ExternalLink size={13} /> : <Download size={13} />}
                <span>{isExternal ? "View Paper" : "Download PDF"}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}