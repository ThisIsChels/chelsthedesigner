import { IconButton } from "@/components/ui/icon-button";

// Figma component `carousel-controls` (State=playing / paused): pause/play
// toggle and a hint on the left, previous / next page on the right.
type CarouselControlsProps = {
  hint: string;
  playing: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function CarouselControls({ hint, playing, onTogglePlay, onPrev, onNext }: CarouselControlsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? "Pause scrolling" : "Play scrolling"}
          className="group"
        >
          <IconButton icon={playing ? "pause" : "play"} />
        </button>
        <p className="type-body">{hint}</p>
      </div>
      <div className="flex shrink-0 gap-3">
        <button type="button" onClick={onPrev} aria-label="Previous page" className="group">
          <IconButton icon="left" />
        </button>
        <button type="button" onClick={onNext} aria-label="Next page" className="group">
          <IconButton icon="right" />
        </button>
      </div>
    </div>
  );
}
