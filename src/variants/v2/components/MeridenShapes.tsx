import { assetUrl } from '../../../lib/assetUrl';

interface ShapeProps {
  color?: string;
  className?: string;
}

/**
 * 14-point sharp vermilion sunburst modeled on Meriden Coaching's Star+1 emblem.
 */
export function StarburstShape({
  color = 'var(--meriden-vermilion)',
  className = 'w-24 h-24',
}: ShapeProps) {
  const points = 14;
  const outer = 96;
  const inner = 40;
  const coords: string[] = [];

  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = (100 + r * Math.cos(angle)).toFixed(2);
    const y = (100 + r * Math.sin(angle)).toFixed(2);
    coords.push(`${x},${y}`);
  }

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points={coords.join(' ')} fill={color} />
    </svg>
  );
}

/**
 * Smooth 7-lobe organic scalloped badge modeled on Meriden Coaching's Star@2x & Star+2 emblems.
 */
export function ScallopBadgeShape({
  color = 'var(--meriden-marigold)',
  className = 'w-24 h-24',
}: ShapeProps) {
  const lobes = 7;
  const baseRadius = 82;
  const waveAmp = 12;
  const steps = 140;
  const pathParts: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2 - Math.PI / 2;
    const r = baseRadius + waveAmp * Math.cos(lobes * (theta + Math.PI / 2));
    const x = (100 + r * Math.cos(theta)).toFixed(2);
    const y = (100 + r * Math.sin(theta)).toFixed(2);
    pathParts.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  pathParts.push('Z');

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={pathParts.join(' ')} fill={color} />
    </svg>
  );
}

/**
 * Bold thick geometric ring modeled on Meriden Coaching's Subtract emblem.
 */
export function GeometricRingShape({
  color = 'var(--meriden-sky)',
  className = 'w-24 h-24',
}: ShapeProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke={color}
        strokeWidth="34"
      />
    </svg>
  );
}

/**
 * Full-bleed 5-column alternating graphic poster tile & authentic JFT photo strip
 * modeled directly after Section 5 of Meriden Coaching.
 */
export function MeridenMosaicStrip() {
  return (
    <section
      aria-label="Visual Practice Highlights"
      className="w-full overflow-x-clip bg-[var(--meriden-cream)]"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <div
          className="aspect-square flex items-center justify-center p-8"
          style={{ backgroundColor: 'var(--meriden-marigold)' }}
        >
          <StarburstShape
            color="var(--meriden-vermilion)"
            className="w-3/4 h-3/4"
          />
        </div>

        <div className="aspect-square overflow-hidden">
          <img
            src={assetUrl('media/red-seat-fenway.jpg')}
            alt="One bright red stadium seat standing out among rows of green seats"
            width={1600}
            height={1063}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div
          className="aspect-square flex items-center justify-center p-8"
          style={{ backgroundColor: 'var(--meriden-vermilion)' }}
        >
          <GeometricRingShape
            color="var(--meriden-sky)"
            className="w-3/4 h-3/4"
          />
        </div>

        <div className="aspect-square overflow-hidden">
          <img
            src={assetUrl('media/discovery-flight.jpg')}
            alt="Jonathan Farr wearing aviation headset and sunglasses inside cockpit during a discovery flight"
            width={1600}
            height={1200}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div
          className="aspect-square hidden sm:flex items-center justify-center p-8 sm:col-span-2 lg:col-span-1"
          style={{ backgroundColor: 'var(--meriden-butter)' }}
        >
          <ScallopBadgeShape
            color="var(--meriden-marigold)"
            className="w-3/4 h-3/4"
          />
        </div>
      </div>
    </section>
  );
}
