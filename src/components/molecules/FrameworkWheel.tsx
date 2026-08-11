import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, InfoIcon } from "lucide-react";
import { useAssetContext } from "@/layouts/AssetProvider";

// ── Types ──────────────────────────────────────────────────────────
type Tone = "red" | "gray";

type Segment = {
  id: string;
  label: string;
  desc: string;
  items: string[];
  ring: "outer" | "inner" | "cyber";
  start: number;
  end: number;
  tone?: Tone;
};

type CoreData = {
  id: string;
  label: string;
  desc: string;
  items: string[];
};

// ── Data (matching example.html) ───────────────────────────────────
const SEGMENTS: Segment[] = [
  // ---- outer ring (r125–150) ----
  {
    id: "ai",
    ring: "outer",
    start: 270,
    end: 360,
    label: "Artificial Intelligence",
    desc: "Domain teknologi pendukung: kecerdasan buatan.",
    items: [
      "AI Business",
      "AI Executive",
      "AI Cloud",
      "AI Security",
      "AI Developers",
    ],
  },
  {
    id: "data",
    ring: "outer",
    start: 0,
    end: 90,
    label: "Data Management, Analytics & Engineering",
    desc: "Domain teknologi pendukung: pengelolaan data, analitik, dan rekayasa data.",
    items: [
      "Excel Data Management",
      "Excel Dashboard",
      "Power BI",
      "Python",
      "KNIME",
    ],
  },
  {
    id: "auto",
    ring: "outer",
    start: 90,
    end: 270,
    label: "Automation",
    desc: "Automation — mencakup setengah lingkaran (bagian bawah), tidak dipecah per kuadran.",
    items: ["Power Automate", "Power Apps"],
  },
  // ---- cybersecurity ring (r151–172): full 360° outermost ----
  {
    id: "cyber",
    ring: "cyber",
    start: 0,
    end: 360,
    label: "Cybersecurity",
    desc: "Cybersecurity — melingkupi seluruh framework, berada di ring paling luar (360°).",
    items: [
      "CompTIA Security Analyst",
      "CompTIA Security+",
      "CompTIA A+ Cyber",
      "CompTIA Pentest+",
      "CompTIA Security Pro",
      "CompTIA Security X",
      "Nexus",
    ],
  },
  // ---- inner ring (r48–124) ----
  {
    id: "governance",
    ring: "inner",
    tone: "red",
    start: 270,
    end: 360,
    label: "Governance Control, Risk Management",
    desc: "Tata kelola, kontrol, dan manajemen risiko.",
    items: ["COBIT", "CGEIT", "CRISC", "CISA"],
  },
  {
    id: "service",
    ring: "inner",
    tone: "gray",
    start: 0,
    end: 90,
    label: "Service Management",
    desc: "Manajemen layanan TI.",
    items: ["ITIL", "ITSM"],
  },
  {
    id: "pm",
    ring: "inner",
    tone: "red",
    start: 90,
    end: 180,
    label: "Project Management",
    desc: "Manajemen proyek.",
    items: [
      "IT Project Management",
      "Certified Associated Project Manager",
      "Project Management Professional",
      "PRINCE2",
    ],
  },
  {
    id: "ea",
    ring: "inner",
    tone: "gray",
    start: 180,
    end: 270,
    label: "Enterprise Architecture",
    desc: "Arsitektur enterprise.",
    items: ["TOGAF"],
  },
];

const CORE: CoreData = {
  id: "core",
  label: "People Skill Development",
  desc: "Inti framework: pengembangan keterampilan sumber daya manusia.",
  items: [
    "Structured certification pathways for every discipline",
    "Blended learning: instructor-led, self-paced & hands-on labs",
    "Progress tracked against role-based competency levels",
  ],
};

// ── Tone colors ────────────────────────────────────────────────────
const TONE: Record<Tone, { fill: string; active: string }> = {
  red: { fill: "#DD3452", active: "#c92747" },
  gray: { fill: "#B7B6B4", active: "#9d9c9a" },
};

// ── Geometry constants (matching example.html) ─────────────────────
const CX = 200;
const CY = 200;
const CORE_R = 48;
const INNER_IN = 48;
const INNER_OUT = 124;
const OUTER_IN = 125;
const OUTER_OUT = 150;
const CYBER_IN = 151;
const CYBER_OUT = 172;

