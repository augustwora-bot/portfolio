// worawalan-site.jsx — Full single-page prototype
// Hero v3 + Now + Work cards + Stack tags + Writing
// Depends on: VesperTheme (inline in worawalan.html), LangProvider/useLang (i18n.jsx), StackLogo (work-stack.jsx)

const useT = () => window.VesperTheme;

// ─────────────────────────────────────────────────────────────
// Theme (dark/light) context
// ─────────────────────────────────────────────────────────────
const ThemeContext = React.createContext({ mode: 'dark', setMode: () => {} });

function themeFor(mode) {
  const base = window.VesperTheme;
  if (mode === 'light') {
    return {
      ...base,
      bg: '#fafaf9',
      bgElev: '#ffffff',
      bgElev2: '#f4f4f2',
      border: '#e5e5e2',
      borderStrong: '#d4d4d0',
      text: '#2a2a2a',
      textBright: '#0a0a0a',
      textDim: '#888',
      accent: '#1f8f3d',       // deeper green on light bg for contrast
      accentDim: '#1f8f3d',
    };
  }
  return base;
}

function useTheme() {
  const { mode } = React.useContext(ThemeContext);
  return React.useMemo(() => themeFor(mode), [mode]);
}

// ─────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────
function Nav() {
  const T = useTheme();
  const { lang, setLang, t } = useLang();
  const { mode, setMode } = React.useContext(ThemeContext);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 10,
      background: T.bg + 'ee', backdropFilter: 'blur(8px)',
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{
        maxWidth: 1120, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 32px',
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 8px ${T.accent}` }} />
          <span style={{ fontFamily: T.mono, fontSize: 13, color: T.textBright, letterSpacing: -0.2 }}>worawalan</span>
          <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginLeft: 6 }}>· snowinaugust.dev</span>
        </a>
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center', fontFamily: T.mono, fontSize: 12 }}>
          <a href="#work" style={{ color: T.textDim, textDecoration: 'none' }}>{t.nav.work}</a>
          <a href="#stack" style={{ color: T.textDim, textDecoration: 'none' }}>{t.nav.stack}</a>
          <a href="#certs" style={{ color: T.textDim, textDecoration: 'none' }}>{t.nav.certs}</a>
          {/* lang toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
            aria-label="Toggle language"
            style={{
              background: 'transparent', border: `1px solid ${T.border}`,
              color: T.text, fontFamily: T.mono, fontSize: 11, cursor: 'pointer',
              padding: '4px 8px', letterSpacing: 1,
            }}
          >
            <span style={{ color: lang === 'en' ? T.accent : T.textDim }}>EN</span>
            <span style={{ color: T.textDim, margin: '0 4px' }}>/</span>
            <span style={{ color: lang === 'th' ? T.accent : T.textDim }}>TH</span>
          </button>
          {/* theme toggle */}
          <button
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            style={{
              background: 'transparent', border: 'none', color: T.text,
              cursor: 'pointer', padding: 4, display: 'inline-flex',
            }}
          >
            {mode === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 15a7 7 0 01-8.5-9.5A8 8 0 1020 15z"/></svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero v3 — animated terminal, with portrait placeholder
// ─────────────────────────────────────────────────────────────
function Hero() {
  const Tapp = useTheme();
  const { t, lang } = useLang();
  const lines = React.useMemo(() => ([
    { prompt: '$', cmd: 'whoami', out: 'worawalan' },
    { prompt: '$', cmd: 'cat ./pitch.txt', out: t.hero.terminal.pitch },
    { prompt: '$', cmd: 'ls ./current-work', out: ['ai-bot/      personal-second-brain/      gitops-portfolio/'] },
    { prompt: '$', cmd: 'uptime', out: ['running this stack since 2026 · live · maintained'], final: true },
  ]), [lang, t]);

  const [step, setStep] = React.useState(0);
  const [typed, setTyped] = React.useState('');
  React.useEffect(() => { setStep(0); setTyped(''); }, [lang]);
  React.useEffect(() => {
    if (step >= lines.length) return;
    const line = lines[step];
    if (typed.length < line.cmd.length) {
      const id = setTimeout(() => setTyped(line.cmd.slice(0, typed.length + 1)), 38 + Math.random() * 40);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => { setStep(s => s + 1); setTyped(''); }, line.final ? 99999 : 650);
    return () => clearTimeout(id);
  }, [step, typed, lines]);

  // Hero always uses DARK theme overlay (bg image is dark sunset)
  const TH = {
    ...Tapp,
    textBright: '#f5f5f5',
    text: '#d4d4d4',
    textDim: '#8a8a8a',
  };

  return (
    <section id="top" className="hero-bg" style={{
      position: 'relative',
      padding: '88px 32px 120px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 56, alignItems: 'center' }} className="hero-grid">
        <div>
          {/* Portrait slot — circle */}
          <div style={{
            width: 200, height: 200, marginBottom: 28,
            border: `2px solid ${TH.accent}`,
            position: 'relative', overflow: 'hidden',
            borderRadius: '50%',
            boxShadow: `0 0 0 4px #0a0a0a, 0 8px 28px rgba(0,0,0,0.55)`,
          }}>
            <img
              src="assets/portrait.jpg"
              alt="Worawalan"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center 22%',
                display: 'block',
              }}
            />
          </div>
          <h1 style={{
            fontSize: 'clamp(48px, 9vw, 90px)', fontWeight: 600,
            letterSpacing: '-0.05em', lineHeight: 0.9,
            color: TH.textBright, margin: 0,
          }}>Worawalan</h1>
          <div style={{ fontFamily: TH.mono, fontSize: 13, color: TH.accent, marginTop: 20, letterSpacing: 0.3 }}>
            {t.hero.tag}
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: TH.text, marginTop: 24, maxWidth: 440, letterSpacing: '-0.01em' }}>
            {t.hero.pitch}
          </p>

        </div>

        {/* Terminal */}
        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: `1px solid rgba(255,255,255,0.12)`,
          borderRadius: 12,
          fontFamily: TH.mono, fontSize: 13, overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
        }}>
          <div style={{
            background: 'rgba(0,0,0,0.35)', padding: '10px 14px',
            borderBottom: `1px solid rgba(255,255,255,0.08)`,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: TH.red }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: TH.amber }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: TH.green }} />
            <span style={{ fontSize: 11, color: TH.textDim, marginLeft: 14 }}>worawalan@snowinaugust: ~</span>
          </div>
          <div style={{ padding: 22, lineHeight: 1.7, minHeight: 340 }}>
            {lines.slice(0, step).map((l, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div>
                  <span style={{ color: TH.accent }}>{l.prompt}</span>{' '}
                  <span style={{ color: TH.textBright }}>{l.cmd}</span>
                </div>
                {l.out && (Array.isArray(l.out) ? l.out : [l.out]).map((o, j) => (
                  <div key={j} style={{ color: TH.textDim, paddingLeft: 2 }}>{o}</div>
                ))}
              </div>
            ))}
            {step < lines.length && (
              <div>
                <div>
                  <span style={{ color: TH.accent }}>{lines[step].prompt}</span>{' '}
                  <span style={{ color: TH.textBright }}>{typed}</span>
                  {typed.length < lines[step].cmd.length && <span style={{
                    display: 'inline-block', width: 8, height: 15,
                    background: TH.accent, verticalAlign: 'middle', marginLeft: 2,
                    animation: 'v-blink 1s steps(2) infinite',
                  }} />}
                </div>
                {typed === lines[step].cmd && lines[step].out && (Array.isArray(lines[step].out) ? lines[step].out : [lines[step].out]).map((o, j) => (
                  <div key={j} style={{ color: TH.textDim, paddingLeft: 2 }}>{o}</div>
                ))}
                {typed === lines[step].cmd && <span style={{
                  display: 'inline-block', width: 8, height: 15,
                  background: TH.accent, verticalAlign: 'middle', marginLeft: 2,
                  animation: 'v-blink 1s steps(2) infinite',
                }} />}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable section header
// ─────────────────────────────────────────────────────────────
function SHeader({ kicker, title, sub }) {
  const T = useTheme();
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
        {kicker}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, color: T.textBright, margin: 0 }}>
          {title}
        </h2>
        {sub && <div style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim, maxWidth: 420, lineHeight: 1.6 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Ticker — animated status bar between Hero and Now
// ─────────────────────────────────────────────────────────────
function Ticker() {
  const T = useTheme();
  const items = [
    { dot: T.accent, text: 'k3s · online' },
    { text: 'docker pull · ghcr.io/snowinaugust/vesper' },
    { text: 'argocd · auto-sync enabled' },
    { dot: '#c792ea', text: 'mcp-server v2.2.20' },
    { text: 'vault · 47 notes indexed' },
    { text: '6 specialists active' },
    { dot: T.accent, text: 'uptime 99.9%' },
    { text: 'last deploy · 2h ago' },
    { text: 'cron · running' },
    { dot: '#ffbd2e', text: 'building in public' },
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div style={{
      borderTop: `1px solid ${T.border}`,
      borderBottom: `1px solid ${T.border}`,
      background: T.bg,
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track { animation: ticker-scroll 60s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
      <div className="ticker-track" style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}>
        {loop.map((it, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 28px',
            fontFamily: T.mono, fontSize: 12, color: T.text,
            borderRight: `1px solid ${T.border}`,
            flexShrink: 0,
          }}>
            {it.dot && <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: it.dot,
              boxShadow: `0 0 8px ${it.dot}88`,
              flexShrink: 0,
            }} />}
            <span>{it.text}</span>
          </div>
        ))}
      </div>
      {/* edge fades */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 80,
        background: `linear-gradient(90deg, ${T.bg}, transparent)`,
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 80,
        background: `linear-gradient(270deg, ${T.bg}, transparent)`,
        pointerEvents: 'none', zIndex: 2,
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Now / About
// ─────────────────────────────────────────────────────────────
function Now() {
  const T = useTheme();
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="now" style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 32px', borderTop: `1px solid ${T.border}` }}>
      <SHeader kicker={a.kicker} title={a.title} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, maxWidth: 1040, margin: '0 auto' }}>
        {/* Operate block */}
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.accent, marginBottom: 12, letterSpacing: 0.5 }}>
            {a.operate.label}
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {a.operate.lines.map((line, i) => (
              <li key={i} style={{ fontSize: 15, lineHeight: 1.55, color: T.text, paddingLeft: 14, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: T.textDim }}>·</span>
                {line}
              </li>
            ))}
          </ul>
          {a.operate.stack && <div style={{ fontSize: 15, lineHeight: 1.55, color: T.text, marginTop: 16 }}>
            Stack: {a.operate.stack}
          </div>}
        </div>
        {/* Build block */}
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.accent, marginBottom: 12, letterSpacing: 0.5 }}>
            {a.build.label}
            {a.build.sublabel && <span style={{ color: T.accent, marginLeft: 10 }}>· {a.build.sublabel}</span>}
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {a.build.lines.map((line, i) => (
              <li key={i} style={{ fontSize: 15, lineHeight: 1.55, color: T.text, paddingLeft: 14, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: T.textDim }}>·</span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Work (cards v2 — adapted to live page)
// ─────────────────────────────────────────────────────────────
const PROJECT_KEYS = ['p1', 'p2', 'p3'];
const PROJECT_META = {
  p1: { num: '01', tags: ['github-actions', 'argocd', 'k3s'], metric: 'zero downtime', statusKey: 'statusLive', href: 'work/gitops.html', accent: '#2da44e', preview: 'work/assets/gitops-flow.png' },
  p2: { num: '02', tags: ['mcp', 'vector-db', 'python'], metric: '27 tools', statusKey: 'statusLive', href: 'work/personal-second-brain.html', accent: '#c792ea' },
  p3: { num: '03', tags: ['claude-code', 'fastmcp', 'notion-api'], metric: '22 particles', statusKey: 'statusLive', href: 'work/casey.html', accent: '#7cff9b' },
};

function ProjectCover({ num, accent, preview, T: passedT }) {
  const T = passedT || useTheme();
  const M = T.mono;
  const ACC = accent || T.accent;
  
  // If preview image is provided, use it
  if (preview) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#0a1525' }}>
        <img
          src={preview}
          alt="Project preview"
          loading="eager"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '105%', height: '105%',
            objectFit: 'contain', objectPosition: 'center',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    );
  }
  
  // 01 — GitOps CI/CD Pipeline (fallback)
  if (num === '01') {
    const colors = {
      github: '#2da44e',
      sonar: '#549dd0',
      snyk: '#4c4a73',
      docker: '#2496ed',
      argocd: '#ef7b4d',
      k3s: '#ffc61c',
    };
    return (
      <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="200" fill={T.bgElev2} />
        <text x="200" y="18" fontFamily={M} fontSize="9" fill={ACC} textAnchor="middle" letterSpacing="1.5">● GITOPS CI/CD</text>
        
        {/* Step 1: Local dev + Git push */}
        <g transform="translate(20, 35)">
          <rect width="80" height="22" fill={T.bg} stroke={colors.github} strokeWidth="1" />
          <text x="40" y="14" fontFamily={M} fontSize="7.5" fill={T.textBright} textAnchor="middle">git push</text>
        </g>
        
        {/* Step 2: GitHub Actions */}
        <g transform="translate(20, 70)">
          <rect width="80" height="60" fill={T.bg} stroke={colors.github} strokeWidth="1" />
          <text x="40" y="12" fontFamily={M} fontSize="8" fill={colors.github} textAnchor="middle">Actions</text>
          <text x="8" y="26" fontFamily={M} fontSize="6" fill={T.textDim}>• Sonar scan</text>
          <text x="8" y="36" fontFamily={M} fontSize="6" fill={T.textDim}>• Snyk CVE</text>
          <text x="8" y="46" fontFamily={M} fontSize="6" fill={T.textDim}>• Docker build</text>
          <text x="8" y="56" fontFamily={M} fontSize="6" fill={T.textDim}>• Push GHCR</text>
        </g>
        
        {/* Step 3: GHCR */}
        <g transform="translate(120, 85)">
          <rect width="70" height="30" fill={T.bg} stroke={colors.docker} strokeWidth="1" />
          <text x="35" y="12" fontFamily={M} fontSize="7.5" fill={colors.docker} textAnchor="middle">GHCR</text>
          <text x="35" y="22" fontFamily={M} fontSize="6" fill={T.textDim} textAnchor="middle">sha-commit</text>
        </g>
        
        {/* Step 4: ArgoCD */}
        <g transform="translate(210, 70)">
          <rect width="80" height="60" fill={T.bg} stroke={colors.argocd} strokeWidth="1" />
          <text x="40" y="12" fontFamily={M} fontSize="8" fill={colors.argocd} textAnchor="middle">ArgoCD</text>
          <text x="8" y="26" fontFamily={M} fontSize="6" fill={T.textDim}>• Poll 3min</text>
          <text x="8" y="36" fontFamily={M} fontSize="6" fill={T.textDim}>• Pull manifest</text>
          <text x="8" y="46" fontFamily={M} fontSize="6" fill={T.textDim}>• kubectl apply</text>
        </g>
        
        {/* Step 5: k3s cluster */}
        <g transform="translate(310, 85)">
          <rect width="70" height="30" fill={T.bg} stroke={colors.k3s} strokeWidth="1" />
          <text x="35" y="12" fontFamily={M} fontSize="7.5" fill={colors.k3s} textAnchor="middle">k3s</text>
          <text x="35" y="22" fontFamily={M} fontSize="6" fill={T.textDim} textAnchor="middle">zero down</text>
        </g>
        
        {/* Arrows */}
        <path d="M 60 57 L 60 70" stroke={ACC} strokeWidth="1" markerEnd="url(#arr01)" />
        <path d="M 100 100 L 120 100" stroke={ACC} strokeWidth="1" markerEnd="url(#arr01)" />
        <path d="M 190 100 L 210 100" stroke={ACC} strokeWidth="1" markerEnd="url(#arr01)" />
        <path d="M 290 100 L 310 100" stroke={ACC} strokeWidth="1" markerEnd="url(#arr01)" />
        
        {/* Bottom status */}
        <g transform="translate(20, 165)">
          <rect width="360" height="20" fill={T.bg} />
          <text x="8" y="13" fontFamily={M} fontSize="7" fill={T.textDim}>deploying snowinaugust.dev · soon</text>
          <circle cx="348" cy="10" r="3" fill={ACC}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
        
        <defs>
          <marker id="arr01" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={ACC} />
          </marker>
        </defs>
      </svg>
    );
  }
  // 02 — Obsidian Vault + MCP: node graph
  if (num === '02') {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}>
        <img
          src="assets/vault-graph-img.png"
          alt="Vault graph"
          loading="eager"
          fetchpriority="high"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            width: '110%', height: '110%',
            objectFit: 'cover', objectPosition: 'center',
            transform: 'translate(-50%, -50%)',
            animation: 'vg-drift 12s ease-in-out infinite',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 40% 40% at 48% 42%, rgba(0,200,255,0.08) 0%, transparent 70%)',
          animation: 'vg-glow 4s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 10, left: 12, fontFamily: M, fontSize: 10, color: T.textBright, letterSpacing: 1, background: T.bg + 'cc', padding: '2px 6px' }}>/1_graph</div>
        <div style={{ position: 'absolute', top: 26, left: 12, fontFamily: M, fontSize: 8, color: T.textDim, background: T.bg + 'cc', padding: '2px 6px' }}>47 notes · 27 mcp tools</div>
      </div>
    );
  }
  // 03 — Casey: 4-layer architecture image
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <img
        src="work/assets/casey-arch.png"
        alt="Casey 4 storage layers"
        loading="eager"
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function ProjectDiagram({ num }) {
  const T = useTheme();
  if (num === '01') return (
    <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, lineHeight: 1.55 }}>
      <div>cron(1) ─┐</div>
      <div>         ├─▶ anthropic ─▶ <span style={{ color: T.accent }}>#ai-news</span></div>
      <div>rss ─────┘</div>
    </div>
  );
  if (num === '02') return (
    <svg width="160" height="56" viewBox="0 0 160 56">
      <rect x="0.5" y="0.5" width="40" height="55" fill="none" stroke={T.border} />
      <text x="20" y="22" fontFamily={T.mono} fontSize="9" fill={T.textDim} textAnchor="middle">vault</text>
      <text x="20" y="36" fontFamily={T.mono} fontSize="9" fill={T.text} textAnchor="middle">.md</text>
      <path d="M41 28 L56 28" stroke={T.textDim} strokeDasharray="2 3" />
      <rect x="56.5" y="0.5" width="46" height="55" fill="none" stroke={T.border} />
      <text x="79" y="24" fontFamily={T.mono} fontSize="9" fill={T.textDim} textAnchor="middle">embed</text>
      <text x="79" y="36" fontFamily={T.mono} fontSize="9" fill={T.text} textAnchor="middle">cosine</text>
      <path d="M103 28 L118 28" stroke={T.accent} />
      <rect x="118.5" y="0.5" width="40" height="55" fill="none" stroke={T.accent} />
      <text x="138" y="24" fontFamily={T.mono} fontSize="9" fill={T.accent} textAnchor="middle">mcp</text>
      <text x="138" y="36" fontFamily={T.mono} fontSize="9" fill={T.accent} textAnchor="middle">27</text>
    </svg>
  );
  return (
    <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, lineHeight: 1.55 }}>
      <div>git push ─▶ ghcr ─▶ k3s</div>
      <div style={{ marginLeft: 65 }}>│</div>
      <div style={{ marginLeft: 54 }}>argocd ◀─ ┘</div>
    </div>
  );
}

