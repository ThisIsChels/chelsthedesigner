"use client";

// Figma frames `contact-modal` and `contact-modal-success`. Wraps any trigger
// (the Contact Me buttons) and opens the modal on click. Base UI's dialog
// traps focus, closes on Escape and locks page scrolling.
//
// Client component: it tracks open/closed (so "Back to home" can close it)
// and whether the message was sent (form → success screen). Both reset after
// the modal finishes closing, so it reopens on a fresh form.

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogModal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { InstagramIcon, LinkedinIcon, UpworkIcon } from "@/components/ui/icons";
import { EXTERNAL } from "@/lib/links";
import { cn } from "@/lib/utils";

const SOCIALS = [
  { label: "INSTAGRAM", href: EXTERNAL.instagram, Icon: InstagramIcon },
  { label: "UPWORK", href: EXTERNAL.upwork, Icon: UpworkIcon },
  { label: "LINKEDIN", href: EXTERNAL.linkedin, Icon: LinkedinIcon },
];

const COPY = {
  title: "Let’s chat!",
  thanks: "Thanks!",
  followUp: "I’ll get back to you shortly!",
  backHome: "BACK TO HOME",
};

type ContactModalProps = {
  /** Classes for the trigger button (e.g. from buttonVariants). */
  triggerClassName: string;
  children: React.ReactNode;
};

export function ContactModal({ triggerClassName, children }: ContactModalProps) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} onOpenChangeComplete={(isOpen) => !isOpen && setSent(false)}>
      <DialogTrigger className={triggerClassName}>{children}</DialogTrigger>

      <DialogModal
        // Start in the Name field instead of on the close button.
        initialFocus={() => document.getElementById("name")}
        className={cn(
          "md:rounded-lg md:border",
          sent
            ? "surface-inverse md:border-surface-inverse"
            : "bg-surface-base text-text-primary md:border-text-primary",
        )}
      >
        <DialogClose aria-label="Close" className="group absolute top-4 right-4 z-10 md:top-8 md:right-8">
          <IconButton icon="x" tone={sent ? "inverse" : "default"} />
        </DialogClose>

        {sent ? (
          <SuccessScreen onBackHome={() => setOpen(false)} />
        ) : (
          <div className="flex flex-col gap-12 px-4 pt-16 pb-8 md:flex-row md:p-16 lg:p-24">
            <div className="flex flex-col justify-between gap-8 md:w-[45%] md:gap-24">
              <DialogTitle className="type-display-lg text-accent-primary">{COPY.title}</DialogTitle>
              <ul className="flex flex-col gap-4">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 type-body-lg underline-offset-4 hover:underline"
                    >
                      <Icon />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-1 flex-col">
              <ContactForm onSent={() => setSent(true)} />
            </div>
          </div>
        )}
      </DialogModal>
    </Dialog>
  );
}

/**
 * Figma `contact-modal-success`: Charcoal panel, colored logo, Pear "THANKS!"
 * (display-lg), Cararra follow-up (heading-lg), outlined "BACK TO HOME".
 * The title is focused on arrival so screen readers announce it.
 */
function SuccessScreen({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-4 py-16 text-center md:min-h-0 md:p-24">
      <Image src="/brand/Logo-colored.svg" alt="" width={156} height={80} />
      <div className="flex flex-col items-center gap-6">
        <DialogTitle
          ref={(el) => el?.focus()}
          tabIndex={-1}
          className="type-display-lg text-accent-secondary outline-none"
        >
          {COPY.thanks}
        </DialogTitle>
        <p className="type-heading-lg">{COPY.followUp}</p>
      </div>
      <Link href="/" onClick={onBackHome} className={buttonVariants({ tone: "outlined-inverse", size: "lg" })}>
        {COPY.backHome}
      </Link>
    </div>
  );
}
