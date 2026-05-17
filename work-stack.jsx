// WorkAndStack.jsx — Selected Work + Stack section variations

const VT2 = () => window.VesperTheme;

function SectionFrame({ children, label, height = 860 }) {
  const T = VT2();
  return (
    <div style={{
      width: 1280, height, background: T.bg, color: T.text,
      fontFamily: T.sans, position: 'relative', overflow: 'hidden',
    }}>
      {children}
      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        fontFamily: T.mono, fontSize: 10, color: T.textDim,
        border: `1px solid ${T.border}`, padding: '4px 8px',
        background: T.bgElev,
      }}>{label}</div>
    </div>
  );
}

function SectionHeader({ number, title, sub }) {
  const T = VT2();
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
        {number} / {title.toLowerCase()}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 40 }}>
        <h2 style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, color: T.textBright, margin: 0 }}>
          {title}
        </h2>
        {sub && <div style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim, maxWidth: 380, textAlign: 'right', lineHeight: 1.6 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECTS DATA
// ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: '01',
    title: 'AI News Bot',
    desc: 'Native Python cron job that curates and posts AI news to Discord. Production on a VPS, 94 days uptime.',
    tags: ['python', 'cron', 'discord-api'],
    meta: 'shipped',
    metric: '94d uptime',
  },
  {
    num: '02',
    title: 'Personal Second Brain',
    desc: 'Custom MCP server, 27 tools, semantic search over an Obsidian knowledge base. Normalized embeddings, auto-reindex hooks.',
    tags: ['mcp', 'embeddings', 'python'],
    meta: 'v2.2.20',
    metric: '27 tools',
  },
  {
    num: '03',
    title: 'GitOps Portfolio Pipeline',
    desc: 'GitHub → GHCR → k3s on VPS → ArgoCD auto-sync. The pipeline that deployed this page.',
    tags: ['k3s', 'argocd', 'ghcr'],
    meta: 'live',
    metric: 'auto-sync',
  },
];

