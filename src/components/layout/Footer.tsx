import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  AtSign,
  Briefcase,
  Camera,
  Check,
  Play,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "../animation/ScrollReveal";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "About", to: "/about" },
      { label: "What We Do", to: "/programs" },
      { label: "Community", to: "/community" },
      { label: "Research", to: "/research" },
      { label: "Stories", to: "/stories" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Opportunities", to: "/opportunities" },
      { label: "Partners", to: "/partners" },
      { label: "Impact", to: "/impact" },
      { label: "Get Involved", to: "/get-involved" },
    ],
  },
  {
    heading: "Organization",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Events", to: "/events" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    icon: Camera,
    href: "#",
  },
  {
    label: "Twitter",
    icon: AtSign,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: Briefcase,
    href: "#",
  },
  {
    label: "YouTube",
    icon: Play,
    href: "#",
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="relative isolate overflow-hidden border-t border-line/60 bg-ink text-paper">
      {/* Dynamic Ambient Electric Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="glow-orb-primary -left-32 top-10 opacity-40" />
        <div className="glow-orb-secondary -right-32 bottom-10 opacity-30" />

        {/* Neon Accent Rings */}
        <div className="absolute right-[8%] top-16 h-40 w-40 rounded-full border border-neon-cyan/10 animate-pulse-slow" />
        <div className="absolute right-[10%] top-24 h-28 w-28 rounded-full border border-neon-mint/20" />

        {/* Radiant Top Border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-mint/60 to-transparent" />
      </div>

      {/* Brand Statement Section */}
      <ScrollReveal className="container-mantra relative pt-16 md:pt-24 lg:pt-32">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-neon-mint to-neon-cyan" />
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-neon-mint">
            <Sparkles size={12} className="animate-pulse" />
            The future of male wellness
          </span>
        </div>

        <div className="relative">
          <Link
            to="/"
            aria-label="MANTRA home"
            className="group block overflow-hidden"
          >
            <span className="block font-display text-[18vw] font-bold leading-[0.75] tracking-tight text-gradient-primary drop-shadow-[0_0_35px_rgba(0,255,135,0.15)] transition-all duration-500 group-hover:scale-[1.01] sm:text-[16vw] md:text-[11rem] lg:text-[14rem]">
              MANTRA
            </span>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-neon-mint to-neon-cyan transition-all duration-700 ease-out group-hover:w-full"
            />
          </Link>

          <ArrowUpRight
            aria-hidden="true"
            className="absolute right-2 top-2 h-8 w-8 text-neon-mint transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-12 md:w-12"
          />
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-line/60 pt-7 md:mt-12 md:flex-row md:items-start md:justify-between md:gap-12">
          <p className="max-w-xl text-base leading-8 text-paper-dim md:text-lg md:leading-9">
            An African institution for men&apos;s wellbeing, development,
            community and opportunity, built to be returned to.
          </p>

          <div className="flex shrink-0 items-center gap-3 rounded-full border border-neon-mint/30 bg-ink-soft/60 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-neon-mint backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-mint" />
            </span>
            <span>Founding chapter active</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Navigation & Newsletter Grid */}
      <div className="container-mantra mt-16 border-t border-line/60 py-12 md:mt-24 md:py-16 lg:mt-28">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-5 md:gap-10">
          {columns.map((column, columnIndex) => (
            <div
              key={column.heading}
              className={columnIndex === 2 ? "col-span-2 md:col-span-1" : ""}
            >
              <p className="mb-6 flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-mist">
                <span className="text-neon-cyan">0{columnIndex + 1}</span>
                {column.heading}
              </p>

              <ul className="space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-sm text-paper-dim transition-colors duration-300 hover:text-neon-mint"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 text-neon-mint transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Subscription Box */}
          <div className="col-span-2 rounded-2xl border border-line/60 bg-ink-soft/40 p-6 backdrop-blur-md md:col-span-2">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-neon-mint">
                  Stay close to MANTRA
                </p>
                <p className="mt-3 max-w-sm text-sm leading-6 text-paper-dim">
                  Receive thoughtful notes on wellness, belonging, growth, and
                  the work shaping our next chapter.
                </p>
              </div>

              <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neon-mint/30 bg-neon-mint/10 text-neon-mint md:flex">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>

            <form
              className="group relative mt-6"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="flex items-center gap-3 border-b border-line/80 pb-3 transition-colors duration-300 focus-within:border-neon-mint">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setSubscribed(false);
                  }}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent text-sm text-paper outline-none placeholder:text-mist"
                />

                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-neon-mint/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neon-mint border border-neon-mint/30 transition-all duration-300 hover:bg-neon-mint hover:text-ink hover:shadow-[0_0_15px_rgba(0,255,135,0.4)]"
                >
                  {subscribed ? (
                    <>
                      <Check className="h-4 w-4" />
                      Joined
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              <p
                className={`mt-2 text-xs font-mono transition-all duration-300 ${
                  subscribed
                    ? "translate-y-0 text-neon-mint opacity-100"
                    : "pointer-events-none -translate-y-1 text-transparent opacity-0"
                }`}
                aria-live="polite"
              >
                You&apos;re on the list. Welcome to the chapter.
              </p>
            </form>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              <span className="mr-2 text-[10px] font-mono uppercase tracking-[0.2em] text-mist">
                Follow
              </span>

              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`MANTRA on ${label}`}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-line/80 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-neon-mint hover:bg-neon-mint/10 hover:text-neon-mint hover:shadow-[0_0_15px_rgba(0,255,135,0.3)]"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Base */}
      <div className="container-mantra flex flex-col gap-4 border-t border-line/60 py-6 text-[10px] font-mono uppercase tracking-[0.16em] text-mist sm:flex-row sm:items-center sm:justify-between md:py-8">
        <p className="normal-case tracking-normal text-mist">
          &copy; {new Date().getFullYear()} MANTRA. Building, chapter by chapter.
        </p>

        <div className="flex items-center gap-6">
          <Link
            to="/privacy"
            className="transition-colors duration-300 hover:text-neon-mint"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="transition-colors duration-300 hover:text-neon-mint"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}