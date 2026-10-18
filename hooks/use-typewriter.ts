"use client";

import { useEffect, useState } from "react";

// ---- Timing (ms). Tweak these to tune the feel. ----------------------------
/** Average time between typed characters. */
export const TYPE_SPEED_MS = 120;
/** Each typed character is ± up to this much faster/slower, so it feels human. */
export const TYPE_JITTER_MS = 50;
/** Average time between deleted characters (noticeably faster than typing). */
export const DELETE_SPEED_MS = 50;
export const DELETE_JITTER_MS = 15;
/** Blinking cursor on an empty line before the first character appears. */
export const START_DELAY_MS = 400;

// ---- Sequence -------------------------------------------------------------
// A sequence is a script of steps, played in order:
//   { type: "type", text: "porfo" }   add these characters one at a time
//   { type: "delete", count: 2 }      remove this many characters
//   { type: "pause", ms: 750 }        wait (the cursor blinks meanwhile)
export type TypewriterStep =
  | { type: "type"; text: string }
  | { type: "delete"; count: number }
  | { type: "pause"; ms: number };

/** The text a sequence ends on — what screen readers and repeat visits get. */
export function finalText(sequence: TypewriterStep[]): string {
  return sequence.reduce((text, step) => {
    if (step.type === "type") return text + step.text;
    if (step.type === "delete") return text.slice(0, -step.count);
    return text;
  }, "");
}

// A "frame" is one visible state: wait `delay` ms, then show `text`.
// `busy` is true for frames produced by typing/deleting, false for pauses.
// While waiting for a frame, the cursor is solid if that frame is busy and
// blinks if it's a pause.
type Frame = { text: string; delay: number; busy: boolean };

const jitter = (base: number, spread: number) => base + (Math.random() * 2 - 1) * spread;

function toFrames(sequence: TypewriterStep[]): Frame[] {
  const frames: Frame[] = [
    { text: "", delay: 0, busy: false }, // empty line right away
    { text: "", delay: START_DELAY_MS, busy: false }, // cursor blinks before typing
  ];
  let text = "";
  for (const step of sequence) {
    if (step.type === "type") {
      for (const char of step.text) {
        text += char;
        frames.push({ text, delay: jitter(TYPE_SPEED_MS, TYPE_JITTER_MS), busy: true });
      }
    } else if (step.type === "delete") {
      for (let i = 0; i < step.count; i++) {
        text = text.slice(0, -1);
        frames.push({ text, delay: jitter(DELETE_SPEED_MS, DELETE_JITTER_MS), busy: true });
      }
    } else {
      frames.push({ text, delay: step.ms, busy: false });
    }
  }
  return frames;
}

function alreadyPlayed(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === "played";
  } catch {
    return false; // storage blocked (private mode etc.) → just play it
  }
}

function markPlayed(key: string) {
  try {
    sessionStorage.setItem(key, "played");
  } catch {
    // ignore — worst case it plays again
  }
}

type TypewriterState = {
  /** What's visibly typed right now. */
  text: string;
  /** True while typing/deleting → cursor solid instead of blinking. */
  busy: boolean;
  /** False when the animation was skipped (repeat visit / reduced motion). */
  animated: boolean;
};

/**
 * Plays a typewriter sequence.
 * - No `storageKey`: plays on every page load.
 * - With a `storageKey` (unique per use, e.g. "typewriter:portfolio"): plays
 *   once per browser session, then shows the final text statically.
 */
export function useTypewriter(sequence: TypewriterStep[], storageKey?: string): TypewriterState {
  // Start empty on both server and client so hydration matches; the
  // effect below decides whether to animate or jump to the end.
  const [state, setState] = useState<TypewriterState>({ text: "", busy: false, animated: true });

  useEffect(() => {
    // Only one timer is ever pending, so cleanup only needs this one id.
    // Every state update happens inside a timer callback, never directly in
    // the effect body — React discourages synchronous setState in effects.
    let timer: ReturnType<typeof setTimeout>;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || (storageKey && alreadyPlayed(storageKey))) {
      timer = setTimeout(() => setState({ text: finalText(sequence), busy: false, animated: false }), 0);
      return () => clearTimeout(timer);
    }

    const frames = toFrames(sequence);

    // Show frame i, then wait for the next frame's delay and recurse.
    // Chaining timeouts (instead of scheduling them all up front) means only
    // one timer is pending at a time and each delay can be its own random
    // value. While waiting, the cursor reflects what's coming next.
    const play = (i: number) => {
      const next = frames[i + 1];
      setState({ text: frames[i].text, busy: next?.busy ?? false, animated: true });
      if (!next) {
        if (storageKey) markPlayed(storageKey); // finished → don't replay this session
        return;
      }
      timer = setTimeout(() => play(i + 1), next.delay);
    };
    // Frame 0 is the empty line we're already showing, so start by waiting
    // for frame 1.
    timer = setTimeout(() => play(1), frames[1].delay);

    // Runs on unmount (e.g. navigating away mid-animation) → nothing leaks.
    return () => clearTimeout(timer);
  }, [sequence, storageKey]);

  return state;
}
