function IconeModoExtra({ tipo }) {
  if (tipo === "noturno") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M20 15.4A8.5 8.5 0 0 1 8.6 4a8.5 8.5 0 1 0 11.4 11.4Z" />
      </svg>
    );
  }

  if (tipo === "panorama") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 7c5-2 13-2 18 0v10c-5 2-13 2-18 0V7Z" />
        <path d="m9 13 2-2 4 4 2-2 3 3M7 10h.01" />
      </svg>
    );
  }

  if (tipo === "camera-lenta") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="13" r="7" />
        <path d="M12 10v4l3 2M9 3h6M12 6V3" />
      </svg>
    );
  }

  if (tipo === "time-lapse") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3-2M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    );
  }

  if (tipo === "documento") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M6 3h9l3 3v15H6V3Z" />
        <path d="M14 3v4h4M9 11h6M9 15h6M9 18h4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <circle cx="12" cy="12" r="4" />
      <path d="M7 8h.01M17 8h.01" />
    </svg>
  );
}

export default function PainelMais({ modos, aoSelecionar, aoFechar }) {
  return (
    <section className="painel-mais" aria-label="Outros modos da câmera">
      <header className="cabecalho-painel-mais">
        <div>
          <span>Câmera Jovi</span>
          <h2>Mais modos</h2>
        </div>

        <button type="button" aria-label="Fechar outros modos" onClick={aoFechar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div className="grade-modos-extras">
        {modos.map((modo) => (
          <button
            className="card-modo-extra"
            type="button"
            onClick={() => aoSelecionar(modo.nome)}
            key={modo.id}
          >
            <span className="icone-modo-extra">
              <IconeModoExtra tipo={modo.id} />
            </span>
            <strong>{modo.nome}</strong>
            <small>{modo.descricao}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
