// mini-game.jsx — ASCII Snake / Vesper Edition
// Eat packets, grow, don't crash. Side panel: htop-style ghost monitor.

const COLS = 36;
const ROWS = 16;
const TICK_START = 160; // ms per move
const TICK_MIN = 70;
const SPEED_STEP = 4;   // shave ms per food eaten

const PACKETS = ['pkt', 'msg', 'log', 'req', 'ack', 'syn'];

const DIRS = {
  up:    { x: 0, y: -1 },
  down:  { x: 0, y: 1 },
  left:  { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const KEY_MAP = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  w: 'up', s: 'down', a: 'left', d: 'right',
  W: 'up', S: 'down', A: 'left', D: 'right',
  k: 'up', j: 'down', h: 'left', l: 'right',
};

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function MiniGame() {
  const T = window.useTheme ? window.useTheme() : window.VesperTheme;
  const [phase, setPhase] = React.useState('idle'); // idle | playing | done
  const [snake, setSnake] = React.useState([]);
  const [dir, setDir] = React.useState('right');
  const [food, setFood] = React.useState(null);
  const [packet, setPacket] = React.useState('pkt');
  const [score, setScore] = React.useState(0);
  const [tick, setTick] = React.useState(TICK_START);
  const [lastResult, setLastResult] = React.useState(null);
  const dirRef = React.useRef('right');
  const queueRef = React.useRef([]);
  const stageRef = React.useRef(null);

  const placeFood = React.useCallback((occupied) => {
    let pos;
    let tries = 0;
    do {
      pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      tries++;
    } while (occupied.some(s => s.x === pos.x && s.y === pos.y) && tries < 200);
    return pos;
  }, []);

  const start = () => {
    const initSnake = [
      { x: 8, y: Math.floor(ROWS / 2) },
      { x: 7, y: Math.floor(ROWS / 2) },
      { x: 6, y: Math.floor(ROWS / 2) },
    ];
    setSnake(initSnake);
    setDir('right');
    dirRef.current = 'right';
    queueRef.current = [];
    setFood(placeFood(initSnake));
    setPacket(PACKETS[Math.floor(Math.random() * PACKETS.length)]);
    setScore(0);
    setTick(TICK_START);
    setLastResult(null);
    setPhase('playing');
    setTimeout(() => stageRef.current && stageRef.current.focus(), 50);
  };

  // Game loop
  React.useEffect(() => {
    if (phase !== 'playing') return;
    const id = setInterval(() => {
      setSnake(prev => {
        if (queueRef.current.length > 0) {
          const next = queueRef.current.shift();
          const cur = dirRef.current;
          const opp = { up: 'down', down: 'up', left: 'right', right: 'left' };
          if (opp[cur] !== next) {
            dirRef.current = next;
            setDir(next);
          }
        }
        const d = DIRS[dirRef.current];
        const head = prev[0];
        const newHead = { x: head.x + d.x, y: head.y + d.y };

        if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
          finish(prev.length, score);
          return prev;
        }
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          finish(prev.length, score);
          return prev;
        }
        const ateFood = food && newHead.x === food.x && newHead.y === food.y;
        const next = ateFood ? [newHead, ...prev] : [newHead, ...prev.slice(0, -1)];

        if (ateFood) {
          setScore(s => s + 10);
          setTick(t => Math.max(TICK_MIN, t - SPEED_STEP));
          setFood(placeFood(next));
          setPacket(PACKETS[Math.floor(Math.random() * PACKETS.length)]);
        }
        return next;
      });
    }, tick);
    return () => clearInterval(id);
  }, [phase, tick, food, score, placeFood]);

  const finish = (length, finalScore) => {
    setLastResult({ score: finalScore, length });
    setPhase('done');
  };

  const onKey = (e) => {
    if (phase !== 'playing') return;
    const d = KEY_MAP[e.key];
    if (d) {
      e.preventDefault();
      if (queueRef.current.length < 2) queueRef.current.push(d);
    }
  };

  const grid = React.useMemo(() => {
    const cells = [];
    for (let y = 0; y < ROWS; y++) {
      const row = [];
      for (let x = 0; x < COLS; x++) {
        let kind = 'empty';
        if (food && food.x === x && food.y === y) kind = 'food';
        if (snake.some((s) => s.x === x && s.y === y)) {
          kind = snake[0].x === x && snake[0].y === y ? 'head' : 'body';
        }
        row.push(kind);
      }
      cells.push(row);
    }
    return cells;
  }, [snake, food]);

  return (
    <section style={{
      borderTop: `1px solid ${T.border}`,
      borderBottom: `1px solid ${T.border}`,
      background: T.bg,
      padding: '40px 32px',
    }}>
      <div className="mg-grid" style={{
        maxWidth: 1120, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 32,
      }}>
        <style>{`
          @media (max-width: 860px) {
            .mg-grid { grid-template-columns: 1fr !important; }
          }
          .mg-stage:focus { outline: none; }
          .mg-btn:hover { background: ${T.accent} !important; color: #0a0a0a !important; }
          @keyframes mg-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }
          @keyframes mg-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.55 } }
          .mg-food { animation: mg-pulse 0.8s ease-in-out infinite; }
        `}</style>

        {/* Game terminal */}
        <div style={{ background: T.bgElev, border: `1px solid ${T.border}` }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 14px', borderBottom: `1px solid ${T.border}`,
          }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: T.red }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: T.amber }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: T.green }} />
            <span style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim, marginLeft: 14, flex: 1 }}>
              snowinaugust@arena: ~/snake.sh
            </span>
            <span style={{ fontFamily: T.mono, fontSize: 11, color: phase === 'playing' ? T.accent : T.textDim }}>
              {phase === 'playing' ? `score ${score}` : phase === 'done' ? 'crashed' : 'idle'}
            </span>
          </div>

          <div style={{ padding: 22, fontFamily: T.mono, fontSize: 13 }}>
            {phase === 'idle' && (
              <div style={{ minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', position: 'relative', overflow: 'hidden' }}>
                {/* Pig mascot */}
                <div style={{
                  position: 'absolute', right: 18, bottom: 18,
                  opacity: 0.85, pointerEvents: 'none',
                }} aria-hidden="true">
                  {window.PigMascot ? <window.PigMascot size={140} color="#e8956b" /> : null}
                </div>
                <div style={{ color: T.text, marginBottom: 18 }}>
                  <span style={{ color: T.accent }}>$</span> ./snake.sh --start
                </div>
                <button onClick={start} className="mg-btn" style={{
                  fontFamily: T.mono, fontSize: 16,
                  background: 'transparent', color: T.textBright,
                  border: `1px solid ${T.accent}`,
                  padding: '16px 32px', cursor: 'pointer',
                  letterSpacing: 0.5, transition: 'all 150ms',
                }}>
                  ▸ click here to play!
                </button>
              </div>
            )}

            {phase !== 'idle' && (
              <div
                ref={stageRef}
                tabIndex={0}
                onKeyDown={onKey}
                onClick={() => stageRef.current && stageRef.current.focus()}
                className="mg-stage"
                style={{
                  fontFamily: T.mono,
                  lineHeight: 1.05,
                  letterSpacing: 0,
                  userSelect: 'none',
                  cursor: phase === 'playing' ? 'crosshair' : 'default',
                  background: T.bg,
                  border: `1px solid ${T.border}`,
                  padding: 14,
                  display: 'inline-block',
                  position: 'relative',
                }}
              >
                {grid.map((row, y) => (
                  <div key={y} style={{ display: 'flex', height: 16 }}>
                    {row.map((cell, x) => {
                      let ch = '·';
                      let color = T.border;
                      let cls = '';
                      if (cell === 'head') { ch = '◉'; color = T.accent; }
                      else if (cell === 'body') { ch = '█'; color = T.accent; }
                      else if (cell === 'food') { ch = '◆'; color = '#c792ea'; cls = 'mg-food'; }
                      return (
                        <span key={x} className={cls} style={{
                          width: 14, height: 16,
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: cell === 'body' ? 12 : 14,
                          color,
                        }}>{ch}</span>
                      );
                    })}
                  </div>
                ))}
                {phase === 'done' && lastResult && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(10,10,10,0.85)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 14,
                  }}>
                    <div style={{ fontFamily: T.mono, fontSize: 11, color: '#ff5f56', letterSpacing: 1 }}>
                      ✗ SEGFAULT
                    </div>
                    <div style={{ fontFamily: T.mono, fontSize: 32, color: T.accent, fontWeight: 600 }}>
                      {lastResult.score}
                    </div>
                    <div style={{ fontFamily: T.mono, fontSize: 11, color: T.textDim }}>
                      length {lastResult.length}
                    </div>
                    <button onClick={start} className="mg-btn" style={{
                      marginTop: 6, fontFamily: T.mono, fontSize: 12,
                      background: 'transparent', color: T.accent,
                      border: `1px solid ${T.accent}`,
                      padding: '8px 18px', cursor: 'pointer', letterSpacing: 0.5,
                    }}>
                      ▸ play again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {phase !== 'idle' && (
            <div style={{
              borderTop: `1px solid ${T.border}`,
              padding: '10px 22px',
              display: 'flex', gap: 24, fontFamily: T.mono, fontSize: 11, color: T.textDim,
            }}>
              <span><span style={{ color: T.accent }}>{score}</span> pts</span>
              <span><span style={{ color: T.textBright }}>{snake.length}</span> len</span>
              <span><span style={{ color: '#c792ea' }}>[{packet}]</span> next</span>
              <span style={{ marginLeft: 'auto', color: T.textDim }}>
                ←↑→↓ · wasd · hjkl
              </span>
            </div>
          )}
        </div>

        {/* htop ghost panel */}
        <HtopPanel
          gameActive={phase === 'playing'}
          snakeLen={snake.length}
          score={score}
        />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// htop-style ghost monitor — fake but plausible system stats
// ─────────────────────────────────────────────────────────────
function HtopPanel({ gameActive, snakeLen, score }) {
  const T = window.useTheme ? window.useTheme() : window.VesperTheme;
  const [, force] = React.useState(0);
  const tickRef = React.useRef(0);
  const startRef = React.useRef(Date.now() - (1800 + Math.random() * 40000) * 1000);

  React.useEffect(() => {
    const id = setInterval(() => {
      tickRef.current += 1;
      force(n => n + 1);
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const t = tickRef.current;
  const elapsed = (Date.now() - startRef.current) / 1000;
  const upH = Math.floor(elapsed / 3600);
  const upM = Math.floor((elapsed % 3600) / 60);
  const upS = Math.floor(elapsed % 60);
  const uptimeStr = `${String(upH).padStart(2, '0')}:${String(upM).padStart(2, '0')}:${String(upS).padStart(2, '0')}`;

  const cpu = clamp(
    11 + Math.sin(t * 0.31) * 5 + Math.sin(t * 0.83) * 3 + Math.random() * 3 + (gameActive ? snakeLen * 0.7 : 0),
    3, 99
  );
  const memUsed = clamp(
    2080 + Math.sin(t * 0.22) * 100 + Math.random() * 40 + (gameActive ? snakeLen * 12 : 0),
    1500, 7800
  );
  const memMax = 8192;
  const memPct = (memUsed / memMax) * 100;

  const netRx = clamp(
    140 + Math.sin(t * 0.41) * 70 + Math.random() * 30 + (gameActive ? score * 0.4 : 0),
    20, 900
  );
  const netPct = (netRx / 1024) * 100;

  const load1 = (cpu / 100 * 1.4 + Math.random() * 0.05).toFixed(2);
  const load5 = (parseFloat(load1) * 0.85 + 0.04).toFixed(2);
  const load15 = (parseFloat(load1) * 0.7 + 0.06).toFixed(2);

  const baseProcs = [
    { pid: 1842, base: 2.2,  mem: 412, name: 'mcp-server',       jitter: 1.4 },
    { pid: 1856, base: 0.9,  mem: 186, name: 'argocd-server',    jitter: 0.5 },
    { pid: 2287, base: 3.4,  mem: 224, name: 'snowinaugust-site', jitter: 1.8 },
    { pid: 2401, base: 0.4,  mem: 18,  name: 'cron',             jitter: 0.2 },
  ];
  const procs = baseProcs.map(p => ({
    ...p,
    cpu: clamp(p.base + (Math.random() - 0.5) * p.jitter * 2, 0, 100),
  }));
  if (gameActive) {
    procs.push({
      pid: 9999,
      cpu: clamp(8 + snakeLen * 0.6, 0, 100),
      mem: 48 + snakeLen * 6,
      name: 'snake.sh',
    });
  }
  procs.sort((a, b) => b.cpu - a.cpu);

  const bar = (pct, width = 22) => {
    const filled = Math.round((pct / 100) * width);
    const empty = width - filled;
    return { filled: '█'.repeat(filled), empty: '░'.repeat(empty) };
  };

  const cpuColor = cpu > 70 ? '#ff5f56' : cpu > 40 ? '#ffbd2e' : T.accent;
  const memColor = memPct > 70 ? '#ff5f56' : memPct > 50 ? '#ffbd2e' : T.accent;
  const cpuBar = bar(cpu);
  const memBar = bar(memPct);
  const netBar = bar(netPct);

  return (
    <div>
      <div style={{ fontFamily: T.mono, fontSize: 12, color: T.accent, letterSpacing: 0.5, marginBottom: 14 }}>
        // htop · vps-snowinaugust
      </div>
      <div style={{ background: T.bgElev, border: `1px solid ${T.border}`, padding: 16, fontFamily: T.mono, fontSize: 12, lineHeight: 1.55 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: T.textDim, marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
          <span>uptime <span style={{ color: T.textBright }}>{uptimeStr}</span></span>
          <span>load <span style={{ color: T.text }}>{load1} {load5} {load15}</span></span>
        </div>
        <Row label="CPU" T={T} color={cpuColor} bar={cpuBar} value={`${cpu.toFixed(1)}%`} />
        <Row label="MEM" T={T} color={memColor} bar={memBar} value={`${memUsed.toFixed(0)}M / ${memMax}M`} />
        <Row label="NET" T={T} color="#c792ea" bar={netBar} value={`${netRx.toFixed(0)} kb/s`} />
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '46px 50px 50px 1fr', gap: 8, color: T.textDim, fontSize: 10, marginBottom: 4, letterSpacing: 0.5 }}>
            <span>PID</span><span>CPU%</span><span>MEM</span><span>COMMAND</span>
          </div>
          {procs.map(p => (
            <div key={p.pid} style={{ display: 'grid', gridTemplateColumns: '46px 50px 50px 1fr', gap: 8, fontSize: 11, color: T.text, padding: '2px 0' }}>
              <span style={{ color: T.textDim }}>{p.pid}</span>
              <span style={{ color: p.cpu > 10 ? T.accent : T.text }}>{p.cpu.toFixed(1)}</span>
              <span>{p.mem}M</span>
              <span style={{ color: p.name === 'snake.sh' ? '#c792ea' : T.text }}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bar, color, T }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '38px 1fr 110px', gap: 10, alignItems: 'center', marginBottom: 5 }}>
      <span style={{ color: T.textDim, fontSize: 10, letterSpacing: 0.5 }}>{label}</span>
      <span style={{ fontSize: 11, letterSpacing: 0, whiteSpace: 'nowrap', overflow: 'hidden' }}>
        <span style={{ color: T.textDim }}>[</span>
        <span style={{ color }}>{bar.filled}</span>
        <span style={{ color: T.border }}>{bar.empty}</span>
        <span style={{ color: T.textDim }}>]</span>
      </span>
      <span style={{ color: T.textBright, fontSize: 10, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

window.MiniGame = MiniGame;
