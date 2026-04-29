---
name: "prison-realm"
title: "Prison Realm [Dependency Management]"
description: Audits, evaluates, and manages project dependencies safely
trigger: When adding, removing, auditing, or troubleshooting project dependencies
---

# Prison Realm [Dependency Management]

Seal the soul. Know what enters your codebase.

## Before Adding a Dependency

Ask:
1. Is this actually needed, or can it be done in 20 lines of code?
2. Is this package actively maintained? (last commit, open issues, download count)
3. Is the license compatible with this project?
4. What does it add to bundle size?
5. Does it have known vulnerabilities? (`npm audit`)

Only add it if all answers are acceptable.

## Adding a Dependency

```bash
npm info <package> dependencies
npm install <package>@<version>
npm audit
```

## Auditing Existing Dependencies

```bash
npm audit              # vulnerabilities
npm outdated           # outdated packages
npx depcheck           # unused dependencies
```

## Removing a Dependency

1. Search codebase for all imports of the package
2. Verify nothing uses it
3. `npm uninstall <package>`
4. Run tests — verify nothing broke
5. Commit

## Vulnerability Response

| Severity | Response |
|----------|----------|
| Critical | Fix immediately before any other work |
| High | Fix within current sprint |
| Moderate | Track and fix in next release |
| Low | Track, fix opportunistically |
