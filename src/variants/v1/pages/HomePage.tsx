import { Link } from 'react-router-dom';
import { ArrowUpRight, Gauge, Compass, Sparkles, Plus } from 'lucide-react';
import {
  PRACTICE_CONFIG,
  CORE_VALUE_PILLARS,
  TIPPING_POINTS,
  CLIENT_POPULATIONS,
  FAQS,
} from '../data/siteContent';

export function HomePage() {
  return (
    <div>
      {/* Hero Section — Target 5-second impression: "This guy's different." */}
      <section className="border-b border-[var(--border-hairline)] ds-section">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)] border border-[var(--border-hairline)] bg-[var(--surface-card)] px-3 py-1.5 rounded-sm">
              <span>00 // ONLINE THERAPY IN MASSACHUSETTS</span>
            </div>

            <h1 className="heading-display font-bold tracking-tight text-[var(--ink-primary)]">
              You’re actually good at what you do.{' '}
              <span className="font-editorial italic font-normal text-[var(--ink-secondary)]">
                You just struggle to believe it.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
              I help high-achievers spinning on the broken record of imposter
              syndrome—especially those with narcissistic or abusive parents—stop
              cycles of people-pleasing and emerge into a life that truly belongs
              to them.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={PRACTICE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="v1-btn-primary"
              >
                <span>Schedule a Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                to="/v1/about"
                className="v1-btn-secondary"
              >
                <span>Why “I Was an Imposter, Too”</span>
              </Link>
            </div>
          </div>

          {/* Functional Specification Card (Braun telemetry aesthetic) */}
          <aside
            aria-label="Practice Specifications"
            className="lg:col-span-4 ds-card border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 space-y-5 reveal-on-scroll"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
              <span className="font-technical text-xs uppercase tracking-widest text-[var(--ink-muted)]">
                PRACTICE SPEC // JFT-2026
              </span>
              <span className="font-technical text-xs text-[var(--accent-signal)] font-medium">
                ACTIVE
              </span>
            </div>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between py-1.5 border-b border-[var(--border-hairline)]">
                <dt className="font-technical text-xs uppercase text-[var(--ink-muted)]">
                  Format
                </dt>
                <dd className="font-medium text-right">
                  100% Virtual (MA Telehealth)
                </dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-hairline)]">
                <dt className="font-technical text-xs uppercase text-[var(--ink-muted)]">
                  Session Cadence
                </dt>
                <dd className="font-medium text-right">
                  55-Minute Individual
                </dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[var(--border-hairline)]">
                <dt className="font-technical text-xs uppercase text-[var(--ink-muted)]">
                  Standard Rate
                </dt>
                <dd className="font-medium text-right">
                  ${PRACTICE_CONFIG.sessionFee} · Superbills & Mentaya OON
                </dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt className="font-technical text-xs uppercase text-[var(--ink-muted)]">
                  Openings
                </dt>
                <dd className="font-medium text-right">
                  Immediate · Mon–Thu
                </dd>
              </div>
            </dl>

            <blockquote className="pt-2 border-t border-[var(--border-hairline)] text-xs text-[var(--ink-secondary)] italic">
              “Pressure doesn’t just make diamonds. It cracks them, too.”
            </blockquote>
          </aside>
        </div>
      </section>

      {/* Section 01: The Tipping Point */}
      <section className="border-b border-[var(--border-hairline)] ds-section">
        <div className="ds-container space-y-10">
          <div className="max-w-3xl space-y-3 reveal-on-scroll">
            <p className="font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              01 // THE TIPPING POINT
            </p>
            <h2 className="heading-section font-bold">
              When the “a-ha” moment collides with the “oh, fuck” moment.
            </h2>
            <p className="text-[var(--ink-secondary)]">
              Most people don’t book a therapy consultation when things are mildly
              annoying. They reach out when a familiar pattern finally hits the
              wall:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 ds-grid-gap">
            {TIPPING_POINTS.map((item) => (
              <article
                key={item.category}
                className="ds-card border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 sm:p-8 flex flex-col justify-between space-y-4 reveal-on-scroll"
              >
                <div className="space-y-3">
                  <p className="font-technical text-xs uppercase tracking-widest text-[var(--ink-muted)]">
                    {item.category}
                  </p>
                  <p className="text-base sm:text-lg font-medium leading-snug">
                    {item.quote}
                  </p>
                </div>
                <p className="text-xs font-technical text-[var(--ink-secondary)] pt-3 border-t border-[var(--border-hairline)]">
                  → {item.context}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 02: The Autocross Metaphor (Living at the Limit without Spinning Out) */}
      <section className="border-b border-[var(--border-hairline)] bg-[var(--surface-dark)] text-[var(--surface-dark-ink)] ds-section">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-center">
          <div className="lg:col-span-7 space-y-5 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              <Gauge className="w-4 h-4" aria-hidden="true" />
              <span>02 // THE AUTOCROSS PRINCIPLE: GRIP VS. SPINOUT</span>
            </div>
            <h2 className="heading-section font-bold">
              What if you could live life <em className="font-editorial">at</em>{' '}
              or <em className="font-editorial">near</em> the limit—instead of
              constantly trying to push past it?
            </h2>
            <p className="text-[var(--surface-dark-muted)] leading-relaxed">
              The tires on a race car only have so much grip. Just before they
              lose that grip, they tell you—you’ll hear them start to{' '}
              <strong className="text-[var(--surface-dark-ink)]">chirp</strong>. Chances are, that’s
              where you are right now, and it’s a frightening place. You’re
              afraid you’re going to lose grip completely and spin out.
            </p>
            <p className="text-[var(--surface-dark-muted)] leading-relaxed">
              Does that mean settling for limitations?{' '}
              <strong className="text-[var(--surface-dark-ink)]">Absolutely not.</strong> It’s that
              very chirping of the tires that tells an autocross driver where the
              limit is—and knowing that limit is what gets them around the track{' '}
              <em>faster</em>. Developing that awareness so you can set real
              boundaries without burning out is what we do together.
            </p>
          </div>

          <div className="lg:col-span-5 ds-card border-[var(--surface-dark-ink)]/15 bg-[var(--surface-dark-ink)]/5 p-6 sm:p-8 space-y-4 reveal-on-scroll">
            <p className="font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              BOUNDARY TELEMETRY // 3 QUESTIONS
            </p>
            <p className="text-sm text-[var(--surface-dark-muted)]">
              Imagine establishing one genuine boundary in your life right now.
              Ask yourself:
            </p>
            <ol className="space-y-3 text-sm sm:text-base font-medium">
              <li className="border-l-2 border-[var(--accent-signal)] pl-3">
                1. What would I finally be able to accomplish?
              </li>
              <li className="border-l-2 border-[var(--accent-signal)] pl-3">
                2. What would it feel like if I wrote the story of my own life?
              </li>
              <li className="border-l-2 border-[var(--accent-signal)] pl-3">
                3. Who could I connect with more fully and deeply?
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Section 03: Why Private-Pay / Value Proposition */}
      <section className="border-b border-[var(--border-hairline)] ds-section">
        <div className="ds-container space-y-10">
          <div className="max-w-3xl space-y-3 reveal-on-scroll">
            <p className="font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              03 // WHY STEP OUTSIDE INSURANCE PANELS
            </p>
            <h2 className="heading-section font-bold">
              What you get here that an in-network checklist won’t give you.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 ds-grid-gap">
            {CORE_VALUE_PILLARS.map((pillar) => (
              <article
                key={pillar.index}
                className="ds-card border-[var(--border-hairline)] bg-[var(--surface-bg)] p-6 sm:p-8 space-y-4 reveal-on-scroll"
              >
                <div className="flex items-center justify-between font-technical text-xs text-[var(--ink-muted)] border-b border-[var(--border-hairline)] pb-3">
                  <span>PILLAR {pillar.index}</span>
                  <span>{pillar.label}</span>
                </div>
                <h3 className="text-xl font-bold">{pillar.title}</h3>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: Populations Served */}
      <section className="border-b border-[var(--border-hairline)] ds-section">
        <div className="ds-container space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4 reveal-on-scroll">
            <div className="max-w-2xl space-y-3">
              <p className="font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
                04 // SPECIALIZED POPULATIONS
              </p>
              <h2 className="heading-section font-bold">
                Built for people under high performance pressure.
              </h2>
            </div>
            <Link
              to="/v1/aviation-professionals"
              className="inline-flex items-center gap-1.5 font-technical text-xs uppercase tracking-wider text-[var(--accent-signal)] hover:underline"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Explore Dedicated Aviation Briefing →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 ds-grid-gap">
            {CLIENT_POPULATIONS.map((pop) => (
              <article
                key={pop.id}
                className="ds-card border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-3 reveal-on-scroll"
              >
                <p className="font-technical text-xs uppercase tracking-wider text-[var(--accent-signal)]">
                  {pop.subtitle}
                </p>
                <h3 className="text-xl font-bold">{pop.title}</h3>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                  {pop.summary}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 05: Addressing Primary Hesitations (Native Exclusive <details> Accordion) */}
      <section className="ds-section">
        <div className="max-w-[min(56rem,var(--ds-page-max-width))] mx-auto space-y-8 reveal-on-scroll">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>05 // CANDID ANSWERS TO REAL HESITATIONS</span>
            </div>
            <h2 className="heading-section font-bold">
              What you’re probably wondering before you book.
            </h2>
          </div>

          <div className="divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)]">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                name="home-faq"
                className="group py-5"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer font-semibold text-base sm:text-lg select-none">
                  <span>{faq.question}</span>
                  <Plus
                    className="w-5 h-5 shrink-0 text-[var(--accent-signal)] transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed pr-8">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
