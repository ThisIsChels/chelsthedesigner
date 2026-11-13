import { MessagePage } from "@/components/layout/message-page";

// Figma frame `/[page]-comingSoon`. Any route that isn't built yet renders
// this at its own URL (e.g. /shop, /notes), so the nav keeps the right link
// underlined. Replace the route's page.tsx when the real page is ready.
export function ComingSoon() {
  return (
    <MessagePage>
      {/* Two lines as in Figma; screen readers hear "Coming soon". */}
      <h1 className="type-display-xl text-accent-primary">
        <span className="block">Coming</span> <span className="block">soon</span>
      </h1>
    </MessagePage>
  );
}
