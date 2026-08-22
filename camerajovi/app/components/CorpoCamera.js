const opcoesDeZoom = ["0.5", "1x", "2", "5"];

export default function CorpoCamera({ mensagem }) {
  return (
    <section className="visor-camera">
      {mensagem && <p className="camera-estado">{mensagem}</p>}

      <div className="sobreposicao-grade" aria-hidden="true">
        <span className="linha-grade grade-v grade-um" />
        <span className="linha-grade grade-v grade-dois" />
        <span className="linha-grade grade-h grade-um" />
        <span className="linha-grade grade-h grade-dois" />
      </div>

      <div className="quadro-deteccao" aria-hidden="true">
        <span className="canto canto-superior-esquerdo" />
        <span className="canto canto-superior-direito" />
        <span className="canto canto-inferior-esquerdo" />
        <span className="canto canto-inferior-direito" />
      </div>

      <div className="seletor-zoom" aria-label="Opções de zoom">
        {opcoesDeZoom.map((zoom) => (
          <button
            className={`btn-zoom ${zoom === "1x" ? "zoom-ativo" : ""}`}
            type="button"
            key={zoom}
          >
            {zoom}
          </button>
        ))}
      </div>
    </section>
  );
}
