import { companies } from "../data/content";

/**
 * Continuous logo strip under the companies carousel.
 *
 * The list is rendered twice and the track translates by exactly -50%, so the
 * second copy lands where the first started and the loop is seamless. Anything
 * other than an exact 50% on a duplicated list shows a visible jump.
 *
 * Only six of the twelve marks could be sourced, so entries without a logo file
 * render as a wordmark instead of leaving a hole. That keeps the strip complete
 * today and makes adding a real logo a one-line change.
 */
export default function LogoMarquee() {
  // Duplicated for the wrap. The copy is aria-hidden so screen readers and
  // crawlers see each company once, not twice.
  const track = [...companies, ...companies];

  return (
    <section aria-labelledby="logo-strip-heading" className="relative bg-bg-secondary pb-24 md:pb-32">
      <h2 id="logo-strip-heading" className="sr-only">
        Companies Zyad Husseini has worked with
      </h2>

      <div className="mx-auto max-w-6xl px-6">
        <div
          className="group relative overflow-hidden py-10"
          // Fade the strip into the background at both ends so logos enter and
          // leave rather than being cut off mid-mark.
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {/*
            Pauses on hover and on keyboard focus so a visitor can actually read
            or click a mark. Under prefers-reduced-motion the animation is off
            entirely and the strip becomes a static wrapped row — a continuously
            moving band is exactly what that preference exists to stop.
          */}
          {/*
            Spacing is a symmetric margin on each item rather than `gap` on the
            row. With `gap`, 24 items have 23 gaps, so half the track width is
            half a gap short of where the duplicate actually starts and the loop
            jumps by that amount on every wrap. Giving every item the same
            left/right margin makes each one occupy an identical slot, so 50%
            of the track is exactly one copy.
          */}
          <ul className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-8">
            {track.map((company, i) => {
              const isClone = i >= companies.length;
              const content = company.logo ? (
                <img
                  src={company.logo}
                  alt={isClone ? "" : company.name}
                  loading="lazy"
                  decoding="async"
                  // brightness-0 then invert forces every mark to flat white
                  // regardless of its own colours, which is what keeps a strip
                  // of unrelated logos looking like one set on a dark ground.
                  // Resting opacity is 75%: several of these marks are thin
                  // line work and drop below legible on #12121a much under that.
                  className="h-9 w-auto max-w-[9rem] object-contain opacity-75 brightness-0 invert transition-opacity duration-300 hover:opacity-100 md:h-11"
                />
              ) : (
                <span className="whitespace-nowrap text-xl font-bold tracking-tight text-slate-500 transition-colors duration-300 hover:text-slate-200 md:text-2xl">
                  {company.name}
                </span>
              );

              return (
                <li
                  key={`${company.name}-${i}`}
                  aria-hidden={isClone || undefined}
                  className="mx-8 flex shrink-0 items-center justify-center"
                >
                  {company.url ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={isClone ? undefined : `${company.name} (opens in a new tab)`}
                      tabIndex={isClone ? -1 : undefined}
                      className="flex items-center"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
