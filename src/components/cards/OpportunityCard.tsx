import type { Opportunity } from "../../types/content";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  Building2,
  Calendar,
  Hexagon,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import { ScrollReveal } from "../animation/ScrollReveal";
import { Tag } from "../ui/Tag";

const ease = [0.16, 1, 0.3, 1] as const;

export function OpportunityCard({
  opportunity,
  index = 0,
}: {
  opportunity: Opportunity;
  index?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollReveal delay={index * 0.05} className="h-full">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: 0.65,
          delay: index * 0.04,
          ease,
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -7,
                transition: {
                  duration: 0.28,
                  ease,
                },
              }
        }
        className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-line/80 bg-ink-soft/45 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-colors duration-500 hover:border-line hover:bg-ink-soft/75 sm:p-6"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-neon-cyan/10 blur-[60px] transition-all duration-700 group-hover:bg-neon-mint/15 group-hover:blur-[70px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-40 w-40 rounded-full bg-neon-mint/5 blur-[55px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />

        {/* Subtle card grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 135, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to bottom right, black, transparent 70%)",
          }}
        />

        {/* Top scan line */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-neon-mint/50 opacity-60"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["0%", "190%", "0%"],
                  opacity: [0.25, 0.8, 0.25],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />

        {/* Decorative corner geometry */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-4 h-14 w-14 opacity-50"
        >
          <div className="absolute right-0 top-0 h-7 w-7 border-r border-t border-neon-mint/25 transition-all duration-500 group-hover:h-9 group-hover:w-9 group-hover:border-neon-mint/45" />
          <div className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-neon-cyan/20" />
        </div>

        {/* Floating decorative object */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-[4.5rem] z-10 hidden sm:block"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -7, 0],
                  rotate: [0, 8, 0],
                }
          }
          transition={{
            duration: 4 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.12,
          }}
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-line/60 bg-ink/70 text-neon-cyan/70 shadow-[0_0_20px_rgba(0,240,255,0.06)] backdrop-blur-md transition-all duration-500 group-hover:border-neon-mint/40 group-hover:text-neon-mint">
            <Sparkles size={12} />

            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_8px_rgba(0,255,135,0.8)]" />
          </div>
        </motion.div>

        {/* Orbital object */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 bottom-14 hidden h-24 w-24 rounded-full border border-neon-cyan/10 sm:block"
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360,
                }
          }
          transition={{
            duration: 18 + index * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-neon-cyan/70 shadow-[0_0_12px_rgba(0,240,255,0.8)]" />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col">
          {/* Metadata */}
          <div className="flex items-start justify-between gap-3 pr-9">
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.03,
                    }
              }
            >
              <Tag tone="indigo">{opportunity.type}</Tag>
            </motion.div>

            <div className="flex max-w-[48%] items-center gap-1.5 text-right font-mono text-[10px] leading-4 text-mist/80">
              <Calendar
                size={12}
                className="shrink-0 text-neon-cyan/70"
              />
              <span>{opportunity.deadline}</span>
            </div>
          </div>

          {/* Opportunity identity */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-line/60 bg-ink/50 text-neon-mint transition-all duration-300 group-hover:border-neon-mint/30">
                <Building2 size={13} />
              </div>

              <div className="h-px w-7 bg-line/70 transition-all duration-300 group-hover:w-10 group-hover:bg-neon-mint/30" />

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-dim">
                Opportunity
              </span>
            </div>

            <h3 className="max-w-[90%] font-display text-xl leading-tight text-paper transition-colors duration-300 group-hover:text-neon-mint sm:text-[1.35rem]">
              {opportunity.title}
            </h3>

            <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-mist">
              <Building2
                size={12}
                className="text-neon-mint/70"
              />
              <span className="truncate">
                {opportunity.organization}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 max-w-[95%] text-sm leading-6 text-mist transition-colors duration-300 group-hover:text-paper-dim">
            {opportunity.description}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="relative mt-7 border-t border-line/50 pt-4">
            {/* Moving footer accent */}
            <motion.div
              aria-hidden="true"
              className="absolute -top-px left-0 h-px bg-neon-mint/50"
              initial={{ width: "18%" }}
              whileHover={{ width: "42%" }}
              transition={{ duration: 0.45, ease }}
            />

            {opportunity.sample ? (
              <div className="flex items-center justify-between gap-3 font-mono text-[10px]">
                <span className="flex items-center gap-1.5 text-neon-amber/90">
                  <ShieldCheck size={13} />
                  Preview Mode
                </span>

                <span className="text-right text-mist/70">
                  Live at launch
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 font-mono text-[10px]">
                <span className="flex items-center gap-1.5 text-neon-mint">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-neon-mint/50" />
                    <span className="relative h-2 w-2 rounded-full bg-neon-mint" />
                  </span>

                  Applications Open
                </span>

                <motion.div
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line/70 bg-ink/50 text-neon-mint transition-colors duration-300 group-hover:border-neon-mint/40"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 1.1,
                          rotate: 5,
                        }
                  }
                >
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Floating side particles */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-20 left-4 h-1.5 w-1.5 rounded-full bg-neon-mint/70 shadow-[0_0_12px_rgba(0,255,135,0.7)]"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -12, 0],
                  opacity: [0.25, 0.9, 0.25],
                }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute right-9 top-10 h-1 w-1 rounded-full bg-neon-cyan/70"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 6, 0],
                  y: [0, -8, 0],
                  opacity: [0.2, 0.8, 0.2],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7 + index * 0.1,
          }}
        />

        {/* Bottom geometry */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 right-5 flex items-center gap-1 opacity-30 transition-opacity duration-300 group-hover:opacity-70"
        >
          <div className="h-1 w-1 rounded-full bg-neon-mint" />
          <div className="h-px w-6 bg-neon-mint/40" />
          <Hexagon
            size={10}
            className="text-neon-mint"
          />
        </div>

        {/* Hover sweep */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-[18deg] bg-neon-mint/[0.025] blur-xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["0%", "430%"],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
            delay: index * 0.35,
          }}
        />
      </motion.article>
    </ScrollReveal>
  );
}