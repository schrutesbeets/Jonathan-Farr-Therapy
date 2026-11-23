import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

interface AmbientLoopVideoProps {
  src: string;
  poster: string;
  className?: string;
  ariaLabel?: string;
  paused?: boolean;
  showControls?: boolean;
}

export function AmbientLoopVideo({
  src,
  poster,
  className = '',
  ariaLabel,
  paused = false,
  showControls = false,
}: AmbientLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );
  const [ambientAllowed, setAmbientAllowed] = useState(true);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReduced(mq.matches);
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const host = video.closest<HTMLElement>('[data-ds-ambient]');
    if (!host) return;

    const syncAmbient = () => {
      const nextAllowed = host.getAttribute('data-ds-ambient') !== 'off';
      setAmbientAllowed(nextAllowed);
      setUserPaused(null);
    };
    syncAmbient();

    const observer = new MutationObserver(syncAmbient);
    observer.observe(host, {
      attributes: true,
      attributeFilter: ['data-ds-ambient'],
    });
    return () => observer.disconnect();
  }, []);

  const effectivePaused =
    userPaused !== null
      ? userPaused
      : paused || prefersReduced || !ambientAllowed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultMuted = true;
    video.muted = true;
    if (effectivePaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [effectivePaused]);

  const videoEl = (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={!effectivePaused}
      loop
      muted
      playsInline
      onCanPlay={() => {
        const video = videoRef.current;
        if (!video || effectivePaused) return;
        video.defaultMuted = true;
        video.muted = true;
        video.play().catch(() => {});
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={className}
    />
  );

  if (!showControls) {
    return videoEl;
  }

  return (
    <div className="relative">
      {videoEl}
      <button
        type="button"
        onClick={() => setUserPaused(!effectivePaused)}
        className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-neutral-900/85 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-neutral-900 cursor-pointer"
      >
        {effectivePaused ? (
          <>
            <Play className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Play vinyl</span>
          </>
        ) : (
          <>
            <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Pause vinyl</span>
          </>
        )}
      </button>
    </div>
  );
}
