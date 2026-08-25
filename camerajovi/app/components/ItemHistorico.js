function formatarData(data) {
  return new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function DetalhesAnalise({ analise }) {
  if (!analise) {
    return (
      <p className="historico-sem-detalhes">
        Os detalhes não estão disponíveis para este registro antigo.
      </p>
    );
  }

  if (analise.analysis_type === "flashcards") {
    return (
      <div className="historico-flashcards">
        {analise.cards?.map((card, indice) => (
          <div className="historico-flashcard" key={`${card.question}-${indice}`}>
            <strong>{card.question}</strong>
            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    );
  }

  if (analise.analysis_type === "math") {
    return (
      <div className="historico-math">
        {analise.expression && (
          <p><strong>Expressão:</strong> {analise.expression}</p>
        )}

        {analise.steps?.map((passo, indice) => (
          <div className="historico-passo" key={`${passo.title}-${indice}`}>
            <strong>{indice + 1}. {passo.title}</strong>
            <p>{passo.step}</p>
          </div>
        ))}

        {analise.result?.length > 0 && (
          <p className="historico-resultado">
            <strong>Resultado:</strong> {analise.result.join(", ")}
          </p>
        )}
      </div>
    );
  }

  return <p className="historico-conteudo">{analise.content}</p>;
}

export default function ItemHistorico({ item, aberto, aoAlternar }) {
  return (
    <article className={`item-historico-local ${aberto ? "aberto" : ""}`}>
      <button
        className="btn-item-historico"
        type="button"
        aria-expanded={aberto}
        onClick={() => aoAlternar(item.id)}
      >
        <span className="textos-item-historico">
          <strong>{item.assunto || "Conteúdo sem título"}</strong>
          <span>{item.materia} · {item.tipo}</span>
        </span>

        <span className="data-item-historico">
          <time dateTime={item.salvoEm}>{formatarData(item.salvoEm)}</time>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {aberto && (
        <div className="detalhes-item-historico">
          <DetalhesAnalise analise={item.analise} />
        </div>
      )}
    </article>
  );
}
