"use client";

// Client component: an auto-scrolling, draggable image carousel (Figma
// `booklet-carousel` + its interaction note; first used for the Fifty Ways
// booklet pages).
// - A native horizontal scroller, so trackpad, shift-wheel and touch swipes
//   work as usual. Mouse users can also drag it, with momentum.
// - Autoplay drifts left at ~30px/s in a seamless loop: the pages are
//   rendered twice and the scroll jumps back one set once the first set has
//   passed (the copies look identical, so the jump is invisible).
// - Pauses while hovered, focused, dragged or touched, and resumes after a
//   few idle seconds unless the pause button was pressed. Reduced motion:
//   no autoplay (the play button can still start it).
// - The track starts at the content column's left edge and runs to the
//   right edge of the screen.

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { CarouselControls } from "@/components/carousel-controls";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import type { CaseStudyImage } from "@/lib/case-studies";

/** Autoplay speed, px per second. */
const SPEED = 30;
/** How long autoplay waits after the last interaction, ms. */
const IDLE_RESUME = 3000;
/** Momentum after a mouse drag: velocity kept per frame. */
const FRICTION = 0.95;


type AutoScrollCarouselProps = {
  images: CaseStudyImage[];
  /** Short instructions next to the controls. */
  hint: string;
  /** Names the scroller for screen readers, e.g. "Booklet pages". */
  label: string;
};

export function AutoScrollCarousel({ images, hint, label }: AutoScrollCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Plays by default, paused under reduced motion, until the user picks.
  const reduceMotion = usePrefersReducedMotion();
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduceMotion;
  // Mirrors for the animation loop (no re-render per frame).
  const playingRef = useRef(playing);
  const holdRef = useRef({ hover: false, focus: false, drag: false, until: 0 });

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  /** Width of one full set of pages (where the second copy starts). */
  const setWidth = () => {
    const el = scrollerRef.current;
    const copy = el?.querySelector<HTMLElement>("[data-copy-start]");
    const first = el?.querySelector<HTMLElement>("[data-page]");
    return copy && first ? copy.offsetLeft - first.offsetLeft : 0;
  };

  const holdForAWhile = () => {
    holdRef.current.until = performance.now() + IDLE_RESUME;
  };

  // Autoplay loop. Scroll position is kept as a float so slow speeds don't
  // get rounded away.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let pos = el.scrollLeft;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const hold = holdRef.current;
      const held = hold.hover || hold.focus || hold.drag || now < hold.until;
      // Follow any scrolling the user did.
      if (Math.abs(el.scrollLeft - pos) > 1) pos = el.scrollLeft;
      if (playingRef.current && !held) {
        pos += SPEED * dt;
        const width = setWidth();
        if (width && pos >= width) pos -= width;
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Keep manual scrolling looping too: past the first set, jump back.
  const onScroll = () => {
    const el = scrollerRef.current;
    const width = setWidth();
    if (el && width && el.scrollLeft >= width) el.scrollLeft -= width;
  };

  // Mouse drag with momentum (touch already scrolls natively).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = e.currentTarget;
    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    let lastX = e.clientX;
    let velocity = 0;
    holdRef.current.drag = true;
    el.setPointerCapture(e.pointerId);

    const move = (ev: PointerEvent) => {
      velocity = lastX - ev.clientX;
      lastX = ev.clientX;
      el.scrollLeft = startScroll - (ev.clientX - startX);
    };
    const up = () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      holdRef.current.drag = false;
      holdForAWhile();
      const glide = () => {
        if (Math.abs(velocity) < 0.5) return;
        el.scrollLeft += velocity;
        velocity *= FRICTION;
        holdForAWhile();
        requestAnimationFrame(glide);
      };
      requestAnimationFrame(glide);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
  };

  /** One page at a time; jumps a set ahead first if there's no room going back. */
  const step = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    const page = el?.querySelector<HTMLElement>("[data-page]");
    if (!el || !page) return;
    const gap = parseFloat(getComputedStyle(page.parentElement!).columnGap) || 0;
    const distance = page.offsetWidth + gap;
    if (direction === -1 && el.scrollLeft < distance) el.scrollLeft += setWidth();
    holdForAWhile();
    el.scrollBy({ left: direction * distance, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const hold = (key: "hover" | "focus", value: boolean) => {
    holdRef.current[key] = value;
    if (!value) holdForAWhile();
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerEnter={(e) => e.pointerType === "mouse" && hold("hover", true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && hold("hover", false)}
        onTouchStart={() => hold("hover", true)}
        onTouchEnd={() => hold("hover", false)}
        onWheel={holdForAWhile}
        onFocus={() => hold("focus", true)}
        onBlur={() => hold("focus", false)}
        className="cursor-grab overflow-x-auto overscroll-x-contain [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {/* Left padding lines the first page up with the content column. */}
        <div className="flex w-max gap-6 pr-(--gutter) pl-[calc(max(0px,(100vw-1512px)/2)+var(--gutter))]">
          {[0, 1].map((copy) =>
            images.map((page, i) => (
              <div
                key={`${copy}-${page.src}`}
                data-page
                data-copy-start={copy === 1 && i === 0 ? "" : undefined}
                aria-hidden={copy === 1 || undefined}
                className="h-60 shrink-0 overflow-hidden rounded-lg border border-text-primary md:h-100"
                style={{ aspectRatio: `${page.width} / ${page.height}` }}
              >
                <Image
                  src={page.src}
                  alt={copy === 1 ? "" : page.alt}
                  width={page.width}
                  height={page.height}
                  sizes="(min-width: 768px) 514px, 309px"
                  draggable={false}
                  className="block h-full w-full select-none"
                />
              </div>
            )),
          )}
        </div>
      </div>

      <Container>
        <CarouselControls
          hint={hint}
          playing={playing}
          onTogglePlay={() => setChoice(!playing)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      </Container>
    </div>
  );
}
