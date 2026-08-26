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
import "./styles/smartpix.css";
import "./styles/mais.css";

export const metadata = {
  metadataBase: new URL("https://camerajovi-kappa.vercel.app"),
  title: "Câmera Jovi | Estude com inteligência",
  description:
    "Câmera inteligente para estudantes: capture conteúdos e gere resumos, flashcards e resoluções com inteligência artificial.",
  applicationName: "Câmera Jovi",
  openGraph: {
    title: "Câmera Jovi | Estude com inteligência",
    description:
      "Capture conteúdos e transforme imagens em resumos, flashcards e resoluções para estudar melhor.",
    url: "https://camerajovi-kappa.vercel.app",
    siteName: "Câmera Jovi",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Câmera Jovi | Estude com inteligência",
    description:
      "Capture conteúdos e transforme imagens em resumos, flashcards e resoluções para estudar melhor.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
  }
