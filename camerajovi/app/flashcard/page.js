"use client";

import Link from "next/link";
import CabecalhoAcao from "../components/CabecalhoAcao";
import CardFlashcard from "../components/CardFlashcard";
import EstadoAnalise from "../components/EstadoAnalise";
import useJoviAnalysis from "../hooks/useJoviAnalysis";

export default function Flashcards() {
  const { status, dados, erro, tentarNovamente } = useJoviAnalysis("flashcards");
  const cards = dados?.cards || [];

  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Flashcards" />

        <div className="corpo-acao">
          {status !== "sucesso" ? (
            <EstadoAnalise
              status={status}
              mensagem={status === "carregando" ? "Criando flashcards..." : erro}
              aoTentarNovamente={tentarNovamente}
            />
          ) : (
            <>
              <p className="flashcard-subtitulo-deck">{dados.subject}</p>
              <p className="flashcard-contador">
                {cards.length} {cards.length === 1 ? "card gerado" : "cards gerados"}
              </p>

              <div className="container-flashcards">
                {cards.length ? (
                  cards.map((card, indice) => (
                    <CardFlashcard
                      titulo={`Flashcard ${indice + 1}`}
                      perguntas={[card.question || "Pergunta não identificada"]}
                      respostas={[
                        {
                          titulo: "Resposta",
                          texto: card.answer || "Resposta não identificada.",
                        },
                      ]}
                      key={`${card.question}-${indice}`}
                    />
                  ))
                ) : (
                  <p className="resultado-vazio">{dados.content}</p>
                )}
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
