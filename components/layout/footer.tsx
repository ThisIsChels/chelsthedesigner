import Image from "next/image";
import Link from "next/link";
import { FooterContactButton } from "@/components/ui/cta-buttons";
import { CopyrightIcon, InstagramIcon, LinkedinIcon, UpworkIcon } from "@/components/ui/icons";
import { EXTERNAL, NAV_LINKS } from "@/lib/links";

// Figma component `Footer`. Stacks below md.

const FOOTER_NAV = [{ label: "home", href: "/" }, ...NAV_LINKS];

const SOCIALS = [
  { label: "instagram", href: EXTERNAL.instagram, Icon: InstagramIcon },
  { label: "upwork", href: EXTERNAL.upwork, Icon: UpworkIcon },
  { label: "linkedin", href: EXTERNAL.linkedin, Icon: LinkedinIcon },
];

const linkHover = "underline-offset-4 hover:underline";

export function Footer() {
  return (
    <footer className="flex flex-col gap-12 rounded-lg border border-text-primary p-8 md:flex-row md:justify-between md:p-12">
      <div className="flex flex-col gap-12 sm:flex-row lg:gap-32">
        <div className="flex flex-col justify-between gap-8">
          <Image src="/brand/Logo.svg" alt="chelsTheDesigner" width={156} height={80} />
          <p className="type-body whitespace-pre">DESIGNER.  DEVELOPER.  ARTIST</p>
          <p className="flex items-center gap-2 type-caption">
            <CopyrightIcon />
            2026 Chelsey LaPointe
          </p>
        </div>

        <ul className="flex flex-col gap-4 type-caption">
          {FOOTER_NAV.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkHover}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <p className="type-body-lg">Let’s work together!</p>
          <FooterContactButton />
        </div>
        <ul className="flex flex-col gap-4 type-caption">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-4 ${linkHover}`}>
                <Icon />
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="type-caption">Saint Paul, Minnesota, USA</p>
      </div>
    </footer>
  );
}