function Work() {
  const T = useTheme();
  const { t } = useLang();
  return (
    <section id="work" style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 32px', borderTop: `1px solid ${T.border}` }}>
      <SHeader kicker={t.work.kicker} title={t.work.title} sub={t.work.sub} />
      <div className="work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {PROJECT_KEYS.map(k => {
          const meta = PROJECT_META[k];
          const copy = t.work.projects[k];
          const statusLabel = t.work[meta.statusKey];
          return (
            <article key={k} className="work-card" onClick={() => { if (meta.href) location.href = meta.href; }} style={{
              background: T.bgElev, border: `1px solid ${T.border}`,
              display: 'flex', flexDirection: 'column',
              minHeight: 360, overflow: 'hidden',
              cursor: meta.href ? 'pointer' : 'default',
              transition: 'transform 200ms ease, border-color 200ms, background 200ms, box-shadow 200ms',
              position: 'relative',
            }}>
              {/* Project image slot */}
              <div style={{
                height: 200, background: T.bgElev2,
                borderBottom: `1px solid ${T.border}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <ProjectCover num={meta.num} accent={meta.accent} preview={meta.preview} T={T} />
                <div style={{ position: 'absolute', top: 10, left: 12, fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1, textTransform: 'uppercase', background: T.bg + 'cc', padding: '2px 6px' }}>{meta.num}</div>
                <div style={{ position: 'absolute', bottom: 10, right: 12, fontFamily: T.mono, fontSize: 10, color: T.textDim, background: T.bg + 'cc', padding: '2px 6px' }}>cover.png</div>
              </div>
              <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>{meta.num}</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1, textTransform: 'uppercase' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: meta.accent || T.accent, boxShadow: `0 0 6px ${meta.accent || T.accent}` }} />
                  {meta.version || statusLabel}
                </div>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 500, color: T.textBright, letterSpacing: '-0.01em', margin: '0 0 6px' }}>
                {copy.title}
              </h3>
              {copy.subtitle && (
                <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textBright, letterSpacing: 0.4, textTransform: 'uppercase', margin: '0 0 4px' }}>
                  {copy.subtitle}
                </div>
              )}
              {copy.subtitle2 && (
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 0.4, textTransform: 'uppercase', margin: '0 0 14px' }}>
                  {copy.subtitle2}
                </div>
              )}
              <p style={{ fontSize: 13, color: T.text, lineHeight: 1.55, flex: 1, margin: 0 }}>
                {copy.desc}
              </p>
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 0.3 }}>
                  {meta.tags.map((tag, i) => (
                    <span key={tag}>{i > 0 && <span style={{ color: T.textDim, margin: '0 6px' }}>·</span>}{tag}</span>
                  ))}
                </div>
              </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Stack (tag rows v2)
// ─────────────────────────────────────────────────────────────
const STACK_DATA = [
  { key: 'languages', items: ['Python', 'Bash', 'Linux Command', 'HTML', 'CSS', 'Thai', 'English'] },
  { key: 'infra',     items: ['Docker', 'Kubernetes', 'k3s', 'ArgoCD', 'SSH', 'Apache', 'MySQL', 'SQL'] },
  { key: 'ai',        items: ['Claude AI', 'Anthropic API', 'Gemini', 'ChatGPT', 'NotebookLM'] },
  { key: 'tools',     items: ['Obsidian + MCP', 'Custom MCP Server', 'GitHub', 'MobaXterm', 'Antigravity'] },
];

function Stack() {
  const T = useTheme();
  const { t } = useLang();
  return (
    <section id="stack" style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 32px', borderTop: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
      {/* Claude pixel art + headphones — removed from stack */}
      <div style={{ display: 'none' }}>
        <svg width="80" height="65" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="sticker-px" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="exp"/>
              <feFlood floodColor="white" result="clr"/>
              <feComposite in="clr" in2="exp" operator="in" result="outline"/>
              <feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g filter="url(#sticker-px)">
            {/* orange body — under headphone arch (rows 2-4, cols 4-15) */}
            <rect x="20" y="10" width="60" height="15" fill="#c8664a"/>
            {/* orange body — wide main section (rows 5-11, cols 3-16) */}
            <rect x="15" y="25" width="70" height="35" fill="#c8664a"/>
            {/* eyes — left & right (rows 7-8) */}
            <rect x="30" y="35" width="10" height="10" fill="#1f1208"/>
            <rect x="60" y="35" width="10" height="10" fill="#1f1208"/>
            {/* headphone arc — dark blue (row 0, cols 4-15) */}
            <rect x="20" y="0" width="60" height="5" fill="#2a5f9a"/>
            {/* side connectors row 1 */}
            <rect x="12" y="5" width="12" height="5" fill="#2a5f9a"/>
            <rect x="76" y="5" width="12" height="5" fill="#2a5f9a"/>
            {/* left ear cup (rows 2-4, cols 1-2) */}
            <rect x="7" y="10" width="13" height="15" fill="#3a7fc8"/>
            {/* right ear cup (rows 2-4, cols 17-18) */}
            <rect x="80" y="10" width="13" height="15" fill="#3a7fc8"/>
            {/* 4 legs (rows 12-15) */}
            <rect x="15" y="60" width="10" height="18" fill="#c8664a"/>
            <rect x="30" y="60" width="10" height="18" fill="#c8664a"/>
            <rect x="60" y="60" width="10" height="18" fill="#c8664a"/>
            <rect x="75" y="60" width="10" height="18" fill="#c8664a"/>
          </g>
        </svg>
      </div>
      <SHeader kicker={t.stack.kicker} title={t.stack.title} sub={t.stack.sub} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {STACK_DATA.map((s) => (
          <div key={s.key} className="stack-row" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 28, alignItems: 'start' }}>
            <div style={{
              fontFamily: T.mono, fontSize: 15, color: T.textBright,
              letterSpacing: 1.5, textTransform: 'uppercase', paddingTop: 10,
              fontWeight: 600,
            }}>
              {t.stack.groups[s.key]}
              <div style={{ color: T.textDim, opacity: 0.65, marginTop: 6, fontSize: 12, fontWeight: 400 }}>// {s.items.length} {t.stack.countSuffix}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderLeft: `1px solid ${T.border}`, paddingLeft: 28 }}>
              {s.items.map((it, i) => {
                const BRAND = {
                  'Claude AI': '#d97757',
                  'Docker': '#2496ed',
                  'k3s': '#ffc61c',
                  'Obsidian + MCP': '#c792ea',
                  'Antigravity': '#7cc4ff',
                };
                const brand = BRAND[it];
                const chipColor = brand || (i === 0 ? T.accent : T.text);
                const chipBorder = brand ? brand + '66' : (i === 0 ? T.accent + '55' : T.border);
                const chipBg = brand ? brand + '12' : (i === 0 ? T.accent + '0d' : 'transparent');
                return (
                <span key={it} className="stack-chip" style={{
                  fontFamily: T.mono, fontSize: 13,
                  color: chipColor,
                  border: `1px solid ${chipBorder}`,
                  padding: '8px 12px 8px 10px',
                  background: chipBg,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'background 150ms, border-color 150ms, color 150ms',
                  cursor: 'default',
                }}>
                  <window.StackLogo name={it} size={14} color={chipColor} />
                  {it}
                </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Certificates
// ─────────────────────────────────────────────────────────────
function CertBadge({ i, T }) {
  // 4 distinct faux badges
  if (i === 0) return (
    <svg width="100%" height="100%" viewBox="0 0 56 56"><circle cx="28" cy="28" r="22" fill="none" stroke={T.border} /><circle cx="28" cy="28" r="14" fill="none" stroke={T.accent} strokeDasharray="2 2" /><path d="M22 28l4 4 8-8" stroke={T.accent} fill="none" strokeWidth="2" /></svg>
  );
  if (i === 1) return (
    <svg width="100%" height="100%" viewBox="0 0 56 56"><path d="M28 6l18 10v14c0 10-8 17-18 20-10-3-18-10-18-20V16z" fill="none" stroke={T.border} /><path d="M20 26l5 5 11-11" stroke={T.accent} fill="none" strokeWidth="2" /></svg>
  );
  if (i === 2) return (
    <svg width="100%" height="100%" viewBox="0 0 56 56"><polygon points="28,6 34,20 50,22 38,32 42,48 28,40 14,48 18,32 6,22 22,20" fill="none" stroke={T.border} /><circle cx="28" cy="26" r="4" fill={T.accent} /></svg>
  );
  return (
    <svg width="100%" height="100%" viewBox="0 0 56 56"><rect x="8" y="8" width="40" height="40" fill="none" stroke={T.border} /><path d="M8 18h40M8 28h40M8 38h40" stroke={T.border} /><rect x="14" y="22" width="12" height="12" fill={T.accent} opacity="0.6" /><path d="M32 24l4 4-4 4M32 32l4 4-4 4" stroke={T.accent} fill="none" /></svg>
  );
}

function Certs() {
  const T = useTheme();
  const { t } = useLang();
  return (
    <section id="certs" style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 32px', borderTop: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
      {/* Claude pixel art + headphones — corner deco */}
      <div style={{ position: 'absolute', bottom: 16, right: 8, opacity: 0.72, pointerEvents: 'none', userSelect: 'none' }}>
        <svg width="80" height="65" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="sticker-px2" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="exp"/>
              <feFlood floodColor="white" result="clr"/>
              <feComposite in="clr" in2="exp" operator="in" result="outline"/>
              <feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g filter="url(#sticker-px2)">
            <rect x="20" y="10" width="60" height="15" fill="#c8664a"/>
            <rect x="15" y="25" width="70" height="35" fill="#c8664a"/>
            <rect x="30" y="35" width="10" height="10" fill="#1f1208"/>
            <rect x="60" y="35" width="10" height="10" fill="#1f1208"/>
            <rect x="20" y="0" width="60" height="5" fill="#2a5f9a"/>
            <rect x="12" y="5" width="12" height="5" fill="#2a5f9a"/>
            <rect x="76" y="5" width="12" height="5" fill="#2a5f9a"/>
            <rect x="7" y="10" width="13" height="15" fill="#3a7fc8"/>
            <rect x="80" y="10" width="13" height="15" fill="#3a7fc8"/>
            <rect x="15" y="60" width="10" height="18" fill="#c8664a"/>
            <rect x="30" y="60" width="10" height="18" fill="#c8664a"/>
            <rect x="60" y="60" width="10" height="18" fill="#c8664a"/>
            <rect x="75" y="60" width="10" height="18" fill="#c8664a"/>
          </g>
        </svg>
      </div>
      <SHeader kicker={t.certs.kicker} title={t.certs.title} sub={t.certs.sub} />
      <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 20 }}>
        {t.certs.items.map((c, i) => (
          <a key={i} href={c.url} target="_blank" rel="noopener" className="cert-card" style={{
            background: T.bgElev, border: `1px solid ${T.border}`,
            textDecoration: 'none', color: T.text,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            maxWidth: 440,
            transition: 'border-color 200ms, background 200ms, transform 200ms',
          }}>
            <div style={{
              width: '100%', height: 280, background: T.bgElev2,
              borderBottom: `1px solid ${T.border}`,
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {c.image ? (
                <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: 88, height: 88, border: `1px solid ${T.border}`, background: T.bg, position: 'relative' }}>
                  <CertBadge i={i} T={T} />
                </div>
              )}
              <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: T.mono, fontSize: 10, color: T.textDim, background: T.bg + 'cc', padding: '2px 6px' }}>
                {String(i+1).padStart(2,'0')}
              </div>
            </div>
            <div style={{ padding: 22, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
                  {c.issuer}{c.provider ? ` · ${c.provider}` : ''} · {c.date}
                </div>
                <div style={{ fontSize: 16, color: T.textBright, letterSpacing: '-0.01em', lineHeight: 1.35 }}>
                  {c.title}
                </div>
              </div>
              <span style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, whiteSpace: 'nowrap', flexShrink: 0 }}>{t.certs.verify}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Writing
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
function Footer() {
  const T = useTheme();
  const { t } = useLang();
  return (
    <footer style={{
      maxWidth: 1120, margin: '0 auto', padding: '32px',
      borderTop: `1px solid ${T.border}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 16,
    }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>
        © 2026 worawalan · snowinaugust.dev
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>
        {t.footer.built}
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────
function VesperSite() {
  const [mode, setMode] = React.useState(() => {
    try { return localStorage.getItem('vesper.theme') || 'dark'; } catch { return 'dark'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('vesper.theme', mode); } catch {}
    window.__vesperLight = (mode === 'light');
    document.documentElement.style.colorScheme = mode;
    document.body.style.background = themeFor(mode).bg;
    document.body.style.color = themeFor(mode).text;
    document.body.dataset.theme = mode;
    // broadcast to Tweaks
    window.postMessage({ type: '__vesper_theme', mode }, '*');
  }, [mode]);

  const T = themeFor(mode);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <LangProvider>
        <div style={{ background: T.bg, color: T.text, fontFamily: T.sans, minHeight: '100vh' }}>
          <Nav />
          <main>
            <Hero />
            <window.MiniGame />
            <Now />
            <Work />
            <Stack />
            <Certs />
          </main>
          <Footer />
        </div>
      </LangProvider>
      <TweakBridge mode={mode} setMode={setMode} />
    </ThemeContext.Provider>
  );
}

// Tweaks panel bridge — listens to host messages, exposes mode via messaging
function TweakBridge({ mode, setMode }) {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setActive(true);
      if (d.type === '__deactivate_edit_mode') setActive(false);
    };
    window.addEventListener('message', onMsg);
    // announce availability AFTER listener is attached
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const T = themeFor(mode);
  if (!active) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 50,
      background: T.bgElev, border: `1px solid ${T.border}`,
      padding: 16, fontFamily: T.mono, fontSize: 12, color: T.text,
      minWidth: 220, boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
    }}>
      <div style={{ fontSize: 10, color: T.textDim, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Tweaks</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span>theme</span>
        <div style={{ display: 'flex', border: `1px solid ${T.border}` }}>
          {['dark', 'light'].map(m => (
            <button key={m} onClick={() => { setMode(m); window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { theme: m } }, '*'); }} style={{
              background: mode === m ? T.accent : 'transparent',
              color: mode === m ? (m === 'light' ? '#fff' : '#0a0a0a') : T.text,
              border: 'none', padding: '4px 10px', cursor: 'pointer',
              fontFamily: T.mono, fontSize: 11,
            }}>{m}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VesperSite });
