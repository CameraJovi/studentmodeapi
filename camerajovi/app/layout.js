import "./globals.css";

export const metadata = {
  title: "Câmera Jovi",
  description: "Aplicação de câmera com recursos para estudantes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
