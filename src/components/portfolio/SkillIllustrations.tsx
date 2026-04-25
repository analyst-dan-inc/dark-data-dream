/**
 * Glassmorphic SVG illustrations — one per skill.
 * Pure CSS/SVG, no external assets. Sized to fill their container.
 */

function GlassDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.18" />
        <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0.04" />
      </linearGradient>
      <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="oklch(0.82 0.13 200)" stopOpacity="0.85" />
        <stop offset="100%" stopColor="oklch(0.7 0.18 285)" stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id={`${id}-glow`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.82 0.13 200)" stopOpacity="0.9" />
        <stop offset="100%" stopColor="oklch(0.7 0.18 285)" stopOpacity="0.4" />
      </linearGradient>
      <radialGradient id={`${id}-orb`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="oklch(0.92 0.12 200)" stopOpacity="0.95" />
        <stop offset="60%" stopColor="oklch(0.78 0.14 215)" stopOpacity="0.45" />
        <stop offset="100%" stopColor="oklch(0.7 0.18 285)" stopOpacity="0" />
      </radialGradient>
      <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  );
}

export function DataVizIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <GlassDefs id="dv" />
      {/* glow orb */}
      <circle cx="240" cy="70" r="56" fill="url(#dv-orb)" filter="url(#dv-blur)" />
      {/* line graph */}
      <path
        d="M30 150 L80 110 L120 130 L160 80 L210 95 L270 50"
        fill="none"
        stroke="url(#dv-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [80, 110],
        [120, 130],
        [160, 80],
        [210, 95],
        [270, 50],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="oklch(0.92 0.12 200)"
          stroke="oklch(0.16 0.02 260)"
          strokeWidth="1.5"
        />
      ))}
      {/* glass bars */}
      {[
        { x: 30, h: 40 },
        { x: 70, h: 70 },
        { x: 110, h: 55 },
        { x: 150, h: 90 },
        { x: 190, h: 65 },
        { x: 230, h: 80 },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={180 - b.h}
            width="22"
            height={b.h}
            rx="4"
            fill="url(#dv-glass)"
            stroke="oklch(1 0 0 / 18%)"
            strokeWidth="1"
          />
          <rect
            x={b.x}
            y={180 - b.h}
            width="22"
            height="4"
            rx="2"
            fill="url(#dv-glow)"
            opacity="0.8"
          />
        </g>
      ))}
      {/* baseline */}
      <line x1="20" y1="180" x2="300" y2="180" stroke="oklch(1 0 0 / 12%)" strokeWidth="1" />
    </svg>
  );
}

