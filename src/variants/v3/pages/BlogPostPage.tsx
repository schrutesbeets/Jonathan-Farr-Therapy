import { Fragment, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../../v2/data/blogPosts';
import { PRACTICE_CONFIG } from '../data/siteContent';
import { AmbientLoopVideo } from '../../../components/AmbientLoopVideo';

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
      <strong key={key} className="font-semibold text-[var(--fletcher-pine)]">
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
        className="underline decoration-1 underline-offset-4 font-semibold text-[var(--fletcher-rust)] hover:text-[var(--fletcher-oxblood)] transition-colors"
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
      <section className="fletcher-band-black ds-section fletcher-hero-offset text-center space-y-6">
        <h1 className="fletcher-h2 text-[var(--fletcher-on-pine)]">
          Essay Not Found
        </h1>
        <p className="text-base text-[var(--fletcher-on-pine-muted)]">
          That post couldn’t be located.
        </p>
        <div>
          <Link to="/v3/blog" className="fletcher-btn-outline-light">
            <span>Back to All Writing</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="overflow-x-clip">
      <header className="fletcher-band-black ds-section fletcher-hero-offset">
        <div className="max-w-[min(56rem,var(--ds-page-max-width))] mx-auto space-y-6">
          <Link
            to="/v3/blog"
            className="inline-flex items-center gap-2 fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)] hover:text-[var(--fletcher-on-pine)] underline underline-offset-4"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Writing</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 fletcher-meta text-xs sm:text-sm uppercase text-[var(--fletcher-on-pine-muted)]">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="fletcher-h2 text-[var(--fletcher-on-pine)]">
            {post.title}
          </h1>

          <p className="fletcher-meta text-xs uppercase tracking-widest text-[var(--fletcher-on-pine-muted)]">
            Written by Jonathan Farr, LMHC
          </p>
        </div>
      </header>

      <div className="fletcher-band-white ds-section">
        <div className="max-w-3xl mx-auto space-y-10">
          <figure className="overflow-hidden ds-media-frame border-[var(--fletcher-border)] bg-[var(--fletcher-pine)]">
            {post.coverVideo ? (
              <AmbientLoopVideo
                src={post.coverVideo}
                poster={post.coverImage}
                ariaLabel={post.coverAlt}
                showControls
                className="w-full h-auto max-h-[28rem] object-cover"
              />
            ) : (
              <img
                src={post.coverImage}
                alt={post.coverAlt}
                width={post.coverWidth}
                height={post.coverHeight}
                className="w-full h-auto max-h-[28rem] object-cover"
              />
            )}
          </figure>

          <div className="space-y-5 text-base sm:text-lg text-[var(--fletcher-pine)]/90 leading-relaxed">
            {post.blocks.map((block, idx) => {
              if (block.type === 'break') {
                return (
                  <p
                    key={idx}
                    className="text-center tracking-[0.6em] text-[var(--fletcher-cypress)] py-4 fletcher-display"
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
                    className="fletcher-h3 text-[var(--fletcher-pine)] pt-4"
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
        </div>
      </div>

      {/* Closing Slate Cypress Consultation Invitation */}
      <aside className="fletcher-band-dark ds-section">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-cypress-muted)]">
            Work With Jonathan
          </p>
          <h2 className="fletcher-h3 text-[var(--fletcher-on-cypress)]">
            Ready to turn suffering into steady progress?
          </h2>
          <p className="text-base text-[var(--fletcher-on-cypress-muted)]">
            Schedule a free 15-minute intro consultation to see if we’re a fit.
          </p>
          <div className="pt-2">
            <a
              href={PRACTICE_CONFIG.introCallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fletcher-btn-primary"
            >
              <span>Schedule Free 15-Minute Consultation</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </aside>
    </article>
  );
}
