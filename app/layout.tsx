import type { Metadata } from "next";
import "@/styles.css";
import { Providers } from "./query-client-provider";
import { SplashScreen } from "@/components/splash-screen";

export const metadata: Metadata = {
  title: "Suraksha — Mumbai's Scam Defence",
  description:
    "Scams are getting smarter — so are you. Plain language, real action. A guided panic-to-plan system for Indian users facing scams and cybercrime.",
  openGraph: {
    title: "Suraksha — Mumbai's Scam Defence",
    description: "Plain language, real action. Spot it. Block it. Fix it.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Inter+Tight:wght@600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <SplashScreen />
          {children}
        </Providers>
      </body>
    </html>
  );
}
