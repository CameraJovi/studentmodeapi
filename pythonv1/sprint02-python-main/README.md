# SPRINT 02 - JOVI

CLI para captura e análise inteligente de fotos via Google Gemini.

## Funcionalidades

- **Tirar foto** — abre a webcam e salva imagens com a tecla `C`
- **Galeria** — seleciona qualquer imagem local para análise
- **Resumo** — extrai e organiza o conteúdo de lousa ou caderno
- **Flashcards** — gera flashcards a partir do conteúdo da imagem
- **Math Resolver** — detecta e resolve expressões matemáticas passo a passo
- **Salvar resultado** — exporta a análise em `.txt`

## Requisitos

- Python 3.10+
- Webcam (opcional, apenas para tirar fotos)
- Chave de API do [Google Gemini](https://aistudio.google.com/app/apikey)

## Instalação

```bash
git clone https://github.com/CameraJovi/sprint02-python
cd sprint02-python

pip install -r requirements.txt
```

Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

## Uso

```bash
python main.py
```

Navegue pelo menu com os números correspondentes a cada opção.

### Atalhos da câmera

| Tecla | Ação |
|-------|------|
| `C`   | Tirar foto |
| `Q`   | Fechar câmera |

## Formatos de imagem suportados

`.jpg` `.jpeg` `.png` `.webp`

## Estrutura do projeto

```
camera-jovi/
├── main.py
├── requirements.txt
├── .env
└── .env.example
```