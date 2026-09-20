import { cn } from "../../lib/utils";

interface TagProps {
  children: string;
  tone?: "ember" | "indigo" | "mist";
}

export function Tag({ children, tone = "mist" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs",
        tone === "ember" && "border-ember/30 text-ember",
        tone === "indigo" && "border-indigo-soft/40 text-indigo-soft",
        tone === "mist" && "border-line text-mist"
      )}
    >
      {children}
    </span>
  );
}
