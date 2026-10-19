import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

// [PLACEHOLDER: notes page] — shows the coming-soon page until notes are built.
export const metadata: Metadata = {
  title: "Notes — coming soon · Chelsey LaPointe",
  description: "Notes from Chelsey LaPointe. Coming soon.",
};

export default function NotesPage() {
  return <ComingSoon />;
}
