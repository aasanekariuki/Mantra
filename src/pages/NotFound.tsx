import { Button } from "../components/ui/Button";
import { AnimatedText } from "../components/animation/AnimatedText";
import { ScrollReveal } from "../components/animation/ScrollReveal";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm text-ember">Page not found</p>
      <AnimatedText
        as="h1"
        text="This isn't part of MANTRA yet."
        className="mt-5 max-w-2xl justify-center text-balance font-display text-4xl leading-tight text-paper md:text-6xl"
      />
      <ScrollReveal delay={0.2} className="mt-6 max-w-md text-mist">
        The page you're looking for doesn't exist, or hasn't been built. Let's get you back on track.
      </ScrollReveal>
      <ScrollReveal delay={0.3} className="mt-9">
        <Button to="/">Back to home</Button>
      </ScrollReveal>
    </div>
  );
}
