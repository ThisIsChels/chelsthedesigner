"use client";

// Client component: the scroll-driven Final Designs strip (Figma
// `pinned-stage`; full motion spec on the /portfolio/orbit-caseStudy frame).
//
// A tall wrapper scrolls normally; inside it the stage is sticky, so it stays
// on screen while the page scrolls through the wrapper. Scroll position maps
// to a timeline: each group "dwells" (strip still, group focused, note open),
// then the strip "travels" sideways to center the next group.
//
// Every frame (only while on screen) we measure where the groups currently
// are and move the strip with a transform. Measuring live keeps the active
// group centered while its screens grow and its note opens. Focus, dimming
// and the note animate with CSS when the active group changes.

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Callout } from "@/components/case-study/callout";
import type { StripItem } from "@/components/case-study/pinned-gallery";
import { PhoneScreen } from "@/components/case-study/phone-screen";
import { ScrollProgress } from "@/components/case-study/scroll-progress";
import type { GalleryGroup } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

// ---- Timeline, in viewport heights of scrolling (motion spec §4). ----
const DWELL_WITH_NOTE = 0.7;
const DWELL = 0.3;
const TRAVEL = 0.5;

/** Compact nav bar height (16 + 40 + 16 + 1px border, see nav-sizes.ts). The stage pins just below it. */
const NAV_HEIGHT = 73;

type Segment = { start: number; end: number };

function buildTimeline(groups: GalleryGroup[]) {
  let t = 0;
  const segments: Segment[] = groups.map((group, i) => {
    const start = t;
    t += group.note ? DWELL_WITH_NOTE : DWELL;
    const end = t;
    if (i < groups.length - 1) t += TRAVEL;
    return { start, end };
  });
  return { segments, total: t };
}

/** Where we are on the timeline: between group `from` and `to` (equal while dwelling). */
function locate(segments: Segment[], s: number) {
  for (let i = 0; i < segments.length; i++) {
    if (s <= segments[i].end) {
      if (i === 0 || s >= segments[i].start) return { from: i, to: i, t: 0 };
      return { from: i - 1, to: i, t: (s - segments[i - 1].end) / TRAVEL };
    }
  }
  const last = segments.length - 1;
  return { from: last, to: last, t: 0 };
}

const easeInOut = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pad = (n: number) => String(n).padStart(2, "0");

type PinnedStageProps = { items: StripItem[]; groups: GalleryGroup[]; screenCount: number };

export function PinnedStage({ items, groups, screenCount }: PinnedStageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef);

  /** Group in its dwell (focused, note open); null while traveling. */
  const [active, setActive] = useState<number | null>(0);
  /** Group named in the progress label (the nearer one while traveling). */
  const [labelGroup, setLabelGroup] = useState(0);

  const { segments, total } = buildTimeline(groups);

  // 1-based strip position of each group's first and last screen.
  const screenRange = groups.map((_, g) => {
    const positions = items
      .filter((item) => item.kind === "screen")
      .flatMap((item, i) => (item.group === g ? [i + 1] : []));
    return { first: positions[0], last: positions[positions.length - 1] };
  });

  useEffect(() => {
    if (!inView) return;
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;
    const strip = stripRef.current;
    if (!wrapper || !viewport || !strip) return;

    const parts = [...strip.querySelectorAll<HTMLElement>("[data-group]")];
    // Midpoint of a group's left edge and its last element's right edge (note included).
    const center = (g: number) => {
      const own = parts.filter((el) => el.dataset.group === String(g));
      const left = Math.min(...own.map((el) => el.offsetLeft));
      const right = Math.max(...own.map((el) => el.offsetLeft + el.offsetWidth));
      return (left + right) / 2;
    };

    let frame = 0;
    const tick = () => {
      const scrolled = (NAV_HEIGHT - wrapper.getBoundingClientRect().top) / window.innerHeight;
      const { from, to, t } = locate(segments, Math.min(Math.max(scrolled, 0), total));
      const eased = easeInOut(t);

      const x = lerp(center(from), center(to), eased);
      strip.style.transform = `translate3d(${viewport.clientWidth / 2 - x}px, 0, 0)`;

      const fill = lerp(screenRange[from].last, screenRange[to].last, eased) / screenCount;
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${fill})`;

      setActive(from === to ? from : null);
      setLabelGroup(t < 0.5 ? from : to);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // segments/screenRange are derived from props, which don't change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // Tabbing to a screen scrolls the page to that group's dwell.
  const scrollToGroup = (g: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const { start, end } = segments[g];
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: wrapperTop - NAV_HEIGHT + ((start + end) / 2) * window.innerHeight });
  };

  const { first, last } = screenRange[labelGroup];
  const counter = `${first === last ? pad(first) : `${pad(first)}–${pad(last)}`} / ${screenCount}`;

  return (
    // Tall wrapper: one stage height plus the timeline's scroll distance.
    <div ref={wrapperRef} style={{ height: `calc(100svh - ${NAV_HEIGHT}px + ${total * 100}svh)` }}>
      <div
        className="sticky overflow-clip border-y border-text-primary/25"
        style={{ top: NAV_HEIGHT, height: `calc(100svh - ${NAV_HEIGHT}px)` }}
      >
        {/* Capped at 1800px on very wide screens, with faded edges. */}
        <div ref={viewportRef} className="pinned-viewport relative mx-auto h-full max-w-[1800px] overflow-clip">
          {/* Strip stops above the progress bar; screens center in that space. */}
          <div ref={stripRef} className="absolute top-0 bottom-16 left-0 flex items-center will-change-transform">
            {items.map((item, i) => {
              const focused = active === item.group;
              return item.kind === "screen" ? (
                <PhoneScreen
                  key={item.screen.key}
                  group={item.group}
                  screen={item.screen}
                  dimmed={!focused}
                  onFocus={() => scrollToGroup(item.group)}
                  className={cn(
                    "transition-[height,opacity] duration-300 ease-out",
                    i > 0 && "ml-8",
                    focused ? "h-[86%]" : "h-[72%]",
                  )}
                />
              ) : (
                <Callout
                  key={`note-${item.group}`}
                  group={item.group}
                  text={item.note.text}
                  arrowY={item.note.arrowY}
                  open={focused}
                  className="h-[86%] self-auto"
                />
              );
            })}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8">
          <ScrollProgress label={groups[labelGroup].title} counter={counter} fillRef={fillRef} />
        </div>
      </div>
    </div>
  );
}
