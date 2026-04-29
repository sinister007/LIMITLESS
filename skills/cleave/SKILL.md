---
name: "cleave"
title: "Cleave [Managing Breaking Changes]"
description: Handles breaking changes safely with versioning, deprecation warnings, and migration paths
trigger: When making a change that breaks existing consumers, APIs, or published interfaces
---

# Cleave [Managing Breaking Changes]

Cut cleanly. A breaking change handled well is better than one avoided forever.

## What Counts as Breaking

- Removes a function, endpoint, or config option
- Changes the signature of a public function
- Changes the format of a data structure consumers depend on
- Changes default behavior of something previously defined

## Process

### Phase 1: Is It Worth It?
1. How many consumers are affected?
2. Is there a non-breaking alternative that achieves the same goal?
3. If yes: do that instead.

### Phase 2: Version the Break
4. Bump the major version (semver: breaking = major bump)
5. Add a changelog entry describing what broke and why

### Phase 3: Migration Path
6. Write migration documentation: what changed, how to update
7. If possible: provide a codemod or migration script
8. Keep the old behavior available for at least one version under a deprecation warning

### Phase 4: Deprecate Before Removing
9. Mark old behavior as deprecated in the current version
10. Log a deprecation warning when it is used
11. Remove in the next major version

## Deprecation Warning Format

```javascript
console.warn(
  '[limitless] DEPRECATED: `oldFunction()` will be removed in v3.0.0. ' +
  'Use `newFunction()` instead.'
);
```

## Changelog Entry Format

```markdown
## [2.0.0] - YYYY-MM-DD
### Breaking Changes
- `oldFunction()` removed. Use `newFunction()` instead.
```
