import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Colegio de Profesores de Ica",
  description:
    "Institución gremial que representa y defiende los derechos de los profesores de la región Ica.",
  keywords: "colegio profesores ica, educación ica, docentes ica",
  openGraph: {
    title: "Colegio de Profesores de Ica",
    description: "Institución gremial que representa y defiende los derechos de los profesores de la región Ica.",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
