import { SearchIcon } from "@/components/ui/icons";
import { fieldClasses } from "@/components/ui/text-field";
import { cn } from "@/lib/utils";

// Search input in the text-field style (Figma `text-box` with icon/search),
// e.g. "Search for your state". The label doubles as the placeholder and is
// read by screen readers.
type SearchFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Called when Enter is pressed. */
  onSubmit?: () => void;
  className?: string;
};

export function SearchField({ label, value, onChange, onSubmit, className }: SearchFieldProps) {
  return (
    <label className={cn("relative block", className)}>
      <span className="sr-only">{label}</span>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2" />
      <input
        type="search"
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
        className={cn(fieldClasses, "h-12 pl-12")}
      />
    </label>
  );
}
