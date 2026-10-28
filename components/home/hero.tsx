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

      <div className="relative z-10 mt-[calc(var(--name-h)*-1)] overflow-x-clip">
        <Container>
          <div className="relative aspect-[1256/1087]">
            {/* Full-bleed: breaks out of the container to the viewport edges. */}
            <div className="absolute bottom-0 left-[calc(50%-50vw)] h-[37.81%] w-screen">
              <Image src="/brand/hero-triangle.svg" alt="" fill loading="eager" />
            </div>

            <Image
              src="/brand/HeroAvatarImage(INCOMPLETE).png"
              alt={avatarAlt}
              width={860}
              height={1008}
              loading="eager"
              sizes="(min-width: 1512px) 860px, 68vw"
              className="absolute top-[7.27%] left-[13.46%] h-auto w-[68.47%]"
            />
          </div>
        </Container>
      </div>

      <div data-surface="base" className="relative z-10 bg-surface-base">
        {children}
      </div>
    </div>
  );
}
