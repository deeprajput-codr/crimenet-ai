import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  title: "CrimeNet AI — Criminal Intelligence & Network Analysis Platform",
  description: "AI-powered criminal intelligence platform featuring interactive knowledge graphs, entity resolution, network analysis, and real-time investigation tools for law enforcement agencies.",
  keywords: "criminal intelligence, network analysis, AI, law enforcement, knowledge graph, investigation, India",
  authors: [{ name: "CrimeNet AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-900 text-foreground">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#e2e8f0',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              backdropFilter: 'blur(12px)',
              borderRadius: '10px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#22d3ee', secondary: '#030712' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#030712' },
            },
          }}
        />
      </body>
    </html>
  );
}
