import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/dormant/header";
import { Footer } from "@/components/dormant/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-visual",
  height: "device-height",
  viewportFit: "cover",
};
export const metadata: Metadata = {
  title: {
    default: "Neix",
    template: "%s | Neix",
  },
  description:
    "Protect and secure your Next.js admin panel with this open-source link rotator. Automatically generate dynamic, time-sensitive URLs with secure tokens to deter unauthorized access. Easy setup, customizable rotation frequency, and built with modern Shadcn UI and Tailwind CSS. Integrate seamlessly with Vercel KV for persistent storage. Perfect for developers looking to add an extra layer of security to their projects. ",
  keywords: [
    "Next.js",
    "Link Rotator",
    "Admin Panel Security",
    "Authentication",
    "Token-Based Authentication",
    "Dynamic URLs",
    "Open Source",
    "Web Development",
    "Vercel KV",
    "Shadcn UI",
    "Tailwind CSS",
    "Axios",
    "Nodemailer",
    "Cron Jobs",
    "Expiration Tokens",
    "Manual Rotation",
    "Automatic Rotation",
    "Web Security",
    "Serverless",
    "Frontend Security",
    "Rotating Links",
    "Link Expiration",
    "Protected Routes",
    "Access Control",
    "URL Protection",
  ],
  generator: "The Teleporter",
  applicationName: "Neix",
  referrer: "origin-when-cross-origin",
  authors: [
    {
      name: "The Teleporter",
      url: "https://www.theteleporter.me",
    },
  ],
  category: "Open Source",
  classification: "Tools",
  creator: "The Teleporter",
  publisher: "The Teleporter",
  appLinks: {
    web: {
      url:
        process.env.NODE_ENV === "production"
          ? new URL(`${process.env.NEXT_PUBLIC_APP_URL}`)
          : new URL(`${process.env.DEVELOPMENT_APP_URL}`),
      should_fallback: true,
    },
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  metadataBase:
    process.env.NODE_ENV === "production"
      ? new URL(`${process.env.NEXT_PUBLIC_APP_URL}`)
      : new URL(`${process.env.DEVELOPMENT_APP_URL}`),

  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/",
      fr: "/",
      de: "/",
      uk: "/",
      aa: "/",
      ab: "/",
      da: "/",
      ne: "/",
      sa: "/",
      am: "/",
      br: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    me: "The Teleporter",
  },
  openGraph: {
    locale: "en",
    type: "website",
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
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Header />
          {children}
        <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
