"use client";

// Client component: it reads the current URL to show the selected underline.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "underline-offset-4 hover:underline aria-[current=page]:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}
