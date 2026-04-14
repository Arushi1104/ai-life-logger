import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "AI Life Logger",
  description: "A private journal that understands you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}