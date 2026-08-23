import CabecalhoAcao from "../components/CabecalhoAcao";
import CardFlashcard from "../components/CardFlashcard";

const flashcards = [
  {
    titulo: "Flashcard 1 · Conceito Base",
    perguntas: ["O que é um sistema linear?", "Quais são os tipos de sistemas lineares?"],
    respostas: [
      {
        titulo: "O que é um sistema linear?",
        texto: "É um conjunto de duas ou mais equações lineares que envolvem as mesmas variáveis e devem ser satisfeitas ao mesmo tempo.",
      },
      {
        titulo: "Tipos de sistemas lineares",
        itens: [
          "Sistema possível e determinado (SPD): uma única solução.",
          "Sistema possível e indeterminado (SPI): infinitas soluções.",
          "Sistema impossível (SI): não possui solução.",
        ],
      },
    ],
  },
  {
    titulo: "Flashcard 2 · Método da substituição",
    perguntas: ["Resolva o sistema: 2x + y = 8 e 2x − y = 12", "Utilize o método da substituição"],
    respostas: [
      {
        titulo: "Sistema: 2x + y = 8 e 2x − y = 12",
        passos: [
          "Isole y na primeira equação: y = 8 − 2x.",
          "Substitua na segunda: 2x − (8 − 2x) = 12.",
          "Resolva: 4x = 20.",
          "Encontre x = 5 e y = −2.",
        ],
      },
    ],
  },
  {
    titulo: "Flashcard 3 · Método da adição",
    perguntas: ["Resolva o mesmo sistema utilizando o método da adição"],
    respostas: [
      {
        titulo: "Resolução",
        passos: [
          "Some as duas equações.",
          "Elimine y e obtenha 4x = 20.",
          "Encontre x = 5.",
          "Substitua na primeira equação e encontre y = −2.",
        ],
      },
    ],
  },
  {
    titulo: "Flashcard 4 · Verificação / Prova Real",
    perguntas: ["Como verificar se x = 5 e y = −2 é solução do sistema?"],
    respostas: [
      {
        titulo: "Verificação",
        texto: "Substitua os valores encontrados nas equações originais.",
        itens: [
          "1ª equação: 2(5) + (−2) = 8.",
          "2ª equação: 2(5) − (−2) = 12.",
        ],
      },
    ],
  },
];

export default function Flashcards() {
  return (
    <main className="container-celular">
      <section className="tela-celular tela-acao">
        <CabecalhoAcao titulo="Flashcards" />

        <div className="corpo-acao">
          <p className="flashcard-subtitulo-deck">Sistemas e Matrizes</p>
          <p className="flashcard-contador">{flashcards.length} cards gerados</p>

          <div className="container-flashcards">
            {flashcards.map((card) => (
              <CardFlashcard {...card} key={card.titulo} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
