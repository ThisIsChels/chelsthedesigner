import { cn } from "@/lib/utils";

// Grey stand-in for images that aren't final. Fills its (positioned) parent.
export function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-text-primary/10 type-caption",
        className,
      )}
    >
      [PLACEHOLDER: image]
    </span>
  );
}
