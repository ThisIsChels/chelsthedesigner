"use client";

import { useEffect } from "react";

// DEV ONLY — outlines unfinished content in red so it's easy to spot:
// any text containing "Lorem ipsum dolor" or "[PLACEHOLDER", grey <ImagePlaceholder />
// boxes, and the incomplete hero avatar. The red disappears on its own once
// the real copy/image is in. Rendered from app/layout.tsx in development only;
// delete this file and that line before launch.

// "dolor" so the real artwork titled "Lorem Ipsum" (Digital Illustrations) isn't flagged.
const TEXT_MATCH = /lorem ipsum dolor|\[PLACEHOLDER/i;
const IMG_MATCH = /INCOMPLETE/;
const MARK = "data-placeholder-mark";

function scan() {
  document.querySelectorAll(`[${MARK}]`).forEach((el) => el.removeAttribute(MARK));

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (TEXT_MATCH.test(node.textContent ?? "")) node.parentElement?.setAttribute(MARK, "");
  }
  document.querySelectorAll("img").forEach((img) => {
    if (IMG_MATCH.test(decodeURIComponent(img.src))) img.setAttribute(MARK, "");
  });
}

export function PlaceholderHighlight() {
  useEffect(() => {
    scan();
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        observer.disconnect();
        scan();
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <style>{`
      [${MARK}] {
        outline: 3px solid #ff0000 !important;
        outline-offset: 2px;
        background-color: rgb(255 0 0 / 0.15) !important;
        color: #d00000 !important;
      }
    `}</style>
  );
}
