import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Clock, Sparkles, BookOpen, Share2, Bookmark } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ImageReveal } from "../components/animation/ImageReveal";
import { ScrollReveal } from "../components/animation/ScrollReveal";
import { Tag } from "../components/ui/Tag";
import { stories } from "../data/stories";
import NotFound from "./NotFound";

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
              y: [0, -12, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.04, 1],
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

export default function StoryDetail() {
  const { slug } = useParams();
  const story = stories.find((s) => s.slug === slug);

  if (!story) return <NotFound />;

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-ember/30 selection:text-ember">
      {/* Ambient Flame & Cyber Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-ember/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-[30%] h-[38rem] w-[38rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      {/* Cyber Grid Pattern Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 107, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 90%)",
        }}
      />

      {/* Back Navigation Bar */}
      <div className="relative z-10 container-mantra pt-8">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 rounded-full border border-line/60 bg-ink-soft/40 px-4 py-2 text-xs font-mono text-mist backdrop-blur-md transition-all duration-200 hover:border-ember/40 hover:bg-ink-soft/80 hover:text-ember"
        >
          <ArrowLeft size={14} />
          <span>Back to Stories</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="relative pt-4 sm:pt-6">
        <FloatingObject className="right-[8%] top-[12%] hidden lg:block" delay={0.3} duration={8}>
          <div className="flex items-center gap-2.5 rounded-full border border-ember/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(255,107,0,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-ember">
              Editorial Article
            </span>
          </div>
        </FloatingObject>

        <PageHeader eyebrow={story.category} title={story.title} description={story.dek} />

        {/* Metadata Strip */}
        <section className="relative z-10 border-y border-line/60 bg-ink-soft/30 py-4 backdrop-blur-md">
          <div className="container-mantra flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Tag tone="ember">{story.category}</Tag>
              <div className="flex items-center gap-1.5 text-xs font-mono text-mist">
                <Clock size={13} className="text-ember" />
                <span>{story.readingTime} min read</span>
              </div>
              {story.sample && (
                <span className="hidden text-xs font-mono text-mist/70 sm:inline">
                  &middot; Sample editorial content
                </span>
              )}
            </div>

            {/* Quick Action Icons */}
            <div className="flex items-center gap-2 text-mist">
              <button
                type="button"
                aria-label="Save Article"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-ink/60 transition-colors hover:border-ember/40 hover:text-ember"
              >
                <Bookmark size={14} />
              </button>
              <button
                type="button"
                aria-label="Share Article"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-ink/60 transition-colors hover:border-ember/40 hover:text-ember"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Featured Cover Hero Image */}
      <section className="relative overflow-hidden py-10 md:py-14">
        <FloatingObject className="left-[4%] top-12 hidden lg:block" delay={0.4} duration={7}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-ember backdrop-blur-md">
            <Sparkles size={18} />
          </div>
        </FloatingObject>

        <FloatingObject className="right-[5%] bottom-8 hidden lg:block" delay={0.6} duration={6}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md">
            <BookOpen size={18} />
          </div>
        </FloatingObject>

        <div className="container-mantra relative z-10">
          <div className="overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/40 p-2 backdrop-blur-xl shadow-2xl">
            <ImageReveal className="aspect-[16/9] w-full rounded-xl overflow-hidden" tone="indigo" label={story.title} />
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <section className="relative overflow-hidden border-t border-line/60 py-12 md:py-20">
        <div className="container-mantra relative z-10 max-w-3xl">
          <div className="space-y-8 rounded-2xl border border-line/60 bg-ink-soft/30 p-6 md:p-12 backdrop-blur-xl shadow-xl text-lg leading-relaxed text-paper/90">
            {story.body.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <p className="first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:text-ember first-letter:mr-1">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Navigation CTA */}
      <section className="relative z-10 border-t border-line/60 bg-ink-soft/40 py-10 backdrop-blur-md">
        <div className="container-mantra flex items-center justify-between">
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 text-sm font-mono text-mist transition-colors hover:text-ember"
          >
            <ArrowLeft size={16} />
            <span>Back to Stories</span>
          </Link>
          <span className="text-xs font-mono text-mist/60">MANTRA Editorial &copy; 2026</span>
        </div>
      </section>
    </main>
  );
}