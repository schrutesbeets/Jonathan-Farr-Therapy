export type VariantId = 'v1' | 'v2';

export type HeadingWeight = '400' | '500' | '600' | '700';
export type HeadingTransform = 'none' | 'uppercase' | 'capitalize';
export type AnimationStyle = 'none' | 'fade' | 'slide' | 'scale' | 'clip';
export type AnimationSpeed = 'slow' | 'medium' | 'fast';
export type ButtonShape = 'square' | 'rounded' | 'pill';
export type ButtonFillStyle = 'solid' | 'outline';
export type ButtonPaddingScale = 'compact' | 'medium' | 'generous';
export type ButtonTextTransform = 'uppercase' | 'capitalize' | 'none';
export type FormFieldStyle = 'outlined' | 'filled' | 'underline';
export type FormLabelTransform = 'uppercase' | 'none';
export type SurfaceElevation = 'none' | 'subtle' | 'lifted';

export interface DesignSystemSettings {
  fonts: {
    headingFamily: string;
    headingWeight: HeadingWeight;
    headingScale: number;
    headingLineHeight: number;
    headingLetterSpacing: number;
    headingTransform: HeadingTransform;
    bodyFamily: string;
    bodySize: number;
    bodyLineHeight: number;
    accentFamily: string;
    accentLetterSpacing: number;
  };
  colors: {
    pageBg: string;
    surfaceAlt: string;
    accentPrimary: string;
    accentSecondary: string;
    inkPrimary: string;
    inkSecondary: string;
    accentSoft: string;
  };
  animations: {
    style: AnimationStyle;
    speed: AnimationSpeed;
    ambientMotion: boolean;
  };
  spacing: {
    pageMaxWidth: number;
    siteMargin: number;
    sectionPaddingY: number;
    elementGap: number;
  };
  buttons: {
    shape: ButtonShape;
    fillStyle: ButtonFillStyle;
    borderWidth: number;
    paddingScale: ButtonPaddingScale;
    textTransform: ButtonTextTransform;
  };
  forms: {
    fieldStyle: FormFieldStyle;
    fieldRadius: number;
    borderWidth: number;
    fieldSpacing: number;
    labelTransform: FormLabelTransform;
  };
  surfaces: {
    cardRadius: number;
    borderWidth: number;
    elevation: SurfaceElevation;
  };
}

export interface DesignSystemExportPayload {
  schemaVersion: 1;
  app: 'jonathan-farr-therapy';
  variantId: VariantId;
  variantLabel: string;
  exportedAt: string;
  settings: DesignSystemSettings;
}

