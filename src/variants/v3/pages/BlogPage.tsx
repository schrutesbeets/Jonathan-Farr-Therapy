import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../v2/data/blogPosts';
import { AmbientLoopVideo } from '../../../components/AmbientLoopVideo';
import { assetUrl } from '../../../lib/assetUrl';

export function BlogPage() {
  return (
    <div className="overflow-x-clip">
      {/* BAND 1 — Dark Pine Writing Hero */}
      <section className="fletcher-band-black ds-section fletcher-hero-offset">
        <div className="ds-container grid grid-cols-1 lg:grid-cols-12 ds-grid-gap items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="fletcher-meta text-xs uppercase text-[var(--fletcher-on-pine-muted)]">
              Essays &amp; Reflections · By Jonathan Farr, LMHC
            </p>
            <h1 className="fletcher-h1 text-[var(--fletcher-on-pine)]">
              Writing
              <br />
              &amp; Notes
            </h1>
            <p className="text-base sm:text-lg text-[var(--fletcher-on-pine-muted)] max-w-xl leading-relaxed">
              Stories about winning arguments without trying to win them,
              hitting wrong notes on a church Steinway, and flipping how you
              think about motivation and values.
            </p>
          </div>

          <div className="lg:col-span-6">
            <figure className="overflow-hidden ds-media-frame border-[var(--fletcher-border-dark)] bg-[var(--fletcher-cypress)]">
              <img
                src={assetUrl('media/oban-sunset.jpg')}
                alt="Silhouetted tall ships in harbor at sunset in Oban, Scotland"
                width={1600}
                height={1199}
                className="w-full h-auto aspect-[4/3] object-cover"
              />
              <figcaption className="px-4 py-2.5 fletcher-meta text-xs text-[var(--fletcher-on-pine-muted)]">
                Above: Oban, Scotland at sunset in August of 2019
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* BAND 2 — Celadon Mist Alternating Editorial Essays */}
      <section className="fletcher-band-white">
        {BLOG_POSTS.map((post, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <article
              key={post.slug}
              className="fletcher-split-50 border-b border-[var(--fletcher-border)] last:border-b-0"
            >
              <div
                className={`relative overflow-hidden bg-[var(--fletcher-pine)] min-h-[22rem] lg:min-h-full ${
                  reverse ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <Link to={`/v3/blog/${post.slug}`} className="block w-full h-full group">
                  {post.coverVideo ? (
                    <AmbientLoopVideo
                      src={post.coverVideo}
                      poster={post.coverImage}
                      ariaLabel={post.coverAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt}
                      width={post.coverWidth}
                      height={post.coverHeight}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </Link>
              </div>

              <div
                className={`flex items-center justify-center px-6 py-14 sm:px-12 lg:px-16 ${
                  reverse ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="max-w-lg space-y-4 reveal-on-scroll">
                  <div className="flex flex-wrap items-center gap-3 fletcher-meta text-xs uppercase text-[var(--fletcher-cypress)]">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.dateLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="fletcher-h3 text-[var(--fletcher-pine)]">
                    <Link
                      to={`/v3/blog/${post.slug}`}
                      className="no-underline hover:text-[var(--fletcher-rust)] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-base text-[var(--fletcher-pine)]/85 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/v3/blog/${post.slug}`}
                      className="fletcher-btn-outline-dark"
                    >
                      <span>Read Essay</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
