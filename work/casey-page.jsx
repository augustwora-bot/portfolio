// work/casey-page.jsx — Casey case study page
// Persistent knowledge extraction agent on Claude Code platform.

const CaseyT = new Proxy({}, { get: (_, k) => window.VesperTheme[k] });

const CASEY_LIGHT = {
  bg: '#fafaf9', bgElev: '#ffffff', bgElev2: '#f5f5f4',
  border: '#e7e5e4', borderStrong: '#d6d3d1',
  textDim: '#57534e', text: '#292524', textBright: '#0a0a0a',
  accent: '#16a34a', accentDim: '#86efac',
  sans: "'Geist','IBM Plex Sans Thai',-apple-system,system-ui,sans-serif",
  mono: "'JetBrains Mono','Geist Mono',ui-monospace,SFMono-Regular,Menlo,monospace",
};
const CASEY_DARK = {
  bg: '#0a0a0a', bgElev: '#111111', bgElev2: '#171717',
  border: '#1f1f1f', borderStrong: '#2a2a2a',
  textDim: '#a0a0a0', text: '#e2e2e2', textBright: '#ffffff',
  accent: '#7cff9b', accentDim: '#3d7d4d',
  sans: "'Geist','IBM Plex Sans Thai',-apple-system,system-ui,sans-serif",
  mono: "'JetBrains Mono','Geist Mono',ui-monospace,SFMono-Regular,Menlo,monospace",
};

