# Projeto Prático Aplicado — API de Loja de Roupas

## Sobre o projeto

Este projeto consiste no desenvolvimento de uma API para uma loja de roupas, utilizando Node.js e Express, com integração ao banco de dados SQLite por meio do Prisma ORM.

A aplicação tem como objetivo organizar o cadastro e o gerenciamento de produtos e categorias, permitindo realizar operações CRUD (Create, Read, Update e Delete).

## Integrantes

- Lívia Montes 
- Clara Armani

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- Postman
- Git e GitHub

## Estrutura do banco de dados

O banco de dados possui duas entidades relacionadas:

- **Categoria:** armazena as categorias disponíveis na loja, como camisetas, calças, vestidos e acessórios.
- **Produto:** armazena as informações dos produtos, como nome, descrição, preço, tamanho, cor, estoque e categoria.

O relacionamento é de um para muitos (1:N), pois uma categoria pode possuir vários produtos, enquanto cada produto pertence a uma categoria.

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/claraarmani/biblioteca-api.git
```

### 2. Entrar na pasta do projeto

```bash
cd biblioteca-api
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

O servidor estará disponível em:

`http://localhost:3000`

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

## Middlewares

- **validarDados.js:** verifica os dados enviados nas requisições e realiza validações.
- **validarId.js:** verifica se o ID informado na URL é válido.
- **logger.js:** registra as requisições recebidas pela API.

## Testes

As requisições da API são realizadas e testadas utilizando o Postman, incluindo testes de operações CRUD e validações de dados inválidos.

## Repositório

GitHub: https://github.com/claraarmani/biblioteca-api
