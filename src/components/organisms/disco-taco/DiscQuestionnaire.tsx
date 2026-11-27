/** @format */

import { useState, useEffect, useRef, useCallback } from "react";
import { QUESTIONS, PROFILES, NAMES, ORDER } from "./data";
import styles from "@/styles/disco-taco.module.css";

interface Answers {
  [no: number]: number;
}

interface Result {
  nama: string;
  tanggal: string;
  divisi: string;
  jabatan: string;
  totals: Record<string, number>;
  domCodes: string[];
  secCodes: string[];
}

function fmtTanggal(iso: string): string {
  if (!iso) return "-";
  const bln = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${bln[m - 1]} ${y}`;
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function todayISO(): string {
  const t = new Date();
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
}

export default function DiscQuestionnaire() {
  const [answers, setAnswers] = useState<Answers>({});
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [divisi, setDivisi] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [namaInvalid, setNamaInvalid] = useState(false);
  const [missingNos, setMissingNos] = useState<Set<number>>(new Set());
  const [result, setResult] = useState<Result | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });
  const [pdfBusy, setPdfBusy] = useState(false);
  const hasilRef = useRef<HTMLDivElement>(null);
  const pdfStageRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    setTanggal(todayISO());
  }, []);

  const answeredCount = Object.keys(answers).length;

  const handleAnswer = useCallback((no: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [no]: value }));
    setMissingNos((prev) => {
      const next = new Set(prev);
      next.delete(no);
      return next;
    });
  }, []);

  const handleLihatHasil = useCallback(() => {
    // validate name
    if (!nama.trim()) {
      setNamaInvalid(true);
      return;
    }
    setNamaInvalid(false);

    // validate all answered
    const missing = QUESTIONS.filter((q) => !answers[q.no]).map((q) => q.no);
    if (missing.length > 0) {
      setMissingNos(new Set(missing));
      // scroll to first missing
      setTimeout(() => {
        questionRefs.current[missing[0]]?.scrollIntoView({ block: "center" });
      }, 50);
      return;
    }

    // compute
    const totals: Record<string, number> = { D: 0, I: 0, S: 0, C: 0 };
    QUESTIONS.forEach((q) => {
      totals[q.cat] += answers[q.no];
    });

    const sorted = [...ORDER].sort(
      (a, b) => totals[b] - totals[a] || ORDER.indexOf(a) - ORDER.indexOf(b),
    );
    const maxScore = totals[sorted[0]];
    const domCodes = ORDER.filter((k) => totals[k] === maxScore);
    const secScore = ORDER.map((k) => totals[k])
      .filter((v) => v < maxScore)
      .sort((a, b) => b - a)[0];
    const secCodes =
      secScore === undefined ? [] : ORDER.filter((k) => totals[k] === secScore);

    const r: Result = {
      nama: nama.trim(),
      tanggal,
      divisi: divisi.trim(),
      jabatan: jabatan.trim(),
      totals,
      domCodes,
      secCodes,
    };

    setResult(r);

    setTimeout(() => {
      hasilRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [nama, tanggal, divisi, jabatan, answers]);

  const handleReset = useCallback(() => {
    setShowConfirm(false);
    setAnswers({});
    setMissingNos(new Set());
    setResult(null);
    setPdfStatus({ type: "", msg: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDownloadPdf = useCallback(async () => {
    if (!result) return;
    setPdfBusy(true);
    setPdfStatus({ type: "", msg: "" });

    const r = result;
    const dom = PROFILES[r.domCodes[0]];

    const now = new Date();
    const pad = (x: number) => String(x).padStart(2, "0");

    const rows = ORDER.map((k) => {
      const pct = Math.round((r.totals[k] / 40) * 100);
      const hl = r.domCodes.includes(k) ? ' style="background:#F5F8FB"' : "";
      return (
        `<tr${hl}>` +
        `<td><span class="r-chip" style="background:${PROFILES[k].color}">${k}</span>${NAMES[k]}</td>` +
        `<td class="r-barcell"><div class="r-track"><div class="r-fill" style="width:${pct}%;background:${PROFILES[k].color}"></div></div></td>` +
        `<td style="text-align:right;font-weight:700">${r.totals[k]} / 40</td>` +
        `<td style="text-align:right">${pct}%</td></tr>`
      );
    }).join("");

    const domLabel = r.domCodes.map((c) => PROFILES[c].name).join(" + ");
    const secLabel = r.secCodes.length
      ? r.secCodes.map((c) => PROFILES[c].name).join(" + ")
      : "\u2014";

    const refBox = (h: string, p: string) =>
      `<div class="r-ref"><h4>${h}</h4><p>${p}</p></div>`;

    const reportHTML = `
<div class="report" id="report-el">
  <div class="r-band">
    <div class="r-eyebrow">Consultative Selling &amp; Objection Handling</div>
    <h1>Hasil Kuesioner Profil Perilaku DISC</h1>
  </div>
  <div class="r-meta">
    <div><div class="k">Nama Peserta</div><div class="v">${esc(r.nama)}</div></div>
    <div><div class="k">Divisi / Tim</div><div class="v">${esc(r.divisi || "-")}</div></div>
    <div><div class="k">Jabatan</div><div class="v">${esc(r.jabatan || "-")}</div></div>
    <div><div class="k">Tanggal</div><div class="v">${fmtTanggal(r.tanggal)}</div></div>
  </div>
  <h2>Skor per Kategori</h2>
  <table><thead><tr><th>Tipe</th><th>Skor</th><th style="text-align:right">Total</th><th style="text-align:right">Persentase</th></tr></thead>
  <tbody>${rows}</tbody></table>
  <div class="r-dom" style="background:${dom.color}">
    <div class="t">Tipe Dominan</div><h3>${domLabel}</h3>
  </div>
  <div class="r-sec">Tipe Sekunder: <b>${secLabel}</b></div>
  <h2>Ringkasan Profil Anda${r.domCodes.length > 1 ? ` (Tipe ${r.domCodes[0]})` : ""}</h2>
  ${refBox("Karakter Utama", dom.karakter)}
  ${refBox("Kekuatan dalam Consultative Selling", dom.kekuatan)}
  ${refBox("Yang Perlu Diwaspadai", dom.waspada)}
  ${refBox("Paling Cocok Menghadapi Tipe Customer", dom.cocok)}
  ${refBox("Tips Menghadapi Objection", dom.tips)}
  <div class="r-foot"><span>Kuesioner Profil Perilaku DISC \u2014 TACO</span>
  <span>Dibuat ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}</span></div>