// ═══════════════════════════════════════════════════════════════
// Copy
// ═══════════════════════════════════════════════════════════════
const CASEY_COPY = {
  en: {
    backHome: '← back to portfolio',
    kicker: 'case study · v2.7.0',
    title: 'Casey',
    subtitleA: 'Casey is an AI agent that extracts knowledge from PDFs, YouTube, markdown, and other documents, then stores it in Notion and filesystem with cross-references — like having a personal assistant that organizes your knowledge systematically.',
    subtitleB: '13-step workflow · 11 audit checks · 21 binding rules · 4-layer working memory that accumulates intelligence across sessions.',
    stack: ['Claude Code', 'Anthropic Agent Skills', 'FastMCP', 'sqlite-vec', 'Notion API', 'Mermaid', 'Python 3.12'],
    nav: [
      { id: 'why',    label: 'why' },
      { id: 'steps',  label: '13 steps' },
      { id: 'arch',   label: 'architecture' },
      { id: 'body',   label: 'philosophy' },
      { id: 'glance', label: 'at a glance' },
    ],
    graphLabel: 'live · casey knowledge graph',
    graphCaption: '22 particles · 9 categories · cross-referenced',
    whyKicker: '01 / why',
    whyTitle: 'Why Casey? Because regular AI can\'t remember anything — but Casey builds a durable, cumulative knowledge system.',
    figWithout: 'WITHOUT CASEY',
    figWith: 'WITH CASEY',
    figWithoutA: 'read source once',
    figWithoutB: 'forget',
    figWithoutC: 're-read every time',
    figWithoutD: 'context lost every session',
    figWithA: 'source → 4-section atomic units',
    figWithB: 'vault cross-ref',
    figWithC: 'queryable in 3 seconds',
    figWithD: 'sessions accumulate context',
    whyBody: [
      'The problem with regular AI: When you ask AI about a document, it reads and answers well. But when you close the session, AI forgets everything. Next time, it has to read everything again. No cumulative understanding, no structure, no cross-references.',
      'Casey solves this with a 13-step system: read document → extract knowledge into "particles" (small knowledge units with 4-5 structured sections) → strict quality audit → save to Notion and markdown simultaneously → searchable via semantic search.',
      'Result: Knowledge that persists across all sessions, clearly structured, searchable within 3 seconds, and interconnected — not just an AI that answers questions, but a personal knowledge management system that grows with you.',
    ],
    archKicker: '03 / architecture',
    archTitle: '4-layer storage system — making knowledge durable and searchable',
    archCaption: 'Every particle is dual-written (saved to 2 places simultaneously) — Notion is the main database for viewing and managing, while markdown is an offline-searchable backup · casey-mcp is a local MCP server (sqlite-vec backend with 9 tools: 5 memory + 3 ingest + 1 remember) · Notion MCP is the remote API for connecting to Notion · every operation logs an audit trail at decisions-log.md',
    stepsKicker: '02 / 13 steps, 5 phases',
    stepsTitle: 'How it works: 13 steps, 5 phases — extract knowledge with automatic quality control',
    stepsIntro: 'Casey works through 13 steps divided into 5 phases — each step has a clear purpose, with 11 quality checks before saving data. If the source lacks quality content, the system won\'t create any particles (0 particles is a valid output) — no padding or filler.',
    bodyKicker: '04 / philosophy',
    bodyTitle: 'Catalyst, not Synthesizer — the working philosophy',
    bodyCaption: 'Casey operates in Catalyst mode (catalyst), not Synthesizer mode — meaning Casey creates high-quality raw materials (mechanism, diagram, source attribution, data) for users to synthesize themselves, rather than having AI summarize into ready-made text that risks hallucination and reduces the user\'s role as an active operator.',
    glanceKicker: '05 / at a glance',
    glanceTitle: 'The system in numbers',
    glanceCells: [
      { v: '22', u: 'particles in production' },
      { v: '13', u: 'workflow steps' },
      { v: '11', u: 'self-audit checks' },
      { v: '21', u: 'binding rules' },
      { v: '9',  u: 'active learnings' },
      { v: '4',  u: 'storage layers' },
    ],
    footer: 'See the source on the portfolio →',
  },
  th: {
    backHome: '← กลับหน้า portfolio',
    kicker: 'case study · v2.7.0',
    title: 'Casey',
    subtitleA: 'Casey เป็น AI Agent ที่สกัดความรู้จาก PDF, YouTube, markdown และเอกสารอื่นๆ แล้วเก็บไว้ใน Notion และ filesystem พร้อมระบบ cross-references — เหมือนมีผู้ช่วยส่วนตัวที่จดบันทึกและจัดระบบความรู้ให้คุณอย่างเป็นระเบียบ',
    subtitleB: '13-step workflow · 11 audit checks · 21 binding rules · 4-layer working memory ที่สะสม intelligence ข้าม sessions',
    stack: ['Claude Code', 'Anthropic Agent Skills', 'FastMCP', 'sqlite-vec', 'Notion API', 'Mermaid', 'Python 3.12'],
    nav: [
      { id: 'why',    label: 'ทำไม' },
      { id: 'steps',  label: '13 steps' },
      { id: 'arch',   label: 'architecture' },
      { id: 'body',   label: 'philosophy' },
      { id: 'glance', label: 'ภาพรวม' },
    ],
    graphLabel: 'live · casey knowledge graph',
    graphCaption: '22 particles · 9 categories · cross-referenced',
    whyKicker: '01 / ทำไม',
    whyTitle: 'ทำไมต้อง Casey? เพราะ AI ทั่วไปจำอะไรไม่ได้ — แต่ Casey สร้างระบบความรู้ที่คงทนและสะสมได้',
    figWithout: 'WITHOUT CASEY',
    figWith: 'WITH CASEY',
    figWithoutA: 'อ่าน source 1 ครั้ง',
    figWithoutB: 'ลืม',
    figWithoutC: 're-read ใหม่ทุกครั้ง',
    figWithoutD: 'context หายทุก session',
    figWithA: 'source → 4-section atomic units',
    figWithB: 'vault cross-ref',
    figWithC: 'query ได้ใน 3 วินาที',
    figWithD: 'sessions สะสม context',
    whyBody: [
      'ปัญหาของ AI ทั่วไป: เมื่อคุณถาม AI เกี่ยวกับเอกสาร มันจะอ่านและตอบได้ดี แต่เมื่อคุณปิด session ไป AI ก็จะลืมทุกอย่าง ครั้งต่อไปต้องอ่านใหม่ทั้งหมด ไม่มีการสะสมความเข้าใจ ไม่มีโครงสร้าง และไม่มีการเชื่อมโยงข้อมูล',
      'Casey แก้ปัญหานี้ด้วยระบบ 13 ขั้นตอน: อ่านเอกสาร → สกัดความรู้เป็น "particles" (หน่วยความรู้ขนาดเล็กที่มีโครงสร้าง 4-5 sections) → ตรวจสอบคุณภาพอย่างเข้มงวด → บันทึกลง Notion และ markdown พร้อมกัน → ค้นหาได้ด้วย semantic search',
      'ผลลัพธ์: ความรู้ที่สะสมข้ามทุก session มีโครงสร้างชัดเจน ค้นหาได้ภายใน 3 วินาที และเชื่อมโยงกันเป็นระบบ — ไม่ใช่แค่ AI ที่ตอบคำถาม แต่เป็นระบบจัดการความรู้ส่วนตัวที่เติบโตไปกับคุณ',
    ],
    archKicker: '03 / architecture',
    archTitle: 'ระบบจัดเก็บข้อมูล 4 ชั้น — ทำให้ความรู้คงทนและค้นหาได้',
    archCaption: 'ระบบเก็บข้อมูลทุก particle แบบ dual-write (บันทึก 2 ที่พร้อมกัน) — Notion เป็นฐานข้อมูลหลักที่ใช้ดูและจัดการ ส่วน markdown เป็น backup ที่ค้นหาได้แบบ offline · casey-mcp คือ local MCP server (ใช้ sqlite-vec เป็น backend มี 9 tools: 5 memory + 3 ingest + 1 remember) · Notion MCP เป็น remote API สำหรับเชื่อมต่อ Notion · ทุกการทำงานจะบันทึก audit trail ไว้ที่ decisions-log.md',
    stepsKicker: '02 / 13 steps, 5 phases',
    stepsTitle: 'วิธีการทำงาน: 13 ขั้นตอน 5 เฟส — สกัดความรู้พร้อมตรวจสอบคุณภาพอัตโนมัติ',
    stepsIntro: 'Casey ทำงานผ่าน 13 ขั้นตอนที่แบ่งเป็น 5 เฟส — แต่ละขั้นตอนมีหน้าที่ชัดเจน และมีการตรวจสอบคุณภาพ 11 ข้อก่อนบันทึกข้อมูล ถ้า source ไม่มีข้อมูลคุณภาพ ระบบจะไม่สร้าง particle เลย (ผลลัพธ์ 0 particles ถือว่าถูกต้อง) — ไม่มีการสร้างข้อมูลเพื่อเติมให้ครบ',
    bodyKicker: '04 / philosophy',
    bodyTitle: 'Catalyst ไม่ใช่ Synthesizer — ปรัชญาการทำงาน',
    bodyCaption: 'Casey ทำงานในโหมด Catalyst (ตัวเร่งปฏิกิริยา) ไม่ใช่ Synthesizer (เครื่องสังเคราะห์) — หมายความว่า Casey สร้าง raw material คุณภาพสูง (mechanism, diagram, source attribution, data) ให้ผู้ใช้นำไปสังเคราะห์ต่อเอง แทนที่จะให้ AI สรุปเป็นข้อความสำเร็จรูปที่มีความเสี่ยง hallucination และลดความเป็น active operator ของผู้ใช้',
    glanceKicker: '05 / ภาพรวม',
    glanceTitle: 'ระบบเป็นตัวเลข',
    glanceCells: [
      { v: '22', u: 'particles in production' },
      { v: '13', u: 'workflow steps' },
      { v: '11', u: 'self-audit checks' },
      { v: '21', u: 'binding rules (กฎเหล็ก)' },
      { v: '9',  u: 'active learnings' },
      { v: '4',  u: 'storage layers' },
    ],
    footer: 'ดู source บนหน้า portfolio →',
  },
};

