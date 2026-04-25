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
  // 4 dimension tables arranged around a central fact table at (160, 100)
  const dims = [
    { x: 160, y: 30, label: "DIM" }, // top
    { x: 270, y: 100, label: "DIM" }, // right
    { x: 160, y: 170, label: "DIM" }, // bottom
    { x: 50, y: 100, label: "DIM" }, // left
  ];
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" aria-hidden>
      <GlassDefs id="dm" />

      {/* glow orb behind the model */}
      <circle cx="160" cy="100" r="80" fill="url(#dm-orb)" filter="url(#dm-blur)" opacity="0.7" />

      {/* outer orbit ring */}
      <ellipse
        cx="160"
        cy="100"
        rx="120"
        ry="78"
        fill="none"
        stroke="oklch(1 0 0 / 10%)"
        strokeDasharray="2 5"
      />

      {/* connector lines fact ↔ dim (drawn first so tables sit on top) */}
      {dims.map((d, i) => (
        <line
          key={i}
          x1="160"
          y1="100"
          x2={d.x}
          y2={d.y}
          stroke="url(#dm-stroke)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
      ))}

      {/* travelling particles along the spokes (suggest "flow into the model") */}
      {dims.map((d, i) => {
        const t = 0.55; // position along the line, 0 = fact, 1 = dim
        const px = 160 + (d.x - 160) * t;
        const py = 100 + (d.y - 100) * t;
        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r="2.6"
            fill="oklch(0.92 0.12 200)"
            className="animate-pulse-glow"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        );
      })}

      {/* dimension tables */}
      {dims.map((d, i) => (
        <g key={i} transform={`translate(${d.x - 28} ${d.y - 22})`}>
          <rect
            width="56"
            height="44"
            rx="6"
            fill="url(#dm-glass)"
            stroke="oklch(1 0 0 / 35%)"
            strokeWidth="1.2"
          />
          {/* header */}
          <rect width="56" height="11" rx="6" fill="oklch(0.7 0.18 285 / 55%)" />
          <text
            x="28"
            y="8.5"
            textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif"
            fontSize="6.5"
            fontWeight="700"
            letterSpacing="1.5"
            fill="oklch(0.96 0.01 240)"
          >
            {d.label}
          </text>
          {/* column rows */}
          <line x1="6" x2="50" y1="19" y2="19" stroke="oklch(1 0 0 / 40%)" strokeWidth="1" />
          <line x1="6" x2="40" y1="26" y2="26" stroke="oklch(1 0 0 / 32%)" strokeWidth="1" />
          <line x1="6" x2="46" y1="33" y2="33" stroke="oklch(1 0 0 / 32%)" strokeWidth="1" />
          <line x1="6" x2="36" y1="40" y2="40" stroke="oklch(1 0 0 / 26%)" strokeWidth="1" />
        </g>
      ))}

      {/* fact table (center) — bigger & cyan accent */}
      <g transform="translate(122 70)">
        {/* outer halo */}
        <rect
          x="-4"
          y="-4"
          width="84"
          height="68"
          rx="10"
          fill="none"
          stroke="oklch(1 0 0 / 10%)"
          strokeWidth="1"
        />
        <rect
          width="76"
          height="60"
          rx="8"
          fill="url(#dm-glass)"
          stroke="oklch(0.82 0.13 200 / 95%)"
          strokeWidth="1.8"
        />
        {/* header */}
        <rect width="76" height="14" rx="8" fill="oklch(0.82 0.13 200 / 55%)" />
        <text
          x="38"
          y="10.5"
          textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="8"
          fontWeight="700"
          letterSpacing="2"
          fill="oklch(0.98 0.01 240)"
        >
          FACT
        </text>
        {/* column rows */}
        <line x1="8" x2="68" y1="24" y2="24" stroke="oklch(1 0 0 / 50%)" strokeWidth="1" />
        <line x1="8" x2="56" y1="32" y2="32" stroke="oklch(1 0 0 / 40%)" strokeWidth="1" />
        <line x1="8" x2="64" y1="40" y2="40" stroke="oklch(1 0 0 / 40%)" strokeWidth="1" />
        <line x1="8" x2="48" y1="48" y2="48" stroke="oklch(1 0 0 / 32%)" strokeWidth="1" />
        {/* small key indicator */}
        <circle cx="14" cy="24" r="2" fill="oklch(0.92 0.12 200)" opacity="0.95" />
        <circle cx="14" cy="32" r="2" fill="oklch(0.7 0.18 285)" opacity="0.85" />
      </g>

      {/* center pulse glow on top of fact header */}
      <circle
        cx="160"
        cy="77"
        r="3"
        fill="oklch(0.92 0.12 200)"
        opacity="0.95"
        className="animate-pulse-glow"
      />
    </svg>
  );
}
