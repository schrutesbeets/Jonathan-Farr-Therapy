import { Fragment, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { PRACTICE_CONFIG } from '../data/siteContent';

function domNodeToReact(node: ChildNode, key: string): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const el = node as Element;
  const children = Array.from(el.childNodes).map((child, idx) =>
    domNodeToReact(child, `${key}-${idx}`),
  );
  const tag = el.tagName.toLowerCase();

  if (tag === 'strong' || tag === 'b') {
    return (
      <strong key={key} className="font-semibold text-[var(--meriden-espresso)]">
        {children}
      </strong>
    );
  }
  if (tag === 'em' || tag === 'i') {
    return <em key={key}>{children}</em>;
  }
  if (tag === 'a') {
    const href = el.getAttribute('href') || '#';
    return (
      <a
        key={key}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-2 underline-offset-4 font-semibold text-[var(--meriden-terracotta)] hover:text-[var(--meriden-vermilion)] transition-colors"
      >
        {children}
      </a>
    );
  }

  return <Fragment key={key}>{children}</Fragment>;
}

function RichInlineHtml({ html }: { html: string }) {
  if (typeof DOMParser === 'undefined') {
    return <>{html.replace(/<[^>]+>/g, '')}</>;
  }
  const parsed = new DOMParser().parseFromString(`<span>${html}</span>`, 'text/html');
  const root = parsed.body.firstChild;
  if (!root) return null;
  return (
    <>
      {Array.from(root.childNodes).map((node, idx) =>
        domNodeToReact(node, `n-${idx}`),
      )}
    </>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-24 text-center space-y-6">
        <h1 className="font-display type-h2 text-[var(--meriden-vermilion)]">
          Essay Not Found
        </h1>
        <p className="font-prose text-base text-[var(--meriden-espresso)]">
          That post couldn’t be located.
        </p>
        <Link to="/blog" className="btn-pill-vermilion">
          <span>Back to All Writing</span>
        </Link>
      </section>
    );
  }

  return (
    <article className="overflow-x-clip">
      <header className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-cream)] hover:text-white underline underline-offset-4"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Writing</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 font-condensed text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--meriden-cream)]">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-display type-h2 text-white">{post.title}</h1>

          <p className="font-condensed text-sm uppercase tracking-widest text-[var(--meriden-cream)]">
            Written by Jonathan Farr, LMHC
          </p>
        </div>
      </header>

      <div className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto space-y-10">
          <figure className="overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-xl">
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              width={post.coverWidth}
              height={post.coverHeight}
              className="w-full h-auto max-h-[28rem] object-cover"
            />
          </figure>

          <div className="space-y-5 font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
            {post.blocks.map((block, idx) => {
              if (block.type === 'break') {
                return (
                  <p
                    key={idx}
                    className="text-center tracking-[0.6em] text-[var(--meriden-vermilion)] py-4 font-display"
                    aria-hidden="true"
                  >
                    * * *
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2
                    key={idx}
                    className="font-display-quote text-2xl sm:text-3xl text-[var(--meriden-terracotta)] pt-4"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2.5">
                    {block.items.map((item, i) => (
                      <li key={i}>
                        <RichInlineHtml html={item} />
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx}>
                  <RichInlineHtml html={block.html} />
                </p>
              );
            })}
          </div>

          {/* Closing Conversion Callout */}
          <aside className="mt-12 rounded-2xl bg-[var(--meriden-vermilion)] text-white p-8 sm:p-10 space-y-4">
            <p className="font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-cream)]">
              WORK WITH JONATHAN
            </p>
            <h2 className="font-display-quote text-2xl sm:text-3xl text-white">
              Ready to turn suffering into steady progress?
            </h2>
            <p className="font-prose text-base text-[var(--meriden-cream)]">
              Schedule a free 15-minute intro consultation to see if we’re a
              fit.
            </p>
            <div className="pt-2">
              <a
                href={PRACTICE_CONFIG.introCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-light"
              >
                <span>Schedule Free 15-Minute Consultation</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
