import { ArrowUpRight, ExternalLink, FileCheck2, Plane } from 'lucide-react';
import {
  AVIATION_FAQS,
  AVIATION_LINKS,
  PRACTICE_CONFIG,
} from '../data/siteContent';
import { FletcherFaqAccordion } from '../components/FletcherFaqAccordion';
import { assetUrl } from '../../../lib/assetUrl';

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
      {/* BAND 1 — Dark Pine Aviation Hero */}
      <section className="fletcher-band-black ds-section fletcher-hero-offset">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
              <Plane className="w-4 h-4" aria-hidden="true" />
              <span>Pilots · Air Traffic Control Specialists · Flight Attendants</span>
            </div>

            <h1 className="fletcher-h1 text-[var(--fletcher-on-pine)]">
              Pilots are
              <br />
              people, too.
            </h1>

            <p className="fletcher-display text-2xl sm:text-3xl text-[var(--fletcher-on-pine)]">
              You don’t have to choose between your career and your health.
            </p>

            <p className="text-base sm:text-lg text-[var(--fletcher-on-pine-muted)] max-w-2xl leading-relaxed">
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
                className="fletcher-btn-primary"
              >
                <span>Schedule Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="overflow-hidden ds-media-frame border-[var(--fletcher-border-dark)] bg-[var(--fletcher-cypress)]">
              <img
                src={assetUrl('media/discovery-flight.jpg')}
                alt="Jonathan Farr inside small aircraft cockpit wearing David Clark headset during a discovery flight"
                width={1600}
                height={1200}
                className="w-full h-auto aspect-[4/3] object-cover object-top"
              />
              <figcaption className="px-4 py-2.5 fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                Me on a discovery flight from Minuteman Airport (6B6)
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* BAND 2 — Celadon Mist Collaborative Documentation & Official FAA Links */}
      <section className="fletcher-band-white ds-section">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap">
          <div className="lg:col-span-7 space-y-5 reveal-on-scroll">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
              Aviation-Informed Counseling · 12+ Years Experience
            </p>
            <h2 className="fletcher-h2 text-[var(--fletcher-pine)]">
              Transparent documentation. Zero surprises.
            </h2>
            <p className="text-base sm:text-lg text-[var(--fletcher-pine)]/85 leading-relaxed">
              I come to this work with a passion for human flight and a strong
              awareness of your context: constant crossing of time zones,
              stretches away from family, and the daily uncertainties of the job
              so you don’t have to spend half your session explaining how
              aviation works.
            </p>
            <p className="text-base sm:text-lg text-[var(--fletcher-pine)]/85 leading-relaxed">
              <strong className="text-[var(--fletcher-pine)]">I’ll bring</strong> my
              knowledge, enthusiasm, and skill with clinical documentation. When
              the FAA requests records, I know how to satisfy those
              requirements—and it is always a{' '}
              <strong className="text-[var(--fletcher-pine)]">
                transparent, collaborative process
              </strong>{' '}
              where you review every word before anything is shared.
            </p>
            <p className="text-base sm:text-lg text-[var(--fletcher-pine)]/85 leading-relaxed">
              <strong className="text-[var(--fletcher-pine)]">You’ll bring</strong> a
              desire for change and a willingness to be candid. Apprehension,
              confusion, worry, frustration—all of that is welcome in the room.
            </p>
          </div>

          <aside
            aria-label="Official FAA & PMHC Resources"
            className="lg:col-span-5 ds-card border-[var(--fletcher-border)] bg-[var(--fletcher-mist-alt)]/55 p-7 sm:p-8 space-y-5 reveal-on-scroll"
          >
            <div className="flex items-center gap-2 fletcher-meta text-xs uppercase text-[var(--fletcher-pine)] border-b border-[var(--fletcher-border)] pb-3">
              <FileCheck2 className="w-4 h-4 text-[var(--fletcher-rust)]" aria-hidden="true" />
              <span>Things Are Changing // Official FAA &amp; PMHC Links</span>
            </div>
            <p className="text-sm text-[var(--fletcher-pine)]/85">
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
                    className="flex items-start justify-between gap-3 text-sm font-medium text-[var(--fletcher-rust)] hover:text-[var(--fletcher-oxblood)] underline decoration-1 underline-offset-4"
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

      {/* BAND 3 — Slate Cypress Policy Milestone Highlight */}
      <section className="fletcher-band-dark ds-section">
        <div className="max-w-[min(60rem,var(--ds-page-max-width))] mx-auto grid grid-cols-1 md:grid-cols-12 ds-grid-gap items-center reveal-on-scroll">
          <div className="md:col-span-8 space-y-3">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
              2026 Regulatory Shift
            </p>
            <h2 className="fletcher-h3 text-[var(--fletcher-on-cypress)]">
              May 2026 FAA Guidance &amp; Senate Bill 3258
            </h2>
            <p className="text-base text-[var(--fletcher-on-cypress-muted)] leading-relaxed">
              The FAA announced updated guidance encouraging pilots and air
              traffic controllers to seek mental health counseling, followed by
              unanimous US Senate passage of the Aviation Medication
              Transparency Act of 2026. Seeking support earlier protects both
              your livelihood and your well-being.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a
              href={AVIATION_LINKS.senateBill3258}
              target="_blank"
              rel="noopener noreferrer"
              className="fletcher-btn-outline-light"
            >
              <span>Read Bill S.3258</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* BAND 4 — Complete 5-Question Aviation FAQ Accordion */}
      <section className="fletcher-band-white ds-section">
        <div className="max-w-[min(58rem,var(--ds-page-max-width))] mx-auto space-y-10">
          <div className="space-y-2 reveal-on-scroll">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
              FAA Reporting, Diagnosis &amp; Medication
            </p>
            <h2
              id="v3-aviation-faq-heading"
              className="fletcher-h2 text-[var(--fletcher-pine)]"
            >
              Still Have Questions?
            </h2>
          </div>

          <FletcherFaqAccordion
            items={AVIATION_FAQS}
            tone="light"
            labelledBy="v3-aviation-faq-heading"
          />

          <div className="pt-4">
            <a
              href={PRACTICE_CONFIG.introCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fletcher-btn-primary"
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
