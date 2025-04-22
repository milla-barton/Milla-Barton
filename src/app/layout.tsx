import type { Metadata } from "next";
import { Cookie, Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milla Barton – Transformez votre interieur",
  description: "Transformez votre intérieur en un lieu qui vous ressemble avec MB Interior Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
