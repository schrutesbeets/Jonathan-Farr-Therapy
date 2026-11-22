import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export function BlogPage() {
  return (
    <div className="overflow-x-clip">
      {/* SECTION 1 — Full-Bleed Vermilion Writing Hero */}
      <section className="bg-[var(--meriden-vermilion)] text-white px-5 sm:px-10 pt-10 pb-20 sm:pt-14 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="font-condensed text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--meriden-cream)]">
              ESSAYS &amp; REFLECTIONS · BY JONATHAN FARR, LMHC
            </p>
            <h1 className="font-display type-hero text-white">
              Writing
              <br />
              &amp; Notes
            </h1>
            <p className="font-prose text-lg sm:text-xl text-white/95 max-w-xl leading-relaxed">
              Stories about winning arguments without trying to win them,
              hitting wrong notes on a church Steinway, and flipping how you
              think about motivation and values.
            </p>
          </div>

          <div className="lg:col-span-6">
            <figure className="overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-2xl">
              <img
                src="/media/oban-sunset.jpg"
                alt="Silhouetted tall ships in harbor at sunset in Oban, Scotland"
                width={1600}
                height={1199}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <figcaption className="bg-[var(--meriden-espresso)] text-[var(--meriden-cream)] px-4 py-2.5 font-condensed text-xs uppercase tracking-widest">
                Above: Oban, Scotland at sunset in August of 2019
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Alternating Large Editorial Essay Cards (Meriden Podcast Cadence) */}
      <section className="bg-[var(--meriden-cream)] px-5 sm:px-10 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto space-y-20">
          {BLOG_POSTS.map((post, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={post.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b-2 border-[var(--meriden-vermilion)]/15 pb-16 last:border-b-0 last:pb-0 reveal-on-scroll"
              >
                <div
                  className={`lg:col-span-6 ${
                    reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Link to={`/blog/${post.slug}`} className="block group">
                    <div className="overflow-hidden rounded-sm bg-[var(--meriden-espresso)] shadow-lg">
                      <img
                        src={post.coverImage}
                        alt={post.coverAlt}
                        width={post.coverWidth}
                        height={post.coverHeight}
                        loading="lazy"
                        className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>

                <div
                  className={`lg:col-span-6 space-y-4 ${
                    reverse ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 font-condensed text-xs uppercase tracking-[0.2em] text-[var(--meriden-terracotta)]">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.dateLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-display type-h3 text-[var(--meriden-vermilion)]">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-[var(--meriden-terracotta)] transition-colors no-underline"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="font-prose text-base sm:text-lg text-[var(--meriden-espresso)] leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="btn-pill-vermilion"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
