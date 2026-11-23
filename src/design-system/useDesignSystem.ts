import { useCallback, useEffect, useMemo, useState, type RefObject } from 'react';
import { buildCssVars, generateCssSnippet } from './cssBridge';
import { ensureFontsLoaded } from './fonts';
import { getDefaultSettings } from './presets';
import type { DesignSystemSettings, VariantId } from './schema';
import {
  areSettingsEqual,
  clearVariantSettings,
  createExportJson,
  loadVariantSettings,
  parseImportedJson,
  saveVariantSettings,
} from './storage';

export interface PanelStatus {
  tone: 'info' | 'success' | 'error';
  text: string;
}

export function useDesignSystem(
  variantId: VariantId,
  rootRef: RefObject<HTMLDivElement | null>,
) {
  const [settings, setSettings] = useState<DesignSystemSettings>(() =>
    loadVariantSettings(variantId),
  );
  const [replayNonce, setReplayNonce] = useState(0);
  const [statusMessage, setStatusMessage] = useState<PanelStatus | null>(null);

  // Reload if variantId changes
  useEffect(() => {
    setSettings(loadVariantSettings(variantId));
    setStatusMessage(null);
  }, [variantId]);

  const defaults = useMemo(() => getDefaultSettings(variantId), [variantId]);
  const isCustomized = useMemo(
    () => !areSettingsEqual(settings, defaults),
    [settings, defaults],
  );

  // Load any non-preloaded Google Fonts selected by the user
  useEffect(() => {
    ensureFontsLoaded([
      settings.fonts.headingFamily,
      settings.fonts.bodyFamily,
      settings.fonts.accentFamily,
    ]);
  }, [
    settings.fonts.headingFamily,
    settings.fonts.bodyFamily,
    settings.fonts.accentFamily,
  ]);

  // Apply CSS custom properties + structural data attributes to the active variant root
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const vars = buildCssVars(settings, variantId);
    for (const [prop, value] of Object.entries(vars)) {
      root.style.setProperty(prop, value);
    }

    root.setAttribute('data-ds-anim', settings.animations.style);
    root.setAttribute('data-ds-speed', settings.animations.speed);
    root.setAttribute(
      'data-ds-ambient',
      settings.animations.ambientMotion ? 'on' : 'off',
    );
    root.setAttribute('data-ds-btn-fill', settings.buttons.fillStyle);
    root.setAttribute('data-ds-form-style', settings.forms.fieldStyle);

    // Sync body background so overscroll/bounce matches the active variant background
    const prevBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = settings.colors.pageBg;

    return () => {
      document.body.style.backgroundColor = prevBodyBg;
    };
  }, [settings, variantId, rootRef]);

  // Persist changes to localStorage scoped strictly by variantId
  useEffect(() => {
    saveVariantSettings(variantId, settings);
  }, [variantId, settings]);

  const updateSection = useCallback(
    <K extends keyof DesignSystemSettings>(
      section: K,
      patch: Partial<DesignSystemSettings[K]>,
    ) => {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...patch,
        },
      }));
    },
    [],
  );

  const applyFontPack = useCallback(
    (packFonts: Partial<DesignSystemSettings['fonts']>, packName: string) => {
      setSettings((prev) => ({
        ...prev,
        fonts: { ...prev.fonts, ...packFonts },
      }));
      setStatusMessage({
        tone: 'success',
        text: `Applied "${packName}" font pack.`,
      });
    },
    [],
  );

  const applyColorPalette = useCallback(
    (paletteColors: DesignSystemSettings['colors'], paletteName: string) => {
      setSettings((prev) => ({
        ...prev,
        colors: { ...paletteColors },
      }));
      setStatusMessage({
        tone: 'success',
        text: `Applied "${paletteName}" color palette.`,
      });
    },
    [],
  );

  const applyFormPack = useCallback(
    (formPack: DesignSystemSettings['forms'], packName: string) => {
      setSettings((prev) => ({
        ...prev,
        forms: { ...formPack },
      }));
      setStatusMessage({
        tone: 'success',
        text: `Applied "${packName}" form style.`,
      });
    },
    [],
  );

  const resetToDefaults = useCallback(() => {
    clearVariantSettings(variantId);
    setSettings(getDefaultSettings(variantId));
    setStatusMessage({
      tone: 'info',
      text: `Restored ${variantId.toUpperCase()} default design system.`,
    });
  }, [variantId]);

  const exportToFile = useCallback(() => {
    const json = createExportJson(variantId, settings);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jonathan-farr-${variantId}-design-system.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatusMessage({
      tone: 'success',
      text: `Exported jonathan-farr-${variantId}-design-system.json`,
    });
  }, [variantId, settings]);

  const importFromFile = useCallback(
    async (file: File) => {
      try {
        const text = await file.text();
        const result = parseImportedJson(text, variantId);
        if (!result.ok) {
          setStatusMessage({ tone: 'error', text: result.error });
          return;
        }
        setSettings(result.settings);
        const crossNote =
          result.importedFromVariant && result.importedFromVariant !== variantId
            ? ` (adapted from ${result.importedFromVariant.toUpperCase()})`
            : '';
        const warningNote =
          result.warnings.length > 0
            ? ` · ${result.warnings.length} field(s) normalized`
            : '';
        setStatusMessage({
          tone: 'success',
          text: `Imported design system${crossNote}${warningNote}.`,
        });
      } catch {
        setStatusMessage({
          tone: 'error',
          text: 'Could not read the selected file.',
        });
      }
    },
    [variantId],
  );

  const copyCss = useCallback(async () => {
    const css = generateCssSnippet(settings, variantId);
    try {
      await navigator.clipboard.writeText(css);
      setStatusMessage({
        tone: 'success',
        text: 'Copied CSS custom properties to clipboard.',
      });
    } catch {
      setStatusMessage({
        tone: 'error',
        text: 'Clipboard unavailable in this browser context.',
      });
    }
  }, [settings, variantId]);

  const triggerReplayAnimations = useCallback(() => {
    setReplayNonce((n) => n + 1);
    setStatusMessage({
      tone: 'info',
      text:
        settings.animations.style === 'none'
          ? 'Animation style is currently "None" — choose Fade, Slide, Scale, or Clip to preview.'
          : `Replaying "${settings.animations.style}" entry animations.`,
    });
  }, [settings.animations.style]);

  const clearStatus = useCallback(() => {
    setStatusMessage(null);
  }, []);

  return {
    settings,
    isCustomized,
    replayNonce,
    statusMessage,
    updateSection,
    applyFontPack,
    applyColorPalette,
    applyFormPack,
    resetToDefaults,
    exportToFile,
    importFromFile,
    copyCss,
    triggerReplayAnimations,
    clearStatus,
  };
}
