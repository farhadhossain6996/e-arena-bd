import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LiveTicker from "@/components/layout/LiveTicker";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-ARENA BD",
  description:
    "Bangladesh's skill-gaming arena. Challenge players, lock funds in secure escrow, and get paid the moment results are verified.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark bg-[#09090b]">
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-[#09090b] text-zinc-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        <Navbar />
        <LiveTicker />
        <main className="flex-1 bg-[#09090b]">{children}</main>
        <footer className="border-t border-zinc-800/80 bg-[#09090b] py-5 text-center text-xs text-zinc-500">
          E-ARENA BD · Skill-based gaming · 18+ only · Play responsibly
        </footer>
      </body>
    </html>
  );
}