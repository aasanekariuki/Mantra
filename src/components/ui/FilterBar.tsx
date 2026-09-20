import { cn } from "../../lib/utils";

interface FilterBarProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export function FilterBar({ options, active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter content">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={active === option}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            active === option
              ? "border-ember bg-ember text-ink"
              : "border-line text-mist hover:border-paper/40 hover:text-paper"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
