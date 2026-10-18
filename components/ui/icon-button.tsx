import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

// Figma primitive `icon`: 28px arrow square. Inverts on hover, no lift.
// It's purely visual — put it inside a link (see TextLink) so the whole
// group is one target and hovering the text inverts the icon too.

const tones = {
  default:
    "border-text-primary bg-surface-base text-text-primary group-hover:bg-surface-inverse group-hover:text-text-inverse",
  pear: "border-accent-secondary text-accent-secondary group-hover:bg-accent-secondary group-hover:text-text-primary",
};

type IconButtonProps = {
  tone?: keyof typeof tones;
  className?: string;
};

export function IconButton({ tone = "default", className }: IconButtonProps) {
  return (
    <span
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
        tones[tone],
        className,
      )}
    >
      <ArrowUpRightIcon className="size-6" />
    </span>
  );
}
