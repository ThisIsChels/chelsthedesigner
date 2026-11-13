import Image from "next/image";
import type { GalleryScreen } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// Figma component `phone-screen` (State=Focused / Dimmed). The parent sets
// the height; the width follows the screenshot's aspect ratio, so animating
// the height resizes the whole screen. Focusable so keyboard users can tab
// through the gallery. `framed` adds the 1px Charcoal border (SourceShoot's
// desktop screens, per Figma); Orbit's phone screens have none.
type PhoneScreenProps = {
  screen: GalleryScreen;
  dimmed?: boolean;
  framed?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: () => void;
  /** Marks which gallery group it belongs to (PinnedStage measures by it). */
  group?: number;
};

export function PhoneScreen({ screen, dimmed = false, framed = false, className, style, onFocus, group }: PhoneScreenProps) {
  // Rendered up to ~600px tall, so the width follows the aspect ratio.
  const sizes = `${Math.round((600 * screen.width) / screen.height)}px`;
  return (
    <div
      tabIndex={0}
      onFocus={onFocus}
      data-group={group}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg",
        framed && "border border-text-primary",
        dimmed && "opacity-40",
        className,
      )}
      style={{ aspectRatio: `${screen.width} / ${screen.height}`, ...style }}
    >
      <Image src={screen.src} alt={screen.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
