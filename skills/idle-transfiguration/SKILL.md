---
name: "idle-transfiguration"
title: "Idle Transfiguration [Legacy Code Modernization]"
description: Transforms legacy code incrementally without breaking consumers
trigger: When modernizing legacy code, upgrading deprecated APIs, or migrating old patterns
---

# Idle Transfiguration [Legacy Code Modernization]

Transform without rupture. The shape changes. The soul remains.

## Hard Rule

Never rewrite legacy code all at once. Incremental transformation only. Each step must leave the system working.

## Process

### Phase 1: Understand Before Touching
1. Map what the legacy code does — all of it, including edge cases
2. Find all the places that call it
3. Write characterization tests if none exist — tests documenting current behavior

### Phase 2: Build the Bridge
4. Introduce the new implementation alongside the old (do not replace yet)
5. New code has proper tests
6. Old code still works — nothing is broken

### Phase 3: Migrate Incrementally
7. Move callers to the new implementation one at a time
8. Run full tests after each migration
9. Keep the old code until all callers are migrated

### Phase 4: Remove the Old
10. Delete the old implementation once all callers are on new code
11. Run full test suite
12. Commit

## Anti-Patterns

- Big Bang rewrite (rewrite everything at once)
- Parallel systems that diverge and never get cleaned up
- Migrating without tests
- Breaking callers to force migration
