import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

// [PLACEHOLDER: shop page] — shows the coming-soon page until the shop is built.
export const metadata: Metadata = {
  title: "Shop — coming soon · Chelsey LaPointe",
  description: "Prints and art by Chelsey LaPointe. Coming soon.",
};

export default function ShopPage() {
  return <ComingSoon />;
}
