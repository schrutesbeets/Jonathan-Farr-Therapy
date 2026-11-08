import { ArrowUpRight, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import {
  PRACTICE_CONFIG,
  EDUCATION_CREDENTIALS,
  FIT_CRITERIA,
} from '../data/siteContent';

export function AboutPage() {
  return (
    <div>
      {/* Hero / Story Lead */}
      <section className="border-b border-[var(--border-hairline)] px-4 sm:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)] border border-[var(--border-hairline)] bg-[var(--surface-card)] px-3 py-1.5 rounded-sm">
              <span>ABOUT JONATHAN FARR, LMHC // SIGNAL VS. NOISE</span>
            </div>

            <h1 className="heading-display font-bold tracking-tight">
              I was an imposter,{' '}
              <span className="font-editorial italic font-normal text-[var(--ink-secondary)]">
                too.
              </span>
            </h1>

            <div className="space-y-4 text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed">
              <p>
                I have a bachelor’s degree in film production, and that was the
                beginning of my own imposter syndrome. Directors had “vision,” I
                thought, of the grand movies they made. The only vision I had
                was being a production assistant standing at 28th and Broadway
                trying to stop traffic with nothing but a two-way radio… and no
                health insurance.
              </p>
              <p>
                I was a resident assistant in college, though, and I really
                loved that role—building community and, especially, talking with
                students one-on-one about their problems and lives. When a
                supervisor told me about getting a master’s degree in higher
                education, I went for it.
              </p>
              <p>
                Four years later, I was the director of a residence hall when a
                student approached me in the cafeteria.{' '}
                <em className="text-[var(--ink-primary)] font-medium">
                  “Can we just… talk?”
                </em>{' '}
                he asked. After making sure he was aware of the university’s
                counseling center, he still chose me. It was the moment in my
                life when the{' '}
                <strong className="text-[var(--ink-primary)]">
                  signal of belief
                </strong>
                —in my own abilities—finally began to drown out the{' '}
                <strong className="text-[var(--ink-primary)]">
                  noise of imposter syndrome
                </strong>
                .
              </p>
              <p>
                A couple years later, I enrolled in another master’s
                program—this time in counseling psychology—and here I am. The
                noise of my own imposter syndrome hasn’t gone away; it probably
                never will. But in my own journey, I’ve chosen to focus on
                growing and amplifying that signal of belief.
              </p>
            </div>
          </div>

          {/* Credentials & Philosophy Sidebar */}
          <aside
            aria-label="Credentials and Verification"
            className="lg:col-span-5 space-y-6"
          >
            <div className="border border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-6">
              <div className="border-b border-[var(--border-hairline)] pb-3 flex items-center justify-between">
                <h2 className="font-technical text-xs uppercase tracking-widest text-[var(--ink-muted)]">
                  EDUCATION & LICENSURE
                </h2>
                <span className="font-technical text-xs text-[var(--accent-signal)]">
                  VERIFIED
                </span>
              </div>

              <ul className="space-y-4">
                {EDUCATION_CREDENTIALS.map((item) => (
                  <li
                    key={item.year}
                    className="border-b border-[var(--border-hairline)] pb-3 last:border-b-0 last:pb-0"
                  >
                    <p className="font-technical text-xs text-[var(--accent-signal)]">
                      {item.year}
                    </p>
                    <p className="font-semibold text-sm sm:text-base">
                      {item.credential}
                    </p>
                    <p className="text-xs text-[var(--ink-secondary)]">
                      {item.institution}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-[var(--border-hairline)] space-y-2">
                <a
                  href={PRACTICE_CONFIG.licenseVerifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-technical uppercase tracking-wider text-[var(--ink-primary)] hover:text-[var(--accent-signal)] underline underline-offset-4"
                >
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>
                    Verify License #{PRACTICE_CONFIG.licenseNumber} on Mass.gov
                  </span>
                </a>
                <p className="text-xs text-[var(--ink-muted)]">
                  Under “License Board,” choose “Board of Registration of Allied
                  Mental Health and Human Services Professions” and search
                  Jonathan Farr.
                </p>
              </div>
            </div>

            {/* Brief Highlight: What Therapy With Jonathan Actually Feels Like */}
            <div className="border border-[var(--border-hairline)] bg-[var(--surface-dark)] text-[#f6f5f1] p-6 sm:p-8 space-y-4">
              <p className="font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
                HOW I WORK // WHY CLIENTS STAY
              </p>
              <h2 className="text-xl font-bold">
                Colorful, direct, and grounded in what you actually value.
              </h2>
              <p className="text-sm text-[#d8d6ce] leading-relaxed">
                Therapy with me isn’t passive nodding. I reflect your story back
                to you in my own words and colorful illustrations—comparisons
                that often make clients laugh and immediately dial down anxiety.
                Life isn’t so bleak or complicated when someone reads it back to
                you in a way you’ve never considered before, connecting your
                daily behaviors back to the values that actually sustain you.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Client Fit Matrix ("I work best with..." vs "Probably not the therapist for you if...") */}
      <section className="px-4 sm:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              MUTUAL FIT DIAGNOSTIC
            </p>
            <h2 className="heading-section font-bold">
              Is this the right room for you?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="border border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[var(--border-hairline)] pb-4">
                <CheckCircle2
                  className="w-5 h-5 text-[var(--accent-signal)]"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-bold">
                  I work best with clients who…
                </h3>
              </div>
              <ul className="space-y-3 text-sm sm:text-base text-[var(--ink-secondary)]">
                {FIT_CRITERIA.bestWith.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="font-technical text-xs text-[var(--accent-signal)] mt-1"
                      aria-hidden="true"
                    >
                      [+]
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-[var(--border-hairline)] bg-[var(--surface-bg)] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2.5 border-b border-[var(--border-hairline)] pb-4">
                <XCircle
                  className="w-5 h-5 text-[var(--ink-muted)]"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-bold">
                  I’m probably not the therapist for you if…
                </h3>
              </div>
              <ul className="space-y-3 text-sm sm:text-base text-[var(--ink-secondary)]">
                {FIT_CRITERIA.notForYouIf.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="font-technical text-xs text-[var(--ink-muted)] mt-1"
                      aria-hidden="true"
                    >
                      [–]
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="pt-4">
            <a
              href={PRACTICE_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-hover)] text-white font-technical text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors"
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
