# Camera Jovi

O **Camera Jovi** é uma aplicação web com backend em Python/FastAPI que utiliza o **Google Gemini** para analisar imagens de cadernos, lousas, textos e expressões matemáticas.

A aplicação simula uma câmera de celular e permite capturar uma imagem diretamente pelo navegador. A imagem é enviada para a API, que pode gerar:

* Resumos inteligentes;
* Flashcards de estudo;
* Resolução de expressões matemáticas;
* Arquivos `.txt` com os resultados das análises.

---

## Estrutura do projeto

```text
Challenge-Jovi/
|
|-- cameraapresentation/       # Frontend
|   |-- index.html
|   |-- pages/                 # Telas da aplicação
|   |-- css/                   # Estilos
|   `-- js/                    # JavaScript e integração com API
|
`-- python/                    # Backend
    |-- api.py                 # API FastAPI
    |-- jovi_ai.py             # Integração com Gemini
    |-- script.py              # Versão antiga via terminal
    |-- requirements.txt       # Dependências Python
    |-- README.md              # Documentação do backend
    `-- salvos/                # Arquivos gerados pela aplicação
```

---

# Funcionalidades

### 📷 Captura de imagens

Utiliza a câmera do navegador através da API `getUserMedia` para capturar imagens de:

* Cadernos;
* Lousas;
* Anotações;
* Textos;
* Exercícios;
* Expressões matemáticas.

### 📝 Resumo inteligente

A imagem capturada é enviada ao Gemini, que interpreta o conteúdo e gera um resumo organizado.

### 🧠 Flashcards

A partir do conteúdo da imagem, o sistema pode gerar flashcards para auxiliar nos estudos.

### ➗ Matemática

O sistema identifica expressões matemáticas presentes na imagem e retorna uma resolução detalhada.

### 💾 Salvamento

Os resultados podem ser salvos em arquivos `.txt`, organizados por matéria dentro da pasta:

```text
python/salvos/
```

### ❤️ Health Check

A API possui um endpoint para verificar se o backend está funcionando:

```text
GET /api/health
```

---

# Requisitos

Antes de começar, certifique-se de possuir:

* **Python 3.10 ou superior**
* Um navegador moderno, como Chrome, Edge ou Firefox
* Uma câmera, caso queira utilizar a captura diretamente pelo navegador
* Uma chave de API do **Google Gemini**
* Conexão com a internet

O projeto foi desenvolvido e testado em Windows, mas o backend pode ser executado em outros sistemas operacionais com Python.

---

# Configuração

## 1. Clone o repositório

Clone o projeto utilizando Git:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd Challenge-Jovi
```

> Substitua `URL_DO_REPOSITORIO` pela URL deste repositório.

---

# 2. Configurar o backend

Entre na pasta `python`:

```bash
cd python
```

## Criar ambiente virtual

Crie um ambiente virtual Python:

### Windows

```powershell
py -m venv .venv
```

Ative o ambiente:

```powershell
.\.venv\Scripts\Activate.ps1
```

Caso o PowerShell bloqueie a execução de scripts, utilize:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Depois:

```powershell
.\.venv\Scripts\Activate.ps1
```

### Linux/macOS

```bash
python3 -m venv .venv
```

Ative o ambiente:

```bash
source .venv/bin/activate
```

---

# 3. Instalar as dependências

Com o ambiente virtual ativado, execute:

```bash
pip install -r requirements.txt
```

Isso instalará as dependências necessárias para executar a API.

---

# 4. Configurar a API do Gemini

O projeto utiliza uma chave de API do Google Gemini para realizar as análises.

Dentro da pasta `python`, crie um arquivo chamado:

```text
.env
```

Adicione:

```env
GEMINI_API_KEY=sua_chave_do_google_gemini
```

Substitua `sua_chave_do_google_gemini` pela sua chave real.

### Importante

Nunca publique sua chave de API no GitHub.

O arquivo `.env` deve estar incluído no `.gitignore`:

```text
.env
```

---

# 5. Iniciar o backend

Ainda dentro da pasta `python`, execute:

```bash
uvicorn api:app --reload --port 8000
```

Se tudo estiver funcionando, a API ficará disponível em:

```text
http://127.0.0.1:8000
```

ou:

```text
http://localhost:8000
```

---

## Testar a API

Abra no navegador:

```text
http://127.0.0.1:8000/api/health
```

A resposta esperada é semelhante a:

```json
{
  "status": "ok",
  "service": "camera-jovi-api"
}
```

Se essa resposta aparecer, o backend está funcionando corretamente.

---

# 6. Iniciar o frontend

Abra **outro terminal** na pasta raiz do projeto.

Entre na pasta do frontend:

```bash
cd cameraapresentation
```

Inicie um servidor HTTP local:

### Windows

```powershell
py -m http.server 5500
```

### Linux/macOS

```bash
python3 -m http.server 5500
```

Depois abra:

```text
http://127.0.0.1:5500
```

ou:

```text
http://localhost:5500
```

---

# 7. Utilizando a aplicação

Com o backend e o frontend funcionando:

1. Abra o endereço do frontend no navegador.
2. Permita o acesso à câmera.
3. Escolha o modo desejado.
4. Capture uma imagem.
5. Aguarde o envio para a API.
6. A API enviará a imagem para o Gemini.
7. O resultado será processado e exibido na interface.

Dependendo do modo escolhido, o sistema poderá gerar:

