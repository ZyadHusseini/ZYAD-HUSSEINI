import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { faqs } from "../data/content";


/**
 * Every answer stays in the DOM whether open or closed, collapsed by a CSS
 * grid transition rather than removed. Conditionally rendering them, or hiding
 * with `display: none`, would take the text out of the HTML — and that text is
 * the whole point of the section, both for the FAQPage markup and for the
 * assistant crawlers that read the page without executing much of it.
 */
export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div
        className="ambient animate-drift-c absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="Common Questions" title="About Zyad" />

        <dl className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question}>
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-white"
                  >
                    <span className="text-base font-semibold text-slate-200 md:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-indigo-400" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </dt>
                {/*
                  Kept mounted rather than conditionally rendered: the answer
                  text has to exist in the HTML for crawlers and for the
                  FAQPage markup's visible-content requirement.

                  Collapsed with a grid 0fr -> 1fr transition rather than an
                  animated height. Animating height writes an inline pixel
                  value, and if that animation is ever interrupted — a tab
                  backgrounded mid-open, a late font swap — the answer is left
                  frozen at a stale height with its text clipped. 1fr always
                  resolves to whatever the content actually needs.
                */}
                <dd
                  id={`faq-answer-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="pb-6 pr-10 leading-relaxed text-slate-400">{faq.answer}</p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
