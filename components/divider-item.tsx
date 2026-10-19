import { TextLink } from "@/components/ui/text-link";

// Figma component `divider-item` (used for the /about skills): a 1px
// Charcoal line, then title, description and an optional text link, sm (12)
// apart. Fills its grid cell, so items in a row line up.

type DividerItemProps = {
  title: string;
  description: string;
  link?: { label: string; href: string };
};

export function DividerItem({ title, description, link }: DividerItemProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-text-primary pt-3">
      <h3 className="type-heading-sm">{title}</h3>
      <p className="type-body-lg">{description}</p>
      {link && (
        <TextLink href={link.href} size="sm" className="self-start">
          {link.label}
        </TextLink>
      )}
    </div>
  );
}
