
export default function ModalSmartPix({
  resultado,
  mensagem,
  aoAlterarValor,
  aoCancelar,
  aoCopiar,
  aoAbrirBanco,
}) {
  return (
    <div className="smartpix-overlay">
      <section
        className="smartpix-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="smartpix-titulo"
      >
        <div className="smartpix-icone" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3v18M3 12h18" />
            <path d="m7 7 10 10M17 7 7 17" />
          </svg>
        </div>

        <h2 id="smartpix-titulo">Possível chave Pix encontrada</h2>
        <p className="smartpix-tipo">Tipo: {resultado.tipo}</p>
        <input
          className="smartpix-valor"
          type="text"
          value={resultado.valor}
          aria-label="Chave encontrada"
          onChange={(evento) => aoAlterarValor(evento.target.value)}
        />

        <p className="smartpix-aviso">
          Encontrar este dado na imagem não confirma que ele seja uma chave
          Pix. Confira e corrija o dado antes de continuar no aplicativo do
          banco.
        </p>

        {mensagem && <p className="smartpix-mensagem">{mensagem}</p>}

        <div className="smartpix-acoes">
          <button type="button" className="smartpix-btn secundario" onClick={aoCancelar}>
            Cancelar
          </button>
          <button type="button" className="smartpix-btn secundario" onClick={aoCopiar}>
            Copiar chave
          </button>
          <button type="button" className="smartpix-btn principal" onClick={aoAbrirBanco}>
            Abrir banco
          </button>
        </div>
      </section>
    </div>
  );
}
