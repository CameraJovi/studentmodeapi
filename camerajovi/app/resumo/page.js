import CabecalhoAcao from "../components/CabecalhoAcao";

export default function Resumo() {
  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Resumo Inteligente" />

        <div className="corpo-acao">
          <div className="resumo-header">
            <h2 className="resumo-titulo-materia">Sistemas e Matrizes</h2>
            <p className="resumo-subtitulo">Disciplina: Álgebra Linear</p>
          </div>

          <div className="resumo-bloco">
            <section className="resumo-topico">
              <h3 className="resumo-topico-titulo">O que é um Sistema Linear?</h3>
              <p>Conjunto de equações de 1º grau com duas ou mais incógnitas que devem ser resolvidas simultaneamente.</p>
            </section>

            <div className="resumo-divisor" />

            <section className="resumo-topico">
              <h3 className="resumo-topico-titulo">Métodos de Resolução</h3>
              <p>Substituição, adição (eliminação) e método gráfico. O objetivo é encontrar os valores que satisfaçam todas as equações.</p>
            </section>
          </div>

          <aside className="resumo-destaque">
            <span className="resumo-destaque-icone">↓</span>
            <p><strong>Dica:</strong> Quando os coeficientes são opostos (+y e -y), use o método da adição para eliminar uma variável rapidamente.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
