import { useEffect, useState } from "react";

const DEFAULT_PHRASES = [
  "AUTOMATION LAYER",
  "WEBSITE DESIGN",
  "CUSTOM WEB APPS",
  "WORKFLOW SYSTEMS",
  "AI INTEGRATIONS",
] as const;

type TypewriterProps = {
  phrases?: readonly string[];
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
  className?: string;
};

export function Typewriter({
  phrases = DEFAULT_PHRASES,
  typingMs = 70,
  deletingMs = 40,
  holdMs = 1800,
  className,
}: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) {
      setText(phrases[0] ?? "");
      return;
    }

    const full = phrases[phraseIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === full) {
      timeout = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    } else {
      const nextLen = text.length + (deleting ? -1 : 1);
      timeout = setTimeout(
        () => setText(full.slice(0, nextLen)),
        deleting ? deletingMs : typingMs,
      );
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    deleting,
    phraseIndex,
    phrases,
    typingMs,
    deletingMs,
    holdMs,
    reducedMotion,
  ]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {reducedMotion ? (phrases[0] ?? "") : text}
      {!reducedMotion && (
        <span
          className="ml-1 inline-block w-[0.08em] translate-y-[0.05em] bg-primary align-baseline typewriter-caret"
          aria-hidden="true"
          style={{ height: "0.9em" }}
        />
      )}
    </span>
  );
}
