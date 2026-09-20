import { type ReactNode, type MouseEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  icon?: boolean;
  className?: string;
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  type = "button",
  icon = true,
  className,
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  const styles = cn(
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-300",
    variant === "primary" && "bg-paper text-ink hover:bg-ember-soft",
    variant === "secondary" && "border border-line text-paper hover:border-paper",
    variant === "ghost" && "text-paper/80 hover:text-paper px-0",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const transformStyle = { transform: `translate(${offset.x}px, ${offset.y}px)` };

  if (to) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={to}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={transformStyle}
        className={styles}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={transformStyle}
        className={styles}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={transformStyle}
      className={styles}
    >
      {content}
    </button>
  );
}
