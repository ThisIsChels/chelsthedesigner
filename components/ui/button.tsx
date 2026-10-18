import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Figma primitive `button`. Size table lives in CLAUDE.md → Button sizes.
// For Upwork / Contact Me / Resume use the presets in cta-buttons.tsx so the
// destination color stays consistent.
const buttonVariants = cva(
  "lift inline-flex shrink-0 items-center justify-center whitespace-nowrap",
  {
    variants: {
      tone: {
        outlined: "border border-text-primary bg-surface-base text-text-primary",
        pear: "bg-accent-secondary text-text-primary",
        tranquility: "bg-accent-tertiary text-text-primary",
        watercourse: "bg-accent-primary text-text-inverse",
        charcoal: "bg-surface-inverse text-text-inverse",
      },
      size: {
        sm: "h-8 px-3 type-label-sm rounded-[5px]",
        md: "h-10 px-4 type-label-md rounded-[6px]",
        lg: "h-12 px-4 type-body-lg rounded-[7px]",
        xlg: "h-17 px-8 type-heading-md-medium rounded-lg",
      },
      shape: {
        rect: "",
        pill: "rounded-full",
      },
    },
    defaultVariants: { tone: "outlined", size: "lg", shape: "rect" },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode;
  className?: string;
  /** Internal path or full URL. Without it, renders a <button>. */
  href?: string;
  onClick?: () => void;
};

export function Button({ tone, size, shape, className, href, onClick, children }: ButtonProps) {
  const classes = cn(buttonVariants({ tone, size, shape }), className);

  if (href?.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
