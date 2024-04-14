import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Provider } from "./provider";
import { ToggleMode } from "@/components/toggle-mode";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "A simple card shop"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <header className="border-b">
            <div className="container flex items-center h-14 gap-2 justify-between">
              <Link
                className="text-primary font-bold text-lg flex gap-2 items-center"
                href="/"
              >
                <ShoppingBag /> Card Shop
              </Link>

              <ToggleMode />
            </div>
          </header>

          <main className="container py-6">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
