"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import CabecalhoAcao from "../components/CabecalhoAcao";
import ItemHistorico from "../components/ItemHistorico";
import { salvarAnalise } from "../services/joviApi";
import {
  capturaParaArquivo,
  obterCaptura,
  obterUltimaAnaliseSerializada,
} from "../services/captureSession";
import { salvarImagemDoCaderno } from "../services/cadernoImagens";
import {
  carregarCadernoLocal,
  MATERIAS_INICIAIS,
  salvarCadernoLocal,
} from "../services/cadernoHistorico";

function assinarArmazenamento(aoMudar) {
  window.addEventListener("storage", aoMudar);
  return () => window.removeEventListener("storage", aoMudar);
}

function dadosDoRegistro(registro) {
  if (!registro) return null;

  try {
    return JSON.parse(registro) || null;
  } catch {
    return null;
  }
}

export default function Salvar() {
  const router = useRouter();
  const [materias, setMaterias] = useState(MATERIAS_INICIAIS);
  const [historico, setHistorico] = useState([]);
  const [selecionada, setSelecionada] = useState(MATERIAS_INICIAIS[0].nome);
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState("");
  const [itemHistoricoAberto, setItemHistoricoAberto] = useState(null);
  const [armazenamentoCarregado, setArmazenamentoCarregado] = useState(false);
  const registroDaAnalise = useSyncExternalStore(
    assinarArmazenamento,
    obterUltimaAnaliseSerializada,
    () => null,
  );
  const dadosDaAnalise = useMemo(
    () => dadosDoRegistro(registroDaAnalise),
    [registroDaAnalise],
  );
  const analise = dadosDaAnalise?.analise || null;
  const carregandoAnalise = registroDaAnalise === null;

  useEffect(() => {
    let cancelado = false;

    async function carregarDadosLocais() {
      await Promise.resolve();

      if (cancelado) return;

      const dadosDoCaderno = carregarCadernoLocal();

      setMaterias(dadosDoCaderno.materias);
      setHistorico(dadosDoCaderno.historico);
      setSelecionada(dadosDoCaderno.materiaSelecionada);

      setArmazenamentoCarregado(true);
    }

    carregarDadosLocais();

    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    if (!armazenamentoCarregado) return;

    const salvou = salvarCadernoLocal({
      materias,
      historico,
      materiaSelecionada: selecionada,
    });

    if (!salvou) {
      console.warn("Não foi possível salvar os dados no localStorage.");
    }
  }, [armazenamentoCarregado, historico, materias, selecionada]);

  function criarMateria() {
    const nome = window.prompt("Digite o nome da nova disciplina:");

    if (nome === null) return;
    if (nome.trim() === "") {
      setAviso("DÊ UM NOME À DISCIPLINA!");
      return;
    }

    const nomeLimpo = nome.trim();
    const materiaExistente = materias.find(
      (materia) => materia.nome.toLowerCase() === nomeLimpo.toLowerCase(),
    );

    if (materiaExistente) {
      setSelecionada(materiaExistente.nome);
      setAviso("ESSA DISCIPLINA JÁ EXISTE.");
      return;
    }

    const novaMateria = { nome: nomeLimpo, quantidade: 0 };
    setMaterias([...materias, novaMateria]);
    setSelecionada(novaMateria.nome);
    setAviso(`MATÉRIA ${novaMateria.nome.toUpperCase()} CRIADA!`);
  }

  async function confirmarSalvamento() {
    if (!analise) {
      setAviso("GERE UM RESUMO, FLASHCARD OU RESOLUÇÃO ANTES DE SALVAR.");
      return;
    }

    try {
      setSalvando(true);
      setAviso("SALVANDO...");
      const resultado = await salvarAnalise(selecionada, analise);
      const idDoRegistro = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const captura = obterCaptura();
      let imagemId = null;
      let fotoNaoSalva = true;

      if (captura?.id === dadosDaAnalise?.capturaId) {
        try {
          const arquivoDaCaptura = await capturaParaArquivo(captura);
          imagemId = `foto-${idDoRegistro}`;
          await salvarImagemDoCaderno(imagemId, arquivoDaCaptura);
          fotoNaoSalva = false;
        } catch (erroDaFoto) {
          imagemId = null;
          fotoNaoSalva = true;
          console.warn("A análise foi salva sem a foto original.", erroDaFoto);
        }
      }

      const novoRegistro = {
        id: idDoRegistro,
        materia: resultado.materia,
        tipo: analise.analysis_type,
        assunto: analise.subject,
        salvoEm: new Date().toISOString(),
        analise,
        imagemId,
      };
      const historicoAtualizado = [novoRegistro, ...historico];

      setMaterias((atuais) =>
        atuais.map((materia) =>
          materia.nome === selecionada
            ? { ...materia, quantidade: materia.quantidade + 1 }
            : materia,
        ),
      );
      setHistorico(historicoAtualizado);

      setAviso(
        fotoNaoSalva
          ? `ANÁLISE SALVA EM ${resultado.materia.toUpperCase()}, MAS A FOTO NÃO PÔDE SER GUARDADA.`
          : `FOTO E ANÁLISE SALVAS EM ${resultado.materia.toUpperCase()}!`,
      );
    } catch (erro) {
      setAviso(erro.message || "NÃO FOI POSSÍVEL SALVAR.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Salvar em Matéria" />

        <div className="corpo-acao">
          {aviso && <p className="alerta-acao">{aviso}</p>}

          {!carregandoAnalise && !analise ? (
            <div className="estado-analise estado-analise-erro">
              <strong>Nenhuma análise disponível</strong>
              <span>Primeiro capture uma imagem e gere um resultado com a Jovi.</span>
              <Link href="/">Voltar à câmera</Link>
            </div>
          ) : (
            <>
              {analise && (
                <div className="analise-a-salvar">
                  <span>{analise.analysis_type}</span>
                  <strong>{analise.subject}</strong>
                  <small>A foto original será incluída neste registro.</small>
                </div>
              )}

              <p className="salvar-instrucao">
                Escolha a disciplina onde esta análise será salva
              </p>

              <div className="lista-materias">
                {materias.map((materia) => (
                  <button
                    className={`card-materia ${materia.nome === selecionada ? "selecionado" : ""}`}
                    type="button"
                    aria-pressed={materia.nome === selecionada}
                    onClick={() => setSelecionada(materia.nome)}
                    key={materia.nome}
                  >
                    <span className="materia-icone">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </span>
                    <span className="materia-info">
                      <strong>{materia.nome}</strong>
                      <small>{materia.quantidade} scans salvos</small>
                    </span>
                    <span className="materia-check"><span /></span>
                  </button>
                ))}

                <button className="card-materia" type="button" onClick={criarMateria}>
                  <span className="materia-icone">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                  <span className="materia-info"><strong>Criar nova matéria...</strong></span>
                </button>
              </div>

              <button
                className="btn-salvar-materia"
                type="button"
                onClick={confirmarSalvamento}
                disabled={salvando || !analise}
              >
                {salvando ? "Salvando..." : "Salvar aqui"}
              </button>

              {(aviso.startsWith("FOTO E ANÁLISE") || aviso.startsWith("ANÁLISE SALVA")) && (
                <button className="btn-voltar-pos-salvar" type="button" onClick={() => router.push("/")}>
                  Voltar à câmera
                </button>
              )}
            </>
          )}

          {historico.length > 0 && (
            <section className="historico-local">
              <div className="cabecalho-historico-local">
                <h2>Salvos recentemente</h2>
                <span>{historico.length} salvos</span>
              </div>

              <button
                className="btn-abrir-caderno"
                type="button"
                onClick={() => router.push("/caderno")}
              >
                <span>
                  <strong>Ver caderno completo</strong>
                  <small>Todas as matérias e conteúdos salvos</small>
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="lista-historico-local">
                {historico.slice(0, 8).map((item) => (
                  <ItemHistorico
                    item={item}
                    aberto={itemHistoricoAberto === item.id}
                    aoAlternar={(id) =>
                      setItemHistoricoAberto((atual) =>
                        atual === id ? null : id,
                      )
                    }
                    key={item.id}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
