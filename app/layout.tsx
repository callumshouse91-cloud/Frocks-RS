import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSite } from "@/lib/site";
import "./globals.css";

// next/font copies these into the site at build time. Visitors never contact Google.
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

const { name } = getSite();

export const metadata: Metadata = {
  title: { default: `${name} – bridal boutique`, template: `%s – ${name}` },
  description: `Wedding dresses at ${name}. Book an appointment to try them on.`,
};

export const viewport: Viewport = { themeColor: "#FBF8F3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
