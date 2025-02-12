import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], // Especificando os pesos desejados
});

export const metadata: Metadata = {
  title: "Blend House - O melhor restaurante do Brasil",
  description: "O melhor restaurante do Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: "#202020",
              color: "#fff",
              borderColor: "rbga(255,255,255, 0.5"
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
