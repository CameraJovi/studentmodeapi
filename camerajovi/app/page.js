"use client";

import { useState } from "react";
import Cabecalho from "./components/Cabecalho";
import CorpoCamera from "./components/CorpoCamera";
import Rodape from "./components/Rodape";

const modosDaCamera = ["Retrato", "Vídeo", "Foto", "Estudante", "Pro"];

export default function Home() {
  const [modoAtivo, setModoAtivo] = useState("Foto");
  const [zoomAtivo, setZoomAtivo] = useState("1x");
  const [lanternaLigada, setLanternaLigada] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [resolucao, setResolucao] = useState("HD");
  const [fps, setFps] = useState(24);

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
          aoSelecionarZoom={setZoomAtivo}
        />
        <Rodape
          modos={modosDaCamera}
          modoAtivo={modoAtivo}
          aoSelecionarModo={setModoAtivo}
        />
      </section>
    </main>
  );
}
