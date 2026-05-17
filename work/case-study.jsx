// work/case-study.jsx — Personal Second Brain case study
// Long-form scroll with sticky mini-nav, animated graph, EN/TH.

const T = new Proxy({}, { get: (_, k) => window.VesperTheme[k] });

// ═══════════════════════════════════════════════════════════════
// Copy (EN / TH)
// ═══════════════════════════════════════════════════════════════
const CS_COPY = {
  en: {
    backHome: '← back to portfolio',
    kicker: 'case study · v2.3.1',
    title: 'Personal Second Brain',
    subtitle: 'Let Claude read my Obsidian vault natively. Custom MCP server with 27 tools for semantic search and agentic knowledge retrieval.',
    stack: ['LLM', 'MCP', 'Obsidian', 'Python 3.14', 'FastMCP', 'SQLite + VectorDB'],
    nav: [
      { id: 'why', label: 'why' },
      { id: 'arch', label: 'architecture' },
      { id: 'tools', label: '27 tools' },
      { id: 'semantic', label: 'semantic' },
      { id: 'glance', label: 'at a glance' },
    ],
    // at a glance
    glanceKicker: '05 / at a glance',
    glanceTitle: 'The system in numbers',
    glance: [
      { v: '188', u: 'markdown notes' },
      { v: '2,795', u: 'semantic chunks' },
      { v: '27', u: 'MCP tools' },
      { v: '198', u: 'unique tags' },
      { v: '384', u: 'embedding dims' },
      { v: '1.1 MB', u: 'vault size' },
    ],
    // why
    whyKicker: '01 / why',
    whyTitle: 'Not just a chatbot — a coworker who remembers you, more each time.',
    whyBody: [
      'Three changes above didn\'t come from "smarter AI" — they came from giving Claude a place to remember.',
      'Before: every chat = a blank page. Vesper had to re-explain what he was working on, where, how far. Knowledge piled up only to vanish when the window closed.',
      'Now: Claude has a Vault to read — every note, past decisions, projects in flight. Not smarter than before. Just walks in with the context already loaded.',
      'Under the hood — Vault uses semantic search that filters on metadata first (date, tag, type), then runs vector match on what\'s left. Claude decides on its own when to search, when to open a note directly, when to walk the graph — not a fixed pipeline. All 27 tools run on local SQLite. No internet, no API key.',
    ],
    // architecture
    archKicker: '02 / architecture',
    archTitle: 'How the pieces fit',
    archCaption: 'Claude Desktop talks to the MCP server over stdio. The server owns the vault on disk and the SQLite vector index. All retrieval, writes, and graph operations flow through the 27 tools.',
    // tools
    toolsKicker: '03 / the 27 tools',
    toolsTitle: '27 tools, 8 categories',
    toolsSub: 'Every tool has one job and soft-fails loudly. Write tools auto-reindex their target; read tools return snippets with context.',
    // semantic
    semKicker: '04 / semantic search',
    semTitle: 'Normalized embeddings, cosine, pre-warmed',
    // security
    secKicker: '06 / security',
    secTitle: 'Boring by design',
    // timeline
    tlKicker: '07 / timeline',
    tlTitle: 'From first tool to production',
    // philosophy quote
    quote: '"Infrastructure first, so Claude can be a real collaborator."',
    quoteAuthor: 'Philosophy #1',
    quoteBody: '27 tools + normalized embeddings + auto-reindex + pre-warm = infrastructure any Claude session can pick up mid-stride.',
    footer: 'See the code on the portfolio home →',
  },
  th: {
    backHome: '← กลับหน้า portfolio',
    kicker: 'case study · v2.3.1',
    title: 'Personal Second Brain',
    subtitle: 'Claude อ่าน Obsidian vault ได้ตรง ๆ ผ่าน MCP server ที่สร้างเอง — 27 tools สำหรับ semantic search และการดึงความรู้แบบ agentic ที่ Claude ตัดสินใจเรียกเอง',
    stack: ['LLM', 'MCP', 'Obsidian', 'Python 3.14', 'FastMCP', 'SQLite + VectorDB'],
    nav: [
      { id: 'why', label: 'ทำไม' },
      { id: 'arch', label: 'architecture' },
      { id: 'tools', label: '27 tools' },
      { id: 'semantic', label: 'semantic' },
      { id: 'glance', label: 'ภาพรวม' },
    ],
    glanceKicker: '05 / ภาพรวม',
    glanceTitle: 'ระบบเป็นตัวเลข',
    glance: [
      { v: '188', u: 'markdown notes' },
      { v: '2,795', u: 'semantic chunks' },
      { v: '27', u: 'MCP tools' },
      { v: '198', u: 'แท็ก' },
      { v: '384', u: 'embedding dims' },
      { v: '1.1 MB', u: 'ขนาด vault' },
    ],
    whyKicker: '01 / ทำไม',
    whyTitle: 'AI ไม่ใช่แค่ chatbot, แต่เป็นเพื่อนร่วมงานที่จดจำคุณได้ดีขึ้นเรื่อยๆ',
    whyBody: [
      'สามจุดเปลี่ยนข้างบนนี้ไม่ได้เกิดจาก "AI ฉลาดขึ้น" — มันเกิดจาก Claude มีที่ให้เก็บความจำ',
      'ก่อนหน้า: ทุก chat = หน้ากระดาษเปล่า. เราต้องเริ่มเล่าใหม่ทุกครั้งว่ากำลังทำอะไร, ที่ไหน, ถึงไหน. ความรู้ที่สะสมหายตามหน้าต่างที่ปิด',
      'ตอนนี้: Claude มี Vault ให้อ่าน — โน้ตทั้งหมด, decision ที่ผ่านมา, project ที่ค้างอยู่. ไม่ได้ฉลาดกว่าเดิม แค่มีบริบทมาให้พร้อมใช้',
      'ส่วนเทคนิคเบื้องหลัง — Vault ใช้ semantic search ที่ filter ด้วย metadata ก่อน (date, tag, type) แล้วค่อย vector match. Claude เป็นคนตัดสินใจเองว่ารอบไหนจะ search, รอบไหนจะอ่านโน้ตตรง, รอบไหนจะเดินตาม graph link — ไม่ใช่ pipeline ตายตัว. 27 tools ทั้งหมดทำงานบน SQLite ในเครื่อง. ไม่ต้องต่อ internet, ไม่ต้องใช้ API key',
    ],
    archKicker: '02 / architecture',
    archTitle: 'แต่ละชิ้นเชื่อมกันยังไง',
    archCaption: 'Claude Desktop คุยกับ MCP server ผ่าน stdio (ส่งข้อความตรงระหว่าง process บนเครื่องเดียวกัน ไม่ผ่าน internet) — MCP server เป็นเจ้าของ vault ที่อยู่บนดิสก์และ SQLite vector index ที่เก็บ embeddings ทั้งการอ่าน การเขียน และการเดินตาม graph ของลิงก์ระหว่างโน้ต ทำผ่าน 27 tools ทั้งหมด',
    toolsKicker: '03 / 27 tools',
    toolsTitle: '27 tools, 8 หมวด',
    toolsSub: 'ทุก tool ทำหน้าที่เดียว ไม่ทำหลายอย่างปนกัน — ถ้าพังจะแจ้ง error ให้ชัด ไม่ซ่อนปัญหาเงียบ ๆ · tool ที่เขียนไฟล์จะ reindex ตัวเองอัตโนมัติ · tool ที่อ่านจะคืน snippet พร้อม context รอบ ๆ ให้เห็นที่มา',
    semKicker: '04 / semantic search',
    semTitle: 'Embedding แบบ normalize, cosine, pre-warm ตั้งแต่ start',
    secKicker: '06 / security',
    secTitle: 'น่าเบื่อแบบตั้งใจ',
    tlKicker: '07 / timeline',
    tlTitle: 'จาก tool ตัวแรก ถึง production',
    quote: '"Infrastructure first ให้ Claude เป็นคู่คิดที่แท้จริง"',
    quoteAuthor: 'Philosophy #1',
    quoteBody: '27 tools + normalized embeddings + auto-reindex + pre-warm = infrastructure ที่ Claude session ไหนก็ "สานต่อ" ได้ทันที',
    footer: 'ดู source บนหน้า portfolio →',
  },
};

