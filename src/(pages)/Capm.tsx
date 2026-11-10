import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CAPM_ALL, CAPM_CHAPTERS, CAPM_DOMAINS, type CapmQuestion } from "@/data/capm-simulation";

const PER = 10;
const KEY = "capm_day1_bank_simulation_v1";
const L = ["A", "B", "C", "D", "E", "F"];
const NUMW: Record<number, string> = { 2: "dua", 3: "tiga", 4: "empat" };
const SRC_NAMES: Record<string, string> = {
  P3: "Simulasi Percobaan 3",
  P5: "Simulasi Percobaan 5",
  PK: "Kunci Jawaban & Pembahasan",
};

type Screen = "home" | "start" | "question" | "chdone" | "recap";

interface CapmState {
  name: string;
  started: string | null;
  answers: Record<string, number[]>;
  revealed: Record<string, boolean>;
  screen: Screen;
  ci: number;
  qi: number;
  sel: number[];
}

function fresh(): CapmState {
  return { name: "", started: null, answers: {}, revealed: {}, screen: "home", ci: 0, qi: 0, sel: [] };
}

function load(): CapmState | null {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "");
    return s && s.answers ? s : null;
  } catch {
    return null;
  }
}

function srcLabel(src: string): string {
  const m = /^(P3|P5|PK)-Q(\d+)$/.exec(src);
  if (!m) return src;
  return `${SRC_NAMES[m[1]]}, soal ${m[2]}`;
}

function today(d: string | null): string {
  return (d ? new Date(d) : new Date()).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function letters(arr: number[]): string {
  return arr.slice().sort((x, y) => x - y).map((i) => L[i]).join(", ");
}

function pdfSafe(s: string): string {
  return String(s)
    .replace(/[‘’′]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, "-")
    .replace(/…/g, "...")
    .replace(/•/g, "-")
    .replace(/ /g, " ")
    .replace(/[^\x09\x0A\x0D\x20-\x7E -ÿ]/g, "");
}

function paras(text: string) {
  return String(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => <p key={i}>{p}</p>);
}

type BtnVariant = "solid" | "ghost" | "warn";

function btnCls(v: BtnVariant, extra = ""): string {
  const base =
    "inline-flex items-center rounded-md px-5 py-3 text-[15px] font-bold transition-colors disabled:cursor-not-allowed disabled:bg-[#C9CBD1] disabled:text-white";
  if (v === "solid") return `${base} bg-primary-700 text-white hover:bg-primary-800 ${extra}`;
  if (v === "ghost") return `${base} border-[1.5px] border-primary-700 bg-white text-primary-700 hover:bg-[#FBE9EB] disabled:cursor-not-allowed disabled:border-[#C9CBD1] disabled:bg-white disabled:text-[#C9CBD1] ${extra}`;
  return `${base} border-[1.5px] border-[#C00000] bg-white text-[#C00000] hover:bg-[#FBEAEC] ${extra}`;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-primary-700">
      <span className="inline-block h-2.5 w-2.5 bg-[#C00000]" />
      {children}
    </div>
  );
}

