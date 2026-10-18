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

export { Dialog, DialogTrigger, DialogClose, DialogTitle, DialogFullscreen };
