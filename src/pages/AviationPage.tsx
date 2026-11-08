import { ArrowUpRight, Plane, ShieldAlert, FileCheck2 } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/siteContent';

export function AviationPage() {
  return (
    <div>
      <section className="border-b border-[var(--border-hairline)] px-4 sm:px-8 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)] border border-[var(--border-hairline)] bg-[var(--surface-card)] px-3 py-1.5 rounded-sm">
            <Plane className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              AVIATION MENTAL HEALTH // PILOTS · ATCS · FLIGHT ATTENDANTS
            </span>
          </div>

          <h1 className="heading-display font-bold tracking-tight max-w-3xl">
            Pilots are people, too.{' '}
            <span className="font-editorial italic font-normal text-[var(--ink-secondary)]">
              Flying is part of who you are.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--ink-secondary)] max-w-3xl leading-relaxed">
            Whether you’ve been putting off therapy because you’re worried an
            AME will defer your medical, your medical application was already
            deferred and you want to get back in the sky, or you’re a flight
            attendant or controller carrying stress the general public doesn’t
            understand—you need an aviation-informed clinician.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-8 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="border border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              <span>FAA REPORTING & PRIVACY</span>
            </div>
            <h2 className="text-xl font-bold">
              Does entering counseling trigger an automatic report to the FAA?
            </h2>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
              <strong>Hell no.</strong> I will never notify the FAA or your
              Aviation Medical Examiner (AME) about your sessions without your
              knowledge. Pilots are not obliged to report routine counseling
              until their next medical examination.
            </p>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
              Furthermore, paying privately ($200/session) outside of insurance
              panels means no automated insurance diagnostic codes are submitted
              to third-party clearinghouses without your involvement.
            </p>
          </article>

          <article className="border border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              <FileCheck2 className="w-4 h-4" aria-hidden="true" />
              <span>COLLABORATIVE DOCUMENTATION</span>
            </div>
            <h2 className="text-xl font-bold">
              What if the FAA requests treatment documentation?
            </h2>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
              In May 2026, the FAA issued updated guidance encouraging pilots
              and controllers to seek mental health counseling as compatible
              with unrestricted medical certification.
            </p>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed">
              If the FAA ever requests records, I only share information with
              your signed release, and{' '}
              <strong>
                you and I review together every word to be shared
              </strong>
              —providing exactly what is requested, no less and no more.
            </p>
          </article>
        </div>

        <div className="max-w-6xl mx-auto mt-10">
          <a
            href={PRACTICE_CONFIG.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-hover)] text-white font-technical text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-sm transition-colors"
          >
            <span>Book a Confidential 15-Minute Consultation</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
