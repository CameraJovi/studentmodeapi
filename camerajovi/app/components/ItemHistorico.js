"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { obterImagemDoCaderno } from "../services/cadernoImagens";

function formatarData(data) {
  return new Date(data).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function FotoDoHistorico({ imagemId, assunto }) {
  const [imagem, setImagem] = useState({
    id: null,
    url: "",
    indisponivel: false,
  });

  useEffect(() => {
    if (!imagemId) return undefined;

    let componenteAtivo = true;
    let urlTemporaria = "";

    async function carregarImagem() {
      try {
        const registro = await obterImagemDoCaderno(imagemId);

        if (!componenteAtivo) return;

        if (!registro?.blob) {
          setImagem({ id: imagemId, url: "", indisponivel: true });
          return;
        }

        urlTemporaria = URL.createObjectURL(registro.blob);
        setImagem({ id: imagemId, url: urlTemporaria, indisponivel: false });
      } catch {
        if (componenteAtivo) {
          setImagem({ id: imagemId, url: "", indisponivel: true });
        }
      }
    }

    carregarImagem();

    return () => {
      componenteAtivo = false;
      if (urlTemporaria) URL.revokeObjectURL(urlTemporaria);
    };
  }, [imagemId]);

  if (!imagemId) return null;

  if (imagem.id !== imagemId) {
    return <p className="historico-foto-status">Carregando foto...</p>;
  }

  if (imagem.indisponivel) {
    return (
      <p className="historico-foto-status">
        A foto deste registro não está mais disponível.
      </p>
    );
  }

  return (
    <figure className="historico-foto">
      <Image
        src={imagem.url}
        alt={`Foto original de ${assunto || "conteúdo estudado"}`}
        width={960}
        height={720}
        unoptimized
      />
      <figcaption>Foto original</figcaption>
    </figure>
  );
}

function DetalhesAnalise({ analise }) {
  if (!analise) {
    return (
      <p className="historico-sem-detalhes">
        Os detalhes não estão disponíveis para este registro antigo.
      </p>
    );
  }

  if (analise.analysis_type === "flashcards") {
    return (
      <div className="historico-flashcards">
        {analise.cards?.map((card, indice) => (
          <div className="historico-flashcard" key={`${card.question}-${indice}`}>
            <strong>{card.question}</strong>
            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    );
  }

  if (analise.analysis_type === "math") {
    return (
      <div className="historico-math">
        {analise.expression && (
          <p><strong>Expressão:</strong> {analise.expression}</p>
        )}

        {analise.steps?.map((passo, indice) => (
          <div className="historico-passo" key={`${passo.title}-${indice}`}>
            <strong>{indice + 1}. {passo.title}</strong>
            <p>{passo.step}</p>
          </div>
        ))}

        {analise.result?.length > 0 && (
          <p className="historico-resultado">
            <strong>Resultado:</strong> {analise.result.join(", ")}
          </p>
        )}
      </div>
    );
  }

  return <p className="historico-conteudo">{analise.content}</p>;
}

export default function ItemHistorico({
  item,
  aberto,
  aoAlternar,
  aoRenomear,
  aoExcluir,
}) {
  return (
    <article className={`item-historico-local ${aberto ? "aberto" : ""}`}>
      <button
        className="btn-item-historico"
        type="button"
        aria-expanded={aberto}
        onClick={() => aoAlternar(item.id)}
      >
        <span className="textos-item-historico">
          <strong>{item.assunto || "Conteúdo sem título"}</strong>
          <span>
            {item.materia} · {item.tipo}{item.imagemId ? " · Foto" : ""}
          </span>
        </span>

        <span className="data-item-historico">
          <time dateTime={item.salvoEm}>{formatarData(item.salvoEm)}</time>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {aberto && (
        <div className="detalhes-item-historico">
          <FotoDoHistorico imagemId={item.imagemId} assunto={item.assunto} />
          <DetalhesAnalise analise={item.analise} />

          {(aoRenomear || aoExcluir) && (
            <div className="acoes-item-historico">
              {aoRenomear && (
                <button type="button" onClick={() => aoRenomear(item)}>
                  Renomear
                </button>
              )}
              {aoExcluir && (
                <button
                  className="excluir"
                  type="button"
                  onClick={() => aoExcluir(item)}
                >
                  Excluir
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
