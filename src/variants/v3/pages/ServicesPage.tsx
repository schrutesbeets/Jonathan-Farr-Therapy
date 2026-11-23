import { Link } from 'react-router-dom';
import { ArrowUpRight, Receipt, Video } from 'lucide-react';
import { AVIATION_LINKS, PRACTICE_CONFIG } from '../data/siteContent';
import { assetUrl } from '../../../lib/assetUrl';

export function ServicesPage() {
  return (
    <div className="overflow-x-clip">
      {/* BAND 1 — Dark Pine Services Hero */}
      <section className="fletcher-band-black ds-section fletcher-hero-offset">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
              1×1 Online Therapy · ${PRACTICE_CONFIG.sessionFee} /{' '}
              {PRACTICE_CONFIG.sessionMinutes} Minutes · Massachusetts
            </p>
            <h1 className="fletcher-h1 text-[var(--fletcher-on-pine)]">
              Let’s put your unique story into context.
            </h1>
            <p className="text-base sm:text-lg text-[var(--fletcher-on-pine-muted)] max-w-2xl leading-relaxed">
              I specialize in helping high-achieving adults—including aviation
              professionals—struggling with imposter syndrome, family
              relationships, and performance anxiety stop negative self-talk and
              finally ally with helpful beliefs.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fletcher-btn-primary"
              >
                <span>Schedule Free 15-Min Consult</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#v3-mentaya-checker" className="fletcher-btn-outline-light">
                <span>Check OON Benefits</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="overflow-hidden ds-media-frame border-[var(--fletcher-border-dark)] bg-[var(--fletcher-cypress)]">
              <img
                src={assetUrl('media/studio-mic.jpg')}
                alt="Vintage metallic condenser microphone under warm stage lighting"
                width={1600}
                height={1067}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* BAND 2 — Celadon Mist Service & Fee Ledger */}
      <section className="fletcher-band-white ds-section">
        <div className="ds-container grid grid-cols-1 md:grid-cols-2 ds-grid-gap">
          <article className="ds-card border-[var(--fletcher-border)] bg-[var(--fletcher-mist-alt)]/45 p-8 sm:p-10 space-y-5 reveal-on-scroll">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
              Individual Teletherapy · 55 Minutes
            </p>
            <h2 className="fletcher-h3 text-[var(--fletcher-pine)]">
              1×1 Virtual Sessions — ${PRACTICE_CONFIG.sessionFee}
            </h2>
            <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
              I shifted to 100% online teletherapy for adults across
              Massachusetts. Choosing not to contract with insurance panels
              means the only people who dictate what happens in the treatment
              session are <strong className="text-[var(--fletcher-pine)]">you and me</strong>.
            </p>
            <div className="flex flex-wrap gap-5 text-xs fletcher-meta uppercase text-[var(--fletcher-cypress)] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[var(--fletcher-rust)]" aria-hidden="true" />
                <span>Mon–Thu Openings</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-[var(--fletcher-rust)]" aria-hidden="true" />
                <span>Monthly Superbills</span>
              </span>
            </div>
            <div className="pt-2">
              <a
                href={PRACTICE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fletcher-btn-outline-dark"
              >
                <span>Client Portal &amp; Scheduling</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="ds-card border-[var(--fletcher-border)] bg-[var(--fletcher-mist-alt)]/45 p-8 sm:p-10 space-y-5 reveal-on-scroll">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
              Introductory Call · 15 Minutes
            </p>
            <h2 className="fletcher-h3 text-[var(--fletcher-pine)]">
              Free Consultation — $0
            </h2>
            <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
              Wondering if you’ll actually click with me before spending $
              {PRACTICE_CONFIG.sessionFee}? Book a free 15-minute intro
              conversation. We’ll talk candidly about what brought you here,
              whether I’m the right fit, and what working together actually looks
              like.
            </p>
            <div className="pt-4">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fletcher-btn-primary"
              >
                <span>Request Intro Call</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* BAND 3 — Slate Cypress Mentaya Out-of-Network Eligibility Checker */}
      <section id="v3-mentaya-checker" className="fletcher-band-dark ds-section">
        <div className="max-w-[min(56rem,var(--ds-page-max-width))] mx-auto space-y-8">
          <div className="space-y-3 text-center reveal-on-scroll">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
              Out-of-Network Reimbursement // Mentaya
            </p>
            <h2 className="fletcher-h2 text-[var(--fletcher-on-cypress)]">
              Check Your OON Benefits
            </h2>
            <p className="text-base sm:text-lg text-[var(--fletcher-on-cypress-muted)] max-w-2xl mx-auto leading-relaxed">
              Your insurance may reimburse you for visits with an out-of-network
              provider. Check your coverage below right now with just your
              insurance member ID. I provide a superbill you can submit directly
              for free—or submit claims through Mentaya for just 5% per claim.
            </p>
          </div>

          <div className="ds-card border-[var(--fletcher-border-dark)] bg-white p-3 sm:p-5">
            <iframe
              src={PRACTICE_CONFIG.mentayaWidgetUrl}
              title="Check Mentaya Out-of-Network Eligibility"
              width="100%"
              height="420"
              loading="lazy"
              className="w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* BAND 4 — Who I Work Best With (Alternating 50/50 Fletcher Splits) */}
      <section className="fletcher-band-white border-b border-[var(--fletcher-border)]">
        <div className="ds-section text-center space-y-2 border-b border-[var(--fletcher-border)]">
          <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
            Specialties &amp; Populations
          </p>
          <h2 className="fletcher-h2 text-[var(--fletcher-pine)]">
            Who I Work Best With
          </h2>
        </div>

        {/* Row 1: Aviation Personnel */}
        <article className="fletcher-split-50 border-b border-[var(--fletcher-border)]">
          <figure className="relative overflow-hidden bg-[var(--fletcher-pine)] min-h-[22rem] lg:min-h-full">
            <img
              src={assetUrl('media/saab-340.jpg')}
              alt="Red and silver Saab 340 turboprop aircraft on tarmac with ramp marshaller"
              width={1600}
              height={1200}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-[var(--fletcher-pine)]/90 text-[var(--fletcher-on-pine)] px-5 py-2.5 fletcher-meta text-xs">
              Yes, that’s a Saab 340. I flew on it. It was loud.
            </figcaption>
          </figure>

          <div className="flex items-center justify-center px-6 py-14 sm:px-12 lg:px-16">
            <div className="max-w-lg space-y-4 reveal-on-scroll">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
                Pilots · Controllers · Flight Attendants
              </p>
              <h3 className="fletcher-h3 text-[var(--fletcher-pine)]">
                Aviation Personnel
              </h3>
              <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
                You’re under a tremendous amount of stress—the kind that the
                general public just doesn’t understand—and you haven’t dared to
                deal with it because you’re afraid of getting grounded.
              </p>
              <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
                At long last, things are changing. The FAA announced{' '}
                <a
                  href={AVIATION_LINKS.faaTherapyFaq}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-[var(--fletcher-rust)] hover:text-[var(--fletcher-oxblood)]"
                >
                  new guidance in May of 2026
                </a>{' '}
                encouraging pilots and air traffic controllers to seek mental
                health counseling, and on September 24 the US Senate unanimously
                passed the{' '}
                <a
                  href={AVIATION_LINKS.senateBill3258}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-[var(--fletcher-rust)] hover:text-[var(--fletcher-oxblood)]"
                >
                  Aviation Medication Transparency Act of 2026
                </a>
                .
              </p>
              <div className="pt-2">
                <Link
                  to="/v3/aviation-professionals"
                  className="fletcher-btn-outline-dark"
                >
                  <span>Read Aviation Briefing &amp; FAA FAQs</span>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Row 2: Musicians, Performers, Artists, Actors */}
        <article className="fletcher-split-50 border-b border-[var(--fletcher-border)]">
          <div className="order-2 lg:order-1 flex items-center justify-center px-6 py-14 sm:px-12 lg:px-16">
            <div className="max-w-lg space-y-4 reveal-on-scroll">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
                Stage · Broadcast · Studio
              </p>
              <h3 className="fletcher-h3 text-[var(--fletcher-pine)]">
                Musicians · Performers · Artists · Actors
              </h3>
              <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
                You may be struggling with crippling performance anxiety and
                self-doubt.{' '}
                <Link
                  to="/v3/blog/promoted"
                  className="underline font-semibold text-[var(--fletcher-rust)] hover:text-[var(--fletcher-oxblood)]"
                >
                  I know what it feels like
                </Link>{' '}
                to be under that pressure and have your mind go completely
                blank. Let’s talk about the forces at work—external and
                internal—that combine to knock you off-balance in critical
                situations.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={PRACTICE_CONFIG.introCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fletcher-btn-primary"
                >
                  <span>Get Started Now</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link to="/v3/blog/promoted" className="fletcher-btn-outline-dark">
                  <span>Read “Promoted *”</span>
                </Link>
              </div>
            </div>
          </div>

          <figure className="order-1 lg:order-2 relative overflow-hidden bg-[var(--fletcher-pine)] min-h-[22rem] lg:min-h-full">
            <img
              src={assetUrl('media/piano-sheet-music.jpg')}
              alt="Open sheet music on an upright piano"
              width={1600}
              height={1067}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </figure>
        </article>

        {/* Row 3: University Students & PhD Candidates */}
        <article className="fletcher-split-50 border-b border-[var(--fletcher-border)]">
          <figure className="relative overflow-hidden bg-[var(--fletcher-pine)] min-h-[22rem] lg:min-h-full">
            <img
              src={assetUrl('media/phd-books.jpg')}
              alt="Person standing against a brick wall holding a tall stack of encyclopedia volumes in front of their face"
              width={1174}
              height={1600}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="flex items-center justify-center px-6 py-14 sm:px-12 lg:px-16">
            <div className="max-w-lg space-y-4 reveal-on-scroll">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
                Higher Education · Graduate Research
              </p>
              <h3 className="fletcher-h3 text-[var(--fletcher-pine)]">
                University Students &amp; PhD Candidates
              </h3>
              <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
                Ten years in university housing taught me about the wide
                variety of stressors that burden students. If you’re struggling
                with social adjustment, homesickness, uncertainty about the
                future, or the downright academic rigor of your program, I can
                help.
              </p>
              <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
                I have significant experience with graduate students and PhD
                candidates at any stage of the journey. If you’re paralyzed by
                procrastination, clashing with your advisor, or terrified of
                what your dissertation committee will think, let’s figure it out.
              </p>
            </div>
          </div>
        </article>

        {/* Row 4: Managers, Leaders & Adult Children of Narcissistic Parents */}
        <article className="fletcher-split-50">
          <div className="order-2 lg:order-1 flex items-center justify-center px-6 py-14 sm:px-12 lg:px-16">
            <div className="max-w-lg space-y-4 reveal-on-scroll">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
                Leadership · Family Dynamics · Boundaries
              </p>
              <h3 className="fletcher-h3 text-[var(--fletcher-pine)]">
                Managers &amp; Adult Children of Narcissistic Parents
              </h3>
              <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
                Whether you’re carrying a major launch on your shoulders while
                waiting to be “found out,” or still caught in cycles of
                people-pleasing shaped by narcissistic or abusive parents, we’ll
                unravel the hidden agendas running your inner voice—and help you
                stand firmly in your own life.
              </p>
            </div>
          </div>

          <figure className="order-1 lg:order-2 relative overflow-hidden bg-[var(--fletcher-pine)] min-h-[22rem] lg:min-h-full">
            <img
              src={assetUrl('media/red-seat-fenway.jpg')}
              alt="Lone red stadium seat standing out in a sea of green seats"
              width={1600}
              height={1063}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </figure>
        </article>
      </section>
    </div>
  );
}
