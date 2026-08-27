"use client";

import Link from "next/link";
import { useState } from "react";
import CardAcaoScan from "../components/CardAcaoScan";
import PreviewCaptura from "../components/PreviewCaptura";

const acoesDoScan = [
  { tipo: "resumo", titulo: "Resumo Inteligente", descricao: "Gerar resumo com IA", destino: "/resumo" },
  { tipo: "flashcard", titulo: "Criar Flashcards", descricao: "Cards de estudo automático", destino: "/flashcard" },
  { tipo: "math", titulo: "Resolver Equação", descricao: "Passo a passo da solução", destino: "/equacao" },
];

export default function Scan() {
  const [aviso, setAviso] = useState("");

  function compartilhar() {
    setAviso("COMPARTILHAMENTO EM BREVE");
    setTimeout(() => setAviso(""), 2000);
  }

  return (
    <main className="container-celular">
      <section className="tela-celular tela-resultado-scan">
        <header className="header-resultado">
          <Link className="btn-texto-resultado" href="/">Cancelar</Link>
          <h1 className="titulo-resultado">Scan</h1>
          <Link className="btn-texto-resultado" href="/caderno">Caderno</Link>
        </header>

        {aviso && <p className="alerta-acao">{aviso}</p>}

        <div className="preview-documento">
          <PreviewCaptura alternativa={false} />
        </div>

        <div className="lista-acoes-resultado">
          {acoesDoScan.map((acao) => (
            <CardAcaoScan {...acao} key={acao.tipo} />
          ))}

          <button className="card-acao-resultado" type="button" onClick={compartilhar}>
            <span className="icone-acao-resultado">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>
            <span className="textos-acao-resultado">
              <strong>Compartilhar</strong>
              <span>Envie para grupo de estudo</span>
            </span>
            <svg className="seta-acao" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
            <span className="barra-inferior-acao" />
          </button>
        </div>
      </section>
    </main>
  );
}
