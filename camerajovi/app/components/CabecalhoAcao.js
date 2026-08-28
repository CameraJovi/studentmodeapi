import Link from "next/link";

export default function CabecalhoAcao({
  titulo,
  voltarPara = "/scan",
  textoVoltar = "Scan",
}) {
  return (
    <header className="header-acao">
      <Link className="btn-voltar-acao" href={voltarPara}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
        {textoVoltar}
      </Link>
      <h1 className="titulo-acao">{titulo}</h1>
    </header>
  );
}
