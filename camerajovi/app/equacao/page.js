"use client";

import Link from "next/link";
import CabecalhoAcao from "../components/CabecalhoAcao";
import EstadoAnalise from "../components/EstadoAnalise";
import PreviewCaptura from "../components/PreviewCaptura";
import useJoviAnalysis from "../hooks/useJoviAnalysis";

export default function Equacao() {
  const { status, dados, erro, tentarNovamente } = useJoviAnalysis("math");

  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Resolver Equação" />

        <div className="corpo-acao">
          {status !== "sucesso" ? (
            <EstadoAnalise
              status={status}
              mensagem={status === "carregando" ? "Resolvendo exercício..." : erro}
              aoTentarNovamente={tentarNovamente}
            />
          ) : (
            <>
              <div className="slide-equacao">
                <div className="equacao-preview-quadro">
                  <PreviewCaptura className="img-preview-math" alternativa={false} />
                </div>

                <div className="equacao-resolucao">
                  <p className="resolucao-titulo">{dados.subject}</p>

                  <div className="resolucao-sistema">
                    <span className="resolucao-eq">
                      {dados.expression || "Nenhuma expressão matemática encontrada"}
                    </span>
                  </div>

                  {dados.steps?.length ? (
                    dados.steps.map((passo, indice) => (
                      <div className="resolucao-passo" key={`${passo.title}-${indice}`}>
                        <strong className="titulo-passo-math">
                          {indice + 1}. {passo.title}
                        </strong>
                        <span className="resolucao-passo-texto">{passo.step}</span>
                      </div>
                    ))
                  ) : (
                    <p className="resolucao-dica">{dados.content}</p>
                  )}

                  {dados.result?.length > 0 && (
                    <div className="resultado-math">
                      <strong>Resultado</strong>
                      {dados.result.map((resultado, indice) => (
                        <span key={`${resultado}-${indice}`}>{resultado}</span>
                      ))}
                    </div>
                  )}
                </div>
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
