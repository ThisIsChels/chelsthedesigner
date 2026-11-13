import { JumpButton } from "@/components/ui/jump-button";
import { Tag } from "@/components/ui/tag";

// Centered header at the top of a showcase page (Figma `header` on the
// showcase frames): display-sm title, skill tags, body-xl description
// (max 780px), optional `jump` button (Tranquility pill, lg) that smoothly
// scrolls to a section on the page, e.g. Who'd We Get? "Skip to final design".
type ProjectPageHeaderProps = {
  title: string;
  tags: string[];
  description?: string;
  jump?: { label: string; href: `#${string}` };
};

export function ProjectPageHeader({ title, tags, description, jump }: ProjectPageHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-6 text-center">
      <h1 className="type-display-sm">{title}</h1>
      <ul className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag size="lg">{tag}</Tag>
          </li>
        ))}
      </ul>
      {description && <p className="max-w-[780px] type-body-xl">{description}</p>}
      {jump && (
        <JumpButton href={jump.href}>{jump.label}</JumpButton>
      )}
    </header>
  );
}
