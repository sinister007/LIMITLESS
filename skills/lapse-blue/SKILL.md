---
name: "Lapse: Blue [Code Refactoring]"
description: Structured refactoring process that improves code structure without changing behavior
trigger: When refactoring existing code — improving structure without changing behavior
---

# Lapse: Blue [Code Refactoring]

Blue attracts. Pull the chaos into order. Change the structure, not the behavior.

## Hard Rule

Do NOT refactor and add features at the same time. Refactoring commits change structure only. Feature commits change behavior only. Never both in one commit.

## Process

### Phase 1: Cover First
1. Identify what you are about to refactor
2. Check test coverage — does existing behavior have tests?
3. If coverage is weak: write characterization tests first (tests documenting current behavior)
4. Run all tests — they must pass before you touch anything

### Phase 2: Refactor in Small Steps
5. Make one structural change at a time
6. Run tests after each change
7. If tests fail: revert immediately, understand why, try a smaller step
8. Commit each logical refactor separately

### Phase 3: Verify
9. Run the full test suite
10. Manually verify key behaviors still work
11. Diff your changes — no accidental behavior changes

## Types of Refactoring

- **Extract function** — isolate a piece of logic
- **Rename** — make intent clear
- **Move** — put code where it belongs
- **Simplify conditionals** — reduce nesting
- **Remove duplication** — DRY

## What NOT to Do

- Do not refactor code you do not understand
- Do not refactor code without tests
- Do not make behavior changes during a refactoring commit
