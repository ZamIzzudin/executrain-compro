/** @format */

export interface Question {
  no: number;
  cat: "D" | "I" | "S" | "C";
  text: string;
}

export interface Profile {
  code: string;
  name: string;
  color: string;
  karakter: string;
  kekuatan: string;
  waspada: string;
  cocok: string;
  tips: string;
}

export const QUESTIONS: Question[] = [
  { no: 1, cat: "S", text: "Saya sabar menghadapi pelanggan yang menunda keputusan pembelian berkali-kali." },
  { no: 2, cat: "D", text: "Saya lebih suka mengejar closing cepat daripada berlama-lama membangun obrolan dengan pelanggan." },
  { no: 3, cat: "C", text: "Saya suka mengikuti proses penjualan yang sistematis, langkah demi langkah." },
  { no: 4, cat: "I", text: "Saya optimis bisa mengubah penolakan pelanggan menjadi peluang closing." },
  { no: 5, cat: "D", text: "Saat pelanggan bilang harga terlalu mahal, saya langsung menawarkan solusi tanpa banyak berbasa-basi." },
  { no: 6, cat: "C", text: "Saya suka menyiapkan data teknis dan spesifikasi lengkap sebelum bertemu pelanggan." },
  { no: 7, cat: "I", text: "Saya mudah membangun obrolan akrab dengan pelanggan baru dalam waktu singkat." },
  { no: 8, cat: "S", text: "Saya lebih suka mendengarkan keluhan pelanggan sampai tuntas sebelum menjawab." },
  { no: 9, cat: "C", text: "Saya lebih percaya pada fakta dan sertifikasi produk dibanding klaim lisan semata." },
  { no: 10, cat: "D", text: "Saat menghadapi penolakan, saya tetap percaya diri dan tidak mudah goyah." },
  { no: 11, cat: "S", text: "Saya cenderung menghindari perdebatan meski pelanggan menolak berkali-kali." },
  { no: 12, cat: "I", text: "Saat presentasi produk, saya suka bercerita dan membuat suasana jadi hidup." },
  { no: 13, cat: "D", text: "Saya suka menantang diri dengan target penjualan yang tinggi." },
  { no: 14, cat: "C", text: "Saya berhati-hati memberi janji ke pelanggan agar tidak meleset dari kenyataan." },
  { no: 15, cat: "S", text: "Saya setia menjaga hubungan jangka panjang dengan pelanggan lama." },
  { no: 16, cat: "I", text: "Saya lebih suka meyakinkan pelanggan lewat cerita/testimoni daripada data teknis." },
  { no: 17, cat: "D", text: "Saya cenderung langsung ke inti penawaran tanpa banyak basa-basi atau pengantar panjang." },
  { no: 18, cat: "S", text: "Saya lebih nyaman melayani pelanggan yang sudah dikenal daripada mencari pelanggan baru." },
  { no: 19, cat: "C", text: "Saya suka menganalisis dulu akar penyebab penolakan sebelum menjawab pelanggan." },
  { no: 20, cat: "I", text: "Saya senang menjalin relasi personal dengan pelanggan, bukan sekadar transaksi jual-beli." },
  { no: 21, cat: "D", text: "Saya tidak masalah bernegosiasi alot dengan pelanggan yang sulit diajak deal." },
  { no: 22, cat: "I", text: "Saya mudah antusias saat menjelaskan keunggulan produk ke pelanggan." },
  { no: 23, cat: "S", text: "Saya butuh waktu untuk beradaptasi dengan perubahan target/strategi penjualan mendadak." },
  { no: 24, cat: "C", text: "Saya merasa tidak nyaman menawarkan produk tanpa persiapan data yang matang." },
  { no: 25, cat: "D", text: "Saya tidak sabar jika proses closing berjalan terlalu lambat." },
  { no: 26, cat: "C", text: "Saya cenderung skeptis dan ingin bukti dulu sebelum meyakinkan pelanggan dengan klaim tertentu." },
  { no: 27, cat: "I", text: "Saya lebih nyaman bekerja dengan banyak relasi/pelanggan dibanding bekerja sendirian." },
  { no: 28, cat: "S", text: "Saya senang membantu pelanggan meski belum tentu langsung closing hari itu." },
  { no: 29, cat: "D", text: "Saya suka memegang kendali penuh saat presentasi produk ke pelanggan." },
  { no: 30, cat: "S", text: "Saya tetap tenang meski menghadapi penolakan berkali-kali dalam sehari." },
  { no: 31, cat: "C", text: "Saya lebih suka bekerja mandiri menyiapkan proposal penawaran dengan detail presisi." },
  { no: 32, cat: "I", text: "Saya cenderung mengandalkan intuisi saat membaca suasana hati pelanggan." },
];

