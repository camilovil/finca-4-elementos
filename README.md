# Finca 4 Elementos

Sitio web de la bodega boutique **Finca 4 Elementos** (Valle de Uco, Mendoza).
Vinos orgánicos de baja intervención, agricultura regenerativa, producción
artesanal limitada.

Construido con **Next.js 15 (App Router) + React 19 + TypeScript**.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm start        # sirve el build
```

## Estructura

```
src/
  app/
    layout.tsx        Fuentes (Cormorant + Work Sans), metadata/SEO, <html lang="es">
    page.tsx          Composición de la landing (one-page)
    globals.css       Tokens de diseño y estilos de todas las secciones
  components/
    Nav.tsx           Navegación fija (cambia a fondo claro al scrollear)
    Hero.tsx          Portada full-bleed
    Philosophy.tsx    Los 4 principios
    About.tsx         Historia, cómo trabajamos, 4 elementos huarpe, producción limitada
    Products.tsx      Lista interactiva de vinos + botella activa + fichas
    ContactCTA.tsx    Llamado B2B (distribución a vinotecas/restaurantes)
    Footer.tsx
    ProgressIndicator.tsx   Indicador de avance de scroll
    Reveal.tsx        Wrapper de animación reveal-on-scroll (IntersectionObserver)
  data/
    site.ts           CONTENIDO: textos, vinos, principios, elementos. Editar aquí.
  lib/
    scroll.ts         Scroll suave a secciones
```

**Para editar textos, vinos o datos** → `src/data/site.ts`. Los componentes
solo consumen esos datos, no hay copia hardcodeada duplicada.

## Imágenes

Las secciones tienen placeholders con notas de dirección de foto (el diseño
original las marca como `FOTO` / `IMAGEN`). Cuando lleguen las fotos reales:

- Hero: foto full-bleed del viñedo al atardecer → reemplazar el degradado de
  `.hero` por la imagen de fondo.
- Nosotros: dos fotos (familia en la viña / detalle del suelo) → bloques
  `.split__photo`.
- Productos: render/foto de cada botella → bloque `.bottle`.

El logo de marca está en `public/assets/` (`leaves.png`, `logo.png`).

## Fase de ventas (preparado, no activado)

El brief pide primero una web de visualización y, más adelante, un canal de
venta a cliente final. La arquitectura ya está lista para sumarlo sin reescribir:

- El contenido de vinos vive en `src/data/site.ts` con un campo `key` por vino
  → sirve como identificador de producto.
- Para una tienda: agregar rutas `src/app/tienda/` y `src/app/tienda/[key]/`,
  reutilizando los mismos datos. Integrar un checkout (p. ej. Mercado Pago o
  Shopify Headless) detrás de esas rutas.
- La nav y el CTA hoy apuntan a distribución B2B por email; al activar ventas,
  sumar un enlace "Tienda" en `nav` (mismo archivo de datos).

## Deploy

Sitio estático/SSR estándar de Next. Recomendado **Vercel** (cero config) o
cualquier host con Node. `npm run build` genera el output optimizado.