// ═══════════════════════════════════════════════════════════════
// Phase / step data
// ═══════════════════════════════════════════════════════════════
const PHASES = [
  { key: 'memory',  label: 'PHASE 1 · MEMORY LOAD',     color: '#7cff9b', steps: ['Step 0 · query_memory'] },
  { key: 'intake',  label: 'PHASE 2 · SOURCE INTAKE',    color: '#82aaff', steps: ['Step 1 · read_source', 'Step 1.5 · remember', 'Step 1.7 · candidates'] },
  { key: 'filter',  label: 'PHASE 3 · FILTER + STRUCTURE', color: '#ffbd2e', steps: ['Step 2 · durability', 'Step 2.5 · orthogonality', 'Step 3 · extract', 'Step 3.5 · vault_xref'] },
  { key: 'gate',    label: 'PHASE 4 · QUALITY GATE',     color: '#f07178', steps: ['Step 4 · self_audit_11_checks'] },
  { key: 'persist', label: 'PHASE 5 · PERSIST',          color: '#c792ea', steps: ['Step 5 · dual_write_notion+md', 'Step 6 · decisions_log', 'Step 7 · learnings_conditional'] },
  { key: 'attr',    label: 'PATTERN ATTRIBUTION',         color: '#89ddff', steps: ['FILCO 2023', 'PaperTrail CHI 2026', 'Zettelkasten · Luhmann'] },
  { key: 'doctrine', label: 'DOCTRINE',                   color: '#d97757', steps: ['catalyst-not-synthesizer', 'user-authored > AI memory'] },
];

