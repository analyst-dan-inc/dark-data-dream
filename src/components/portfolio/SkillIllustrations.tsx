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
  // Star schema: fact at (262, 100), 4 dimensions N/S/E/W around it
  const factCx = 262;
  const factCy = 100;
  const dims = [
    { x: 262, y: 38 },  // top
    { x: 308, y: 100 }, // right
    { x: 262, y: 162 }, // bottom
    { x: 216, y: 100 }, // left
  ];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <GlassDefs id="dm" />

      {/* ambient orbs — left (chaos) & right (clarity) */}
      <circle cx="50" cy="100" r="60" fill="url(#dm-orb)" filter="url(#dm-blur)" opacity="0.5" />
      <circle cx="262" cy="100" r="78" fill="url(#dm-orb)" filter="url(#dm-blur)" opacity="0.85" />

      {/* ── LEFT — RAW SOURCES (3 stacked, slightly tilted) ───────── */}
      {/* CSV sheet */}
      <g transform="translate(14 22) rotate(-6)">
        <rect
          width="58"
          height="42"
          rx="6"
          fill="oklch(1 0 0 / 10%)"
          stroke="oklch(0.82 0.13 200 / 60%)"
          strokeWidth="1.4"
        />
        {[0, 1, 2].map((r) => (
          <line
            key={r}
            x1="5"
            x2="53"
            y1={12 + r * 10}
            y2={12 + r * 10}
            stroke="oklch(1 0 0 / 30%)"
            strokeWidth="1"
          />
        ))}
        {[0, 1, 2].map((c) => (
          <line
            key={c}
            x1={5 + (c + 1) * 13}
            x2={5 + (c + 1) * 13}
            y1="4"
            y2="38"
            stroke="oklch(1 0 0 / 24%)"
            strokeWidth="1"
          />
        ))}
        <circle cx="42" cy="16" r="2.6" fill="oklch(0.7 0.2 25)" />
      </g>

      {/* API braces tile */}
      <g transform="translate(20 78) rotate(4)" className="animate-float-slow">
        <rect
          width="52"
          height="38"
          rx="6"
          fill="oklch(1 0 0 / 10%)"
          stroke="oklch(0.7 0.18 285 / 65%)"
          strokeWidth="1.4"
        />
        <text
          x="26"
          y="26"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="20"
          fontWeight="700"
          fill="oklch(0.95 0.12 200)"
        >
          {`{ }`}
        </text>
      </g>

      {/* DB cylinder */}
      <g transform="translate(14 130) rotate(-3)">
        <ellipse
          cx="26"
          cy="6"
          rx="24"
          ry="5"
          fill="oklch(1 0 0 / 14%)"
          stroke="oklch(0.82 0.13 200 / 60%)"
          strokeWidth="1.4"
        />
        <path
          d="M2 6 L2 34 Q2 39 26 39 Q50 39 50 34 L50 6"
          fill="oklch(1 0 0 / 10%)"
          stroke="oklch(0.82 0.13 200 / 60%)"
          strokeWidth="1.4"
        />
        <ellipse cx="26" cy="14" rx="24" ry="5" fill="none" stroke="oklch(1 0 0 / 26%)" />
        <ellipse cx="26" cy="22" rx="24" ry="5" fill="none" stroke="oklch(1 0 0 / 20%)" />
        <circle cx="44" cy="2" r="2.6" fill="oklch(0.78 0.16 95)" />
      </g>

      {/* ── MIDDLE — TRANSFORMATION PIPELINE ──────────────────────── */}
      {/* converging flow lines from the 3 sources into CLEAN node */}
      <path
        d="M76 44 C 100 60, 120 80, 130 100"
        fill="none"
        stroke="url(#dm-stroke)"
        strokeWidth="1.6"
        strokeDasharray="3 4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M78 100 L 130 100"
        fill="none"
        stroke="url(#dm-stroke)"
        strokeWidth="1.6"
        strokeDasharray="3 4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M76 156 C 100 142, 120 120, 130 100"
        fill="none"
        stroke="url(#dm-stroke)"
        strokeWidth="1.6"
        strokeDasharray="3 4"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* CLEAN funnel node */}
      <g transform="translate(116 86)">
        <circle
          cx="14"
          cy="14"
          r="18"
          fill="oklch(1 0 0 / 8%)"
          stroke="oklch(0.82 0.13 200 / 70%)"
          strokeWidth="1.6"
        />
        <path
          d="M3 6 H25 L18 16 V24 L10 24 V16 Z"
          fill="oklch(0.82 0.13 200 / 50%)"
          stroke="oklch(0.95 0.12 200 / 95%)"
          strokeWidth="1.4"
        />
      </g>

      {/* SHAPE hex/gear node */}
      <g transform="translate(160 86)">
        <circle
          cx="14"
          cy="14"
          r="18"
          fill="oklch(1 0 0 / 8%)"
          stroke="oklch(0.7 0.18 285 / 70%)"
          strokeWidth="1.6"
        />
        <polygon
          points="14,2 24,7.5 24,20.5 14,26 4,20.5 4,7.5"
          fill="oklch(0.7 0.18 285 / 40%)"
          stroke="oklch(0.88 0.14 285)"
          strokeWidth="1.4"
        />
        <circle cx="14" cy="14" r="3.2" fill="oklch(0.95 0.12 200)" />
      </g>

      {/* link CLEAN → SHAPE */}
      <path
        d="M150 100 L 168 100"
        fill="none"
        stroke="url(#dm-stroke)"
        strokeWidth="1.6"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />

      {/* labels */}
      <text
        x="130"
        y="76"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="7"
        letterSpacing="2.2"
        fill="oklch(0.92 0.13 200 / 95%)"
      >
        CLEAN
      </text>
      <text
        x="174"
        y="76"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="7"
        letterSpacing="2.2"
        fill="oklch(0.85 0.16 285 / 95%)"
      >
        SHAPE
      </text>

      {/* travelling particles along the flow */}
      {[
        { cx: 100, cy: 70, d: 0 },
        { cx: 110, cy: 100, d: 0.3 },
        { cx: 100, cy: 130, d: 0.6 },
        { cx: 158, cy: 100, d: 0.9 },
        { cx: 196, cy: 100, d: 1.2 },
      ].map((p, i) => (
        <circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="2.4"
          fill="oklch(0.95 0.12 200)"
          className="animate-pulse-glow"
          style={{ animationDelay: `${p.d}s` }}
        />
      ))}

      {/* link SHAPE → STAR */}
      <path
        d="M194 100 L 216 100"
        fill="none"
        stroke="url(#dm-stroke)"
        strokeWidth="2"
        strokeDasharray="3 4"
        strokeLinecap="round"
      />

      {/* ── RIGHT — STAR SCHEMA ───────────────────────────────────── */}
      {/* connector lines fact ↔ dims */}
      {dims.map((d, i) => (
        <line
          key={i}
          x1={factCx}
          y1={factCy}
          x2={d.x}
          y2={d.y}
          stroke="oklch(0.82 0.13 200 / 65%)"
          strokeWidth="1.4"
          strokeDasharray="2 3"
        />
      ))}

      {/* fact table */}
      <g transform={`translate(${factCx - 25} ${factCy - 23})`}>
        <rect
          width="50"
          height="46"
          rx="6"
          fill="oklch(1 0 0 / 14%)"
          stroke="oklch(0.82 0.13 200 / 95%)"
          strokeWidth="2"
        />
        <rect width="50" height="13" rx="6" fill="oklch(0.82 0.13 200 / 60%)" />
        <text
          x="25"
          y="10"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="7"
          fontWeight="700"
          letterSpacing="1.6"
          fill="oklch(0.98 0.02 240)"
        >
          FACT
        </text>
        <line x1="5" x2="45" y1="20" y2="20" stroke="oklch(1 0 0 / 50%)" strokeWidth="1" />
        <line x1="5" x2="45" y1="27" y2="27" stroke="oklch(1 0 0 / 40%)" strokeWidth="1" />
        <line x1="5" x2="38" y1="34" y2="34" stroke="oklch(1 0 0 / 32%)" strokeWidth="1" />
        <line x1="5" x2="42" y1="41" y2="41" stroke="oklch(1 0 0 / 28%)" strokeWidth="1" />
      </g>

      {/* dimension tables */}
      {dims.map((d, i) => (
        <g key={i} transform={`translate(${d.x - 16} ${d.y - 12})`}>
          <rect
            width="32"
            height="24"
            rx="4"
            fill="oklch(1 0 0 / 12%)"
            stroke="oklch(0.7 0.18 285 / 80%)"
            strokeWidth="1.3"
          />
          <rect width="32" height="7" rx="4" fill="oklch(0.7 0.18 285 / 60%)" />
          <line x1="4" x2="28" y1="12" y2="12" stroke="oklch(1 0 0 / 38%)" strokeWidth="1" />
          <line x1="4" x2="22" y1="17" y2="17" stroke="oklch(1 0 0 / 30%)" strokeWidth="1" />
          <line x1="4" x2="25" y1="21" y2="21" stroke="oklch(1 0 0 / 24%)" strokeWidth="1" />
        </g>
      ))}

      {/* center pulse on fact */}
      <circle
        cx={factCx}
        cy={factCy}
        r="3.5"
        fill="oklch(0.95 0.12 200)"
        className="animate-pulse-glow"
      />
    </svg>
  );
}

