import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins, Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AURA The Beauty Lounge | Premium Salon in Bettiah",
    template: "%s | AURA The Beauty Lounge"
  },
  description: "Experience premium beauty & wellness at AURA The Beauty Lounge. Best unisex salon in Bettiah offering luxury Hair, Skin, Makeup, Nails, and Spa services.",
  keywords: ["best salon in Bettiah", "luxury salon", "bridal makeup", "hair styling", "AURA Beauty Lounge", "unisex salon"],
  authors: [{ name: "AURA The Beauty Lounge" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://aurabeautylounge.in",
    title: "AURA The Beauty Lounge | Premium Salon in Bettiah",
    description: "Experience premium beauty & wellness at AURA The Beauty Lounge. Best unisex salon in Bettiah offering luxury Hair, Skin, Makeup, Nails, and Spa services.",
    siteName: "AURA The Beauty Lounge",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AURA The Beauty Lounge"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA The Beauty Lounge | Premium Salon in Bettiah",
    description: "Experience premium luxury beauty & wellness at AURA.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL('https://aurabeautylounge.in'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} ${inter.variable} antialiased font-sans flex flex-col min-h-screen bg-ivory text-luxury-black`}
      >
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
