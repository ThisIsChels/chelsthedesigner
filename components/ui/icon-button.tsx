import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon, PauseIcon, PlayIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

// Figma primitive `icon`: 28px square with an arrow (or an X for close
// buttons, pause/play and left/right for carousels). Inverts on hover, no lift. It's purely visual — put it inside a
// link or button with the `group` class so the whole thing is one target.

const tones = {
  default:
    "border-text-primary bg-surface-base text-text-primary group-hover:bg-surface-inverse group-hover:text-text-inverse",
  pear: "border-accent-secondary text-accent-secondary group-hover:bg-accent-secondary group-hover:text-text-primary",
  /** On a Charcoal surface: Cararra outline, inverts to Cararra fill. */
  inverse:
    "border-text-inverse bg-surface-inverse text-text-inverse group-hover:bg-surface-base group-hover:text-text-primary",
};

const icons = {
  arrow: ArrowUpRightIcon,
  x: XIcon,
  left: ArrowLeftIcon,
  right: ArrowRightIcon,
  pause: PauseIcon,
  play: PlayIcon,
};

type IconButtonProps = {
  tone?: keyof typeof tones;
  icon?: keyof typeof icons;
  className?: string;
};

export function IconButton({ tone = "default", icon = "arrow", className }: IconButtonProps) {
  const Icon = icons[icon];
  return (
    <span
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
        tones[tone],
        className,
      )}
    >
      <Icon className="size-6" />
    </span>
  );
}
