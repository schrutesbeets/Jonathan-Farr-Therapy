import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hasCustomSettings } from '../design-system/storage';
import { SETTINGS_COUNT } from '../design-system/schema';

export function SwitcherHub() {
  const [v1Custom, setV1Custom] = useState(false);
  const [v2Custom, setV2Custom] = useState(false);

  useEffect(() => {
    setV1Custom(hasCustomSettings('v1'));
    setV2Custom(hasCustomSettings('v2'));
  }, []);

  return (
    <div className="switcher-shell">
      <header>
        <div className="switcher-container">
          <p className="switcher-overline">Preview Environment · Consolidated Variations</p>
          <h1>Design Variations</h1>
          <p className="switcher-subtitle">
            Select a design variation below to explore its layout and live-customize its{' '}
            {SETTINGS_COUNT} Squarespace-style design system tokens via the bottom-right settings
            button.
          </p>
        </div>
      </header>

      <main>
        <div className="switcher-container switcher-grid">
          <article className="switcher-card">
            <div>
              <div className="switcher-chip-row">
                <span className="switcher-chip">Variation 01 · Braun Minimal</span>
                <span className={`switcher-chip ${v1Custom ? 'is-custom' : ''}`}>
                  {v1Custom ? 'Customized' : 'Default Theme'}
                </span>
              </div>
              <h2>Editorial &amp; Minimal Grid</h2>
              <p className="switcher-card-desc">
                High-restraint monochrome layout with structured cards, clear
                hierarchy, and a four-page core flow.
              </p>
            </div>
            <div className="switcher-card-footer">
              <Link className="switcher-button" to="/v1">
                <span>Launch Variation 01</span>
                <span aria-hidden="true">→</span>
              </Link>
              <span className="switcher-path-meta">Route: /v1 · Independent Design System</span>
            </div>
          </article>

          <article className="switcher-card">
            <div>
              <div className="switcher-chip-row">
                <span className="switcher-chip">Variation 02 · Meriden Bold</span>
                <span className={`switcher-chip ${v2Custom ? 'is-custom' : ''}`}>
                  {v2Custom ? 'Customized' : 'Default Theme'}
                </span>
              </div>
              <h2>Bold &amp; Dynamic Editorial</h2>
              <p className="switcher-card-desc">
                Expressive full-bleed color blocking, geometric emblems,
                interactive showcase sections, and expanded long-form views.
              </p>
            </div>
            <div className="switcher-card-footer">
              <Link className="switcher-button" to="/v2">
                <span>Launch Variation 02</span>
                <span aria-hidden="true">→</span>
              </Link>
              <span className="switcher-path-meta">Route: /v2 · Independent Design System</span>
            </div>
          </article>
        </div>
      </main>

      <footer>
        <div className="switcher-container">
          Jonathan Farr Therapy · Consolidated Design System Hub · JSON Import &amp; Export Enabled
        </div>
      </footer>
    </div>
  );
}