</div>`;

    const stage = pdfStageRef.current;
    if (!stage) return;
    stage.innerHTML = reportHTML;
    stage.style.display = "block";

    // Wait for render
    await new Promise((res) =>
      requestAnimationFrame(() => setTimeout(res, 300)),
    );

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const el = stage.querySelector("#report-el") as HTMLElement;
      const safeName =
        r.nama
          .replace(/[^\w\- ]+/g, "")
          .trim()
          .replace(/\s+/g, "_") || "Peserta";
      const filename = `Hasil_DISC_TACO_${safeName}.pdf`;

      const blob: Blob = await html2pdf()
        .set({
          margin: [8, 8, 10, 8],
          image: { type: "jpeg", quality: 0.96 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            scrollX: 0,
            scrollY: 0,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css"] },
        } as any)
        .from(el)
        .output("blob");

      const url = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setPdfStatus({ type: "ok", msg: `PDF berhasil diunduh: ${filename}` });
      setTimeout(() => URL.revokeObjectURL(url), 120000);
    } catch (e) {
      console.error(e);
      setPdfStatus({
        type: "err",
        msg: "Gagal membuat PDF. Coba lagi, atau gunakan menu Print browser (Ctrl/Cmd+P) lalu pilih \u201CSave as PDF\u201D.",
      });
    } finally {
      stage.style.display = "none";
      stage.innerHTML = "";
      setPdfBusy(false);
    }
  }, [result]);

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.wrap}>
          <div className={styles.eyebrow}>
            Consultative Selling &amp;
            Objection Handling
          </div>
          <h1 className={styles.title}>Kuesioner Profil Perilaku DISC</h1>
          <div className={styles.discStrip} aria-hidden="true">
            <span className={styles.bd}>D</span>
            <span className={styles.bi}>I</span>
            <span className={styles.bs}>S</span>
            <span className={styles.bc}>C</span>
          </div>
          <p className={styles.headerSub}>
            Kenali gaya perilaku Anda dalam menghadapi pelanggan — Dominance,
            Influence, Steadiness, Conscientiousness — dan kaitannya dengan
            consultative selling.
          </p>
        </div>
      </header>

      <main className={styles.wrap}>
        {/* Profil peserta */}
        <section className={`${styles.card} ${styles.profileCard}`}>
          <h2 className={styles.cardTitle}>Data Peserta</h2>
          <p className={styles.hint}>
            Isi data diri Anda terlebih dahulu. Data ini akan tercantum pada
            laporan PDF hasil profil Anda.
          </p>
          <div className={styles.grid2}>
            <div
              className={`${styles.field} ${namaInvalid ? styles.invalid : ""}`}
            >
              <label>
                Nama Peserta <span className={styles.req}>*</span>
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => {
                  setNama(e.target.value);
                  setNamaInvalid(false);
                }}
                placeholder="cth: Budi Santoso"
                autoComplete="name"
              />
              <div className={styles.fieldErr}>Nama peserta wajib diisi.</div>
            </div>
            <div className={styles.field}>
              <label>Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Divisi / Tim</label>
              <input
                type="text"
                value={divisi}
                onChange={(e) => setDivisi(e.target.value)}
                placeholder="cth: Sales Area Jakarta"
              />
            </div>
            <div className={styles.field}>
              <label>
                Jabatan{" "}
                <span style={{ fontWeight: 400, color: "var(--muted)" }}>
                  (opsional)
                </span>
              </label>
              <input
                type="text"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                placeholder="cth: Sales Executive"
              />
            </div>
          </div>
        </section>

        {/* Petunjuk */}
        <section className={styles.instruksi}>
          <strong>Petunjuk:</strong> Beri skor <strong>1–5</strong> pada tiap
          pernyataan sesuai seberapa sesuai dengan diri Anda <em>apa adanya</em>{" "}
          dalam menghadapi pelanggan (bukan yang ideal). Tidak ada jawaban benar
          atau salah.
          <div className={styles.scaleLegend}>
            <span>1 = Sangat tidak sesuai</span>
            <span>5 = Sangat sesuai</span>
          </div>
        </section>

        {/* Questions */}
        <section className={styles.qSection}>
          {QUESTIONS.map((q) => {
            const isAnswered = !!answers[q.no];
            const isMissing = missingNos.has(q.no);
            return (
              <div
                key={q.no}
                ref={(el) => {
                  questionRefs.current[q.no] = el;
                }}
                className={`${styles.qItem} ${isAnswered ? styles.answered : ""} ${isMissing ? styles.missing : ""}`}
              >
                <div className={styles.qNo}>{q.no}</div>
                <div className={styles.qText}>{q.text}</div>
                <div
                  className={styles.qScale}
                  role="radiogroup"
                  aria-label={`Skor untuk pernyataan ${q.no}`}
                >
                  {[1, 2, 3, 4, 5].map((v) => (
                    <label
                      key={v}
                      title={
                        v === 1
                          ? "1 — Sangat tidak sesuai"
                          : v === 5
                            ? "5 — Sangat sesuai"
                            : String(v)
                      }
                    >
                      <input
                        type="radio"
                        name={`q${q.no}`}
                        value={v}
                        checked={answers[q.no] === v}
                        onChange={() => handleAnswer(q.no, v)}
                      />
                      <span className={styles.dot}>{v}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Hasil */}
        {result && (
          <section className={styles.hasil} ref={hasilRef}>
            <div className={styles.card}>
              <div className={styles.hasilHead}>
                <h2 className={styles.hasilTitle}>Hasil Skor DISC Anda</h2>
                <div className={styles.who}>
                  {result.nama}
                  {result.divisi ? ` · ${result.divisi}` : ""}
                  {" · "}
                  {fmtTanggal(result.tanggal)}
                </div>
              </div>

              {/* Bars */}
              <div className={styles.bars}>
                {ORDER.map((k) => {
                  const pct = Math.round((result.totals[k] / 40) * 100);
                  return (
                    <div key={k} className={styles.barRow}>
                      <div className={styles.barLabel}>
                        <span
                          className={styles.chip}
                          style={{ background: PROFILES[k].color }}
                        >
                          {k}
                        </span>
                        {NAMES[k]}
                      </div>
                      <div className={styles.barTrack}>
                        <div
                          className={styles.barFill}
                          style={{
                            width: `${pct}%`,
                            background: PROFILES[k].color,
                          }}
                        />
                      </div>
                      <div className={styles.barVal}>
                        {result.totals[k]}/40 &middot; {pct}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dominant card */}
              {(() => {
                const dom = PROFILES[result.domCodes[0]];
                const domLabel = result.domCodes
                  .map((c) => PROFILES[c].name)
                  .join("  +  ");
                return (
                  <div
                    className={styles.domCard}
                    style={{ background: dom.color }}
                  >
                    <div className={styles.domGlyph}>
                      {result.domCodes.join("\u00b7")}
                    </div>
                    <div className={styles.domInfo}>
                      <div className={styles.domTag}>Tipe Dominan Anda</div>
                      <h3 className={styles.domName}>{domLabel}</h3>
                      <p className={styles.domChar}>
                        {result.domCodes.length > 1
                          ? `Skor tertinggi Anda seri pada ${result.domCodes.length} tipe. Ringkasan di bawah menampilkan profil tipe ${result.domCodes[0]}; baca juga referensi tipe lainnya.`
                          : dom.karakter}
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* Secondary */}
              <p className={styles.secLine}>
                {result.secCodes.length ? (
                  <>
                    Tipe Sekunder:{" "}
                    <b>
                      {result.secCodes.map((c) => PROFILES[c].name).join(" + ")}
                    </b>{" "}
                    — kombinasi tipe dominan dan sekunder memberi gambaran gaya
                    menjual Anda yang paling utuh.
                  </>
                ) : (
                  "Skor Anda merata di keempat tipe."
                )}
              </p>

              {/* Reference boxes */}
              {(() => {
                const dom = PROFILES[result.domCodes[0]];
                const boxes: [string, string, boolean][] = [
                  ["Kekuatan dalam Consultative Selling", dom.kekuatan, false],
                  ["Yang Perlu Diwaspadai", dom.waspada, false],
                  ["Paling Cocok Menghadapi Tipe Customer", dom.cocok, false],
                  ["Tips Menghadapi Objection", dom.tips, true],
                ];
                return (
                  <div className={styles.refGrid}>
                    {boxes.map(([h, p, full]) => (
                      <div
                        key={h}
                        className={`${styles.refBox} ${full ? styles.full : ""}`}
                      >
                        <h4>{h}</h4>
                        <p>{p}</p>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Actions */}
              <div className={styles.hasilActions}>
                <button
                  className={`${styles.btn} ${styles.btnDark}`}
                  onClick={handleDownloadPdf}
                  disabled={pdfBusy}
                >
                  {pdfBusy ? "Menyiapkan PDF\u2026" : "Download PDF"}
                </button>
                <button
                  className={`${styles.btn} ${styles.btnOutline}`}
                  onClick={() => setShowConfirm(true)}
                >
                  Isi Ulang Kuesioner
                </button>
              </div>
              <p className={styles.pdfNote}>
                Laporan PDF berisi data peserta, tabel skor, tipe dominan &amp;
                sekunder, dan ringkasan profil lengkap Anda.
              </p>
              {pdfStatus.msg && (
                <div
                  className={`${styles.pdfStatus} ${pdfStatus.type === "ok" ? styles.ok : pdfStatus.type === "warn" ? styles.warn : pdfStatus.type === "err" ? styles.err : ""}`}
                >
                  {pdfStatus.msg}
                </div>
              )}
            </div>
          </section>
        )}

        <footer className={styles.footer}>
          Kuesioner Profil Perilaku DISC &middot; Consultative Selling &amp;
          Objection Handling
        </footer>
      </main>

      {/* Sticky progress bar */}
      <div className={styles.progressBar} role="status" aria-live="polite">
        <div className={styles.progressInner}>
          <div className={styles.count}>{answeredCount} / 32 terjawab</div>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${(answeredCount / 32) * 100}%` }}
            />
          </div>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleLihatHasil}
          >
            Lihat Hasil
          </button>
        </div>
      </div>

      {/* Confirm dialog */}
      {showConfirm && (
        <div
          className={styles.confirmOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConfirm(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowConfirm(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.confirmBox}>
            <h3>Isi ulang kuesioner?</h3>
            <p>
              Semua jawaban dan hasil akan dihapus. Data peserta tetap tersimpan
              di formulir.
            </p>
            <div className={styles.confirmActions}>
              <button
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </button>
              <button
                className={`${styles.btn} ${styles.btnDark}`}
                onClick={handleReset}
              >
                Ya, Hapus Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Off-screen PDF stage */}
      <div
        ref={pdfStageRef}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(21,32,45,.62)",
          overflow: "auto",
          padding: "24px 12px",
        }}
      />
    </div>
  );
}
