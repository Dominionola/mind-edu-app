import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindEdu Hub - Mental Health Education for Youth",
  description: "Empower yourself with evidence-based mental health education through interactive modules, quizzes, and personalized learning experiences designed for youth.",
  keywords: ["mental health", "education", "youth", "wellness", "learning", "self-care"],
  authors: [{ name: "MindEdu Hub Team" }],
  openGraph: {
    title: "MindEdu Hub - Mental Health Education for Youth",
    description: "Empower yourself with evidence-based mental health education",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
