// i18n.jsx — EN/TH copy + language context hook
// Reads ?lang= query, falls back to localStorage, defaults to 'en'.
// Writes both back on change. Also keeps <html lang> in sync.

const COPY = {
  en: {
    nav: { work: 'work', stack: 'stack', certs: 'certificates', writing: 'writing', contact: 'contact' },
    hero: {
      tag: 'docker · linux · mcp · multi-agent · ai-infra',
      pitch: 'VPS to Vector Store.',
      cta: 'Contact me',
      portraitLabel: 'portrait.png',
      terminal: {
        pitch: ['Linux Sysadmin building infrastructure for AI workflows', 'vault MCP · multi-agent specialists · autonomous agents on VPS', 'end-to-end · production · self-maintained'],
      },
    },
    about: {
      kicker: '01 / experience',
      title: 'Experience',
      operate: {
        label: 'System Engineer',
        lines: [
          'Deploy + Secure + Operate · 10+ production web apps (PHP 7.3 + 8.1)',
          'Multi-OS production · Ubuntu / CentOS / Windows Server',
          '2 hypervisors (VMware + Proxmox)',
          'Apache vhost + MySQL/MSSQL — config from scratch, a2ensite + reload',
          'Monthly maintenance reviews — uptime, log triage',
          'Full remote operation via SSH',
        ],
      },
      build: {
        label: 'AI Infrastructure',
        sublabel: 'Personal Projects',
        lines: [
          'MCP server + Obsidian — 27 tools · semantic search over 180+ notes (Personal Second Brain)',
          'Multi-agent system — 6 specialists with role-specific SKILLs',
          'Casey — bounded knowledge extraction · 3 dedicated SKILLs · 4-layer refinement loop',
          'Nova — autonomous YouTube intel scout on Claude Code Routine',
          '3 production bots on VPS — cron-scheduled',
          'Docker / k3s / ArgoCD — GitOps pipeline deploying this page (GitOps CI/CD)',
        ],
      },
    },
    work: {
      kicker: '02 / projects',
      title: 'Projects',
      sub: 'Three things running in production.',
      statusShipped: 'shipped',
      statusLive: 'live',
      statusProven: 'proven',
      statusMvp: 'mvp',
      projects: {
        p1: { title: 'GitOps CI/CD Pipeline', subtitle: 'snowinaugust.dev', subtitle2: 'GitHub Actions · ArgoCD · k3s cluster', desc: 'Git push triggers automated quality checks (Sonar + Snyk), builds Docker image tagged with commit SHA, and syncs to k3s cluster via ArgoCD with zero-downtime rolling updates. The same pipeline powering this site.' },
        p2: { title: 'Personal Second Brain', subtitle: 'MCP Server with Vector Search', subtitle2: 'FastMCP · sqlite-vec · 27 custom tools', desc: 'AI-powered Second Brain. Claude reads 150+ notes through a custom MCP server with semantic search, powered by Vector DB embeddings.\n\nStack: LLM + MCP + Vector DB + Python' },
        p3: { title: 'Casey', subtitle: 'Persistent Knowledge Extraction Agent', subtitle2: '13-step workflow · 11 audit checks · 21 binding rules', desc: 'Persistent knowledge extraction sub-agent on Claude Code. Pulls durable insight from PDF, YouTube, and markdown — dual-writes to Notion DB + filesystem with cross-references. 4-layer working memory that accumulates across sessions.' },
      },
    },
    stack: {
      kicker: '03 / stack',
      title: 'Stack',
      sub: '',
      groups: { languages: 'languages', infra: 'infra', ai: 'ai', tools: 'tools' },
      countSuffix: 'tools',
    },
    certs: {
      kicker: '04 / certificates',
      title: 'Certificates',
      sub: '',
      items: [
        { issuer: 'Anthropic Academy', provider: 'Skilljar', title: 'Claude 101', date: '2026', url: 'https://verify.skilljar.com/c/55o6ap9p2t7z', image: 'certs/anthropic-claude-101.png' },
        { issuer: 'Anthropic Academy', provider: 'Skilljar', title: 'Introduction to Model Context Protocol', date: '2026', url: 'https://verify.skilljar.com/c/qmzdnsjbubwk', image: 'certs/anthropic-mcp-intro.png' },
        { issuer: 'IBM', provider: 'Coursera', title: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift', date: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/YP6649JN61YD', image: 'certs/ibm-containers-docker-k8s.png' },
        { issuer: 'Google', provider: 'Coursera', title: 'AI Fundamentals', date: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/7FBO5IRK6D51', image: 'certs/google-ai-fundamentals.png' },
      ],
      verify: 'verify ↗',
    },
    writing: {
      kicker: '05 / writing',
      title: 'Writing',
      body: 'Studying in public — every lesson, every bug, every retrospective.',
      soon: 'YouTube channel · coming soon',
    },
    contact: {
      kicker: '06 / contact',
      title: 'Contact',
      sub: '',
      cta: 'Send email',
      or: 'or use the form',
      formName: 'name',
      formMsg: 'message',
      formSend: 'Send',
      formSent: 'Sent. I\'ll reply soon.',
    },
    footer: {
      built: 'Built on k3s via GitOps.',
      lang: 'EN',
    },
  },
  th: {
    nav: { work: 'ผลงาน', stack: 'เครื่องมือ', certs: 'ใบรับรอง', writing: 'บันทึก', contact: 'ติดต่อ' },
    hero: {
      tag: 'docker · linux · mcp · multi-agent · ai-infra',
      pitch: 'จาก VPS ถึง Vector Store',
      cta: 'ติดต่อเรา',
      portraitLabel: 'portrait.png',
      terminal: {
        pitch: ['Linux Sysadmin building infrastructure for AI workflows', 'vault MCP · multi-agent specialists · autonomous agents on VPS', 'end-to-end · production · self-maintained'],
      },
    },
    about: {
      kicker: '01 / experience',
      title: 'Experience',
      operate: {
        label: 'System Engineer',
        lines: [
          'Deploy + Secure + Operate · 10+ production web apps (PHP 7.3 + 8.1)',
          'Multi-OS production · Ubuntu / CentOS / Windows Server',
          '2 hypervisors (VMware + Proxmox)',
          'Apache vhost + MySQL/MSSQL — config from scratch, a2ensite + reload',
          'Monthly maintenance reviews — uptime, log triage',
          'Full remote operation via SSH',
        ],
      },
      build: {
        label: 'AI Infrastructure',
        sublabel: 'Personal Projects',
        lines: [
          'MCP server + Obsidian — 27 tools · semantic search over 180+ notes (Personal Second Brain)',
          'Multi-agent system — 6 specialists with role-specific SKILLs',
          'Casey — bounded knowledge extraction · 3 dedicated SKILLs · 4-layer refinement loop',
          'Nova — autonomous YouTube intel scout on Claude Code Routine',
          '3 production bots on VPS — cron-scheduled',
          'Docker / k3s / ArgoCD — GitOps pipeline deploying this page (GitOps CI/CD)',
        ],
      },
    },
    work: {
      kicker: '02 / projects',
      title: 'Projects',
      sub: '',
      statusShipped: 'shipped',
      statusLive: 'live',
      statusProven: 'proven',
      statusMvp: 'mvp',
      projects: {
        p1: { title: 'GitOps CI/CD Pipeline', subtitle: 'snowinaugust.dev', subtitle2: 'GitHub Actions · ArgoCD · k3s cluster', desc: 'Git push แล้วระบบตรวจสอบคุณภาพอัตโนมัติ (Sonar + Snyk) build Docker image tagged ด้วย commit SHA และ sync ไปยัง k3s cluster ผ่าน ArgoCD แบบ zero-downtime rolling update · pipeline เดียวกันที่ขับเคลื่อน site นี้' },
        p2: { title: 'Personal Second Brain', subtitle: 'MCP Server with Vector Search', subtitle2: 'FastMCP · sqlite-vec · 27 custom tools', desc: 'AI-powered Second Brain ให้ Claude อ่าน notes กว่า 150+ ผ่าน MCP server ของตัวเอง พร้อม semantic search ด้วย Vector DB embeddings\n\nStack: LLM + MCP + Vector DB + Python' },
        p3: { title: 'Casey', subtitle: 'Persistent Knowledge Extraction Agent', subtitle2: '13-step workflow · 11 audit checks · 21 binding rules', desc: 'Persistent knowledge extraction sub-agent บน Claude Code · สกัด durable insight จาก PDF, YouTube, markdown · dual-write ลง Notion DB + filesystem พร้อม cross-references · 4-layer working memory สะสม intelligence ข้าม sessions' },
      },
    },
    stack: {
      kicker: '03 / เครื่องมือ',
      title: 'Stack',
      sub: '',
      groups: { languages: 'ภาษา', infra: 'infra', ai: 'ai', tools: 'เครื่องมือ' },
      countSuffix: 'รายการ',
    },
    certs: {
      kicker: '04 / ใบรับรอง',
      title: 'ใบรับรอง',
      sub: '',
      items: [
        { issuer: 'Anthropic Academy', provider: 'Skilljar', title: 'Claude 101', date: '2026', url: 'https://verify.skilljar.com/c/55o6ap9p2t7z', image: 'certs/anthropic-claude-101.png' },
        { issuer: 'Anthropic Academy', provider: 'Skilljar', title: 'Introduction to Model Context Protocol', date: '2026', url: 'https://verify.skilljar.com/c/qmzdnsjbubwk', image: 'certs/anthropic-mcp-intro.png' },
        { issuer: 'IBM', provider: 'Coursera', title: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift', date: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/YP6649JN61YD', image: 'certs/ibm-containers-docker-k8s.png' },
        { issuer: 'Google', provider: 'Coursera', title: 'AI Fundamentals', date: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/7FBO5IRK6D51', image: 'certs/google-ai-fundamentals.png' },
      ],
      verify: 'ตรวจสอบ ↗',
    },
    writing: {
      kicker: '05 / บันทึก',
      title: 'บันทึก',
      body: 'เราเรียนรู้แบบเปิดเผย — ทุกบทเรียน ทุกบั๊ก ทุกบทสรุป',
      soon: 'YouTube channel · กำลังจะมา',
    },
    contact: {
      kicker: '06 / ติดต่อ',
      title: 'ติดต่อ',
      sub: '',
      cta: 'ส่งอีเมล',
      or: 'หรือกรอกฟอร์ม',
      formName: 'ชื่อ',
      formMsg: 'ข้อความ',
      formSend: 'ส่ง',
      formSent: 'ส่งแล้ว เดี๋ยวเราตอบกลับ',
    },
    footer: {
      built: 'Build บน k3s ผ่าน GitOps',
      lang: 'TH',
    },
  },
};

// Context
const LangContext = React.createContext({ lang: 'en', setLang: () => {}, t: COPY.en });

function LangProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'th' || q === 'en') return q;
      const ls = localStorage.getItem('vesper.lang');
      if (ls === 'th' || ls === 'en') return ls;
    } catch {}
    return 'en';
  });
  React.useEffect(() => {
    try {
      document.documentElement.lang = lang;
      localStorage.setItem('vesper.lang', lang);
      const url = new URL(window.location.href);
      if (lang === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    } catch {}
  }, [lang]);
  const setLang = React.useCallback((l) => setLangState(l), []);
  const t = COPY[lang] || COPY.en;
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

function useLang() { return React.useContext(LangContext); }

Object.assign(window, { COPY, LangContext, LangProvider, useLang });
