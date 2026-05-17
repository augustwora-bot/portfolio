// work/case-study-page.jsx — page shell for Personal Second Brain case study

const LIGHT_THEME = {
  bg: '#fafaf9', bgElev: '#ffffff', bgElev2: '#f5f5f4',
  border: '#e7e5e4', borderStrong: '#d6d3d1',
  textDim: '#78716c', text: '#44403c', textBright: '#0a0a0a',
  accent: '#2ea043', accentDim: '#86efac',
  sans: window.VesperTheme.sans, mono: window.VesperTheme.mono,
};
const DARK_THEME = window.VesperTheme;

function CaseStudyPage() {
  const [lang, setLang] = React.useState(() => {
    try {
      const url = new URL(location.href);
      return url.searchParams.get('lang') || localStorage.getItem('vesper.lang') || 'en';
    } catch { return 'en'; }
  });
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('vesper.theme') || 'dark'; } catch { return 'dark'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('vesper.lang', lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  // apply theme synchronously so Proxy reads are correct on first render
  if (window.VesperTheme !== (theme === 'light' ? LIGHT_THEME : DARK_THEME)) {
    window.VesperTheme = theme === 'light' ? LIGHT_THEME : DARK_THEME;
  }
  React.useEffect(() => {
    try { localStorage.setItem('vesper.theme', theme); } catch {}
    document.body.style.background = theme === 'light' ? LIGHT_THEME.bg : DARK_THEME.bg;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  const T = theme === 'light' ? LIGHT_THEME : DARK_THEME;
  const c = CS_COPY[lang];

  // active section for sticky nav
  const [active, setActive] = React.useState('why');
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200;
      let current = c.nav[0].id;
      for (const n of c.nav) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= y) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [c]);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: '100vh', fontFamily: T.sans }}>
      {/* top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: T.bg + 'f2', backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="../index.html" style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim, textDecoration: 'none' }}>{c.backHome}</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontFamily: T.mono, fontSize: 11, color: T.textDim }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 6px ${T.accent}` }} />
              v2.3.1 · live
            </span>
            <button onClick={() => setLang(lang === 'en' ? 'th' : 'en')} title="Toggle language" style={{
              background: 'transparent', border: `1px solid ${T.border}`, color: T.textDim,
              padding: '5px 10px', fontFamily: T.mono, fontSize: 11, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6, lineHeight: 1,
            }}>
              <span style={{ color: lang === 'en' ? T.accent : T.textDim, transition: 'color 120ms' }}>EN</span>
              <span style={{ color: T.textDim, opacity: 0.5 }}>/</span>
              <span style={{ color: lang === 'th' ? T.accent : T.textDim, transition: 'color 120ms' }}>TH</span>
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme" aria-label="Toggle theme" style={{
              background: 'transparent', border: `1px solid ${T.border}`, color: T.textDim,
              width: 26, height: 24, padding: 0, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {theme === 'dark' ? (
                // sun icon (click to go light)
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                // moon icon (click to go dark)
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* hero */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 32px 48px' }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
          {c.kicker}
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: T.textBright, margin: '0 0 24px' }}>
          {c.title}
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: T.text, maxWidth: 720, margin: '0 0 28px' }}>
          {c.subtitle}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {c.stack.map(s => (
            <span key={s} style={{ fontFamily: T.mono, fontSize: 12, color: T.text, border: `1px solid ${T.border}`, padding: '4px 10px' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* body with sticky nav */}
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 48 }} className="cs-body-grid">
        {/* sticky nav */}
        <aside style={{ position: 'sticky', top: 76, alignSelf: 'start', height: 'max-content', paddingTop: 20 }}>
          <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>contents</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, borderLeft: `1px solid ${T.border}` }}>
            {c.nav.map(n => {
              const isActive = active === n.id;
              return (
                <a key={n.id} href={`#${n.id}`} style={{
                  fontFamily: T.mono, fontSize: 12,
                  color: isActive ? T.accent : T.textDim,
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderLeft: `2px solid ${isActive ? T.accent : 'transparent'}`,
                  marginLeft: -1,
                  transition: 'color 120ms, border-color 120ms',
                }}>{n.label}</a>
              );
            })}
          </nav>
        </aside>

        {/* main */}
        <main style={{ paddingTop: 20, paddingBottom: 120, minWidth: 0 }}>

          {/* VAULT GRAPH — above section 01 */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8,
            }}>
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#7cff9b', boxShadow: '0 0 8px #7cff9b', animation: 'v-pulse 1.6s ease-in-out infinite' }} />
              live · vault graph
            </div>
            <div style={{ border: `1px solid ${T.border}`, background: '#000', overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'relative', paddingBottom: '60%' }}>
                <img
                  src="assets/vault-graph-img.png"
                  alt="Vault graph — nodes representing 188 Obsidian notes connected by links"
                  className="cs-zoomable"
                  onClick={() => window.csZoom && window.csZoom('assets/vault-graph-img.png')}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '105%', height: '105%',
                    objectFit: 'contain', objectPosition: 'center',
                    transform: 'translate(-50%, -50%)',
                    animation: 'vg-drift 10s ease-in-out infinite',
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse 40% 40% at 48% 42%, rgba(0,255,120,0.07) 0%, transparent 70%)',
                  animation: 'vg-glow 4s ease-in-out infinite',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginTop: 10, textAlign: 'right' }}>
              188 notes · connections visualised · clusters by topic
            </div>
          </div>

          {/* 01 WHY */}
          <Section id="why" kicker={c.whyKicker} title={c.whyTitle}>
            {/* RAG comparison diagram */}
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, background: T.accent, borderRadius: '50%' }}></span>
              fig.01 · context loss vs context kept
            </div>
            <div style={{ border: `1px solid ${T.border}`, background: T.bgElev, padding: 0, marginBottom: 28 }}>
              <img
                src="assets/why-rag-comparison.png"
                alt="Comparison: Standard RAG retrieves by semantic similarity only, Self-Querying RAG extracts metadata filters from the query before vector search"
                className="cs-zoomable"
                onClick={() => window.csZoom && window.csZoom('assets/why-rag-comparison.png')}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            {c.whyBody.map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.65, color: T.text, margin: '0 0 16px', maxWidth: 680 }}>{p}</p>
            ))}
          </Section>

          {/* 02 ARCHITECTURE */}
          <Section id="arch" kicker={c.archKicker} title={c.archTitle}>
            <div style={{ border: `1px solid ${T.border}`, background: '#0d1117', padding: 0, overflow: 'hidden' }}>
              <img
                src="assets/arch-diagram.png"
                alt="Architecture diagram: Claude Desktop → MCP Server (FastMCP · stdio) → Obsidian Vault (188 .md files), SQLite + vec (.index/vault.db), Audit/Backup (99_Meta/) via 27 tools"
                className="cs-zoomable"
                onClick={() => window.csZoom && window.csZoom('assets/arch-diagram.png')}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: T.text, margin: '16px 0 0 0', maxWidth: 680 }}>{c.archCaption}</p>
          </Section>

          {/* 04 TOOLS */}
          <Section id="tools" kicker={c.toolsKicker} title={c.toolsTitle} sub={c.toolsSub}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="cs-tools-grid">
              {TOOL_CATEGORIES.map(cat => (
                <div key={cat.key} style={{
                  border: `1px solid ${T.border}`, background: T.bgElev,
                  padding: 18,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: 1.5, color: cat.color }}>{cat.label}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>{cat.tools.length}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {cat.tools.map(t => (
                      <span key={t} style={{
                        fontFamily: T.mono, fontSize: 11,
                        color: T.text, background: T.bg,
                        border: `1px solid ${T.border}`,
                        padding: '3px 8px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 05 SEMANTIC */}
          <Section id="semantic" kicker={c.semKicker} title={c.semTitle}>
            <div style={{ border: `1px solid ${T.border}`, background: T.bgElev }}>
              {SEMANTIC_SPECS.map((s, i) => (
                <div key={s.k} style={{
                  display: 'grid', gridTemplateColumns: '180px 1fr',
                  borderBottom: (i < SEMANTIC_SPECS.length - 1) ? `1px solid ${T.border}` : 'none',
                }}>
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 1.5, textTransform: 'uppercase', padding: '14px 18px', borderRight: `1px solid ${T.border}` }}>{s.k}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 13, color: T.textBright, padding: '14px 18px' }}>{s.v}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 06 AT A GLANCE */}
          <Section id="glance" kicker={c.glanceKicker} title={c.glanceTitle}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', border: `1px solid ${T.border}` }} className="cs-glance">
              {c.glance.map((g, i) => (
                <div key={i} style={{
                  padding: '28px 24px',
                  borderRight: (i % 3 !== 2) ? `1px solid ${T.border}` : 'none',
                  borderBottom: (i < 3) ? `1px solid ${T.border}` : 'none',
                  background: T.bgElev,
                }}>
                  <div style={{ fontFamily: T.mono, fontSize: 32, color: T.textBright, letterSpacing: '-0.02em', marginBottom: 4 }}>{g.v}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 1, textTransform: 'uppercase' }}>{g.u}</div>
                </div>
              ))}
            </div>
          </Section>

          <div style={{ paddingTop: 40, borderTop: `1px solid ${T.border}` }}>
            <a href="../index.html" style={{ fontFamily: T.mono, fontSize: 13, color: T.accent, textDecoration: 'none' }}>{c.footer}</a>
          </div>
        </main>
      </div>
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
            {lang === 'th' ? 'Build บน k3s ผ่าน GitOps' : 'Built on k3s via GitOps.'}
          </div>
        </footer>
    </div>
  );
}

function Section({ id, kicker, title, sub, children }) {
  return (
    <section id={id} style={{ padding: '48px 0', borderTop: `1px solid ${T.border}` }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{kicker}</div>
      <h2 style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', color: T.textBright, margin: '0 0 20px' }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, lineHeight: 1.65, color: T.text, maxWidth: 680, margin: '0 0 24px' }}>{sub}</p>}
      {children}
    </section>
  );
}

Object.assign(window, { CaseStudyPage });