// ═══════════════════════════════════════════════════════════════
// Data
// ═══════════════════════════════════════════════════════════════
const TOOL_CATEGORIES = [
  { key: 'read', label: 'READ', color: '#7cff9b', tools: ['ping', 'list_notes', 'read_note', 'search_by_filename', 'search_content', 'read_many', 'get_recent_notes'] },
  { key: 'write', label: 'WRITE', color: '#ffbd2e', tools: ['append_note', 'write_note', 'move_note', 'find_replace', 'insert_after_heading'] },
  { key: 'meta', label: 'FRONTMATTER / TAGS', color: '#c792ea', tools: ['update_frontmatter', 'tag_rename', 'get_notes_by_tag'] },
  { key: 'graph', label: 'GRAPH', color: '#82aaff', tools: ['get_backlinks', 'get_outgoing_links', 'audit_links'] },
  { key: 'project', label: 'PROJECT FILES', color: '#f07178', tools: ['list_project_files', 'read_project_file'] },
  { key: 'health', label: 'VAULT HEALTH', color: '#89ddff', tools: ['vault_stats'] },
  { key: 'semantic', label: 'SEMANTIC', color: '#d97757', tools: ['reindex_note', 'reindex_vault', 'semantic_search', 'build_context'] },
  { key: 'batch', label: 'BATCH', color: '#c3e88d', tools: ['session_opener', 'close_session'] },
];

