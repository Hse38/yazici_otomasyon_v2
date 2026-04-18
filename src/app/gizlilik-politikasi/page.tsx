import Link from "next/link";

export const metadata = {
  title: "Gizlilik Politikası | Yazıcı Otomasyon",
  description: "Web sitesi ve iletişim kanalları için gizlilik politikası.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-dark sm:px-10 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-dark-purple">
          Yasal
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Gizlilik Politikası
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-dark/75">
          Bu politika, web sitemizi ziyaret ettiğinizde veya bizimle iletişime geçtiğinizde kişisel
          verilerinizin nasıl işlendiğine ilişkin genel ilkeleri özetler. Ayrıntılı ve güncel metin
          için şirket kayıtlarındaki resmi belgeleri takip edin.
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
