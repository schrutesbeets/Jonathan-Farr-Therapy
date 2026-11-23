import {
  AVIATION_FAQS,
  AVIATION_LINKS,
  CLIENT_ARCHETYPES,
  EDUCATION_CREDENTIALS,
  FIT_CRITERIA,
  HOME_FAQS,
  METHOD_PILLARS,
  PRACTICE_CONFIG,
  TIPPING_POINTS,
  type FaqItem,
  type RichSegment,
} from '../../v2/data/siteContent';

export {
  AVIATION_FAQS,
  AVIATION_LINKS,
  CLIENT_ARCHETYPES,
  EDUCATION_CREDENTIALS,
  FIT_CRITERIA,
  METHOD_PILLARS,
  PRACTICE_CONFIG,
  TIPPING_POINTS,
  type FaqItem,
  type RichSegment,
};

export const V3_HOME_FAQS: FaqItem[] = HOME_FAQS.map((item) => ({
  ...item,
  paragraphs: item.paragraphs.map((para) =>
    para.map((seg) =>
      seg.href && seg.href.startsWith('/v2')
        ? { ...seg, href: seg.href.replace(/^\/v2/, '/v3') }
        : seg,
    ),
  ),
  bullets: item.bullets?.map((bullet) =>
    bullet.map((seg) =>
      seg.href && seg.href.startsWith('/v2')
        ? { ...seg, href: seg.href.replace(/^\/v2/, '/v3') }
        : seg,
    ),
  ),
  followUpParagraphs: item.followUpParagraphs?.map((para) =>
    para.map((seg) =>
      seg.href && seg.href.startsWith('/v2')
        ? { ...seg, href: seg.href.replace(/^\/v2/, '/v3') }
        : seg,
    ),
  ),
}));

export const FLETCHER_SPECIALTIES_LEFT = [
  'Imposter Syndrome & Perfectionism',
  'Aviation Professionals (Pilots & ATCS)',
  'Musicians, Performers & Creatives',
  'Executives & High-Stakes Leaders',
] as const;

export const FLETCHER_SPECIALTIES_RIGHT = [
  'Adult Children of Narcissistic Parents',
  'Graduate Students & PhD Candidates',
  'ACT, IFS & Values-Based Therapy',
  'Out-of-Network Superbills & Mentaya',
] as const;
