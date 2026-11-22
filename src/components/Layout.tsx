import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { assetUrl } from '../lib/assetUrl';

const HEADER_NAV = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/aviation-professionals', label: 'Aviation' },
  { to: '/blog', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
];

export function Layout() {
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const lastCollapsedWidthRef = useRef<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useScrollReveal(location.pathname);

  // Scroll to top & close popover menu on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    const menu = menuRef.current as (HTMLUListElement & { hidePopover?: () => void }) | null;
    if (menu && menu.hasAttribute('popover') && menu.matches(':popover-open')) {
      try {
        menu.hidePopover?.();
      } catch {
        // Ignore if not open
      }
    }
  }, [location.pathname]);

  // Subtle shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Conditional Popover API polyfill + ResizeObserver measurement for responsive navbar
  useEffect(() => {
    if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
      import('@oddbird/popover-polyfill');
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

      // While collapsed, only re-measure if header width actually grew
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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--meriden-cream)] text-[var(--meriden-espresso)]">
      <header
        ref={headerRef}
        className={`site-header px-5 sm:px-10 py-4 ${isScrolled ? 'is-scrolled' : ''}`}
      >
        <div ref={innerRef} className="header-inner max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-3 text-[var(--meriden-white)] no-underline group"
          >
            <img
              src={assetUrl('media/jft-logo-white.png')}
              alt=""
              width={1473}
              height={1360}
              className="w-8 h-8 object-contain"
            />
            <span className="font-display text-lg sm:text-xl tracking-tight">
              Jonathan Farr Therapy
            </span>
          </Link>

          <nav aria-label="Primary">
            <button
              type="button"
              className="menu-button"
              aria-controls="site-menu"
              {...({
                popovertarget: 'site-menu',
                popovertargetaction: 'toggle',
              } as Record<string, string>)}
            >
              <Menu className="w-4 h-4" aria-hidden="true" />
              <span>Menu</span>
            </button>

            <ul ref={menuRef} id="site-menu" className="site-menu">
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
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-current px-4 py-1.5 font-condensed text-xs sm:text-sm uppercase tracking-wider hover:bg-[var(--meriden-white)] hover:text-[var(--meriden-vermilion)] transition-colors no-underline"
                >
                  <span>Free Consult</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Meriden-Styled Warm Cream Editorial Footer */}
      <footer className="bg-[var(--meriden-cream)] text-[var(--meriden-terracotta)] border-t-2 border-[var(--meriden-vermilion)]/20 px-5 sm:px-10 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-2xl sm:text-3xl text-[var(--meriden-vermilion)]">
              Jonathan Farr, LMHC
            </p>
            <p className="font-condensed text-sm uppercase tracking-widest text-[var(--meriden-terracotta)]">
              {PRACTICE_CONFIG.format} · {PRACTICE_CONFIG.availability}
            </p>
            <p className="text-sm text-[var(--meriden-espresso)] max-w-md pt-1">
              Massachusetts Licensed Mental Health Counselor #{PRACTICE_CONFIG.licenseNumber} ·
              ${PRACTICE_CONFIG.sessionFee} per {PRACTICE_CONFIG.sessionMinutes}-minute online
              session · Out-of-Network Superbills &amp; Mentaya
            </p>
            <p className="pt-2">
              <a
                href={PRACTICE_CONFIG.licenseVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-condensed text-xs uppercase tracking-widest text-[var(--meriden-vermilion)] hover:text-[var(--meriden-terracotta)] underline underline-offset-4"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Verify MA License #{PRACTICE_CONFIG.licenseNumber}</span>
              </a>
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-6 font-condensed uppercase tracking-widest text-sm text-[var(--meriden-vermilion)]">
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li>
                <Link to="/about" className="hover:text-[var(--meriden-terracotta)] underline-offset-4 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[var(--meriden-terracotta)] underline-offset-4 hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/aviation-professionals"
                  className="hover:text-[var(--meriden-terracotta)] underline-offset-4 hover:underline"
                >
                  Aviation
                </Link>
              </li>
            </ul>
            <ul className="space-y-2.5 list-none p-0 m-0">
              <li>
                <Link to="/blog" className="hover:text-[var(--meriden-terracotta)] underline-offset-4 hover:underline">
                  Writing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[var(--meriden-terracotta)] underline-offset-4 hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={PRACTICE_CONFIG.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--meriden-terracotta)] underline-offset-4 hover:underline"
                >
                  Client Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm text-[var(--meriden-espresso)]">
            <p className="font-condensed uppercase tracking-widest text-xs text-[var(--meriden-vermilion)]">
              Direct Contact
            </p>
            <p>
              <a
                href={PRACTICE_CONFIG.phoneHref}
                className="font-medium hover:text-[var(--meriden-vermilion)] transition-colors"
              >
                {PRACTICE_CONFIG.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${PRACTICE_CONFIG.email}`}
                className="font-medium hover:text-[var(--meriden-vermilion)] transition-colors break-all"
              >
                {PRACTICE_CONFIG.email}
              </a>
            </p>
            <p className="text-xs text-[var(--meriden-terracotta)] pt-2">
              Note: Standard email and texting are not HIPAA-encrypted. Leave out
              sensitive clinical details when reaching out.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[var(--meriden-vermilion)]/20 flex flex-wrap items-center justify-between gap-4 font-condensed text-xs uppercase tracking-widest text-[var(--meriden-terracotta)]">
          <p>© {new Date().getFullYear()} Jonathan Farr, LMHC</p>
          <p>Massachusetts Online Telehealth · All Words Written By A Human</p>
        </div>
      </footer>
    </div>
  );
}
