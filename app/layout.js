import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "AI Life Logger",
  description: "A private journal that understands you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning style={{
        fontFamily: manrope.style.fontFamily,
      }}>
        <style>{`
          :root {
            --font-manrope: ${manrope.style.fontFamily};
            --font-newsreader: ${newsreader.style.fontFamily};
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}