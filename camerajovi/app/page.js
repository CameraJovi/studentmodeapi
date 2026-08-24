"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cabecalho from "./components/Cabecalho";
import CorpoCamera from "./components/CorpoCamera";
import Rodape from "./components/Rodape";

const modosDaCamera = ["Retrato", "Vídeo", "Foto", "Estudante", "Pro"];
const acoesDoEstudante = [
  { id: "scan", nome: "Scan" },
  { id: "flashcard", nome: "Flashcard" },
  { id: "math", nome: "Math" },
  { id: "salvar", nome: "Salvar" },
];

export default function Home() {
  const router = useRouter();
  const [modoAtivo, setModoAtivo] = useState("Foto");
  const [zoomAtivo, setZoomAtivo] = useState("1x");
  const [lanternaLigada, setLanternaLigada] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [resolucao, setResolucao] = useState("HD");
  const [fps, setFps] = useState(24);
  const [acaoEstudante, setAcaoEstudante] = useState(null);
  const [cameraFrontal, setCameraFrontal] = useState(false);

  function selecionarModo(modo) {
    setModoAtivo(modo);
    setAcaoEstudante(null);
  }

  function selecionarAcaoEstudante(acao) {
    if (acao === "salvar") {
      router.push("/salvar");
      return;
    }

    setAcaoEstudante(acao);
  }

  function capturar() {
    const rotas = {
      scan: "/scan",
      flashcard: "/flashcard",
      math: "/equacao",
    };

    if (rotas[acaoEstudante]) {
      router.push(rotas[acaoEstudante]);
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
          modoAtivo={modoAtivo}
          zoomAtivo={zoomAtivo}
          acoesEstudante={acoesDoEstudante}
          acaoEstudante={acaoEstudante}
          cameraFrontal={cameraFrontal}
          aoSelecionarZoom={setZoomAtivo}
          aoSelecionarAcao={selecionarAcaoEstudante}
          aoVoltar={() => setAcaoEstudante(null)}
        />
        <Rodape
          modos={modosDaCamera}
          modoAtivo={modoAtivo}
          aoSelecionarModo={selecionarModo}
          aoCapturar={capturar}
          aoGirarCamera={() => setCameraFrontal(!cameraFrontal)}
        />
      </section>
    </main>
  );
}
