import Link from "next/link";

export const metadata = {
  title: "KVKK Aydınlatma Metni | Yazıcı Otomasyon",
  description: "Kişisel verilerin korunması kanunu kapsamında aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-dark sm:px-10 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark-purple">
          Yasal
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-dark/75">
          Bu sayfa, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme amaçlıdır.
          Kesin hukuki metin ve güncellemeler için lütfen şirketinizle paylaşılan resmi dokümanları
          esas alın veya bizimle iletişime geçin.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex text-sm font-semibold text-lilac underline-offset-4 hover:underline"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
