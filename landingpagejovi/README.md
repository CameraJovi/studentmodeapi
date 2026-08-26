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

## Como executar

Não é necessário instalar dependências. Abra o arquivo `index.html` em um navegador ou utilize a extensão Live Server do Visual Studio Code.

O formulário de contato possui validação e retorno visual para demonstrar a interação, mas não envia dados para um servidor.

## Imagens das funcionalidades

Na seção **Galeria**, cada funcionalidade possui um espaço reservado para sua captura de tela. Para adicionar uma imagem, substitua o elemento `div` com a classe `galeria-placeholder` por uma tag `img` dentro do mesmo `figure`:

```html
<img src="assets/funcionalidade-captura.png" alt="Tela de captura da Câmera Jovi" />
```

Os nomes sugeridos para os arquivos aparecem dentro de cada espaço reservado no site.

## Estrutura

```text
landingpagejovi/
├── assets/
│   └── math.png
├── index.html
├── styles.css
├── script.js
├── README.md
└── INTEGRANTES.TXT
```

## Links do projeto

- Aplicação: https://camerajovi-kappa.vercel.app
- Repositório: https://github.com/CameraJovi/studentmodeapi
- Referência de repertório: https://www.figma.com/deck/Ua9zxM7go2VhjtOwrpABDc
