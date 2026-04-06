import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from "./components/chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aryagym | Best Gym & Fitness Training Near You",

  description:
    "Aryagym is your ultimate fitness destination for weight loss, muscle building, and personal training. Join Aryagym today and achieve your fitness goals with expert guidance.",

  keywords: [
    "gym near me",
    "Aryagym",
    "fitness center",
    "weight loss",
    "muscle building",
    "personal trainer",
    "workout plans",
    "fitness training",
    "health and fitness",
    "gym membership",
  ],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Chatbot />
        {children}
      </body>
    </html>
  );
}
