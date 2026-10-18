import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavLink } from "@/components/ui/nav-link";
import { NAV_LINKS } from "@/lib/links";
import { cn } from "@/lib/utils";

// Figma component `nav-bar`. "inverse" is the homepage version that sits on
// the charcoal hero: colored logo + cream links.

type NavBarProps = { tone?: "default" | "inverse" };

export function NavBar({ tone = "default" }: NavBarProps) {
  const inverse = tone === "inverse";

  return (
    <nav
      aria-label="Main"
      className={cn("flex items-start justify-between", inverse ? "text-text-inverse" : "text-text-primary")}
    >
      <Link href="/" aria-label="Home" className="shrink-0">
        <Image
          src={inverse ? "/brand/Logo-colored.svg" : "/brand/Logo.svg"}
          alt="chelsTheDesigner"
          width={156}
          height={80}
          priority
        />
      </Link>

      <ul className="hidden items-center gap-12 type-label-md md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
      </ul>

      <MobileMenu className="md:hidden" />
    </nav>
  );
}
