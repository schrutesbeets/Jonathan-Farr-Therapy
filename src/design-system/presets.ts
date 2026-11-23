import type { DesignSystemSettings, VariantId } from './schema';

export const V1_DEFAULT_SETTINGS: DesignSystemSettings = {
  fonts: {
    headingFamily: 'Space Grotesk',
    headingWeight: '700',
    headingScale: 1,
    headingLineHeight: 1.12,
    headingLetterSpacing: -0.025,
    headingTransform: 'none',
    bodyFamily: 'Inter',
    bodySize: 16,
    bodyLineHeight: 1.6,
    accentFamily: 'JetBrains Mono',
    accentLetterSpacing: 0.08,
  },
  colors: {
    pageBg: '#f6f5f1',
    surfaceAlt: '#efede7',
    accentPrimary: '#e04f26',
    accentSecondary: '#c53e18',
    inkPrimary: '#141413',
    inkSecondary: '#52514d',
    accentSoft: '#dddbd3',
  },
  animations: {
    style: 'none',
    speed: 'medium',
    ambientMotion: true,
  },
  spacing: {
    pageMaxWidth: 1152,
    siteMargin: 32,
    sectionPaddingY: 80,
    elementGap: 24,
  },
  buttons: {
    shape: 'rounded',
    fillStyle: 'solid',
    borderWidth: 1,
    paddingScale: 'medium',
    textTransform: 'uppercase',
  },
  forms: {
    fieldStyle: 'outlined',
    fieldRadius: 2,
    borderWidth: 1,
    fieldSpacing: 14,
    labelTransform: 'uppercase',
  },
  surfaces: {
    cardRadius: 0,
    borderWidth: 1,
    elevation: 'none',
  },
};

export const V2_DEFAULT_SETTINGS: DesignSystemSettings = {
  fonts: {
    headingFamily: 'Bodoni Moda',
    headingWeight: '600',
    headingScale: 1,
    headingLineHeight: 1.04,
    headingLetterSpacing: -0.04,
    headingTransform: 'uppercase',
    bodyFamily: 'Plus Jakarta Sans',
    bodySize: 16,
    bodyLineHeight: 1.6,
    accentFamily: 'Oswald',
    accentLetterSpacing: 0.1,
  },
  colors: {
    pageBg: '#fbecdc',
    surfaceAlt: '#f7e1ca',
    accentPrimary: '#fa5537',
    accentSecondary: '#f4a950',
    inkPrimary: '#362117',
    inkSecondary: '#863527',
    accentSoft: '#bcd5e3',
  },
  animations: {
    style: 'slide',
    speed: 'medium',
    ambientMotion: true,
  },
  spacing: {
    pageMaxWidth: 1280,
    siteMargin: 40,
    sectionPaddingY: 96,
    elementGap: 32,
  },
  buttons: {
    shape: 'pill',
    fillStyle: 'outline',
    borderWidth: 2,
    paddingScale: 'generous',
    textTransform: 'uppercase',
  },
  forms: {
    fieldStyle: 'filled',
    fieldRadius: 12,
    borderWidth: 2,
    fieldSpacing: 18,
    labelTransform: 'uppercase',
  },
  surfaces: {
    cardRadius: 16,
    borderWidth: 2,
    elevation: 'lifted',
  },
};

