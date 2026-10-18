import { cn } from "@/lib/utils";

// The one centered page column: 1256px of content + side margins that step
// down per breakpoint (CLAUDE.md → Breakpoints). Past 1512px, margins grow.
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1512px] px-(--gutter)", className)}>
      {children}
    </div>
  );
}