// ─────────────────────────────────────────────────────────────
// WORK v1 — File-system table. Dev-heavy, mono-forward, editorial.
// ─────────────────────────────────────────────────────────────
function WorkTable() {
  const T = VT2();
  return (
    <SectionFrame label="work · v1 · table">
      <div style={{ padding: '72px 80px' }}>
        <SectionHeader number="03" title="Selected Work" sub="Three projects shipping. Links on request." />

        {/* Column headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '60px 1fr 1.4fr 240px 110px',
          fontFamily: T.mono, fontSize: 10, color: T.textDim,
          letterSpacing: 1.5, textTransform: 'uppercase',
          padding: '0 0 14px', borderBottom: `1px solid ${T.border}`,
          gap: 24,
        }}>
          <span>#</span>
          <span>project</span>
          <span>description</span>
          <span>stack</span>
          <span style={{ textAlign: 'right' }}>status</span>
        </div>

        {/* Rows */}
        {PROJECTS.map((p, i) => (
          <div key={p.num} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr 1.4fr 240px 110px',
            padding: '28px 0', borderBottom: i === PROJECTS.length - 1 ? 'none' : `1px solid ${T.border}`,
            gap: 24, alignItems: 'start',
          }}>
            <span style={{ fontFamily: T.mono, fontSize: 12, color: T.textDim, paddingTop: 4 }}>{p.num}</span>
            <div>
              <div style={{ fontSize: 22, fontWeight: 500, color: T.textBright, letterSpacing: '-0.01em', marginBottom: 6 }}>
                {p.title}
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent }}>{p.metric}</div>
            </div>
            <div style={{ fontSize: 14, color: T.text, lineHeight: 1.55, paddingTop: 3 }}>
              {p.desc}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 3 }}>
              {p.tags.map(t => (
                <span key={t} style={{ fontFamily: T.mono, fontSize: 11, color: T.text, border: `1px solid ${T.border}`, padding: '3px 8px' }}>{t}</span>
              ))}
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, textAlign: 'right', paddingTop: 4 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 6px ${T.accent}` }} />
                <span style={{ color: T.text }}>{p.meta}</span>
              </div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: 40, fontFamily: T.mono, fontSize: 12, color: T.textDim }}>
          → <span style={{ color: T.accent, borderBottom: `1px dashed ${T.accent}55` }}>github.com/snowinaugust</span> <span style={{ marginLeft: 6 }}>// more on request</span>
        </div>
      </div>
    </SectionFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// WORK v2 — Card grid. Still mono-typed but each project gets its
// own small "deployment" card with a tiny diagram.
// ─────────────────────────────────────────────────────────────
function WorkCards() {
  const T = VT2();
  return (
    <SectionFrame label="work · v2 · cards">
      <div style={{ padding: '72px 80px' }}>
        <SectionHeader number="03" title="Selected Work" sub="Three things running in production." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {PROJECTS.map((p) => (
            <div key={p.num} style={{
              background: T.bgElev, border: `1px solid ${T.border}`,
              padding: 28, display: 'flex', flexDirection: 'column',
              minHeight: 360,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>{p.num}</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1, textTransform: 'uppercase' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 6px ${T.accent}` }} />
                  {p.meta}
                </div>
              </div>

              {/* Tiny visual — each project gets a small ASCII/svg mark */}
              <div style={{ height: 64, marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                {p.num === '01' && (
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, lineHeight: 1.5 }}>
                    <div>cron(1) ─┐</div>
                    <div>         ├─▶ anthropic ─▶ <span style={{ color: T.accent }}>#ai-news</span></div>
                    <div>rss ─────┘</div>
                  </div>
                )}
                {p.num === '02' && (
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
                )}
                {p.num === '03' && (
                  <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, lineHeight: 1.55 }}>
                    <div>git push ─▶ ghcr ─▶ k3s</div>
                    <div style={{ marginLeft: 65 }}>│</div>
                    <div style={{ marginLeft: 54 }}>argocd ◀─ ┘</div>
                  </div>
                )}
              </div>

              <div style={{ fontSize: 22, fontWeight: 500, color: T.textBright, letterSpacing: '-0.01em', marginBottom: 10 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.55, flex: 1 }}>
                {p.desc}
              </div>
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 18, marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontFamily: T.mono, fontSize: 11, color: T.text, border: `1px solid ${T.border}`, padding: '3px 8px' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// STACK DATA
// ─────────────────────────────────────────────────────────────
const STACK = [
  { group: 'languages', items: ['Python', 'Bash', 'HTML', 'CSS', 'Linux Command Line'] },
  { group: 'infra',     items: ['Docker', 'Kubernetes', 'kind', 'k3s', 'ArgoCD', 'Apache', 'UFW', 'fail2ban'] },
  { group: 'ai',        items: ['Anthropic API', 'MCP', 'sentence-transformers', 'semantic search'] },
  { group: 'tools',     items: ['Obsidian + MCP', 'Git', 'Lens', 'MobaXterm'] },
];

