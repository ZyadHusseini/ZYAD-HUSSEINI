/**
 * The intro plays once per browser session. sessionStorage survives reloads
 * within the session; the module flag is the fallback if storage is blocked.
 */
let memoryFlag = false;
const KEY = "zh-intro-played";

export function hasIntroPlayed(): boolean {
  try {
    return memoryFlag || sessionStorage.getItem(KEY) === "1";
  } catch {
    return memoryFlag;
  }
}

export function markIntroPlayed(): void {
  memoryFlag = true;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage blocked — memory flag already set */
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
