import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, InfoIcon } from "lucide-react";
import { useAssetContext } from "@/layouts/AssetProvider";
import LordIcons from "@/components/atoms/LordIcons";

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
const BASE_SEGMENTS: Segment[] = [
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

const BASE_CORE: CoreData = {
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
export default function FrameworkWheel({
  items = {},
}: Readonly<{ items?: Record<string, string[]> }>) {
  const { getAssetUrl } = useAssetContext();
  const frameworkBanner = getAssetUrl("framework_banner");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Items tiap scope bisa di-override dari CMS (hanya item, scope tetap).
  const SEGMENTS: Segment[] = BASE_SEGMENTS.map((seg) => ({
    ...seg,
    items: items[seg.id] || seg.items,
  }));
  const CORE: CoreData = {
    ...BASE_CORE,
    items: items["core"] || BASE_CORE.items,
  };

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
      <div className="mx-auto w-full max-w-[500px] lg:col-span-4 p-2 lg:p-4">
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
              const isHovered = hoveredId === seg.id;
              return (
                <path
                  key={seg.id}
                  data-id={seg.id}
                  d={donutPath(OUTER_OUT, OUTER_IN, seg.start, seg.end)}
                  fill={outerFill}
                  stroke={outerStroke}
                  strokeWidth={1.2}
                  fillOpacity={isActive || isHovered ? 0.55 : 0}
                  strokeOpacity={isActive || isHovered ? 1 : 0}
                  className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out"
                  onClick={() => toggle(seg.id)}
                  onMouseEnter={() => setHoveredId(seg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <title>{seg.label}</title>
                </path>
              );
            })}

            {/* ── Cybersecurity ring: full 360° outermost band ── */}
            {SEGMENTS.filter((s) => s.ring === "cyber").map((seg) => {
              const isActive = activeId === seg.id;
              const isHovered = hoveredId === seg.id;
              return (
                <path
                  key={seg.id}
                  data-id={seg.id}
                  d={fullRingPath(CYBER_OUT, CYBER_IN)}
                  fillRule="evenodd"
                  fill={outerFill}
                  stroke={outerStroke}
                  strokeWidth={1.2}
                  fillOpacity={isActive || isHovered ? 0.55 : 0}
                  strokeOpacity={isActive || isHovered ? 1 : 0}
                  className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out"
                  onClick={() => toggle(seg.id)}
                  onMouseEnter={() => setHoveredId(seg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <title>{seg.label}</title>
                </path>
              );
            })}

            {/* ── Inner ring segments ── */}
            {SEGMENTS.filter((s) => s.ring === "inner").map((seg) => {
              const tone = TONE[seg.tone!];
              const isActive = activeId === seg.id;
              const isHovered = hoveredId === seg.id;
              return (
                <path
                  key={seg.id}
                  data-id={seg.id}
                  d={donutPath(INNER_OUT, INNER_IN, seg.start, seg.end)}
                  fill={tone.active}
                  stroke="#ECECEC"
                  strokeWidth={1.6}
                  fillOpacity={isActive || isHovered ? 0.55 : 0}
                  strokeOpacity={isActive || isHovered ? 1 : 0}
                  className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out"
                  onClick={() => toggle(seg.id)}
                  onMouseEnter={() => setHoveredId(seg.id)}
                  onMouseLeave={() => setHoveredId(null)}
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
              fillOpacity={activeId === "core" || hoveredId === "core" ? 0.35 : 0}
              strokeOpacity={activeId === "core" || hoveredId === "core" ? 1 : 0}
              className="cursor-pointer transition-[fill-opacity,stroke-opacity] duration-200 ease-in-out"
              onClick={() => toggle("core")}
              onMouseEnter={() => setHoveredId("core")}
              onMouseLeave={() => setHoveredId(null)}
            >
              <title>{CORE.label}</title>
            </circle>
          </svg>
        </div>
      </div>

      {/* ── Panel: detail card (side by side) ── */}
      <div className="lg:col-span-3 flex flex-col justify-center items-end w-full">
        <div className="w-full p-6 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-4 min-h-[360px]">
          {!active ? (
            <div id="framework-empty-card" className="w-full h-full flex flex-col justify-center items-center gap-4 cursor-pointer">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <InfoIcon size={16} className="text-rose-700 shrink-0" />
                  <span className="justify-start text-neutral-400 text-sm font-normal">
                    FRAMEWORK DETAILS
                  </span>
                </div>
                <h2 className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
                  Performance Improvement Framework
                </h2>
              </div>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
              <div className="self-stretch flex-1 flex flex-col justify-center items-center gap-2 my-4">
                <LordIcons
                  src="https://cdn.lordicon.com/tiiukiyg.json"
                  trigger="hover"
                  target="#framework-empty-card"
                  state="hover-pinch"
                  colors="primary:#f9c9c0,secondary:#bf1e40"
                  size={72}
                />
                <span className="self-stretch text-center justify-start text-neutral-400 text-sm font-normal">
                  Click on the framework wheel to <br />
                  view the details
                </span>
              </div>
              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200" />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 flex-1">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch inline-flex justify-start items-center gap-2">
                  <InfoIcon size={16} className="text-rose-700 shrink-0" />
                  <span className="justify-start text-neutral-400 text-sm font-normal">
                    FRAMEWORK DETAILS
                  </span>
                </div>
                <h3 className="self-stretch justify-start text-neutral-800 text-2xl font-semibold">
                  {active.label}
                </h3>
              </div>

              <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200 my-1" />

              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="self-stretch flex flex-col justify-start items-start gap-3">
                  {active.items.map((item) => (
                    <Link
                      to="/course-catalog"
                      key={item}
                      className="self-stretch px-4 py-3 rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] bg-white outline outline-1 outline-offset-[-1px] outline-gray-200 hover:bg-gradient-to-b hover:from-white hover:to-pink-50 hover:outline-rose-700 inline-flex justify-start items-center gap-3 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="flex-1 justify-start text-sm font-medium text-neutral-800 group-hover:text-rose-700 transition-colors duration-300">
                        {item}
                      </span>
                      <ArrowRight
                        size={18}
                        className="shrink-0 text-neutral-800 group-hover:text-rose-700 transition-colors duration-300"
                      />
                    </Link>
                  ))}
                </div>
                <span className="self-stretch text-center justify-start text-neutral-400 text-sm font-normal">
                  Click to view the details of the class
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