// ── SVG helpers ────────────────────────────────────────────────────
/** Polar: 0° = 12 o'clock, clockwise */
function polar(r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

/** Donut arc path for segments < 360° */
function donutPath(
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number,
) {
  const p1 = polar(outerR, startAngle);
  const p2 = polar(outerR, endAngle);
  const p3 = polar(innerR, endAngle);
  const p4 = polar(innerR, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
}

/** Full 360° ring via evenodd fill (two concentric circles) */
function circleOutline(r: number) {
  return [
    `M ${CX - r} ${CY}`,
    `A ${r} ${r} 0 1 1 ${CX + r} ${CY}`,
    `A ${r} ${r} 0 1 1 ${CX - r} ${CY}`,
    "Z",
  ].join(" ");
}
function fullRingPath(outerR: number, innerR: number) {
  return `${circleOutline(outerR)} ${circleOutline(innerR)}`;
}

// ── Component ──────────────────────────────────────────────────────
export default function FrameworkWheel() {
  const { getAssetUrl } = useAssetContext();
  const frameworkBanner = getAssetUrl("framework_banner");
  const [activeId, setActiveId] = useState<string | null>(null);

  const active: Segment | CoreData | undefined =
    activeId === "core" ? CORE : SEGMENTS.find((s) => s.id === activeId);

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  // Tailwind-compatible color vars for the invisible-to-visible segments
  const outerFill = "#DDD9D2";
  const outerStroke = "#B0AFA7";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 items-center">
      {/* ── Stage: image + invisible SVG overlay ── */}
      <div className="mx-auto w-full lg:col-span-4 p-10 lg:p-20">
        <div className="relative w-full aspect-square">
          {/* Background image (labels are printed on the image itself) */}
          {frameworkBanner && (
            <img
              src={frameworkBanner}
              alt="Framework"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
            />
          )}

          {/* SVG overlay — all segments invisible until hover/active */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full z-10"
          >
            {/* ── Outer ring segments ── */}
            {SEGMENTS.filter((s) => s.ring === "outer").map((seg) => {
              const isActive = activeId === seg.id;
              return (
                <path
                  key={seg.id}
                  data-id={seg.id}
                  d={donutPath(OUTER_OUT, OUTER_IN, seg.start, seg.end)}
                  fill={outerFill}
                  stroke={outerStroke}
                  strokeWidth={1.2}
                  fillOpacity={isActive ? 0.55 : 0}
                  strokeOpacity={isActive ? 1 : 0}
                  className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out hover:fill-opacity-[0.28] hover:stroke-opacity-90"
                  onClick={() => toggle(seg.id)}
                >
                  <title>{seg.label}</title>
                </path>
              );
            })}

            {/* ── Cybersecurity ring: full 360° outermost band ── */}
            {SEGMENTS.filter((s) => s.ring === "cyber").map((seg) => {
              const isActive = activeId === seg.id;
              return (
                <path
                  key={seg.id}
                  data-id={seg.id}
                  d={fullRingPath(CYBER_OUT, CYBER_IN)}
                  fillRule="evenodd"
                  fill={outerFill}
                  stroke={outerStroke}
                  strokeWidth={1.2}
                  fillOpacity={isActive ? 0.55 : 0}
                  strokeOpacity={isActive ? 1 : 0}
                  className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out hover:fill-opacity-[0.28] hover:stroke-opacity-90"
                  onClick={() => toggle(seg.id)}
                >
                  <title>{seg.label}</title>
                </path>
              );
            })}

            {/* ── Inner ring segments ── */}
            {SEGMENTS.filter((s) => s.ring === "inner").map((seg) => {
              const tone = TONE[seg.tone!];
              const isActive = activeId === seg.id;
              return (
                <path
                  key={seg.id}
                  data-id={seg.id}
                  d={donutPath(INNER_OUT, INNER_IN, seg.start, seg.end)}
                  fill={tone.active}
                  stroke="#ECECEC"
                  strokeWidth={1.6}
                  fillOpacity={isActive ? 0.55 : 0}
                  strokeOpacity={isActive ? 1 : 0}
                  className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out hover:fill-opacity-[0.28] hover:stroke-opacity-90"
                  onClick={() => toggle(seg.id)}
                >
                  <title>{seg.label}</title>
                </path>
              );
            })}

            {/* ── Core circle ── */}
            <circle
              cx={CX}
              cy={CY}
              r={CORE_R}
              data-id="core"
              fill="#ffffff"
              stroke="#DD3452"
              strokeWidth={2.5}
              fillOpacity={activeId === "core" ? 0.35 : 0}
              strokeOpacity={activeId === "core" ? 1 : 0}
              className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out hover:fill-opacity-[0.35] hover:stroke-opacity-100"
              onClick={() => toggle("core")}
            >
              <title>{CORE.label}</title>
            </circle>
          </svg>
        </div>
      </div>

      {/* ── Panel: detail card (side by side) ── */}
      <div className="bg-white rounded-xl border border-black/5 shadow-[0px_0px_50px_5px_rgba(0,0,0,0.08)] p-5 md:p-6 min-h-[280px] flex flex-col lg:col-span-3">
        {!active ? (
          <div className="m-auto text-center">
            <span className="text-xs text-gray-600 block">OUR FRAMEWORK</span>
            <h2 className="font-semibold text-2xl mb-5">
              Perfomance Improvement Framework
            </h2>
            <span className="italic text-xs text-gray-400">
              Click the diagram for more detail
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="space-y-2">
                <span className="text-sm uppercase tracking-wide text-gray-500 flex items-center gap-2">
                  <InfoIcon size={14} className="text-primary-500" />
                  FRAMEWORK DETAILS
                </span>
                <h3 className="font-semibold text-lg leading-tight">
                  {active.label}
                </h3>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                {active.items.map((item) => (
                  <Link
                    to="/strategic-solution"
                    key={item}
                    className="group relative flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-full px-3 py-2 justify-between hover:border-primary-500 hover:text-primary-500 duration-200 cursor-pointer overflow-visible"
                  >
                    <span className="font-medium truncate">{item}</span>
                    <ArrowRight size={14} className="shrink-0" />
                    {/* Tooltip for long text */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-50 pointer-events-none">
                      <span className="whitespace-nowrap bg-gray-800 text-white text-xs rounded-md px-2.5 py-1.5 shadow-lg block">
                        {item}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <span className="text-xs text-center text-gray-400 w-full block">
                Click to view the details of the class
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
