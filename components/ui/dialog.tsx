"use client";

// Thin wrapper over the shadcn/Base UI dialog. Base UI handles the hard parts:
// focus trap, Escape to close, scroll lock, and returning focus on close.

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;

/** Full-screen panel. Callers style the surface and contents. */
function DialogFullscreen({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Popup
        className={cn(
          "fixed inset-0 z-50 overflow-y-auto outline-none",
          "duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

/**
 * Modal panel: full screen on phones; from md up, a centered card over a
 * 60% Charcoal backdrop. Callers style the surface and contents.
 */
function DialogModal({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        className={cn(
          "fixed inset-0 z-50 bg-surface-inverse/60",
          "duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        )}
      />
      <DialogPrimitive.Popup
        className={cn(
          "fixed inset-0 z-50 overflow-y-auto outline-none",
          "md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[calc(100svh-4rem)] md:w-[calc(100%-2*var(--gutter))] md:max-w-[1200px] md:-translate-x-1/2 md:-translate-y-1/2",
          "duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

export { Dialog, DialogTrigger, DialogClose, DialogTitle, DialogFullscreen, DialogModal };
