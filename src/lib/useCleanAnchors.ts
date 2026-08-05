import { useEffect } from "react";

/**
 * Keeps the address bar clean on a single-page site.
 *
 * Anchor links are how the nav works, but letting the browser handle them
 * leaves "/#about" — or worse, a meaningless "/#top" — sitting in the URL for
 * the rest of the visit. This intercepts in-page anchor clicks, scrolls to the
 * section itself, and leaves the URL at "/".
 *
 * Deep links still work: arriving at /#projects scrolls to that section, then
 * tidies the URL once it has served its purpose.
 *
 * Modifier-clicks, middle-clicks and target="_blank" are left alone so
 * "open in new tab" keeps working.
 */
export function useCleanAnchors() {
  useEffect(() => {
    // Scroll behaviour is deliberately not passed here. Omitting it defers to
    // the CSS `scroll-behavior` on <html>, which index.css already sets to
    // smooth and flips to auto under prefers-reduced-motion — one source of
    // truth instead of the same rule expressed twice.

    /** Move focus to the section so keyboard and screen-reader users follow the jump. */
    const focusTarget = (el: HTMLElement) => {
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };

    const scrollToId = (id: string) => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ block: "start" });
      focusTarget(target);
      return true;
    };

    const stripHash = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Root link (the logo): scroll home instead of reloading the document.
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0 });
        stripHash();
        return;
      }

      if (!href.startsWith("#") || href === "#") return;

      const id = decodeURIComponent(href.slice(1));
      if (scrollToId(id)) {
        e.preventDefault();
        stripHash();
      }
    };

    document.addEventListener("click", onClick);

    /** Honour a deep link, then clean up after it. */
    const consumeHash = (delay: number) =>
      setTimeout(() => {
        const hash = window.location.hash.slice(1);
        if (hash) scrollToId(decodeURIComponent(hash));
        stripHash();
      }, delay);

    // On load the section may not be laid out yet, so give it a beat.
    let timer = consumeHash(window.location.hash ? 100 : 0);

    // A hash can also arrive without a reload — pasted into the address bar, or
    // from browser history. Same-document navigation does not remount, so this
    // needs its own listener.
    const onHashChange = () => {
      clearTimeout(timer);
      timer = consumeHash(0);
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
      clearTimeout(timer);
    };
  }, []);
}
