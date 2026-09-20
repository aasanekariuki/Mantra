import { useRef, useState, type ReactNode } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  CheckCircle2,
  Compass,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PageHeader } from "../components/layout/PageHeader";
import { FormField } from "../components/ui/FormField";
import { Button } from "../components/ui/Button";
import { ScrollReveal } from "../components/animation/ScrollReveal";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  organization: z.string().optional(),
  reason: z.string().min(1, "Please select a reason."),
  message: z.string().min(10, "Tell us a little more — at least 10 characters."),
});

type FormValues = z.infer<typeof schema>;

const inputClasses =
  "w-full rounded-xl border border-line/80 bg-ink/60 px-4 py-3.5 text-paper placeholder:text-mist/50 transition-all duration-200 focus:border-ember focus:bg-ink-soft/80 focus:outline-none focus:ring-1 focus:ring-ember";

const ease = [0.16, 1, 0.3, 1] as const;

function FloatingObject({
  className = "",
  delay = 0,
  duration = 7,
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
              y: [0, -14, 0],
              rotate: [0, 6, 0],
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

function FloatingOrb({
  className = "",
  delay = 0,
  duration = 6,
  accent = "ember",
}: {
  className?: string;
  delay?: number;
  duration?: number;
  accent?: "ember" | "cyan" | "mint";
}) {
  const reduceMotion = useReducedMotion();

  const styles = {
    ember: "bg-ember shadow-[0_0_18px_rgba(255,107,0,0.8)]",
    cyan: "bg-neon-cyan shadow-[0_0_18px_rgba(0,240,255,0.8)]",
    mint: "bg-neon-mint shadow-[0_0_18px_rgba(0,255,135,0.8)]",
  };

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full ${styles[accent]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.35, 1, 0.35],
              scale: [0.8, 1.25, 0.8],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function OrbitalRing({
  className = "",
  color = "ember",
  duration = 16,
  reverse = false,
}: {
  className?: string;
  color?: "ember" | "cyan" | "mint";
  duration?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const border = {
    ember: "border-ember/25",
    cyan: "border-neon-cyan/25",
    mint: "border-neon-mint/25",
  };

  const dot = {
    ember:
      "bg-ember shadow-[0_0_14px_rgba(255,107,0,0.8)]",
    cyan:
      "bg-neon-cyan shadow-[0_0_14px_rgba(0,240,255,0.8)]",
    mint:
      "bg-neon-mint shadow-[0_0_14px_rgba(0,255,135,0.8)]",
  };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border ${border[color]} ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              rotate: reverse ? [360, 0] : [0, 360],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span
        className={`absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot[color]}`}
      />
    </motion.div>
  );
}

function DecorativeCorner({
  accent = "ember",
}: {
  accent?: "ember" | "cyan" | "mint";
}) {
  const border = {
    ember: "border-ember/30",
    cyan: "border-neon-cyan/30",
    mint: "border-neon-mint/30",
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-20 w-20 overflow-hidden"
    >
      <div
        className={`absolute right-4 top-4 h-8 w-8 rotate-45 border-r border-t ${border[accent]}`}
      />
      <div
        className={`absolute right-0 top-0 h-14 w-14 border-l border-b opacity-40 ${border[accent]}`}
      />
    </div>
  );
}

function SignalBadge({
  label,
  accent = "ember",
}: {
  label: string;
  accent?: "ember" | "cyan" | "mint";
}) {
  const styles = {
    ember: {
      text: "text-ember",
      border: "border-ember/25",
      dot: "bg-ember",
    },
    cyan: {
      text: "text-neon-cyan",
      border: "border-neon-cyan/25",
      dot: "bg-neon-cyan",
    },
    mint: {
      text: "text-neon-mint",
      border: "border-neon-mint/25",
      dot: "bg-neon-mint",
    },
  };

  const current = styles[accent];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border bg-ink-soft/70 px-3 py-1.5 backdrop-blur-md ${current.border}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${current.dot} shadow-[0_0_10px_currentColor]`}
      />
      <span
        className={`text-[9px] font-mono uppercase tracking-[0.18em] ${current.text}`}
      >
        {label}
      </span>
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  const heroY = useTransform(smoothProgress, [0, 1], [0, -80]);
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.97]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);
    reset();
  };

  return (
    <main className="relative isolate overflow-hidden bg-ink text-paper selection:bg-ember/30 selection:text-ember">
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-20 h-[38rem] w-[38rem] rounded-full bg-ember/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-14rem] top-[36%] h-[42rem] w-[42rem] rounded-full bg-neon-cyan/10 blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[30%] h-[26rem] w-[26rem] rounded-full bg-neon-mint/5 blur-[140px]"
      />

      {/* Cyber grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 107, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black 10%, black 60%, transparent 94%)",
        }}
      />

      {/* Fine radial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 72%)",
        }}
      />

      {/* Floating ambient particles */}
      <FloatingOrb
        className="left-[12%] top-[18rem]"
        delay={0.2}
        accent="ember"
      />
      <FloatingOrb
        className="right-[18%] top-[24rem]"
        delay={1.1}
        duration={7}
        accent="cyan"
      />
      <FloatingOrb
        className="left-[42%] top-[40rem]"
        delay={1.8}
        duration={8}
        accent="mint"
      />
      <FloatingOrb
        className="right-[8%] top-[58rem]"
        delay={0.7}
        duration={7.5}
        accent="ember"
      />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[610px] overflow-hidden border-b border-line/60"
      >
        <motion.div
          style={
            reduceMotion
              ? undefined
              : {
                  y: heroY,
                  scale: heroScale,
                  opacity: heroOpacity,
                }
          }
          className="relative z-10"
        >
          <div className="container-mantra relative pt-10 sm:pt-14 md:pt-16">
            {/* Status badge */}
            <FloatingObject
              className="right-[5%] top-12 hidden lg:block"
              delay={0.3}
              duration={8}
            >
              <div className="flex items-center gap-2.5 rounded-full border border-ember/30 bg-ink-soft/80 px-4 py-2 backdrop-blur-xl shadow-[0_0_24px_rgba(255,107,0,0.12)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
                </span>

                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ember">
                  Direct Access
                </span>
              </div>
            </FloatingObject>

            {/* Hero geometry */}
            <FloatingObject
              className="right-[17%] top-28 hidden xl:block"
              delay={0.7}
              duration={9}
            >
              <div className="relative flex h-20 w-20 items-center justify-center rotate-12">
                <div className="absolute inset-0 rounded-[1.25rem] border border-ember/20 bg-ink-soft/20 backdrop-blur-sm" />
                <div className="absolute inset-3 rounded-lg border border-neon-cyan/15" />
                <div className="h-2 w-2 rounded-full bg-ember shadow-[0_0_18px_rgba(255,107,0,0.8)]" />
              </div>
            </FloatingObject>

            <OrbitalRing
              className="right-[2%] top-24 hidden h-40 w-40 lg:block"
              color="cyan"
              duration={18}
            />

            <OrbitalRing
              className="left-[-4rem] top-56 hidden h-48 w-48 lg:block"
              color="ember"
              duration={22}
              reverse
            />

            <FloatingObject
              className="left-[3%] top-52 hidden lg:block"
              delay={1}
              duration={7}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/70 text-ember backdrop-blur-md">
                <MessageSquare size={17} />
              </div>
            </FloatingObject>

            <PageHeader
              eyebrow="Contact"
              title="Talk to MANTRA."
              description="Questions, partnership ideas, media requests, or just curiosity — this reaches the founding team directly."
            />

            {/* Contact signal rail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease }}
              className="mt-10 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/40 backdrop-blur-xl"
            >
              {([
                ["01", "Connect", Mail, "ember"],
                ["02", "Explore", Compass, "cyan"],
                ["03", "Build", Sparkles, "mint"],
              ] as const).map(([number, label, Icon, accent], i) => {
                const iconColor =
                  accent === "cyan"
                    ? "text-neon-cyan"
                    : accent === "mint"
                      ? "text-neon-mint"
                      : "text-ember";

                const dotColor =
                  accent === "cyan"
                    ? "bg-neon-cyan"
                    : accent === "mint"
                      ? "bg-neon-mint"
                      : "bg-ember";

                return (
                  <div
                    key={String(label)}
                    className={`relative flex items-center gap-3 px-4 py-4 sm:px-5 ${
                      i !== 2 ? "border-r border-line/60" : ""
                    }`}
                  >
                    <span className="text-[9px] font-mono text-paper-dim">
                      {number}
                    </span>

                    <Icon size={14} className={iconColor} />

                    <span className="text-xs uppercase tracking-wider text-paper-dim">
                      {label}
                    </span>

                    <span
                      className={`ml-auto hidden h-1.5 w-1.5 rounded-full sm:block ${dotColor}`}
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[-2.5rem] left-1/2 h-20 w-20 -translate-x-1/2 rotate-45 border border-ember/10"
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [45, 135, 45],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent"
        />
      </section>

      {/* Main contact section */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Floating objects */}
        <FloatingObject
          className="left-[4%] top-20 hidden lg:block"
          delay={0.4}
          duration={7}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-ember backdrop-blur-md">
            <MessageSquare size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[5%] bottom-24 hidden lg:block"
          delay={0.7}
          duration={6}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-ink-soft/60 text-neon-cyan backdrop-blur-md">
            <Compass size={18} />
          </div>
        </FloatingObject>

        <FloatingObject
          className="right-[14%] top-[38%] hidden xl:block"
          delay={1.2}
          duration={9}
        >
          <div className="h-10 w-10 rotate-45 border border-neon-mint/20 bg-ink-soft/20 backdrop-blur-sm" />
        </FloatingObject>

        <div className="container-mantra relative z-10">
          {/* Section intro */}
          <ScrollReveal>
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <SignalBadge label="Open channel" accent="ember" />

                <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
                  One conversation can start something bigger.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-paper-dim">
                Reach out directly. Whether you're exploring MANTRA,
                representing an institution, or simply want to understand the
                work, there's a place to start.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.25fr] lg:gap-10">
            {/* Information panel */}
            <ScrollReveal className="h-full">
              <div className="relative h-full overflow-hidden rounded-[1.75rem] border border-line/80 bg-ink-soft/40 p-6 sm:p-7 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                <DecorativeCorner accent="ember" />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,107,0,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.35) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                <OrbitalRing
                  className="right-[-3rem] top-[-3rem] h-32 w-32"
                  color="ember"
                  duration={18}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: 8,
                              scale: 1.05,
                            }
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-ember/25 bg-ink text-ember"
                    >
                      <Mail size={18} />
                    </motion.div>

                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-ember">
                        Direct line
                      </span>
                      <h3 className="mt-0.5 font-display text-xl text-paper">
                        Personal Contact
                      </h3>
                    </div>
                  </div>

                  <p className="mt-6 max-w-md text-sm leading-7 text-mist">
                    MANTRA is a small, founding team. Every message is read
                    personally and responded to as quickly as possible.
                  </p>

                  <div className="my-7 h-px bg-line/60" />

                  <div className="space-y-5">
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              x: 4,
                            }
                      }
                      className="group flex items-start gap-3.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink/60 text-ember">
                        <MapPin size={16} />
                      </div>

                      <div>
                        <h4 className="text-sm font-mono text-paper">
                          Headquarters
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-mist">
                          Nairobi, Kenya
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              x: 4,
                            }
                      }
                      className="group flex items-start gap-3.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink/60 text-neon-cyan">
                        <Globe size={16} />
                      </div>

                      <div>
                        <h4 className="text-sm font-mono text-paper">
                          Expansion Scope
                        </h4>
                        <p className="mt-1 text-sm leading-6 text-mist">
                          Building toward chapters across the continent.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Response indicator */}
                  <div className="mt-8 rounded-2xl border border-line/60 bg-ink/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-neon-mint/25">
                        <span className="h-2 w-2 rounded-full bg-neon-mint shadow-[0_0_14px_rgba(0,255,135,0.8)]" />
                        <motion.span
                          className="absolute inset-1 rounded-full border border-neon-mint/20"
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  scale: [1, 1.3, 1],
                                  opacity: [0.8, 0.2, 0.8],
                                }
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </div>

                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-neon-mint">
                          Response window
                        </p>
                        <p className="mt-1 text-xs leading-5 text-paper-dim">
                          Typically within 24–48 business hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick note */}
                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-ember/15 bg-ember/5 p-4">
                    <Sparkles
                      size={16}
                      className="mt-0.5 shrink-0 text-ember"
                    />
                    <p className="text-xs leading-5 text-mist">
                      Good conversations don't need a perfect reason to begin.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Form panel */}
            <ScrollReveal delay={0.1} className="h-full">
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                transition={{ duration: 0.3, ease }}
                className="relative h-full overflow-hidden rounded-[1.75rem] border border-line/80 bg-ink-soft/40 p-5 sm:p-7 md:p-8 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.2)]"
              >
                <DecorativeCorner accent="cyan" />

                {/* Form grid texture */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,240,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.3) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />

                <FloatingObject
                  className="right-16 top-10 hidden sm:block"
                  delay={1}
                  duration={8}
                >
                  <div className="h-5 w-5 rotate-45 border border-neon-cyan/20" />
                </FloatingObject>

                <div className="relative z-10">
                  <div className="mb-7 flex items-end justify-between gap-4">
                    <div>
                      <SignalBadge label="Message interface" accent="cyan" />
                      <h3 className="mt-3 text-xl font-semibold text-paper">
                        Start the conversation.
                      </h3>
                    </div>

                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                        Secure channel
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_10px_rgba(0,255,135,0.7)]" />
                    </div>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.96,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease,
                      }}
                      className="relative overflow-hidden rounded-2xl border border-ember/40 bg-ember/10 p-8 text-center sm:p-10"
                    >
                      <OrbitalRing
                        className="left-1/2 top-[-4rem] h-32 w-32 -translate-x-1/2"
                        color="ember"
                        duration={15}
                      />

                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.15,
                          ease,
                        }}
                        className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ember/60 bg-ember/20 text-ember"
                      >
                        <CheckCircle2 size={25} />
                      </motion.div>

                      <h3 className="mt-5 font-display text-2xl text-paper">
                        Message sent.
                      </h3>

                      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-mist">
                        Thank you for reaching out — MANTRA's team will get
                        back to you soon.
                      </p>

                      <motion.button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                y: -2,
                              }
                        }
                        whileTap={
                          reduceMotion
                            ? undefined
                            : {
                                scale: 0.98,
                              }
                        }
                        className="mt-7 inline-flex items-center gap-2 rounded-xl border border-ember/40 bg-ink-soft/80 px-5 py-2.5 text-sm font-mono text-ember backdrop-blur-md transition-all hover:bg-ember hover:text-ink"
                      >
                        Send another message
                        <Send size={14} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="space-y-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          label="Name"
                          htmlFor="name"
                          error={errors.name?.message}
                        >
                          <input
                            id="name"
                            placeholder="John Doe"
                            className={inputClasses}
                            {...register("name")}
                          />
                        </FormField>

                        <FormField
                          label="Email"
                          htmlFor="email"
                          error={errors.email?.message}
                        >
                          <input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            className={inputClasses}
                            {...register("email")}
                          />
                        </FormField>
                      </div>

                      <FormField
                        label="Organization (optional)"
                        htmlFor="organization"
                      >
                        <input
                          id="organization"
                          placeholder="Company, Foundation or University"
                          className={inputClasses}
                          {...register("organization")}
                        />
                      </FormField>

                      <FormField
                        label="Reason for contact"
                        htmlFor="reason"
                        error={errors.reason?.message}
                      >
                        <select
                          id="reason"
                          defaultValue=""
                          className={inputClasses}
                          {...register("reason")}
                        >
                          <option
                            value=""
                            disabled
                            className="bg-ink text-paper"
                          >
                            Select a reason
                          </option>
                          <option
                            value="membership"
                            className="bg-ink text-paper"
                          >
                            Membership / Circles
                          </option>
                          <option
                            value="partnership"
                            className="bg-ink text-paper"
                          >
                            Partnership
                          </option>
                          <option value="media" className="bg-ink text-paper">
                            Media / Press
                          </option>
                          <option
                            value="research"
                            className="bg-ink text-paper"
                          >
                            Research collaboration
                          </option>
                          <option value="other" className="bg-ink text-paper">
                            Something else
                          </option>
                        </select>
                      </FormField>

                      <FormField
                        label="Message"
                        htmlFor="message"
                        error={errors.message?.message}
                      >
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="How can we collaborate or help?"
                          className={`${inputClasses} resize-none`}
                          {...register("message")}
                        />
                      </FormField>

                      <div className="flex flex-col gap-4 border-t border-line/50 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-neon-mint shadow-[0_0_10px_rgba(0,255,135,0.7)]" />
                          <span className="text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                            Ready to connect
                          </span>
                        </div>

                        <motion.div
                          whileHover={
                            reduceMotion
                              ? undefined
                              : {
                                  y: -2,
                                }
                          }
                          whileTap={
                            reduceMotion
                              ? undefined
                              : {
                                  scale: 0.98,
                                }
                          }
                        >
                          <Button type="submit" onClick={undefined}>
                            <span className="flex items-center gap-2">
                              {isSubmitting ? "Sending..." : "Send message"}
                              <motion.span
                                animate={
                                  reduceMotion
                                    ? undefined
                                    : {
                                        x: [0, 3, 0],
                                      }
                                }
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                <Send size={15} />
                              </motion.span>
                            </span>
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Bottom contact rail */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="relative mt-10 overflow-hidden rounded-2xl border border-line/60 bg-ink-soft/30 px-5 py-5 backdrop-blur-xl sm:px-6"
          >
            <OrbitalRing
              className="right-[-2rem] top-[-3rem] h-24 w-24"
              color="cyan"
              duration={16}
            />

            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-ink text-neon-cyan">
                  <Compass size={15} />
                </div>

                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-neon-cyan">
                    Keep exploring
                  </p>
                  <p className="mt-1 text-xs text-paper-dim">
                    Partnerships, research and community all connect here.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-line" />
                <span className="text-[9px] font-mono uppercase tracking-wider text-paper-dim">
                  MANTRA
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing visual */}
      <div
        aria-hidden="true"
        className="relative h-20 overflow-hidden border-t border-line/50"
      >
        <motion.div
          className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-ember/20 to-transparent"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.3, 0.8, 0.3],
                  scaleX: [0.85, 1, 0.85],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <FloatingOrb
          className="left-[18%] top-8"
          delay={0.2}
          accent="ember"
        />
        <FloatingOrb
          className="left-[50%] top-8"
          delay={1.2}
          duration={7}
          accent="cyan"
        />
        <FloatingOrb
          className="right-[20%] top-8"
          delay={2}
          duration={8}
          accent="mint"
        />

        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
          <span className="h-px w-8 bg-ember/20" />
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-paper-dim">
            Open channel
          </span>
          <span className="h-px w-8 bg-ember/20" />
        </div>
      </div>
    </main>
  );
}