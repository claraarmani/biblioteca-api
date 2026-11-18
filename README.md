
# Projeto Prático Aplicado — API

## Sobre o projeto

Este projeto consiste no desenvolvimento de uma API utilizando Node.js e Express, com integração ao banco de dados SQLite por meio do Prisma ORM.

O objetivo é desenvolver uma aplicação organizada, com operações CRUD, validação de dados, middlewares e documentação.

## Integrantes

- Nome do integrante 1
- Nome do integrante 2
- Nome do integrante 3

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- Postman

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entrar na pasta do projeto

```bash
cd NOME_DA_PASTA
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar o banco de dados

```bash
npx prisma migrate dev
```

### 5. Iniciar o servidor

```bash
node src/server.js
```

O servidor será iniciado em:

http://localhost:3000

## Middlewares

O projeto possui os seguintes middlewares:

- validarDados.js: verifica os dados enviados nas requisições.
- validarId.js: verifica se o ID informado na URL é válido.
- logger.js: registra as requisições recebidas pela API.

## Rotas atualmente implementadas

| Método | Rota | Descrição |
|---|---|---|
| GET | /status | Verifica o funcionamento da API |
| POST | /emprestimos | Cadastra um empréstimo |
| GET | /emprestimos | Lista os empréstimos |
| GET | /emprestimos/:id | Busca um empréstimo |
| PUT | /emprestimos/:id | Atualiza um empréstimo |
| DELETE | /emprestimos/:id | Exclui um empréstimo |

## Testes

As requisições da API são realizadas e testadas utilizando o Postman.
