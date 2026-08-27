"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cabecalho from "./components/Cabecalho";
import CorpoCamera from "./components/CorpoCamera";
import Rodape from "./components/Rodape";
import { guardarCaptura } from "./services/captureSession";

const modosDaCamera = ["Retrato", "Vídeo", "Foto", "Estudante", "Pro", "Mais"];
const modosExtras = [
  { id: "noturno", nome: "Noturno", descricao: "Fotos com pouca luz" },
  { id: "panorama", nome: "Panorama", descricao: "Cenários mais amplos" },
  {
    id: "camera-lenta",
    nome: "Câmera lenta",
    descricao: "Movimentos em detalhes",
  },
  { id: "time-lapse", nome: "Time-lapse", descricao: "Tempo acelerado" },
  { id: "documento", nome: "Documento", descricao: "Textos mais nítidos" },
  {
    id: "alta-resolucao",
    nome: "Alta resolução",
    descricao: "Mais detalhes na foto",
  },
];
const acoesDoEstudante = [
  { id: "scan", nome: "Scan" },
  { id: "flashcard", nome: "Flashcard" },
  { id: "math", nome: "Math" },
  { id: "caderno", nome: "Caderno" },
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
  const [modoExtraAtivo, setModoExtraAtivo] = useState(null);
  const [painelMaisAberto, setPainelMaisAberto] = useState(false);

  function selecionarModo(modo) {
    setModoAtivo(modo);
    setAcaoEstudante(null);
    setMensagemCaptura("");

    if (modo === "Mais") {
      setPainelMaisAberto(true);
      return;
    }

    setModoExtraAtivo(null);
    setPainelMaisAberto(false);
  }

  function selecionarModoExtra(modo) {
    setModoExtraAtivo(modo);
    setPainelMaisAberto(false);
  }

  function selecionarAcaoEstudante(acao) {
    if (acao === "caderno") {
      router.push("/caderno");
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
          modosExtras={modosExtras}
          modoExtraAtivo={modoExtraAtivo}
          painelMaisAberto={painelMaisAberto}
          aoSelecionarZoom={setZoomAtivo}
          aoSelecionarAcao={selecionarAcaoEstudante}
          aoSelecionarModoExtra={selecionarModoExtra}
          aoFecharPainelMais={() => selecionarModo("Foto")}
          aoVoltar={() => setAcaoEstudante(null)}
        />
        <Rodape
          modos={modosDaCamera}
          modoAtivo={modoAtivo}
          aoSelecionarModo={selecionarModo}
          aoCapturar={capturar}
          capturando={capturando}
          modoExtraAtivo={modoExtraAtivo}
          painelMaisAberto={painelMaisAberto}
          aoGirarCamera={() => setCameraFrontal(!cameraFrontal)}
        />
      </section>
    </main>
  );
}
