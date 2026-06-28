# Contributing to Starcore

Thank you for your interest in contributing to Starcore! This guide will help you get started.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Picking an Issue](#picking-an-issue)
- [Development Setup](#development-setup)
- [Branch Naming](#branch-naming)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Issue Labels](#issue-labels)

---

## Code of Conduct

Be respectful, inclusive, and constructive. We are here to build something useful together.

---

## How to Contribute

There are many ways to contribute:

- Fix a bug
- Implement a new feature
- Write or improve tests
- Improve documentation
- Review pull requests

All contributions are valued equally.

---

## Picking an Issue

1. Browse the [open issues](https://github.com/starcore-hq/starcore/issues)
2. Look for issues tagged `good first issue` if you are new
3. Comment on the issue to let others know you are working on it
4. Wait for a maintainer to assign it to you before starting

**Please do not submit a PR for an issue that is already assigned to someone else.**

---

## Development Setup

### Prerequisites

- Node.js v18+
- PostgreSQL
- Git

### Steps

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/starcore.git
cd starcore

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Fill in your .env values (see README for details)

# Start in development mode
npm run start:dev
```

---

## Branch Naming

Use this format for your branch names:

```
feat/short-description       # New feature
fix/short-description        # Bug fix
test/short-description       # Adding tests
docs/short-description       # Documentation only
refactor/short-description   # Code refactor
```

Examples:
- `feat/webhook-hmac-signing`
- `fix/duplicate-horizon-events`
- `test/webhook-delivery-service`
- `docs/soroban-module-readme`

---

## Commit Messages

Follow this format:

```
type(scope): short description

Examples:
feat(webhooks): add HMAC signature verification
fix(transactions): handle 5xx errors from Horizon
test(accounts): add unit tests for account creation
docs(auth): document JWT refresh flow
```

Types: `feat`, `fix`, `test`, `docs`, `refactor`, `chore`

---

## Pull Request Process

1. Make sure your branch is up to date with `main`
2. Run the full test suite: `npm run test`
3. Run linting: `npm run lint`
4. Fill in the PR template completely
5. Reference the issue number in your PR description: `Closes #42`
6. Wait for a review — we aim to respond within 48 hours

### PR Title Format

```
feat(webhooks): implement HMAC signature verification (#42)
```

---

## Issue Labels

| Label | Meaning |
|---|---|
| `good first issue` | Great for first-time contributors |
| `feature` | New functionality to be added |
| `bug` | Something is broken |
| `test` | Test coverage needed |
| `documentation` | Docs need to be written or updated |
| `security` | Security-related task |
| `help wanted` | Extra attention needed |
| `in progress` | Someone is actively working on this |

---

## Questions?

Open a [GitHub Discussion](https://github.com/starcore-hq/starcore/discussions) and we will help you out.

---

Thank you for contributing to Starcore 
