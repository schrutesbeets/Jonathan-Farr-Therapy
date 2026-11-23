import { useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Radio } from 'lucide-react';
import { PRACTICE_CONFIG } from './data/siteContent';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useDesignSystem } from '../../design-system/useDesignSystem';
import { DesignSystemPanel } from '../../design-system/DesignSystemPanel';

const NAV_ITEMS = [
  { to: '/v1', label: 'Practice' },
  { to: '/v1/about', label: 'About Jonathan' },
  { to: '/v1/aviation-professionals', label: 'Aviation' },
  { to: '/v1/services', label: 'Rates & OON Benefits' },
];

export function V1Layout() {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const ds = useDesignSystem('v1', rootRef);

  useScrollReveal(
    location.pathname,
    ds.settings.animations.style,
    ds.replayNonce,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      ref={rootRef}
      data-variant="v1"
      className="min-h-screen flex flex-col bg-[var(--surface-bg)] text-[var(--ink-primary)]"
    >
      {/* Top Technical Telemetry Bar (Braun-inspired functional status header) */}
      <div
        className="border-b border-[var(--border-hairline)] bg-[var(--surface-card)] py-2 text-xs font-technical text-[var(--ink-secondary)]"
        style={{ paddingInline: 'clamp(1rem, 4vw, var(--ds-site-margin, 2rem))' }}
      >
        <div className="ds-container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full bg-[var(--accent-signal)]"
              aria-hidden="true"
            />
            <span>STATUS: {PRACTICE_CONFIG.availability.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{PRACTICE_CONFIG.format.toUpperCase()}</span>
            <span className="hidden sm:inline" aria-hidden="true">
              |
            </span>
            <span className="hidden sm:inline">
              MA LICENSE #{PRACTICE_CONFIG.licenseNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Semantic Header & Navigation */}
      <header
        className="sticky top-0 z-30 border-b border-[var(--border-hairline)] bg-[var(--surface-bg)]/95 backdrop-blur-sm py-4"
        style={{ paddingInline: 'clamp(1rem, 4vw, var(--ds-site-margin, 2rem))' }}
      >
        <div className="ds-container flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/v1"
            className="group flex items-baseline gap-2.5 focus:outline-none"
          >
            <span className="font-bold tracking-tight text-lg sm:text-xl">
              JONATHAN FARR
            </span>
            <span className="font-technical text-xs uppercase tracking-widest text-[var(--ink-muted)] border border-[var(--border-hairline)] px-2 py-0.5 rounded-sm">
              LMHC
            </span>
          </Link>

          <nav aria-label="Primary Navigation">
            <ul className="flex flex-wrap items-center gap-5 sm:gap-7 text-sm font-medium">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/v1'}
                    className={({ isActive }) =>
                      `transition-colors py-1 border-b-2 ${
                        isActive
                          ? 'border-[var(--accent-signal)] text-[var(--ink-primary)] font-semibold'
                          : 'border-transparent text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={PRACTICE_CONFIG.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="v1-btn-header"
          >
            <span>Free 15-Min Consult</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Main Content Landmark */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Semantic Footer */}
      <footer
        className="border-t border-[var(--border-hairline)] bg-[var(--surface-dark)] text-[var(--surface-dark-ink)] py-14"
        style={{ paddingInline: 'clamp(1rem, 4vw, var(--ds-site-margin, 2rem))' }}
      >
        <div className="ds-container grid grid-cols-1 md:grid-cols-12 ds-grid-gap">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[var(--surface-dark-muted)]">
              <Radio
                className="w-4 h-4 text-[var(--accent-signal)]"
                aria-hidden="true"
              />
              <span>Signal Over Noise · Boutique Private-Pay Practice</span>
            </div>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight max-w-md">
              Helping high-achievers stop cycles of people-pleasing and emerge
              into a life that truly belongs to them.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={PRACTICE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="v1-btn-primary"
              >
                <span>Schedule Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <h2 className="font-technical text-xs uppercase tracking-widest text-[var(--surface-dark-muted)] mb-3">
              Navigation
            </h2>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[var(--surface-dark-muted)] hover:text-[var(--surface-dark-ink)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <h2 className="font-technical text-xs uppercase tracking-widest text-[var(--surface-dark-muted)] mb-3">
              Practice &amp; Credentials
            </h2>
            <p className="text-[var(--surface-dark-muted)]">{PRACTICE_CONFIG.clinician}</p>
            <p className="text-[var(--surface-dark-muted)] text-xs opacity-80">
              MA Licensed Mental Health Counselor #{PRACTICE_CONFIG.licenseNumber}
            </p>
            <p className="pt-2">
              <a
                href={PRACTICE_CONFIG.phoneHref}
                className="text-[var(--surface-dark-muted)] hover:text-[var(--surface-dark-ink)] transition-colors block"
              >
                {PRACTICE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${PRACTICE_CONFIG.email}`}
                className="text-[var(--surface-dark-muted)] hover:text-[var(--surface-dark-ink)] transition-colors block"
              >
                {PRACTICE_CONFIG.email}
              </a>
            </p>
            <p className="pt-2">
              <a
                href={PRACTICE_CONFIG.licenseVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-technical text-[var(--surface-dark-muted)] hover:text-[var(--surface-dark-ink)] underline underline-offset-4"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Verify MA License #{PRACTICE_CONFIG.licenseNumber}</span>
              </a>
            </p>
          </div>
        </div>

        <div className="ds-container mt-12 pt-6 border-t border-current/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--surface-dark-muted)] opacity-80 font-technical">
          <p>© {new Date().getFullYear()} Jonathan Farr, LMHC. All rights reserved.</p>
          <p>
            Note: Standard email and SMS are not HIPAA-encrypted. Use the secure
            client portal for clinical communication.
          </p>
        </div>
      </footer>

      <DesignSystemPanel
        variantId="v1"
        settings={ds.settings}
        isCustomized={ds.isCustomized}
        statusMessage={ds.statusMessage}
        onUpdateSection={ds.updateSection}
        onApplyFontPack={ds.applyFontPack}
        onApplyColorPalette={ds.applyColorPalette}
        onApplyFormPack={ds.applyFormPack}
        onReset={ds.resetToDefaults}
        onExport={ds.exportToFile}
        onImport={ds.importFromFile}
        onCopyCss={ds.copyCss}
        onReplayAnimations={ds.triggerReplayAnimations}
        onClearStatus={ds.clearStatus}
      />
    </div>
  );
}
