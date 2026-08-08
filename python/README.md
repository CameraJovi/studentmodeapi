# Sprint 02 - Camera Jovi

API FastAPI para analisar fotos capturadas pelo front da Camera Jovi usando Google Gemini.

## Funcionalidades

- `POST /api/resumo` - gera resumo inteligente a partir de uma imagem.
- `POST /api/flashcards` - gera flashcards de estudo.
- `POST /api/math` - identifica e resolve contas matematicas.
- `POST /api/salvar` - salva a ultima analise em `.txt` por materia.
- `GET /api/health` - verifica se a API esta no ar.

## Requisitos

- Python 3.10+
- Chave de API do Google Gemini
- Navegador com suporte a camera em `localhost`

## Instalacao

```bash
pip install -r requirements.txt
```

Crie um arquivo `.env` dentro da pasta `python`:

```env
GEMINI_API_KEY=sua_chave_aqui
```

## Como rodar

Em um terminal, inicie a API:

```bash
cd python
uvicorn api:app --reload --port 8000
```

Em outro terminal, sirva o front:

```bash
cd cameraapresentation
python -m http.server 5500
```

Acesse:

```text
http://127.0.0.1:5500
```

## Fluxo atual

1. O front abre a camera com `getUserMedia`.
2. O usuario tira uma foto dentro do modelo de celular.
3. A imagem e enviada para um endpoint FastAPI.
4. A API chama o Gemini e retorna JSON estruturado.
5. O front renderiza resumo, flashcards ou resolucao matematica.
6. O usuario pode salvar o resultado em `python/salvos/<materia>/`.

O arquivo `script.py` foi mantido como legado do fluxo CLI antigo.
