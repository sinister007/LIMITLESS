---
name: "Malevolent Shrine [Pre-Completion Verification]"
description: Verification gate — run before claiming any work is done, fixed, or passing
trigger: Before saying "done", "fixed", "complete", or "tests pass"
---

# Malevolent Shrine [Pre-Completion Verification]

The shrine expands. Everything inside gets cut. Verify before you claim victory.

## Hard Rule

Do NOT claim work is complete without running through this checklist. "I believe it works" is not evidence.

## Verification Checklist

### Functional Verification
- [ ] Run the full test suite — not just the new tests
- [ ] Run the specific scenario that was originally broken (if a bug fix)
- [ ] Test edge cases manually if automated tests do not cover them

### Code Quality
- [ ] No dead code, debug statements, or commented-out blocks left in
- [ ] No TODOs introduced that were not there before
- [ ] Code follows patterns in the surrounding codebase

### Documentation
- [ ] Any public APIs or config options are documented
- [ ] README updated if behavior changed

### Integration
- [ ] New code works with existing code, not just in isolation
- [ ] No regressions in adjacent functionality

## After Verification

If all items pass: claim completion with evidence.
"Done. Tests pass (`npm test` — 42 passed, 0 failed). Manually verified [scenario]."

If any items fail: fix them first.
