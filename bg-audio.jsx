// bg-audio.jsx — Background lo-fi audio with floating control
// - Tries autoplay on mount; browsers often block until user gesture
// - Falls back to "click to play" pulse if blocked
// - Persists muted + volume in localStorage
// - Loop, default volume 25%

function BgAudio() {
  const T = (window.VesperTheme || { accent: '#7cff9b', bg: '#0a0a0a', text: '#d4d4d4', textDim: '#6b6b6b', border: '#1f1f1f', mono: "'JetBrains Mono',ui-monospace,monospace" });
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(() => {
    try {
      const v = localStorage.getItem('bgAudio.muted');
      if (v === '1') return true;
      if (v === '0') return false;
      return true; // default: muted (polite autoplay)
    } catch (_) { return true; }
  });
  const [volume, setVolume] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem('bgAudio.volume'));
      return isFinite(v) ? v : 0.25;
    } catch (_) { return 0.25; }
  });
  const [needsGesture, setNeedsGesture] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const audioRef = React.useRef(null);

  // Init + autoplay attempt
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = muted ? 0 : volume;
    a.loop = true;
    if (muted) return; // respect user's prior mute
    const p = a.play();
    if (p && typeof p.then === 'function') {
      p.then(() => { setPlaying(true); setNeedsGesture(false); })
       .catch(() => { setNeedsGesture(true); setPlaying(false); });
    }
  }, []); // eslint-disable-line

  // On first user interaction anywhere, try to start playback if it failed to autoplay
  React.useEffect(() => {
    if (!needsGesture) return;
    const tryPlay = () => {
      const a = audioRef.current;
      if (!a) return;
      if (muted) return;
      a.play().then(() => {
        setPlaying(true);
        setNeedsGesture(false);
      }).catch(() => {});
    };
    const opts = { once: true, passive: true };
    window.addEventListener('pointerdown', tryPlay, opts);
    window.addEventListener('keydown', tryPlay, opts);
    return () => {
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };
  }, [needsGesture, muted]);

  // Sync volume / muted → audio element
  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = muted ? 0 : volume;
    try { localStorage.setItem('bgAudio.muted', muted ? '1' : '0'); } catch (_) {}
    try { localStorage.setItem('bgAudio.volume', String(volume)); } catch (_) {}
  }, [muted, volume]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      setMuted(true);
    } else {
      a.play().then(() => {
        setPlaying(true);
        setMuted(false);
        setNeedsGesture(false);
      }).catch(() => {});
    }
  };

  const iconPlay = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 4v16l13-8z" />
    </svg>
  );
  const iconPause = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  );
  const iconWave = (on) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      {on ? (
        <>
          <rect x="4" y="10" width="2" height="4" />
          <rect x="8" y="7" width="2" height="10">
            <animate attributeName="height" values="10;4;10" dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="y" values="7;10;7" dur="0.9s" repeatCount="indefinite" />
          </rect>
          <rect x="12" y="4" width="2" height="16">
            <animate attributeName="height" values="16;8;16" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="y" values="4;8;4" dur="1.1s" repeatCount="indefinite" />
          </rect>
          <rect x="16" y="7" width="2" height="10">
            <animate attributeName="height" values="10;3;10" dur="1.0s" repeatCount="indefinite" />
            <animate attributeName="y" values="7;10.5;7" dur="1.0s" repeatCount="indefinite" />
          </rect>
          <rect x="20" y="10" width="2" height="4" />
        </>
      ) : (
        <>
          <rect x="4" y="10" width="2" height="4" />
          <rect x="8" y="9" width="2" height="6" />
          <rect x="12" y="8" width="2" height="8" />
          <rect x="16" y="9" width="2" height="6" />
          <rect x="20" y="10" width="2" height="4" />
          <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" strokeWidth="1.6" />
        </>
      )}
    </svg>
  );

  const c = T.accent || '#7cff9b';
  const active = playing && !muted;

  return (
    <>
      <audio ref={audioRef} src="assets/bg-music.mp3" preload="auto" loop />

      {/* Floating pill */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px',
          background: 'rgba(10,10,10,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${active ? c + '88' : 'rgba(255,255,255,0.25)'}`,
          borderRadius: 999,
          fontFamily: T.mono,
          fontSize: 11,
          color: T.text,
          boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
          transition: 'border-color 200ms, width 200ms',
          userSelect: 'none',
        }}
      >
        <button
          onClick={togglePlay}
          aria-label={active ? 'Pause background music' : 'Play background music'}
          title={needsGesture ? 'Click to enable audio' : (active ? 'Pause' : 'Play')}
          style={{
            width: 28, height: 28, borderRadius: '50%',
            background: active ? c : 'transparent',
            border: `1px solid ${active ? c : 'rgba(255,255,255,0.25)'}`,
            color: active ? '#0a0a0a' : c,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', padding: 0,
            animation: needsGesture ? 'bg-audio-pulse 1.4s ease-in-out infinite' : 'none',
          }}
        >
          {active ? iconPause : iconPlay}
        </button>

        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: active ? c : T.textDim }}>
          {iconWave(active)}
          <span style={{ letterSpacing: 0.8, textTransform: 'uppercase', fontSize: 10 }}>
            {needsGesture ? 'click to play' : (active ? 'lo-fi · playing' : 'muted')}
          </span>
        </span>

        {/* Expanded controls on hover */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          maxWidth: expanded ? 180 : 0,
          overflow: 'hidden',
          transition: 'max-width 220ms ease',
        }}>
          <button
            onClick={() => setMuted(m => !m)}
            aria-label={muted ? 'Unmute' : 'Mute'}
            title={muted ? 'Unmute' : 'Mute'}
            style={{
              background: 'transparent', border: 'none',
              color: muted ? T.textDim : c,
              cursor: 'pointer', padding: 4, display: 'inline-flex',
            }}
          >
            {iconWave(!muted)}
          </button>
          <input
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={e => {
              const v = parseFloat(e.target.value);
              setVolume(v);
              if (v > 0 && muted) setMuted(false);
            }}
            aria-label="Background music volume"
            style={{
              width: 90, accentColor: c,
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bg-audio-pulse {
          0%, 100% { box-shadow: 0 0 0 0 ${c}66; }
          50%      { box-shadow: 0 0 0 8px ${c}00; }
        }
      `}</style>
    </>
  );
}

window.BgAudio = BgAudio;
