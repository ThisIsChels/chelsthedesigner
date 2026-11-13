import type { Ref } from "react";

// Figma component `scroll-progress`: group title, a 400px bar and a screen
// counter. The parent moves the fill every frame through `fillRef` (scaleX
// 0–1) so scrolling doesn't re-render React.
type ScrollProgressProps = { label: string; counter: string; fillRef: Ref<HTMLDivElement> };

export function ScrollProgress({ label, counter, fillRef }: ScrollProgressProps) {
  return (
    // Equal side columns keep the bar centered however long the label or counter gets.
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 type-caption uppercase">
      <p className="text-right">{label}</p>
      <div className="h-1 w-100 overflow-hidden rounded-full bg-text-primary/25">
        {/* Inline transform, not a scale-x class: Tailwind's `scale` would stack with it. */}
        <div ref={fillRef} className="h-full origin-left bg-text-primary" style={{ transform: "scaleX(0)" }} />
      </div>
      <p className="tabular-nums">{counter}</p>
    </div>
  );
}
