import Cabecalho from "./components/Cabecalho";
import CorpoCamera from "./components/CorpoCamera";
import Rodape from "./components/Rodape";

const modosDaCamera = ["Retrato", "Vídeo", "Foto", "Estudante", "Pro"];

export default function Home() {
  return (
    <main className="container-celular">
      <section className="tela-celular">
        <Cabecalho />
        <CorpoCamera />
        <Rodape modos={modosDaCamera} modoAtivo="Foto" />
      </section>
    </main>
  );
}