export const V3_DEFAULT_SETTINGS: DesignSystemSettings = {
  fonts: {
    headingFamily: 'Unna',
    headingWeight: '700',
    headingScale: 1,
    headingLineHeight: 1.08,
    headingLetterSpacing: -0.03,
    headingTransform: 'none',
    bodyFamily: 'DM Sans',
    bodySize: 17,
    bodyLineHeight: 1.55,
    accentFamily: 'DM Sans',
    accentLetterSpacing: 0.04,
  },
  colors: {
    pageBg: '#d4e0e0',
    surfaceAlt: '#c6d5d5',
    accentPrimary: '#b1462e',
    accentSecondary: '#471c13',
    inkPrimary: '#1d2828',
    inkSecondary: '#466060',
    accentSoft: '#b2c4c4',
  },
  animations: {
    style: 'fade',
    speed: 'medium',
    ambientMotion: true,
  },
  spacing: {
    pageMaxWidth: 1440,
    siteMargin: 48,
    sectionPaddingY: 96,
    elementGap: 24,
  },
  buttons: {
    shape: 'pill',
    fillStyle: 'solid',
    borderWidth: 1,
    paddingScale: 'generous',
    textTransform: 'none',
  },
  forms: {
    fieldStyle: 'outlined',
    fieldRadius: 24,
    borderWidth: 1,
    fieldSpacing: 16,
    labelTransform: 'none',
  },
  surfaces: {
    cardRadius: 0,
    borderWidth: 1,
    elevation: 'none',
  },
};

const DEFAULT_SETTINGS_BY_VARIANT: Record<VariantId, DesignSystemSettings> = {
  v1: V1_DEFAULT_SETTINGS,
  v2: V2_DEFAULT_SETTINGS,
  v3: V3_DEFAULT_SETTINGS,
};

const VARIANT_LABELS: Record<VariantId, string> = {
  v1: 'Variation 01 · Editorial & Minimal Grid',
  v2: 'Variation 02 · Bold & Dynamic Editorial',
  v3: 'Variation 03 · Fletcher Dark & Celadon',
};

export function getDefaultSettings(variantId: VariantId): DesignSystemSettings {
  return structuredClone(DEFAULT_SETTINGS_BY_VARIANT[variantId]);
}

export function getVariantLabel(variantId: VariantId): string {
  return VARIANT_LABELS[variantId];
}

export interface FontPack {
  id: string;
  name: string;
  subtitle: string;
  fonts: Partial<DesignSystemSettings['fonts']>;
}

export const FONT_PACKS: readonly FontPack[] = [
  {
    id: 'braun-industrial',
    name: 'Braun Industrial',
    subtitle: 'Space Grotesk + Inter + JetBrains Mono',
    fonts: { ...V1_DEFAULT_SETTINGS.fonts },
  },
  {
    id: 'meriden-editorial',
    name: 'Meriden Editorial',
    subtitle: 'Bodoni Moda + Plus Jakarta Sans + Oswald',
    fonts: { ...V2_DEFAULT_SETTINGS.fonts },
  },
  {
    id: 'fletcher-atelier',
    name: 'Fletcher Atelier',
    subtitle: 'Unna + DM Sans',
    fonts: { ...V3_DEFAULT_SETTINGS.fonts },
  },
  {
    id: 'swiss-neo-grotesk',
    name: 'Swiss Neo-Grotesk',
    subtitle: 'Syne + DM Sans + IBM Plex Mono',
    fonts: {
      headingFamily: 'Syne',
      headingWeight: '700',
      headingLineHeight: 1.06,
      headingLetterSpacing: -0.03,
      headingTransform: 'none',
      bodyFamily: 'DM Sans',
      accentFamily: 'IBM Plex Mono',
      accentLetterSpacing: 0.09,
    },
  },
  {
    id: 'literary-classic',
    name: 'Literary Classic',
    subtitle: 'Cormorant Garamond + Lora + Barlow Condensed',
    fonts: {
      headingFamily: 'Cormorant Garamond',
      headingWeight: '600',
      headingLineHeight: 1.08,
      headingLetterSpacing: -0.02,
      headingTransform: 'none',
      bodyFamily: 'Lora',
      accentFamily: 'Barlow Condensed',
      accentLetterSpacing: 0.14,
    },
  },
  {
    id: 'warm-modernist',
    name: 'Warm Modernist',
    subtitle: 'Fraunces + Source Sans 3 + Space Mono',
    fonts: {
      headingFamily: 'Fraunces',
      headingWeight: '600',
      headingLineHeight: 1.08,
      headingLetterSpacing: -0.025,
      headingTransform: 'none',
      bodyFamily: 'Source Sans 3',
      accentFamily: 'Space Mono',
      accentLetterSpacing: 0.08,
    },
  },
  {
    id: 'studio-high-contrast',
    name: 'Studio High-Contrast',
    subtitle: 'DM Serif Display + Work Sans + Oswald',
    fonts: {
      headingFamily: 'DM Serif Display',
      headingWeight: '400',
      headingLineHeight: 1.05,
      headingLetterSpacing: -0.015,
      headingTransform: 'none',
      bodyFamily: 'Work Sans',
      accentFamily: 'Oswald',
      accentLetterSpacing: 0.12,
    },
  },
];

