import { getFontCssValue } from './fonts';
import type { DesignSystemSettings, VariantId } from './schema';

function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function readableOnColor(hex: string): string {
  // Keeps authentic white text on mid-saturated brand vermilion/cobalt/forest,
  // while flipping to dark ink when the background color is bright pastel/butter.
  return relativeLuminance(hex) > 0.48 ? '#141413' : '#ffffff';
}

export function buildCssVars(
  settings: DesignSystemSettings,
  variantId: VariantId,
): Record<string, string> {
  const { fonts, colors, animations, spacing, buttons, forms, surfaces } = settings;

  const headingStack = getFontCssValue(fonts.headingFamily);
  const bodyStack = getFontCssValue(fonts.bodyFamily);
  const accentStack = getFontCssValue(fonts.accentFamily);

  const btnRadiusMap = {
    square: '0px',
    rounded: '4px',
    pill: '9999px',
  } as const;

  const btnPadMap = {
    compact: { py: '0.625rem', px: '1.15rem' },
    medium: { py: '0.85rem', px: '1.6rem' },
    generous: { py: '0.95rem', px: '2.15rem' },
  } as const;

  const elevationMap = {
    none: 'none',
    subtle: '0 4px 14px -4px rgba(20, 20, 19, 0.08)',
    lifted: '0 18px 40px -16px rgba(20, 20, 19, 0.2)',
  } as const;

  const animDurationMap = {
    slow: '0.85s',
    medium: '0.55s',
    fast: '0.28s',
  } as const;

  const animRangeMap = {
    slow: '42%',
    medium: '30%',
    fast: '18%',
  } as const;

  const onAccent = readableOnColor(colors.accentPrimary);
  const onSecondaryAccent = readableOnColor(colors.accentSecondary);
  const inkIsLight = relativeLuminance(colors.inkPrimary) > 0.45;

  const sharedVars: Record<string, string> = {
    '--ds-font-heading': headingStack,
    '--ds-heading-weight': fonts.headingWeight,
    '--ds-heading-scale': String(fonts.headingScale),
    '--ds-heading-lh': String(fonts.headingLineHeight),
    '--ds-heading-ls': `${fonts.headingLetterSpacing}em`,
    '--ds-heading-transform': fonts.headingTransform,
    '--ds-font-body': bodyStack,
    '--ds-body-size': `${fonts.bodySize}px`,
    '--ds-body-lh': String(fonts.bodyLineHeight),
    '--ds-font-accent': accentStack,
    '--ds-accent-ls': `${fonts.accentLetterSpacing}em`,

    '--ds-page-bg': colors.pageBg,
    '--ds-surface-alt': colors.surfaceAlt,
    '--ds-accent-primary': colors.accentPrimary,
    '--ds-accent-secondary': colors.accentSecondary,
    '--ds-ink-primary': colors.inkPrimary,
    '--ds-ink-secondary': colors.inkSecondary,
    '--ds-accent-soft': colors.accentSoft,
    '--ds-on-accent': onAccent,
    '--ds-on-accent-secondary': onSecondaryAccent,

    '--ds-page-max-width': `${spacing.pageMaxWidth}px`,
    '--ds-site-margin': `${spacing.siteMargin}px`,
    '--ds-section-py': `${spacing.sectionPaddingY}px`,
    '--ds-element-gap': `${spacing.elementGap}px`,

    '--ds-btn-radius': btnRadiusMap[buttons.shape],
    '--ds-btn-border-width': `${buttons.borderWidth}px`,
    '--ds-btn-py': btnPadMap[buttons.paddingScale].py,
    '--ds-btn-px': btnPadMap[buttons.paddingScale].px,
    '--ds-btn-transform': buttons.textTransform,

    '--ds-form-radius': `${forms.fieldRadius}px`,
    '--ds-form-border-width': `${forms.borderWidth}px`,
    '--ds-form-gap': `${forms.fieldSpacing}px`,
    '--ds-form-label-transform': forms.labelTransform,
    '--ds-form-accent': colors.accentPrimary,

    '--ds-card-radius': `${surfaces.cardRadius}px`,
    '--ds-card-border-width': `${surfaces.borderWidth}px`,
    '--ds-card-shadow': elevationMap[surfaces.elevation],

    '--ds-anim-duration': animDurationMap[animations.speed],
    '--ds-anim-range-end': animRangeMap[animations.speed],
  };

  if (variantId === 'v1') {
    return {
      ...sharedVars,
      '--surface-bg': colors.pageBg,
      '--surface-card': colors.surfaceAlt,
      '--surface-dark': inkIsLight ? colors.surfaceAlt : colors.inkPrimary,
      '--surface-dark-ink': inkIsLight ? colors.inkPrimary : colors.pageBg,
      '--surface-dark-muted': `color-mix(in oklab, ${inkIsLight ? colors.inkPrimary : colors.pageBg} 76%, ${inkIsLight ? colors.surfaceAlt : colors.inkPrimary})`,
      '--ink-primary': colors.inkPrimary,
      '--ink-secondary': colors.inkSecondary,
      '--ink-muted': `color-mix(in oklab, ${colors.inkSecondary} 72%, ${colors.pageBg})`,
      '--accent-signal': colors.accentPrimary,
      '--accent-signal-hover': colors.accentSecondary,
      '--border-hairline': colors.accentSoft,
      '--font-display': headingStack,
      '--font-serif': "'Instrument Serif', Georgia, serif",
      '--font-sans': bodyStack,
      '--font-mono': accentStack,
    };
  }

  if (variantId === 'v2') {
    return {
      ...sharedVars,
      '--meriden-cream': colors.pageBg,
      '--meriden-cream-tint': colors.surfaceAlt,
      '--meriden-vermilion': colors.accentPrimary,
      '--meriden-vermilion-deep': `color-mix(in oklab, ${colors.accentPrimary} 84%, black)`,
      '--meriden-marigold': colors.accentSecondary,
      '--meriden-butter': `color-mix(in oklab, ${colors.accentSecondary} 62%, white)`,
      '--meriden-espresso': colors.inkPrimary,
      '--meriden-terracotta': colors.inkSecondary,
      '--meriden-sky': colors.accentSoft,
      '--meriden-white': '#ffffff',
      '--font-display': headingStack,
      '--font-condensed': accentStack,
      '--font-prose': bodyStack,
    };
  }

  const cypressIsLight = relativeLuminance(colors.inkSecondary) > 0.45;
  const onPine = inkIsLight ? colors.inkPrimary : colors.pageBg;
  const pineSurface = inkIsLight ? colors.surfaceAlt : colors.inkPrimary;
  const onCypress = cypressIsLight ? '#141413' : colors.pageBg;

  return {
    ...sharedVars,
    '--fletcher-mist': colors.pageBg,
    '--fletcher-mist-alt': colors.surfaceAlt,
    '--fletcher-pine': pineSurface,
    '--fletcher-on-pine': onPine,
    '--fletcher-on-pine-muted': `color-mix(in oklab, ${onPine} 74%, ${pineSurface})`,
    '--fletcher-cypress': colors.inkSecondary,
    '--fletcher-on-cypress': onCypress,
    '--fletcher-on-cypress-muted': `color-mix(in oklab, ${onCypress} 78%, ${colors.inkSecondary})`,
    '--fletcher-rust': colors.accentPrimary,
    '--fletcher-oxblood': colors.accentSecondary,
    '--fletcher-on-rust': onAccent,
    '--fletcher-border': colors.accentSoft,
    '--fletcher-border-dark': `color-mix(in oklab, ${onPine} 22%, transparent)`,
    '--font-display': headingStack,
    '--font-prose': bodyStack,
    '--font-meta': accentStack,
  };
}

export function generateCssSnippet(
  settings: DesignSystemSettings,
  variantId: VariantId,
): string {
  const vars = buildCssVars(settings, variantId);
  const lines = Object.entries(vars).map(([key, val]) => `  ${key}: ${val};`);
  return [
    `/* Jonathan Farr Therapy — ${variantId.toUpperCase()} Design System Tokens */`,
    `/* Animation: ${settings.animations.style} (${settings.animations.speed}) · Ambient: ${settings.animations.ambientMotion ? 'on' : 'off'} */`,
    `/* Buttons: ${settings.buttons.shape} / ${settings.buttons.fillStyle} · Forms: ${settings.forms.fieldStyle} */`,
    `:root {`,
    ...lines,
    `}`,
  ].join('\n');
}
