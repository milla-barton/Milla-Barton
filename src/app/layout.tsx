import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Milla Barton — Architecte d'intérieur à Paris | Devis Gratuit",
  description:
    "Architecte d'intérieur à Paris & Meudon. Rénovation d'appartements et maisons sur mesure. Estimation gratuite sous 48h, sans engagement.",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WZX2D5ZT";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/images/hero/hero-1.webp" />
        <link rel="preload" as="image" href="/images/hero/hero-2.webp" />

      
        {/* End Google Tag Manager */}
      </head>
      <body>
    
        
        {children}
        <GoogleTagManager gtmId={GTM_ID} />
      </body>
    </html>
  );
}