const SEMANTIC_SPECS = [
  { k: 'model', v: 'paraphrase-multilingual-MiniLM-L12-v2' },
  { k: 'dimensions', v: '384 (normalized unit vectors)' },
  { k: 'similarity', v: 'true cosine · 1 − d²/2' },
  { k: 'threshold', v: '0.55 (empirical)' },
  { k: 'cold start', v: '17s (paid once at server boot)' },
  { k: 'warm write', v: '~1s (model cached)' },
  { k: 'storage', v: 'SQLite + sqlite-vec, .index/vault.db' },
];

const SECURITY_ITEMS = [
  { label: 'path validation', body: 'Every path resolved against vault root. No escape.' },
  { label: 'excluded folders', body: '.obsidian · .git · .trash' },
  { label: 'blocked files', body: '.env and similar secrets are never readable.' },
  { label: 'extension whitelist', body: '15 safe types — .md .py .json .toml .yaml .html .css .js .svg .conf .sh + Dockerfile' },
  { label: 'backup before overwrite', body: '99_Meta/mcp-backups/YYYY-MM-DD/ before any destructive write.' },
  { label: 'audit log', body: 'JSONL append-only — 99_Meta/mcp-audit/YYYY-MM.jsonl' },
];

const TIMELINE = [
  { v: 'v2.2.1',  d: '2026-04-11', m: 'MCP Phase 1 — first tools' },
  { v: 'v2.2.3',  d: '2026-04-12', m: 'Phase 3b + infrastructure philosophy' },
  { v: 'v2.2.18', d: '2026-04-17', m: 'Batch tools + pre-warm fix' },
  { v: 'v2.3.0',  d: '2026-04-17', m: 'Portfolio shipped to production', highlight: true },
  { v: 'v2.3.1',  d: '2026-04-17', m: 'MCP normalize + k3s preview lab', highlight: true },
];

