import "./globals.css";
import "./styles/cabecalho.css";
import "./styles/camera.css";
import "./styles/estudante.css";
import "./styles/rodape.css";
import "./styles/acoes.css";
import "./styles/resumo.css";
import "./styles/flashcard.css";
import "./styles/equacao.css";
import "./styles/salvar.css";

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
