import Image from "next/image";
import { Container } from "@/components/layout/container";

// Figma frame `/home-top`, below the nav (the page renders the nav).
//
// Scroll effect: the name graphic is `sticky`, so once it reaches the middle
// of the screen it stays put. The avatar, the triangle and everything passed
// as `children` sit on a higher layer and scroll up over it. The Cararra
// background on `children` is what covers the name.
//
// `data-surface` tells the pinned nav which colors to use (see SiteHeader).
//
// --name-h is the name graphic's rendered height (content width × 660/1256).
// `cqw` measures this wrapper's width, which is why it's an @container.
// --name-top is where the name starts on load: the resting header height
// (barHeight in components/layout/nav-sizes.ts) + this wrapper's top padding. Sticking at min(center, start) stops
// the name from jumping down on short screens (phones), where it already
// starts above the center.
//
// The "stage" box keeps the Figma proportions (1256 × 1087: name graphic +
// space below it), so the triangle and avatar line up with the name at every
// width. Percentages are the Figma positions divided by that box.

type HeroProps = { avatarAlt: string; children: React.ReactNode };

export function Hero({ avatarAlt, children }: HeroProps) {
  return (
    <div data-surface="inverse" className="@container bg-surface-inverse pt-12 [--name-h:calc((min(100cqw,1512px)-2*var(--gutter))*660/1256)] [--name-top:160px] md:pt-16 md:[--name-top:208px] lg:pt-24 lg:[--name-top:240px]">
      <Container className="sticky top-[min(calc(50svh-var(--name-h)/2),var(--name-top))]">
        <h1>
          <Image
            src="/brand/name-bg.svg"
            alt="Chelsey LaPointe"
            width={1256}
            height={660}
            preload
            className="h-auto w-full"
          />
        </h1>
      </Container>

      {/* z-20: the avatar sits above the Cararra content so the back sneaker
          can hang into its top padding. Nothing here may clip (no overflow
          rules): Safari can cut the sneaker off even with overflow-x only.
          This wrapper is exactly as tall as the stage, so the full-width
          triangle is placed on it instead of breaking out of the container. */}
      <div className="relative z-20 mt-[calc(var(--name-h)*-1)]">
        <div className="absolute inset-x-0 bottom-0 h-[37.81%]">
          <Image src="/brand/hero-triangle.svg" alt="" fill loading="eager" />
        </div>

        <Container>
          <div className="relative aspect-[1256/1087]">

            {/* Seated on the triangle: the seat (where the legs split, at
                570 × 775 in the 1070 × 1545 image) sits just below the
                triangle's peak (49.05% across, 62.19% down the stage) so the
                peak is hidden in her lap. The back sneaker hangs 124/1256 of
                the stage width past the bottom; the Cararra content below
                starts with that much extra top padding (124/660 ≈ 0.188 of --name-h). */}
            <Image
              src="/brand/hero-avatar.png"
              alt={avatarAlt}
              width={1070}
              height={1545}
              loading="eager"
              sizes="(min-width: 1512px) 700px, 56vw"
              className="pointer-events-none absolute top-[18.7%] left-[19.46%] h-auto w-[55.57%]"
            />
          </div>
        </Container>
      </div>

      <div data-surface="base" className="relative z-10 bg-surface-base pt-[calc(var(--name-h)*0.188)]">
        {children}
      </div>
    </div>
  );
}
