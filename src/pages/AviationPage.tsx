import { ArrowUpRight, ExternalLink, FileCheck2, Plane } from 'lucide-react';
import {
  AVIATION_FAQS,
  AVIATION_LINKS,
  PRACTICE_CONFIG,
} from '../data/siteContent';
import { FaqAccordion } from '../components/FaqAccordion';
import { assetUrl } from '../lib/assetUrl';

const OFFICIAL_RESOURCES = [
  {
    label: 'FAA Therapy & Counseling FAQs for Pilots & ATCS',
    href: AVIATION_LINKS.faaTherapyFaq,
  },
  {
    label: 'FAA Information for Psychotherapists Treating Pilots & ATCS',
    href: AVIATION_LINKS.faaPsychotherapists,
  },
  {
    label: 'FAA Pilot Mental Fitness Hub',
    href: AVIATION_LINKS.faaMentalFitness,
  },
  {
    label: 'Most Common Reported Medical Conditions (FAA)',
    href: AVIATION_LINKS.faaCommonConditions,
  },
  {
    label: 'Pilot Mental Health Campaign (PMHC) Provider Considerations',
    href: AVIATION_LINKS.pmhcGuide,
  },
  {
    label: 'Federal Air Surgeon Dr. Susan Northrup on Pilot Mental Health',
    href: AVIATION_LINKS.federalAirSurgeonVideo,
  },
];

export function AviationPage() {
  return (
    <div className="overflow-x-clip">
      {/* SECTION 1 — Full-Bleed Vermilion Aviation Hero */}
      <section className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 pt-10 pb-20 sm:pt-14 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              <Plane className="w-4 h-4" aria-hidden="true" />
              <span>PILOTS · AIR TRAFFIC CONTROL SPECIALISTS · FLIGHT ATTENDANTS</span>
            </div>

            <h1 className="font-display type-hero text-white">
              Pilots are
              <br />
              people, too.
            </h1>

            <p className="font-display-quote text-2xl sm:text-3xl text-[var(--meriden-cream)]">
              You don’t have to choose between your career and your health.
            </p>

            <p className="font-prose text-base sm:text-lg text-white/95 max-w-2xl leading-relaxed">
              Flying is a core part of your identity—and your livelihood.
              Whether you’ve been thinking about therapy while worried it could
              ground you, your medical application got deferred and you need a
              therapist to help get you back in the sky, or you’re a flight
              attendant at your breaking point, you need care from a clinician
              who knows your world.
            </p>

            <div className="pt-2">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-light"
              >
                <span>Schedule Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-2xl">
              <img
                src={assetUrl('media/discovery-flight.jpg')}
                alt="Jonathan Farr inside small aircraft cockpit wearing David Clark headset during a discovery flight"
                width={1600}
                height={1200}
                className="w-full h-auto aspect-[4/3] object-cover object-top"
              />
              <figcaption className="bg-[var(--meriden-espresso)] text-[var(--meriden-cream)] px-4 py-2.5 font-condensed text-xs uppercase tracking-widest">
                Me on a discovery flight from Minuteman Airport (6B6)
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Aviation-Informed Care & Collaborative Documentation */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-5 reveal-on-scroll">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--meriden-vermilion)]">
              AVIATION-INFORMED COUNSELING · 12+ YEARS EXPERIENCE
            </p>
            <h2 className="font-display type-h2 text-[var(--meriden-vermilion)]">
              Transparent documentation. Zero surprises.
            </h2>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
              I come to this work with a passion for human flight and a strong
              awareness of your context: constant crossing of time zones,
              stretches away from family, and the daily uncertainties of the job
              so you don’t have to spend half your session explaining how
              aviation works.
            </p>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
              <strong>I’ll bring</strong> my knowledge, enthusiasm, and skill
              with clinical documentation. When the FAA requests records, I know
              how to satisfy those requirements—and it is always a{' '}
              <strong>transparent, collaborative process</strong> where you
              review every word before anything is shared.
            </p>
            <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
              <strong>You’ll bring</strong> a desire for change and a
              willingness to be candid. Apprehension, confusion, worry,
              frustration—all of that is welcome in the room.
            </p>
          </div>

          <aside
            aria-label="Official FAA & PMHC Resources"
            className="lg:col-span-5 rounded-2xl border-2 border-[var(--meriden-vermilion)]/25 bg-[var(--meriden-cream-tint)]/75 p-7 sm:p-8 space-y-5 reveal-on-scroll"
          >
            <div className="flex items-center gap-2 font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-vermilion)] border-b border-[var(--meriden-vermilion)]/20 pb-3">
              <FileCheck2 className="w-4 h-4" aria-hidden="true" />
              <span>THINGS ARE CHANGING // OFFICIAL FAA &amp; PMHC LINKS</span>
            </div>
            <p className="font-prose text-sm text-[var(--meriden-espresso)]">
              Up until recently, aviation mental health was left in the shadows.
              These official resources outline your rights and pathways:
            </p>
            <ul className="space-y-3 list-none p-0 m-0">
              {OFFICIAL_RESOURCES.map((res) => (
                <li key={res.href}>
                  <a
                    href={res.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 text-sm font-prose font-medium text-[var(--meriden-terracotta)] hover:text-[var(--meriden-vermilion)] underline decoration-1 underline-offset-4"
                  >
                    <span>{res.label}</span>
                    <ExternalLink
                      className="w-4 h-4 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* SECTION 3 — Complete 5-Question Aviation FAQ Accordion */}
      <section className="bg-[var(--meriden-cream)] border-t-2 border-[var(--meriden-vermilion)]/15 px-5 sm:px-10 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-2 reveal-on-scroll">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-vermilion)]">
              FAA REPORTING, DIAGNOSIS &amp; MEDICATION
            </p>
            <h2 className="font-display type-h2 text-[var(--meriden-vermilion)]">
              Still Have Questions?
            </h2>
          </div>

          <FaqAccordion items={AVIATION_FAQS} groupName="aviation-faq" />

          <div className="pt-4">
            <a
              href={PRACTICE_CONFIG.introCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-solid"
            >
              <span>Book Your Free 15-Minute Consultation</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
