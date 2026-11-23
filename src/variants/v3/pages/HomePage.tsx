import { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import {
  FLETCHER_SPECIALTIES_LEFT,
  FLETCHER_SPECIALTIES_RIGHT,
  METHOD_PILLARS,
  PRACTICE_CONFIG,
  TIPPING_POINTS,
  V3_HOME_FAQS,
} from '../data/siteContent';
import { BLOG_POSTS } from '../../v2/data/blogPosts';
import { FletcherFaqAccordion } from '../components/FletcherFaqAccordion';
import type { V3OutletContext } from '../V3Layout';
import { assetUrl } from '../../../lib/assetUrl';

export function HomePage() {
  const { ambientMotion } = useOutletContext<V3OutletContext>();
  const [userPaused, setUserPaused] = useState(false);
  const [autocrossView, setAutocrossView] = useState<'car' | 'track'>('car');
  const [featureTab, setFeatureTab] = useState<'autocross' | 'aviation'>('autocross');
  const [activeTippingIdx, setActiveTippingIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setUserPaused(true);
    }
  }, []);

  const isMotionPaused = userPaused || !ambientMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    if (isMotionPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [isMotionPaused]);

  const currentTipping = TIPPING_POINTS[activeTippingIdx];

  return (
    <div className="overflow-x-clip">
      {/* BAND 1 — Full-Bleed Atmospheric Video Hero + Fletcher 3-Column Bottom Ledger */}
      <section className="fletcher-band-black relative min-h-[92svh] flex flex-col justify-end pt-28 sm:pt-36">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <video
            ref={videoRef}
            src={assetUrl('media/vinyl-spin.mp4')}
            poster={assetUrl('media/vinyl-turntable.jpg')}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => {
              const video = videoRef.current;
              if (!video || isMotionPaused) return;
              video.defaultMuted = true;
              video.muted = true;
              video.play().catch(() => {});
            }}
            className="w-full h-full object-cover opacity-55"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, color-mix(in oklab, var(--fletcher-pine) 72%, transparent) 0%, color-mix(in oklab, var(--fletcher-pine) 35%, transparent) 42%, var(--fletcher-pine) 98%)',
            }}
          />
        </div>

        <div
          className="relative z-10 w-full pb-12 sm:pb-16 pt-24 sm:pt-36"
          style={{ paddingInline: 'clamp(1.25rem, 4vw, var(--ds-site-margin, 3rem))' }}
        >
          <div className="ds-container space-y-8">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setUserPaused((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--fletcher-border-dark)] bg-[var(--fletcher-pine)]/75 px-3.5 py-1.5 fletcher-meta text-xs text-[var(--fletcher-on-pine)] hover:border-[var(--fletcher-on-pine)] transition-colors cursor-pointer"
              >
                {isMotionPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Play backdrop</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pause backdrop</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 ds-grid-gap items-end border-t border-[var(--fletcher-border-dark)] pt-8">
              <div className="md:col-span-3 space-y-1 text-sm sm:text-base text-[var(--fletcher-on-pine-muted)]">
                <p className="text-[var(--fletcher-on-pine)] font-medium">
                  Online Across Massachusetts
                </p>
                <p>LMHC #{PRACTICE_CONFIG.licenseNumber} · Mon–Thu Openings</p>
              </div>

              <div className="md:col-span-5 space-y-1 text-sm sm:text-base text-[var(--fletcher-on-pine-muted)]">
                <p>
                  <a
                    href={`mailto:${PRACTICE_CONFIG.email}`}
                    className="text-[var(--fletcher-on-pine)] hover:opacity-80 underline underline-offset-4 break-words"
                  >
                    jonathan@<wbr />jonathanfarrtherapy.com
                  </a>
                </p>
                <p>
                  <a
                    href={PRACTICE_CONFIG.phoneHref}
                    className="hover:text-[var(--fletcher-on-pine)] transition-colors"
                  >
                    {PRACTICE_CONFIG.phone}
                  </a>
                </p>
              </div>

              <div className="md:col-span-4">
                <p className="fletcher-lead text-[var(--fletcher-on-pine)]">
                  Online therapy for high-achievers spinning on the broken
                  record of imposter syndrome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 2 — Seamless Dark Asymmetric Manifesto & 2-Column Specialties Ledger */}
      <section className="fletcher-band-black ds-section border-t border-[var(--fletcher-border-dark)]">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap">
          <div className="lg:col-span-9 reveal-on-scroll">
            <h1 className="fletcher-h1 text-[var(--fletcher-on-pine)]">
              You’re actually good at what you do.
            </h1>
          </div>

          <div className="lg:col-start-5 lg:col-span-8 pt-6 sm:pt-12 space-y-8 reveal-on-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 ds-grid-gap text-base sm:text-lg leading-relaxed">
              <div className="space-y-4">
                <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
                  Who I Work With
                </p>
                <ul className="space-y-2 list-none p-0 m-0 text-[var(--fletcher-on-pine)]">
                  {FLETCHER_SPECIALTIES_LEFT.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 sm:pt-7">
                <ul className="space-y-2 list-none p-0 m-0 text-[var(--fletcher-on-pine)]">
                  {FLETCHER_SPECIALTIES_RIGHT.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                to="/v3/services"
                className="inline-flex items-center gap-2 text-sm text-[var(--fletcher-on-pine)] underline underline-offset-8 hover:opacity-80 transition-opacity"
              >
                <span>Explore Services &amp; Rates (${PRACTICE_CONFIG.sessionFee})</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/v3/aviation-professionals"
                className="inline-flex items-center gap-2 text-sm text-[var(--fletcher-on-pine-muted)] underline underline-offset-8 hover:text-[var(--fletcher-on-pine)] transition-colors"
              >
                <span>Aviation &amp; FAA Briefing</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 3 — Full-Bleed 50/50 Editorial Split (Fletcher Section 2 Cadence) */}
      <section className="fletcher-band-white fletcher-split-50">
        <div className="relative overflow-hidden bg-[var(--fletcher-pine)] min-h-[24rem] lg:min-h-full">
          <img
            src={assetUrl('media/jonathan-hero.jpg')}
            alt="Jonathan Farr, LMHC, smiling in a blue sweater and striped tie"
            width={1066}
            height={1600}
            {...({ fetchpriority: 'high' } as Record<string, string>)}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="flex items-center justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
          <div className="max-w-lg space-y-6 reveal-on-scroll">
            <h2 className="fletcher-h2 text-[var(--fletcher-pine)]">
              A grounded space for high-achievers
            </h2>
            <p className="text-base sm:text-lg text-[var(--fletcher-pine)]/85 leading-relaxed">
              You struggle to believe the proof of your own competence. Together,
              we work outside insurance-panel interference—helping you step out
              of perfectionism, people-pleasing, and inherited family cycles into
              a life that truly belongs to you.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-5">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fletcher-btn-primary"
              >
                <span>Make an Appointment</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                to="/v3/about"
                className="text-sm font-medium text-[var(--fletcher-pine)] underline underline-offset-8 hover:text-[var(--fletcher-rust)] transition-colors"
              >
                Why “I Was an Imposter, Too” →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 4 — 50/50 Editorial Quote Left & Seated Studio Portrait Right */}
      <section className="fletcher-band-white fletcher-split-50 border-t border-[var(--fletcher-border)]">
        <div className="order-2 md:order-1 flex items-center justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
          <div className="max-w-lg text-center space-y-5 reveal-on-scroll">
            <blockquote className="fletcher-display fletcher-h3 text-[var(--fletcher-pine)]">
              “Pressure doesn’t just make diamonds. It cracks them, too.”
            </blockquote>
            <p className="fletcher-meta text-sm uppercase tracking-widest text-[var(--fletcher-cypress)]">
              Jonathan Farr, LMHC
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 relative overflow-hidden bg-[var(--fletcher-mist-alt)] min-h-[24rem] md:min-h-full">
          <img
            src={assetUrl('media/jonathan-seated.jpg')}
            alt="Jonathan Farr seated casually in a studio chair wearing plaid shirt and boots"
            width={1066}
            height={1600}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* BAND 5 — Slate Cypress Method Pillars & Limit / Aviation Interactive Showcase */}
      <section className="fletcher-band-dark ds-section">
        <div className="ds-container space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 ds-grid-gap border-b border-[var(--fletcher-border-dark)] pb-12 reveal-on-scroll">
            {METHOD_PILLARS.map((pillar, idx) => (
              <article key={pillar.id} className="space-y-3">
                <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
                  0{idx + 1} · {pillar.kicker}
                </p>
                <h2 className="fletcher-h4 text-[var(--fletcher-on-cypress)]">
                  {pillar.title}
                </h2>
                <p className="text-sm sm:text-base text-[var(--fletcher-on-cypress-muted)] leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-center">
            <div className="lg:col-span-5 space-y-6 reveal-on-scroll">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFeatureTab('autocross')}
                  className={`rounded-full px-4 py-1.5 fletcher-meta text-xs border transition-colors cursor-pointer ${
                    featureTab === 'autocross'
                      ? 'bg-[var(--fletcher-on-cypress)] text-[var(--fletcher-pine)] border-[var(--fletcher-on-cypress)]'
                      : 'border-[var(--fletcher-border-dark)] text-[var(--fletcher-on-cypress)] hover:border-[var(--fletcher-on-cypress)]'
                  }`}
                >
                  At the Limit · Autocross
                </button>
                <button
                  type="button"
                  onClick={() => setFeatureTab('aviation')}
                  className={`rounded-full px-4 py-1.5 fletcher-meta text-xs border transition-colors cursor-pointer ${
                    featureTab === 'aviation'
                      ? 'bg-[var(--fletcher-on-cypress)] text-[var(--fletcher-pine)] border-[var(--fletcher-on-cypress)]'
                      : 'border-[var(--fletcher-border-dark)] text-[var(--fletcher-on-cypress)] hover:border-[var(--fletcher-on-cypress)]'
                  }`}
                >
                  Pilots, ATCS &amp; Cabin Crew
                </button>
              </div>

              {featureTab === 'autocross' ? (
                <>
                  <h2 className="fletcher-h2 text-[var(--fletcher-on-cypress)]">
                    Grip vs. spinout.
                  </h2>
                  <p className="text-base text-[var(--fletcher-on-cypress-muted)] leading-relaxed">
                    The tires on your car only have so much grip. Just before
                    they lose it, they tell you—you’ll hear them start to{' '}
                    <strong className="text-[var(--fletcher-on-cypress)]">
                      chirp
                    </strong>
                    . Knowing that limit doesn’t hold you back; it’s what lets
                    you set boundaries from within instead of burning out.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setAutocrossView((prev) => (prev === 'car' ? 'track' : 'car'))
                      }
                      className="fletcher-btn-outline-light"
                    >
                      <span>
                        {autocrossView === 'car'
                          ? 'View Moore AAF Track Line'
                          : 'View Autocross Car #99'}
                      </span>
                    </button>
                    <Link to="/v3/about" className="fletcher-btn-primary">
                      <span>About Jonathan</span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="fletcher-h2 text-[var(--fletcher-on-cypress)]">
                    Pilots are people, too.
                  </h2>
                  <p className="text-base text-[var(--fletcher-on-cypress-muted)] leading-relaxed">
                    You don’t have to choose between your career and your
                    health. With May 2026 FAA guidance and collaborative,
                    transparent documentation, we protect your dignity and your
                    certificate.
                  </p>
                  <div className="pt-1">
                    <Link
                      to="/v3/aviation-professionals"
                      className="fletcher-btn-primary"
                    >
                      <span>Read Aviation Briefing &amp; FAA FAQs</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-7 reveal-on-scroll">
              <figure className="overflow-hidden ds-media-frame border-[var(--fletcher-border-dark)] bg-[var(--fletcher-pine)]">
                {featureTab === 'aviation' ? (
                  <>
                    <img
                      src={assetUrl('media/discovery-flight.jpg')}
                      alt="Jonathan Farr inside small aircraft cockpit wearing David Clark headset"
                      width={1600}
                      height={1200}
                      loading="lazy"
                      className="w-full h-auto aspect-[4/3] object-cover object-top"
                    />
                    <figcaption className="px-5 py-3 fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                      Discovery flight from Minuteman Airport (6B6) · Stow, Mass.
                    </figcaption>
                  </>
                ) : autocrossView === 'car' ? (
                  <>
                    <img
                      src={assetUrl('media/autocross-car.jpg')}
                      alt="Silver convertible #99 driven hard around autocross cones"
                      width={1600}
                      height={1067}
                      loading="lazy"
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                    <figcaption className="px-5 py-3 fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                      Finding the limit · Photo: Paul Buckley, IG @thepaulbuckley
                    </figcaption>
                  </>
                ) : (
                  <>
                    <img
                      src={assetUrl('media/autocross-track.jpg')}
                      alt="Aerial view of Moore Army Air Field autocross course in Ayer, Massachusetts"
                      width={1600}
                      height={1297}
                      loading="lazy"
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                    <figcaption className="px-5 py-3 fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                      Moore Army Air Field, Ayer, Mass. · Green line marks the driving line
                    </figcaption>
                  </>
                )}
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 6 — Deep Pine-Slate Tipping Points & Editorial Writing Preview */}
      <section className="fletcher-band-black ds-section">
        <div className="ds-container space-y-20">
          {/* Interactive Tipping Point Switcher */}
          <div className="space-y-8 border-b border-[var(--fletcher-border-dark)] pb-16 reveal-on-scroll">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
                The Tipping Point // Why People Reach Out
              </p>
              <div className="flex flex-wrap gap-2">
                {TIPPING_POINTS.map((tp, idx) => (
                  <button
                    key={tp.id}
                    type="button"
                    onClick={() => setActiveTippingIdx(idx)}
                    className={`rounded-full px-3.5 py-1 fletcher-meta text-xs border transition-colors cursor-pointer ${
                      idx === activeTippingIdx
                        ? 'bg-[var(--fletcher-on-pine)] text-[var(--fletcher-pine)] border-[var(--fletcher-on-pine)]'
                        : 'border-[var(--fletcher-border-dark)] text-[var(--fletcher-on-pine-muted)] hover:border-[var(--fletcher-on-pine)] hover:text-[var(--fletcher-on-pine)]'
                    }`}
                  >
                    {tp.tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[12rem] flex flex-col justify-center space-y-4 max-w-4xl">
              <blockquote className="fletcher-display fletcher-h3 text-[var(--fletcher-on-pine)]">
                {currentTipping.quote}
              </blockquote>
              <p className="text-base sm:text-lg text-[var(--fletcher-on-pine-muted)] max-w-2xl">
                {currentTipping.subline}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous tipping point"
                  onClick={() =>
                    setActiveTippingIdx(
                      (prev) =>
                        (prev - 1 + TIPPING_POINTS.length) %
                        TIPPING_POINTS.length,
                    )
                  }
                  className="w-10 h-10 rounded-full border border-[var(--fletcher-border-dark)] flex items-center justify-center text-[var(--fletcher-on-pine)] hover:bg-[var(--fletcher-on-pine)] hover:text-[var(--fletcher-pine)] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next tipping point"
                  onClick={() =>
                    setActiveTippingIdx(
                      (prev) => (prev + 1) % TIPPING_POINTS.length,
                    )
                  }
                  className="w-10 h-10 rounded-full border border-[var(--fletcher-border-dark)] flex items-center justify-center text-[var(--fletcher-on-pine)] hover:bg-[var(--fletcher-on-pine)] hover:text-[var(--fletcher-pine)] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <span className="fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                0{activeTippingIdx + 1} / 0{TIPPING_POINTS.length}
              </span>
            </div>
          </div>

          {/* Writing & Notes Preview */}
          <div className="space-y-8 reveal-on-scroll">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1">
                <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
                  Essays &amp; Reflections
                </p>
                <h2 className="fletcher-h3 text-[var(--fletcher-on-pine)]">
                  Writing &amp; Notes
                </h2>
              </div>
              <Link
                to="/v3/blog"
                className="text-sm text-[var(--fletcher-on-pine)] underline underline-offset-8 hover:opacity-80"
              >
                Read All Essays →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 ds-grid-gap">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="ds-card border-[var(--fletcher-border-dark)] p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
                      {post.category} · {post.readTime}
                    </p>
                    <h3 className="fletcher-h4 text-[var(--fletcher-on-pine)]">
                      <Link
                        to={`/v3/blog/${post.slug}`}
                        className="no-underline hover:opacity-80 transition-opacity"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-[var(--fletcher-on-pine-muted)] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <Link
                      to={`/v3/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm text-[var(--fletcher-on-pine)] underline underline-offset-4 hover:opacity-80"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BAND 7 — Celadon Mist FAQ Accordion & Closing Consultation Invitation */}
      <section className="fletcher-band-white ds-section">
        <div className="max-w-[min(60rem,var(--ds-page-max-width))] mx-auto space-y-16">
          <div className="space-y-8 reveal-on-scroll">
            <div className="space-y-2">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
                Questions Before You Book
              </p>
              <h2
                id="v3-home-faq-heading"
                className="fletcher-h2 text-[var(--fletcher-pine)]"
              >
                Frequently Asked
              </h2>
            </div>

            <FletcherFaqAccordion
              items={V3_HOME_FAQS}
              tone="light"
              labelledBy="v3-home-faq-heading"
            />
          </div>

          <div className="pt-8 border-t border-[var(--fletcher-border)] grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-center reveal-on-scroll">
            <div className="lg:col-span-7 space-y-3">
              <h2 className="fletcher-h2 text-[var(--fletcher-pine)]">
                Your inner voice sucks.
                <br />
                It’s time to change it.
              </h2>
              <p className="text-base sm:text-lg text-[var(--fletcher-pine)]/85 max-w-xl">
                Book a free, 15-minute conversation with me to see if we’re the
                right fit.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fletcher-btn-primary"
              >
                <span>Schedule Free 15-Min Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
