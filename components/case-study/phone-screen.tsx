import Image from "next/image";
import type { GalleryScreen } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// Figma component `phone-screen` (State=Focused / Dimmed). The parent sets
// the height; the width follows the screenshot's aspect ratio, so animating
// the height resizes the whole screen. Focusable so keyboard users can tab
// through the gallery.
type PhoneScreenProps = {
  screen: GalleryScreen;
  dimmed?: boolean;
  className?: string;
  onFocus?: () => void;
  /** Marks which gallery group it belongs to (PinnedStage measures by it). */
  group?: number;
};

export function PhoneScreen({ screen, dimmed = false, className, onFocus, group }: PhoneScreenProps) {
  return (
    <div
      tabIndex={0}
      onFocus={onFocus}
      data-group={group}
      className={cn("relative shrink-0 overflow-hidden rounded-lg", dimmed && "opacity-40", className)}
      style={{ aspectRatio: `${screen.width} / ${screen.height}` }}
    >
      <Image src={screen.src} alt={screen.alt} fill sizes="300px" className="object-cover" />
    </div>
  );
}
