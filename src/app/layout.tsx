import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ThemeProvider";
import Header from "@/components/Header";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfairDisplay.className}>
        <Providers>
          <Header />
          {children}
          <div className="h-[500vh]"></div>
        </Providers>
      </body>
    </html>
  );
}
