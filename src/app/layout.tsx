import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
