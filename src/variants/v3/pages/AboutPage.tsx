import { ArrowUpRight, Check, Minus, ShieldCheck } from 'lucide-react';
import {
  EDUCATION_CREDENTIALS,
  FIT_CRITERIA,
  PRACTICE_CONFIG,
} from '../data/siteContent';
import { assetUrl } from '../../../lib/assetUrl';

export function AboutPage() {
  return (
    <div className="overflow-x-clip">
      {/* BAND 1 — Dark Pine About Hero */}
      <section className="fletcher-band-black ds-section fletcher-hero-offset">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
              About Jonathan Farr, LMHC · Signal Over Noise
            </p>
            <h1 className="fletcher-h1 text-[var(--fletcher-on-pine)]">
              I was an
              <br />
              imposter, too.
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-[var(--fletcher-on-pine-muted)] leading-relaxed max-w-2xl">
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
                life when the{' '}
                <strong className="text-[var(--fletcher-on-pine)]">signal</strong>{' '}
                of belief — in my own abilities — finally began to drown out the{' '}
                <strong className="text-[var(--fletcher-on-pine)]">noise</strong>{' '}
                of imposter syndrome.
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

          <div className="lg:col-span-5 space-y-6">
            <figure className="overflow-hidden ds-media-frame border-[var(--fletcher-border-dark)] bg-[var(--fletcher-cypress)]">
              <img
                src={assetUrl('media/jonathan-glasses.jpg')}
                alt="Jonathan Farr portrait in April 2026 wearing clear-frame glasses and patterned shirt"
                width={1064}
                height={1600}
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              <figcaption className="px-4 py-2.5 fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                April 2026
              </figcaption>
            </figure>

            <figure className="sm:w-3/4 sm:ml-auto overflow-hidden ds-media-frame border-[var(--fletcher-border-dark)] bg-[var(--fletcher-cypress)]">
              <img
                src={assetUrl('media/jonathan-1997.jpg')}
                alt="Jonathan Farr in 1997 filming with a camera in a college dorm room"
                width={1600}
                height={1199}
                loading="lazy"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <figcaption className="px-4 py-2.5 fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                Me in 1997, trying to find my “vision”
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* BAND 2 — Full-Bleed 50/50 Celadon Mist Clinical Philosophy */}
      <section className="fletcher-band-white fletcher-split-50">
        <div className="relative overflow-hidden bg-[var(--fletcher-mist-alt)] min-h-[24rem] lg:min-h-full">
          <img
            src={assetUrl('media/jonathan-seated.jpg')}
            alt="Jonathan Farr seated casually on a chair with boots and plaid shirt"
            width={1066}
            height={1600}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="flex items-center justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
          <div className="max-w-lg space-y-6 reveal-on-scroll">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
              Clinical Voice &amp; Integrative Approach
            </p>
            <h2 className="fletcher-h2 text-[var(--fletcher-pine)]">
              Clarity on what the hell you want out of life.
            </h2>
            <p className="text-base sm:text-lg text-[var(--fletcher-pine)]/85 leading-relaxed">
              I combine evidence-based modalities—including Acceptance and
              Commitment Therapy (ACT), Internal Family Systems (IFS), CBT, and
              Person-Centered therapy—to help you connect daily behaviors back
              to your real values rather than chasing external approval.
            </p>
            <p className="text-base sm:text-lg text-[var(--fletcher-pine)]/85 leading-relaxed">
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
                className="fletcher-btn-primary"
              >
                <span>Schedule Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 3 — Slate Cypress Mutual Fit Matrix */}
      <section className="fletcher-band-dark ds-section">
        <div className="ds-container space-y-12">
          <div className="max-w-2xl space-y-2 reveal-on-scroll">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
              Client Fit // No Surprises
            </p>
            <h2 className="fletcher-h2 text-[var(--fletcher-on-cypress)]">
              Right fit matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 ds-grid-gap">
            <article className="ds-card border-[var(--fletcher-border-dark)] p-7 sm:p-10 space-y-5 reveal-on-scroll">
              <h3 className="fletcher-h3 text-[var(--fletcher-on-cypress)]">
                I work best with clients who…
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0 text-base text-[var(--fletcher-on-cypress-muted)]">
                {FIT_CRITERIA.bestWith.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 shrink-0 text-[var(--fletcher-on-cypress)] mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="ds-card border-[var(--fletcher-border-dark)] bg-[var(--fletcher-pine)]/45 p-7 sm:p-10 space-y-5 reveal-on-scroll">
              <h3 className="fletcher-h3 text-[var(--fletcher-on-cypress)]">
                I’m probably not the therapist for you if…
              </h3>
              <ul className="space-y-3.5 list-none p-0 m-0 text-base text-[var(--fletcher-on-cypress-muted)]">
                {FIT_CRITERIA.notForYouIf.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Minus
                      className="w-5 h-5 shrink-0 text-[var(--fletcher-on-cypress)] mt-0.5"
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

      {/* BAND 4 — Celadon Mist Education & Licensure Ledger */}
      <section className="fletcher-band-white ds-section">
        <div className="max-w-[min(64rem,var(--ds-page-max-width))] mx-auto space-y-10 reveal-on-scroll">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--fletcher-border)] pb-5">
            <div className="space-y-1">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
                Credentials &amp; Licensure
              </p>
              <h2 className="fletcher-h2 text-[var(--fletcher-pine)]">
                Education &amp; Qualifications
              </h2>
            </div>

            <a
              href={PRACTICE_CONFIG.licenseVerifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fletcher-btn-outline-dark"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Verify MA License #{PRACTICE_CONFIG.licenseNumber}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 ds-grid-gap">
            {EDUCATION_CREDENTIALS.map((edu) => (
              <div
                key={edu.year}
                className="ds-card border-[var(--fletcher-border)] bg-[var(--fletcher-mist-alt)]/45 p-6 space-y-1.5"
              >
                <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-rust)]">
                  {edu.year}
                </p>
                <p className="fletcher-display text-xl sm:text-2xl text-[var(--fletcher-pine)]">
                  {edu.credential}
                </p>
                <p className="text-sm text-[var(--fletcher-pine)]/80">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--fletcher-cypress)]">
            To verify on Mass.gov: under “License Board,” choose “Board of
            Registration of Allied Mental Health and Human Services
            Professions,” enter “Jonathan Farr,” and click Search.
          </p>
        </div>
      </section>
    </div>
  );
}
