# Lista de Compras + Alexa Skill

App de lista de compras com integração à Alexa. Adicione itens pelo app web ou por voz: _"Alexa, adiciona leite à lista de compras"_.

## Stack

- **Backend**: Node.js 20 + Express + serverless-http (AWS Lambda + API Gateway)
- **Frontend**: React + Vite + Tailwind CSS
- **Alexa Skill**: ask-sdk-core (AWS Lambda)
- **Banco de dados**: PostgreSQL 16
- **Infra**: AWS SAM

## Estrutura

```
lista_compras/
├── backend/          # API REST
├── frontend/         # React web app
├── alexa-skill/      # Alexa Skill
├── infrastructure/   # AWS SAM template
└── docker-compose.yml
```

## Desenvolvimento local

### Pré-requisitos

- Node.js 20+
- Docker + Docker Compose
- AWS CLI + SAM CLI (para deploy)
- ASK CLI (para publicar a Alexa Skill)

### 1. Subir o banco de dados

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run migrate   # cria tabelas
npm run dev       # porta 3000
```

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev       # porta 5173
```

### 4. Alexa Skill (local com Ngrok)

```bash
# Exponha o backend publicamente
ngrok http 3000

# Atualize BACKEND_API_URL no alexa-skill/.env
cd alexa-skill/lambda
npm install
```

## Deploy AWS

```bash
cd infrastructure
sam build
sam deploy --guided
```

## Comandos de voz suportados (pt-BR)

| Utterance                              | Ação                    |
|----------------------------------------|-------------------------|
| "adiciona {item} à lista"              | Adiciona item           |
| "coloca {item} na lista"               | Adiciona item           |
| "remove {item} da lista"               | Remove item             |
| "tira {item} da lista"                 | Remove item             |
| "o que está na lista"                  | Lê todos os itens       |
| "quais itens tenho"                    | Lê todos os itens       |
| "marca {item} como comprado"           | Marca item como comprado|
| "limpa a lista"                        | Remove todos os itens   |
