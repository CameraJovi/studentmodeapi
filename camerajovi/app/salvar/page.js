"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import CabecalhoAcao from "../components/CabecalhoAcao";
import ItemHistorico from "../components/ItemHistorico";
import { salvarAnalise } from "../services/joviApi";
import { obterUltimaAnaliseSerializada } from "../services/captureSession";

const CHAVE_MATERIAS = "jovi:materias";
const CHAVE_HISTORICO = "jovi:historico";
const CHAVE_MATERIA_SELECIONADA = "jovi:materia-selecionada";

const materiasIniciais = [
  { nome: "Matemática", quantidade: 12 },
  { nome: "Física", quantidade: 7 },
  { nome: "Português", quantidade: 3 },
  { nome: "Programação", quantidade: 20 },
  { nome: "Inglês", quantidade: 5 },
];

function assinarArmazenamento(aoMudar) {
  window.addEventListener("storage", aoMudar);
  return () => window.removeEventListener("storage", aoMudar);
}

function analiseDoRegistro(registro) {
  if (!registro) return null;

  try {
    return JSON.parse(registro)?.analise || null;
  } catch {
    return null;
  }
}

function lerListaLocal(chave) {
  try {
    const valor = window.localStorage.getItem(chave);
    const lista = valor ? JSON.parse(valor) : null;
    return Array.isArray(lista) ? lista : null;
  } catch {
    return null;
  }
}

export default function Salvar() {
  const router = useRouter();
  const [materias, setMaterias] = useState(materiasIniciais);
  const [historico, setHistorico] = useState([]);
  const [selecionada, setSelecionada] = useState("Matemática");
  const [salvando, setSalvando] = useState(false);
  const [aviso, setAviso] = useState("");
  const [itemHistoricoAberto, setItemHistoricoAberto] = useState(null);
  const [armazenamentoCarregado, setArmazenamentoCarregado] = useState(false);
  const registroDaAnalise = useSyncExternalStore(
    assinarArmazenamento,
    obterUltimaAnaliseSerializada,
    () => null,
  );
  const analise = useMemo(
    () => analiseDoRegistro(registroDaAnalise),
    [registroDaAnalise],
  );
  const carregandoAnalise = registroDaAnalise === null;

  useEffect(() => {
    let cancelado = false;

    async function carregarDadosLocais() {
      await Promise.resolve();

      if (cancelado) return;

      const materiasSalvas = lerListaLocal(CHAVE_MATERIAS);
      const historicoSalvo = lerListaLocal(CHAVE_HISTORICO);
      const materiasDisponiveis = materiasSalvas?.length
        ? materiasSalvas
        : materiasIniciais;
      const materiaSalva = window.localStorage.getItem(
        CHAVE_MATERIA_SELECIONADA,
      );

      setMaterias(materiasDisponiveis);
      setHistorico(historicoSalvo || []);

      if (materiasDisponiveis.some((materia) => materia.nome === materiaSalva)) {
        setSelecionada(materiaSalva);
      }

      setArmazenamentoCarregado(true);
    }

    carregarDadosLocais();

    return () => {
      cancelado = true;
    };
  }, []);

  useEffect(() => {
    if (!armazenamentoCarregado) return;

    try {
      window.localStorage.setItem(CHAVE_MATERIAS, JSON.stringify(materias));
      window.localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
      window.localStorage.setItem(CHAVE_MATERIA_SELECIONADA, selecionada);
    } catch {
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

      setMaterias((atuais) =>
        atuais.map((materia) =>
          materia.nome === selecionada
            ? { ...materia, quantidade: materia.quantidade + 1 }
            : materia,
        ),
      );
      setHistorico((atual) =>
        [
          {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            materia: resultado.materia,
          tipo: analise.analysis_type,
          assunto: analise.subject,
          salvoEm: new Date().toISOString(),
          analise,
          },
          ...atual,
        ].slice(0, 8),
      );
      setAviso(`SALVO EM ${resultado.materia.toUpperCase()}!`);
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

              {aviso.startsWith("SALVO EM") && (
                <button className="btn-voltar-pos-salvar" type="button" onClick={() => router.push("/")}>
                  Voltar à câmera
                </button>
              )}
            </>
          )}

          {historico.length > 0 && (
            <section className="historico-local">
              <h2>Salvos recentemente</h2>

              <div className="lista-historico-local">
                {historico.map((item) => (
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