// Tiny inline SVG logos keyed by lowercase name. Simplified monochrome marks.
function StackLogo({ name, size = 14, color }) {
  const T = VT2();
  const c = color || T.text;
  const n = (name || '').toLowerCase();
  const s = size;
  const common = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: c, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', style: { display: 'block', flexShrink: 0 } };
  // Python: two lobes
  if (n === 'python') return (<svg {...common}><path d='M12 3c-3 0-5 1-5 3v3h5' /><path d='M12 21c3 0 5-1 5-3v-3h-5' /><rect x='4' y='9' width='10' height='6' rx='1' /><rect x='10' y='9' width='10' height='6' rx='1' /><circle cx='8' cy='6' r='0.6' fill={c} stroke='none' /><circle cx='16' cy='18' r='0.6' fill={c} stroke='none' /></svg>);
  // Bash: prompt
  if (n === 'bash' || n === 'linux command line' || n === 'linux command') return (<svg {...common}><rect x='2.5' y='4.5' width='19' height='15' rx='1.5' /><path d='M6 10l3 2-3 2M11 14h6' /></svg>);
  // SSH: key + terminal hint
  if (n === 'ssh') return (<svg {...common}><circle cx='7' cy='12' r='3.5' /><path d='M10.5 12h10M17 12v3M20.5 12v3' /></svg>);
  if (n === 'html') return (<svg {...common}><path d='M4 3l1.6 16L12 21l6.4-2L20 3H4z' /><path d='M8 8h8l-.5 3H8.5M9 14l.4 2.4L12 17l2.6-.6.4-3.4' /></svg>);
  if (n === 'css') return (<svg {...common}><path d='M4 3l1.6 16L12 21l6.4-2L20 3H4z' /><path d='M8 8h8M8.5 12h7l-.4 4.4L12 17l-3.1-.6' /></svg>);
  if (n === 'javascript') return (<svg {...common}><rect x='3' y='3' width='18' height='18' rx='1' /><path d='M11 10v5.5c0 1-.5 1.5-1.5 1.5S8 16.5 8 15.5M13.5 15.5c.3 1 1 1.5 2.2 1.5s2-.5 2-1.4c0-1-.8-1.4-2.2-1.8-1.3-.4-2-.7-2-1.6 0-.9.7-1.5 1.8-1.5.9 0 1.6.4 1.9 1.2' /></svg>);
  // Docker: whale
  if (n === 'docker') return (<svg {...common}><path d='M2 14h19a4 4 0 01-4 4h-5c-5 0-8-1.5-10-4z' /><rect x='5' y='10' width='2.2' height='2.2' /><rect x='8' y='10' width='2.2' height='2.2' /><rect x='11' y='10' width='2.2' height='2.2' /><rect x='8' y='7.5' width='2.2' height='2.2' /><rect x='11' y='7.5' width='2.2' height='2.2' /><rect x='14' y='10' width='2.2' height='2.2' /><path d='M18 12c1.5-.5 2.5-.2 3 .5' /></svg>);
  // Kubernetes / k3s / kind: heptagon-ish
  if (n === 'kubernetes' || n === 'k3s' || n === 'kind') return (<svg {...common}><path d='M12 3l7.5 3.5v8L12 21l-7.5-6.5v-8z' /><path d='M12 7v10M7.5 9.5l9 5M16.5 9.5l-9 5' /></svg>);
  // ArgoCD: octopus-ring
  if (n === 'argocd') return (<svg {...common}><circle cx='12' cy='12' r='7' /><circle cx='12' cy='12' r='2.5' /><path d='M12 5V3M12 21v-2M5 12H3M21 12h-2' /></svg>);
  // Apache: feather
  if (n === 'apache') return (<svg {...common}><path d='M6 20c2-10 6-14 14-16-2 4-4 6-8 7M6 20l4-4M8 18c2 0 5-1 7-3' /></svg>);
  // UFW: shield
  if (n === 'ufw') return (<svg {...common}><path d='M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z' /><path d='M9 12l2 2 4-4' /></svg>);
  // fail2ban: ban circle
  if (n === 'fail2ban') return (<svg {...common}><circle cx='12' cy='12' r='8' /><path d='M6.5 6.5l11 11' /></svg>);
  // Claude AI: starburst (8-point flower)
  if (n === 'claude ai' || n === 'claude') return (<svg {...common}><path d='M12 3c0 4 2 6 6 7M12 3c0 4-2 6-6 7M12 21c0-4 2-6 6-7M12 21c0-4-2-6-6-7M3 12c4 0 6-2 7-6M21 12c-4 0-6-2-7-6M3 12c4 0 6 2 7 6M21 12c-4 0-6 2-7 6' /><circle cx='12' cy='12' r='1.2' fill={c} stroke='none' /></svg>);
  // Gemini: 4-point star
  if (n === 'gemini') return (<svg {...common}><path d='M12 2c0 5 5 10 10 10-5 0-10 5-10 10 0-5-5-10-10-10 5 0 10-5 10-10z' /></svg>);
  // NotebookLM: notebook with binding
  if (n === 'notebooklm') return (<svg {...common}><rect x='5' y='3' width='14' height='18' rx='1' /><path d='M9 3v18M7 8h-2M7 12h-2M7 16h-2' /></svg>);
  // Anthropic: stylized burst / asterisk mark
  if (n === 'anthropic api' || n === 'nthropic api') return (<svg {...common} strokeLinecap="round"><path d='M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13' /></svg>);
  // MCP: plug
  if (n === 'mcp') return (<svg {...common}><rect x='9' y='3' width='6' height='10' rx='1' /><path d='M11 3V1M13 3V1M12 13v4a3 3 0 003 3h2' /></svg>);
  // sentence-transformers / semantic search: dots+lines
  if (n === 'sentence-transformers') return (<svg {...common}><circle cx='5' cy='7' r='1.5' /><circle cx='19' cy='7' r='1.5' /><circle cx='5' cy='17' r='1.5' /><circle cx='19' cy='17' r='1.5' /><circle cx='12' cy='12' r='1.5' /><path d='M6.5 7.5l4.2 3.8M17.5 7.5l-4.2 3.8M6.5 16.5l4.2-3.8M17.5 16.5l-4.2-3.8' /></svg>);
  if (n === 'semantic search') return (<svg {...common}><circle cx='11' cy='11' r='6' /><path d='M15.5 15.5L21 21M8 11h6M11 8v6' strokeDasharray='2 2' /></svg>);
  // Obsidian + MCP: diamond
  if (n === 'obsidian + mcp') return (<svg {...common}><path d='M12 3l7 4-2 12-5 2-5-2L5 7z' /><path d='M9 10c1-2 4-2 6 0M10 14h4' /></svg>);
  // Git: branch
  if (n === 'git') return (<svg {...common}><circle cx='6' cy='6' r='2' /><circle cx='6' cy='18' r='2' /><circle cx='18' cy='12' r='2' /><path d='M6 8v8M8 6c4 0 8 1 8 6' /></svg>);
  // Lens: magnifier
  if (n === 'lens') return (<svg {...common}><circle cx='10' cy='10' r='6' /><path d='M14.5 14.5L20 20' /></svg>);
  // MobaXterm: terminal window
  if (n === 'mobaxterm') return (<svg {...common}><rect x='2.5' y='4' width='19' height='16' rx='1.5' /><path d='M2.5 8h19M6 13l2 1.5-2 1.5M10 16h5' /></svg>);
  // ChatGPT: hexagonal knot / 6-lobe mark
  if (n === 'chatgpt') return (<svg {...common} strokeLinejoin="round"><path d='M12 4l7 4v8l-7 4-7-4V8z' /><path d='M12 4v8l7 4M12 12L5 16M12 12l3.5-6M12 12l-3.5 6' /></svg>);
  // fallback: small dot
  return (<svg {...common}><circle cx='12' cy='12' r='4' /></svg>);
}

