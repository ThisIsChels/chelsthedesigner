"use client";

// Client component: it holds the open/closed state so a link tap can close it.
// Styling is a first proposal (CLAUDE.md → Navigation): charcoal overlay,
// colored logo, Cararra links in heading-md.

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { barPadding, logoSize } from "@/components/layout/nav-sizes";
import { Dialog, DialogClose, DialogFullscreen, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MenuIcon, XIcon } from "@/components/ui/icons";
import { NavLink } from "@/components/ui/nav-link";
import { NAV_LINKS } from "@/lib/links";
import { cn } from "@/lib/utils";

const iconButton = "inline-flex size-12 items-center justify-center";

type MobileMenuProps = { className?: string; compact?: boolean };

export function MobileMenu({ className, compact = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger aria-label="Open menu" className={cn(iconButton, className)}>
        <MenuIcon />
      </DialogTrigger>

      <DialogFullscreen className="surface-inverse">
        {/* Mirrors the bar's current size so the logo doesn't jump on open. */}
        <Container
          className={cn("flex justify-between", compact ? "items-center" : "items-start", barPadding(compact))}
        >
          <Image
            src="/brand/Logo-colored.svg"
            alt="chelsTheDesigner"
            width={156}
            height={80}
            className={logoSize(compact)}
          />
          <DialogClose aria-label="Close menu" className={iconButton}>
            <XIcon />
          </DialogClose>
        </Container>

        <Container className="pt-12">
          <DialogTitle className="sr-only">Menu</DialogTitle>
          <ul className="flex flex-col gap-8 type-heading-md">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </Container>
      </DialogFullscreen>
    </Dialog>
  );
}
