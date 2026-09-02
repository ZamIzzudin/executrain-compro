/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */


export function serviceToSlug(serviceName: string): string {
  return serviceName.trim().replace(/\s+/g, "-").toLowerCase();
}

export function slugToCategory(slug: string): string {
  return slug.replace(/-/g, "_").toUpperCase();
}

export function serviceToCategoryFormat(serviceName: string): string {
  return serviceName.trim().replace(/\s+/g, "_").toUpperCase();
}


export function findServiceBySlug(services: any[], slug: string) {
  if (!services || !Array.isArray(services)) return null;

  return services.find(
    (service) => serviceToSlug(service.service_name) === slug
  );
}

export function servicesToNavFormat(services: any[]) {
  if (!services || !Array.isArray(services)) return [];

  return services.map((service) => ({
    name: service.service_name,
    slug: serviceToSlug(service.service_name),
  }));
}

export const formatDate = (date: Date | number = new Date()) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const IMAGE_FALLBACK =
  "https://storagewebsitetoj.blob.core.windows.net/image/1787026702579_dbec0a46a28d1563.jpg";

/**
 * Handler untuk <img onError> — ganti src dengan gambar fallback
 * saat URL gambar dari fetch data gagal dimuat (404/rusak).
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>
) => {
  const img = e.currentTarget;
  if (img.src !== IMAGE_FALLBACK) {
    img.src = IMAGE_FALLBACK;
  }
};

/**
 * Hitung end date berdasarkan start date dan duration (dalam hari).
 * End date = start date + (days - 1), karena hari pertama sudah dihitung sebagai start.
 * Misal: start 3 Mei, durasi 3 hari -> end 5 Mei.
 */
export const calculateEndDate = (
  startDate: string | Date,
  durationDays?: number
): Date => {
  const start = new Date(startDate);
  if (!durationDays || durationDays <= 1) return start;
  const end = new Date(start);
  end.setDate(end.getDate() + (durationDays - 1));
  return end;
};

export const cleanExcerpt = (text?: string) => {
  if (!text) return "-";

  const withoutHtml = text.replace(/<[^>]*>/g, " ");
  return withoutHtml
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
};

export const formatDeadline = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Open until filled";

export const isExpired = (date?: string) =>
  date ? new Date(date) < new Date() : false;

export const toList = (value?: string[]) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

/**
 * Build a WhatsApp deep link (wa.me) with an optional pre-filled message.
 *
 * @param number  - WhatsApp number in international format (digits only, e.g. "6281234567890")
 * @param message - Optional pre-filled chat text (will be URL-encoded)
 * @returns e.g. "https://wa.me/6281234567890?text=Hello"
 */
export function buildWhatsAppLink(number?: string, message?: string): string {
  const safeNumber = (number || "").replace(/[^\d]/g, "");
  if (!safeNumber) return "https://wa.me/";
  if (!message) return `https://wa.me/${safeNumber}`;
  return `https://wa.me/${safeNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Template pesan WhatsApp untuk berbagai konteks CTA.
 * Semua dalam Bahasa Indonesia.
 */
export const WHATSAPP_TEMPLATES = {
  /** CTA umum "Request Proposal" di homepage / landing */
  general:
    "Halo ExecuTrain, saya tertarik untuk mengetahui lebih lanjut tentang training yang tersedia. Boleh minta proposal dan detail lengkapnya? Terima kasih.",

  /** CTA "Join Now" di section 4 steps */
  join:
    "Halo ExecuTrain, saya ingin bergabung dan memulai training. Mohon informasinya untuk langkah selanjutnya. Terima kasih.",

  /** CTA di hero product detail / product list */
  product: (productName: string) =>
    `Halo ExecuTrain, saya tertarik dengan training "${productName}". Boleh minta proposal dan detail lengkapnya? Terima kasih.`,

  /** CTA di hero free trial detail */
  freeTrial: (productName: string) =>
    `Halo ExecuTrain, saya tertarik dengan free trial "${productName}". Boleh minta info detail dan cara pendaftarannya? Terima kasih.`,

  /** CTA di schedule detail (public class) */
  schedule: (scheduleName: string, date?: string) =>
    `Halo ExecuTrain, saya ingin mendaftar untuk kelas "${scheduleName}"${date ? ` pada ${date}` : ""}. Mohon informasi pendaftaran dan detailnya. Terima kasih.`,

  /** CTA di free trial schedule detail */
  freeTrialSchedule: (scheduleName: string, date?: string) =>
    `Halo ExecuTrain, saya ingin mendaftar free trial untuk kelas "${scheduleName}"${date ? ` pada ${date}` : ""}. Mohon informasi pendaftaran dan detailnya. Terima kasih.`,
} as const;