import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "@/components/ui/toaster";
import { redis } from "@/app/api/redis/route";

const commissioner = Commissioner({
  subsets: ["latin", "cyrillic"],
  variable: "--font-commissioner",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const title = await redis.get("page_title");
  const description = await redis.get("page_description");

  return {
    title: title || "Default Title",
    description: description || "Default Description",
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
