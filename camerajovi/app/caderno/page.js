"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import CabecalhoAcao from "../components/CabecalhoAcao";
import ItemHistorico from "../components/ItemHistorico";
import {
  carregarCadernoLocal,
  salvarMateriaSelecionada,
} from "../services/cadernoHistorico";

export default function Caderno() {
  const [materias, setMaterias] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [selecionada, setSelecionada] = useState("");
  const [itemAberto, setItemAberto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const arrasteMaterias = useRef({
    ativo: false,
    moveu: false,
    ponteiro: null,
    xInicial: 0,
    rolagemInicial: 0,
  });

  useEffect(() => {
    let cancelado = false;

    async function carregarCaderno() {
      await Promise.resolve();

      if (cancelado) return;

      const dadosDoCaderno = carregarCadernoLocal();

      setMaterias(dadosDoCaderno.materias.map((materia) => materia.nome));
      setHistorico(dadosDoCaderno.historico);
      setSelecionada(dadosDoCaderno.materiaSelecionada);
      setCarregando(false);
    }

    carregarCaderno();

    return () => {
      cancelado = true;
    };
  }, []);

  const registrosDaMateria = useMemo(
    () => historico.filter((item) => item.materia === selecionada),
    [historico, selecionada],
  );

  const quantidades = useMemo(
    () => Object.fromEntries(
      materias.map((materia) => [
        materia,
        historico.filter((item) => item.materia === materia).length,
      ]),
    ),
    [historico, materias],
  );

  function selecionarMateria(materia) {
    setSelecionada(materia);
    setItemAberto(null);
    salvarMateriaSelecionada(materia);
  }

  function iniciarArrasteMaterias(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    arrasteMaterias.current = {
      ativo: true,
      moveu: false,
      ponteiro: event.pointerId,
      xInicial: event.clientX,
      rolagemInicial: event.currentTarget.scrollLeft,
    };
    event.currentTarget.classList.add("arrastando");
  }

  function moverMaterias(event) {
    const arraste = arrasteMaterias.current;
    if (!arraste.ativo || arraste.ponteiro !== event.pointerId) return;

    const deslocamento = event.clientX - arraste.xInicial;
    if (Math.abs(deslocamento) > 4 && !arraste.moveu) {
      arraste.moveu = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }

    if (arraste.moveu) {
      event.preventDefault();
      event.currentTarget.scrollLeft = arraste.rolagemInicial - deslocamento;
    }
  }

  function finalizarArrasteMaterias(event) {
    const faixa = event.currentTarget;
    const arraste = arrasteMaterias.current;
    if (arraste.ponteiro !== event.pointerId) return;

    arraste.ativo = false;
    faixa.classList.remove("arrastando");

    if (faixa.hasPointerCapture?.(event.pointerId)) {
      faixa.releasePointerCapture(event.pointerId);
    }

    window.setTimeout(() => {
      arraste.moveu = false;
    }, 0);
  }

  function impedirCliqueAposArraste(event) {
    if (!arrasteMaterias.current.moveu) return;

    event.preventDefault();
    event.stopPropagation();
    arrasteMaterias.current.moveu = false;
  }

  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao
          titulo="Caderno Inteligente"
          voltarPara="/salvar"
          textoVoltar="Salvar"
        />

        <div className="corpo-acao caderno-completo">
          <header className="caderno-apresentacao">
            <span>Biblioteca de estudos</span>
            <h2>{selecionada || "Suas matérias"}</h2>
            <p>
              Consulte as fotos e os conteúdos gerados pela Jovi, organizados
              por matéria.
            </p>
          </header>

          {carregando ? (
            <p className="caderno-estado">Carregando caderno...</p>
          ) : (
            <>
              <nav
                className="filtros-materias"
                aria-label="Matérias do caderno"
                onPointerDown={iniciarArrasteMaterias}
                onPointerMove={moverMaterias}
                onPointerUp={finalizarArrasteMaterias}
                onPointerCancel={finalizarArrasteMaterias}
                onClickCapture={impedirCliqueAposArraste}
              >
                {materias.map((materia) => (
                  <button
                    className={materia === selecionada ? "ativo" : ""}
                    type="button"
                    aria-pressed={materia === selecionada}
                    onClick={() => selecionarMateria(materia)}
                    key={materia}
                  >
                    <span>{materia}</span>
                    <small>{quantidades[materia] || 0}</small>
                  </button>
                ))}
              </nav>

              <section className="conteudos-da-materia">
                <div className="cabecalho-conteudos-materia">
                  <h3>Todos os conteúdos</h3>
                  <span>
                    {registrosDaMateria.length} {registrosDaMateria.length === 1
                      ? "registro"
                      : "registros"}
                  </span>
                </div>

                {registrosDaMateria.length ? (
                  <div className="lista-historico-local">
                    {registrosDaMateria.map((item) => (
                      <ItemHistorico
                        item={item}
                        aberto={itemAberto === item.id}
                        aoAlternar={(id) =>
                          setItemAberto((atual) => atual === id ? null : id)
                        }
                        key={item.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="caderno-vazio">
                    <strong>Nenhum conteúdo salvo nesta matéria</strong>
                    <p>Capture uma imagem e salve uma análise para começar.</p>
                    <Link href="/">Ir para a câmera</Link>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
