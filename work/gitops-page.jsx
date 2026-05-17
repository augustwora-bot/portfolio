// work/gitops-page.jsx — GitOps CI/CD Pipeline case study page
// Full Kubernetes + GitOps deployment system for snowinaugust.dev

const GxT = new Proxy({}, { get: (_, k) => window.VesperTheme[k] });

const GX_LIGHT = {
  bg: '#fafaf9', bgElev: '#ffffff', bgElev2: '#f5f5f4',
  border: '#e7e5e4', borderStrong: '#d6d3d1',
  textDim: '#57534e', text: '#292524', textBright: '#0a0a0a',
  accent: '#1f8f3d', accentDim: '#86efac',
  sans: "'Geist','IBM Plex Sans Thai',-apple-system,system-ui,sans-serif",
  mono: "'JetBrains Mono','Geist Mono',ui-monospace,SFMono-Regular,Menlo,monospace",
};
const GX_DARK = {
  bg: '#0a0a0a', bgElev: '#111111', bgElev2: '#171717',
  border: '#1f1f1f', borderStrong: '#2a2a2a',
  textDim: '#a0a0a0', text: '#e2e2e2', textBright: '#ffffff',
  accent: '#2da44e', accentDim: '#1a5d2c',
  sans: "'Geist','IBM Plex Sans Thai',-apple-system,system-ui,sans-serif",
  mono: "'JetBrains Mono','Geist Mono',ui-monospace,SFMono-Regular,Menlo,monospace",
};

// Stack-component colors (consistent across diagrams)
const GX_COLORS = {
  github:    '#2da44e',
  sonar:     '#549dd0',
  snyk:      '#4c4a73',
  docker:    '#2496ed',
  ghcr:      '#2496ed',
  argocd:    '#ef7b4d',
  k3s:       '#ffc61c',
  ingress:   '#82aaff',
  certmgr:   '#c792ea',
  lens:      '#7837d4',
  dns:       '#d97706',
};

