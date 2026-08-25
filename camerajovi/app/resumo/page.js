"use client";

import Link from "next/link";
import CabecalhoAcao from "../components/CabecalhoAcao";
import EstadoAnalise from "../components/EstadoAnalise";
import useJoviAnalysis from "../hooks/useJoviAnalysis";

export default function Resumo() {
  const { status, dados, erro, tentarNovamente } = useJoviAnalysis("resumo");

  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Resumo Inteligente" />

        <div className="corpo-acao">
          {status !== "sucesso" ? (
            <EstadoAnalise
              status={status}
              mensagem={status === "carregando" ? "Gerando resumo..." : erro}
              aoTentarNovamente={tentarNovamente}
            />
          ) : (
            <>
              <div className="resumo-header">
                <h2 className="resumo-titulo-materia">{dados.subject}</h2>
                <p className="resumo-subtitulo">Resumo gerado pela Jovi</p>
              </div>

              <div className="resumo-bloco">
                <section className="resumo-topico">
                  <h3 className="resumo-topico-titulo">Conteúdo identificado</h3>
                  <p className="texto-gerado">{dados.content}</p>
                </section>
              </div>

              <Link className="btn-resultado-primario" href="/salvar">
                Salvar no Caderno Inteligente
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