export default function Capm() {
  const [S, setS] = useState<CapmState>(() => load() ?? fresh());
  const [dlMsg, setDlMsg] = useState<{ text: string; bad?: boolean } | null>(null);
  const [allOpen, setAllOpen] = useState(false);
  const [resetArmed, setResetArmed] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
    } catch {}
  }, [S]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [S.screen]);

  useEffect(() => {
    document.title = "CAPM® Day 1 Simulation | ExecuTrain";
  }, []);

  const ans = (q: CapmQuestion): number[] => S.answers[q.id] || [];
  const ok = (q: CapmQuestion): boolean => {
    const a = ans(q);
    return a.length === q.a.length && q.a.every((i) => a.includes(i));
  };
  const chScore = (ci: number) => CAPM_CHAPTERS[ci].qs.filter((q) => S.revealed[q.id] && ok(q)).length;
  const chDone = (ci: number) => CAPM_CHAPTERS[ci].qs.every((q) => S.revealed[q.id]);
  const firstOpen = () => CAPM_CHAPTERS.findIndex((_, i) => !chDone(i));

  const go = (screen: Screen, extra?: Partial<CapmState>) => setS((p) => ({ ...p, ...extra, screen }) as CapmState);

  const resumeChapter = (ci: number) => {
    const qi = CAPM_CHAPTERS[ci].qs.findIndex((q) => !S.revealed[q.id]);
    if (qi <= 0) go("start", { ci, qi: 0, sel: [] });
    else go("question", { ci, qi, sel: [] });
  };

  const onHomeGo = (nxt: number) => {
    setS((p) => ({ ...p, started: p.started ?? new Date().toISOString() }));
    resumeChapter(nxt);
  };

  const pick = (q: CapmQuestion, i: number) => {
    const multi = q.a.length > 1;
    const need = q.a.length;
    setS((p) => {
      let sel = (p.sel || []).slice();
      if (!multi) sel = [i];
      else if (sel.includes(i)) sel = sel.filter((x) => x !== i);
      else if (sel.length < need) sel.push(i);
      else {
        sel.shift();
        sel.push(i);
      }
      return { ...p, sel };
    });
  };

  const reveal = (q: CapmQuestion) =>
    setS((p) => ({
      ...p,
      answers: { ...p.answers, [q.id]: (p.sel || []).slice() },
      revealed: { ...p.revealed, [q.id]: true },
    }));

  const toggleAll = () => {
    const open = !allOpen;
    setAllOpen(open);
    reviewRef.current?.querySelectorAll("details").forEach((d) => {
      (d as HTMLDetailsElement).open = open;
    });
  };

  const onReset = () => {
    if (!resetArmed) {
      setResetArmed(true);
      window.setTimeout(() => setResetArmed(false), 4000);
      return;
    }
    setResetArmed(false);
    const nm = S.name;
    const s = fresh();
    s.name = nm;
    setS(s);
  };

  const fileBase = () => {
    const n = (S.name || "").trim().replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
    return "CAPM_Day1_Rekap" + (n ? "_" + n : "");
  };

  const saveFile = (filename: string, data: Blob | string) => {
    const blob = data instanceof Blob ? data : new Blob([data], { type: filename.endsWith(".csv") ? "text/csv;charset=utf-8" : "application/octet-stream" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    setDlMsg({ text: `File ${filename} diunduh.` });
  };

  const csvText = () => {
    const rows: (string | number)[][] = [["Peserta", "Tanggal", "Chapter", "No", "ECO Domain", "Task", "Soal", "Jawaban Anda", "Jawaban Benar", "Hasil", "Sumber"]];
    CAPM_ALL.forEach((q) => {
      const has = S.revealed[q.id];
      const ch = ans(q);
      rows.push([
        S.name,
        today(S.started),
        `${q.ci + 1}. ${CAPM_CHAPTERS[q.ci].title}`,
        q.qi + 1,
        `${q.d}. ${CAPM_DOMAINS[q.d].name}`,
        q.t,
        q.q,
        has ? ch.slice().sort((x, y) => x - y).map((i) => `${L[i]}. ${q.o[i]}`).join("; ") : "",
        q.a.map((i) => `${L[i]}. ${q.o[i]}`).join("; "),
        has ? (ok(q) ? "Benar" : "Salah") : "Belum",
        srcLabel(q.src),
      ]);
    });
    return rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  };

  const exportCSV = () => saveFile(fileBase() + ".csv", "\uFEFF" + csvText());

  const copyCSV = async () => {
    try {
      await navigator.clipboard.writeText(csvText());
      setDlMsg({ text: "Rekap disalin. Tempel (paste) ke Excel atau Google Sheets." });
    } catch {
      setDlMsg({ text: "Browser menolak akses clipboard. Gunakan Unduh CSV.", bad: true });
    }
  };

  const exportPDF = async () => {
    setDlMsg({ text: "Menyusun PDF..." });
    try {
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const W = 210,
        M = 14,
        CW = W - 2 * M;
      const MAROON: [number, number, number] = [155, 27, 48],
        INK: [number, number, number] = [45, 53, 64],
        SLATE: [number, number, number] = [92, 100, 112],
        OKC: [number, number, number] = [30, 123, 79],
        BAD: [number, number, number] = [192, 0, 0];
      const done = CAPM_ALL.filter((q) => S.revealed[q.id]);
      const right = done.filter(ok).length;
      let y = 0;
      const header = () => {
        const img = logoRef.current;
        if (img && img.naturalWidth > 0) {
          try {
            const h = Math.min(12, (38 * img.naturalHeight) / img.naturalWidth);
            doc.addImage(img, "PNG", M, 8, 38, h);
          } catch {}
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...MAROON);
        doc.text("CAPM® Training Preparation", W - M, 12, { align: "right" });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...SLATE);
        doc.text("Day 1 - Exam Simulation", W - M, 17, { align: "right" });
        doc.setDrawColor(...MAROON);
        doc.setLineWidth(0.8);
        doc.line(M, 21, W - M, 21);
      };
      const footer = () => {
        const n = doc.getNumberOfPages();
        for (let i = 1; i <= n; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(...SLATE);
          doc.text(pdfSafe((S.name ? S.name + " | " : "") + today(S.started)), M, 290);
          doc.text(`Halaman ${i} dari ${n}`, W - M, 290, { align: "right" });
        }
      };
      const ensure = (h: number) => {
        if (y + h > 280) {
          doc.addPage();
          header();
          y = 28;
        }
      };
      const para = (txt: string, size: number, color: [number, number, number], style: "normal" | "bold" = "normal", indent = 0) => {
        doc.setFont("helvetica", style);
        doc.setFontSize(size);
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(pdfSafe(txt), CW - indent);
        const lh = size * 0.42;
        lines.forEach((l: string) => {
          ensure(lh);
          doc.text(l, M + indent, y);
          y += lh;
        });
      };
      header();
      y = 32;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(...INK);
      doc.text("Hasil Simulasi Day 1", M, y);
      y += 7;
      para((S.name ? S.name + "  |  " : "") + today(S.started), 10, SLATE);
      y += 3;
      const boxes: [string, string][] = [
        ["Total benar", `${right} / ${done.length}`],
        ["Persentase", `${done.length ? Math.round((right / done.length) * 100) : 0}%`],
        ["Chapter selesai", `${CAPM_CHAPTERS.filter((_, i) => chDone(i)).length} / ${CAPM_CHAPTERS.length}`],
      ];
      const bw = (CW - 8) / 3;
      boxes.forEach((b, i) => {
        const x = M + i * (bw + 4);
        doc.setFillColor(244, 244, 246);
        doc.rect(x, y, bw, 18, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(...SLATE);
        doc.text(b[0], x + 4, y + 6);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(...MAROON);
        doc.text(b[1], x + 4, y + 14);
      });
      y += 26;
      const tbl = (title: string, head: string[], body: (string | number)[][], widths: Record<number, { cellWidth: number }>) => {
        ensure(20);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(...MAROON);
        doc.text(title, M, y);
        y += 3;
        autoTable(doc, {
          startY: y,
          head: [head],
          body,
          margin: { left: M, right: M, top: 28 },
          styles: { font: "helvetica", fontSize: 9, textColor: INK, cellPadding: 2 },
          headStyles: { fillColor: MAROON, textColor: 255 },
          alternateRowStyles: { fillColor: [250, 250, 251] as [number, number, number] },
          columnStyles: widths,
          didDrawPage: () => {
            const pn = doc.getCurrentPageInfo().pageNumber;
            if (pn > 1) header();
          },
        });
        const lat = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable;
        y = (lat ? lat.finalY : y + 20) + 8;
      };
      tbl(
        "Berdasarkan domain ECO",
        ["Domain", "Bobot ujian", "Benar", "%"],
        Object.keys(CAPM_DOMAINS).map((d) => {
          const dd = Number(d);
          const an = CAPM_ALL.filter((q) => q.d === dd && S.revealed[q.id]);
          const okc = an.filter(ok).length;
          return [`Domain ${d}: ${CAPM_DOMAINS[dd].name}`, `${CAPM_DOMAINS[dd].w}%`, `${okc} / ${an.length}`, an.length ? `${Math.round((okc / an.length) * 100)}%` : "-"];
        }),
        { 0: { cellWidth: 104 }, 1: { cellWidth: 26 }, 2: { cellWidth: 26 }, 3: { cellWidth: 26 } },
      );
      tbl(
        "Berdasarkan chapter",
        ["Chapter", "Benar", "%"],
        CAPM_CHAPTERS.map((c, i) => {
          const an = c.qs.filter((q) => S.revealed[q.id]);
          const okc = an.filter(ok).length;
          return [`${i + 1}. ${c.title}`, `${okc} / ${an.length}`, an.length ? `${Math.round((okc / an.length) * 100)}%` : "-"];
        }),
        { 0: { cellWidth: 130 }, 1: { cellWidth: 26 }, 2: { cellWidth: 26 } },
      );
      doc.addPage();
      header();
      y = 32;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(...INK);
      doc.text("Review soal dan pembahasan", M, y);
      y += 8;
      CAPM_CHAPTERS.forEach((c, ci) => {
        ensure(14);
        para(`Chapter ${ci + 1}: ${c.title}`, 12, MAROON, "bold");
        y += 2;
        c.qs.forEach((q, qi) => {
          const has = S.revealed[q.id];
          const ch = ans(q);
          const isOkQ = has && ok(q);
          ensure(16);
          const tag = !has ? "BELUM" : isOkQ ? "BENAR" : "SALAH";
          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(...(!has ? SLATE : isOkQ ? OKC : BAD));
          doc.text(tag, M, y);
          para(`${qi + 1}. ${q.q}`, 10, INK, "bold", 16);
          y += 1;
          para(`Domain ${q.d} / Task ${q.t}  |  Sumber: ${srcLabel(q.src)}`, 8, SLATE, "normal", 16);
          para(`Jawaban Anda: ${has ? ch.slice().sort((a, b) => a - b).map((i) => `${L[i]}. ${q.o[i]}`).join("; ") : "belum dijawab"}`, 9, isOkQ ? OKC : has ? BAD : SLATE, "normal", 16);
          para(`Jawaban benar: ${q.a.map((i) => `${L[i]}. ${q.o[i]}`).join("; ")}`, 9, OKC, "bold", 16);
          q.a.forEach((i) => para(`Kenapa ${L[i]} benar: ${q.w[i].replace(/\n+/g, " ")}`, 9, INK, "normal", 16));
          if (has) ch.filter((i) => !q.a.includes(i)).forEach((i) => para(`Kenapa ${L[i]} salah: ${q.w[i].replace(/\n+/g, " ")}`, 9, INK, "normal", 16));
          y += 4;
        });
        y += 2;
      });
      footer();
      saveFile(fileBase() + ".pdf", doc.output("blob"));
    } catch {
      setDlMsg({ text: "Gagal menyusun PDF.", bad: true });
    }
  };

  const renderHome = () => {
    const nxt = firstOpen();
    const anyDone = Object.keys(S.revealed).length > 0;
    return (
      <div className="card">
        <Kicker>Day 1 · Exam Simulation</Kicker>
        <h1 className="mt-2 text-[28px] font-bold leading-tight text-[#2D3540]">Simulasi Soal CAPM® Day 1</h1>
        <p className="mt-1.5 text-[#5C6470]">
          {CAPM_CHAPTERS.length} chapter, masing-masing {PER} soal (total {CAPM_ALL.length} soal). Pilih jawaban, klik <b>Lihat Jawaban Benar</b> untuk melihat apakah jawaban Anda benar beserta pembahasan setiap opsi, lalu lanjut ke soal berikutnya. Untuk soal <i>Choose two/three</i>, pilih semua jawaban yang benar. Setelah semua chapter selesai, rekap hari ini ditampilkan per chapter dan per domain ECO.
        </p>
        <label htmlFor="nm" className="mt-4 block text-sm text-[#5C6470]">
          Nama peserta (opsional, tampil di rekap)
        </label>
        <input
          id="nm"
          type="text"
          value={S.name}
          placeholder="Nama Anda"
          onChange={(e) => setS((p) => ({ ...p, name: e.target.value }))}
          className="mt-1.5 w-full max-w-[380px] rounded-md border-[1.5px] border-[#E1E2E6] px-3 py-2.5 outline-none focus:border-primary-700"
        />
        <div className="mt-4 grid gap-2.5">
          {CAPM_CHAPTERS.map((c, i) => {
            const done = chDone(i);
            const isNext = i === nxt;
            return (
              <div
                key={i}
                className={`flex items-center gap-3.5 rounded-md bg-[#F4F4F6] py-3 pl-4 pr-3 ${
                  done ? "border-l-[5px] border-[#1E7B4F]" : isNext ? "border-l-[5px] border-[#C00000]" : "border-l-[5px] border-[#E1E2E6]"
                }`}
              >
                <div className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full bg-primary-700 font-bold text-white">{i + 1}</div>
                <div className="flex-1">
                  <b className="block">{c.title}</b>
                  <span className="text-sm text-[#5C6470]">{c.desc}</span>
                </div>
                {done ? (
                  <span className="whitespace-nowrap text-sm font-bold text-[#1E7B4F]">
                    {chScore(i)}/{c.qs.length} benar
                  </span>
                ) : isNext ? (
                  <span className="whitespace-nowrap text-sm font-bold text-[#C00000]">Berikutnya</span>
                ) : (
                  <span className="whitespace-nowrap text-sm text-[#5C6470]">Belum</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {nxt >= 0 ? (
            <button className={btnCls("solid")} onClick={() => onHomeGo(nxt)}>
              {anyDone ? `Lanjutkan ke Chapter ${nxt + 1}` : "Mulai Simulasi"}
            </button>
          ) : (
            <button className={btnCls("solid")} onClick={() => go("recap")}>
              Lihat Rekap Hari Ini
            </button>
          )}
          {anyDone && nxt >= 0 && (
            <button className={btnCls("ghost")} onClick={() => go("recap")}>
              Lihat Rekap Sementara
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderStart = () => {
    const c = CAPM_CHAPTERS[S.ci];
    const doms = [...new Set(c.qs.map((q) => q.d))].sort((a, b) => a - b);
    return (
      <div className="card">
        <Kicker>
          Chapter {S.ci + 1} dari {CAPM_CHAPTERS.length}
        </Kicker>
        <h1 className="mt-2 text-[28px] font-bold leading-tight text-[#2D3540]">{c.title}</h1>
        <p className="mt-1.5 text-[#5C6470]">{c.desc}</p>
        <p className="mt-4 mb-1.5">
          <b>{c.qs.length} soal</b> pada domain ECO berikut:
        </p>
        <div>
          {doms.map((d) => (
            <span key={d} className="m-0.5 mr-1 inline-block rounded-full bg-[#FBE9EB] px-2.5 py-0.5 text-xs font-bold text-primary-700">
              Domain {d} · {CAPM_DOMAINS[d].name} ({c.qs.filter((q) => q.d === d).length} soal)
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-2.5">
          <button className={btnCls("ghost")} onClick={() => go("home")}>
            Beranda
          </button>
          <button className={btnCls("solid")} onClick={() => go("question", { qi: 0, sel: [] })}>
            Start Chapter {S.ci + 1}
          </button>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    const c = CAPM_CHAPTERS[S.ci];
    const q = c.qs[S.qi];
    const shown = !!S.revealed[q.id];
    const multi = q.a.length > 1;
    const chosen = shown ? ans(q) : S.sel || [];
    const pct = ((S.qi + (shown ? 1 : 0)) / c.qs.length) * 100;
    const last = S.qi === c.qs.length - 1;
    const need = q.a.length;
    const wrongPicked = chosen.filter((i) => !q.a.includes(i));
    const others = q.o.map((_, i) => i).filter((i) => !q.a.includes(i) && !chosen.includes(i));
    return (
      <div className="card">
        <div className="flex flex-wrap justify-between gap-2 text-sm text-[#5C6470]">
          <span>
            <b className="text-primary-700">Chapter {S.ci + 1}</b> · {c.title}
          </span>
          <span>
            Soal {S.qi + 1} dari {c.qs.length}
          </span>
        </div>
        <div className="my-3 h-1.5 overflow-hidden rounded-full bg-[#E1E2E6]">
          <div className="h-full rounded-full bg-[#C00000]" style={{ width: `${pct}%` }} />
        </div>
        <span className="m-0.5 mr-1 inline-block rounded-full bg-[#FBE9EB] px-2.5 py-0.5 text-xs font-bold text-primary-700">
          ECO Domain {q.d} · Task {q.t}
        </span>
        <div className="mt-2 mb-4 text-[19px] font-semibold leading-snug text-[#2D3540]">{q.q}</div>
        {multi && !shown && (
          <div className="-mt-2 mb-3.5 text-sm font-bold text-primary-700">
            Pilih {NUMW[need] || need} jawaban ({chosen.length}/{need} dipilih).
          </div>
        )}
        <div className="grid gap-2.5">
          {q.o.map((t, i) => {
            const picked = chosen.includes(i);
            const right = q.a.includes(i);
            let cls = "border-[#E1E2E6] bg-white hover:border-primary-700 hover:bg-[#FCF7F8]";
            let mk = "";
            if (shown) {
              if (right) {
                cls = "border-[#1E7B4F] bg-[#E8F5EE]";
                mk = picked ? "Jawaban Anda · Benar" : "Jawaban benar";
              } else if (picked) {
                cls = "border-[#C00000] bg-[#FBEAEC]";
                mk = "Jawaban Anda · Salah";
              }
            } else if (picked) cls = "border-primary-700 bg-[#FCF2F4]";
            const letterCls = shown
              ? right
                ? "border-[#1E7B4F] bg-[#1E7B4F] text-white"
                : picked
                  ? "border-[#C00000] bg-[#C00000] text-white"
                  : "border-[#5C6470] text-[#5C6470]"
              : picked
                ? "border-primary-700 bg-primary-700 text-white"
                : "border-[#5C6470] text-[#5C6470]";
            return (
              <button
                key={i}
                disabled={shown}
                onClick={() => pick(q, i)}
                className={`flex items-start gap-3 rounded-md border-[1.5px] px-3.5 py-3 text-left text-base text-[#2D3540] disabled:cursor-default ${cls}`}
              >
                <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border-[1.5px] text-sm font-bold ${letterCls}`}>{L[i]}</span>
                <span className="flex-1">{t}</span>
                {mk && <span className={`whitespace-nowrap pl-2 text-[13px] font-bold ${right ? "text-[#1E7B4F]" : "text-[#C00000]"}`}>{mk}</span>}
              </button>
            );
          })}
        </div>
        {shown && (
          <>
            <div className={`mt-5 rounded-md border-l-[6px] px-4 py-3.5 text-lg font-bold ${ok(q) ? "border-[#1E7B4F] bg-[#E8F5EE] text-[#1E7B4F]" : "border-[#C00000] bg-[#FBEAEC] text-[#C00000]"}`}>
              {ok(q) ? "Benar!" : "Salah."}
              <small className="mt-1 block text-[15px] font-normal text-[#2D3540]">
                {ok(q)
                  ? `Jawaban Anda ${letters(chosen)} tepat.`
                  : `Anda memilih ${letters(chosen)}. Jawaban yang benar adalah ${letters(q.a)}.`}
              </small>
            </div>
            <div className="mt-3 grid gap-2">
              {wrongPicked.map((i) => (
                <div key={`w${i}`} className="rounded-md border-l-4 border-[#C00000] bg-[#F4F4F6] px-3.5 py-2.5 text-[15px]">
                  <b className="text-[#2D3540]">Kenapa {L[i]} salah (pilihan Anda):</b>
                  {paras(q.w[i])}
                </div>
              ))}
              {q.a.map((i) => (
                <div key={`c${i}`} className="rounded-md border-l-4 border-[#1E7B4F] bg-[#F4F4F6] px-3.5 py-2.5 text-[15px]">
                  <b className="text-[#2D3540]">
                    Kenapa {L[i]} benar{chosen.includes(i) ? " (pilihan Anda)" : ""}:
                  </b>
                  {paras(q.w[i])}
                </div>
              ))}
              {others.map((i) => (
                <div key={`o${i}`} className="rounded-md border-l-4 border-[#E1E2E6] bg-[#F4F4F6] px-3.5 py-2.5 text-[15px]">
                  <b className="text-[#2D3540]">Opsi {L[i]}:</b>
                  {paras(q.w[i])}
                </div>
              ))}
            </div>
            <div className="mt-2.5 text-[13px] text-[#5C6470]">Sumber soal: {srcLabel(q.src)}</div>
          </>
        )}
        <div className="mt-6 flex flex-wrap justify-between gap-2.5">
          <button className={btnCls("ghost")} onClick={() => go("home")}>
            Beranda
          </button>
          {shown ? (
            <button className={btnCls("solid")} onClick={() => (last ? go("chdone", { sel: [] }) : go("question", { qi: S.qi + 1, sel: [] }))}>
              {last ? `Selesai Chapter ${S.ci + 1}` : "Soal Berikutnya"}
            </button>
          ) : (
            <button className={btnCls("solid")} disabled={chosen.length !== need} onClick={() => reveal(q)}>
              Lihat Jawaban Benar
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderChDone = () => {
    const c = CAPM_CHAPTERS[S.ci];
    const sc = chScore(S.ci);
    const n = c.qs.length;
    const nxt = firstOpen();
    return (
      <div className="card">
        <Kicker>Chapter {S.ci + 1} selesai</Kicker>
        <h1 className="mt-2 text-[28px] font-bold leading-tight text-[#2D3540]">{c.title}</h1>
        <div className="mt-3 text-[56px] font-bold leading-none text-primary-700">
          {sc}
          <small className="text-[22px] font-normal text-[#5C6470]"> / {n} benar ({Math.round((sc / n) * 100)}%)</small>
        </div>
        <div className="my-3 flex flex-wrap gap-1.5">
          {c.qs.map((q, i) => (
            <span
              key={q.id}
              title={`Soal ${i + 1}`}
              className="flex h-[34px] w-[34px] items-center justify-center rounded font-bold text-white"
              style={{ background: ok(q) ? "#1E7B4F" : "#C00000" }}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <p className="text-[#5C6470]">
          {sc === n ? "Sempurna. Pertahankan." : sc >= 0.8 * n ? "Bagus. Tinjau kembali soal yang salah di rekap." : "Pelajari lagi pembahasannya, lalu lanjutkan ke chapter berikutnya."}
        </p>
        <div className="mt-6 flex flex-wrap justify-between gap-2.5">
          <button className={btnCls("ghost")} onClick={() => go("home")}>
            Beranda
          </button>
          {nxt >= 0 ? (
            <button className={btnCls("solid")} onClick={() => go("start", { ci: nxt, qi: 0, sel: [] })}>
              Lanjut ke Start Chapter {nxt + 1}
            </button>
          ) : (
            <button className={btnCls("solid")} onClick={() => go("recap")}>
              Lihat Rekap Hari Ini
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderRecap = () => {
    const done = CAPM_ALL.filter((q) => S.revealed[q.id]);
    const right = done.filter(ok).length;
    const allDone = done.length === CAPM_ALL.length;
    return (
      <>
        <div className="card">
          <Kicker>Rekap {allDone ? "Hari Ini" : "Sementara"}</Kicker>
          <h1 className="mt-2 text-[28px] font-bold leading-tight text-[#2D3540]">Hasil Simulasi Day 1</h1>
          <p className="mt-1.5 text-[#5C6470]">
            {S.name && <b className="text-[#2D3540]">{S.name}</b>}
            {S.name ? " · " : ""}
            {today(S.started)}
          </p>
          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            <div className="rounded-md bg-[#F4F4F6] p-4">
              <div className="text-sm text-[#5C6470]">Total benar</div>
              <div className="text-[30px] font-bold text-primary-700">
                {right} / {done.length}
              </div>
              {done.length < CAPM_ALL.length && <div className="text-[13px] text-[#5C6470]">{CAPM_ALL.length - done.length} soal belum dijawab</div>}
            </div>
            <div className="rounded-md bg-[#F4F4F6] p-4">
              <div className="text-sm text-[#5C6470]">Persentase</div>
              <div className="text-[30px] font-bold text-primary-700">{done.length ? Math.round((right / done.length) * 100) : 0}%</div>
            </div>
            <div className="rounded-md bg-[#F4F4F6] p-4">
              <div className="text-sm text-[#5C6470]">Chapter selesai</div>
              <div className="text-[30px] font-bold text-primary-700">
                {CAPM_CHAPTERS.filter((_, i) => chDone(i)).length} / {CAPM_CHAPTERS.length}
              </div>
            </div>
          </div>
          <h3 className="mt-5 mb-2 text-[17px] font-bold text-primary-700">Berdasarkan domain ECO</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="bg-primary-700 text-left text-white">
                  <th className="px-2.5 py-2 font-bold">Domain</th>
                  <th className="px-2.5 py-2 font-bold">Bobot ujian</th>
                  <th className="px-2.5 py-2 font-bold">Benar</th>
                  <th className="px-2.5 py-2 font-bold">%</th>
                  <th className="w-[22%] px-2.5 py-2 font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(CAPM_DOMAINS).map((dk) => {
                  const d = Number(dk);
                  const qs = CAPM_ALL.filter((q) => q.d === d);
                  const an = qs.filter((q) => S.revealed[q.id]);
                  const okc = an.filter(ok).length;
                  const p = an.length ? Math.round((okc / an.length) * 100) : 0;
                  return (
                    <tr key={dk} className="even:bg-[#FAFAFB]">
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">
                        <b>Domain {d}</b>
                        <br />
                        <span className="text-[13px] text-[#5C6470]">{CAPM_DOMAINS[d].name}</span>
                      </td>
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">{CAPM_DOMAINS[d].w}%</td>
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">
                        <b>
                          {okc} / {an.length}
                        </b>
                        {an.length < qs.length && <span className="ml-1 text-xs text-[#5C6470]">(dari {qs.length} soal)</span>}
                      </td>
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">{an.length ? `${p}%` : "-"}</td>
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">
                        <div className="h-2.5 min-w-[90px] overflow-hidden rounded-full bg-[#E1E2E6]">
                          <div className="h-full rounded-full bg-primary-700" style={{ width: `${p}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[13px] text-[#5C6470]">Bobot ujian adalah porsi soal per domain pada CAPM Exam Content Outline 2023. Jumlah soal per domain di Day 1 mengikuti materi hari ini.</p>
          <h3 className="mt-5 mb-2 text-[17px] font-bold text-primary-700">Berdasarkan chapter</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr className="bg-primary-700 text-left text-white">
                  <th className="px-2.5 py-2 font-bold">Chapter</th>
                  <th className="px-2.5 py-2 font-bold">Benar</th>
                  <th className="px-2.5 py-2 font-bold">%</th>
                  <th className="w-[22%] px-2.5 py-2 font-bold"></th>
                </tr>
              </thead>
              <tbody>
                {CAPM_CHAPTERS.map((c, i) => {
                  const an = c.qs.filter((q) => S.revealed[q.id]);
                  const okc = an.filter(ok).length;
                  const p = an.length ? Math.round((okc / an.length) * 100) : 0;
                  return (
                    <tr key={i} className="even:bg-[#FAFAFB]">
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">
                        {i + 1}. {c.title}
                      </td>
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">
                        <b>
                          {okc} / {an.length}
                        </b>
                      </td>
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">{an.length ? `${p}%` : "-"}</td>
                      <td className="border-b border-[#E1E2E6] px-2.5 py-2 align-middle">
                        <div className="h-2.5 min-w-[90px] overflow-hidden rounded-full bg-[#E1E2E6]">
                          <div className="h-full rounded-full bg-primary-700" style={{ width: `${p}%` }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="noprint mt-6 flex flex-wrap items-center gap-2.5">
            <button className={btnCls("solid")} onClick={exportPDF}>
              Unduh PDF
            </button>
            <button className={btnCls("ghost")} onClick={exportCSV}>
              Unduh CSV
            </button>
            <button className={btnCls("ghost")} onClick={copyCSV}>
              Salin rekap (CSV)
            </button>
            <button className={btnCls("ghost")} onClick={toggleAll}>
              {allOpen ? "Tutup semua pembahasan" : "Buka semua pembahasan"}
            </button>
            {!allDone && (
              <button className={btnCls("ghost")} onClick={() => go("home")}>
                Lanjutkan simulasi
              </button>
            )}
            <button className={btnCls("warn")} onClick={onReset}>
              {resetArmed ? "Klik sekali lagi untuk menghapus semua jawaban" : "Ulangi dari awal"}
            </button>
          </div>
          {dlMsg && (
            <p className={`noprint mt-2.5 min-h-[18px] text-[13px] ${dlMsg.bad ? "text-[#C00000]" : "text-[#5C6470]"}`}>{dlMsg.text}</p>
          )}
        </div>
        <div className="card" ref={reviewRef}>
          <Kicker>Review soal</Kicker>
          <h2 className="mt-1.5 text-[22px] font-bold text-[#2D3540]">Semua soal dan pembahasan</h2>
          <p className="mt-0 text-[#5C6470]">Klik soal untuk melihat jawaban Anda, jawaban benar dan pembahasannya.</p>
          {CAPM_CHAPTERS.map((c, ci) => (
            <div key={ci}>
              <h3 className="mt-4 mb-2 text-[17px] font-bold text-primary-700">
                Chapter {ci + 1} · {c.title}
              </h3>
              {c.qs.map((q, qi) => {
                const has = S.revealed[q.id];
                const ch = ans(q);
                const isOkQ = has && ok(q);
                const wrongPicked = ch.filter((i) => !q.a.includes(i));
                return (
                  <details key={q.id} className="rv mb-2.5 rounded-md border border-[#E1E2E6] bg-white">
                    <summary className="flex cursor-pointer list-none items-start gap-3 px-3.5 py-3 [&::-webkit-details-marker]:hidden">
                      <span className={`flex-none rounded-full px-2.5 py-0.5 text-[13px] font-bold text-white ${!has ? "bg-[#5C6470]" : isOkQ ? "bg-[#1E7B4F]" : "bg-[#C00000]"}`}>
                        {!has ? "Belum" : isOkQ ? "Benar" : "Salah"}
                      </span>
                      <span>
                        <b>{qi + 1}.</b> {q.q}
                        <br />
                        <span className="text-[13px] text-[#5C6470]">
                          Domain {q.d} · Task {q.t}
                        </span>
                      </span>
                    </summary>
                    <div className="rv-body px-3.5 pb-3.5 text-[15px]">
                      <p className="my-1.5">
                        <b>Jawaban Anda:</b>{" "}
                        {has ? ch.slice().sort((a, b) => a - b).map((i) => `${L[i]}. ${q.o[i]}`).join("; ") : "belum dijawab"}
                      </p>
                      <p className="my-1.5">
                        <b>Jawaban benar:</b> {q.a.map((i) => `${L[i]}. ${q.o[i]}`).join("; ")}
                      </p>
                      <div className="mt-3 grid gap-2">
                        {has &&
                          wrongPicked.map((i) => (
                            <div key={`rw${i}`} className="rounded-md border-l-4 border-[#C00000] bg-[#F4F4F6] px-3.5 py-2.5">
                              <b className="text-[#2D3540]">Kenapa {L[i]} salah:</b>
                              {paras(q.w[i])}
                            </div>
                          ))}
                        {q.a.map((i) => (
                          <div key={`rc${i}`} className="rounded-md border-l-4 border-[#1E7B4F] bg-[#F4F4F6] px-3.5 py-2.5">
                            <b className="text-[#2D3540]">Kenapa {L[i]} benar:</b>
                            {paras(q.w[i])}
                          </div>
                        ))}
                      </div>
                      <p className="mt-2.5 text-[13px] text-[#5C6470]">Sumber soal: {srcLabel(q.src)}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="capm-sim min-h-screen bg-[#F2F2F2] text-[16px] leading-[1.45] text-[#2D3540]">
      <header className="border-b-4 border-primary-700 bg-white">
        <div className="mx-auto flex max-w-[960px] items-center justify-between gap-4 px-5 py-3">
          <a href="/" aria-label="ExecuTrain">
            <img ref={logoRef} src="/logo.png" alt="ExecuTrain" className="h-[38px] w-auto" />
          </a>
          <div className="text-right">
            <b className="block text-lg text-primary-700">CAPM® Training Preparation</b>
            <span className="text-[13px] text-[#5C6470]">Day 1 · Exam Simulation</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[960px] px-5 pb-12 pt-6">
        {S.screen === "home" && renderHome()}
        {S.screen === "start" && renderStart()}
        {S.screen === "question" && renderQuestion()}
        {S.screen === "chdone" && renderChDone()}
        {S.screen === "recap" && renderRecap()}
      </main>
      <footer className="px-5 pb-6 text-center text-xs text-[#5C6470]">
        Soal diambil dari bank PMI CAPM Exam-Like Simulation (Percobaan 3, Percobaan 5, serta Kunci Jawaban &amp; Pembahasan), dipetakan ke chapter Day 1 dan domain CAPM Exam Content Outline 2023.
      </footer>
    </div>
  );
}