// ═══════════════════════════════════════════════════════════════
// Copy
// ═══════════════════════════════════════════════════════════════
const GX_COPY = {
  en: {
    backHome: '← back to portfolio',
    kicker: 'case study · v0.2',
    title: 'GitOps CI/CD Pipeline',
    subtitleA: 'Full Kubernetes + GitOps deployment stack — infrastructure as portfolio. Every git push triggers automated quality checks, security scans, and a zero-downtime rolling update on k3s.',
    subtitleB: 'GitHub Actions · ArgoCD · k3s · cert-manager · the same pipeline powering snowinaugust.dev.',
    stack: ['Docker', 'GitHub Actions', 'SonarQube Cloud', 'Snyk', 'GHCR', 'ArgoCD', 'k3s', 'cert-manager', 'Lens'],
    nav: [
      { id: 'why',      label: 'why' },
      { id: 'arch',     label: 'architecture' },
      { id: 'stack',    label: 'locked stack' },
    ],
    diagramLabel: 'live · gitops topology',
    diagramCaption: '9 components · 1 cluster · sha-pinned images',
    whyKicker: '01 / why',
    whyTitle: 'Why GitOps? Because the infrastructure IS the portfolio.',
    whyBody: [
      'A static site does not need k3s — but a portfolio that showcases infrastructure has to show the stack, not just the page.',
      'GitOps makes Git the single source of truth — ArgoCD polls the repo every 3 minutes · cluster reconciles state from manifests · CI gates (Sonar + Snyk) block non-standard commits before production · rollback = git revert · audit = Git log',
      'All 9 stack components are running — one git push · 3 minutes later snowinaugust.dev is updated · zero manual steps · zero downtime',
    ],
    figBefore: 'MANUAL DEPLOY',
    figAfter: 'GITOPS PIPELINE',
    figBeforeA: 'ssh into VPS',
    figBeforeB: 'git pull · docker build',
    figBeforeC: 'docker restart (downtime)',
    figBeforeD: 'no audit trail',
    figAfterA: 'git push triggers pipeline',
    figAfterB: 'quality + CVE gates pre-build',
    figAfterC: 'rolling update (zero downtime)',
    figAfterD: 'every deploy traceable to a SHA',
    flowKicker: '02 / deploy flow',
    flowTitle: 'End-to-end: git push to live URL in one continuous pipeline.',
    flowIntro: '7 stages. Every stage is automated. The only human action is `git push` to main — everything downstream runs without intervention. If any gate fails (quality, CVE), the pipeline halts before the image hits the registry.',
    flowSteps: [
      { num: '1', actor: 'Laptop',         action: 'edit code + Dockerfile + k8s manifests',         color: '#e2e2e2' },
      { num: '2', actor: 'git push',       action: 'commit pushed to main on GitHub',                color: '#2da44e' },
      { num: '3', actor: 'GitHub Actions', action: 'Sonar quality gate · Snyk CVE scan (parallel)', color: '#549dd0' },
      { num: '4', actor: 'Docker build',   action: 'multi-stage build · tag :sha-<commit> · push to GHCR', color: '#2496ed' },
      { num: '5', actor: 'ArgoCD',         action: 'polls manifests repo (3 min) · detects new SHA · pulls image', color: '#ef7b4d' },
      { num: '6', actor: 'k3s cluster',    action: 'kubectl apply · rolling update · pods replaced one by one (zero downtime)', color: '#ffc61c' },
      { num: '7', actor: 'snowinaugust.dev', action: 'new version served via nginx-ingress + cert-manager SSL', color: '#d97706' },
    ],
    archKicker: '02 / architecture',
    archTitle: 'One cluster, three layers — source, control plane, runtime.',
    archCaption: 'Source layer (laptop + GitHub) is where code and manifests live · Control plane (GitHub Actions + ArgoCD) decides what gets built and deployed · Runtime (k3s pods + ingress) serves public traffic · Lens is read-only observability from the laptop — never used to apply changes.',
    stackKicker: '03 / locked stack',
    stackTitle: '9 components locked — each one earns its place.',
    stackRows: [
      { layer: 'Container',        choice: 'Docker',           purpose: 'package the app into an immutable image',           color: '#2496ed' },
      { layer: 'Image Registry',   choice: 'GHCR',             purpose: 'free, GitHub-native auth, no extra credential',     color: '#2496ed' },
      { layer: 'CI/CD',            choice: 'GitHub Actions',   purpose: 'build, scan, push, trigger ArgoCD sync',            color: '#2da44e' },
      { layer: 'Code Quality',     choice: 'SonarQube Cloud',  purpose: 'quality gate — blocks the merge if smells > N',     color: '#549dd0' },
      { layer: 'Security',         choice: 'Snyk',             purpose: 'scan dependencies for known CVEs before build',     color: '#4c4a73', textColor: '#c792ea' },
      { layer: 'Orchestration',    choice: 'k3s on VPS',       purpose: 'lightweight Kubernetes — control plane under 500 MB', color: '#ffc61c' },
      { layer: 'GitOps Controller',choice: 'ArgoCD',           purpose: 'declarative sync — git manifests are source of truth', color: '#ef7b4d' },
      { layer: 'Ingress + SSL',    choice: 'nginx-ingress + cert-manager', purpose: 'route public traffic · auto-provision TLS certs via Let\'s Encrypt', color: '#82aaff' },
      { layer: 'Observability',    choice: 'Lens (desktop)',   purpose: 'read-only cluster view from laptop via kubeconfig', color: '#7837d4' },
    ],
    glanceKicker: '05 / at a glance',
    glanceTitle: 'The system in numbers',
    glanceCells: [
      { v: '9',   u: 'stack components' },
      { v: '7',   u: 'pipeline stages' },
      { v: '0',   u: 'downtime per deploy' },
      { v: '3min',u: 'ArgoCD sync interval' },
      { v: '2',   u: 'security gates' },
      { v: '1',   u: 'human action (`git push`)' },
    ],
    footer: 'See the source on the portfolio →',
  },
  th: {
    backHome: '← กลับหน้า portfolio',
    kicker: 'case study · v0.2',
    title: 'GitOps CI/CD Pipeline',
    subtitleA: 'ระบบ deployment เต็มรูปแบบบน Kubernetes + GitOps — โครงสร้างพื้นฐานคือผลงาน · ทุกครั้งที่ git push ระบบจะตรวจสอบคุณภาพ สแกน CVE และ deploy แบบ rolling update บน k3s โดยไม่มี downtime',
    subtitleB: 'GitHub Actions · ArgoCD · k3s · cert-manager — pipeline เดียวกันที่ขับเคลื่อน snowinaugust.dev',
    stack: ['Docker', 'GitHub Actions', 'SonarQube Cloud', 'Snyk', 'GHCR', 'ArgoCD', 'k3s', 'cert-manager', 'Lens'],
    nav: [
      { id: 'why',      label: 'ทำไม' },
      { id: 'arch',     label: 'architecture' },
      { id: 'stack',    label: 'locked stack' },
    ],
    diagramLabel: 'live · gitops topology',
    diagramCaption: '9 components · 1 cluster · sha-pinned images',
    whyKicker: '01 / ทำไม',
    whyTitle: 'ทำไมต้อง GitOps? เพราะ infrastructure คือชิ้นงานของ portfolio',
    whyBody: [
      'static site ไม่จำเป็นต้องใช้ k3s — แต่ portfolio ที่จะแสดง infrastructure ต้องโชว์ stack เบื้องหลัง ไม่ใช่แค่หน้า site',
      'GitOps ทำให้ Git เป็น single source of truth — ArgoCD poll repo ทุก 3 นาที · cluster reconcile state ตาม manifest · CI gates (Sonar + Snyk) บล็อก commit ที่ผิด standard ก่อนถึง production · rollback = git revert · audit = Git log',
      'Stack ทั้ง 9 ตัวทำงานแล้ว — git push 1 ครั้ง · 3 นาทีต่อมา snowinaugust.dev อัปเดต · zero manual step · zero downtime',
    ],
    figBefore: 'MANUAL DEPLOY',
    figAfter: 'GITOPS PIPELINE',
    figBeforeA: 'ssh เข้า VPS',
    figBeforeB: 'git pull · docker build',
    figBeforeC: 'docker restart (downtime)',
    figBeforeD: 'ไม่มี audit trail',
    figAfterA: 'git push เริ่ม pipeline อัตโนมัติ',
    figAfterB: 'ตรวจ quality + CVE ก่อน build',
    figAfterC: 'rolling update (zero downtime)',
    figAfterD: 'ทุก deploy track กลับไปที่ SHA ได้',
    flowKicker: '02 / deploy flow',
    flowTitle: 'End-to-end: จาก git push ถึง live URL ใน pipeline เดียว',
    flowIntro: '7 stages · ทุก stage ทำงานอัตโนมัติ · มนุษย์ทำแค่ `git push` ไป main — ที่เหลือทั้งหมดทำงานเอง · ถ้า gate ใดล้มเหลว (quality, CVE) pipeline จะหยุดก่อนที่ image จะถูก push ขึ้น registry',
    flowSteps: [
      { num: '1', actor: 'Laptop',         action: 'แก้ code + Dockerfile + k8s manifests',           color: '#e2e2e2' },
      { num: '2', actor: 'git push',       action: 'commit ถูก push ไป main บน GitHub',               color: '#2da44e' },
      { num: '3', actor: 'GitHub Actions', action: 'Sonar quality gate · Snyk CVE scan (parallel)', color: '#549dd0' },
      { num: '4', actor: 'Docker build',   action: 'multi-stage build · tag :sha-<commit> · push ไป GHCR', color: '#2496ed' },
      { num: '5', actor: 'ArgoCD',         action: 'poll manifests repo (3 นาที) · detect SHA ใหม่ · pull image', color: '#ef7b4d' },
      { num: '6', actor: 'k3s cluster',    action: 'kubectl apply · rolling update · pods ถูก replace ทีละตัว (zero downtime)', color: '#ffc61c' },
      { num: '7', actor: 'snowinaugust.dev', action: 'version ใหม่ served ผ่าน nginx-ingress + cert-manager SSL', color: '#d97706' },
    ],
    archKicker: '02 / architecture',
    archTitle: '1 cluster · 3 ชั้น — source · control plane · runtime',
    archCaption: 'Source layer (laptop + GitHub) คือที่ที่ code และ manifests อยู่ · Control plane (GitHub Actions + ArgoCD) ตัดสินใจว่าจะ build อะไรและ deploy อะไร · Runtime (k3s pods + ingress) serve public traffic · Lens เป็น read-only observability จาก laptop — ไม่เคยใช้ apply changes',
    stackKicker: '03 / locked stack',
    stackTitle: '9 องค์ประกอบที่ lock ไว้ — แต่ละตัวมีเหตุผลของมัน',
    stackRows: [
      { layer: 'Container',        choice: 'Docker',           purpose: 'แพ็ค app เป็น immutable image',                       color: '#2496ed' },
      { layer: 'Image Registry',   choice: 'GHCR',             purpose: 'ฟรี · GitHub-native auth · ไม่ต้องใช้ credential เพิ่ม', color: '#2496ed' },
      { layer: 'CI/CD',            choice: 'GitHub Actions',   purpose: 'build · scan · push · trigger ArgoCD sync',          color: '#2da44e' },
      { layer: 'Code Quality',     choice: 'SonarQube Cloud',  purpose: 'quality gate — block merge ถ้า smells เกินที่กำหนด',     color: '#549dd0' },
      { layer: 'Security',         choice: 'Snyk',             purpose: 'scan dependencies หา CVE ก่อน build',                color: '#4c4a73', textColor: '#c792ea' },
      { layer: 'Orchestration',    choice: 'k3s on VPS',       purpose: 'lightweight Kubernetes — control plane ต่ำกว่า 500 MB', color: '#ffc61c' },
      { layer: 'GitOps Controller',choice: 'ArgoCD',           purpose: 'declarative sync — git manifests คือ source of truth', color: '#ef7b4d' },
      { layer: 'Ingress + SSL',    choice: 'nginx-ingress + cert-manager', purpose: 'route public traffic · auto-provision TLS certs via Let\'s Encrypt', color: '#82aaff' },
      { layer: 'Observability',    choice: 'Lens (desktop)',   purpose: 'read-only cluster view จาก laptop ผ่าน kubeconfig',   color: '#7837d4' },
    ],
    glanceKicker: '05 / ภาพรวม',
    glanceTitle: 'ระบบเป็นตัวเลข',
    glanceCells: [
      { v: '9',   u: 'stack components' },
      { v: '7',   u: 'pipeline stages' },
      { v: '0',   u: 'downtime ต่อ deploy' },
      { v: '3min',u: 'ArgoCD sync interval' },
      { v: '2',   u: 'security gates' },
      { v: '1',   u: 'human action (`git push`)' },
    ],
    footer: 'ดู source บนหน้า portfolio →',
  },
};

