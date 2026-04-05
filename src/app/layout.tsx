import type { Metadata } from "next";
import "./globals.css";
import GtagInit from "@/components/GtagInit";

export const metadata: Metadata = {
  title: "Milla Barton — Architecte d'intérieur à Paris | Devis Gratuit",
  description:
    "Architecte d'intérieur à Paris & Meudon. Rénovation d'appartements et maisons sur mesure. Estimation gratuite sous 48h, sans engagement.",
};

const GTM_ID = "GTM-N2DTQRVT";

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

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <GtagInit />
        {children}
      </body>
    </html>
  );
}