const BODY_SPECS = [
  { k: 'sections', v: '4 fixed (📝 รายละเอียด · 🗺 รูปธรรม · 🔬 ที่มา · 💡 ทำไมสำคัญ) + 1 optional (⚠️ ขอบเขต)' },
  { k: '📝 ceiling', v: '≤5 sentences · first ≤25 words · Feynman <100 words · anti-copy ≤30% verbatim' },
  { k: '🗺 rule', v: 'Mermaid diagram-bias · ≤10 nodes · color by semantic role' },
  { k: '🔬 mode', v: 'multi-anchor support · primary quote + optional secondary anchor when claims span sections' },
  { k: '💡 structure', v: 'asymmetric — Generic (1–2 bullets · flexible depth) + Operator-specific (≥2 bullets · STRICT 3–4 levels · 1 of 4 stop forms)' },
  { k: '⚠️ usage', v: 'optional · used when scope-bounded ("ใช้ได้: X / ไม่ใช้: Y")' },
  { k: 'audit', v: '11 checks pre-write · rejection rate >50% triggers honest report' },
  { k: 'output', v: 'Notion page + particles-md/<slug>.md (dual-write atomic)' },
];

// ═══════════════════════════════════════════════════════════════
// Knowledge graph — 22 nodes clustered by category
// ═══════════════════════════════════════════════════════════════
function CaseyGraph({ width = 760, height = 380 }) {
  const [tick, setTick] = React.useState(0);

  const CLUSTERS = React.useMemo(() => [
    { key: 'biz',  label: 'business-solopreneur', color: '#7cff9b', count: 4, cx: 0.22, cy: 0.34 },
    { key: 'pe',   label: 'prompt-engineering',   color: '#82aaff', count: 4, cx: 0.50, cy: 0.22 },
    { key: 'ai',   label: 'ai-agents',            color: '#c792ea', count: 4, cx: 0.78, cy: 0.34 },
    { key: 'eng',  label: 'engineering',          color: '#ffbd2e', count: 3, cx: 0.30, cy: 0.72 },
    { key: 'phil', label: 'philosophy',           color: '#d97757', count: 4, cx: 0.55, cy: 0.78 },
    { key: 'prod', label: 'productivity',         color: '#89ddff', count: 3, cx: 0.80, cy: 0.72 },
  ], []);

  const { nodes, edges, hubs } = React.useMemo(() => {
    const rnd = (() => {
      let s = 24;
      return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    })();
    const nodes = [];
    const hubs = [];
    let id = 0;
    CLUSTERS.forEach((cl) => {
      // hub center
      const hx = cl.cx * width;
      const hy = cl.cy * height;
      hubs.push({ id, x: hx, y: hy, color: cl.color, label: cl.label });
      const hubId = id;
      nodes.push({ id: id++, x: hx, y: hy, vx: 0, vy: 0, r: 9, color: cl.color, hub: true, cluster: cl.key });
      // satellites
      for (let i = 0; i < cl.count - 1; i++) {
        const a = (i / (cl.count - 1)) * Math.PI * 2 + rnd() * 0.4;
        const rad = 28 + rnd() * 18;
        nodes.push({
          id: id++,
          x: hx + Math.cos(a) * rad,
          y: hy + Math.sin(a) * rad,
          vx: 0, vy: 0, r: 4 + rnd() * 1.5, color: cl.color,
          hub: false, cluster: cl.key, hubId,
        });
      }
    });
    // edges: each satellite to its hub
    const edges = [];
    for (const n of nodes) {
      if (!n.hub) edges.push([n.hubId, n.id]);
    }
    // a few cross-cluster bridges (3 cross-refs)
    const hubIds = nodes.filter(n => n.hub).map(n => n.id);
    edges.push([hubIds[0], hubIds[1]]);
    edges.push([hubIds[1], hubIds[2]]);
    edges.push([hubIds[3], hubIds[4]]);
    edges.push([hubIds[4], hubIds[5]]);
    edges.push([hubIds[2], hubIds[5]]);
    return { nodes, edges, hubs };
  }, [CLUSTERS, width, height]);

  // gentle drift
  React.useEffect(() => {
    let raf;
    let t0 = 0;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000;
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        const phase = k * 0.4;
        n.vx = Math.cos(elapsed * 0.4 + phase) * 0.15;
        n.vy = Math.sin(elapsed * 0.35 + phase * 1.2) * 0.15;
        n.x += n.vx; n.y += n.vy;
      }
      setTick(t => t + 1);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [nodes]);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', background: '#000' }} aria-label="Casey knowledge graph — 22 particles in 6 category clusters">
      {/* cluster glow halos */}
      <defs>
        {CLUSTERS.map(cl => (
          <radialGradient key={cl.key} id={`halo-${cl.key}`}>
            <stop offset="0%" stopColor={cl.color} stopOpacity="0.18" />
            <stop offset="60%" stopColor={cl.color} stopOpacity="0.04" />
            <stop offset="100%" stopColor={cl.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      {CLUSTERS.map(cl => (
        <circle key={cl.key} cx={cl.cx * width} cy={cl.cy * height} r="72" fill={`url(#halo-${cl.key})`} />
      ))}
      {/* edges */}
      <g>
        {edges.map(([i, j], idx) => {
          const a = nodes[i], b = nodes[j];
          const sameCluster = a.cluster === b.cluster;
          return <line key={idx} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke={sameCluster ? a.color : '#3a3a3a'}
            strokeWidth={sameCluster ? 0.8 : 0.6}
            strokeDasharray={sameCluster ? '' : '3 3'}
            opacity={sameCluster ? 0.55 : 0.4} />;
        })}
      </g>
      {/* nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          {n.hub && <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke={n.color} strokeWidth="0.5" opacity="0.4" />}
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={n.hub ? 1 : 0.85}>
            {n.hub && <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />}
          </circle>
        </g>
      ))}
      {/* cluster labels */}
      {hubs.map((h, i) => (
        <text key={i} x={h.x} y={h.y + 26}
          fontFamily="'JetBrains Mono', monospace" fontSize="9"
          fill={h.color} textAnchor="middle" opacity="0.75"
          letterSpacing="0.5">
          {h.label}
        </text>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Without/With comparison diagram
// ═══════════════════════════════════════════════════════════════
function ComparisonDiagram({ c }) {
  const T = CaseyT;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
      background: T.border, border: `1px solid ${T.border}`,
    }} className="cs-phase-grid">
      {/* Without */}
      <div style={{ background: T.bgElev, padding: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: '#f07178', letterSpacing: 2, marginBottom: 18 }}>{c.figWithout}</div>
        {/* chaotic firehose visual */}
        <svg width="100%" height="120" viewBox="0 0 300 120" style={{ display: 'block', marginBottom: 18 }}>
          <defs>
            <radialGradient id="firehose">
              <stop offset="0%" stopColor="#f07178" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f07178" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 40 }).map((_, i) => {
            const seed = (i * 73 + 11) % 100 / 100;
            const seed2 = (i * 137 + 41) % 100 / 100;
            return (
              <circle key={i}
                cx={20 + seed * 260}
                cy={20 + seed2 * 80}
                r={1 + seed * 2.5}
                fill="#f07178"
                opacity={0.25 + seed * 0.45}
              />
            );
          })}
          {/* random scribble lines */}
          {Array.from({ length: 12 }).map((_, i) => {
            const seed = (i * 91 + 17) % 100 / 100;
            return (
              <path key={i}
                d={`M${20 + seed * 260} ${20 + ((i * 73) % 100)} Q${50 + seed * 220} ${60 + seed * 40} ${60 + seed * 220} ${30 + ((i * 47) % 80)}`}
                stroke="#f07178" strokeWidth="0.5" fill="none" opacity="0.3"
              />
            );
          })}
        </svg>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[c.figWithoutA, c.figWithoutB, c.figWithoutC, c.figWithoutD].map((t, i) => (
            <li key={i} style={{ fontFamily: T.mono, fontSize: 12, color: T.text, paddingLeft: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: '#f07178' }}>×</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      {/* With */}
      <div style={{ background: T.bgElev, padding: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.accent, letterSpacing: 2, marginBottom: 18 }}>{c.figWith}</div>
        {/* structured grid visual */}
        <svg width="100%" height="120" viewBox="0 0 300 120" style={{ display: 'block', marginBottom: 18 }}>
          {/* particles in a grid */}
          {Array.from({ length: 4 }).map((_, row) => (
            Array.from({ length: 6 }).map((_, col) => {
              const x = 25 + col * 45;
              const y = 18 + row * 28;
              const active = (row * 6 + col) < 22;
              return (
                <g key={`${row}-${col}`} opacity={active ? 1 : 0.2}>
                  <rect x={x - 8} y={y - 4} width="20" height="10" fill="none" stroke={T.accent} strokeWidth="0.6" opacity="0.5" />
                  <circle cx={x + 2} cy={y + 1} r="2" fill={T.accent} />
                </g>
              );
            })
          ))}
          {/* connecting lines */}
          <path d="M27 19 L72 19 M27 47 L117 19 M72 47 L117 75 M162 19 L207 47" stroke={T.accent} strokeWidth="0.4" fill="none" opacity="0.5" />
        </svg>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[c.figWithA, c.figWithB, c.figWithC, c.figWithD].map((t, i) => (
            <li key={i} style={{ fontFamily: T.mono, fontSize: 12, color: T.text, paddingLeft: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: T.accent }}>✓</span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Architecture diagram
// ═══════════════════════════════════════════════════════════════
function CaseyArch() {
  const T = CaseyT;
  const M = T.mono;
  return (
    <svg width="100%" viewBox="0 0 720 380" style={{ display: 'block' }} aria-label="Casey architecture diagram with 4 storage layers">
      <defs>
        <marker id="cArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={T.accent} />
        </marker>
        <marker id="cArrDim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={T.textDim} />
        </marker>
      </defs>

      {/* host */}
      <rect x="20" y="160" width="140" height="60" fill={T.bgElev} stroke={T.accent} strokeWidth="1" />
      <text x="90" y="186" fontFamily={M} fontSize="13" fill={T.textBright} textAnchor="middle" fontWeight="500">Claude Code</text>
      <text x="90" y="204" fontFamily={M} fontSize="10" fill={T.textDim} textAnchor="middle">host · orchestrator</text>

      {/* transport labels */}
      <text x="180" y="155" fontFamily={M} fontSize="9" fill={T.accent}>stdio</text>
      <text x="180" y="225" fontFamily={M} fontSize="9" fill={T.textDim}>https</text>
      <text x="180" y="300" fontFamily={M} fontSize="9" fill={T.textDim}>fs</text>

      {/* arrows from host */}
      <path d="M160 175 L240 100" stroke={T.accent} strokeWidth="1.2" fill="none" markerEnd="url(#cArr)" />
      <path d="M160 200 L240 200" stroke={T.textDim} strokeWidth="1" fill="none" markerEnd="url(#cArrDim)" />
      <path d="M160 215 L240 310" stroke={T.textDim} strokeWidth="1" fill="none" strokeDasharray="3 3" markerEnd="url(#cArrDim)" />

      {/* casey-mcp */}
      <rect x="240" y="60" width="160" height="80" fill={T.bgElev} stroke={T.accent} strokeWidth="1" />
      <text x="320" y="86" fontFamily={M} fontSize="12" fill={T.textBright} textAnchor="middle" fontWeight="500">casey-mcp</text>
      <text x="320" y="104" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">local · 9 tools</text>
      <text x="320" y="120" fontFamily={M} fontSize="9" fill={T.accent} textAnchor="middle">5 mem · 3 ingest · 1 remember</text>

      {/* notion mcp */}
      <rect x="240" y="170" width="160" height="60" fill={T.bgElev} stroke={T.border} strokeWidth="1" />
      <text x="320" y="196" fontFamily={M} fontSize="12" fill={T.textBright} textAnchor="middle" fontWeight="500">Notion MCP</text>
      <text x="320" y="214" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">remote · API</text>

      {/* filesystem */}
      <rect x="240" y="275" width="160" height="60" fill={T.bgElev} stroke={T.border} strokeWidth="1" />
      <text x="320" y="301" fontFamily={M} fontSize="12" fill={T.textBright} textAnchor="middle" fontWeight="500">filesystem</text>
      <text x="320" y="319" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">dual-write · audit trail</text>

      {/* arrows out to stores */}
      <path d="M400 90 L460 75" stroke={T.accent} strokeWidth="1" fill="none" markerEnd="url(#cArr)" />
      <path d="M400 200 L460 200" stroke={T.textDim} strokeWidth="1" fill="none" markerEnd="url(#cArrDim)" />
      <path d="M400 305 L460 305" stroke={T.textDim} strokeWidth="1" fill="none" markerEnd="url(#cArrDim)" />

      {/* memory.db */}
      <g>
        <rect x="460" y="40" width="240" height="84" fill={T.bgElev2} stroke={T.accentDim} strokeWidth="1" />
        <text x="475" y="60" fontFamily={M} fontSize="11" fill={T.textBright} fontWeight="500">memory.db</text>
        <text x="475" y="74" fontFamily={M} fontSize="9" fill={T.textDim}>sqlite-vec</text>
        <line x1="475" y1="80" x2="685" y2="80" stroke={T.border} />
        <text x="475" y="94" fontFamily={M} fontSize="9.5" fill={T.text}>├── sources</text>
        <text x="475" y="106" fontFamily={M} fontSize="9.5" fill={T.text}>├── learnings</text>
        <text x="475" y="118" fontFamily={M} fontSize="9.5" fill={T.text}>└── retrospectives</text>
      </g>

      {/* notion workspace */}
      <g>
        <rect x="460" y="160" width="240" height="80" fill={T.bgElev2} stroke={T.borderStrong} strokeWidth="1" />
        <text x="475" y="180" fontFamily={M} fontSize="11" fill={T.textBright} fontWeight="500">Notion workspace</text>
        <text x="475" y="194" fontFamily={M} fontSize="9" fill={T.textDim}>canonical view</text>
        <line x1="475" y1="200" x2="685" y2="200" stroke={T.border} />
        <text x="475" y="214" fontFamily={M} fontSize="9.5" fill={T.text}>├── Sources DB (metadata)</text>
        <text x="475" y="226" fontFamily={M} fontSize="9.5" fill={T.text}>└── Particles DB (bodies)</text>
      </g>

      {/* filesystem stores */}
      <g>
        <rect x="460" y="265" width="240" height="100" fill={T.bgElev2} stroke={T.borderStrong} strokeWidth="1" />
        <text x="475" y="285" fontFamily={M} fontSize="11" fill={T.textBright} fontWeight="500">repository</text>
        <text x="475" y="299" fontFamily={M} fontSize="9" fill={T.textDim}>grep-able · offline backup</text>
        <line x1="475" y1="305" x2="685" y2="305" stroke={T.border} />
        <text x="475" y="319" fontFamily={M} fontSize="9" fill={T.text}>particles-md/&lt;slug&gt;.md</text>
        <text x="475" y="331" fontFamily={M} fontSize="9" fill={T.text}>memory/decisions-log.md</text>
        <text x="475" y="343" fontFamily={M} fontSize="9" fill={T.text}>skills/*/learnings.md ← layer 1</text>
        <text x="475" y="355" fontFamily={M} fontSize="9" fill={T.text}>.claude/agents/casey.md ← layer 4</text>
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Page shell
// ═══════════════════════════════════════════════════════════════
function CaseyPage() {
  const [lang, setLang] = React.useState(() => {
    try {
      const url = new URL(location.href);
      return url.searchParams.get('lang') || localStorage.getItem('casey.lang') || 'th';
    } catch { return 'th'; }
  });
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('casey.theme') || 'dark'; } catch { return 'dark'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('casey.lang', lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  if (window.VesperTheme !== (theme === 'light' ? CASEY_LIGHT : CASEY_DARK)) {
    window.VesperTheme = theme === 'light' ? CASEY_LIGHT : CASEY_DARK;
  }
  React.useEffect(() => {
    try { localStorage.setItem('casey.theme', theme); } catch {}
    document.body.style.background = theme === 'light' ? CASEY_LIGHT.bg : CASEY_DARK.bg;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  const T = theme === 'light' ? CASEY_LIGHT : CASEY_DARK;
  const c = CASEY_COPY[lang];

  // sticky nav active
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
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 6px ${T.accent}`, animation: 'c-pulse 1.8s ease-in-out infinite' }} />
              v2.7.0 · live
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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
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
        <h1 style={{ fontSize: 72, fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1, color: T.textBright, margin: '0 0 24px' }}>
          {c.title}
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, color: T.text, maxWidth: 760, margin: '0 0 10px' }}>
          {c.subtitleA}
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: T.textDim, maxWidth: 760, margin: '0 0 28px' }}>
          {c.subtitleB}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {c.stack.map(s => (
            <span key={s} style={{ fontFamily: T.mono, fontSize: 12, color: T.text, border: `1px solid ${T.accentDim}55`, padding: '4px 10px' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* body grid */}
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

          {/* knowledge graph hero */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8,
            }}>
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: T.accent, boxShadow: `0 0 8px ${T.accent}`, animation: 'c-pulse 1.6s ease-in-out infinite' }} />
              {c.graphLabel}
            </div>
            <div style={{ border: `1px solid ${T.border}`, background: '#000', overflow: 'hidden' }}>
              <CaseyGraph />
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginTop: 10, textAlign: 'right' }}>
              {c.graphCaption}
            </div>
          </div>

          {/* 01 WHY */}
          <CaseySection id="why" kicker={c.whyKicker} title={c.whyTitle} T={T}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, background: T.accent, borderRadius: '50%' }} />
              fig.01 · without casey vs with casey
            </div>
            <div style={{ marginBottom: 28 }}>
              <img
                src="assets/casey-comparison.png"
                alt="Casey vs Vanilla LLM comparison diagram"
                className="cs-zoomable"
                onClick={() => window.csZoom && window.csZoom('assets/casey-comparison.png')}
                style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${T.border}` }}
              />
            </div>
            {c.whyBody.map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.65, color: T.text, margin: '0 0 16px', maxWidth: 700 }}>{p}</p>
            ))}
          </CaseySection>

          {/* 02 STEPS */}
          <CaseySection id="steps" kicker={c.stepsKicker} title={c.stepsTitle} T={T}>
            <img
              src="assets/casey-steps.png"
              alt="13 steps, 5 phases — single-pass extraction with self-audit"
              className="cs-zoomable"
              onClick={() => window.csZoom && window.csZoom('assets/casey-steps.png')}
              style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${T.border}` }}
            />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: T.text, maxWidth: 720, margin: '16px 0 0 0' }}>{c.stepsIntro}</p>
          </CaseySection>

          {/* 03 ARCHITECTURE */}
          <CaseySection id="arch" kicker={c.archKicker} title={c.archTitle} T={T}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 6, height: 6, background: T.accent, borderRadius: '50%' }} />
              fig.02 · system architecture
            </div>
            <div style={{ border: `1px solid ${T.border}`, background: T.bgElev, overflow: 'hidden' }}>
              <img
                src="assets/casey-arch.png"
                alt="Casey system architecture — 4 storage layers diagram"
                className="cs-zoomable"
                onClick={() => window.csZoom && window.csZoom('assets/casey-arch.png')}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: T.text, margin: '16px 0 0 0', maxWidth: 760 }}>{c.archCaption}</p>
          </CaseySection>

          {/* 04 BODY TEMPLATE */}
          <CaseySection id="body" kicker={c.bodyKicker} title={c.bodyTitle} T={T}>
            <img
              src="assets/casey-catalyst.png"
              alt="ปรัชญาการทำงาน: Catalyst ไม่ใช่ Synthesizer — Casey สร้าง raw material ให้ operator สังเคราะห์เอง"
              className="cs-zoomable"
              onClick={() => window.csZoom && window.csZoom('assets/casey-catalyst.png')}
              style={{ width: '100%', height: 'auto', display: 'block', border: `1px solid ${T.border}` }}
            />
            <p style={{ fontSize: 16, lineHeight: 1.65, color: T.text, margin: '16px 0 0 0', maxWidth: 720 }}>{c.bodyCaption}</p>
          </CaseySection>

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

function CaseySection({ id, kicker, title, sub, T, children }) {
  return (
    <section id={id} style={{ padding: '48px 0', borderTop: `1px solid ${T.border}` }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{kicker}</div>
      <h2 style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', color: T.textBright, margin: '0 0 20px', lineHeight: 1.2, maxWidth: 820 }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, lineHeight: 1.65, color: T.text, maxWidth: 720, margin: '0 0 24px' }}>{sub}</p>}
      {children}
    </section>
  );
}

Object.assign(window, { CaseyPage });
