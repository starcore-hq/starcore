# 🌟 Starcore

> A NestJS-powered backend SDK for building production-ready applications on the Stellar blockchain.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NestJS](https://img.shields.io/badge/NestJS-v10-red)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Stellar](https://img.shields.io/badge/Stellar-SDK-black)](https://stellar.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## What is Starcore?

Starcore is an open-source backend SDK built with NestJS and TypeScript that makes it easy to integrate the Stellar blockchain into any backend application. Instead of spending weeks reading Stellar documentation, Starcore gives you production-ready modules for accounts, transactions, Soroban smart contracts, webhooks, and authentication.

---

## Features

- 🔐 **Auth Module** — Stellar wallet-based authentication with JWT session management
- 👤 **Accounts Module** — Create, fund, and manage Stellar accounts via REST endpoints
- 💸 **Transactions Module** — Build, sign, submit, and track XLM transactions
- 📜 **Soroban Module** — Deploy, invoke, and read Soroban smart contracts
- 🔔 **Webhooks Module** — Subscribe to real-time Stellar network events via Horizon SSE
- 🛠️ **CLI Tools** — Scaffold new Starcore projects and generate modules quickly
- 🧪 **Fully tested** — Unit and e2e tests for every module
- 📖 **Well documented** — Every endpoint, service, and config option explained

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 10 |
| Language | TypeScript 5 |
| Blockchain | Stellar SDK + Soroban |
| Auth | JWT + Passport.js |
| Database | PostgreSQL + TypeORM |
| Testing | Jest + Supertest |
| Docs | Swagger / OpenAPI |

---

## Project Structure

```
starcore/
├── src/
│   ├── auth/
│   ├── accounts/
│   ├── transactions/
│   ├── soroban/
│   ├── webhooks/
│   ├── shared/
│   └── main.ts
├── test/
├── docs/
├── CONTRIBUTING.md
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL
- A Stellar testnet account ([create one here](https://laboratory.stellar.org/))

### Installation

```bash
git clone https://github.com/starcore-hq/starcore.git
cd starcore
npm install
cp .env.example .env
```

### Environment Variables

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/starcore
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_SECRET_KEY=your_stellar_secret_key
```

### Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### Running Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## API Overview

Visit `http://localhost:3000/api` for full Swagger documentation.

### Auth
```
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

### Accounts
```
POST   /accounts
GET    /accounts/:id
POST   /accounts/:id/fund
DELETE /accounts/:id
```

### Transactions
```
POST /transactions/build
POST /transactions/sign
POST /transactions/submit
GET  /transactions/:hash
```

### Soroban
```
POST /soroban/deploy
POST /soroban/invoke
GET  /soroban/:contractId
```

### Webhooks
```
POST   /webhooks
GET    /webhooks
DELETE /webhooks/:id
```

---

## Roadmap

### v0.1.0 — Foundation
- [x] Project setup and NestJS boilerplate
- [ ] Auth module with Stellar wallet login
- [ ] Accounts module with CRUD endpoints

### v0.2.0 — Transactions
- [ ] Transaction builder service
- [ ] Sign and submit endpoints
- [ ] Transaction status tracking

### v0.3.0 — Soroban
- [ ] Contract deployment service
- [ ] Contract invocation layer
- [ ] Contract state reader

### v0.4.0 — Webhooks
- [ ] Horizon SSE listener
- [ ] Webhook subscription CRUD
- [ ] HMAC payload signing
- [ ] Retry logic with exponential backoff

### v0.5.0 — Developer Experience
- [ ] CLI scaffolding tool
- [ ] Full Swagger docs
- [ ] Docker support

---

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request.

Look for issues tagged [`good first issue`](https://github.com/starcore-hq/starcore/issues?q=label%3A%22good+first+issue%22) to get started.

### Quick steps
1. Fork the repository
2. Create a branch: `git checkout -b feat/your-feature-name`
3. Make your changes and write tests
4. Submit a pull request referencing the issue: `Closes #42`

### Branch naming
```
feat/short-description
fix/short-description
test/short-description
docs/short-description
```

### Commit format
```
feat(webhooks): add HMAC signature verification
fix(transactions): handle 5xx errors from Horizon
test(accounts): add unit tests for account creation
docs(auth): document JWT refresh flow
```

### Issue labels
| Label | Meaning |
|---|---|
| `good first issue` | Great for first-time contributors |
| `feature` | New functionality to be added |
| `bug` | Something is broken |
| `test` | Test coverage needed |
| `documentation` | Docs need to be written or updated |
| `security` | Security-related task |
| `help wanted` | Extra attention needed |

---

## Community

- 💬 [GitHub Discussions](https://github.com/starcore-hq/starcore/discussions)
- 🐛 [Issues](https://github.com/starcore-hq/starcore/issues)
- 🐦 [Twitter](https://twitter.com/Engrukayat)

---

## License

MIT © [starcore-hq](https://github.com/starcore-hq)

---

<p align="center">Built with ❤️ for the Stellar ecosystem</p>
