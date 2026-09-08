/** @format */

/** Scope framework (sumber: Framework wheel / FRAMEWORK_ITEM master data). */
export const FRAMEWORK_SCOPES: { id: string; label: string }[] = [
  { id: "ai", label: "Artificial Intelligence" },
  { id: "data", label: "Data Management, Analytics & Engineering" },
  { id: "auto", label: "Automation" },
  { id: "cyber", label: "Cybersecurity" },
  { id: "governance", label: "Governance Control, Risk Management" },
  { id: "service", label: "Service Management" },
  { id: "pm", label: "Project Management" },
  { id: "ea", label: "Enterprise Architecture" },
  { id: "core", label: "People Skill Development (Core)" },
];

/** Label scope dari id (fallback: title-case id). */
export const frameworkScopeLabel = (id?: string): string => {
  if (!id) return "";
  const found = FRAMEWORK_SCOPES.find((s) => s.id === id);
  if (found) return found.label;
  return id
    .split(/[_\-\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

/** Label pendek scope utk badge/kartu (hindari teks terlalu panjang). */
export const frameworkScopeShortLabel = (id?: string): string => {
  if (!id) return "";
  const found = FRAMEWORK_SCOPES.find((s) => s.id === id);
  if (!found) return id;
  return id === "ai" ? "AI" : found.label.split(",")[0];
};

/** Title-case nilai tanpa merusak akronim/label produk (maks. tiap kata). */
export function titleCase(value?: string): string {
  if (!value) return "-";
  return value
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}