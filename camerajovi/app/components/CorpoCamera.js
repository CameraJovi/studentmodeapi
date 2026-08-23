import CardEstudante from "./CardEstudante";

const opcoesDeZoom = ["0.5", "1x", "2", "5"];
const tamanhosDoQuadro = {
  0.5: 72,
  "1x": 110,
  2: 160,
  5: 220,
};

export default function CorpoCamera({
  modoAtivo,
  zoomAtivo,
  acoesEstudante,
  acaoEstudante,
  aoSelecionarZoom,
  aoSelecionarAcao,
  aoVoltar,
}) {
  const modoEstudante = modoAtivo === "Estudante";
  const acaoDeCaptura = acaoEstudante && acaoEstudante !== "salvar";
  const nomeDaAcao = acoesEstudante.find(
    (acao) => acao.id === acaoEstudante,
  )?.nome;

  const tamanhoDoQuadro = acaoDeCaptura
    ? { width: "80%", height: "60%", maxWidth: 320, maxHeight: 480 }
    : {
        width: tamanhosDoQuadro[zoomAtivo],
        height: tamanhosDoQuadro[zoomAtivo],
      };

  return (
    <section className="visor-camera">
      {modoAtivo !== "Foto" && (
        <p className="modo-badge">● Modo {nomeDaAcao || modoAtivo}</p>
      )}

      <div className="sobreposicao-grade" aria-hidden="true">
        <span className="linha-grade grade-v grade-um" />
        <span className="linha-grade grade-v grade-dois" />
        <span className="linha-grade grade-h grade-um" />
        <span className="linha-grade grade-h grade-dois" />
      </div>

      <div
        className="quadro-deteccao"
        style={tamanhoDoQuadro}
        aria-hidden="true"
      >
        <span className="canto canto-superior-esquerdo" />
        <span className="canto canto-superior-direito" />
        <span className="canto canto-inferior-esquerdo" />
        <span className="canto canto-inferior-direito" />
      </div>

      {!modoEstudante && (
        <div className="seletor-zoom" aria-label="Opções de zoom">
          {opcoesDeZoom.map((zoom) => (
            <button
              className={`btn-zoom ${zoom === zoomAtivo ? "zoom-ativo" : ""}`}
              type="button"
              aria-pressed={zoom === zoomAtivo}
              onClick={() => aoSelecionarZoom(zoom)}
              key={zoom}
            >
              {zoom}
            </button>
          ))}
        </div>
      )}

      {modoEstudante && !acaoEstudante && (
        <div className="estudante-cards">
          {acoesEstudante.map((acao) => (
            <CardEstudante
              id={acao.id}
              nome={acao.nome}
              aoSelecionar={aoSelecionarAcao}
              key={acao.id}
            />
          ))}
        </div>
      )}

      {modoEstudante && acaoEstudante && (
        <button className="btn-voltar-estudante" type="button" onClick={aoVoltar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
          Voltar
        </button>
      )}
    </section>
  );
}