export function ReportingIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <GlassDefs id="rp" />
      <circle cx="80" cy="160" r="60" fill="url(#rp-orb)" filter="url(#rp-blur)" opacity="0.7" />
      {/* back panel */}
      <g transform="translate(60 20)">
        <rect
          width="220"
          height="130"
          rx="12"
          fill="url(#rp-glass)"
          stroke="oklch(1 0 0 / 14%)"
          strokeWidth="1"
        />
        {/* header bar */}
        <rect width="220" height="22" rx="12" fill="oklch(1 0 0 / 6%)" />
        <circle cx="14" cy="11" r="3" fill="oklch(0.82 0.13 200)" />
        <circle cx="26" cy="11" r="3" fill="oklch(0.7 0.18 285)" />
        <rect x="40" y="7" width="80" height="8" rx="3" fill="oklch(1 0 0 / 18%)" />
        {/* KPI tiles */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${12 + i * 68} 36)`}>
            <rect
              width="60"
              height="36"
              rx="6"
              fill="oklch(1 0 0 / 6%)"
              stroke="oklch(1 0 0 / 10%)"
            />
            <rect x="8" y="8" width="22" height="5" rx="2" fill="oklch(0.82 0.13 200 / 70%)" />
            <rect x="8" y="19" width="36" height="9" rx="2" fill="oklch(1 0 0 / 22%)" />
          </g>
        ))}
        {/* mini chart */}
        <g transform="translate(12 84)">
          <rect width="196" height="38" rx="6" fill="oklch(1 0 0 / 5%)" />
          <path
            d="M8 28 L40 18 L72 24 L104 12 L136 20 L168 8 L188 14"
            fill="none"
            stroke="url(#rp-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>
      {/* front floating tile */}
      <g transform="translate(28 110)" className="animate-float-slow">
        <rect
          width="92"
          height="72"
          rx="10"
          fill="url(#rp-glass)"
          stroke="oklch(0.82 0.13 200 / 45%)"
          strokeWidth="1"
        />
        <rect x="10" y="12" width="40" height="6" rx="2" fill="oklch(1 0 0 / 30%)" />
        <text
          x="10"
          y="44"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="20"
          fontWeight="600"
          fill="oklch(0.92 0.12 200)"
        >
          +24%
        </text>
        <rect x="10" y="56" width="60" height="4" rx="2" fill="oklch(1 0 0 / 18%)" />
      </g>
    </svg>
  );
}

export function ETLIllustration() {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <GlassDefs id="etl" />
      <circle cx="160" cy="100" r="80" fill="url(#etl-orb)" filter="url(#etl-blur)" opacity="0.6" />
      {/* flow lines */}
      <path
        d="M70 100 C 110 60, 150 140, 250 100"
        fill="none"
        stroke="url(#etl-stroke)"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      <path
        d="M70 100 C 110 140, 150 60, 250 100"
        fill="none"
        stroke="url(#etl-stroke)"
        strokeWidth="1.5"
        strokeDasharray="2 8"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* nodes */}
      {[
        { cx: 60, cy: 100, label: "E" },
        { cx: 160, cy: 100, label: "T" },
        { cx: 260, cy: 100, label: "L" },
      ].map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r="28"
            fill="url(#etl-glass)"
            stroke="oklch(0.82 0.13 200 / 55%)"
            strokeWidth="1.2"
          />
          <circle cx={n.cx} cy={n.cy} r="34" fill="none" stroke="oklch(1 0 0 / 8%)" />
          <text
            x={n.cx}
            y={n.cy + 6}
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="18"
            fontWeight="700"
            fill="oklch(0.96 0.01 240)"
          >
            {n.label}
          </text>
        </g>
      ))}
      {/* particles */}
      {[110, 160, 210].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={100}
          r="2.5"
          fill="oklch(0.92 0.12 200)"
          className="animate-pulse-glow"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </svg>
  );
}

export function ProgrammingIllustration() {
  const langs = ["Py", "SQL", "xls", "PBI"];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <GlassDefs id="pg" />
      <circle cx="160" cy="100" r="70" fill="url(#pg-orb)" filter="url(#pg-blur)" />
      {/* orbit rings */}
      <ellipse
        cx="160"
        cy="100"
        rx="110"
        ry="42"
        fill="none"
        stroke="oklch(1 0 0 / 12%)"
        strokeDasharray="2 4"
      />
      <ellipse
        cx="160"
        cy="100"
        rx="80"
        ry="30"
        fill="none"
        stroke="oklch(0.82 0.13 200 / 25%)"
      />
      {/* center core */}
      <circle
        cx="160"
        cy="100"
        r="26"
        fill="url(#pg-glass)"
        stroke="oklch(0.82 0.13 200 / 60%)"
        strokeWidth="1.2"
      />
      <circle
        cx="160"
        cy="100"
        r="10"
        fill="oklch(0.92 0.12 200)"
        opacity="0.85"
        className="animate-pulse-glow"
      />
      {/* badges around */}
      {langs.map((label, i) => {
        const angle = (i / langs.length) * Math.PI * 2 - Math.PI / 2;
        const cx = 160 + Math.cos(angle) * 110;
        const cy = 100 + Math.sin(angle) * 42;
        return (
          <g key={label}>
            <rect
              x={cx - 22}
              y={cy - 14}
              width="44"
              height="28"
              rx="8"
              fill="url(#pg-glass)"
              stroke="oklch(1 0 0 / 22%)"
            />
            <text
              x={cx}
              y={cy + 5}
              textAnchor="middle"
              fontFamily="Space Grotesk, sans-serif"
              fontSize="12"
              fontWeight="600"
              fill="oklch(0.96 0.01 240)"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DataModelingIllustration() {
  // Star-schema dimension table positions around fact at (250, 100)
  const dims = [
    { x: 250, y: 42 },
    { x: 302, y: 100 },
    { x: 250, y: 158 },
    { x: 198, y: 100 },
  ];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <GlassDefs id="dm" />

      {/* ambient orbs */}
      <circle cx="60" cy="100" r="60" fill="url(#dm-orb)" filter="url(#dm-blur)" opacity="0.55" />
      <circle cx="250" cy="100" r="70" fill="url(#dm-orb)" filter="url(#dm-blur)" opacity="0.75" />

      {/* back panel for cohesion */}
      <rect
        x="10"
        y="20"
        width="300"
        height="160"
        rx="14"
        fill="url(#dm-glass)"
        stroke="oklch(1 0 0 / 14%)"
        strokeWidth="1"
      />

      {/* ── LEFT LANE — raw, messy sources ──────────────────────────── */}
      {/* CSV sheet */}
      <g transform="translate(22 38) rotate(-5)">
        <rect
          width="58"
          height="44"
          rx="5"
          fill="oklch(1 0 0 / 10%)"
          stroke="oklch(0.82 0.13 200 / 55%)"
          strokeWidth="1.2"
        />
        {[0, 1, 2, 3].map((r) => (
          <line
            key={r}
            x1="4"
            x2="54"
            y1={11 + r * 9}
            y2={11 + r * 9}
            stroke="oklch(1 0 0 / 28%)"
            strokeWidth="1"
          />
        ))}
        {[0, 1, 2].map((c) => (
          <line
            key={c}
            x1={4 + (c + 1) * 13}
            x2={4 + (c + 1) * 13}
            y1="4"
            y2="40"
            stroke="oklch(1 0 0 / 22%)"
            strokeWidth="1"
          />
        ))}
        <circle cx="42" cy="16" r="2.4" fill="oklch(0.7 0.2 25)" />
      </g>

      {/* API braces tile */}
      <g transform="translate(28 92) rotate(4)" className="animate-float-slow">
        <rect
          width="48"
          height="36"
          rx="5"
          fill="oklch(1 0 0 / 10%)"
          stroke="oklch(0.7 0.18 285 / 60%)"
          strokeWidth="1.2"
        />
        <text
          x="24"
          y="25"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="16"
          fontWeight="700"
          fill="oklch(0.95 0.12 200)"
        >
          {`{ }`}
        </text>
      </g>

      {/* DB cylinder */}
      <g transform="translate(22 138) rotate(-3)">
        <ellipse
          cx="26"
          cy="6"
          rx="24"
          ry="5"
          fill="oklch(1 0 0 / 14%)"
          stroke="oklch(0.82 0.13 200 / 55%)"
          strokeWidth="1.2"
        />
        <path
          d="M2 6 L2 32 Q2 38 26 38 Q50 38 50 32 L50 6"
          fill="oklch(1 0 0 / 10%)"
          stroke="oklch(0.82 0.13 200 / 55%)"
          strokeWidth="1.2"
        />
        <ellipse cx="26" cy="14" rx="24" ry="5" fill="none" stroke="oklch(1 0 0 / 24%)" />
        <ellipse cx="26" cy="22" rx="24" ry="5" fill="none" stroke="oklch(1 0 0 / 18%)" />
        <circle cx="44" cy="3" r="2.4" fill="oklch(0.78 0.16 95)" />
      </g>

      {/* ── MIDDLE LANE — transformation pipeline ────────────────────── */}
      <path
        d="M84 100 C 110 78, 140 122, 178 100"
        fill="none"
        stroke="url(#dm-stroke)"
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />

      {/* clean (funnel) node */}
      <g transform="translate(98 82)">
        <circle
          cx="14"
          cy="14"
          r="18"
          fill="oklch(1 0 0 / 8%)"
          stroke="oklch(0.82 0.13 200 / 65%)"
          strokeWidth="1.4"
        />
        <path
          d="M4 8 H24 L18 16 V22 L10 22 V16 Z"
          fill="oklch(0.82 0.13 200 / 45%)"
          stroke="oklch(0.92 0.12 200 / 90%)"
          strokeWidth="1.2"
        />
      </g>

      {/* shape (gear hex) node */}
      <g transform="translate(146 82)">
        <circle
          cx="14"
          cy="14"
          r="18"
          fill="oklch(1 0 0 / 8%)"
          stroke="oklch(0.7 0.18 285 / 65%)"
          strokeWidth="1.4"
        />
        <polygon
          points="14,2 24,8 24,20 14,26 4,20 4,8"
          fill="oklch(0.7 0.18 285 / 35%)"
          stroke="oklch(0.85 0.14 285 / 95%)"
          strokeWidth="1.2"
        />
        <circle cx="14" cy="14" r="3.2" fill="oklch(0.95 0.12 200)" />
      </g>

      {/* travelling particles */}
      {[
        { cx: 92, cy: 96 },
        { cx: 132, cy: 104 },
        { cx: 170, cy: 98 },
      ].map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="2.6"
          fill="oklch(0.95 0.12 200)"
          className="animate-pulse-glow"
          style={{ animationDelay: `${i * 0.45}s` }}
        />
      ))}

      {/* lane labels */}
      <text
        x="112"
        y="74"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="7"
        letterSpacing="2"
        fill="oklch(0.92 0.13 200 / 95%)"
      >
        CLEAN
      </text>
      <text
        x="160"
        y="74"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="7"
        letterSpacing="2"
        fill="oklch(0.85 0.16 285 / 95%)"
      >
        SHAPE
      </text>

      {/* ── RIGHT LANE — star schema ────────────────────────────────── */}
      {/* connector lines */}
      {dims.map((d, i) => (
        <line
          key={i}
          x1="250"
          y1="100"
          x2={d.x}
          y2={d.y}
          stroke="oklch(0.82 0.13 200 / 60%)"
          strokeWidth="1.2"
          strokeDasharray="2 3"
        />
      ))}

      {/* fact table */}
      <g transform="translate(228 80)">
        <rect
          width="44"
          height="40"
          rx="5"
          fill="oklch(1 0 0 / 12%)"
          stroke="oklch(0.82 0.13 200 / 90%)"
          strokeWidth="1.6"
        />
        <rect x="0" y="0" width="44" height="11" rx="5" fill="oklch(0.82 0.13 200 / 55%)" />
        <text
          x="22"
          y="8.5"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6"
          fontWeight="700"
          letterSpacing="1.5"
          fill="oklch(0.98 0.02 240)"
        >
          FACT
        </text>
        <line x1="5" x2="39" y1="18" y2="18" stroke="oklch(1 0 0 / 45%)" strokeWidth="1" />
        <line x1="5" x2="39" y1="25" y2="25" stroke="oklch(1 0 0 / 35%)" strokeWidth="1" />
        <line x1="5" x2="32" y1="32" y2="32" stroke="oklch(1 0 0 / 30%)" strokeWidth="1" />
      </g>

      {/* dimension tables */}
      {dims.map((d, i) => (
        <g key={i} transform={`translate(${d.x - 16} ${d.y - 14})`}>
          <rect
            width="32"
            height="28"
            rx="4"
            fill="oklch(1 0 0 / 10%)"
            stroke="oklch(0.7 0.18 285 / 75%)"
            strokeWidth="1.2"
          />
          <rect x="0" y="0" width="32" height="7" rx="4" fill="oklch(0.7 0.18 285 / 55%)" />
          <line x1="4" x2="28" y1="13" y2="13" stroke="oklch(1 0 0 / 35%)" strokeWidth="1" />
          <line x1="4" x2="22" y1="19" y2="19" stroke="oklch(1 0 0 / 28%)" strokeWidth="1" />
          <line x1="4" x2="25" y1="24" y2="24" stroke="oklch(1 0 0 / 22%)" strokeWidth="1" />
        </g>
      ))}

      {/* center pulse on fact */}
      <circle
        cx="250"
        cy="100"
        r="3.5"
        fill="oklch(0.95 0.12 200)"
        className="animate-pulse-glow"
      />
    </svg>
  );
}
