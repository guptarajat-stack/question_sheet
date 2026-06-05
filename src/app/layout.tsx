import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PrepTracker - SDE Placement Preparation Portal",
  description: "Track your DSA progress, manage daily practice goals, and revise concepts using automated spaced repetition intervals based on Striver's A2Z sheet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={`${inter.className} bg-[#090a0f] text-slate-100 min-h-screen flex flex-col lg:flex-row overflow-hidden antialiased`}>
        {/* Navigation Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 h-screen overflow-y-auto px-4 py-6 md:px-8 md:py-8 lg:px-10">
          <div className="max-w-6xl mx-auto w-full pb-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
