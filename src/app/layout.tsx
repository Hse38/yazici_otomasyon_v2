import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { ChatbotProvider } from "../contexts/ChatbotContext";
import { NavProvider } from "../contexts/NavContext";
import { IntroVideoOverlay } from "../components/IntroVideoOverlay";
import { PageTransition } from "../components/PageTransition";
import { SITE_ORIGIN } from "../lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: "Yazıcı Otomasyon | Endüstriyel Otomasyon Ürünleri",
  description:
    "Endüstriyel otomasyon ürünleri, teknik danışmanlık ve tedarik. Ürün gamımızı inceleyin; stok ve teknik bilgi için +90 553 056 89 39.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    "endüstriyel otomasyon",
    "otomasyon ürünleri",
    "sürücü",
    "PLC",
    "Yazıcı Otomasyon",
  ],
  alternates: {
    canonical: SITE_ORIGIN,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Yazıcı Otomasyon | Endüstriyel Otomasyon Ürünleri",
    description:
      "Endüstriyel otomasyon ürünleri ve teknik tedarik desteği. Ürünlerimizi görün, iletişime geçin.",
    url: SITE_ORIGIN,
    siteName: "Yazıcı Otomasyon",
    images: [
      {
        url: "/img/product-1.jpg",
        width: 1200,
        height: 630,
        alt: "Yazıcı Otomasyon ürün görseli",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yazıcı Otomasyon | Endüstriyel Otomasyon Ürünleri",
    description:
      "Endüstriyel otomasyon ürünleri ve teknik tedarik desteği. Ürünlerimizi görün, iletişime geçin.",
    images: ["/img/product-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <ChatbotProvider>
          <NavProvider>
            <PageTransition>
              {children}
            </PageTransition>
            <IntroVideoOverlay />
          </NavProvider>
        </ChatbotProvider>
      </body>
    </html>
  );
}
