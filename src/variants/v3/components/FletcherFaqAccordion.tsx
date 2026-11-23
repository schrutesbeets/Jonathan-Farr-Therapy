import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { FaqItem, RichSegment } from '../data/siteContent';

function RichTextLine({
  segments,
  tone,
}: {
  segments: RichSegment[];
  tone: 'light' | 'dark';
}) {
  const strongClass =
    tone === 'light'
      ? 'font-semibold text-[var(--fletcher-pine)]'
      : 'font-semibold text-[var(--fletcher-on-pine)]';
  const linkClass =
    tone === 'light'
      ? 'underline decoration-1 underline-offset-4 font-medium text-[var(--fletcher-rust)] hover:text-[var(--fletcher-oxblood)] transition-colors'
      : 'underline decoration-1 underline-offset-4 font-medium text-[var(--fletcher-on-pine)] hover:text-[var(--fletcher-rust)] transition-colors';

  return (
    <>
      {segments.map((seg, i) => {
        let content: ReactNode = seg.text;
        if (seg.bold) {
          content = <strong className={strongClass}>{content}</strong>;
        }
        if (seg.italic) {
          content = <em>{content}</em>;
        }
        if (seg.href) {
          content = seg.external ? (
            <a
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {content}
            </a>
          ) : (
            <Link to={seg.href} className={linkClass}>
              {content}
            </Link>
          );
        }
        return <Fragment key={i}>{content}</Fragment>;
      })}
    </>
  );
}

interface FletcherFaqAccordionProps {
  items: FaqItem[];
  tone?: 'light' | 'dark';
  labelledBy?: string;
  ariaLabel?: string;
}

export function FletcherFaqAccordion({
  items,
  tone = 'light',
  labelledBy,
  ariaLabel,
}: FletcherFaqAccordionProps) {
  const borderClass =
    tone === 'light'
      ? 'divide-[var(--fletcher-border)] border-[var(--fletcher-border)]'
      : 'divide-[var(--fletcher-border-dark)] border-[var(--fletcher-border-dark)]';
  const questionClass =
    tone === 'light'
      ? 'text-[var(--fletcher-pine)] group-hover:text-[var(--fletcher-rust)]'
      : 'text-[var(--fletcher-on-pine)] group-hover:text-[var(--fletcher-rust)]';
  const iconClass =
    tone === 'light' ? 'text-[var(--fletcher-rust)]' : 'text-[var(--fletcher-on-pine)]';
  const answerClass =
    tone === 'light'
      ? 'text-[var(--fletcher-pine)]/90'
      : 'text-[var(--fletcher-on-pine-muted)]';

  return (
    <div
      role="region"
      aria-labelledby={labelledBy}
      aria-label={!labelledBy ? ariaLabel : undefined}
      className={`fletcher-accordion divide-y border-t border-b ${borderClass}`}
    >
      {items.map((item) => (
        <details key={item.question} className="group py-5 sm:py-6">
          <summary>
            <Plus
              className={`fletcher-acc-icon w-5 h-5 ${iconClass}`}
              aria-hidden="true"
            />
            <span
              className={`fletcher-display text-xl sm:text-2xl transition-colors ${questionClass}`}
            >
              {item.question}
            </span>
          </summary>

          <div className="pt-4 pl-9">
            <div className={`space-y-3.5 text-base leading-relaxed max-w-3xl ${answerClass}`}>
              {item.paragraphs.map((para, idx) => (
                <p key={idx}>
                  <RichTextLine segments={para} tone={tone} />
                </p>
              ))}

              {item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-2">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>
                      <RichTextLine segments={bullet} tone={tone} />
                    </li>
                  ))}
                </ul>
              )}

              {item.followUpParagraphs?.map((para, fIdx) => (
                <p key={fIdx}>
                  <RichTextLine segments={para} tone={tone} />
                </p>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
