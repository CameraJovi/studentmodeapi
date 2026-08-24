import Link from "next/link";

export default function EstadoAnalise({ status, mensagem, aoTentarNovamente }) {
  if (status === "carregando") {
    return (
      <div className="estado-analise" role="status" aria-live="polite">
        <span className="carregando-analise" aria-hidden="true" />
        <strong>{mensagem}</strong>
        <span>Aguarde enquanto a Jovi analisa a imagem.</span>
      </div>
    );
  }

  return (
    <div className="estado-analise estado-analise-erro" role="alert">
      <strong>Não foi possível concluir a análise</strong>
      <span>{mensagem}</span>
      <div className="acoes-estado-analise">
        <button type="button" onClick={aoTentarNovamente}>
          Tentar novamente
        </button>
        <Link href="/">Voltar à câmera</Link>
      </div>
    </div>
  );
}
