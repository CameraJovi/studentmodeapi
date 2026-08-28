# Landing Page — Câmera Jovi

Landing Page desenvolvida para apresentar a solução Câmera Jovi na Sprint 3 de Front-End Design. O projeto utiliza a identidade visual preta, cinza e amarela da aplicação principal e explica como a solução ajuda estudantes a capturar, organizar e revisar conteúdos.

## Tecnologias utilizadas

- HTML5 semântico;
- CSS3;
- CSS Grid;
- Media Queries;
- JavaScript.

## Seções da página

- A solução;
- Público-alvo;
- Galeria;
- Nossa equipe;
- Contato.

## Responsividade

O layout utiliza CSS Grid e possui adaptações para desktop, tablet e celular. Os principais pontos de quebra estão em `1024px`, `860px`, `720px` e `520px`.

## Organização do CSS

O arquivo `styles.css` centraliza os imports. As regras foram separadas por responsabilidade dentro da pasta `styles`, facilitando a localização e a manutenção do código.

## Como executar

Não é necessário instalar dependências. Abra o arquivo `index.html` em um navegador ou utilize a extensão Live Server do Visual Studio Code.

O formulário de contato possui validação e retorno visual para demonstrar a interação, mas não envia dados para um servidor.

## Imagens das funcionalidades

A seção **Galeria** apresenta seis capturas reais da aplicação:

- `imagem_1.png`: captura de conteúdo no Modo Estudante;
- `imagem_2.png`: resumo inteligente;
- `imagem_3.png`: flashcards;
- `imagem_4.png`: resolução matemática;
- `imagem_5.png`: caderno inteligente;
- `imagem_6.png`: reconhecimento conceitual do SmartPix.

## Estrutura

```text
landingpagejovi/
├── assets/                   # Imagens e logo da página
├── styles/
│   ├── base.css
│   ├── header.css
│   ├── hero.css
│   ├── solucao.css
│   ├── publico.css
│   ├── galeria.css
│   ├── equipe.css
│   ├── contato.css
│   ├── footer.css
│   └── responsive.css
├── index.html
├── styles.css                # Arquivo central de imports
├── script.js
├── README.md
└── INTEGRANTES.TXT
```

## Links do projeto

- Aplicação: https://camerajovi-kappa.vercel.app
- Repositório: https://github.com/CameraJovi/studentmodeapi
- Referência de repertório: https://www.figma.com/deck/Ua9zxM7go2VhjtOwrpABDc
