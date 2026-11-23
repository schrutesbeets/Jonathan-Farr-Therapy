import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Menu, ShieldCheck } from 'lucide-react';
import { PRACTICE_CONFIG } from './data/siteContent';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useDesignSystem } from '../../design-system/useDesignSystem';
import { DesignSystemPanel } from '../../design-system/DesignSystemPanel';

export interface V3OutletContext {
  ambientMotion: boolean;
}

const HEADER_NAV = [
  { to: '/v3/about', label: 'About' },
  { to: '/v3/services', label: 'Services' },
  { to: '/v3/aviation-professionals', label: 'Aviation' },
  { to: '/v3/blog', label: 'Writing' },
  { to: '/v3/contact', label: 'Contact' },
];

export function V3Layout() {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const lastCollapsedWidthRef = useRef<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const ds = useDesignSystem('v3', rootRef);

  useScrollReveal(
    location.pathname,
    ds.settings.animations.style,
    ds.replayNonce,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const menu = menuRef.current as
      | (HTMLUListElement & { hidePopover?: () => void })
      | null;
    if (menu && menu.hasAttribute('popover') && menu.matches(':popover-open')) {
      try {
        menu.hidePopover?.();
      } catch {
        // Ignore if already closed
      }
    }
  }, [location.pathname]);

  const isSubpage = location.pathname !== '/v3' && location.pathname !== '/v3/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
      void import('@oddbird/popover-polyfill');
    }

    const header = headerRef.current;
    const inner = innerRef.current;
    const menu = menuRef.current as
      | (HTMLUListElement & { showPopover?: () => void })
      | null;
    if (!header || !inner || !menu) return;

    let rafId = 0;

    const measureLayout = () => {
      const wasWide = header.classList.contains('is-wide');
      const currentWidth = header.clientWidth;

      if (!wasWide && currentWidth <= lastCollapsedWidthRef.current) {
        return;
      }

      const wasOpen =
        menu.hasAttribute('popover') &&
        (menu.matches(':popover-open') || menu.classList.contains(':popover-open'));

      header.classList.add('is-measuring');
      header.classList.add('is-wide');
      menu.removeAttribute('popover');

      const fitsInline = inner.scrollWidth <= inner.clientWidth;

      if (fitsInline) {
        header.classList.add('is-wide');
        menu.removeAttribute('popover');
        lastCollapsedWidthRef.current = 0;
      } else {
        header.classList.remove('is-wide');
        menu.setAttribute('popover', 'auto');
        lastCollapsedWidthRef.current = currentWidth;
        if (wasOpen) {
          try {
            menu.showPopover?.();
          } catch {
            // Ignore polyfill timing if needed
          }
        }
      }

      rafId = requestAnimationFrame(() => {
        header.classList.remove('is-measuring');
      });
    };

    measureLayout();

    const observer = new ResizeObserver(() => {
      measureLayout();
    });
    observer.observe(header);
    observer.observe(menu);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const outletContext: V3OutletContext = {
    ambientMotion: ds.settings.animations.ambientMotion,
  };

  return (
    <div
      ref={rootRef}
      data-variant="v3"
      className="min-h-screen flex flex-col bg-[var(--fletcher-mist)] text-[var(--fletcher-pine)]"
    >
      <a
        href="#v3-main-content"
        className="fletcher-visually-hidden focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 fletcher-btn-primary"
      >
        Skip to Content
      </a>

      <header
        ref={headerRef}
        className={`site-header py-5 ${isScrolled ? 'is-scrolled' : ''} ${
          isSubpage ? 'is-solid' : ''
        }`}
        style={{ paddingInline: 'clamp(1.25rem, 4vw, var(--ds-site-margin, 3rem))' }}
      >
        <div ref={innerRef} className="header-inner ds-container">
          <Link
            to="/v3"
            className="inline-flex items-baseline gap-2.5 text-[var(--fletcher-on-pine)] no-underline hover:opacity-85 transition-opacity"
          >
            <span className="fletcher-wordmark text-2xl sm:text-3xl">
              Jonathan Farr
            </span>
            <span className="fletcher-meta text-xs uppercase opacity-75">
              LMHC
            </span>
          </Link>

          <nav aria-label="Primary">
            <button
              type="button"
              className="menu-button"
              aria-controls="v3-site-menu"
              {...({
                popovertarget: 'v3-site-menu',
                popovertargetaction: 'toggle',
              } as Record<string, string>)}
            >
              <Menu className="w-4 h-4" aria-hidden="true" />
              <span>Menu</span>
            </button>

            <ul ref={menuRef} id="v3-site-menu" className="site-menu">
              {HEADER_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    aria-current={location.pathname === item.to ? 'page' : undefined}
                    className="nav-link hover:opacity-80 transition-opacity"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <a
                  href={PRACTICE_CONFIG.introCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fletcher-btn-header"
                >
                  <span>Make an Appointment</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="v3-main-content" className="flex-1">
        <Outlet context={outletContext} />
      </main>

      {/* Signature Fletcher Dark Pine-Slate Footer with Monumental Right-Anchored Wordmark */}
      <footer
        className="fletcher-band-black border-t border-[var(--fletcher-border-dark)] py-16 sm:py-20"
        style={{ paddingInline: 'clamp(1.25rem, 4vw, var(--ds-site-margin, 3rem))' }}
      >
        <div className="ds-container space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-start">
            {/* Left Zone: Practice Details & Licensure */}
            <div className="lg:col-span-4 space-y-3 text-sm text-[var(--fletcher-on-pine-muted)]">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine)]">
                Massachusetts Telehealth
              </p>
              <p>{PRACTICE_CONFIG.format}</p>
              <p>
                ${PRACTICE_CONFIG.sessionFee} per {PRACTICE_CONFIG.sessionMinutes}-minute
                session · {PRACTICE_CONFIG.availability}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={PRACTICE_CONFIG.licenseVerifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--fletcher-on-pine)] hover:opacity-80 underline underline-offset-4"
                >
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Verify MA License #{PRACTICE_CONFIG.licenseNumber}</span>
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--fletcher-on-pine-muted)] hover:text-[var(--fletcher-on-pine)] underline underline-offset-4"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>All Design Variations</span>
                </Link>
              </div>
            </div>

            {/* Middle Zone: Direct Contact & Navigation */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 text-sm">
              <div className="space-y-2.5 text-[var(--fletcher-on-pine)]">
                <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
                  Direct Contact
                </p>
                <p>
                  <a
                    href={`mailto:${PRACTICE_CONFIG.email}`}
                    className="hover:opacity-80 underline underline-offset-4 break-words"
                  >
                    jonathan@<wbr />jonathanfarrtherapy.com
                  </a>
                </p>
                <p>
                  <a
                    href={PRACTICE_CONFIG.phoneHref}
                    className="hover:opacity-80 underline underline-offset-4"
                  >
                    {PRACTICE_CONFIG.phone}
                  </a>
                </p>
                <p className="pt-1">
                  <a
                    href={PRACTICE_CONFIG.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:opacity-80 underline underline-offset-4"
                  >
                    <span>Client Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </p>
              </div>

              <div className="space-y-2.5 text-[var(--fletcher-on-pine)]">
                <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
                  Explore
                </p>
                <ul className="space-y-2 list-none p-0 m-0">
                  {HEADER_NAV.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="hover:opacity-80 underline-offset-4 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Zone: Monumental Right-Anchored Wordmark (Fletcher Footer Signature) */}
            <div className="lg:col-span-4 lg:text-right space-y-2 self-end">
              <p className="fletcher-wordmark text-5xl sm:text-6xl xl:text-7xl text-[var(--fletcher-on-pine)]">
                Jonathan Farr
              </p>
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
                Therapy · {PRACTICE_CONFIG.credentials}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--fletcher-border-dark)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--fletcher-on-pine-muted)]">
            <p>© {new Date().getFullYear()} Jonathan Farr, LMHC</p>
            <p className="max-w-xl">
              Note: Standard email and texting are not HIPAA-encrypted. Leave out
              sensitive clinical details when reaching out.
            </p>
            <p>All words written by a human</p>
          </div>
        </div>
      </footer>

      <DesignSystemPanel
        variantId="v3"
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
