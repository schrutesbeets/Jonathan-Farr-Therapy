import { ArrowUpRight, Calendar, Lock, Mail, MessageSquare, Phone } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/siteContent';

export function ContactPage() {
  return (
    <div className="overflow-x-clip">
      {/* SECTION 1 — Full-Bleed Vermilion Contact Hero */}
      <section className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 pt-10 pb-20 sm:pt-14 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              ACCEPTING NEW CLIENTS · {PRACTICE_CONFIG.availability.toUpperCase()}
            </p>
            <h1 className="font-display type-hero text-white">
              Let’s
              <br />
              Chat.
            </h1>
            <p className="font-prose text-lg sm:text-xl text-white/95 max-w-xl leading-relaxed">
              Schedule a free, 15-minute consultation to talk through what
              brought you here and make sure we’re the right fit.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-light"
              >
                <span>Request Intro Call</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={PRACTICE_CONFIG.contactWidgetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-light"
              >
                <span>Request Alternate Time</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-2xl">
              <img
                src="/media/runway-28.jpg"
                alt="Runway 28 stretching toward the horizon at twilight"
                width={1600}
                height={1044}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Contact & Scheduling Paths */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="rounded-2xl border-2 border-[var(--meriden-vermilion)]/25 bg-[var(--meriden-cream-tint)]/60 p-8 space-y-4 reveal-on-scroll">
            <div className="flex items-center gap-2 font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-vermilion)]">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>STEP 01 // FREE INTRO CALL</span>
            </div>
            <h2 className="font-display-quote text-2xl sm:text-3xl text-[var(--meriden-terracotta)]">
              Schedule a Free 15-Minute Consultation
            </h2>
            <p className="font-prose text-base text-[var(--meriden-espresso)] leading-relaxed">
              Visit my profile and click{' '}
              <strong>“Request Intro Call”</strong> to grab a 15-minute slot
              directly on my calendar. If a time you’d like doesn’t appear, send
              a quick message via SimplePractice to check alternate Monday–Thursday
              openings.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-solid"
              >
                <span>Request Intro Call</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={PRACTICE_CONFIG.contactWidgetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-vermilion"
              >
                <span>Send Availability Message</span>
              </a>
            </div>
          </article>

          <article className="rounded-2xl border-2 border-[var(--meriden-vermilion)]/25 bg-[var(--meriden-cream-tint)]/60 p-8 space-y-4 reveal-on-scroll">
            <div className="flex items-center gap-2 font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-vermilion)]">
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>STEP 02 // DIRECT &amp; PORTAL</span>
            </div>
            <h2 className="font-display-quote text-2xl sm:text-3xl text-[var(--meriden-terracotta)]">
              Call, Text, Email, or Client Portal
            </h2>
            <div className="space-y-3 font-prose text-base text-[var(--meriden-espresso)]">
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--meriden-vermilion)] shrink-0" aria-hidden="true" />
                <a
                  href={PRACTICE_CONFIG.phoneHref}
                  className="font-semibold hover:text-[var(--meriden-vermilion)] underline underline-offset-4"
                >
                  {PRACTICE_CONFIG.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--meriden-vermilion)] shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${PRACTICE_CONFIG.email}`}
                  className="font-semibold hover:text-[var(--meriden-vermilion)] underline underline-offset-4 break-all"
                >
                  {PRACTICE_CONFIG.email}
                </a>
              </p>
            </div>

            <p className="text-xs font-prose text-[var(--meriden-terracotta)] bg-[var(--meriden-cream)] border border-[var(--meriden-vermilion)]/25 rounded-lg p-3">
              <strong>Note:</strong> When texting or emailing me, be sure to
              leave out sensitive information or details. Standard texting and
              email aren’t secure to HIPAA standards.
            </p>

            <div className="pt-1">
              <a
                href={PRACTICE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-vermilion"
              >
                <Lock className="w-4 h-4" aria-hidden="true" />
                <span>Existing Client Portal</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
