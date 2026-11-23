export type FontCategory = 'Display Serif' | 'Sans-Serif' | 'Condensed' | 'Monospace';

export interface FontDefinition {
  family: string;
  category: FontCategory;
  fallback: 'serif' | 'sans-serif' | 'monospace';
  googleParam: string;
  preloaded?: boolean;
}

export const FONT_CATALOG: readonly FontDefinition[] = [
  // Display / Editorial Serifs
  {
    family: 'Bodoni Moda',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..600',
    preloaded: true,
  },
  {
    family: 'Unna',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'Unna:ital,wght@0,400;0,700;1,400;1,700',
    preloaded: true,
  },
  {
    family: 'Instrument Serif',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'Instrument+Serif:ital@0;1',
    preloaded: true,
  },
  {
    family: 'Playfair Display',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'Playfair+Display:ital,wght@0,400..700;1,400..600',
  },
  {
    family: 'Fraunces',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600',
  },
  {
    family: 'Cormorant Garamond',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400',
  },
  {
    family: 'DM Serif Display',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'DM+Serif+Display:ital@0;1',
  },
  {
    family: 'Lora',
    category: 'Display Serif',
    fallback: 'serif',
    googleParam: 'Lora:ital,wght@0,400..700;1,400..600',
  },
  // Geometric & Humanist Sans-Serif
  {
    family: 'Space Grotesk',
    category: 'Sans-Serif',
    fallback: 'sans-serif',
    googleParam: 'Space+Grotesk:wght@400;500;600;700',
    preloaded: true,
  },
  {
    family: 'Inter',
    category: 'Sans-Serif',
    fallback: 'sans-serif',
    googleParam: 'Inter:wght@400;500;600;700',
    preloaded: true,
  },
  {
    family: 'Plus Jakarta Sans',
    category: 'Sans-Serif',
    fallback: 'sans-serif',
    googleParam: 'Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400',
    preloaded: true,
  },
  {
    family: 'Syne',
    category: 'Sans-Serif',
    fallback: 'sans-serif',
    googleParam: 'Syne:wght@400;500;600;700',
  },
  {
    family: 'DM Sans',
    category: 'Sans-Serif',
    fallback: 'sans-serif',
    googleParam: 'DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,400',
    preloaded: true,
  },
  {
    family: 'Source Sans 3',
    category: 'Sans-Serif',
    fallback: 'sans-serif',
    googleParam: 'Source+Sans+3:ital,wght@0,400..700;1,400',
  },
  {
    family: 'Work Sans',
    category: 'Sans-Serif',
    fallback: 'sans-serif',
    googleParam: 'Work+Sans:wght@400;500;600;700',
  },
  // Condensed
  {
    family: 'Oswald',
    category: 'Condensed',
    fallback: 'sans-serif',
    googleParam: 'Oswald:wght@300;400;500;600;700',
    preloaded: true,
  },
  {
    family: 'Barlow Condensed',
    category: 'Condensed',
    fallback: 'sans-serif',
    googleParam: 'Barlow+Condensed:wght@400;500;600;700',
  },
  // Monospace
  {
    family: 'JetBrains Mono',
    category: 'Monospace',
    fallback: 'monospace',
    googleParam: 'JetBrains+Mono:wght@400;500;600;700',
    preloaded: true,
  },
  {
    family: 'IBM Plex Mono',
    category: 'Monospace',
    fallback: 'monospace',
    googleParam: 'IBM+Plex+Mono:wght@400;500;600;700',
  },
  {
    family: 'Space Mono',
    category: 'Monospace',
    fallback: 'monospace',
    googleParam: 'Space+Mono:wght@400;700',
  },
];

const FONT_MAP = new Map<string, FontDefinition>(
  FONT_CATALOG.map((font) => [font.family, font]),
);

const injectedFonts = new Set<string>(
  FONT_CATALOG.filter((f) => f.preloaded).map((f) => f.family),
);

export function getFontCssValue(family: string): string {
  const def = FONT_MAP.get(family);
  if (!def) {
    return `'${family}', system-ui, sans-serif`;
  }
  if (def.fallback === 'serif') {
    return `'${def.family}', Georgia, serif`;
  }
  if (def.fallback === 'monospace') {
    return `'${def.family}', ui-monospace, SFMono-Regular, monospace`;
  }
  return `'${def.family}', system-ui, -apple-system, sans-serif`;
}

export function ensureFontsLoaded(families: string[]): void {
  if (typeof document === 'undefined') return;

  const toLoad: FontDefinition[] = [];
  for (const family of families) {
    if (injectedFonts.has(family)) continue;
    const def = FONT_MAP.get(family);
    if (def) {
      toLoad.push(def);
      injectedFonts.add(family);
    }
  }

  if (toLoad.length === 0) return;

  const query = toLoad.map((def) => `family=${def.googleParam}`).join('&');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
  link.dataset.dsDynamicFonts = toLoad.map((d) => d.family).join(',');
  document.head.appendChild(link);
}
