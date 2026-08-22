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
  aoSelecionarZoom,
}) {
  return (
    <section className="visor-camera">
      {modoAtivo !== "Foto" && <p className="modo-badge">● Modo {modoAtivo}</p>}

      <div className="sobreposicao-grade" aria-hidden="true">
        <span className="linha-grade grade-v grade-um" />
        <span className="linha-grade grade-v grade-dois" />
        <span className="linha-grade grade-h grade-um" />
        <span className="linha-grade grade-h grade-dois" />
      </div>

      <div
        className="quadro-deteccao"
        style={{
          width: tamanhosDoQuadro[zoomAtivo],
          height: tamanhosDoQuadro[zoomAtivo],
        }}
        aria-hidden="true"
      >
        <span className="canto canto-superior-esquerdo" />
        <span className="canto canto-superior-direito" />
        <span className="canto canto-inferior-esquerdo" />
        <span className="canto canto-inferior-direito" />
      </div>

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
    </section>
  );
}
