# Spec — design-references

## Objetivo
Proveer una fuente única de verdad de design tokens (`--ds-*`), theme-boot y componentes base consumibles como paquete npm, más un website de documentación y playground, para cohesionar la flota Astro + Next/React.

## Historias
1. Como consumidor (Astro/Next), quiero importar un paquete npm que exponga CSS variables `--ds-*` y un theme-boot, para aplicar light/dark/system sin hardcodear valores.
2. Como consumidor, quiero componentes base (layout, forms, feedback) que usen exclusivamente esos tokens, para mantener consistencia visual.
3. Como mantenedor, quiero un website que documente tokens, temas y componentes y permita probarlos en vivo, para validar el sistema antes de usarlo en producción.
4. Como auditor, quiero que el contraste de pares de color cumpla WCAG AA por defecto, para reducir riesgo de accesibilidad.
5. Como usuario con teclado o lector de pantalla, quiero que los componentes base expongan focus visible, roles ARIA correctos y estados accesibles, para poder operar la interfaz sin ratón y con tecnologías de asistencia.
6. Como CI, quiero tests de accesibilidad automatizados que fallen el build si los componentes base violan contraste, focus visible o ARIA, para impedir regresiones.

## Reglas
- Todos los valores visuales (color, spacing, typography, radii, elevation, motion) se expresan como tokens.
- Prefijo obligatorio: `--ds-`.
- Capas: reference → semantic → component (formato DTCG 2025.10 como source of truth).
- Colores de referencia y semánticos se expresan en OKLCH (con fallback sRGB cuando sea necesario para herramientas).
- Temas: light, dark y system (sigue `prefers-color-scheme`).
- Componentes base solo consumen tokens; no valores hardcodeados.
- El paquete exporta CSS + tipos TS + función de theme-boot.
- El website de muestra incluye documentación estática y playground interactivo.
- Contraste de texto sobre fondo ≥ 4.5:1 (normal) y 3:1 (grande) en los pares semánticos principales (WCAG 2.1 AA 1.4.3).
- Todos los componentes interactivos deben tener foco visible (WCAG 2.1 AA 2.4.7) y no depender solo del color para transmitir información (WCAG 2.1 AA 1.4.1).
- Estados disabled, error y loading deben ser anunciables y visualmente distinguibles.
- Tamaño mínimo de área táctil/clicable: 24×24 CSS px (WCAG 2.2 AA 2.5.8).
- Cada componente base interactivo debe tener al menos un test automatizado de accesibilidad (axe-core o equivalente) que cubra contraste, focus visible y roles/ARIA.

## Criterios comprobables
- Existe un paquete npm instalable que, al importarse, define las variables `--ds-*` en `:root` y permite cambiar de tema.
- Existe un archivo de tokens en formato DTCG 2025.10 con las tres capas y valores de color en OKLCH.
- Los componentes de layout, forms y feedback referencian solo variables `--ds-*`.
- El website de muestra renderiza la documentación de tokens y un playground donde se pueden cambiar temas y ver componentes.
- Los pares de color primarios/secundarios/error pasan un test de contraste AA.
- Los componentes interactivos (button, input, link, etc.) tienen estilo `:focus-visible` y roles/ARIA adecuados cuando no son nativos.
- Existe una suite de tests automatizados (axe-core o equivalente) que se ejecuta en CI y cubre todos los componentes base interactivos en temas light y dark.
- El pipeline de CI falla si algún test de accesibilidad reporta violaciones de nivel serious o critical.
- Existe un test de contraste dedicado que evalúa todos los pares semánticos definidos (texto sobre fondo, icono sobre fondo) y falla si el ratio < 4.5:1 (texto normal) o < 3:1 (texto grande / UI components).

## Límites
- Alcance inicial: tokens + theme-boot + componentes base (layout, forms, feedback). No incluye iconografía completa, motion avanzado ni multi-brand.
- Consumidores prioritarios: Astro y Next/React. Otros stacks (Tauri, etc.) quedan fuera de esta spec.
- No se generan componentes de producción finales en esta fase; solo la especificación y contratos.
- Auditoría WCAG completa del website de muestra queda fuera; solo se garantizan los criterios de contraste y focus en los componentes base.
- Los tests automatizados cubren componentes base; no sustituyen revisión manual ni tests de usuario.

## No-objetivos
- Implementar el código del paquete o del website (eso es posterior a la aprobación de la spec).
- Migrar repositorios consumidores existentes.
- Definir paleta o tipografía de marca final (se usarán valores de referencia hasta fijarlos).
- Soporte de high-contrast o temas custom más allá de light/dark/system.
- Cumplimiento WCAG AAA o criterios de nivel AAA.
- Tests de accesibilidad del website de muestra completo (solo componentes base).

## Calidad (escenarios)
- Dado un consumidor que importa el paquete, cuando cambia el atributo de tema a dark, entonces todos los componentes base cambian de apariencia sin modificar su markup.
- Dado el playground del website, cuando un usuario selecciona un componente y un tema, entonces ve el resultado en vivo y los tokens usados.
- Dado un par de color semántico (ej. texto sobre primary), cuando se ejecuta el test de contraste, entonces el ratio es ≥ 4.5:1.
- Dado un botón o input del sistema, cuando se navega con teclado, entonces el foco es claramente visible y no se pierde el orden de tabulación.
- Dado un componente con estado error, cuando se inspecciona con lector de pantalla, entonces el estado es anunciado.
- Dado el pipeline de CI, cuando un componente base introduce un contraste insuficiente o pierde `:focus-visible`, entonces el job de tests de accesibilidad falla y bloquea el merge.
- Dado un token de color definido en OKLCH, cuando se genera el CSS, entonces la variable `--ds-*` contiene el valor OKLCH y el test de contraste lo evalúa correctamente.

## Interfaces externas
- Paquete npm: `@soluciones-alexendros/ds` (nombre provisional).
- Export principal: CSS variables + `setTheme(mode: 'light' | 'dark' | 'system')`.
- Website de muestra: documentación + playground (URL a definir en implementación).
- Formato de intercambio: JSON DTCG 2025.10 (colores en OKLCH).
- Contrato de a11y: pares de color y focus visible documentados y testeados a nivel componente.
- Suite de tests: axe-core (o equivalente) + test de contraste dedicado (p. ej. colorjs.io o apca) integrada en CI del paquete y del website de muestra.

## Tests de contraste WCAG (definición)
- **Alcance**: todos los pares semánticos de texto-sobre-fondo e icono-sobre-fondo definidos en la capa semantic (primary, secondary, error, success, warning, surface, etc.) en temas light y dark.
- **Umbrales**:
  - Texto normal (< 18 pt / 14 pt bold): ≥ 4.5:1 (WCAG 2.1 AA 1.4.3).
  - Texto grande (≥ 18 pt / 14 pt bold) y componentes UI: ≥ 3:1 (WCAG 2.1 AA 1.4.3 y 1.4.11).
- **Método**: cálculo de contraste relativo sobre valores OKLCH convertidos a sRGB lineal (o APCA si se documenta como alternativa).
- **Automatización**: script o test (Vitest/Playwright + colorjs.io o axe) que lee los tokens DTCG, genera los pares y falla si algún ratio no cumple.
- **Salida**: informe en CI con lista de pares que fallan y ratio obtenido.
