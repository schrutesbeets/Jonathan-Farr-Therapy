import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Info,
  Layers,
  MousePointerClick,
  Move,
  Palette,
  Play,
  RotateCcw,
  Settings,
  Sparkles,
  Type,
  Upload,
  X,
} from 'lucide-react';
import { FONT_CATALOG } from './fonts';
import { COLOR_PALETTES, FONT_PACKS, FORM_PACKS } from './presets';
import {
  SETTINGS_COUNT,
  type AnimationSpeed,
  type AnimationStyle,
  type ButtonFillStyle,
  type ButtonPaddingScale,
  type ButtonShape,
  type ButtonTextTransform,
  type DesignSystemSettings,
  type FormFieldStyle,
  type FormLabelTransform,
  type HeadingTransform,
  type HeadingWeight,
  type SurfaceElevation,
  type VariantId,
} from './schema';
import type { PanelStatus } from './useDesignSystem';

type CategoryKey =
  | 'fonts'
  | 'colors'
  | 'animations'
  | 'spacing'
  | 'buttons'
  | 'forms'
  | 'surfaces';

const ALL_CATEGORIES: readonly CategoryKey[] = [
  'fonts',
  'colors',
  'animations',
  'spacing',
  'buttons',
  'forms',
  'surfaces',
];

// Top-layer exit animation detection for Firefox/Safari (animate-to-from-top-layer guide)
let cachedDisplayTransitionSupport: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (cachedDisplayTransitionSupport !== undefined) {
    return cachedDisplayTransitionSupport;
  }
  if (
    typeof window === 'undefined' ||
    !window.CSS?.supports?.('transition-behavior', 'allow-discrete') ||
    !document.body
  ) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText =
    'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  const beforeDisplay = getComputedStyle(probe).display;
  probe.style.display = 'none';
  cachedDisplayTransitionSupport =
    beforeDisplay === 'block' && getComputedStyle(probe).display === 'block';
  probe.remove();
  return cachedDisplayTransitionSupport;
}

function supportsTopLayerExit(): boolean {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.CSS?.supports?.('overlay', 'auto')) &&
    canTransitionDisplay()
  );
}

interface DesignSystemPanelProps {
  variantId: VariantId;
  settings: DesignSystemSettings;
  isCustomized: boolean;
  statusMessage: PanelStatus | null;
  onUpdateSection: <K extends keyof DesignSystemSettings>(
    section: K,
    patch: Partial<DesignSystemSettings[K]>,
  ) => void;
  onApplyFontPack: (
    packFonts: Partial<DesignSystemSettings['fonts']>,
    packName: string,
  ) => void;
  onApplyColorPalette: (
    paletteColors: DesignSystemSettings['colors'],
    paletteName: string,
  ) => void;
  onApplyFormPack: (
    formPack: DesignSystemSettings['forms'],
    packName: string,
  ) => void;
  onReset: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onCopyCss: () => void;
  onReplayAnimations: () => void;
  onClearStatus: () => void;
}

const FONT_GROUPS = [
  'Display Serif',
  'Sans-Serif',
  'Condensed',
  'Monospace',
] as const;

function FontSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <select
      id={id}
      className="ds-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {FONT_GROUPS.map((group) => (
        <optgroup key={group} label={group}>
          {FONT_CATALOG.filter((f) => f.category === group).map((font) => (
            <option key={font.family} value={font.family}>
              {font.family}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function ColorTokenRow({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleHexChange = (nextRaw: string) => {
    setDraft(nextRaw);
    const normalized = nextRaw.trim().toLowerCase();
    if (/^#[0-9a-f]{6}$/.test(normalized)) {
      onChange(normalized);
    }
  };

  return (
    <div className="ds-color-row">
      <label htmlFor={`${id}-hex`} className="ds-control-label">
        {label}
      </label>
      <div className="ds-color-inputs">
        <input
          type="color"
          aria-label={`${label} color picker`}
          className="ds-color-picker"
          value={value}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
        />
        <input
          id={`${id}-hex`}
          type="text"
          spellCheck={false}
          maxLength={7}
          className="ds-hex-input"
          value={draft}
          onChange={(e) => handleHexChange(e.target.value)}
          onBlur={() => setDraft(value)}
        />
      </div>
    </div>
  );
}

export function DesignSystemPanel({
  variantId,
  settings,
  isCustomized,
  statusMessage,
  onUpdateSection,
  onApplyFontPack,
  onApplyColorPalette,
  onApplyFormPack,
  onReset,
  onExport,
  onImport,
  onCopyCss,
  onReplayAnimations,
  onClearStatus,
}: DesignSystemPanelProps) {
  const drawerId = useId();
  const titleId = useId();
  const fileInputId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [copiedRecently, setCopiedRecently] = useState(false);
  const [openSections, setOpenSections] = useState<Record<CategoryKey, boolean>>({
    fonts: true,
    colors: false,
    animations: false,
    spacing: false,
    buttons: false,
    forms: false,
    surfaces: false,
  });

  // Conditionally load Popover API polyfill only where missing (dialog guide rule)
  useEffect(() => {
    if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
      void import('@oddbird/popover-polyfill');
    }
  }, []);

  const allExpanded = useMemo(
    () => ALL_CATEGORIES.every((key) => openSections[key]),
    [openSections],
  );

  const openDrawer = useCallback(async () => {
    const dialog = dialogRef.current as
      | (HTMLDivElement & { showPopover?: () => void })
      | null;
    if (!dialog) return;

    if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
      await import('@oddbird/popover-polyfill');
    }
    dialog.removeAttribute('data-closing');
    dialog.setAttribute('popover', 'manual');
    try {
      dialog.showPopover?.();
    } catch {
      // Ignore if already open
    }
    setIsOpen(true);
    requestAnimationFrame(() => {
      closeBtnRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const closeDrawer = useCallback(async () => {
    const dialog = dialogRef.current as
      | (HTMLDivElement & { hidePopover?: () => void })
      | null;
    if (!dialog) return;

    if (!supportsTopLayerExit()) {
      dialog.setAttribute('data-closing', '');
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
      }
      if (!dialog.hasAttribute('data-closing')) return;
      dialog.removeAttribute('data-closing');
    }

    try {
      dialog.hidePopover?.();
    } catch {
      // Ignore if already closed
    }
    setIsOpen(false);
    fabRef.current?.focus({ preventScroll: true });
  }, []);

  const toggleDrawer = useCallback(() => {
    if (isOpen) {
      void closeDrawer();
    } else {
      void openDrawer();
    }
  }, [isOpen, openDrawer, closeDrawer]);

  // Escape closes non-modal drawer and restores focus to FAB
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        void closeDrawer();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeDrawer]);

  const handleToggleAll = () => {
    const next = !allExpanded;
    setOpenSections({
      fonts: next,
      colors: next,
      animations: next,
      spacing: next,
      buttons: next,
      forms: next,
      surfaces: next,
    });
  };

  const handleAccordionToggle = (key: CategoryKey, nextOpen: boolean) => {
    setOpenSections((prev) =>
      prev[key] === nextOpen ? prev : { ...prev, [key]: nextOpen },
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
    e.target.value = '';
  };

  const handleCopyCss = () => {
    onCopyCss();
    setCopiedRecently(true);
    window.setTimeout(() => setCopiedRecently(false), 1800);
  };

  const { fonts, colors, animations, spacing, buttons, forms, surfaces } =
    settings;

  return (
    <div className="ds-editor-root">
      {/* Shared Bottom-Right Settings FAB */}
      <button
        ref={fabRef}
        type="button"
        className="ds-fab"
        aria-label="Open Design System Settings"
        aria-expanded={isOpen}
        aria-controls={drawerId}
        onClick={toggleDrawer}
      >
        <Settings className="ds-fab-icon" aria-hidden="true" />
        {isCustomized && <span className="ds-fab-badge" aria-hidden="true" />}
      </button>

      {/* Non-Modal Top-Layer Slide-Out Drawer */}
      <div
        ref={dialogRef}
        id={drawerId}
        role="dialog"
        {...({ popover: 'manual' } as Record<string, string>)}
        aria-labelledby={titleId}
        className="ds-drawer"
      >
        {/* Header */}
        <header className="ds-drawer-header">
          <div className="ds-drawer-header-top">
            <div>
              <p className="ds-drawer-overline">Site Styles · {SETTINGS_COUNT} Tokens</p>
              <h2 id={titleId} className="ds-drawer-title">
                Design System
              </h2>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              className="ds-icon-btn"
              onClick={() => void closeDrawer()}
              aria-label="Close Design System Settings"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="ds-drawer-toolbar">
            <span className="ds-variant-pill">
              <span>{variantId === 'v1' ? 'V1 · Minimal Grid' : 'V2 · Meriden Bold'}</span>
              {isCustomized ? '· Edited' : '· Default'}
            </span>

            <div className="ds-toolbar-actions">
              <button
                type="button"
                className="ds-text-btn"
                aria-expanded={allExpanded}
                onClick={handleToggleAll}
              >
                {allExpanded ? 'Collapse all' : 'Expand all'}
              </button>
              <Link to="/" className="ds-text-btn">
                Switch Variant
              </Link>
            </div>
          </div>
        </header>

        {/* Scrollable Squarespace-Style Style Categories */}
        <div className="ds-drawer-body">
          <div className="ds-accordion-group">
            {/* 1. FONTS (11 settings) */}
            <details
              open={openSections.fonts}
              onToggle={(e) =>
                handleAccordionToggle('fonts', e.currentTarget.open)
              }
            >
              <summary className="ds-accordion-summary">
                <span className="ds-acc-left">
                  <ChevronDown className="ds-acc-chevron" aria-hidden="true" />
                  <Type className="w-4 h-4" aria-hidden="true" />
                  <span>Fonts</span>
                </span>
                <span className="ds-acc-count">11</span>
              </summary>

              <div className="ds-acc-content">
                <div>
                  <p className="ds-subhead">Font Packs</p>
                  <div className="ds-pack-grid">
                    {FONT_PACKS.map((pack) => {
                      const active =
                        fonts.headingFamily === pack.fonts.headingFamily &&
                        fonts.bodyFamily === pack.fonts.bodyFamily &&
                        fonts.accentFamily === pack.fonts.accentFamily;
                      return (
                        <button
                          key={pack.id}
                          type="button"
                          className={`ds-pack-btn ${active ? 'is-active' : ''}`}
                          onClick={() => onApplyFontPack(pack.fonts, pack.name)}
                        >
                          <span className="ds-pack-title">{pack.name}</span>
                          <span className="ds-pack-sub">{pack.subtitle}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="ds-section-divider space-y-3">
                  <p className="ds-subhead">Headings</p>

                  <div className="ds-control-group">
                    <label htmlFor={`${drawerId}-h-family`} className="ds-control-label">
                      Heading Font
                    </label>
                    <FontSelect
                      id={`${drawerId}-h-family`}
                      value={fonts.headingFamily}
                      onChange={(headingFamily) =>
                        onUpdateSection('fonts', { headingFamily })
                      }
                    />
                  </div>

                  <div className="ds-control-group">
                    <span className="ds-control-label">Heading Weight</span>
                    <div className="ds-segmented" role="group" aria-label="Heading weight">
                      {(['400', '500', '600', '700'] as HeadingWeight[]).map((w) => (
                        <button
                          key={w}
                          type="button"
                          className="ds-seg-btn"
                          aria-pressed={fonts.headingWeight === w}
                          onClick={() => onUpdateSection('fonts', { headingWeight: w })}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ds-control-group">
                    <div className="ds-control-head">
                      <label htmlFor={`${drawerId}-h-scale`} className="ds-control-label">
                        Base Scale
                      </label>
                      <span className="ds-control-value">
                        {fonts.headingScale.toFixed(2)}×
                      </span>
                    </div>
                    <input
                      id={`${drawerId}-h-scale`}
                      type="range"
                      min={0.75}
                      max={1.35}
                      step={0.05}
                      className="ds-range"
                      value={fonts.headingScale}
                      onChange={(e) =>
                        onUpdateSection('fonts', {
                          headingScale: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="ds-control-group">
                    <div className="ds-control-head">
                      <label htmlFor={`${drawerId}-h-lh`} className="ds-control-label">
                        Line Height
                      </label>
                      <span className="ds-control-value">
                        {fonts.headingLineHeight.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id={`${drawerId}-h-lh`}
                      type="range"
                      min={0.9}
                      max={1.4}
                      step={0.02}
                      className="ds-range"
                      value={fonts.headingLineHeight}
                      onChange={(e) =>
                        onUpdateSection('fonts', {
                          headingLineHeight: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="ds-control-group">
                    <div className="ds-control-head">
                      <label htmlFor={`${drawerId}-h-ls`} className="ds-control-label">
                        Letter Spacing
                      </label>
                      <span className="ds-control-value">
                        {fonts.headingLetterSpacing.toFixed(3)}em
                      </span>
                    </div>
                    <input
                      id={`${drawerId}-h-ls`}
                      type="range"
                      min={-0.06}
                      max={0.12}
                      step={0.005}
                      className="ds-range"
                      value={fonts.headingLetterSpacing}
                      onChange={(e) =>
                        onUpdateSection('fonts', {
                          headingLetterSpacing: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="ds-control-group">
                    <span className="ds-control-label">Text Transform</span>
                    <div className="ds-segmented" role="group" aria-label="Heading text transform">
                      {(['none', 'uppercase', 'capitalize'] as HeadingTransform[]).map(
                        (t) => (
                          <button
                            key={t}
                            type="button"
                            className="ds-seg-btn"
                            aria-pressed={fonts.headingTransform === t}
                            onClick={() =>
                              onUpdateSection('fonts', { headingTransform: t })
                            }
                          >
                            {t}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="ds-section-divider space-y-3">
                  <p className="ds-subhead">Paragraphs</p>

                  <div className="ds-control-group">
                    <label htmlFor={`${drawerId}-b-family`} className="ds-control-label">
                      Paragraph Font
                    </label>
                    <FontSelect
                      id={`${drawerId}-b-family`}
                      value={fonts.bodyFamily}
                      onChange={(bodyFamily) =>
                        onUpdateSection('fonts', { bodyFamily })
                      }
                    />
                  </div>

                  <div className="ds-control-group">
                    <div className="ds-control-head">
                      <label htmlFor={`${drawerId}-b-size`} className="ds-control-label">
                        Base Size
                      </label>
                      <span className="ds-control-value">{fonts.bodySize}px</span>
                    </div>
                    <input
                      id={`${drawerId}-b-size`}
                      type="range"
                      min={14}
                      max={20}
                      step={0.5}
                      className="ds-range"
                      value={fonts.bodySize}
                      onChange={(e) =>
                        onUpdateSection('fonts', {
                          bodySize: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="ds-control-group">
                    <div className="ds-control-head">
                      <label htmlFor={`${drawerId}-b-lh`} className="ds-control-label">
                        Line Height
                      </label>
                      <span className="ds-control-value">
                        {fonts.bodyLineHeight.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id={`${drawerId}-b-lh`}
                      type="range"
                      min={1.3}
                      max={2.0}
                      step={0.05}
                      className="ds-range"
                      value={fonts.bodyLineHeight}
                      onChange={(e) =>
                        onUpdateSection('fonts', {
                          bodyLineHeight: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="ds-section-divider space-y-3">
                  <p className="ds-subhead">Miscellaneous &amp; Labels</p>

                  <div className="ds-control-group">
                    <label htmlFor={`${drawerId}-a-family`} className="ds-control-label">
                      Label / Technical Font
                    </label>
                    <FontSelect
                      id={`${drawerId}-a-family`}
                      value={fonts.accentFamily}
                      onChange={(accentFamily) =>
                        onUpdateSection('fonts', { accentFamily })
                      }
                    />
                  </div>

                  <div className="ds-control-group">
                    <div className="ds-control-head">
                      <label htmlFor={`${drawerId}-a-ls`} className="ds-control-label">
                        Label Tracking
                      </label>
                      <span className="ds-control-value">
                        {fonts.accentLetterSpacing.toFixed(2)}em
                      </span>
                    </div>
                    <input
                      id={`${drawerId}-a-ls`}
                      type="range"
                      min={0}
                      max={0.25}
                      step={0.01}
                      className="ds-range"
                      value={fonts.accentLetterSpacing}
                      onChange={(e) =>
                        onUpdateSection('fonts', {
                          accentLetterSpacing: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </details>

            {/* 2. COLORS (7 settings) */}
            <details
              open={openSections.colors}
              onToggle={(e) =>
                handleAccordionToggle('colors', e.currentTarget.open)
              }
            >
              <summary className="ds-accordion-summary">
                <span className="ds-acc-left">
                  <ChevronDown className="ds-acc-chevron" aria-hidden="true" />
                  <Palette className="w-4 h-4" aria-hidden="true" />
                  <span>Colors</span>
                </span>
                <span className="ds-acc-count">7</span>
              </summary>

              <div className="ds-acc-content">
                <div>
                  <p className="ds-subhead">Palette Presets</p>
                  <div className="ds-pack-grid">
                    {COLOR_PALETTES.map((palette) => {
                      const active =
                        palette.colors.pageBg === colors.pageBg &&
                        palette.colors.accentPrimary === colors.accentPrimary &&
                        palette.colors.inkPrimary === colors.inkPrimary;
                      return (
                        <button
                          key={palette.id}
                          type="button"
                          className={`ds-pack-btn ${active ? 'is-active' : ''}`}
                          onClick={() =>
                            onApplyColorPalette(palette.colors, palette.name)
                          }
                        >
                          <div className="ds-swatch-dots" aria-hidden="true">
                            <span
                              className="ds-swatch-dot"
                              style={{ backgroundColor: palette.colors.pageBg }}
                            />
                            <span
                              className="ds-swatch-dot"
                              style={{ backgroundColor: palette.colors.accentPrimary }}
                            />
                            <span
                              className="ds-swatch-dot"
                              style={{ backgroundColor: palette.colors.accentSecondary }}
                            />
                            <span
                              className="ds-swatch-dot"
                              style={{ backgroundColor: palette.colors.inkPrimary }}
                            />
                          </div>
                          <span className="ds-pack-title">{palette.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="ds-section-divider">
                  <p className="ds-subhead">Palette Tokens</p>
                  <ColorTokenRow
                    id={`${drawerId}-c-bg`}
                    label="Lightest / Page Background"
                    value={colors.pageBg}
                    onChange={(pageBg) => onUpdateSection('colors', { pageBg })}
                  />
                  <ColorTokenRow
                    id={`${drawerId}-c-alt`}
                    label="Light / Surface Tint"
                    value={colors.surfaceAlt}
                    onChange={(surfaceAlt) =>
                      onUpdateSection('colors', { surfaceAlt })
                    }
                  />
                  <ColorTokenRow
                    id={`${drawerId}-c-acc1`}
                    label="Accent Primary"
                    value={colors.accentPrimary}
                    onChange={(accentPrimary) =>
                      onUpdateSection('colors', { accentPrimary })
                    }
                  />
                  <ColorTokenRow
                    id={`${drawerId}-c-acc2`}
                    label="Accent Secondary"
                    value={colors.accentSecondary}
                    onChange={(accentSecondary) =>
                      onUpdateSection('colors', { accentSecondary })
                    }
                  />
                  <ColorTokenRow
                    id={`${drawerId}-c-ink1`}
                    label="Darkest / Primary Ink"
                    value={colors.inkPrimary}
                    onChange={(inkPrimary) =>
                      onUpdateSection('colors', { inkPrimary })
                    }
                  />
                  <ColorTokenRow
                    id={`${drawerId}-c-ink2`}
                    label="Dark / Secondary Ink"
                    value={colors.inkSecondary}
                    onChange={(inkSecondary) =>
                      onUpdateSection('colors', { inkSecondary })
                    }
                  />
                  <ColorTokenRow
                    id={`${drawerId}-c-soft`}
                    label="Soft Border / Accent"
                    value={colors.accentSoft}
                    onChange={(accentSoft) =>
                      onUpdateSection('colors', { accentSoft })
                    }
                  />
                </div>
              </div>
            </details>

            {/* 3. ANIMATIONS (3 settings) */}
            <details
              open={openSections.animations}
              onToggle={(e) =>
                handleAccordionToggle('animations', e.currentTarget.open)
              }
            >
              <summary className="ds-accordion-summary">
                <span className="ds-acc-left">
                  <ChevronDown className="ds-acc-chevron" aria-hidden="true" />
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Animations</span>
                </span>
                <span className="ds-acc-count">3</span>
              </summary>

              <div className="ds-acc-content">
                <div className="ds-control-group">
                  <span className="ds-control-label">Site-Wide Scroll Style</span>
                  <div className="ds-segmented" role="group" aria-label="Scroll animation style">
                    {(['none', 'fade', 'slide', 'scale', 'clip'] as AnimationStyle[]).map(
                      (styleOpt) => (
                        <button
                          key={styleOpt}
                          type="button"
                          className="ds-seg-btn"
                          aria-pressed={animations.style === styleOpt}
                          onClick={() =>
                            onUpdateSection('animations', { style: styleOpt })
                          }
                        >
                          {styleOpt}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="ds-control-group">
                  <span className="ds-control-label">Animation Speed</span>
                  <div className="ds-segmented" role="group" aria-label="Animation speed">
                    {(['slow', 'medium', 'fast'] as AnimationSpeed[]).map((spd) => (
                      <button
                        key={spd}
                        type="button"
                        className="ds-seg-btn"
                        aria-pressed={animations.speed === spd}
                        onClick={() => onUpdateSection('animations', { speed: spd })}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="ds-checkbox-row">
                  <span className="ds-control-label">Ambient Emblem Motion</span>
                  <input
                    type="checkbox"
                    checked={animations.ambientMotion}
                    onChange={(e) =>
                      onUpdateSection('animations', {
                        ambientMotion: e.target.checked,
                      })
                    }
                  />
                </label>

                <button
                  type="button"
                  className="ds-action-btn"
                  onClick={onReplayAnimations}
                >
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Replay Entry Animations</span>
                </button>
              </div>
            </details>

            {/* 4. SPACING (4 settings) */}
            <details
              open={openSections.spacing}
              onToggle={(e) =>
                handleAccordionToggle('spacing', e.currentTarget.open)
              }
            >
              <summary className="ds-accordion-summary">
                <span className="ds-acc-left">
                  <ChevronDown className="ds-acc-chevron" aria-hidden="true" />
                  <Move className="w-4 h-4" aria-hidden="true" />
                  <span>Spacing</span>
                </span>
                <span className="ds-acc-count">4</span>
              </summary>

              <div className="ds-acc-content">
                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-sp-maxw`} className="ds-control-label">
                      Page Width (Max)
                    </label>
                    <span className="ds-control-value">{spacing.pageMaxWidth}px</span>
                  </div>
                  <input
                    id={`${drawerId}-sp-maxw`}
                    type="range"
                    min={960}
                    max={1440}
                    step={16}
                    className="ds-range"
                    value={spacing.pageMaxWidth}
                    onChange={(e) =>
                      onUpdateSection('spacing', {
                        pageMaxWidth: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-sp-margin`} className="ds-control-label">
                      Site Margin
                    </label>
                    <span className="ds-control-value">{spacing.siteMargin}px</span>
                  </div>
                  <input
                    id={`${drawerId}-sp-margin`}
                    type="range"
                    min={12}
                    max={64}
                    step={4}
                    className="ds-range"
                    value={spacing.siteMargin}
                    onChange={(e) =>
                      onUpdateSection('spacing', {
                        siteMargin: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-sp-py`} className="ds-control-label">
                      Section Vertical Padding
                    </label>
                    <span className="ds-control-value">
                      {spacing.sectionPaddingY}px
                    </span>
                  </div>
                  <input
                    id={`${drawerId}-sp-py`}
                    type="range"
                    min={32}
                    max={144}
                    step={8}
                    className="ds-range"
                    value={spacing.sectionPaddingY}
                    onChange={(e) =>
                      onUpdateSection('spacing', {
                        sectionPaddingY: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-sp-gap`} className="ds-control-label">
                      Grid / Element Gap
                    </label>
                    <span className="ds-control-value">{spacing.elementGap}px</span>
                  </div>
                  <input
                    id={`${drawerId}-sp-gap`}
                    type="range"
                    min={12}
                    max={48}
                    step={4}
                    className="ds-range"
                    value={spacing.elementGap}
                    onChange={(e) =>
                      onUpdateSection('spacing', {
                        elementGap: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </details>

            {/* 5. BUTTONS (5 settings) */}
            <details
              open={openSections.buttons}
              onToggle={(e) =>
                handleAccordionToggle('buttons', e.currentTarget.open)
              }
            >
              <summary className="ds-accordion-summary">
                <span className="ds-acc-left">
                  <ChevronDown className="ds-acc-chevron" aria-hidden="true" />
                  <MousePointerClick className="w-4 h-4" aria-hidden="true" />
                  <span>Buttons</span>
                </span>
                <span className="ds-acc-count">5</span>
              </summary>

              <div className="ds-acc-content">
                <div className="ds-control-group">
                  <span className="ds-control-label">Shape</span>
                  <div className="ds-segmented" role="group" aria-label="Button shape">
                    {(['square', 'rounded', 'pill'] as ButtonShape[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="ds-seg-btn"
                        aria-pressed={buttons.shape === s}
                        onClick={() => onUpdateSection('buttons', { shape: s })}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ds-control-group">
                  <span className="ds-control-label">Primary Style</span>
                  <div className="ds-segmented" role="group" aria-label="Button fill style">
                    {(['solid', 'outline'] as ButtonFillStyle[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        className="ds-seg-btn"
                        aria-pressed={buttons.fillStyle === f}
                        onClick={() => onUpdateSection('buttons', { fillStyle: f })}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-btn-bw`} className="ds-control-label">
                      Outline Stroke
                    </label>
                    <span className="ds-control-value">{buttons.borderWidth}px</span>
                  </div>
                  <input
                    id={`${drawerId}-btn-bw`}
                    type="range"
                    min={1}
                    max={4}
                    step={1}
                    className="ds-range"
                    value={buttons.borderWidth}
                    onChange={(e) =>
                      onUpdateSection('buttons', {
                        borderWidth: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <span className="ds-control-label">Padding Scale</span>
                  <div className="ds-segmented" role="group" aria-label="Button padding scale">
                    {(['compact', 'medium', 'generous'] as ButtonPaddingScale[]).map(
                      (pad) => (
                        <button
                          key={pad}
                          type="button"
                          className="ds-seg-btn"
                          aria-pressed={buttons.paddingScale === pad}
                          onClick={() =>
                            onUpdateSection('buttons', { paddingScale: pad })
                          }
                        >
                          {pad}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="ds-control-group">
                  <span className="ds-control-label">Text Casing</span>
                  <div className="ds-segmented" role="group" aria-label="Button text transform">
                    {(['uppercase', 'capitalize', 'none'] as ButtonTextTransform[]).map(
                      (tr) => (
                        <button
                          key={tr}
                          type="button"
                          className="ds-seg-btn"
                          aria-pressed={buttons.textTransform === tr}
                          onClick={() =>
                            onUpdateSection('buttons', { textTransform: tr })
                          }
                        >
                          {tr}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </details>

            {/* 6. FORMS (5 settings + Live Preview) */}
            <details
              open={openSections.forms}
              onToggle={(e) =>
                handleAccordionToggle('forms', e.currentTarget.open)
              }
            >
              <summary className="ds-accordion-summary">
                <span className="ds-acc-left">
                  <ChevronDown className="ds-acc-chevron" aria-hidden="true" />
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Forms</span>
                </span>
                <span className="ds-acc-count">5</span>
              </summary>

              <div className="ds-acc-content">
                <div>
                  <p className="ds-subhead">Form Packs</p>
                  <div className="ds-pack-grid">
                    {FORM_PACKS.map((pack) => {
                      const active =
                        forms.fieldStyle === pack.forms.fieldStyle &&
                        forms.fieldRadius === pack.forms.fieldRadius &&
                        forms.borderWidth === pack.forms.borderWidth;
                      return (
                        <button
                          key={pack.id}
                          type="button"
                          className={`ds-pack-btn ${active ? 'is-active' : ''}`}
                          onClick={() => onApplyFormPack(pack.forms, pack.name)}
                        >
                          <span className="ds-pack-title">{pack.name}</span>
                          <span className="ds-pack-sub">
                            {pack.forms.fieldStyle} · {pack.forms.fieldRadius}px
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="ds-control-group">
                  <span className="ds-control-label">Field Style</span>
                  <div className="ds-segmented" role="group" aria-label="Form field style">
                    {(['outlined', 'filled', 'underline'] as FormFieldStyle[]).map(
                      (fs) => (
                        <button
                          key={fs}
                          type="button"
                          className="ds-seg-btn"
                          aria-pressed={forms.fieldStyle === fs}
                          onClick={() =>
                            onUpdateSection('forms', { fieldStyle: fs })
                          }
                        >
                          {fs}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-fm-rad`} className="ds-control-label">
                      Field Corner Radius
                    </label>
                    <span className="ds-control-value">{forms.fieldRadius}px</span>
                  </div>
                  <input
                    id={`${drawerId}-fm-rad`}
                    type="range"
                    min={0}
                    max={24}
                    step={2}
                    className="ds-range"
                    value={forms.fieldRadius}
                    onChange={(e) =>
                      onUpdateSection('forms', {
                        fieldRadius: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-fm-bw`} className="ds-control-label">
                      Field Border Width
                    </label>
                    <span className="ds-control-value">{forms.borderWidth}px</span>
                  </div>
                  <input
                    id={`${drawerId}-fm-bw`}
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    className="ds-range"
                    value={forms.borderWidth}
                    onChange={(e) =>
                      onUpdateSection('forms', {
                        borderWidth: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-fm-gap`} className="ds-control-label">
                      Field Spacing
                    </label>
                    <span className="ds-control-value">{forms.fieldSpacing}px</span>
                  </div>
                  <input
                    id={`${drawerId}-fm-gap`}
                    type="range"
                    min={8}
                    max={28}
                    step={2}
                    className="ds-range"
                    value={forms.fieldSpacing}
                    onChange={(e) =>
                      onUpdateSection('forms', {
                        fieldSpacing: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <span className="ds-control-label">Label Casing</span>
                  <div className="ds-segmented" role="group" aria-label="Form label transform">
                    {(['uppercase', 'none'] as FormLabelTransform[]).map((lt) => (
                      <button
                        key={lt}
                        type="button"
                        className="ds-seg-btn"
                        aria-pressed={forms.labelTransform === lt}
                        onClick={() =>
                          onUpdateSection('forms', { labelTransform: lt })
                        }
                      >
                        {lt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ds-section-divider">
                  <p className="ds-subhead">Live Form Token Preview</p>
                  <div className="ds-form-preview-wrap">
                    <form
                      className="ds-form"
                      data-form-style={forms.fieldStyle}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="ds-field-group">
                        <label htmlFor={`${drawerId}-prev-name`} className="ds-field-label">
                          First Name
                        </label>
                        <input
                          id={`${drawerId}-prev-name`}
                          type="text"
                          defaultValue="Alex Mercer"
                          className="ds-field-input"
                        />
                      </div>

                      <div className="ds-field-group">
                        <label htmlFor={`${drawerId}-prev-email`} className="ds-field-label">
                          Consultation Topic
                        </label>
                        <input
                          id={`${drawerId}-prev-email`}
                          type="text"
                          defaultValue="Imposter syndrome & boundaries"
                          className="ds-field-input"
                        />
                      </div>

                      <label className="ds-form-check-label">
                        <input type="checkbox" defaultChecked />
                        <span>Send Monday–Thursday openings</span>
                      </label>

                      <button type="submit" className="ds-form-preview-btn">
                        Preview Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </details>

            {/* 7. SURFACES & CARDS (3 settings) */}
            <details
              open={openSections.surfaces}
              onToggle={(e) =>
                handleAccordionToggle('surfaces', e.currentTarget.open)
              }
            >
              <summary className="ds-accordion-summary">
                <span className="ds-acc-left">
                  <ChevronDown className="ds-acc-chevron" aria-hidden="true" />
                  <Layers className="w-4 h-4" aria-hidden="true" />
                  <span>Surfaces &amp; Cards</span>
                </span>
                <span className="ds-acc-count">3</span>
              </summary>

              <div className="ds-acc-content">
                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-sf-rad`} className="ds-control-label">
                      Card &amp; Frame Radius
                    </label>
                    <span className="ds-control-value">{surfaces.cardRadius}px</span>
                  </div>
                  <input
                    id={`${drawerId}-sf-rad`}
                    type="range"
                    min={0}
                    max={28}
                    step={2}
                    className="ds-range"
                    value={surfaces.cardRadius}
                    onChange={(e) =>
                      onUpdateSection('surfaces', {
                        cardRadius: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <div className="ds-control-head">
                    <label htmlFor={`${drawerId}-sf-bw`} className="ds-control-label">
                      Card Border Weight
                    </label>
                    <span className="ds-control-value">{surfaces.borderWidth}px</span>
                  </div>
                  <input
                    id={`${drawerId}-sf-bw`}
                    type="range"
                    min={0}
                    max={4}
                    step={1}
                    className="ds-range"
                    value={surfaces.borderWidth}
                    onChange={(e) =>
                      onUpdateSection('surfaces', {
                        borderWidth: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="ds-control-group">
                  <span className="ds-control-label">Surface Shadow / Elevation</span>
                  <div className="ds-segmented" role="group" aria-label="Surface elevation">
                    {(['none', 'subtle', 'lifted'] as SurfaceElevation[]).map((el) => (
                      <button
                        key={el}
                        type="button"
                        className="ds-seg-btn"
                        aria-pressed={surfaces.elevation === el}
                        onClick={() => onUpdateSection('surfaces', { elevation: el })}
                      >
                        {el}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Sticky Portability Footer */}
        <footer className="ds-drawer-footer">
          {statusMessage && (
            <div className="ds-status-banner" role="status" aria-live="polite">
              <div className="ds-status-inner">
                {statusMessage.tone === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : statusMessage.tone === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                <span>{statusMessage.text}</span>
              </div>
              <button
                type="button"
                className="ds-text-btn"
                onClick={onClearStatus}
                aria-label="Dismiss notification"
              >
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            id={fileInputId}
            type="file"
            accept="application/json,.json"
            className="ds-sr-only"
            onChange={handleFileChange}
          />

          <div className="ds-footer-grid">
            <button
              type="button"
              className="ds-action-btn is-primary"
              onClick={onExport}
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              className="ds-action-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Import JSON</span>
            </button>

            <button
              type="button"
              className="ds-action-btn"
              onClick={handleCopyCss}
            >
              {copiedRecently ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{copiedRecently ? 'Copied CSS' : 'Copy CSS'}</span>
            </button>

            <button
              type="button"
              className="ds-action-btn"
              onClick={onReset}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
