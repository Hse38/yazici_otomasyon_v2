import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import { ChatbotProvider } from "../contexts/ChatbotContext";
import { NavProvider } from "../contexts/NavContext";
import { PageTransition } from "../components/PageTransition";
import { SmoothScrollProvider } from "../components/SmoothScrollProvider";
import { getPublicSiteUrl } from "../lib/seo";

const siteUrl = getPublicSiteUrl();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const HOME_TITLE = "Yazıcı Otomasyon | Endüstri 4.0 Sensör ve Otomasyon";
const HOME_DESCRIPTION =
  "İstanbul merkezli endüstriyel otomasyon tedariki: safety, sensör, PLC/HMI, encoder ve instrument. Otomotiv, gıda, ilaç, tekstil ve OEM hatları için teknik danışmanlık. +90 553 056 89 39 · info@yaziciotomasyon.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: HOME_TITLE,
    description:
      "Endüstriyel otomasyon ürünleri ve teknik tedarik desteği. Ürünlerimizi görün, iletişime geçin.",
    url: siteUrl,
    siteName: "Yazıcı Otomasyon",
    images: [
      {
        url: "/img/product-1.jpg",
        width: 1200,
        height: 630,
        alt: "Yazıcı Otomasyon endüstriyel otomasyon ürün gamı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
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
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <SmoothScrollProvider>
          <ChatbotProvider>
            <NavProvider>
              <PageTransition>
                {children}
              </PageTransition>
            </NavProvider>
          </ChatbotProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
