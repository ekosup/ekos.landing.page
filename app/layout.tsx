import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Eko Supriyono - Portfolio",
 description: "Portfolio and landing page of Eko Supriyono",
 icons: {
  icon: "/logo.svg",
  shortcut: "/logo.svg",
  apple: "/logo.svg",
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en" suppressHydrationWarning>
   <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
   >
    <RootProvider>
     <Providers>
      <Navbar />
      {children}
     </Providers>
    </RootProvider>
   </body>
  </html>
 );
}
