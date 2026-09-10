import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, MapPin } from "lucide-react";
import { usePublicSchedule } from "@/services/schedule/hook";

// ── utils tanggal (tanpa lib eksternal, semua basis lokal kalender) ──────

/** Konversi Date lokal -> "YYYY-MM-DD" */
function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Bulan sekarang (lokal). */
function currentMonthDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

/** Selisih bulan utk nav. */
function shiftMonth(base: Date, delta: number): Date {
  return new Date(base.getFullYear(), base.getMonth() + delta, 1);
}

/** Bangun sel grid utk satu bulan. */
function buildCells(month: Date): (Date | null)[] {
  const year = month.getFullYear();
  const mon = month.getMonth();
  const firstDow = (new Date(year, mon, 1).getDay() + 6) % 7; // Senin=0
  const daysInMonth = new Date(year, mon + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, mon, d));
  return cells;
}

/** Format "23 Sep 2026" */
function fmtLong(key: string): string {
  const d = parseKey(key);
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

function fmtRange(start: string, end: string): string {
  const s = parseKey(start);
  const e = parseKey(end);
  if (start === end)
    return `${s.getDate()} ${MONTHS[s.getMonth()].slice(0, 3)} ${s.getFullYear()}`;
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear())
    return `${s.getDate()} – ${e.getDate()} ${MONTHS[e.getMonth()].slice(0, 3)} ${e.getFullYear()}`;
  return `${fmtLong(start)} – ${fmtLong(end)}`;
}

// ── Komponen ──────────────────────────────────────────────────────────────

interface ScheduleCalendarProps {
  type: "COURSE" | "SKILL_ACCELERATOR";
  id: string;
}

export default function ScheduleCalendar({
  type,
  id,
}: ScheduleCalendarProps) {
  const { data, isLoading } = usePublicSchedule({ type, id });
  const [month, setMonth] = useState<Date>(currentMonthDate());

  const activeDates = useMemo(() => {
    const set = new Set<string>();
    (data?.schedule_dates ?? []).forEach((k) => set.add(k));
    return set;
  }, [data]);

  const todayKey = useMemo(() => toKey(new Date()), []);

  const cells = useMemo(() => buildCells(month), [month]);
  const monthLabel = `${MONTHS[month.getMonth()]} ${month.getFullYear()}`;

  // Semua range mendatang (belum lewat) — utk ringkasan di bawah kalender
  const upcomingRanges = useMemo(
    () =>
      (data?.ranges ?? []).filter(
        (r) => !r.end_date || r.end_date >= todayKey,
      ),
    [data, todayKey],
  );

  return (
    <div className="self-stretch p-6 bg-stone-50 rounded-[32px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200 flex flex-col justify-start items-start gap-4 overflow-hidden">
      {/* Judul */}
      <div className="self-stretch inline-flex justify-between items-center">
        <span className="text-zinc-500 text-sm font-normal">
          CLASS SCHEDULE
        </span>
        {!isLoading && data && (
          <span className="text-[11px] text-rose-700 font-medium">
            {activeDates.size} available date{activeDates.size !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="self-stretch p-4 bg-white rounded-3xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200">
        {/* Nav bulan */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setMonth((m) => shiftMonth(m, -1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-sm font-semibold text-neutral-800">
            {monthLabel}
          </div>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setMonth((m) => shiftMonth(m, 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Header hari */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="text-center text-[10px] font-medium text-zinc-400 py-1"
            >
              {w}
            </div>
          ))}
        </div>

        {/* Grid tanggal */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            if (!cell) return <div key={`e${i}`} className="aspect-square" />;
            const key = toKey(cell);
            const isActive = activeDates.has(key);
            const isToday = key === todayKey;
            const isPast = key < todayKey;
            return (
              <div
                key={key}
                className="aspect-square flex items-center justify-center relative"
              >
                <div
                  className={[
                    "w-8 h-8 flex items-center justify-center rounded-full text-xs",
                    isActive
                      ? "bg-rose-700 text-white font-semibold"
                      : isToday
                        ? "text-rose-700 font-bold ring-2 ring-inset ring-rose-700"
                        : "text-neutral-700",
                    isPast && !isActive ? "text-zinc-300" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {cell.getDate()}
                </div>
                {/* Penanda kecil di bawah utk tanggal aktif */}
                {isActive && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-rose-700" />
                )}
                {isToday && !isActive && (
                  <span className="absolute -top-0.5 -right-0.5 text-[8px] leading-none">
                    ●
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-rose-700 inline-block" />
            Scheduled
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500">
            <span className="w-3 h-3 rounded-full ring-2 ring-inset ring-rose-700 inline-block" />
            Today
          </span>
        </div>
      </div>

      {/* Ringkasan jadwal (bulan aktif) */}
      <div className="self-stretch flex flex-col gap-2">
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-normal">
          <CalendarDays size={14} className="text-rose-700 shrink-0" />
          <span className="font-semibold text-neutral-800">Available Dates</span>
          <button
            type="button"
            onClick={() => setMonth(currentMonthDate())}
            className={`ml-auto text-[11px] px-2.5 py-1 rounded-full transition-colors ${
              month.getTime() === currentMonthDate().getTime()
                ? "text-rose-700 bg-rose-700/10"
                : "text-zinc-500 hover:bg-gray-200"
            }`}
          >
            Today
          </button>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-4 w-full bg-gray-200 rounded-full"
              />
            ))}
          </div>
        ) : upcomingRanges.length > 0 ? (
          upcomingRanges.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-2 bg-rose-700/5 rounded-xl text-xs"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-lg bg-rose-700 text-white">
                <CalendarDays size={13} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-neutral-800 font-medium">
                  {fmtRange(r.start_date, r.end_date)}
                </p>
                <p className="text-[10px] text-zinc-400">
                  {r.sessions} session{r.sessions > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-zinc-400 py-1">
            {data?.ranges?.length
              ? "No upcoming schedule."
              : "No schedule available yet."}
          </p>
        )}
      </div>

      {!isLoading && data && data.ranges.length > 0 && (
        <div className="self-stretch flex items-start gap-2 text-[11px] text-zinc-400">
          <MapPin size={13} className="shrink-0 mt-0.5" />
          <span>
            Upcoming dates shown on calendar. Contact our sales for detailed
            information.
          </span>
        </div>
      )}
    </div>
  );
}