// ═══════════════════════════════════════════════════════════════
// Hero deploy pipeline — simplified flow diagram
// ═══════════════════════════════════════════════════════════════
function HeroPipeline({ T }) {
  const M = T.mono;
  const C = GX_COLORS;
  const ACC = T.accent;
  return (
    <svg width="100%" viewBox="0 0 760 260" style={{ display: 'block', background: '#000' }} aria-label="GitOps deploy pipeline — git push to production">
      <defs>
        <marker id="heroArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={ACC} />
        </marker>
      </defs>

      {/* Title */}
      <text x="380" y="24" fontFamily={M} fontSize="10" fill={ACC} textAnchor="middle" letterSpacing="2">GIT PUSH → PRODUCTION</text>

      {/* Stage 1: Laptop */}
      <g transform="translate(60, 60)">
        <rect width="100" height="52" fill={T.bgElev} stroke="#333" strokeWidth="1" />
        <text x="50" y="22" fontFamily={M} fontSize="10" fill={T.textBright} textAnchor="middle">💻 Laptop</text>
        <text x="50" y="38" fontFamily={M} fontSize="8" fill={T.textDim} textAnchor="middle">code + push</text>
      </g>

      {/* Stage 2: GitHub Actions */}
      <g transform="translate(200, 60)">
        <rect width="140" height="52" fill={T.bgElev} stroke={C.github} strokeWidth="1.5" />
        <text x="70" y="18" fontFamily={M} fontSize="10" fill={C.github} textAnchor="middle">GitHub Actions</text>
        <text x="70" y="32" fontFamily={M} fontSize="7.5" fill={T.textDim} textAnchor="middle">Sonar · Snyk · Build</text>
        <text x="70" y="44" fontFamily={M} fontSize="7.5" fill={T.textDim} textAnchor="middle">Push :sha-commit</text>
      </g>

      {/* Stage 3: GHCR */}
      <g transform="translate(380, 75)">
        <rect width="90" height="36" fill={T.bgElev} stroke={C.docker} strokeWidth="1" />
        <text x="45" y="18" fontFamily={M} fontSize="9" fill={C.docker} textAnchor="middle">GHCR</text>
        <text x="45" y="30" fontFamily={M} fontSize="7" fill={T.textDim} textAnchor="middle">registry</text>
      </g>

      {/* Stage 4: ArgoCD */}
      <g transform="translate(510, 60)">
        <rect width="110" height="52" fill={T.bgElev} stroke={C.argocd} strokeWidth="1.5" />
        <text x="55" y="18" fontFamily={M} fontSize="10" fill={C.argocd} textAnchor="middle">ArgoCD</text>
        <text x="55" y="32" fontFamily={M} fontSize="7.5" fill={T.textDim} textAnchor="middle">poll · pull</text>
        <text x="55" y="44" fontFamily={M} fontSize="7.5" fill={T.textDim} textAnchor="middle">kubectl apply</text>
      </g>

      {/* Stage 5: k3s cluster */}
      <g transform="translate(200, 160)">
        <rect width="280" height="64" fill={T.bgElev} stroke={C.k3s} strokeWidth="1.5" />
        <text x="140" y="22" fontFamily={M} fontSize="11" fill={C.k3s} textAnchor="middle">k3s cluster</text>
        <text x="140" y="38" fontFamily={M} fontSize="8" fill={T.textDim} textAnchor="middle">rolling update · zero downtime</text>
        <text x="140" y="52" fontFamily={M} fontSize="8" fill={T.textDim} textAnchor="middle">nginx-ingress + cert-manager</text>
      </g>

      {/* Stage 6: Live domain */}
      <g transform="translate(520, 175)">
        <rect width="140" height="34" fill={T.bgElev} stroke={C.dns} strokeWidth="1" />
        <text x="70" y="16" fontFamily={M} fontSize="10" fill={C.dns} textAnchor="middle">🌐</text>
        <text x="70" y="28" fontFamily={M} fontSize="9" fill={T.textBright} textAnchor="middle">snowinaugust.dev</text>
      </g>

      {/* Arrows */}
      <path d="M160 86 L200 86" stroke={ACC} strokeWidth="1.4" markerEnd="url(#heroArr)" />
      <path d="M340 86 L380 93" stroke={ACC} strokeWidth="1.4" markerEnd="url(#heroArr)" />
      <path d="M470 93 L510 86" stroke={ACC} strokeWidth="1.4" markerEnd="url(#heroArr)" />
      <path d="M565 112 L420 160" stroke={ACC} strokeWidth="1.4" markerEnd="url(#heroArr)" />
      <path d="M480 192 L520 192" stroke={ACC} strokeWidth="1.4" markerEnd="url(#heroArr)" />

      {/* Time annotations */}
      <g transform="translate(370, 48)">
        <text x="0" y="0" fontFamily={M} fontSize="7" fill={T.textDim}>~2min</text>
      </g>
      <g transform="translate(560, 145)">
        <text x="0" y="0" fontFamily={M} fontSize="7" fill={T.textDim}>3min poll</text>
      </g>

      {/* Live indicator */}
      <g transform="translate(680, 18)">
        <circle cx="0" cy="0" r="4" fill={ACC}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="10" y="3" fontFamily={M} fontSize="9" fill={ACC}>LIVE</text>
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Architecture topology — full 3-layer view
// ═══════════════════════════════════════════════════════════════
function GitOpsArchitecture({ T }) {
  const M = T.mono;
  const C = GX_COLORS;
  const ACC = T.accent;
  return (
    <svg width="100%" viewBox="0 0 760 380" style={{ display: 'block', background: '#000' }} aria-label="GitOps topology — 9 components in source / control plane / runtime layers">
      <defs>
        <marker id="gxArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={ACC} />
        </marker>
        <marker id="gxArrDim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill={T.textDim} />
        </marker>
      </defs>

      {/* layer labels */}
      <text x="20" y="22" fontFamily={M} fontSize="9" fill={T.textDim} letterSpacing="2">SOURCE</text>
      <text x="20" y="142" fontFamily={M} fontSize="9" fill={T.textDim} letterSpacing="2">CONTROL PLANE</text>
      <text x="20" y="262" fontFamily={M} fontSize="9" fill={T.textDim} letterSpacing="2">RUNTIME</text>

      {/* layer separators */}
      <line x1="0" y1="125" x2="760" y2="125" stroke="#1a1a1a" strokeWidth="1" />
      <line x1="0" y1="245" x2="760" y2="245" stroke="#1a1a1a" strokeWidth="1" />

      {/* SOURCE row */}
      <g>
        <rect x="60"  y="40" width="140" height="64" fill="#0a0a0a" stroke="#333" strokeWidth="1" />
        <text x="130" y="62" fontFamily={M} fontSize="11" fill={T.textBright} textAnchor="middle">💻 Laptop</text>
        <text x="130" y="80" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">code · manifests</text>
        <text x="130" y="94" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">Dockerfile</text>

        <rect x="310" y="40" width="140" height="64" fill="#0a0a0a" stroke={C.github} strokeWidth="1" />
        <text x="380" y="62" fontFamily={M} fontSize="11" fill={T.textBright} textAnchor="middle">☁️ GitHub Repo</text>
        <text x="380" y="80" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">source</text>
        <text x="380" y="94" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">+ k8s manifests</text>
      </g>
      <path d="M200 72 L310 72" stroke={ACC} strokeWidth="1.2" fill="none" markerEnd="url(#gxArr)" />
      <text x="255" y="65" fontFamily={M} fontSize="9" fill={ACC} textAnchor="middle">git push</text>

      {/* CONTROL PLANE row */}
      <g>
        <rect x="200" y="160" width="160" height="74" fill="#0a0a0a" stroke={C.github} strokeWidth="1" />
        <text x="280" y="180" fontFamily={M} fontSize="11" fill={C.github} textAnchor="middle">🔄 GitHub Actions</text>
        <text x="280" y="198" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">Sonar + Snyk gates</text>
        <text x="280" y="212" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">docker build</text>
        <text x="280" y="226" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">push :sha-{`<commit>`}</text>

        <rect x="400" y="160" width="120" height="74" fill="#0a0a0a" stroke={C.docker} strokeWidth="1" />
        <text x="460" y="180" fontFamily={M} fontSize="11" fill={C.docker} textAnchor="middle">📦 GHCR</text>
        <text x="460" y="198" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">container</text>
        <text x="460" y="210" fontFamily={M} fontSize="9" fill={T.textDim} textAnchor="middle">registry</text>

        <rect x="560" y="160" width="160" height="74" fill="#0a0a0a" stroke={C.argocd} strokeWidth="1" />
        <text x="640" y="180" fontFamily={M} fontSize="11" fill={C.argocd} textAnchor="middle">🎯 ArgoCD</text>
        <text x="640" y="198" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">poll 3min</text>
        <text x="640" y="212" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">pull manifests</text>
        <text x="640" y="226" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">kubectl apply</text>
      </g>
      <path d="M380 104 L280 160" stroke={ACC} strokeWidth="1.2" fill="none" markerEnd="url(#gxArr)" />
      <path d="M450 104 Q620 110 640 160" stroke={ACC} strokeWidth="1" fill="none" strokeDasharray="4 3" opacity="0.75" markerEnd="url(#gxArr)" />
      <text x="585" y="125" fontFamily={M} fontSize="8" fill={T.textDim} textAnchor="middle">pull manifests</text>
      <path d="M360 197 L400 197" stroke={ACC} strokeWidth="1.2" fill="none" markerEnd="url(#gxArr)" />
      <path d="M520 197 L560 197" stroke={ACC} strokeWidth="1.2" fill="none" markerEnd="url(#gxArr)" />

      {/* RUNTIME row */}
      <g>
        <rect x="200" y="270" width="180" height="78" fill="#0a0a0a" stroke={C.k3s} strokeWidth="1.5" />
        <text x="290" y="292" fontFamily={M} fontSize="11" fill={C.k3s} textAnchor="middle">🚀 k3s cluster</text>
        <text x="290" y="310" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">portfolio pods</text>
        <text x="290" y="324" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">rolling update</text>
        <text x="290" y="338" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">zero downtime</text>

        <rect x="400" y="270" width="160" height="78" fill="#0a0a0a" stroke={C.ingress} strokeWidth="1" />
        <text x="480" y="292" fontFamily={M} fontSize="11" fill={C.ingress} textAnchor="middle">🛡️ Ingress</text>
        <text x="480" y="310" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">nginx</text>
        <text x="480" y="324" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">+ cert-manager</text>
        <text x="480" y="338" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">Let's Encrypt SSL</text>

        <rect x="580" y="285" width="140" height="48" fill="#0a0a0a" stroke={C.dns} strokeWidth="1" />
        <text x="650" y="305" fontFamily={M} fontSize="11" fill={C.dns} textAnchor="middle">🌐</text>
        <text x="650" y="322" fontFamily={M} fontSize="9.5" fill={T.textBright} textAnchor="middle">snowinaugust.dev</text>
      </g>
      <path d="M620 234 Q500 252 320 270" stroke={ACC} strokeWidth="1.4" fill="none" markerEnd="url(#gxArr)" />
      <text x="460" y="262" fontFamily={M} fontSize="8" fill={T.textDim} textAnchor="middle">kubectl apply</text>
      <path d="M380 309 L400 309" stroke={ACC} strokeWidth="1.2" fill="none" markerEnd="url(#gxArr)" />
      <path d="M560 309 L580 309" stroke={ACC} strokeWidth="1.2" fill="none" markerEnd="url(#gxArr)" />

      {/* Lens — observability tap */}
      <rect x="60" y="270" width="120" height="62" fill="#0a0a0a" stroke={C.lens} strokeWidth="1" strokeDasharray="4 3" />
      <text x="120" y="292" fontFamily={M} fontSize="11" fill={C.lens} textAnchor="middle">🔭 Lens</text>
      <text x="120" y="308" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">read-only</text>
      <text x="120" y="322" fontFamily={M} fontSize="8.5" fill={T.textDim} textAnchor="middle">cluster view</text>
      <path d="M180 305 L200 305" stroke={C.lens} strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.7" markerEnd="url(#gxArrDim)" />

      {/* live indicator */}
      <g transform="translate(680, 22)">
        <circle cx="0" cy="0" r="4" fill={ACC}>
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <text x="10" y="3" fontFamily={M} fontSize="9" fill={ACC}>LIVE</text>
      </g>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// Manual vs GitOps comparison — simplified visual
// ═══════════════════════════════════════════════════════════════
function ManualVsGitOps({ c, T }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1,
      background: T.border, border: `1px solid ${T.border}`,
    }} className="gx-pipeline">
      {/* Manual */}
      <div style={{ background: T.bgElev, padding: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: '#f07178', letterSpacing: 2, marginBottom: 24, fontWeight: 500 }}>{c.figBefore}</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[c.figBeforeA, c.figBeforeB, c.figBeforeC, c.figBeforeD].map((t, i) => (
            <li key={i} style={{ fontFamily: T.sans, fontSize: 15, color: T.text, paddingLeft: 28, position: 'relative', lineHeight: 1.5 }}>
              <span style={{ position: 'absolute', left: 0, top: 2, fontSize: 18, color: '#f07178' }}>×</span>
              {t}
            </li>
          ))}
        </ul>
        <div style={{
          marginTop: 28, paddingTop: 20, borderTop: `1px solid ${T.border}`,
          fontFamily: T.mono, fontSize: 12, color: '#f07178',
        }}>
          ⚠ downtime · no audit trail
        </div>
      </div>
      {/* GitOps */}
      <div style={{ background: T.bgElev, padding: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2, marginBottom: 24, fontWeight: 500 }}>{c.figAfter}</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[c.figAfterA, c.figAfterB, c.figAfterC, c.figAfterD].map((t, i) => (
            <li key={i} style={{ fontFamily: T.sans, fontSize: 15, color: T.text, paddingLeft: 28, position: 'relative', lineHeight: 1.5 }}>
              <span style={{ position: 'absolute', left: 0, top: 2, fontSize: 18, color: T.accent }}>✓</span>
              {t}
            </li>
          ))}
        </ul>
        <div style={{
          marginTop: 28, paddingTop: 20, borderTop: `1px solid ${T.border}`,
          fontFamily: T.mono, fontSize: 12, color: T.accent,
        }}>
          ✓ zero downtime · full traceability
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Deploy flow — 7 stages timeline
// ═══════════════════════════════════════════════════════════════
function DeployFlow({ steps, T }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, background: T.bgElev }}>
      {steps.map((s, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '64px 200px 1fr',
          alignItems: 'center',
          borderBottom: (i < steps.length - 1) ? `1px solid ${T.border}` : 'none',
          minHeight: 64,
        }}>
          <div style={{
            fontFamily: T.mono, fontSize: 22, color: s.color,
            textAlign: 'center', borderRight: `1px solid ${T.border}`,
            padding: '14px 0', alignSelf: 'stretch',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            {s.num}
            {i < steps.length - 1 && (
              <div style={{
                position: 'absolute', bottom: -10, left: '50%',
                transform: 'translateX(-50%)',
                width: 1, height: 12, background: T.border,
              }} />
            )}
          </div>
          <div style={{
            fontFamily: T.mono, fontSize: 12, color: s.color,
            padding: '14px 18px', borderRight: `1px solid ${T.border}`,
            letterSpacing: 0.5,
            alignSelf: 'stretch', display: 'flex', alignItems: 'center',
          }}>
            {s.actor}
          </div>
          <div style={{
            fontFamily: T.mono, fontSize: 12.5, color: T.textBright,
            padding: '14px 20px', lineHeight: 1.5,
          }}>
            {s.action}
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Locked stack table
// ═══════════════════════════════════════════════════════════════
function LockedStack({ rows, T }) {
  return (
    <div style={{ border: `1px solid ${T.border}`, background: T.bgElev }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '160px 200px 1fr',
        borderBottom: `1px solid ${T.border}`,
        background: T.bgElev2,
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1.5, padding: '12px 18px', borderRight: `1px solid ${T.border}` }}>LAYER</div>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1.5, padding: '12px 18px', borderRight: `1px solid ${T.border}` }}>CHOICE</div>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: 1.5, padding: '12px 18px' }}>PURPOSE</div>
      </div>
      {rows.map((r, i) => (
        <div key={r.layer} style={{
          display: 'grid', gridTemplateColumns: '160px 200px 1fr',
          alignItems: 'center',
          borderBottom: (i < rows.length - 1) ? `1px solid ${T.border}` : 'none',
        }} className="gx-stack">
          <div style={{ fontFamily: T.mono, fontSize: 12, color: T.text, padding: '14px 18px', borderRight: `1px solid ${T.border}`, position: 'relative', alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: r.color }} />
            <span style={{ paddingLeft: 6 }}>{r.layer}</span>
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 12.5, color: r.textColor || r.color, padding: '14px 18px', borderRight: `1px solid ${T.border}`, fontWeight: 500, alignSelf: 'stretch', display: 'flex', alignItems: 'center' }}>
            {r.choice}
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 12.5, color: T.textBright, padding: '14px 18px', lineHeight: 1.5 }}>
            {r.purpose}
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Page shell
// ═══════════════════════════════════════════════════════════════
function GitOpsPage() {
  const [lang, setLang] = React.useState(() => {
    try {
      const url = new URL(location.href);
      return url.searchParams.get('lang') || localStorage.getItem('gitops.lang') || 'th';
    } catch { return 'th'; }
  });
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('gitops.theme') || 'dark'; } catch { return 'dark'; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('gitops.lang', lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  if (window.VesperTheme !== (theme === 'light' ? GX_LIGHT : GX_DARK)) {
    window.VesperTheme = theme === 'light' ? GX_LIGHT : GX_DARK;
  }
  React.useEffect(() => {
    try { localStorage.setItem('gitops.theme', theme); } catch {}
    document.body.style.background = theme === 'light' ? GX_LIGHT.bg : GX_DARK.bg;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  const T = theme === 'light' ? GX_LIGHT : GX_DARK;
  const c = GX_COPY[lang];

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
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, boxShadow: `0 0 6px ${T.accent}`, animation: 'gx-pulse 1.8s ease-in-out infinite' }} />
              v0.2 · spec locked
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
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 48 }} className="gx-body-grid">
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

          {/* deploy pipeline hero */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8, justifyContent: 'space-between',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: T.accent, boxShadow: `0 0 8px ${T.accent}`, animation: 'gx-pulse 1.6s ease-in-out infinite' }} />
                {c.diagramLabel}
              </span>
            </div>
            <div
              className="gx-zoomable"
              onClick={() => gxZoom('assets/gitops-flow.png')}
              style={{ border: `1px solid ${T.border}`, background: '#000', overflow: 'hidden' }}
            >
              <img src="assets/gitops-flow.png" alt="Deploy flow — 7 stages from git push to production" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* 01 WHY */}
          <GxSection id="why" kicker={c.whyKicker} title={c.whyTitle} T={T}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8, justifyContent: 'space-between',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, background: T.accent, borderRadius: '50%' }} />
                fig.01 · manual vs gitops
              </span>
            </div>
            <div
              className="gx-zoomable"
              onClick={() => gxZoom('assets/gitops-manual-vs.png')}
              style={{ border: `1px solid ${T.border}`, background: '#000', overflow: 'hidden', marginBottom: 28 }}
            >
              <img src="assets/gitops-manual-vs.png" alt="Manual deploy vs GitOps pipeline comparison" style={{ width: '100%', display: 'block' }} />
            </div>
            {c.whyBody.map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.65, color: T.text, margin: '0 0 16px', maxWidth: 720 }}>{p}</p>
            ))}
          </GxSection>

          {/* 03 ARCHITECTURE */}
          <GxSection id="arch" kicker={c.archKicker} title={c.archTitle} T={T}>
            <div style={{
              fontFamily: T.mono, fontSize: 11, color: T.accent, letterSpacing: 2,
              textTransform: 'uppercase', margin: '0 0 12px', display: 'flex',
              alignItems: 'center', gap: 8, justifyContent: 'space-between',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, background: T.accent, borderRadius: '50%' }} />
                fig.02 · three-layer architecture
              </span>
            </div>
            <div
              className="gx-zoomable"
              onClick={() => gxZoom('assets/gitops-arch.png')}
              style={{ border: `1px solid ${T.border}`, background: '#000', overflow: 'hidden', marginBottom: 16 }}
            >
              <img src="assets/gitops-arch.png" alt="GitOps architecture — 3 layers: source, control plane, runtime" style={{ width: '100%', display: 'block' }} />
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: T.text, maxWidth: 760, margin: 0 }}>{c.archCaption}</p>
          </GxSection>

          {/* 04 LOCKED STACK */}
          <GxSection id="stack" kicker={c.stackKicker} title={c.stackTitle} T={T}>
            <LockedStack rows={c.stackRows} T={T} />
          </GxSection>

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

function GxSection({ id, kicker, title, sub, T, children }) {
  return (
    <section id={id} style={{ padding: '48px 0', borderTop: `1px solid ${T.border}` }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{kicker}</div>
      <h2 style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.02em', color: T.textBright, margin: '0 0 20px', lineHeight: 1.2, maxWidth: 820 }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, lineHeight: 1.65, color: T.text, maxWidth: 720, margin: '0 0 24px' }}>{sub}</p>}
      {children}
    </section>
  );
}

Object.assign(window, { GitOpsPage });
