import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Pause,
  Play,
} from 'lucide-react';
import {
  CLIENT_ARCHETYPES,
  HERO_KEYWORDS,
  HOME_FAQS,
  METHOD_PILLARS,
  PRACTICE_CONFIG,
  TIPPING_POINTS,
} from '../data/siteContent';
import {
  GeometricRingShape,
  MeridenMosaicStrip,
  ScallopBadgeShape,
  StarburstShape,
} from '../components/MeridenShapes';
import { FaqAccordion } from '../components/FaqAccordion';
import { assetUrl } from '../lib/assetUrl';

export function HomePage() {
  const [autocrossView, setAutocrossView] = useState<'car' | 'track'>('car');
  const [activeTippingIdx, setActiveTippingIdx] = useState(0);
  const [vinylPaused, setVinylPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setVinylPaused(true);
      videoRef.current?.pause();
    }
  }, []);

  const toggleVinylPlayback = () => {
    const video = videoRef.current;
    if (!video) {
      setVinylPaused((prev) => !prev);
      return;
    }
    if (vinylPaused) {
      video.play().catch(() => {});
      setVinylPaused(false);
    } else {
      video.pause();
      setVinylPaused(true);
    }
  };

  const currentTipping = TIPPING_POINTS[activeTippingIdx];

  return (
    <div className="overflow-x-clip">
      {/* SECTION 1 — Full-Bleed Vermilion Hero (Meriden Section 1 cadence) */}
      <section className="bg-[var(--meriden-vermilion)] text-[var(--meriden-white)] px-5 sm:px-10 pt-8 pb-16 sm:pt-12 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Asymmetric Editorial Portrait Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-sm bg-[var(--meriden-terracotta)]/20 shadow-2xl">
              <img
                src={assetUrl('media/jonathan-hero.jpg')}
                alt="Jonathan Farr, LMHC, smiling in a blue sweater and striped tie"
                width={1066}
                height={1600}
                {...({ fetchpriority: 'high' } as Record<string, string>)}
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>
            <div
              className="hidden sm:block absolute -bottom-7 -right-7 w-28 h-28 pointer-events-none"
              aria-hidden="true"
            >
              <ScallopBadgeShape
                color="var(--meriden-marigold)"
                className={`w-full h-full animate-slow-spin ${
                  vinylPaused ? 'motion-paused' : ''
                }`}
              />
            </div>
          </div>

          {/* Massive Editorial Headline + Condensed Keywords + Outline Pill CTA */}
          <div className="lg:col-span-7 space-y-6 lg:pl-4">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              MASSACHUSETTS ONLINE TELEHEALTH · LMHC #{PRACTICE_CONFIG.licenseNumber}
            </p>

            <h1 className="font-display type-hero text-[var(--meriden-white)]">
              Jonathan
              <br />
              Farr
              <br />
              Therapy
            </h1>

            <ul
              aria-label="Core Specialties"
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-condensed text-lg sm:text-xl tracking-[0.18em] uppercase text-[var(--meriden-cream)] list-none p-0 m-0"
            >
              {HERO_KEYWORDS.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>

            <p className="font-prose text-lg sm:text-xl text-[var(--meriden-white)]/95 max-w-xl leading-relaxed">
              Online therapy in Massachusetts for high-achievers spinning on the
              broken record of imposter syndrome.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-light"
              >
                <span>Schedule Free 15-Min Consult</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <Link
                to="/about"
                className="font-condensed uppercase tracking-widest text-sm text-[var(--meriden-cream)] underline underline-offset-8 hover:text-white transition-colors px-2 py-2"
              >
                Why “I Was an Imposter, Too” →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Warm Cream Floating-Scallop Manifesto + Vinyl Loop */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto relative flex flex-col items-center text-center reveal-on-scroll">
          <div
            className="relative w-full py-10 sm:py-16 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <ScallopBadgeShape
                color="var(--meriden-sky)"
                className={`w-64 h-64 sm:w-80 sm:h-80 opacity-85 animate-slow-spin ${
                  vinylPaused ? 'motion-paused' : ''
                }`}
              />
            </div>

            <div className="relative z-10 max-w-3xl space-y-5">
              <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-terracotta)]">
                THIS GUY’S DIFFERENT
              </p>
              <h2 className="font-display-quote text-3xl sm:text-5xl text-[var(--meriden-terracotta)]">
                You’re actually good at what you do—you just struggle to believe it.
              </h2>
              <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] max-w-2xl mx-auto leading-relaxed">
                I specialize in helping high-achievers struggling with imposter
                syndrome—especially those with narcissistic or abusive parents—to
                stop cycles of people-pleasing and emerge into a life that truly
                belongs to them.
              </p>
            </div>
          </div>

          {/* "Broken Record" Vinyl Loop Card with Accessible Pause/Play Toggle */}
          <div className="mt-10 w-full max-w-4xl rounded-2xl bg-[var(--meriden-cream-tint)] border-2 border-[var(--meriden-vermilion)]/20 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
            <div className="md:col-span-5 relative overflow-hidden rounded-xl bg-[var(--meriden-espresso)] aspect-[4/3]">
              <video
                ref={videoRef}
                src={assetUrl('media/vinyl-spin.mp4')}
                poster={assetUrl('media/vinyl-turntable.jpg')}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={toggleVinylPlayback}
                className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--meriden-espresso)]/90 text-[var(--meriden-cream)] px-3.5 py-1.5 font-condensed text-xs uppercase tracking-wider hover:bg-[var(--meriden-vermilion)] transition-colors cursor-pointer"
              >
                {vinylPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Play vinyl</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pause vinyl</span>
                  </>
                )}
              </button>
            </div>

            <div className="md:col-span-7 space-y-3">
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-vermilion)]">
                THE BROKEN RECORD
              </p>
              <h3 className="font-display-quote text-2xl sm:text-3xl text-[var(--meriden-terracotta)]">
                You’re never enough. Over and over again.
              </h3>
              <p className="font-prose text-sm sm:text-base text-[var(--meriden-espresso)] leading-relaxed">
                Maybe it’s how much you make, how much you do, or how hard you
                work. Maybe it’s someone else telling you that. Maybe it’s your
                own inner voice. Either because you’re doing everything you can—or
                struggling to do anything at all—you end up feeling like a failure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — 3-Column Graphic Method (Starburst / Scallop / Ring) */}
      <section className="bg-[var(--meriden-cream)] border-t-2 border-[var(--meriden-vermilion)]/15 px-5 sm:px-10 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center space-y-2 reveal-on-scroll">
            <p className="font-condensed text-sm uppercase tracking-[0.22em] text-[var(--meriden-vermilion)]">
              WHY PRIVATE-PAY · MY APPROACH
            </p>
            <h2 className="font-display type-h2 text-[var(--meriden-vermilion)]">
              What Makes This Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {METHOD_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="flex flex-col items-center text-center space-y-5 reveal-on-scroll"
              >
                <div className="w-28 h-28 flex items-center justify-center">
                  {pillar.shape === 'starburst' && (
                    <StarburstShape className="w-24 h-24" />
                  )}
                  {pillar.shape === 'scallop' && (
                    <ScallopBadgeShape
                      color="var(--meriden-marigold)"
                      className="w-24 h-24"
                    />
                  )}
                  {pillar.shape === 'ring' && (
                    <GeometricRingShape
                      color="var(--meriden-sky)"
                      className="w-24 h-24"
                    />
                  )}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display type-h3 text-[var(--meriden-vermilion)]">
                    {pillar.title}
                  </h3>
                  <p className="font-condensed text-xs uppercase tracking-[0.18em] text-[var(--meriden-terracotta)]">
                    {pillar.kicker}
                  </p>
                </div>

                <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed max-w-sm">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>

          {/* 6 Populations Who Thrive Here */}
          <div className="pt-8 reveal-on-scroll">
            <div className="rounded-2xl border-2 border-[var(--meriden-vermilion)]/25 bg-[var(--meriden-cream-tint)]/60 p-6 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--meriden-vermilion)]/20 pb-4">
                <div>
                  <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-vermilion)]">
                    UNDER CONSTANT PRESSURE TO PERFORM
                  </p>
                  <h3 className="font-display-quote text-2xl sm:text-3xl text-[var(--meriden-terracotta)]">
                    You may be…
                  </h3>
                </div>
                <Link
                  to="/services"
                  className="font-condensed text-xs uppercase tracking-widest text-[var(--meriden-vermilion)] hover:text-[var(--meriden-terracotta)] underline underline-offset-4"
                >
                  Explore Services &amp; Out-of-Network Checker →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CLIENT_ARCHETYPES.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <p className="font-condensed uppercase tracking-wider text-base text-[var(--meriden-vermilion)] font-medium">
                      {item.label}
                    </p>
                    <p className="font-prose text-sm text-[var(--meriden-espresso)] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Asymmetric Poster Feature: The Autocross Limit Metaphor */}
      <section className="bg-[var(--meriden-cream)] border-t-2 border-[var(--meriden-vermilion)]/15 px-5 sm:px-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6 reveal-on-scroll">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
              THE AUTOCROSS PRINCIPLE · GRIP VS. SPINOUT
            </p>
            <h2 className="font-display type-h2 text-[var(--meriden-vermilion)]">
              Pressure Cracks Diamonds.
            </h2>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
              The tires on your car only have so much grip. Just before they
              lose it, they tell you—you’ll hear them start to{' '}
              <strong>chirp</strong>. Knowing that limit doesn’t hold a race car
              driver back; it’s what gets them around the track <em>faster</em>{' '}
              without spinning out.
            </p>
            <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
              Awareness of your limits lets you set boundaries—not from the
              outside, but from within:
            </p>
            <ol className="space-y-2 font-prose text-sm sm:text-base text-[var(--meriden-terracotta)] font-medium pl-5 list-decimal">
              <li>What would I be able to accomplish?</li>
              <li>What would it be like if I wrote the story of my own life?</li>
              <li>Who could I connect with more fully, more deeply?</li>
            </ol>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  setAutocrossView((prev) => (prev === 'car' ? 'track' : 'car'))
                }
                className="btn-pill-vermilion"
              >
                <span>
                  {autocrossView === 'car'
                    ? 'View Moore AAF Track Line'
                    : 'View Autocross Car #99'}
                </span>
              </button>
              <Link to="/about" className="btn-pill-solid">
                <span>About Jonathan</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 reveal-on-scroll">
            <figure className="relative overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-xl">
              {autocrossView === 'car' ? (
                <img
                  src={assetUrl('media/autocross-car.jpg')}
                  alt="Silver convertible #99 driven by Jonathan Farr hard around autocross cones"
                  width={1600}
                  height={1067}
                  loading="lazy"
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
              ) : (
                <img
                  src={assetUrl('media/autocross-track.jpg')}
                  alt="Aerial view of Moore Army Air Field in Ayer, Mass. with green autocross driving line around orange cones"
                  width={1600}
                  height={1297}
                  loading="lazy"
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
              )}

              {/* Asymmetric Overlaid White Poster Type (Meriden "self / love" visual signature) */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35 pointer-events-none flex flex-col justify-between p-6 sm:p-10"
                aria-hidden="true"
              >
                <span className="font-display text-4xl sm:text-6xl text-white tracking-tight">
                  AT THE
                </span>
                <span className="font-display text-5xl sm:text-7xl text-white text-right tracking-tight">
                  LIMIT
                </span>
              </div>

              <figcaption className="bg-[var(--meriden-espresso)] text-[var(--meriden-cream)] px-5 py-3 font-condensed text-xs uppercase tracking-widest">
                {autocrossView === 'car'
                  ? 'Me, finding the limit · Photo: Paul Buckley, IG @thepaulbuckley'
                  : 'Moore Army Air Field, Ayer, Mass. · Green line marks the autocross course'}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Interactive Vermilion "Tipping Point" Carousel (Meriden Bright Band) */}
      <section
        aria-label="Client Tipping Points"
        className="bg-[var(--meriden-vermilion)] text-[var(--meriden-white)] px-5 sm:px-10 py-20 sm:py-28"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/25 pb-4">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              THE TIPPING POINT // WHY PEOPLE FINALLY REACH OUT
            </p>
            <div className="flex flex-wrap gap-2">
              {TIPPING_POINTS.map((tp, idx) => (
                <button
                  key={tp.id}
                  type="button"
                  onClick={() => setActiveTippingIdx(idx)}
                  className={`font-condensed text-xs uppercase tracking-wider px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                    idx === activeTippingIdx
                      ? 'bg-white text-[var(--meriden-vermilion)] border-white'
                      : 'border-white/50 text-white hover:border-white'
                  }`}
                >
                  {tp.tag}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-[14rem] flex flex-col justify-center space-y-5">
            <blockquote className="font-display-quote text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">
              {currentTipping.quote}
            </blockquote>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-cream)] max-w-2xl">
              {currentTipping.subline}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
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
                className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-[var(--meriden-vermilion)] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next tipping point"
                onClick={() =>
                  setActiveTippingIdx(
                    (prev) => (prev + 1) % TIPPING_POINTS.length,
                  )
                }
                className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-[var(--meriden-vermilion)] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <span className="font-condensed text-sm uppercase tracking-widest text-[var(--meriden-cream)]">
              0{activeTippingIdx + 1} / 0{TIPPING_POINTS.length}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 6 — 5-Column Alternating Graphic Poster + Photo Strip */}
      <MeridenMosaicStrip />

      {/* SECTION 7 — Complete 8-Question Native FAQ Accordion + Closing Callout */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-2 reveal-on-scroll">
            <p className="font-condensed text-sm uppercase tracking-[0.22em] text-[var(--meriden-vermilion)]">
              QUESTIONS BEFORE YOU BOOK
            </p>
            <h2 className="font-display type-h2 text-[var(--meriden-vermilion)]">
              Frequently Asked
            </h2>
          </div>

          <FaqAccordion items={HOME_FAQS} groupName="home-faq" />
        </div>
      </section>

      {/* Closing Bold Vermilion Banner */}
      <section className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 py-20 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto space-y-6 reveal-on-scroll">
          <h2 className="font-display type-h2 text-white">
            Your inner voice sucks.
            <br />
            It’s time to change it.
          </h2>
          <p className="font-prose text-lg sm:text-xl text-[var(--meriden-cream)] max-w-2xl mx-auto">
            Book a free, 15-minute conversation with me to see if we’re the
            right fit.
          </p>
          <div className="pt-2">
            <a
              href={PRACTICE_CONFIG.introCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-light"
            >
              <span>Schedule a Free 15-Minute Consultation</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
