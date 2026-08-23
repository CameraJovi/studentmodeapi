"use client";

import { useState } from "react";

export default function CardFlashcard({ titulo, perguntas, respostas }) {
  const [virado, setVirado] = useState(false);

  return (
    <article className={`card-flashcard ${virado ? "virado" : ""}`}>
      <header className="card-flashcard-header">
        <span className="card-flashcard-titulo">{titulo}</span>
        <button
          className="btn-flashcard-girar"
          type="button"
          title="Girar"
          aria-pressed={virado}
          onClick={() => setVirado(!virado)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </button>
      </header>

      <div className="card-flashcard-frente">
        {perguntas.map((pergunta) => (
          <p className="card-flashcard-pergunta" key={pergunta}>{pergunta}</p>
        ))}
      </div>

      <div className="card-flashcard-verso">
        {respostas.map((resposta) => (
          <div className="resposta-item" key={resposta.titulo}>
            <strong>{resposta.titulo}</strong>
            {resposta.texto && <p>{resposta.texto}</p>}
            {resposta.itens && (
              <ul className="resposta-lista">
                {resposta.itens.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {resposta.passos && (
              <ol className="resposta-lista-numerada">
                {resposta.passos.map((passo) => <li key={passo}>{passo}</li>)}
              </ol>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
