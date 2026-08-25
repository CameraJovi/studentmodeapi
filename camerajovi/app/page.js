"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cabecalho from "./components/Cabecalho";
import CorpoCamera from "./components/CorpoCamera";
import Rodape from "./components/Rodape";
import { guardarCaptura } from "./services/captureSession";

const modosDaCamera = ["Retrato", "Vídeo", "Foto", "Estudante", "Pro"];
const acoesDoEstudante = [
  { id: "scan", nome: "Scan" },
  { id: "flashcard", nome: "Flashcard" },
  { id: "math", nome: "Math" },
  { id: "salvar", nome: "Salvar" },
];

export default function Home() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const [modoAtivo, setModoAtivo] = useState("Foto");
  const [zoomAtivo, setZoomAtivo] = useState("1x");
  const [lanternaLigada, setLanternaLigada] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [resolucao, setResolucao] = useState("HD");
  const [fps, setFps] = useState(24);
  const [acaoEstudante, setAcaoEstudante] = useState(null);
  const [cameraFrontal, setCameraFrontal] = useState(false);
  const [capturando, setCapturando] = useState(false);
  const [mensagemCaptura, setMensagemCaptura] = useState("");

  function selecionarModo(modo) {
    setModoAtivo(modo);
    setAcaoEstudante(null);
    setMensagemCaptura("");
  }

  function selecionarAcaoEstudante(acao) {
    if (acao === "salvar") {
      router.push("/salvar");
      return;
    }

    setAcaoEstudante(acao);
    setMensagemCaptura("");
  }

  async function capturar() {
    const rotas = {
      scan: "/scan",
      flashcard: "/flashcard",
      math: "/equacao",
    };

    if (modoAtivo !== "Estudante") {
      setMensagemCaptura("Selecione o modo Estudante para usar a análise.");
      return;
    }

    if (!rotas[acaoEstudante]) {
      setMensagemCaptura("Escolha Scan, Flashcard ou Math antes de capturar.");
      return;
    }

    try {
      setCapturando(true);
      setMensagemCaptura("Capturando imagem...");
      const imagem = await cameraRef.current?.capturarImagem();

      if (!imagem) throw new Error("A câmera ainda não está pronta.");

      await guardarCaptura(imagem);
      setMensagemCaptura("Foto capturada!");
      router.push(rotas[acaoEstudante]);
    } catch (erro) {
      setMensagemCaptura(erro.message || "Não foi possível capturar a foto.");
    } finally {
      setCapturando(false);
    }
  }

  return (
    <main className="container-celular">
      <section className="tela-celular">
        <Cabecalho
          lanternaLigada={lanternaLigada}
          menuAberto={menuAberto}
          resolucao={resolucao}
          fps={fps}
          aoAlternarLanterna={() => setLanternaLigada(!lanternaLigada)}
          aoAlternarMenu={() => setMenuAberto(!menuAberto)}
          aoSelecionarResolucao={setResolucao}
          aoSelecionarFps={setFps}
        />
        <CorpoCamera
          ref={cameraRef}
          modoAtivo={modoAtivo}
          zoomAtivo={zoomAtivo}
          acoesEstudante={acoesDoEstudante}
          acaoEstudante={acaoEstudante}
          cameraFrontal={cameraFrontal}
          mensagemCaptura={mensagemCaptura}
          aoSelecionarZoom={setZoomAtivo}
          aoSelecionarAcao={selecionarAcaoEstudante}
          aoVoltar={() => setAcaoEstudante(null)}
        />
        <Rodape
          modos={modosDaCamera}
          modoAtivo={modoAtivo}
          aoSelecionarModo={selecionarModo}
          aoCapturar={capturar}
          capturando={capturando}
          aoGirarCamera={() => setCameraFrontal(!cameraFrontal)}
        />
      </section>
    </main>
  );
}
