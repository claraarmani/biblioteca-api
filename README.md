# Projeto Prático Aplicado — API de Loja de Roupas

## Sobre o projeto

Este projeto consiste no desenvolvimento de uma API para uma loja de roupas, utilizando Node.js e Express, com integração ao banco de dados PostgreSQL por meio do Prisma ORM.

A aplicação tem como objetivo organizar o cadastro e o gerenciamento de produtos e categorias, permitindo realizar operações CRUD (Create, Read, Update e Delete).

## Integrantes

- Lívia Montes 
- Clara Armani

## Tecnologias utilizadas

- JavaScript e Node.js
- Express
- Prisma ORM
- PostgreSQL
- Postman
- Git e GitHub

## Estrutura do banco de dados

O catálogo tem duas entidades relacionadas:

- **Categoria:** armazena as categorias disponíveis na loja, como camisetas, calças, vestidos e acessórios.
- **Produto:** armazena as informações dos produtos, como nome, descrição, preço, tamanho, cor, estoque e categoria.

Uma categoria pode ter vários produtos, e cada produto pertence a uma categoria. O banco também armazena usuários da loja, leitores e empréstimos.

## Como executar o projeto

Use Node.js 22.12+ ou 24 e uma instância PostgreSQL. A API fica em `apps/server` e o schema, as migrations e o cliente Prisma ficam em `packages/storage`.

Configure `.env` na raiz com base em `.env.example`. Preencha `DATABASE_URL` com a conexão PostgreSQL e `JWT_SECRET` com um segredo para autenticação.

Em um banco PostgreSQL vazio, execute na raiz:

```bash
npm install
npm run generate
npm run migrate-dev
npm run seed
npm run server-dev
```

Se já houver tabelas no PostgreSQL, confira se o schema existente corresponde à migration inicial antes de registrá-la como aplicada. O arquivo SQLite legado continua em `packages/storage/prisma/legacy.sqlite`. Seus registros não são importados automaticamente para o PostgreSQL.

O comando `npm run server-dev` usa Nodemon para reiniciar a API ao editar o código. Use `npm start` para iniciar diretamente com Node.js.

A API escuta em `http://localhost:3000` por padrão. Execute `npm run client-dev` para rodar o frontend em `http://localhost:3001`. Use `npm run build` para verificar o build de produção.

Cadastre um leitor em `POST /leitores` com `nome`, `email` e `turma` antes de criar um empréstimo em `POST /emprestimos` com `nomeLivro` e `leitorId`. A coleção Postman inclui exemplos.

## Rotas principais da API

| Método | Rota | Funcionalidade |
|---|---|---|
| POST | `/categorias` | Cadastrar categoria |
| GET | `/categorias` | Listar categorias |
| GET | `/categorias/:id` | Buscar categoria por ID |
| PUT | `/categorias/:id` | Atualizar categoria |
| DELETE | `/categorias/:id` | Excluir categoria |
| POST | `/produtos` | Cadastrar produto |
| GET | `/produtos` | Listar produtos |
| GET | `/produtos/:id` | Buscar produto por ID |
| PUT | `/produtos/:id` | Atualizar produto |
| DELETE | `/produtos/:id` | Excluir produto |
| POST | `/leitores` | Cadastrar leitor |
| POST | `/emprestimos` | Criar empréstimo |
| GET | `/emprestimos` | Listar empréstimos |
| GET | `/emprestimos/:id` | Buscar empréstimo por ID |
| PUT | `/emprestimos/:id` | Atualizar empréstimo |
| DELETE | `/emprestimos/:id` | Excluir empréstimo |

## Middlewares

- **validarDados.js:** verifica os dados enviados nas requisições e realiza validações.
- **validarId.js:** verifica se o ID informado na URL é válido.
- **logger.js:** registra as requisições recebidas pela API.

## Testes

As requisições da API são realizadas e testadas utilizando o Postman, incluindo testes de operações CRUD e validações de dados inválidos.

## Repositório

GitHub: https://github.com/claraarmani/biblioteca-api
