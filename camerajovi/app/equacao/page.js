"use client";

import Image from "next/image";
import { useState } from "react";
import CabecalhoAcao from "../components/CabecalhoAcao";

const exemplos = [
  {
    titulo: "Resolva o sistema de equações",
    equacoes: ["2x + y = 8", "2x − y = 12"],
    dica: "Método da substituição",
    passos: ["2x = 12 + y", "(12 + y) + y = 8", "2y = −4", "y = −2"],
    imagem: true,
  },
  {
    titulo: "Equação do 2º Grau",
    equacoes: ["x² − 5x + 6 = 0"],
    dica: "Resolva usando Bhaskara ou Soma e Produto",
    passos: ["Soma = 5, Produto = 6", "x' = 2", "x'' = 3"],
  },
  {
    titulo: "Equação Linear",
    equacoes: ["3(x + 2) = 15"],
    dica: "Distribua o 3 antes de isolar o x",
    passos: ["3x + 6 = 15", "3x = 15 − 6", "3x = 9", "x = 3"],
  },
];

export default function Equacao() {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const exemplo = exemplos[indiceAtual];
  const primeiroExemplo = indiceAtual === 0;
  const ultimoExemplo = indiceAtual === exemplos.length - 1;

  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Resolver Equação" />

        <div className="corpo-acao">
          <div className="slide-equacao">
            <div className="equacao-preview-quadro">
              {exemplo.imagem ? (
                <Image className="img-preview-math" src="/img/math.png" alt="Documento" width={600} height={400} priority />
              ) : (
                <>
                  <span className="equacao-linha-fake equacao" />
                  <span className="equacao-linha-fake linha-grande" />
                  <span className="equacao-linha-fake linha-media" />
                </>
              )}
            </div>

            <div className="equacao-resolucao">
              <p className="resolucao-titulo">{exemplo.titulo}</p>
              <div className="resolucao-sistema">
                {exemplo.equacoes.map((equacao) => (
                  <span className="resolucao-eq" key={equacao}>{equacao}</span>
                ))}
              </div>
              <p className="resolucao-dica">↓ {exemplo.dica}</p>
              {exemplo.passos.map((passo, indice) => (
                <div className="resolucao-passo" key={passo}>
                  <span className={`resolucao-passo-texto ${indice === exemplo.passos.length - 1 ? "destaque" : ""}`}>
                    {passo}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="controles-slideshow">
            {!primeiroExemplo && (
              <button className="btn-slideshow" type="button" onClick={() => setIndiceAtual(indiceAtual - 1)}>
                ‹ Anterior
              </button>
            )}

            {!primeiroExemplo && <span className="contador-math">{indiceAtual + 1} de {exemplos.length}</span>}

            {!ultimoExemplo && (
              <button className="btn-slideshow proximo" type="button" onClick={() => setIndiceAtual(indiceAtual + 1)}>
                {primeiroExemplo ? "Mais exemplos" : "Próximo"} ›
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
