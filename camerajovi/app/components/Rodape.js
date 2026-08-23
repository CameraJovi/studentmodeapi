"use client";

import { useEffect, useRef } from "react";

export default function Rodape({
  modos,
  modoAtivo,
  aoSelecionarModo,
  aoCapturar,
}) {
  const botaoAtivo = useRef(null);

  useEffect(() => {
    botaoAtivo.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [modoAtivo]);

  return (
    <footer className="rodape-camera">
      <section className="barra-inferior" aria-label="Controles de captura">
        <button
          className={`miniatura-preview ${
            modoAtivo === "Estudante" ? "oculto" : ""
          }`}
          type="button"
          aria-label="Abrir galeria"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <polyline points="3 9 9 9 9 3" />
          </svg>
        </button>

        <button
          className="btn-captura"
          type="button"
          aria-label="Tirar foto"
          onClick={aoCapturar}
        >
          <span
            className={`captura-interna ${
              modoAtivo === "Vídeo" ? "modo-video" : ""
            }`}
          />
        </button>

        <button
          className="btn-girar-camera"
          type="button"
          aria-label="Girar câmera"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M1 4v6h6" />
            <path d="M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </button>
      </section>

      <nav className="barra-modos" aria-label="Modos da câmera">
        {modos.map((modo) => (
          <button
            className={`botao-modo ${modo === modoAtivo ? "ativo" : ""}`}
            type="button"
            aria-pressed={modo === modoAtivo}
            onClick={() => aoSelecionarModo(modo)}
            ref={modo === modoAtivo ? botaoAtivo : null}
            key={modo}
          >
            {modo}
          </button>
        ))}
      </nav>
    </footer>
  );
}
