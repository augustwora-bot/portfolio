// pig-mascot.jsx — pixel animal mascots + cursor companion
// Random animal per page-load, same one used everywhere on the page.
// Exposes: PigMascot (back-compat — renders the spawned animal), CursorPig

(function () {
  // ─────────────────────────────────────────────────────────
  // Animal grids — 12 cols × 9 rows
  // 0 = transparent, 1 = body, 2 = eye, 3 = accent, 4 = beak/bill
  // ─────────────────────────────────────────────────────────
  const ANIMALS = {
    pig: {
      label: 'pig',
      body: '#e8956b', eye: '#0a0a0a', accent: '#d97757', beak: '#0a0a0a',
      grid: [
        [0,0,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,2,2,1,1,1,1,2,2,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,0,0,1,1,0,1,1],
        [1,1,0,1,1,0,0,1,1,0,1,1],
      ],
    },
    cat: {
      label: 'cat',
      body: '#d4a574', eye: '#0a0a0a', accent: '#ff9bb5', beak: '#0a0a0a',
      grid: [
        [1,1,1,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,0,0,0,0,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,2,1,1,1,1,2,1,1,0],
        [0,1,1,1,1,3,3,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,0,0,0,0,1,1,0,0],
        [0,0,1,1,0,0,0,0,1,1,0,0],
      ],
    },
    frog: {
      label: 'frog',
      body: '#7cb342', eye: '#0a0a0a', accent: '#558b2f', beak: '#0a0a0a',
      grid: [
        [0,1,1,0,0,0,0,0,0,1,1,0],
        [0,1,2,1,0,0,0,0,1,2,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,1,0],
        [1,1,0,1,1,0,0,1,1,0,1,1],
        [1,1,0,1,1,0,0,1,1,0,1,1],
      ],
    },
    duck: {
      label: 'duck',
      body: '#f5d142', eye: '#0a0a0a', accent: '#e0b020', beak: '#ff8a3c',
      grid: [
        [0,0,1,1,1,1,1,1,1,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,4],
        [1,1,2,1,1,1,1,1,2,1,4,4],
        [1,1,1,1,1,1,1,1,1,1,1,4],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,1,1,0,0,1,1,0,0,0],
        [0,0,0,1,1,0,0,1,1,0,0,0],
      ],
    },
    hedgehog: {
      label: 'hedgehog',
      body: '#c9a17a', eye: '#0a0a0a', accent: '#5d4332', beak: '#0a0a0a',
      grid: [
        [0,3,0,3,0,3,0,3,0,3,0,3],
        [3,3,3,3,3,3,3,3,3,3,3,3],
        [1,3,3,3,3,3,3,3,3,3,3,1],
        [1,1,3,3,3,3,3,3,3,3,1,1],
        [1,1,2,1,1,1,1,1,1,2,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,0,0,1,1,0,1,1],
        [1,1,0,1,1,0,0,1,1,0,1,1],
      ],
    },
  };

  const W = 12, H = 9;
  const KEYS = Object.keys(ANIMALS);

  // Pick once per page load. Stable everywhere on the page.
  function pickAnimal() {
    if (window.__petOfTheDay) return window.__petOfTheDay;
    const k = KEYS[Math.floor(Math.random() * KEYS.length)];
    window.__petOfTheDay = k;
    return k;
  }

  function AnimalMascot({ size = 96, model, style }) {
    const key = model || pickAnimal();
    const a = ANIMALS[key] || ANIMALS.pig;
    const px = size / W;
    const palette = { 1: a.body, 2: a.eye, 3: a.accent, 4: a.beak };
    const cells = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const v = a.grid[y][x];
        if (!v) continue;
        cells.push(
          <rect
            key={`${x},${y}`}
            x={x} y={y} width={1} height={1}
            fill={palette[v] || a.body}
          />
        );
      }
    }
    return (
      <svg
        width={size}
        height={H * px}
        viewBox={`0 0 ${W} ${H}`}
        style={{ shapeRendering: 'crispEdges', display: 'block', ...style }}
        aria-label={`${a.label} mascot`}
      >
        {cells}
      </svg>
    );
  }

  // ─────────────────────────────────────────────────────────
  // CursorPig — small mascot trailing the mouse with lag.
  // Hidden on touch + reduced-motion.
  // ─────────────────────────────────────────────────────────
  function CursorPig({ size = 36 }) {
    const [enabled, setEnabled] = React.useState(false);
    const [pos, setPos] = React.useState({ x: -200, y: -200 });
    const [facing, setFacing] = React.useState(1);
    const lastXRef = React.useRef(0);

    React.useEffect(() => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isCoarse || reduced) return;

      let raf = 0;
      let tx = 0, ty = 0;
      let cx = -200, cy = -200;
      const onMove = (e) => {
        if (!enabled) setEnabled(true);
        tx = e.clientX;
        ty = e.clientY;
      };
      const tick = () => {
        const dx = tx - cx;
        const dy = ty - cy;
        cx += dx * 0.08;
        cy += dy * 0.08;
        if (Math.abs(tx - lastXRef.current) > 1) {
          setFacing(tx > lastXRef.current ? 1 : -1);
          lastXRef.current = tx;
        }
        setPos({ x: cx, y: cy });
        raf = requestAnimationFrame(tick);
      };
      window.addEventListener('mousemove', onMove);
      raf = requestAnimationFrame(tick);
      return () => {
        window.removeEventListener('mousemove', onMove);
        cancelAnimationFrame(raf);
      };
    }, [enabled]);

    if (!enabled) return null;
    return (
      <div style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, 24px) scaleX(${facing})`,
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: 0.9,
        transition: 'transform 200ms ease',
        willChange: 'transform, left, top',
        filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
      }}>
        <AnimalMascot size={size} model="pig" />
      </div>
    );
  }

  // Back-compat: PigMascot now renders the page's spawned animal
  window.PigMascot = AnimalMascot;
  window.AnimalMascot = AnimalMascot;
  window.CursorPig = CursorPig;
  window.__petAnimals = KEYS;
})();
