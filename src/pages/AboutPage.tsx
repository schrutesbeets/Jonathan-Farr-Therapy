import { ArrowUpRight, Check, Minus, ShieldCheck } from 'lucide-react';
import {
  EDUCATION_CREDENTIALS,
  FIT_CRITERIA,
  PRACTICE_CONFIG,
} from '../data/siteContent';
import {
  MeridenMosaicStrip,
  ScallopBadgeShape,
} from '../components/MeridenShapes';

export function AboutPage() {
  return (
    <div className="overflow-x-clip">
      {/* SECTION 1 — Full-Bleed Vermilion About Hero ("I was an imposter, too.") */}
      <section className="bg-[var(--meriden-vermilion)] text-[var(--meriden-white)] px-5 sm:px-10 pt-10 pb-20 sm:pt-14 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              ABOUT JONATHAN FARR, LMHC // SIGNAL OVER NOISE
            </p>

            <h1 className="font-display type-hero text-white">
              I was an
              <br />
              imposter, too.
            </h1>

            <div className="space-y-4 font-prose text-base sm:text-lg text-white/95 leading-relaxed max-w-2xl">
              <p>
                I have a bachelor’s degree in film production, but that was the
                beginning of my own imposter syndrome. Directors had “vision,” I
                thought, of the grand movies they made. The only vision I had was
                being a production assistant standing at 28th and Broadway
                trying to stop traffic with nothing but a two-way radio… and no
                health insurance.
              </p>
              <p>
                I was a resident assistant in college, though, and I really loved
                that role — building community and, especially, talking with
                students one on one about their problems and lives. When a
                supervisor told me about getting a master’s degree in higher
                education, I went for it.
              </p>
              <p>
                Four years later, I was the director of a residence hall, and a
                student approached me in the cafeteria. “Can we just... talk?”
                he asked. After making sure he was aware of the university’s
                counseling center, he still chose me. It was the moment in my
                life when the <strong>signal</strong> of belief — in my own
                abilities — finally began to drown out the{' '}
                <strong>noise</strong> of imposter syndrome.
              </p>
              <p>
                A couple years later, I enrolled in another master’s program —
                this time in counseling psychology — and here I am. The noise
                of my own imposter syndrome hasn’t gone away; it probably never
                will. But in my own journey, I’ve chosen to focus on growing and
                amplifying that signal of belief.
              </p>
            </div>
          </div>

          {/* Stacked Overlapping Portraits + Vintage 1997 Photo */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative">
              <div
                className="hidden sm:block absolute -top-8 -right-6 w-28 h-28 z-0 pointer-events-none"
                aria-hidden="true"
              >
                <ScallopBadgeShape
                  color="var(--meriden-sky)"
                  className="w-full h-full"
                />
              </div>

              <figure className="relative z-10 overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-2xl">
                <img
                  src="/media/jonathan-glasses.jpg"
                  alt="Jonathan Farr portrait in April 2026 wearing clear-frame glasses and patterned shirt"
                  width={1064}
                  height={1600}
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                <figcaption className="bg-[var(--meriden-espresso)] text-[var(--meriden-cream)] px-4 py-2.5 font-condensed text-xs uppercase tracking-widest">
                  April 2026
                </figcaption>
              </figure>
            </div>

            <figure className="sm:w-3/4 sm:ml-auto overflow-hidden rounded-sm border-4 border-[var(--meriden-cream)] shadow-xl bg-[var(--meriden-cream)] text-[var(--meriden-espresso)]">
              <img
                src="/media/jonathan-1997.jpg"
                alt="Jonathan Farr in 1997 filming with a camera in a college dorm room"
                width={1600}
                height={1199}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <figcaption className="px-4 py-2.5 font-condensed text-xs uppercase tracking-widest text-[var(--meriden-terracotta)]">
                Me in 1997, trying to find my “vision”
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Warm Cream Uniqueness & Clinical Philosophy */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 reveal-on-scroll">
            <img
              src="/media/jonathan-seated.jpg"
              alt="Jonathan Farr seated casually on a chair with boots and plaid shirt"
              width={1066}
              height={1600}
              loading="lazy"
              className="w-full h-auto rounded-sm shadow-xl object-cover aspect-[4/5]"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 reveal-on-scroll">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--meriden-vermilion)]">
              CLINICAL VOICE &amp; INTEGRATIVE APPROACH
            </p>
            <h2 className="font-display type-h2 text-[var(--meriden-vermilion)]">
              Clarity on what the hell you want out of life.
            </h2>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
              I combine evidence-based modalities—including Acceptance and
              Commitment Therapy (ACT), Internal Family Systems (IFS), CBT, and
              Person-Centered therapy—to help you connect daily behaviors back
              to your real values rather than chasing external approval.
            </p>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
              Therapy with me is rich, colorful, often entertaining, and
              sometimes even fun. I don’t just nod silently—I reflect what
              you’re navigating in vivid comparisons and metaphors that dial down
              anxiety and help you see who you actually are.
            </p>
            <div className="pt-2">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-vermilion"
              >
                <span>Schedule a Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Vermilion Mutual Fit Matrix */}
      <section className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2 reveal-on-scroll">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              CLIENT FIT // NO SURPRISES
            </p>
            <h2 className="font-display type-h2 text-white">
              Right Fit Matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="rounded-2xl bg-[var(--meriden-cream)] text-[var(--meriden-espresso)] p-7 sm:p-10 space-y-5 reveal-on-scroll">
              <h3 className="font-display-quote text-2xl sm:text-3xl text-[var(--meriden-terracotta)]">
                I work best with clients who…
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0 font-prose text-base">
                {FIT_CRITERIA.bestWith.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 shrink-0 text-[var(--meriden-vermilion)] mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border-2 border-white/40 bg-[var(--meriden-terracotta)]/25 text-white p-7 sm:p-10 space-y-5 reveal-on-scroll">
              <h3 className="font-display-quote text-2xl sm:text-3xl text-white">
                I’m probably not the therapist for you if…
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0 font-prose text-base text-[var(--meriden-cream)]">
                {FIT_CRITERIA.notForYouIf.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Minus
                      className="w-5 h-5 shrink-0 text-[var(--meriden-marigold)] mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Education & Licensure Ledger */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-24">
        <div className="max-w-5xl mx-auto space-y-10 reveal-on-scroll">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[var(--meriden-vermilion)]/20 pb-5">
            <div>
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-vermilion)]">
                CREDENTIALS &amp; LICENSURE
              </p>
              <h2 className="font-display type-h2 text-[var(--meriden-terracotta)]">
                Education &amp; Qualifications
              </h2>
            </div>

            <a
              href={PRACTICE_CONFIG.licenseVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-vermilion"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Verify MA License #{PRACTICE_CONFIG.licenseNumber}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EDUCATION_CREDENTIALS.map((edu) => (
              <div
                key={edu.year}
                className="rounded-xl border-2 border-[var(--meriden-vermilion)]/20 bg-[var(--meriden-cream-tint)]/55 p-6 space-y-1.5"
              >
                <p className="font-condensed text-sm uppercase tracking-widest text-[var(--meriden-vermilion)]">
                  {edu.year}
                </p>
                <p className="font-display-quote text-xl text-[var(--meriden-terracotta)]">
                  {edu.credential}
                </p>
                <p className="font-prose text-sm text-[var(--meriden-espresso)]">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>

          <p className="font-prose text-xs text-[var(--meriden-terracotta)]">
            To verify on Mass.gov: under “License Board,” choose “Board of
            Registration of Allied Mental Health and Human Services
            Professions,” enter “Jonathan Farr,” and click Search.
          </p>
        </div>
      </section>

      <MeridenMosaicStrip />
    </div>
  );
}