// ─────────────────────────────────────────────────────────────
// STACK v1 — Columns, mono, dev-heavy — feels like cat on /etc/stack
// ─────────────────────────────────────────────────────────────
function StackColumns() {
  const T = VT2();
  return (
    <SectionFrame label="stack · v1 · columns" height={720}>
      <div style={{ padding: '72px 80px' }}>
        <SectionHeader number="04" title="Stack" sub="What's installed. Every tool below is in active rotation." />

        <div style={{
          background: T.bgElev, border: `1px solid ${T.border}`,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {STACK.map((s, i) => (
            <div key={s.group} style={{
              padding: '28px 28px 32px',
              borderLeft: i === 0 ? 'none' : `1px solid ${T.border}`,
            }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>
                # {s.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.items.map(it => (
                  <div key={it} style={{ fontFamily: T.mono, fontSize: 13, color: T.text }}>
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, fontFamily: T.mono, fontSize: 11, color: T.textDim, display: 'flex', gap: 32 }}>
          <span>// <span style={{ color: T.accent }}>primary</span>: python, k3s, mcp</span>
          <span>// currently learning: ray, pytorch</span>
        </div>
      </div>
    </SectionFrame>
  );
}

// ─────────────────────────────────────────────────────────────
// STACK v2 — Tag cloud. Mono chips, groups as labels
// ─────────────────────────────────────────────────────────────
function StackTags() {
  const T = VT2();
  return (
    <SectionFrame label="stack · v2 · tags" height={720}>
      <div style={{ padding: '72px 80px' }}>
        <SectionHeader number="04" title="Stack" sub="" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {STACK.map((s) => (
            <div key={s.group} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32, alignItems: 'start' }}>
              <div style={{
                fontFamily: T.mono, fontSize: 11, color: T.textDim,
                letterSpacing: 1.5, textTransform: 'uppercase',
                paddingTop: 10,
              }}>
                {s.group}
                <div style={{ color: T.textDim, opacity: 0.5, marginTop: 4 }}>// {s.items.length} tools</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', borderLeft: `1px solid ${T.border}`, paddingLeft: 32 }}>
                {s.items.map((it, i) => (
                  <span key={it} style={{
                    fontFamily: T.mono, fontSize: 13,
                    color: i === 0 ? T.accent : T.text,
                    border: `1px solid ${i === 0 ? T.accent + '55' : T.border}`,
                    padding: '8px 12px 8px 10px',
                    background: i === 0 ? T.accent + '0d' : 'transparent',
                    display: 'inline-block',
                  }}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

Object.assign(window, { WorkTable, WorkCards, StackColumns, StackTags });
