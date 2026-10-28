import { Callout } from "@/components/case-study/callout";
import { PhoneScreen } from "@/components/case-study/phone-screen";
import { PinnedStage } from "@/components/case-study/pinned-stage";
import type { GalleryGroup, GalleryNote, GalleryScreen } from "@/lib/case-studies";

// Final Designs gallery (Figma `pinned-gallery`, motion spec on the
// /portfolio/orbit-caseStudy frame). Renders two versions and CSS picks one:
// - lg and up, motion allowed: PinnedStage, the scroll-driven pinned strip.
// - below lg, or prefers-reduced-motion: a native horizontal scroller with
//   every note always visible (under its screen below lg, beside it above).

/** One thing in the strip: a screen, or a note right after its screen. */
export type StripItem =
  | { kind: "screen"; group: number; screen: GalleryScreen }
  | { kind: "note"; group: number; note: GalleryNote };

function stripItems(screens: GalleryScreen[], groups: GalleryGroup[]): StripItem[] {
  return screens.flatMap((screen) => {
    const group = groups.findIndex((g) => g.screens.includes(screen.key));
    const note = groups[group]?.note;
    const items: StripItem[] = [{ kind: "screen", group, screen }];
    if (note?.screen === screen.key) items.push({ kind: "note", group, note });
    return items;
  });
}

type PinnedGalleryProps = { screens: GalleryScreen[]; groups: GalleryGroup[] };

export function PinnedGallery({ screens, groups }: PinnedGalleryProps) {
  const items = stripItems(screens, groups);

  return (
    <>
      <div className="hidden lg:motion-safe:block">
        <PinnedStage items={items} groups={groups} screenCount={screens.length} />
      </div>
      <div className="lg:motion-safe:hidden">
        <GalleryScroller items={items} />
      </div>
    </>
  );
}

function GalleryScroller({ items }: { items: StripItem[] }) {
  // Notes join the screen before them so they stay together when scrolling.
  const screensWithNotes = items.flatMap((item, i) => {
    if (item.kind !== "screen") return [];
    const next = items[i + 1];
    return [{ screen: item.screen, note: next?.kind === "note" ? next.note : undefined }];
  });

  return (
    <div className="snap-x snap-mandatory overflow-x-auto pb-4">
      <ul className="flex w-max items-start gap-8 px-(--gutter)">
        {screensWithNotes.map(({ screen, note }) => (
          <li key={screen.key} className="flex snap-center flex-col gap-4 lg:flex-row lg:gap-0">
            <PhoneScreen screen={screen} className="h-[min(600px,70svh)]" />
            {note && (
              <>
                <p className="max-w-65 type-heading-md-medium lg:hidden">{note.text}</p>
                <Callout text={note.text} arrowY={note.arrowY} open className="hidden lg:block" />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
