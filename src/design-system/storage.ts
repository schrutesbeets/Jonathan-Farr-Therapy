import { getDefaultSettings, getVariantLabel } from './presets';
import {
  type DesignSystemExportPayload,
  type DesignSystemSettings,
  type VariantId,
  validateAndSanitizeSettings,
} from './schema';

const STORAGE_PREFIX = 'jft-ds-settings:';

export function getStorageKey(variantId: VariantId): string {
  return `${STORAGE_PREFIX}${variantId}`;
}

export function areSettingsEqual(
  a: DesignSystemSettings,
  b: DesignSystemSettings,
): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function loadVariantSettings(variantId: VariantId): DesignSystemSettings {
  const defaults = getDefaultSettings(variantId);
  if (typeof window === 'undefined') return defaults;

  try {
    const raw = window.localStorage.getItem(getStorageKey(variantId));
    if (!raw) return defaults;
    const parsed: unknown = JSON.parse(raw);
    const { settings } = validateAndSanitizeSettings(parsed, defaults);
    return settings;
  } catch {
    return defaults;
  }
}

export function saveVariantSettings(
  variantId: VariantId,
  settings: DesignSystemSettings,
): void {
  if (typeof window === 'undefined') return;
  const defaults = getDefaultSettings(variantId);

  try {
    if (areSettingsEqual(settings, defaults)) {
      window.localStorage.removeItem(getStorageKey(variantId));
    } else {
      window.localStorage.setItem(
        getStorageKey(variantId),
        JSON.stringify(settings),
      );
    }
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

export function clearVariantSettings(variantId: VariantId): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(getStorageKey(variantId));
  } catch {
    // Ignore storage errors
  }
}

export function hasCustomSettings(variantId: VariantId): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(getStorageKey(variantId));
    if (!raw) return false;
    const current = loadVariantSettings(variantId);
    const defaults = getDefaultSettings(variantId);
    return !areSettingsEqual(current, defaults);
  } catch {
    return false;
  }
}

export function createExportJson(
  variantId: VariantId,
  settings: DesignSystemSettings,
): string {
  const payload: DesignSystemExportPayload = {
    schemaVersion: 1,
    app: 'jonathan-farr-therapy',
    variantId,
    variantLabel: getVariantLabel(variantId),
    exportedAt: new Date().toISOString(),
    settings,
  };
  return JSON.stringify(payload, null, 2);
}

export type ImportParseResult =
  | {
      ok: true;
      settings: DesignSystemSettings;
      importedFromVariant: VariantId | null;
      warnings: string[];
    }
  | {
      ok: false;
      error: string;
    };

export function parseImportedJson(
  text: string,
  targetVariantId: VariantId,
): ImportParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      ok: false,
      error: 'Invalid JSON syntax. Please choose a valid design system .json file.',
    };
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return {
      ok: false,
      error: 'JSON root must be an object containing design system settings.',
    };
  }

  const record = parsed as Record<string, unknown>;
  const fallback = getDefaultSettings(targetVariantId);

  let rawSettings: unknown = record;
  let importedFromVariant: VariantId | null = null;

  if ('settings' in record && typeof record.settings === 'object' && record.settings !== null) {
    rawSettings = record.settings;
    if (record.variantId === 'v1' || record.variantId === 'v2') {
      importedFromVariant = record.variantId;
    }
  } else if (!('fonts' in record) && !('colors' in record) && !('buttons' in record)) {
    return {
      ok: false,
      error: 'Recognized JSON file, but no design system categories (fonts, colors, spacing, buttons, forms, surfaces) were found.',
    };
  }

  const { settings, warnings } = validateAndSanitizeSettings(rawSettings, fallback);
  return {
    ok: true,
    settings,
    importedFromVariant,
    warnings,
  };
}
