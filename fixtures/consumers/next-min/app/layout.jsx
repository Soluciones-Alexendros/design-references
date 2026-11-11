import "@soluciones-alexendros/ds/tokens.css";
import "@soluciones-alexendros/ds/css";

export const metadata = {
  title: "next-min consumer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Copied from package export ./theme-boot in prebuild (see copy-theme-boot.mjs). */}
        <script
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/theme-boot.js`}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