export const SETTINGS_COUNT = 38;

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;
const SAFE_FONT_RE = /^[a-zA-Z0-9\s,'"-]{1,64}$/;

const HEADING_WEIGHTS: readonly HeadingWeight[] = ['400', '500', '600', '700'];
const HEADING_TRANSFORMS: readonly HeadingTransform[] = ['none', 'uppercase', 'capitalize'];
const ANIMATION_STYLES: readonly AnimationStyle[] = ['none', 'fade', 'slide', 'scale', 'clip'];
const ANIMATION_SPEEDS: readonly AnimationSpeed[] = ['slow', 'medium', 'fast'];
const BUTTON_SHAPES: readonly ButtonShape[] = ['square', 'rounded', 'pill'];
const BUTTON_FILLS: readonly ButtonFillStyle[] = ['solid', 'outline'];
const BUTTON_PADDINGS: readonly ButtonPaddingScale[] = ['compact', 'medium', 'generous'];
const BUTTON_TRANSFORMS: readonly ButtonTextTransform[] = ['uppercase', 'capitalize', 'none'];
const FORM_FIELD_STYLES: readonly FormFieldStyle[] = ['outlined', 'filled', 'underline'];
const FORM_LABEL_TRANSFORMS: readonly FormLabelTransform[] = ['uppercase', 'none'];
const SURFACE_ELEVATIONS: readonly SurfaceElevation[] = ['none', 'subtle', 'lifted'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function pickEnum<T extends string>(
  raw: unknown,
  allowed: readonly T[],
  fallback: T,
  fieldPath: string,
  warnings: string[],
): T {
  if (raw === undefined) return fallback;
  if (typeof raw === 'string' && (allowed as readonly string[]).includes(raw)) {
    return raw as T;
  }
  warnings.push(`Invalid value for ${fieldPath}; kept default (${fallback}).`);
  return fallback;
}

function clampNumber(
  raw: unknown,
  min: number,
  max: number,
  step: number,
  fallback: number,
  fieldPath: string,
  warnings: string[],
): number {
  if (raw === undefined) return fallback;
  if (typeof raw !== 'number' || !Number.isFinite(raw)) {
    warnings.push(`Invalid number for ${fieldPath}; kept default (${fallback}).`);
    return fallback;
  }
  const clamped = Math.min(max, Math.max(min, raw));
  const rounded = Math.round(clamped / step) * step;
  const precision = step < 1 ? String(step).split('.')[1]?.length ?? 2 : 0;
  const normalized = Number(rounded.toFixed(precision));
  if (clamped !== raw) {
    warnings.push(`Clamped ${fieldPath} to [${min}, ${max}].`);
  }
  return normalized;
}

function pickHex(
  raw: unknown,
  fallback: string,
  fieldPath: string,
  warnings: string[],
): string {
  if (raw === undefined) return fallback;
  if (typeof raw === 'string') {
    const trimmed = raw.trim().toLowerCase();
    if (HEX_COLOR_RE.test(trimmed)) return trimmed;
  }
  warnings.push(`Invalid hex color for ${fieldPath}; kept default (${fallback}).`);
  return fallback;
}

function pickFont(
  raw: unknown,
  fallback: string,
  fieldPath: string,
  warnings: string[],
): string {
  if (raw === undefined) return fallback;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (SAFE_FONT_RE.test(trimmed)) return trimmed;
  }
  warnings.push(`Invalid font name for ${fieldPath}; kept default (${fallback}).`);
  return fallback;
}

function pickBoolean(
  raw: unknown,
  fallback: boolean,
  fieldPath: string,
  warnings: string[],
): boolean {
  if (raw === undefined) return fallback;
  if (typeof raw === 'boolean') return raw;
  warnings.push(`Invalid boolean for ${fieldPath}; kept default.`);
  return fallback;
}

export function validateAndSanitizeSettings(
  raw: unknown,
  fallback: DesignSystemSettings,
): { settings: DesignSystemSettings; warnings: string[] } {
  const warnings: string[] = [];
  if (!isRecord(raw)) {
    return {
      settings: structuredClone(fallback),
      warnings: ['Settings payload was not an object; used defaults.'],
    };
  }

  const rawFonts = isRecord(raw.fonts) ? raw.fonts : {};
  const rawColors = isRecord(raw.colors) ? raw.colors : {};
  const rawAnims = isRecord(raw.animations) ? raw.animations : {};
  const rawSpacing = isRecord(raw.spacing) ? raw.spacing : {};
  const rawButtons = isRecord(raw.buttons) ? raw.buttons : {};
  const rawForms = isRecord(raw.forms) ? raw.forms : {};
  const rawSurfaces = isRecord(raw.surfaces) ? raw.surfaces : {};

  const settings: DesignSystemSettings = {
    fonts: {
      headingFamily: pickFont(rawFonts.headingFamily, fallback.fonts.headingFamily, 'fonts.headingFamily', warnings),
      headingWeight: pickEnum(rawFonts.headingWeight, HEADING_WEIGHTS, fallback.fonts.headingWeight, 'fonts.headingWeight', warnings),
      headingScale: clampNumber(rawFonts.headingScale, 0.75, 1.35, 0.05, fallback.fonts.headingScale, 'fonts.headingScale', warnings),
      headingLineHeight: clampNumber(rawFonts.headingLineHeight, 0.9, 1.4, 0.02, fallback.fonts.headingLineHeight, 'fonts.headingLineHeight', warnings),
      headingLetterSpacing: clampNumber(rawFonts.headingLetterSpacing, -0.06, 0.12, 0.005, fallback.fonts.headingLetterSpacing, 'fonts.headingLetterSpacing', warnings),
      headingTransform: pickEnum(rawFonts.headingTransform, HEADING_TRANSFORMS, fallback.fonts.headingTransform, 'fonts.headingTransform', warnings),
      bodyFamily: pickFont(rawFonts.bodyFamily, fallback.fonts.bodyFamily, 'fonts.bodyFamily', warnings),
      bodySize: clampNumber(rawFonts.bodySize, 14, 20, 0.5, fallback.fonts.bodySize, 'fonts.bodySize', warnings),
      bodyLineHeight: clampNumber(rawFonts.bodyLineHeight, 1.3, 2.0, 0.05, fallback.fonts.bodyLineHeight, 'fonts.bodyLineHeight', warnings),
      accentFamily: pickFont(rawFonts.accentFamily, fallback.fonts.accentFamily, 'fonts.accentFamily', warnings),
      accentLetterSpacing: clampNumber(rawFonts.accentLetterSpacing, 0, 0.25, 0.01, fallback.fonts.accentLetterSpacing, 'fonts.accentLetterSpacing', warnings),
    },
    colors: {
      pageBg: pickHex(rawColors.pageBg, fallback.colors.pageBg, 'colors.pageBg', warnings),
      surfaceAlt: pickHex(rawColors.surfaceAlt, fallback.colors.surfaceAlt, 'colors.surfaceAlt', warnings),
      accentPrimary: pickHex(rawColors.accentPrimary, fallback.colors.accentPrimary, 'colors.accentPrimary', warnings),
      accentSecondary: pickHex(rawColors.accentSecondary, fallback.colors.accentSecondary, 'colors.accentSecondary', warnings),
      inkPrimary: pickHex(rawColors.inkPrimary, fallback.colors.inkPrimary, 'colors.inkPrimary', warnings),
      inkSecondary: pickHex(rawColors.inkSecondary, fallback.colors.inkSecondary, 'colors.inkSecondary', warnings),
      accentSoft: pickHex(rawColors.accentSoft, fallback.colors.accentSoft, 'colors.accentSoft', warnings),
    },
    animations: {
      style: pickEnum(rawAnims.style, ANIMATION_STYLES, fallback.animations.style, 'animations.style', warnings),
      speed: pickEnum(rawAnims.speed, ANIMATION_SPEEDS, fallback.animations.speed, 'animations.speed', warnings),
      ambientMotion: pickBoolean(rawAnims.ambientMotion, fallback.animations.ambientMotion, 'animations.ambientMotion', warnings),
    },
    spacing: {
      pageMaxWidth: clampNumber(rawSpacing.pageMaxWidth, 960, 1440, 16, fallback.spacing.pageMaxWidth, 'spacing.pageMaxWidth', warnings),
      siteMargin: clampNumber(rawSpacing.siteMargin, 12, 64, 4, fallback.spacing.siteMargin, 'spacing.siteMargin', warnings),
      sectionPaddingY: clampNumber(rawSpacing.sectionPaddingY, 32, 144, 8, fallback.spacing.sectionPaddingY, 'spacing.sectionPaddingY', warnings),
      elementGap: clampNumber(rawSpacing.elementGap, 12, 48, 4, fallback.spacing.elementGap, 'spacing.elementGap', warnings),
    },
    buttons: {
      shape: pickEnum(rawButtons.shape, BUTTON_SHAPES, fallback.buttons.shape, 'buttons.shape', warnings),
      fillStyle: pickEnum(rawButtons.fillStyle, BUTTON_FILLS, fallback.buttons.fillStyle, 'buttons.fillStyle', warnings),
      borderWidth: clampNumber(rawButtons.borderWidth, 1, 4, 1, fallback.buttons.borderWidth, 'buttons.borderWidth', warnings),
      paddingScale: pickEnum(rawButtons.paddingScale, BUTTON_PADDINGS, fallback.buttons.paddingScale, 'buttons.paddingScale', warnings),
      textTransform: pickEnum(rawButtons.textTransform, BUTTON_TRANSFORMS, fallback.buttons.textTransform, 'buttons.textTransform', warnings),
    },
    forms: {
      fieldStyle: pickEnum(rawForms.fieldStyle, FORM_FIELD_STYLES, fallback.forms.fieldStyle, 'forms.fieldStyle', warnings),
      fieldRadius: clampNumber(rawForms.fieldRadius, 0, 24, 2, fallback.forms.fieldRadius, 'forms.fieldRadius', warnings),
      borderWidth: clampNumber(rawForms.borderWidth, 1, 3, 1, fallback.forms.borderWidth, 'forms.borderWidth', warnings),
      fieldSpacing: clampNumber(rawForms.fieldSpacing, 8, 28, 2, fallback.forms.fieldSpacing, 'forms.fieldSpacing', warnings),
      labelTransform: pickEnum(rawForms.labelTransform, FORM_LABEL_TRANSFORMS, fallback.forms.labelTransform, 'forms.labelTransform', warnings),
    },
    surfaces: {
      cardRadius: clampNumber(rawSurfaces.cardRadius, 0, 28, 2, fallback.surfaces.cardRadius, 'surfaces.cardRadius', warnings),
      borderWidth: clampNumber(rawSurfaces.borderWidth, 0, 4, 1, fallback.surfaces.borderWidth, 'surfaces.borderWidth', warnings),
      elevation: pickEnum(rawSurfaces.elevation, SURFACE_ELEVATIONS, fallback.surfaces.elevation, 'surfaces.elevation', warnings),
    },
  };

  return { settings, warnings };
}
