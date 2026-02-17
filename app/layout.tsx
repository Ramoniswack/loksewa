import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "लोक सेवा तयारी पोर्टल | Loksewa Preparation Portal",
  description: "Nepal Government Loksewa Preparation Portal - Practice Questions in Nepali and English",
  keywords: "loksewa, nepal, government, exam, preparation, practice",
  icons: {
    icon: [],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning prevents minor text mismatches from crashing the UI
    <html lang="ne" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}