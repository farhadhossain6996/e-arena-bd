import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LiveTicker from "@/components/layout/LiveTicker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-ARENA BD | Play 1v1 & Win Real Taka",
  description: "Bangladesh's skill-gaming arena with secure escrow.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <Navbar/>
        <LiveTicker/>
       <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
          E-ARENA BD · Skill-based gaming · 18+ only · Play responsibly
        </footer>
        </body>
    </html>
  );
}
