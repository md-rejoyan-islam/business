"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { useState } from "react";
import SideContent from "@/components/SideContent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showFull, setShowFull] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header setShowFull={setShowFull} showFull={showFull} />
        <main className="flex h-[calc(100vh-60px)]  overflow-hidden">
          <aside
            className={`${
              showFull
                ? "-translate-x-[400px] w-0"
                : "w-[260px] translate-x-0   h-full p-4"
            } transition-all duration-500 border-r hidden md:block overflow-auto `}
          >
            <SideContent />
          </aside>
          <aside className="flex-1  overflow-auto">{children}</aside>
        </main>
      </body>
    </html>
  );
}
