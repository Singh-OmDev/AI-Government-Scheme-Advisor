import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Government Scheme Advisor | Find Eligible Schemes Instantly",
  description: "Discover government schemes tailored to your profile using AI. Get eligibility checks, application guides, and benefits for students, farmers, women, and more.",
  keywords: ["government schemes", "AI advisor", "eligibility check", "India schemes", "sarkari yojana", "benefits", "scholarships", "loans"],
  authors: [{ name: "AI Government Scheme Advisor Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-bg text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