export interface ColorPalettePreset {
  id: string;
  name: string;
  colors: DesignSystemSettings['colors'];
}

export const COLOR_PALETTES: readonly ColorPalettePreset[] = [
  {
    id: 'braun-signal',
    name: 'Braun Signal',
    colors: { ...V1_DEFAULT_SETTINGS.colors },
  },
  {
    id: 'meriden-vermilion',
    name: 'Meriden Vermilion',
    colors: { ...V2_DEFAULT_SETTINGS.colors },
  },
  {
    id: 'fletcher-mineral',
    name: 'Fletcher Mineral',
    colors: { ...V3_DEFAULT_SETTINGS.colors },
  },
  {
    id: 'nordic-forest',
    name: 'Nordic Forest',
    colors: {
      pageBg: '#f4f6f3',
      surfaceAlt: '#e6ece4',
      accentPrimary: '#1b4d3e',
      accentSecondary: '#c77d3b',
      inkPrimary: '#142019',
      inkSecondary: '#44594d',
      accentSoft: '#c5d6cb',
    },
  },
  {
    id: 'ochre-and-ink',
    name: 'Ochre & Ink',
    colors: {
      pageBg: '#fbf8f1',
      surfaceAlt: '#f2ead7',
      accentPrimary: '#b85d19',
      accentSecondary: '#d99b26',
      inkPrimary: '#1f1b16',
      inkSecondary: '#5c5243',
      accentSoft: '#dcd1b8',
    },
  },
  {
    id: 'midnight-cobalt',
    name: 'Midnight Cobalt',
    colors: {
      pageBg: '#f5f7fb',
      surfaceAlt: '#e8edf7',
      accentPrimary: '#1d4ed8',
      accentSecondary: '#0ea5e9',
      inkPrimary: '#0f172a',
      inkSecondary: '#475569',
      accentSoft: '#cbd5e1',
    },
  },
  {
    id: 'linen-and-sage',
    name: 'Linen & Sage',
    colors: {
      pageBg: '#f8f6f2',
      surfaceAlt: '#eceae1',
      accentPrimary: '#4a6b53',
      accentSecondary: '#8c6d46',
      inkPrimary: '#1f2621',
      inkSecondary: '#566159',
      accentSoft: '#cfd7cf',
    },
  },
];

export interface FormPackPreset {
  id: string;
  name: string;
  forms: DesignSystemSettings['forms'];
}

export const FORM_PACKS: readonly FormPackPreset[] = [
  {
    id: 'technical-outlined',
    name: 'Technical Outlined',
    forms: {
      fieldStyle: 'outlined',
      fieldRadius: 2,
      borderWidth: 1,
      fieldSpacing: 14,
      labelTransform: 'uppercase',
    },
  },
  {
    id: 'soft-editorial',
    name: 'Soft Editorial',
    forms: {
      fieldStyle: 'filled',
      fieldRadius: 12,
      borderWidth: 2,
      fieldSpacing: 18,
      labelTransform: 'uppercase',
    },
  },
  {
    id: 'minimal-underline',
    name: 'Minimal Underline',
    forms: {
      fieldStyle: 'underline',
      fieldRadius: 0,
      borderWidth: 2,
      fieldSpacing: 20,
      labelTransform: 'none',
    },
  },
  {
    id: 'bold-pill',
    name: 'Bold Pill',
    forms: {
      fieldStyle: 'outlined',
      fieldRadius: 24,
      borderWidth: 2,
      fieldSpacing: 16,
      labelTransform: 'uppercase',
    },
  },
];
