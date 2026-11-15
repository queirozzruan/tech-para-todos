# TechParaTodos API

API RESTful para organizar oficinas gratuitas de tecnologia destinadas à comunidade.

O sistema permitirá cadastrar oficinas e participantes, gerenciar inscrições, controlar vagas e lista de espera e registrar presença. O projeto será desenvolvido para o trabalho final de Análise e Projeto de Sistemas II e para uma Atividade Curricular de Extensão.

## Status

Estrutura inicial em desenvolvimento.

## Stack planejada

- JavaScript e Node.js 18+
- Express.js
- Prisma ORM
- SQLite
- Zod
- Jest e Supertest
- Swagger UI Express e swagger-autogen
- ESLint e Prettier

## Documentação

- [Software Design Document](docs/SDD.md)

## Escopo inicial

- CRUD de oficinas
- Cadastro de participantes
- Inscrições e controle de capacidade
- Lista de espera com promoção automática
- Controle do ciclo de vida das oficinas
- Registro de presença
- Testes automatizados e documentação Swagger

## Desenvolvimento

Requisitos: Node.js 18 ou superior.

```bash
npm install
cp .env.example .env
npm run dev
```

A API ficará disponível em `http://localhost:3000`. Para verificar a execução:

```text
GET http://localhost:3000/api/v1/health
```

### Testes

```bash
npm test
npm run test:coverage
```

### Qualidade de código

```bash
npm run lint
npm run format:check
```

