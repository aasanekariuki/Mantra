import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
import type { Story } from "../../types/content";
import { ScrollReveal } from "../animation/ScrollReveal";
import { Tag } from "../ui/Tag";

export function StoryCard({
  story,
  index = 0,
  featured = false,
}: {
  story: Story;
  index?: number;
  featured?: boolean;
}) {
  return (
    <ScrollReveal delay={index * 0.05} className="h-full">
      <Link
        to={`/stories/${story.slug}`}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-line hover:bg-ink-soft/80 shadow-lg hover:shadow-2xl ${
          featured ? "p-6 md:p-9" : "p-6"
        }`}
      >
        {/* Ambient Hover Glow */}
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-ember/10 blur-2xl transition-all duration-500 group-hover:bg-ember/25 group-hover:blur-3xl"
        />

        {/* Floating Mini Accent Orb */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 z-10 hidden sm:block"
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

        <div>
          {/* Cover Graphic Container */}
          <div
            className={`relative w-full overflow-hidden rounded-xl border border-line/50 bg-gradient-to-br from-graphite to-ink-soft ${
              featured ? "aspect-[16/9]" : "aspect-[16/10]"
            }`}
          >
            {/* Visual Accent Lines inside Cover Placeholder */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(255, 107, 0, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.3) 0%, transparent 50%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-mist/20 transition-colors duration-300 group-hover:text-ember/40">
              <BookOpen size={featured ? 48 : 32} />
            </div>
          </div>

          {/* Metadata Row */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <Tag tone="ember">{story.category}</Tag>
            <div className="flex items-center gap-1.5 text-xs font-mono text-mist/80">
              <Clock size={12} className="text-ember" />
              <span>{story.readingTime} min read</span>
            </div>
          </div>

          {/* Title & Dek */}
          <h3
            className={`mt-4 font-display leading-snug text-paper transition-colors duration-200 group-hover:text-ember ${
              featured ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl"
            }`}
          >
            {story.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist group-hover:text-paper-dim">
            {story.dek}
          </p>
        </div>

        {/* Read Article Action Bar */}
        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-line/50 pt-4 text-xs font-mono text-ember">
          <span>Read Story</span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </Link>
    </ScrollReveal>
  );
}