export const PROFILES: Record<string, Profile> = {
  D: {
    code: "D",
    name: "Dominance — Sang Penggerak",
    color: "#C7433C",
    karakter:
      "Tegas, cepat mengambil keputusan, suka tantangan, langsung ke inti, kompetitif.",
    kekuatan:
      "Berani bernegosiasi, cepat bertindak, fokus tinggi pada pencapaian target closing.",
    waspada:
      "Bisa terkesan blak-blakan/tidak sabar; rawan memotong pembicaraan sebelum menggali kebutuhan tuntas.",
    cocok:
      "Upstream Tier (Project Owner/Developer) yang butuh keputusan cepat & to-the-point; negosiasi Mid Tier.",
    tips:
      'Kuat menghadapi \u201CHarga terlalu mahal\u201D (percaya diri reframe ke nilai). Perlu hati-hati di \u201CTidak percaya kualitas\u201D — jangan memaksa, tunjukkan bukti konkret, bukan sekadar keyakinan diri.',
  },
  I: {
    code: "I",
    name: "Influence — Sang Motivator",
    color: "#DE9A17",
    karakter:
      "Ramah, ekspresif, antusias, mudah bergaul, persuasif, suka bercerita.",
    kekuatan:
      "Sangat mudah membangun rapport awal, presentasi produk lebih hidup, memperluas relasi cepat.",
    waspada:
      "Bisa terlalu banyak bicara sehingga kurang menggali kebutuhan; rawan janji berlebihan.",
    cocok:
      "Downstream Shop Owner & Mid Tier Kontraktor yang menghargai kedekatan personal dan obrolan santai.",
    tips:
      'Kuat menghadapi \u201CBarang tidak dibutuhkan\u201D (mudah gali kebutuhan lewat obrolan). Perlu hati-hati di \u201CHarga terlalu mahal\u201D — jangan asal janji diskon demi menyenangkan pelanggan.',
  },
  S: {
    code: "S",
    name: "Steadiness — Sang Penopang",
    color: "#37956A",
    karakter:
      "Sabar, suportif, konsisten, menghindari konflik, loyal, tenang di bawah tekanan.",
    kekuatan:
      "Unggul menjaga loyalitas pelanggan jangka panjang, pelanggan merasa nyaman tanpa tertekan.",
    waspada:
      "Cenderung menghindari closing tegas; bisa terlalu lama di tahap membangun hubungan.",
    cocok:
      "Downstream Workshop/Tukang Spesialis yang butuh kesabaran, follow-up konsisten, dan hubungan jangka panjang.",
    tips:
      'Kuat menghadapi \u201CButuh tapi tidak sekarang\u201D & \u201CWaktu tidak tepat\u201D (sabar follow-up terjadwal). Perlu didorong lebih tegas & proaktif saat momen closing tiba.',
  },
  C: {
    code: "C",
    name: "Conscientiousness — Sang Analis",
    color: "#3D6FB4",
    karakter:
      "Teliti, sistematis, berorientasi data & fakta, berhati-hati, suka standar jelas.",
    kekuatan:
      "Kuat dalam presentasi berbasis data teknis, dokumentasi rapi, dipercaya untuk justifikasi rasional.",
    waspada:
      "Bisa terlalu lama menganalisis sebelum bertindak; rawan kaku secara emosional.",
    cocok:
      "Modern Retail Purchasing & Upstream Architect/Design Consultant yang butuh data teknis, sertifikasi, dokumentasi lengkap.",
    tips:
      "Kuat menghadapi \u201CTidak percaya kualitas\u201D (siap dengan data/sertifikasi/uji lab). Perlu menyederhanakan penjelasan saat menghadapi pelanggan awam seperti Tukang/homeowner.",
  },
};

export const NAMES: Record<string, string> = {
  D: "Dominance",
  I: "Influence",
  S: "Steadiness",
  C: "Conscientiousness",
};

export const ORDER = ["D", "I", "S", "C"] as const;
