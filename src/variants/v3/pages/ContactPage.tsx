import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Calendar, CheckCircle2, Copy, Lock, Mail, Phone } from 'lucide-react';
import { PRACTICE_CONFIG } from '../data/siteContent';
import { assetUrl } from '../../../lib/assetUrl';

interface ContactDraft {
  name: string;
  email: string;
  topic: string;
  preferredWindow: string;
  message: string;
  mailtoHref: string;
}

type ValidatableControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const announcerRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [preferredWindow, setPreferredWindow] = useState('');
  const [message, setMessage] = useState('');
  const [ackPrivacy, setAckPrivacy] = useState(false);
  const [draft, setDraft] = useState<ContactDraft | null>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Sync aria-invalid, dynamic aria-describedby, polite live announcements, and
  // :user-invalid fallback for browsers lacking native :user-invalid support.
  useEffect(() => {
    const form = formRef.current;
    const announcer = announcerRef.current;
    if (!form || !announcer) return;

    const supportsUserInvalid =
      typeof CSS !== 'undefined' && CSS.supports('selector(:user-invalid)');
    const dirtyState = new WeakMap<
      ValidatableControl,
      { hasInteracted: boolean; hasBlurred: boolean }
    >();
    const flagged = new WeakSet<ValidatableControl>();
    const announced = new WeakSet<ValidatableControl>();
    let announceTimer = 0;
    let announcedField: ValidatableControl | null = null;

    const isControl = (node: EventTarget | null): node is ValidatableControl =>
      node instanceof HTMLInputElement ||
      node instanceof HTMLSelectElement ||
      node instanceof HTMLTextAreaElement;

    const spokenText = (node: Element): string => {
      const copy = node.cloneNode(true) as Element;
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
      copy
        .querySelectorAll('[role="img"][aria-label]')
        .forEach((n) => n.replaceWith(`${n.getAttribute('aria-label')}: `));
      return (copy.textContent || '').replace(/\s+/g, ' ').trim();
    };

    const linkError = (el: ValidatableControl, shown: boolean) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const ids = (el.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter((id) => id && id !== errorId);
      if (shown) ids.push(errorId);
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
      else el.removeAttribute('aria-describedby');
    };

    const announceError = (el: ValidatableControl) => {
      const errorId = el.dataset.error;
      if (!errorId) return;
      const errorEl = document.getElementById(errorId);
      if (!errorEl) return;
      const labelEl = el.labels?.[0];
      const label = labelEl ? `${spokenText(labelEl)}: ` : '';
      window.clearTimeout(announceTimer);
      announcer.textContent = '';
      announcedField = el;
      announceTimer = window.setTimeout(() => {
        announcer.textContent = label + spokenText(errorEl);
      }, 500);
    };

    const syncAria = (el: ValidatableControl, announce = false) => {
      const invalid = supportsUserInvalid
        ? el.matches(':user-invalid')
        : el.classList.contains('user-invalid-fallback');

      if (invalid) {
        if (announce && !announced.has(el)) {
          announceError(el);
          announced.add(el);
        }
        el.setAttribute('aria-invalid', 'true');
        linkError(el, true);
        flagged.add(el);
      } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
        el.setAttribute('aria-invalid', 'false');
        linkError(el, false);
        flagged.delete(el);
        announced.delete(el);
        if (announcedField === el) {
          window.clearTimeout(announceTimer);
          announcer.textContent = '';
        }
      }
    };

    const updateFallbackClasses = (el: ValidatableControl) => {
      const isValid = el.validity.valid;
      el.classList.toggle('user-invalid-fallback', !isValid);
      el.classList.toggle('user-valid-fallback', isValid);
    };

    form
      .querySelectorAll<ValidatableControl>('input, select, textarea')
      .forEach((el) => {
        syncAria(el);
      });

    const onBlur = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!supportsUserInvalid) {
        const state = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasBlurred = true;
        dirtyState.set(e.target, state);
        if (state.hasInteracted) updateFallbackClasses(e.target);
      }
      syncAria(e.target, true);
    };

    const onInput = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!supportsUserInvalid) {
        const state = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        dirtyState.set(e.target, state);
        if (state.hasBlurred) updateFallbackClasses(e.target);
      }
      if (e.target.hasAttribute('aria-invalid')) syncAria(e.target);
    };

    const onChange = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!supportsUserInvalid) {
        const state = dirtyState.get(e.target) || {
          hasInteracted: false,
          hasBlurred: false,
        };
        state.hasInteracted = true;
        dirtyState.set(e.target, state);
        if (state.hasBlurred || e.target.type === 'checkbox' || e.target.tagName === 'SELECT') {
          state.hasBlurred = true;
          updateFallbackClasses(e.target);
        }
      }
      syncAria(e.target, true);
    };

    const onInvalid = (e: Event) => {
      if (!isControl(e.target)) return;
      if (!supportsUserInvalid) {
        dirtyState.set(e.target, { hasInteracted: true, hasBlurred: true });
        updateFallbackClasses(e.target);
      }
      announced.add(e.target);
      syncAria(e.target);
    };

    const onReset = () => {
      window.setTimeout(() => {
        form
          .querySelectorAll<ValidatableControl>('input, select, textarea')
          .forEach((el) => {
            dirtyState.delete(el);
            el.classList.remove('user-invalid-fallback', 'user-valid-fallback');
            syncAria(el);
          });
      });
    };

    form.addEventListener('blur', onBlur, true);
    form.addEventListener('input', onInput);
    form.addEventListener('change', onChange, true);
    form.addEventListener('invalid', onInvalid, true);
    form.addEventListener('reset', onReset, true);

    return () => {
      window.clearTimeout(announceTimer);
      form.removeEventListener('blur', onBlur, true);
      form.removeEventListener('input', onInput);
      form.removeEventListener('change', onChange, true);
      form.removeEventListener('invalid', onInvalid, true);
      form.removeEventListener('reset', onReset, true);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Intro Consult Inquiry] ${topic || 'New Client Consultation'} — ${name}`,
    );
    const bodyLines = [
      `Name: ${name}`,
      `Reply Email: ${email}`,
      `Focus Area: ${topic}`,
      `Preferred Mon–Thu Window: ${preferredWindow || 'Flexible'}`,
      message.trim() ? `Logistics Note: ${message.trim()}` : null,
      '',
      '(Sent via Jonathan Farr Therapy consultation request — no sensitive clinical details included.)',
    ].filter((line): line is string => line !== null);

    const mailtoHref = `mailto:${PRACTICE_CONFIG.email}?subject=${subject}&body=${encodeURIComponent(
      bodyLines.join('\n'),
    )}`;

    setDraft({
      name,
      email,
      topic,
      preferredWindow: preferredWindow || 'Flexible',
      message: message.trim(),
      mailtoHref,
    });
    setCopiedDraft(false);
  };

  const handleCopyDraft = async () => {
    if (!draft) return;
    const text = [
      `To: ${PRACTICE_CONFIG.email}`,
      `Name: ${draft.name}`,
      `Email: ${draft.email}`,
      `Focus Area: ${draft.topic}`,
      `Preferred Window: ${draft.preferredWindow}`,
      draft.message ? `Note: ${draft.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedDraft(true);
    } catch {
      setCopiedDraft(false);
    }
  };

  return (
    <div className="overflow-x-clip">
      {/* BAND 1 — Dark Pine Contact Hero */}
      <section className="fletcher-band-black ds-section fletcher-hero-offset">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
              Accepting New Clients · {PRACTICE_CONFIG.availability}
            </p>
            <h1 className="fletcher-h1 text-[var(--fletcher-on-pine)]">
              Make an
              <br />
              Appointment
            </h1>
            <p className="text-base sm:text-lg text-[var(--fletcher-on-pine-muted)] max-w-xl leading-relaxed">
              Schedule a free, 15-minute consultation to talk through what
              brought you here and make sure we’re the right fit.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fletcher-btn-primary"
              >
                <span>Request Intro Call</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={PRACTICE_CONFIG.contactWidgetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fletcher-btn-outline-light"
              >
                <span>Request Alternate Time</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <figure className="overflow-hidden ds-media-frame border-[var(--fletcher-border-dark)] bg-[var(--fletcher-cypress)]">
              <img
                src={assetUrl('media/runway-28.jpg')}
                alt="Runway 28 stretching toward the horizon at twilight"
                width={1600}
                height={1044}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* BAND 2 — Slate Cypress Appointments & Non-Clinical Consultation Request (Fletcher appointments.html dark theme) */}
      <section className="fletcher-band-dark ds-section">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-start">
          {/* Left Column: Direct Scheduling Paths */}
          <div className="lg:col-span-5 space-y-8 reveal-on-scroll">
            <div className="space-y-3 border-b border-[var(--fletcher-border-dark)] pb-6">
              <div className="flex items-center gap-2 fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Direct Scheduling Paths</span>
              </div>
              <h2 className="fletcher-h3 text-[var(--fletcher-on-cypress)]">
                Book online or reach out directly.
              </h2>
              <p className="text-sm sm:text-base text-[var(--fletcher-on-cypress-muted)] leading-relaxed">
                Visit my TherapyFinder profile and click{' '}
                <strong className="text-[var(--fletcher-on-cypress)]">
                  “Request Intro Call”
                </strong>{' '}
                to grab a 15-minute slot directly on my calendar, or use
                SimplePractice for alternate Monday–Thursday availability.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={PRACTICE_CONFIG.introCallUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fletcher-btn-primary"
                >
                  <span>TherapyFinder Calendar</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={PRACTICE_CONFIG.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fletcher-btn-outline-light"
                >
                  <Lock className="w-4 h-4" aria-hidden="true" />
                  <span>Client Portal</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
                Phone &amp; Email
              </p>
              <div className="space-y-3 text-base text-[var(--fletcher-on-cypress)]">
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <a
                    href={PRACTICE_CONFIG.phoneHref}
                    className="font-medium underline underline-offset-4 hover:opacity-80"
                  >
                    {PRACTICE_CONFIG.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${PRACTICE_CONFIG.email}`}
                    className="font-medium underline underline-offset-4 hover:opacity-80 break-words"
                  >
                    jonathan@<wbr />jonathanfarrtherapy.com
                  </a>
                </p>
              </div>
              <p className="text-xs text-[var(--fletcher-on-cypress-muted)] border border-[var(--fletcher-border-dark)] bg-[var(--fletcher-pine)]/45 p-3.5 leading-relaxed">
                <strong className="text-[var(--fletcher-on-cypress)]">Note:</strong>{' '}
                When texting or emailing me, be sure to leave out sensitive
                information or clinical details. Standard texting and email
                aren’t secure to HIPAA standards.
              </p>
            </div>
          </div>

          {/* Right Column: Accessible .ds-form Non-Clinical Inquiry Builder */}
          <div className="lg:col-span-7 ds-card border-[var(--fletcher-border-dark)] bg-[var(--fletcher-pine)]/35 p-6 sm:p-10 space-y-6 reveal-on-scroll">
            <div className="space-y-2">
              <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
                Non-Clinical Consultation Draft
              </p>
              <h2 className="fletcher-h3 text-[var(--fletcher-on-cypress)]">
                Send an Availability Note
              </h2>
              <p className="text-sm text-[var(--fletcher-on-cypress-muted)]">
                Prepare a brief scheduling message (kept local until you choose
                to open your email app).
              </p>
            </div>

            <div
              ref={announcerRef}
              aria-live="polite"
              className="fletcher-visually-hidden"
            />

            <form
              ref={formRef}
              className="ds-form"
              onSubmit={handleSubmit}
              onReset={() => {
                setName('');
                setEmail('');
                setTopic('');
                setPreferredWindow('');
                setMessage('');
                setAckPrivacy(false);
                setDraft(null);
                setCopiedDraft(false);
              }}
            >
              <div className="ds-field-group">
                <label htmlFor="v3-contact-name" className="ds-field-label">
                  Your Name
                </label>
                <span id="v3-name-hint" className="fletcher-field-hint">
                  First name or initials are completely fine.
                </span>
                <input
                  id="v3-contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Alex Rivera"
                  aria-describedby="v3-name-hint"
                  data-error="v3-name-error"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ds-field-input"
                />
                <div id="v3-name-error" className="fletcher-error-msg">
                  <span className="fletcher-error-badge" role="img" aria-label="Error">
                    !
                  </span>
                  <span>Please enter your name or preferred initials.</span>
                </div>
              </div>

              <div className="ds-field-group">
                <label htmlFor="v3-contact-email" className="ds-field-label">
                  Email Address
                </label>
                <span id="v3-email-hint" className="fletcher-field-hint">
                  Format: you@example.com
                </span>
                <input
                  id="v3-contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-describedby="v3-email-hint"
                  data-error="v3-email-error"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ds-field-input"
                />
                <div id="v3-email-error" className="fletcher-error-msg">
                  <span className="fletcher-error-badge" role="img" aria-label="Error">
                    !
                  </span>
                  <span>Enter an email address in the format you@example.com.</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="ds-field-group">
                  <label htmlFor="v3-contact-topic" className="ds-field-label">
                    What Brings You Here
                  </label>
                  <span id="v3-topic-hint" className="fletcher-field-hint">
                    Choose the closest fit.
                  </span>
                  <select
                    id="v3-contact-topic"
                    name="topic"
                    required
                    aria-describedby="v3-topic-hint"
                    data-error="v3-topic-error"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="ds-field-input"
                  >
                    <option value="">Select an area...</option>
                    <option value="Imposter Syndrome & High Achievement">
                      Imposter Syndrome &amp; High Achievement
                    </option>
                    <option value="Aviation Professionals (Pilot / ATCS / Crew)">
                      Aviation Professionals (Pilot / ATCS / Crew)
                    </option>
                    <option value="Musicians, Performers & Creatives">
                      Musicians, Performers &amp; Creatives
                    </option>
                    <option value="Graduate Students & PhD Candidates">
                      Graduate Students &amp; PhD Candidates
                    </option>
                    <option value="Narcissistic Family Cycles & Boundaries">
                      Narcissistic Family Cycles &amp; Boundaries
                    </option>
                    <option value="General 15-Minute Consultation">
                      General 15-Minute Consultation
                    </option>
                  </select>
                  <div id="v3-topic-error" className="fletcher-error-msg">
                    <span className="fletcher-error-badge" role="img" aria-label="Error">
                      !
                    </span>
                    <span>Please select a focus area from the list.</span>
                  </div>
                </div>

                <div className="ds-field-group">
                  <label htmlFor="v3-contact-window" className="ds-field-label">
                    Preferred Mon–Thu Window
                  </label>
                  <span id="v3-window-hint" className="fletcher-field-hint">
                    Optional Eastern Time preference.
                  </span>
                  <input
                    id="v3-contact-window"
                    name="preferredWindow"
                    type="text"
                    placeholder="e.g., Tue or Thu mornings"
                    aria-describedby="v3-window-hint"
                    value={preferredWindow}
                    onChange={(e) => setPreferredWindow(e.target.value)}
                    className="ds-field-input"
                  />
                </div>
              </div>

              <div className="ds-field-group">
                <label htmlFor="v3-contact-message" className="ds-field-label">
                  Brief Logistics Note (Optional)
                </label>
                <span id="v3-message-hint" className="fletcher-field-hint">
                  Keep this high-level—avoid medical, diagnostic, or personal clinical details.
                </span>
                <textarea
                  id="v3-contact-message"
                  name="message"
                  rows={3}
                  placeholder="Best days/times for a 15-minute intro call..."
                  aria-describedby="v3-message-hint"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="ds-field-input"
                />
              </div>

              <div className="ds-field-group">
                <label className="ds-form-check-label">
                  <input
                    id="v3-contact-ack"
                    type="checkbox"
                    required
                    data-error="v3-ack-error"
                    checked={ackPrivacy}
                    onChange={(e) => setAckPrivacy(e.target.checked)}
                  />
                  <span>
                    I understand standard email is not HIPAA-encrypted and I have
                    left out sensitive clinical details.
                  </span>
                </label>
                <div id="v3-ack-error" className="fletcher-error-msg">
                  <span className="fletcher-error-badge" role="img" aria-label="Error">
                    !
                  </span>
                  <span>Please confirm you have omitted sensitive clinical details.</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button type="submit" className="fletcher-btn-primary">
                  <span>Prepare Email Inquiry</span>
                </button>
                <button type="reset" className="fletcher-btn-outline-light">
                  <span>Clear</span>
                </button>
              </div>
            </form>

            {draft && (
              <div
                role="status"
                className="ds-card border-[var(--fletcher-border-dark)] bg-[var(--fletcher-pine)] p-5 space-y-4 text-[var(--fletcher-on-pine)]"
              >
                <div className="flex items-center gap-2 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[var(--fletcher-on-pine)]" aria-hidden="true" />
                  <span>Your non-clinical inquiry draft is ready.</span>
                </div>
                <div className="text-xs text-[var(--fletcher-on-pine-muted)] space-y-1">
                  <p>
                    <strong className="text-[var(--fletcher-on-pine)]">Focus:</strong>{' '}
                    {draft.topic}
                  </p>
                  <p>
                    <strong className="text-[var(--fletcher-on-pine)]">Window:</strong>{' '}
                    {draft.preferredWindow}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={draft.mailtoHref} className="fletcher-btn-primary">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Open in Email App</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => void handleCopyDraft()}
                    className="fletcher-btn-outline-light"
                  >
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>{copiedDraft ? 'Copied!' : 'Copy Details'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
