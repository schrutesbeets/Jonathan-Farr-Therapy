import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import type { FaqItem, RichSegment } from '../data/siteContent';

function RichTextLine({ segments }: { segments: RichSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        let content: React.ReactNode = seg.text;
        if (seg.bold) {
          content = <strong className="font-semibold text-[var(--meriden-espresso)]">{content}</strong>;
        }
        if (seg.italic) {
          content = <em>{content}</em>;
        }
        if (seg.href) {
          if (seg.external) {
            content = (
              <a
                href={seg.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2 underline-offset-4 text-[var(--meriden-terracotta)] hover:text-[var(--meriden-vermilion)] transition-colors"
              >
                {content}
              </a>
            );
          } else {
            content = (
              <Link
                to={seg.href}
                className="underline decoration-2 underline-offset-4 text-[var(--meriden-terracotta)] hover:text-[var(--meriden-vermilion)] transition-colors"
              >
                {content}
              </Link>
            );
          }
        }
        return <Fragment key={i}>{content}</Fragment>;
      })}
    </>
  );
}

interface FaqAccordionProps {
  items: FaqItem[];
  groupName: string;
}

export function FaqAccordion({ items, groupName }: FaqAccordionProps) {
  return (
    <div className="divide-y-2 divide-[var(--meriden-vermilion)]/25 border-t-2 border-b-2 border-[var(--meriden-vermilion)]/25">
      {items.map((item) => (
        <details key={item.question} name={groupName} className="group py-5 sm:py-6">
          <summary className="flex items-center justify-between gap-6 cursor-pointer select-none">
            <span className="font-display-quote text-xl sm:text-2xl text-[var(--meriden-terracotta)] group-hover:text-[var(--meriden-vermilion)] transition-colors">
              {item.question}
            </span>
            <Plus
              className="w-6 h-6 shrink-0 text-[var(--meriden-vermilion)] transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>

          <div className="mt-4 space-y-3.5 text-base text-[var(--meriden-espresso)] leading-relaxed max-w-3xl font-prose">
            {item.paragraphs.map((para, idx) => (
              <p key={idx}>
                <RichTextLine segments={para} />
              </p>
            ))}

            {item.bullets && item.bullets.length > 0 && (
              <ul className="list-disc pl-6 space-y-2">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>
                    <RichTextLine segments={bullet} />
                  </li>
                ))}
              </ul>
            )}

            {item.followUpParagraphs?.map((para, fIdx) => (
              <p key={fIdx}>
                <RichTextLine segments={para} />
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
