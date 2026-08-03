import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";

type Tone = "red" | "gray";

type Segment = {
  key: string;
  title: string;
  items: string[];
  start: number;
  end: number;
  tone?: Tone;
};

const OUTER: Segment[] = [
  {
    key: "data-mgmt",
    title: "Data Management, Analytics & Engineering",
    items: [
      "Excel Data Management",
      "Excel Dashboard",
      "Power BI",
      "Python",
      "KNIME",
    ],
    start: 0,
    end: 90,
  },
  {
    key: "automation",
    title: "Automation",
    items: ["Power Automate", "Power Apps"],
    start: 90,
    end: 180,
  },
  {
    key: "cyber",
    title: "Cybersecurity",
    items: [
      "CompTIA Security Analyst",
      "CompTIA Security+",
      "CompTIA A+ Cyber",
      "CompTIA Pentest+",
      "CompTIA Security Pro",
      "CompTIA Security X",
      "Nexus",
    ],
    start: 180,
    end: 270,
  },
  {
    key: "ai",
    title: "Artificial Intelligence",
    items: [
      "AI Business",
      "AI Executive",
      "AI Cloud",
      "AI Security",
      "AI Developers",
    ],
    start: 270,
    end: 360,
  },
];

const INNER: Segment[] = [
  {
    key: "service-mgmt",
    title: "Service Management",
    items: ["ITIL", "ITSM"],
    tone: "gray",
    start: 0,
    end: 90,
  },
  {
    key: "project-mgmt",
    title: "Project Management",
    items: [
      "IT Project Management",
      "Certified Associated Project Manager",
      "Project Management Professional",
      "PRINCE2",
    ],
    tone: "red",
    start: 90,
    end: 180,
  },
  {
    key: "enterprise-arch",
    title: "Enterprise Architecture",
    items: ["TOGAF"],
    tone: "gray",
    start: 180,
    end: 270,
  },
  {
    key: "governance",
    title: "Governance Control, Risk Management",
    items: ["COBIT", "CGEIT", "CRISC", "CISA"],
    tone: "red",
    start: 270,
    end: 360,
  },
];

const CORE: Segment = {
  key: "core",
  title: "People Skill Development",
  items: [
    "Structured certification pathways for every discipline",
    "Blended learning: instructor-led, self-paced & hands-on labs",
    "Progress tracked against role-based competency levels",
  ],
  start: 0,
  end: 360,
};

const TONE: Record<Tone, { fill: string; text: string }> = {
  red: { fill: "#DD3452", text: "#ffffff" },
  gray: { fill: "#59595B", text: "#ffffff" },
};

const CX = 200;
const CY = 200;

function polar(r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
}

function donutPath(
  rOuter: number,
  rInner: number,
  start: number,
  end: number,
  pad = 1.4,
) {
  const sA = start + pad;
  const eA = end - pad;
  const large = eA - sA <= 180 ? 0 : 1;
  const p1 = polar(rOuter, sA);
  const p2 = polar(rOuter, eA);
  const p3 = polar(rInner, eA);
  const p4 = polar(rInner, sA);
  return `M ${p1.x} ${p1.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rInner} ${rInner} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

function textArcPath(r: number, start: number, end: number, pad = 6) {
  const mid = (start + end) / 2;
  const bottom = mid > 90 && mid < 270;
  const sA = start + pad;
  const eA = end - pad;
  const a = bottom ? eA : sA;
  const b = bottom ? sA : eA;
  const large = Math.abs(b - a) <= 180 ? 0 : 1;
  const sweep = bottom ? 0 : 1;
  const p1 = polar(r, a);
  const p2 = polar(r, b);
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} ${sweep} ${p2.x} ${p2.y}`;
}

/**
 * Wrap a segment title into multiple lines for arc rendering.
 * Breaks first at commas (natural boundaries), then by word length.
 */
