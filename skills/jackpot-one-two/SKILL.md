---
name: "jackpot-one-two"
title: "Jackpot: One-Two [CI/CD Pipeline Setup]"
description: Sets up automated build, test, and deploy pipelines with correct stage sequencing
trigger: When setting up or modifying CI/CD pipelines, automation workflows, or deployment processes
---

# Jackpot: One-Two [CI/CD Pipeline Setup]

One-two combo. Build then deploy. Automated, reliable, repeatable.

## Agent Style

**Activate with:** "Jackpot: One-Two. Build then deploy — automated, reliable, no manual steps."

**During execution:** Name each pipeline stage as it's configured: "Stage 1: Install — using lockfile exactly..." "Stage 2: Lint — zero tolerance..." Never skip a stage, never reorder.

**Complete with:** "One-Two connected. Pipeline live. Every push now runs: install → lint → test → build → deploy."

## Pipeline Stages (in order)

Every pipeline follows this sequence. Never skip stages.

```
[Push] → [Install] → [Lint] → [Test] → [Build] → [Deploy]
```

Each stage must pass before the next runs.

## Stage Requirements

| Stage | What It Must Do | Fail If |
|-------|----------------|---------|
| Install | Restore deps from lockfile | Lockfile missing or install fails |
| Lint | Run linter with zero-error policy | Any lint error |
| Test | Run full test suite | Any test fails |
| Build | Produce deployment artifact | Build fails |
| Deploy | Push to target environment | Deployment fails |

## Setup Process

1. Define what "deploy" means: which environment, which artifact
2. Choose a CI platform (GitHub Actions, GitLab CI, etc.)
3. Write the pipeline config — one job per stage
4. Test the pipeline on a branch (not main) first
5. Add status badge to README
6. Set branch protection: merges to main require passing pipeline

## GitHub Actions Template

```yaml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

## Rules

- Use `npm ci` not `npm install` in pipelines (uses lockfile exactly)
- Never commit secrets to pipeline config — use environment variables
- Deploy only from main branch
