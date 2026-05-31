export type Branch = {
  id: "istanbul" | "trakya";
  phone: string;
  tel: string;
  label: { tr: string; en: string };
  region: { tr: string; en: string };
};

export const BRANCHES: readonly Branch[] = [
  {
    id: "istanbul",
    phone: "+90 553 056 89 39",
    tel: "+905530568939",
    label: { tr: "İstanbul Merkez Şube", en: "Istanbul Main Branch" },
    region: { tr: "İstanbul", en: "Istanbul" },
  },
  {
    id: "trakya",
    phone: "+90 532 056 34 39",
    tel: "+905320563439",
    label: { tr: "Trakya Şube", en: "Thrace Branch" },
    region: { tr: "Trakya", en: "Thrace" },
  },
] as const;

export const WHATSAPP_HREF = "https://wa.me/905530568939";
export const CONTACT_EMAIL = "info@yaziciotomasyon.com";