function wrapArcTitle(title: string, maxLen = 16): string[] {
  const lines: string[] = [];
  for (const part of title.split(",")) {
    const words = part.trim().split(/\s+/).filter(Boolean);
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= maxLen) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

/**
 * Radius for a given line index, centered radially around the ring center
 * so multi-line text stays visually balanced inside the ring band.
 */
function lineRadius(
  centerR: number,
  lineIndex: number,
  lineCount: number,
  spacing: number,
) {
  const offset = (lineCount - 1) / 2 - lineIndex;
  return centerR + offset * spacing;
}

export default function FrameworkWheel() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const active: Segment | undefined =
    activeKey === "core"
      ? CORE
      : (OUTER.find((o) => o.key === activeKey) ??
        INNER.find((i) => i.key === activeKey));

  const toggle = (key: string) => setActiveKey((k) => (k === key ? null : key));

  // Pre-wrapped titles for arc rendering (longer max for outer as arcs are wider)
  const outerWrapped = OUTER.map((s) => ({
    seg: s,
    lines: wrapArcTitle(s.title, 17),
  }));
  const innerWrapped = INNER.map((s) => ({
    seg: s,
    lines: wrapArcTitle(s.title, 15),
  }));

  // Ring geometry
  const OUTER_CENTER_R = 177.5;
  const OUTER_SPACING = 9;
  const INNER_CENTER_R = 125;
  const INNER_SPACING = 9;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-center">
      <div className="mx-auto w-full lg:col-span-4">
        <svg viewBox="0 0 400 400" className="w-full h-auto select-none">
          <defs>
            {outerWrapped.map(({ seg, lines }) =>
              lines.map((_, lineIndex) => (
                <path
                  key={`to-${seg.key}-${lineIndex}`}
                  id={`arc-${seg.key}-${lineIndex}`}
                  d={textArcPath(
                    lineRadius(
                      OUTER_CENTER_R,
                      lineIndex,
                      lines.length,
                      OUTER_SPACING,
                    ),
                    seg.start,
                    seg.end,
                  )}
                  fill="none"
                />
              )),
            )}
            {innerWrapped.map(({ seg, lines }) =>
              lines.map((_, lineIndex) => (
                <path
                  key={`ti-${seg.key}-${lineIndex}`}
                  id={`arc-${seg.key}-${lineIndex}`}
                  d={textArcPath(
                    lineRadius(
                      INNER_CENTER_R,
                      lineIndex,
                      lines.length,
                      INNER_SPACING,
                    ),
                    seg.start,
                    seg.end,
                  )}
                  fill="none"
                />
              )),
            )}
          </defs>

          {outerWrapped.map(({ seg, lines }) => {
            const isActive = activeKey === seg.key;
            return (
              <g key={seg.key}>
                <path
                  d={donutPath(195, 160, seg.start, seg.end)}
                  fill={isActive ? "#DDD9D2" : "#F4F3EF"}
                  stroke={isActive ? "#B0AFA7" : "#DCDAD3"}
                  strokeWidth={1}
                  className="cursor-pointer transition-colors duration-200"
                  onClick={() => toggle(seg.key)}
                />
                {lines.map((line, lineIndex) => (
                  <text
                    key={`t-${seg.key}-${lineIndex}`}
                    fontSize="9"
                    fontWeight={600}
                    letterSpacing="0.3"
                    fill="#3B3B3B"
                    className="pointer-events-none uppercase"
                  >
                    <textPath
                      href={`#arc-${seg.key}-${lineIndex}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {line}
                    </textPath>
                  </text>
                ))}
              </g>
            );
          })}

          {innerWrapped.map(({ seg, lines }) => {
            const isActive = activeKey === seg.key;
            const tone = TONE[seg.tone as Tone];
            return (
              <g key={seg.key}>
                <path
                  d={donutPath(158, 92, seg.start, seg.end)}
                  fill={tone.fill}
                  opacity={isActive ? 1 : 0.92}
                  stroke="#ECECEC"
                  strokeWidth={isActive ? 2.5 : 1}
                  className="cursor-pointer transition-opacity duration-200"
                  onClick={() => toggle(seg.key)}
                />
                {lines.map((line, lineIndex) => (
                  <text
                    key={`t-${seg.key}-${lineIndex}`}
                    fontSize="8.5"
                    fontWeight={700}
                    fill={tone.text}
                    className="pointer-events-none uppercase"
                  >
                    <textPath
                      href={`#arc-${seg.key}-${lineIndex}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {line}
                    </textPath>
                  </text>
                ))}
              </g>
            );
          })}

          <circle
            cx={CX}
            cy={CY}
            r={86}
            fill="#ffffff"
            stroke={activeKey === "core" ? "#DD3452" : "#DCDAD3"}
            strokeWidth={activeKey === "core" ? 2.5 : 1}
            className="cursor-pointer transition-colors duration-200"
            onClick={() => toggle("core")}
          />
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight={700}
            fill="#3B3B3B"
            className="pointer-events-none uppercase"
          >
            People Skill
          </text>
          <text
            x={CX}
            y={CY + 12}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight={700}
            fill="#3B3B3B"
            className="pointer-events-none uppercase"
          >
            Development
          </text>
        </svg>
      </div>

      <div className="bg-[#ECECEC] rounded-xl border border-black/5 shadow-[0px_0px_50px_5px_rgba(0,0,0,0.08)] p-5 md:p-6 min-h-[280px] flex flex-col lg:col-span-3">
        {!active ? (
          <div className="m-auto text-center">
            <span className="text-xs text-gray-600 block ">OUR FRAMEWORK</span>
            <h2 className="font-semibold text-2xl mb-5">
              Perfomance Improvement Framework
            </h2>
            <span className="italic text-xs text-gray-400">
              Click the diagram for more detail
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[11px] uppercase tracking-wide text-gray-500">
                  {active.key === "core"
                    ? "Foundation"
                    : INNER.includes(active)
                      ? "Discipline"
                      : "Domain"}
                </span>
                <h3 className="font-semibold text-lg leading-tight">
                  {active.title}
                </h3>
              </div>
            </div>

            <ul className="flex flex-col gap-2">
              {active.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <ChevronRight
                    size={14}
                    className="mt-0.5 shrink-0 text-gray-400"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