* Resumo;
* Flashcards;
* Resolução matemática.

Os resultados também podem ser salvos através da opção de salvamento.

---

# Endpoints da API

| Método | Endpoint          | Função                                 |
| ------ | ----------------- | -------------------------------------- |
| `GET`  | `/api/health`     | Verifica se a API está funcionando     |
| `POST` | `/api/resumo`     | Gera um resumo a partir de uma imagem  |
| `POST` | `/api/flashcards` | Gera flashcards a partir de uma imagem |
| `POST` | `/api/math`       | Resolve expressões matemáticas         |
| `POST` | `/api/salvar`     | Salva a última análise em `.txt`       |

Os endpoints de análise recebem a imagem através de:

```text
multipart/form-data
```

utilizando o campo:

```text
image
```

---

# Fluxo da aplicação

O funcionamento geral do Camera Jovi segue o seguinte fluxo:

```text
┌─────────────────────┐
│      Navegador      │
│                     │
│  Câmera do usuário  │
└──────────┬──────────┘
           │
           │ Captura da imagem
           ▼
┌─────────────────────┐
│      Frontend       │
│   HTML/CSS/JS       │
└──────────┬──────────┘
           │
           │ HTTP Request
           ▼
┌─────────────────────┐
│     FastAPI         │
│      Backend        │
└──────────┬──────────┘
           │
           │ Validação
           ▼
┌─────────────────────┐
│     Pillow          │
│ Validação da imagem │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Google Gemini   │
│  Análise da imagem  │
└──────────┬──────────┘
           │
           │ Resultado
           ▼
┌─────────────────────┐
│       FastAPI       │
│ Normalização JSON   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Frontend       │
│ Exibição do resultado│
└──────────┬──────────┘
           │
           │ Opcional
           ▼
┌─────────────────────┐
│   python/salvos/    │
│      .txt            │
└─────────────────────┘
```

---

# Salvamento dos resultados

Quando o usuário escolhe salvar uma análise, a API cria um arquivo `.txt` dentro de:

```text
python/salvos/
```

Os arquivos são organizados de acordo com a matéria selecionada.

Exemplo:

```text
python/
`-- salvos/
    |-- matematica/
    |   |-- analise_01.txt
    |   `-- analise_02.txt
    |
    |-- historia/
    |   `-- analise_01.txt
    |
    `-- fisica/
        `-- analise_01.txt
```

---

# Executando a versão antiga via terminal

O arquivo:

```text
python/script.py
```

é uma versão anterior do projeto que permite executar o fluxo diretamente pelo terminal.

Para utilizá-lo:

```bash
cd python
```

Ative o ambiente virtual e execute:

```bash
python script.py
```

Essa versão permite utilizar uma webcam ou selecionar uma imagem local, dependendo da implementação atual do script.

---

# Problemas comuns

## A câmera não abre

Verifique:

* Se o navegador possui permissão para acessar a câmera;
* Se outro programa está utilizando a câmera;
* Se o frontend está sendo executado através de um servidor HTTP;
* Se você está acessando o frontend por `localhost` ou `127.0.0.1`.

Não abra o arquivo `index.html` diretamente pelo explorador de arquivos.

Utilize:

```text
http://127.0.0.1:5500
```

---

## A API não inicia

Verifique se o ambiente virtual está ativado:

```bash
python --version
```

ou:

```bash
py --version
```

Depois confirme se as dependências foram instaladas:

```bash
pip install -r requirements.txt
```

Também é possível testar diretamente:

```bash
uvicorn api:app --reload --port 8000
```

---

## Erro relacionado à chave do Gemini

Verifique se o arquivo:

```text
python/.env
```

existe e contém:

```env
GEMINI_API_KEY=sua_chave
```

Também confirme se a chave é válida e possui acesso à API utilizada pelo projeto.

---

## O frontend não consegue acessar a API

Verifique se:

### Backend

Está rodando em:

```text
http://127.0.0.1:8000
```

### Frontend

Está rodando em:

```text
http://127.0.0.1:5500
```

Também verifique se a URL utilizada pelo JavaScript para realizar as requisições corresponde à porta em que o backend está executando.

---

# Desenvolvimento

Para modificar o projeto, recomenda-se manter dois terminais abertos:

### Terminal 1 — Backend

```bash
cd python
```

Ative o ambiente virtual e execute:

```bash
uvicorn api:app --reload --port 8000
```

### Terminal 2 — Frontend

```bash
cd cameraapresentation
```

Execute:

```bash
python -m http.server 5500
```

O `--reload` do Uvicorn permite que alterações no código do backend sejam detectadas automaticamente durante o desenvolvimento.

---

# Tecnologias utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript
* Web APIs
* `getUserMedia`
* Fetch API

### Backend

* Python
* FastAPI
* Uvicorn
* Pillow
* python-dotenv
* Google Gemini API

---

# Equipe

* **Vitor de Castro Buzato** — RM 569720
* **Joao Pedro Ferreira Pinheiro** — RM 570569
* **Joao Pedro Gomes de Matos** — RM 569934
* **Davi Pereira** — RM 572337
* **Gabriel Palmieri** — RM 570508

---

# Observações

O Camera Jovi é um projeto desenvolvido para fins acadêmicos e de demonstração.

A aplicação depende de uma chave válida da API do Google Gemini e de conexão com a internet para realizar as análises de imagens.

Não compartilhe sua chave de API publicamente ou a inclua diretamente no código-fonte.