// ═══════════════════════════════════════════════════════════════
// Animated force-directed graph
// Based on the Obsidian screenshot — colored hubs + black minor nodes
// ═══════════════════════════════════════════════════════════════
function ObsidianGraph({ width = 760, height = 440 }) {
  const ref = React.useRef(null);
  const [tick, setTick] = React.useState(0);

  // Stable node/edge set — generate once
  const { nodes, edges } = React.useMemo(() => {
    const rnd = (() => {
      let s = 42;
      return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    })();

    const COLORS = [
      { c: '#e11d48', r: 10 },    // red (hub)
      { c: '#e11cb6', r: 11 },    // magenta (hub)
      { c: '#2563eb', r: 9 },     // blue (hub)
      { c: '#4ade20', r: 9 },     // green (hub)
      { c: '#4ade20', r: 9 },     // green (hub) 2
      { c: '#e3531c', r: 8 },     // orange
      { c: '#e3531c', r: 6 },     // orange smaller
      { c: '#4ade20', r: 5 },     // green small
      { c: '#4ade20', r: 5 },
      { c: '#4ade20', r: 5 },
      { c: '#2563eb', r: 5 },     // blue small
    ];
    const cx = width / 2, cy = height / 2;
    const R = Math.min(width, height) * 0.42;
    const N = 130;
    const nodes = [];

    // Colored hubs near center
    COLORS.forEach((def, i) => {
      const a = (i / COLORS.length) * Math.PI * 2 + rnd() * 0.6;
      const rad = R * (0.15 + rnd() * 0.35);
      nodes.push({
        id: i, x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad,
        vx: 0, vy: 0, r: def.r, color: def.c, weight: 4 + rnd() * 3,
      });
    });
    // Black/gray body
    for (let i = COLORS.length; i < N; i++) {
      const a = rnd() * Math.PI * 2;
      const rad = R * (0.2 + Math.pow(rnd(), 0.5) * 0.85);
      nodes.push({
        id: i, x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad,
        vx: 0, vy: 0,
        r: 2.5 + rnd() * 2.5,
        color: rnd() < 0.08 ? '#9ca3af' : '#0a0a0a',
        weight: 1,
      });
    }

    // Edges — each node 2-5 nearest neighbours-ish (precomputed by distance)
    const edges = [];
    const MAX_EDGES_PER_NODE = 5;
    for (let i = 0; i < nodes.length; i++) {
      const dists = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        dists.push({ j, d: dx*dx + dy*dy });
      }
      dists.sort((a,b) => a.d - b.d);
      const k = 2 + Math.floor(rnd() * (MAX_EDGES_PER_NODE - 1));
      for (let n = 0; n < Math.min(k, dists.length); n++) {
        const j = dists[n].j;
        if (i < j) edges.push([i, j]);
      }
    }
    return { nodes, edges };
  }, [width, height]);

  // Physics loop
  React.useEffect(() => {
    let raf;
    let t0 = 0;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000;
      const cx = width / 2, cy = height / 2;
      const REPEL = 140;     // tune
      const SPRING = 0.0008;
      const CENTER = 0.0015;
      const DAMP = 0.86;
      const REST = 26;
      const JITTER = 0.09;   // constant low-amp wind to keep life (slower)

      // repulsion (sparse — only check within radius via brute force; fine for ~130 nodes)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx*dx + dy*dy + 0.01;
          if (d2 > 6000) continue; // cutoff
          const f = REPEL / d2;
          const d = Math.sqrt(d2);
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          a.vx -= fx; a.vy -= fy;
          b.vx += fx; b.vy += fy;
        }
      }
      // spring on edges
      for (const [i, j] of edges) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx*dx + dy*dy) + 0.01;
        const f = (d - REST) * SPRING;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx += fx; a.vy += fy;
        b.vx -= fx; b.vy -= fy;
      }
      // gentle centering + per-node drift (never fully settles)
      for (let k = 0; k < nodes.length; k++) {
        const n = nodes[k];
        n.vx += (cx - n.x) * CENTER;
        n.vy += (cy - n.y) * CENTER;
        // deterministic per-node low-frequency drift (keeps motion alive)
        const phase = k * 0.37;
        n.vx += Math.cos(elapsed * 0.3 + phase) * JITTER;
        n.vy += Math.sin(elapsed * 0.25 + phase * 1.3) * JITTER;
        n.vx *= DAMP; n.vy *= DAMP;
        n.x += n.vx; n.y += n.vy;
      }
      setTick(t => t + 1);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [nodes, edges, width, height]);

  return (
    <svg
      ref={ref}
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block', background: '#ffffff' }}
      aria-label="Obsidian vault graph — animated force-directed layout"
    >
      <g opacity="0.55">
        {edges.map(([i, j], idx) => {
          const a = nodes[i], b = nodes[j];
          return <line key={idx} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#9ecaff" strokeWidth="0.6" />;
        })}
      </g>
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r={n.r} fill={n.color} />
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Architecture diagram (inline SVG, static)
// ═══════════════════════════════════════════════════════════════
function ArchDiagram() {
  const mono = T.mono;
  const boxes = [
    { x: 40,  y: 110, w: 160, h: 72, title: 'Claude Desktop', sub: 'orchestrator · LLM', accent: true },
    { x: 260, y: 110, w: 140, h: 72, title: 'MCP Server',    sub: 'FastMCP · stdio' },
    { x: 470, y: 40,  w: 160, h: 64, title: 'Obsidian Vault', sub: '188 .md files' },
    { x: 470, y: 130, w: 160, h: 64, title: 'SQLite + vec',   sub: '.index/vault.db' },
    { x: 470, y: 220, w: 160, h: 64, title: 'Audit / Backup', sub: '99_Meta/' },
  ];
  return (
    <svg width="100%" viewBox="0 0 700 320" style={{ display: 'block' }} aria-label="MCP architecture diagram">
      <defs>
        <marker id="arrEnd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={T.accent} />
        </marker>
        <marker id="arrEndDim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={T.textDim} />
        </marker>
      </defs>

      {/* connecting lines FIRST (so boxes sit on top) */}
      <path d="M200 146 L260 146" stroke={T.accent} strokeWidth="1.5" markerEnd="url(#arrEnd)" />
      <text x="214" y="140" fontFamily={mono} fontSize="10" fill={T.textDim}>stdio</text>

      <path d="M400 130 Q435 80 470 72" stroke={T.textDim} strokeWidth="1" fill="none" strokeDasharray="3 3" markerEnd="url(#arrEndDim)" />
      <path d="M400 146 L470 161" stroke={T.textDim} strokeWidth="1" fill="none" markerEnd="url(#arrEndDim)" />
      <path d="M400 165 Q435 210 470 250" stroke={T.textDim} strokeWidth="1" fill="none" strokeDasharray="3 3" markerEnd="url(#arrEndDim)" />

      {/* tool annotation */}
      <text x="405" y="115" fontFamily={mono} fontSize="9" fill={T.textDim}>read_note</text>
      <text x="405" y="155" fontFamily={mono} fontSize="9" fill={T.textDim}>semantic_search</text>
      <text x="405" y="235" fontFamily={mono} fontSize="9" fill={T.textDim}>write (backup)</text>

      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={T.bgElev} stroke={b.accent ? T.accent : T.border} strokeWidth="1" />
          <text x={b.x + b.w / 2} y={b.y + 28} fontFamily={mono} fontSize="13" fill={T.textBright} textAnchor="middle" fontWeight="500">{b.title}</text>
          <text x={b.x + b.w / 2} y={b.y + 48} fontFamily={mono} fontSize="10" fill={T.textDim} textAnchor="middle">{b.sub}</text>
        </g>
      ))}

      {/* 27 tools callout */}
      <g transform="translate(260, 200)">
        <rect width="140" height="54" fill="none" stroke={T.border} strokeDasharray="2 3" />
        <text x="70" y="22" fontFamily={mono} fontSize="10" fill={T.textDim} textAnchor="middle">27 tools</text>
        <text x="70" y="40" fontFamily={mono} fontSize="9" fill={T.textDim} textAnchor="middle">read · write · graph · sem</text>
      </g>
    </svg>
  );
}

Object.assign(window, { CS_COPY, TOOL_CATEGORIES, SEMANTIC_SPECS, SECURITY_ITEMS, TIMELINE, ObsidianGraph, ArchDiagram });
