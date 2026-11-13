import type { Metadata } from "next";
import { MessagePage } from "@/components/layout/message-page";
import { Button } from "@/components/ui/button";

// Figma frame `/not-found`. Next.js shows this for any URL that doesn't match
// a page (and when a page calls notFound()).
export const metadata: Metadata = {
  title: "Page not found · Chelsey LaPointe",
};

export default function NotFound() {
  return (
    <MessagePage>
      <div className="flex flex-col items-center gap-8">
        {/* One heading so screen readers hear "404, Page not found". */}
        <h1 className="flex flex-col items-center gap-6">
          <span className="type-display-xl text-accent-primary">404</span>
          <span className="type-heading-lg uppercase">Page not found</span>
        </h1>
        {/* Not in the Figma frame; added so a dead link has a way back. */}
        <Button href="/">BACK TO HOME</Button>
      </div>
    </MessagePage>
  );
}
