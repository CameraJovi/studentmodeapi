# Câmera Jovi — frontend

Interface Next.js da câmera Jovi. O Modo Estudante captura uma foto verdadeira e usa a API Python existente para gerar resumos, flashcards, resoluções matemáticas e salvar o resultado por matéria.

## Executar

1. Inicie a API Python na porta `8000` conforme as instruções da pasta `python`.
2. Instale as dependências e inicie o frontend:

```bash
npm install
npm run dev
```

3. Abra `http://localhost:5500` e autorize o acesso à câmera.

A porta `5500` é usada porque ela já está autorizada pelo CORS da API Python atual.

## URL da API

Por padrão, o frontend acessa `http://127.0.0.1:8000`. Para usar outro endereço, copie `.env.example` para `.env.local` e altere:

```env
NEXT_PUBLIC_JOVI_API_URL=http://127.0.0.1:8000
```

## Fluxo do Modo Estudante

1. Selecione `Estudante`.
2. Escolha `Scan`, `Flashcard` ou `Math`.
3. Tire a foto.
4. Aguarde o retorno da API.
5. Confira o resultado e, se desejar, salve no Caderno Inteligente.

O frontend chama diretamente os endpoints Python:

- `POST /api/resumo`
- `POST /api/flashcards`
- `POST /api/math`
- `POST /api/salvar`
- `GET /api/health`

Não existe outro backend dentro deste projeto Next.js.
