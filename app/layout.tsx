import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "@/components/ui/toaster";
import { getClientConfig, getConfig } from "@/components/shared/services/config/config";
const commissioner = Commissioner({
  subsets: ["latin", "cyrillic"],
  variable: "--font-commissioner",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "ЕГАИС Мониторинг",
    description: "Управляйте вашими данными из ЕГАИС",
    keywords: "alcospot, monitoring"
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${commissioner.variable} antialiased`}>
        <Header />
        <main className="min-h-screen bg-white">{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
