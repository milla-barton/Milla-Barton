import type { Metadata } from "next";
import "./globals.css";
import GtagInit from "@/components/GtagInit";

export const metadata: Metadata = {
  title: "Milla Barton — Architecte d'intérieur à Paris | Devis Gratuit",
  description: "Architecte d'intérieur à Paris & Meudon. Rénovation d'appartements et maisons sur mesure. Estimation gratuite sous 48h, sans engagement.",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');` }} />
          </>
        )}
      </head>
      <body>
        <GtagInit gaId={GA_ID} />
        {children}
      </body>
    </html>
  );
}
