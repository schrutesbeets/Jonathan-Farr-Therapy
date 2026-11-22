import { Link } from 'react-router-dom';
import { ArrowUpRight, Receipt, Video } from 'lucide-react';
import { AVIATION_LINKS, PRACTICE_CONFIG } from '../data/siteContent';
import { ScallopBadgeShape, StarburstShape } from '../components/MeridenShapes';

export function ServicesPage() {
  return (
    <div className="overflow-x-clip">
      {/* SECTION 1 — Vermilion Services Hero */}
      <section className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 pt-10 pb-20 sm:pt-14 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              1×1 ONLINE THERAPY · ${PRACTICE_CONFIG.sessionFee} /{' '}
              {PRACTICE_CONFIG.sessionMinutes} MINUTES · MASSACHUSETTS
            </p>
            <h1 className="font-display type-hero text-white">
              Work
              <br />
              With Me
            </h1>
            <p className="font-prose text-lg sm:text-xl text-white/95 max-w-2xl leading-relaxed">
              Let’s put your unique story into context. I specialize in helping
              high-achieving adults—including aviation professionals—struggling
              with imposter syndrome, family relationships, and performance
              anxiety stop negative self-talk and finally ally with helpful
              beliefs.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-light"
              >
                <span>Schedule Free 15-Min Consult</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#mentaya-checker" className="btn-pill-light">
                <span>Check OON Benefits</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-2xl">
              <img
                src="/media/studio-mic.jpg"
                alt="Vintage metallic condenser microphone under warm stage lighting"
                width={1600}
                height={1067}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Two Bold Meriden Emblem Service Cards */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <article className="rounded-2xl border-2 border-[var(--meriden-vermilion)]/25 bg-[var(--meriden-cream-tint)]/60 p-8 sm:p-10 flex flex-col items-center text-center space-y-5 reveal-on-scroll">
            <ScallopBadgeShape
              color="var(--meriden-marigold)"
              className="w-24 h-24"
            />
            <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
              INDIVIDUAL TELETHERAPY · 55 MINUTES
            </p>
            <h2 className="font-display type-h3 text-[var(--meriden-vermilion)]">
              1×1 Virtual Sessions — ${PRACTICE_CONFIG.sessionFee}
            </h2>
            <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
              I shifted to 100% online teletherapy for adults across
              Massachusetts. Choosing not to contract with insurance panels
              means the only people who dictate what happens in the treatment
              session are <strong>you and me</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-condensed uppercase tracking-wider text-[var(--meriden-terracotta)] pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[var(--meriden-vermilion)]" aria-hidden="true" />
                <span>Mon–Thu Openings</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-[var(--meriden-vermilion)]" aria-hidden="true" />
                <span>Monthly Superbills</span>
              </span>
            </div>
            <div className="pt-2">
              <a
                href={PRACTICE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-vermilion"
              >
                <span>Client Portal &amp; Scheduling</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="rounded-2xl border-2 border-[var(--meriden-vermilion)]/25 bg-[var(--meriden-cream-tint)]/60 p-8 sm:p-10 flex flex-col items-center text-center space-y-5 reveal-on-scroll">
            <StarburstShape
              color="var(--meriden-vermilion)"
              className="w-24 h-24"
            />
            <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
              INTRODUCTORY CALL · 15 MINUTES
            </p>
            <h2 className="font-display type-h3 text-[var(--meriden-vermilion)]">
              Free Consultation — $0
            </h2>
            <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
              Wondering if you’ll actually click with me before spending ${PRACTICE_CONFIG.sessionFee}?
              Book a free 15-minute intro conversation. We’ll talk candidly
              about what brought you here, whether I’m the right fit, and what
              working together actually looks like.
            </p>
            <div className="pt-4">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-solid"
              >
                <span>Request Intro Call</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION 3 — Mentaya Out-of-Network Eligibility Checker */}
      <section
        id="mentaya-checker"
        className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 py-20 sm:py-24"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-3 text-center reveal-on-scroll">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              OUT-OF-NETWORK REIMBURSEMENT // MENTAYA
            </p>
            <h2 className="font-display type-h2 text-white">
              Check Your OON Benefits
            </h2>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-cream)] max-w-2xl mx-auto leading-relaxed">
              Your insurance may reimburse you for visits with an out-of-network
              provider. Check your coverage below right now with just your
              insurance member ID. I provide a superbill you can submit directly
              for free—or submit claims through Mentaya for just 5% per claim.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-3 sm:p-5 shadow-2xl">
            <iframe
              src={PRACTICE_CONFIG.mentayaWidgetUrl}
              title="Check Mentaya Out-of-Network Eligibility"
              width="100%"
              height="420"
              loading="lazy"
              className="w-full border-0 rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 — Who I Work Best With (Alternating Bold Editorial Rows) */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-2 reveal-on-scroll">
            <p className="font-condensed text-sm uppercase tracking-[0.22em] text-[var(--meriden-vermilion)]">
              SPECIALTIES &amp; POPULATIONS
            </p>
            <h2 className="font-display type-h2 text-[var(--meriden-vermilion)]">
              Who I Work Best With
            </h2>
          </div>

          {/* Row 1: Aviation Personnel */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center reveal-on-scroll">
            <figure className="lg:col-span-6 overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-lg">
              <img
                src="/media/saab-340.jpg"
                alt="Red and silver Saab 340 turboprop aircraft on tarmac with ramp marshaller"
                width={1600}
                height={1200}
                loading="lazy"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <figcaption className="bg-[var(--meriden-espresso)] text-[var(--meriden-cream)] px-4 py-2.5 font-condensed text-xs uppercase tracking-widest">
                Yes, that’s a Saab 340. I flew on it. It was loud.
              </figcaption>
            </figure>

            <div className="lg:col-span-6 space-y-4">
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
                PILOTS · CONTROLLERS · FLIGHT ATTENDANTS
              </p>
              <h3 className="font-display type-h3 text-[var(--meriden-vermilion)]">
                Aviation Personnel
              </h3>
              <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
                You’re under a tremendous amount of stress—the kind that the
                general public just doesn’t understand—and you haven’t dared to
                deal with it because you’re afraid of getting grounded.
              </p>
              <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
                At long last, things are changing. The FAA announced{' '}
                <a
                  href={AVIATION_LINKS.faaTherapyFaq}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-[var(--meriden-terracotta)] hover:text-[var(--meriden-vermilion)]"
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
                  className="underline font-semibold text-[var(--meriden-terracotta)] hover:text-[var(--meriden-vermilion)]"
                >
                  Aviation Medication Transparency Act of 2026
                </a>
                .
              </p>
              <div className="pt-2">
                <Link to="/aviation-professionals" className="btn-pill-vermilion">
                  <span>Read Aviation Briefing &amp; FAA FAQs</span>
                </Link>
              </div>
            </div>
          </article>

          {/* Row 2: Musicians, Performers, Artists, Actors */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center reveal-on-scroll">
            <div className="lg:col-span-6 lg:order-1 order-2 space-y-4">
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
                STAGE · BROADCAST · STUDIO
              </p>
              <h3 className="font-display type-h3 text-[var(--meriden-vermilion)]">
                Musicians · Performers · Artists · Actors
              </h3>
              <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
                You may be struggling with crippling performance anxiety and
                self-doubt.{' '}
                <Link
                  to="/blog/promoted"
                  className="underline font-semibold text-[var(--meriden-terracotta)] hover:text-[var(--meriden-vermilion)]"
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
                  className="btn-pill-solid"
                >
                  <span>Get Started Now</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <Link to="/blog/promoted" className="btn-pill-vermilion">
                  <span>Read “Promoted *”</span>
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-6 lg:order-2 order-1 overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-lg">
              <img
                src="/media/piano-sheet-music.jpg"
                alt="Open sheet music on an upright piano"
                width={1600}
                height={1067}
                loading="lazy"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </figure>
          </article>

          {/* Row 3: University Students & PhD Candidates */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center reveal-on-scroll">
            <figure className="lg:col-span-6 overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-lg">
              <img
                src="/media/phd-books.jpg"
                alt="Person standing against a brick wall holding a tall stack of encyclopedia volumes in front of their face"
                width={1174}
                height={1600}
                loading="lazy"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </figure>

            <div className="lg:col-span-6 space-y-4">
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
                HIGHER EDUCATION · GRADUATE RESEARCH
              </p>
              <h3 className="font-display type-h3 text-[var(--meriden-vermilion)]">
                University Students &amp; PhD Candidates
              </h3>
              <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
                Ten years in university housing taught me about the wide
                variety of stressors that burden students. If you’re struggling
                with social adjustment, homesickness, uncertainty about the
                future, or the downright academic rigor of your program, I can
                help.
              </p>
              <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
                I have significant experience with graduate students and PhD
                candidates at any stage of the journey. If you’re paralyzed by
                procrastination, clashing with your advisor, or terrified of
                what your dissertation committee will think, let’s figure it out.
              </p>
            </div>
          </article>

          {/* Row 4: Managers, Leaders & Adult Children of Narcissistic Parents */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center reveal-on-scroll">
            <div className="lg:col-span-6 lg:order-1 order-2 space-y-4">
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
                LEADERSHIP · FAMILY DYNAMICS · BOUNDARIES
              </p>
              <h3 className="font-display type-h3 text-[var(--meriden-vermilion)]">
                Managers &amp; Adult Children of Narcissistic Parents
              </h3>
              <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
                Whether you’re carrying a major launch on your shoulders while
                waiting to be “found out,” or still caught in cycles of
                people-pleasing shaped by narcissistic or abusive parents, we’ll
                unravel the hidden agendas running your inner voice—and help you
                stand firmly in your own life.
              </p>
            </div>

            <figure className="lg:col-span-6 lg:order-2 order-1 overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-lg">
              <img
                src="/media/red-seat-fenway.jpg"
                alt="Lone red stadium seat standing out in a sea of green seats"
                width={1600}
                height={1063}
                loading="lazy"
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </figure>
          </article>
        </div>
      </section>
    </div>
  );
}
