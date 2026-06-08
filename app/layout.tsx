import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "./providers/AdminProvider";
import { ClerkProvider } from '@clerk/nextjs';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Mateandtalk - Speak Like a Local, Feel the Argentine Soul",
  description: "More than a conversation, it's a ritual. Join us to live the Argentine soul from the inside out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${playfair.variable} font-sans antialiased`}>
          <AdminProvider>
            {children}
          </AdminProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
