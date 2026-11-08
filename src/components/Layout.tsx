import { Link, NavLink, Outlet } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Radio } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/siteContent';

const NAV_ITEMS = [
  { to: '/', label: 'Practice' },
  { to: '/about', label: 'About Jonathan' },
  { to: '/aviation-professionals', label: 'Aviation' },
  { to: '/services', label: 'Rates & OON Benefits' },
];

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-bg)] text-[var(--ink-primary)]">
      {/* Top Technical Telemetry Bar (Braun-inspired functional status header) */}
      <div className="border-b border-[var(--border-hairline)] bg-[var(--surface-card)] px-4 sm:px-8 py-2 text-xs font-technical text-[var(--ink-secondary)]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
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
      <header className="sticky top-0 z-30 border-b border-[var(--border-hairline)] bg-[var(--surface-bg)]/95 backdrop-blur-sm px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
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
                    end={item.to === '/'}
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
            className="inline-flex items-center gap-1.5 bg-[var(--ink-primary)] hover:bg-[var(--accent-signal)] text-[var(--surface-bg)] text-xs sm:text-sm font-technical uppercase tracking-wider px-4 py-2.5 rounded-sm transition-colors"
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
      <footer className="border-t border-[var(--border-hairline)] bg-[var(--surface-dark)] text-[#f6f5f1] px-4 sm:px-8 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2 font-technical text-xs uppercase tracking-widest text-[#a3a19a]">
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
                className="inline-flex items-center gap-2 bg-[var(--accent-signal)] hover:bg-[var(--accent-signal-hover)] text-white text-xs font-technical uppercase tracking-wider px-5 py-3 rounded-sm transition-colors"
              >
                <span>Schedule Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <h2 className="font-technical text-xs uppercase tracking-widest text-[#a3a19a] mb-3">
              Navigation
            </h2>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[#d8d6ce] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <h2 className="font-technical text-xs uppercase tracking-widest text-[#a3a19a] mb-3">
              Practice & Credentials
            </h2>
            <p className="text-[#d8d6ce]">{PRACTICE_CONFIG.clinician}</p>
            <p className="text-[#a3a19a] text-xs">
              MA Licensed Mental Health Counselor #{PRACTICE_CONFIG.licenseNumber}
            </p>
            <p className="pt-2">
              <a
                href={PRACTICE_CONFIG.phoneHref}
                className="text-[#d8d6ce] hover:text-white transition-colors block"
              >
                {PRACTICE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${PRACTICE_CONFIG.email}`}
                className="text-[#d8d6ce] hover:text-white transition-colors block"
              >
                {PRACTICE_CONFIG.email}
              </a>
            </p>
            <p className="pt-2">
              <a
                href={PRACTICE_CONFIG.licenseVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-technical text-[#a3a19a] hover:text-white underline underline-offset-4"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Verify MA License #{PRACTICE_CONFIG.licenseNumber}</span>
              </a>
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#8c8a84] font-technical">
          <p>© {new Date().getFullYear()} Jonathan Farr, LMHC. All rights reserved.</p>
          <p>
            Note: Standard email and SMS are not HIPAA-encrypted. Use the secure
            client portal for clinical communication.
          </p>
        </div>
      </footer>
    </div>
  );
}
