import Link from "next/link";

function IconeResultado({ tipo }) {
  if (tipo === "resumo") {
    return <path d="M4 7V4h3M17 4h3v3M4 17v3h3M17 20h3v-3M9 12h6" />;
  }

  if (tipo === "flashcard") {
    return <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />;
  }

  if (tipo === "math") {
    return <path d="M18 4H6l6 8-6 8h12" />;
  }

  return <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />;
}

export default function CardAcaoScan({ tipo, titulo, descricao, destino }) {
  return (
    <Link className="card-acao-resultado" href={destino}>
      <span className="icone-acao-resultado">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <IconeResultado tipo={tipo} />
        </svg>
      </span>
      <span className="textos-acao-resultado">
        <strong>{titulo}</strong>
        <span>{descricao}</span>
      </span>
      <svg className="seta-acao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
      </svg>
      <span className="barra-inferior-acao" />
    </Link>
  );
}
