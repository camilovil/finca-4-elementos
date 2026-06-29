import type { Metadata } from "next";
import { Cormorant, Work_Sans, Anton } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-work-sans",
  display: "swap",
});

// Display condensado pesado para el wordmark gigante (estilo editorial)
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://finca4elementos.com"),
  title: "Finca 4 Elementos · Bodega boutique de baja intervención · Mendoza",
  description:
    "Bodega boutique de vinos orgánicos y de baja intervención en el Valle de Uco, Mendoza. Agricultura regenerativa, levaduras nativas y producción artesanal limitada. TE, QUTEC y más.",
  keywords: [
    "vino natural",
    "baja intervención",
    "Mendoza",
    "Valle de Uco",
    "agricultura regenerativa",
    "bodega boutique",
    "vino orgánico",
  ],
  openGraph: {
    title: "Finca 4 Elementos",
    description:
      "«No hacemos vino. Dejamos que la tierra hable.» Bodega boutique de baja intervención en Mendoza, Argentina.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${workSans.variable} ${anton.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
