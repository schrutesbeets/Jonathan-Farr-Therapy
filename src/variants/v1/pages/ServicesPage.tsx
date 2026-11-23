import { ArrowUpRight, Receipt, Lock } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/siteContent';

export function ServicesPage() {
  return (
    <div>
      <section className="border-b border-[var(--border-hairline)] ds-section">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-start">
          <div className="lg:col-span-7 space-y-6 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)] border border-[var(--border-hairline)] bg-[var(--surface-card)] px-3 py-1.5 rounded-sm">
              <span>SERVICES, FEES & OUT-OF-NETWORK REIMBURSEMENT</span>
            </div>

            <h1 className="heading-display font-bold tracking-tight">
              The only people who dictate what happens in the session are{' '}
              <span className="font-editorial italic font-normal text-[var(--ink-secondary)]">
                you and me.
              </span>
            </h1>

            <p className="text-lg text-[var(--ink-secondary)] leading-relaxed">
              I operate as an out-of-network, private-pay provider so your care
              isn’t constrained by insurance quotas, arbitrary session caps, or
              forced diagnostic labels.
            </p>
          </div>

          <aside
            aria-label="Fee Breakdown"
            className="lg:col-span-5 ds-card border-[var(--border-hairline)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-5 reveal-on-scroll"
          >
            <div className="flex items-baseline justify-between border-b border-[var(--border-hairline)] pb-4">
              <span className="font-technical text-xs uppercase tracking-widest text-[var(--ink-muted)]">
                INDIVIDUAL SESSION
              </span>
              <span className="text-3xl font-bold">
                ${PRACTICE_CONFIG.sessionFee}
              </span>
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--ink-secondary)]">
              <li className="flex items-center gap-2">
                <Lock
                  className="w-4 h-4 text-[var(--accent-signal)] shrink-0"
                  aria-hidden="true"
                />
                <span>55-minute 1-on-1 telehealth session (Massachusetts)</span>
              </li>
              <li className="flex items-center gap-2">
                <Receipt
                  className="w-4 h-4 text-[var(--accent-signal)] shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Monthly superbills provided automatically or on request
                </span>
              </li>
            </ul>
            <a
              href={PRACTICE_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full v1-btn-primary"
            >
              <span>Schedule Free 15-Minute Consultation</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      {/* Mentaya Out-of-Network Benefits Eligibility Section */}
      <section className="ds-section">
        <div className="max-w-[min(56rem,var(--ds-page-max-width))] mx-auto space-y-6 reveal-on-scroll">
          <div className="space-y-2">
            <p className="font-technical text-xs uppercase tracking-widest text-[var(--accent-signal)]">
              INSTANT REIMBURSEMENT CHECKER // MENTAYA
            </p>
            <h2 className="heading-section font-bold">
              Check your out-of-network benefits in 60 seconds.
            </h2>
            <p className="text-sm sm:text-base text-[var(--ink-secondary)]">
              Many PPO and out-of-network plans reimburse a significant portion
              of each session once your deductible is met. You can submit the
              monthly superbill I provide directly to your insurance carrier for
              free, or use Mentaya to submit claims automatically for a 5% fee.
            </p>
          </div>

          <div className="ds-card border-[var(--border-hairline)] bg-white p-2 sm:p-4">
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
    </div>
  );
}
