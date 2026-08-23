"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CabecalhoAcao from "../components/CabecalhoAcao";

const materiasIniciais = [
  { nome: "Matemática", quantidade: 12 },
  { nome: "Física", quantidade: 7 },
  { nome: "Português", quantidade: 3 },
  { nome: "Programação", quantidade: 20 },
  { nome: "Inglês", quantidade: 5 },
];

export default function Salvar() {
  const router = useRouter();
  const [materias, setMaterias] = useState(materiasIniciais);
  const [selecionada, setSelecionada] = useState("Matemática");
  const [aviso, setAviso] = useState("");

  function criarMateria() {
    const nome = window.prompt("Digite o nome da nova disciplina:");

    if (nome === null) return;
    if (nome.trim() === "") {
      setAviso("DÊ UM NOME À DISCIPLINA!");
      return;
    }

    const novaMateria = { nome: nome.trim(), quantidade: 0 };
    setMaterias([...materias, novaMateria]);
    setSelecionada(novaMateria.nome);
    setAviso(`MATÉRIA ${novaMateria.nome.toUpperCase()} CRIADA!`);
  }

  function confirmarSalvamento() {
    setAviso(`SALVO EM ${selecionada.toUpperCase()}!`);
    setTimeout(() => router.back(), 1200);
  }

  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Salvar em Matéria" />

        <div className="corpo-acao">
          {aviso && <p className="alerta-acao">{aviso}</p>}
          <p className="salvar-instrucao">Escolha a disciplina onde este scan será salvo</p>

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

          <button className="btn-salvar-materia" type="button" onClick={confirmarSalvamento}>
            Salvar aqui
          </button>
        </div>
      </section>
    </main>
  );
}
