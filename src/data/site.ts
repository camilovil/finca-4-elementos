// Contenido centralizado del sitio. Un solo lugar para editar textos y datos.

export const site = {
  name: "Finca 4 Elementos",
  tagline: "«No hacemos vino. Dejamos que la tierra hable.»",
  location: "San Rafael · Mendoza, Argentina",
  email: "hola@finca4elementos.com",
  kicker: "Bodega boutique · Mendoza, Argentina",
};

export const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "productos", label: "Productos" },
] as const;

export type Principle = {
  n: string;
  title: string;
  text: string;
  color: string;
  opacity: number;
};

export const principles: Principle[] = [
  {
    n: "01",
    title: "Honramos la Raíz",
    text: "Cada vid hunde su historia en el suelo que la sostiene.",
    color: "#6E6C49",
    opacity: 0.14,
  },
  {
    n: "02",
    title: "Curamos el Suelo",
    text: "Agricultura regenerativa: devolvemos más de lo que tomamos.",
    color: "#856637",
    opacity: 0.14,
  },
  {
    n: "03",
    title: "Respetamos el Ritmo",
    text: "Sin apuro. La naturaleza marca cada tiempo y nosotros lo seguimos.",
    color: "#BD7A6B",
    opacity: 0.16,
  },
  {
    n: "04",
    title: "Celebramos la Pureza",
    text: "Baja intervención: nada que corrija lo que la tierra ya hizo bien.",
    color: "#8B9A8B",
    opacity: 0.18,
  },
];

export type Element = {
  word: string; // palabra huarpe
  element: string; // traducción
  text: string;
  dot: string; // color del punto
  title: string; // color del título
};

// Los 4 elementos en lengua huarpe (allentiac)
export const elements: Element[] = [
  {
    word: "Te",
    element: "Tierra",
    text: "El suelo vivo donde todo empieza.",
    dot: "#6E6C49",
    title: "#A6A878",
  },
  {
    word: "Homtec",
    element: "Aire",
    text: "El viento de altura que afina cada racimo.",
    dot: "#C68A3D",
    title: "#D6A862",
  },
  {
    word: "Qutec",
    element: "Fuego",
    text: "El sol que concentra y da carácter.",
    dot: "#BD7A6B",
    title: "#CE9183",
  },
  {
    word: "Caha",
    element: "Agua",
    text: "El deshielo de los Andes que da vida.",
    dot: "#8B9A8B",
    title: "#A6B3A4",
  },
];

export type Wine = {
  key: "te" | "qutec" | "caha" | "homtec";
  name: string;
  element: string;
  shortMeta: string; // ej. "Blanco · Tierra"
  status: "Disponible" | "Próximamente";
  sub: string; // subtítulo en la botella
  color: string;
  glow: string;
  note: string; // nota de dirección de foto (placeholder)
};

export const wines: Wine[] = [
  {
    key: "te",
    name: "TE",
    element: "Tierra",
    shortMeta: "Blanco · Tierra",
    status: "Disponible",
    sub: "Blanco · cofermentado",
    color: "#6E6C49",
    glow: "rgba(110,108,73,.30)",
    note: "BOTELLA · TE — blanco. Fondo neutro salvia, sarmiento de vid seco, montículo de arena, luz lateral suave.",
  },
  {
    key: "qutec",
    name: "QUTEC",
    element: "Fuego",
    shortMeta: "Tinto · Fuego",
    status: "Disponible",
    sub: "Tinto · Malbec / Syrah",
    color: "#BD7A6B",
    glow: "rgba(189,122,107,.32)",
    note: "BOTELLA · QUTEC — tinto. Fondo neutro, sarmiento seco, montículo de arena, luz cálida y direccional.",
  },
  {
    key: "caha",
    name: "CAHA",
    element: "Agua",
    shortMeta: "Agua",
    status: "Próximamente",
    sub: "Próximamente",
    color: "#8B9A8B",
    glow: "rgba(139,154,139,.30)",
    note: "PRÓXIMAMENTE · Caha (agua). Aún sin añada disponible. Misma dirección de foto: sarmiento + arena, luz suave.",
  },
  {
    key: "homtec",
    name: "HOMTEC",
    element: "Aire",
    shortMeta: "Aire",
    status: "Próximamente",
    sub: "Próximamente",
    color: "#C68A3D",
    glow: "rgba(198,138,61,.30)",
    note: "PRÓXIMAMENTE · Homtec (aire). Aún sin añada disponible. Misma dirección de foto: sarmiento + arena, luz suave.",
  },
];

export type WineCard = {
  dot: string;
  name: string;
  meta: string;
  quote: string;
  body: string;
  specs: { label: string; value: string }[];
};

export const wineCards: WineCard[] = [
  {
    dot: "#6E6C49",
    name: "TE",
    meta: "Tierra · Blanco",
    quote: "«Te» significa tierra. Un blanco con textura y memoria de suelo.",
    body: "Cofermentación con pieles y levaduras nativas. Sin filtrar, sin correcciones. Fruta blanca, hierbas de monte y una salinidad que recuerda de dónde viene.",
    specs: [
      { label: "Tipo", value: "Blanco" },
      { label: "Vinificación", value: "Cofermentado · levaduras nativas" },
      { label: "Guarda", value: "Sin filtrar · sin sulfitos añadidos" },
    ],
  },
  {
    dot: "#BD7A6B",
    name: "QUTEC",
    meta: "Fuego · Tinto",
    quote: "«Qutec» significa fuego. Un tinto de fruta tensa y especia.",
    body: "Blend de Malbec y Syrah, co-fermentado con levaduras nativas y sin filtrar. Frutos negros, pimienta y un final mineral, fiel al lugar.",
    specs: [
      { label: "Blend", value: "Malbec 75% · Syrah 25%" },
      { label: "Vinificación", value: "Cofermentado · levaduras nativas" },
      { label: "Guarda", value: "Sin filtrar · sin sulfitos añadidos" },
    ],
  },
];
