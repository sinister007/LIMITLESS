---
name: "black-flash"
title: "Black Flash [Test-Driven Development]"
description: Enforces RED-GREEN-REFACTOR cycle — write the failing test before any implementation code
trigger: When implementing any feature, fix, or change to existing behavior
---

# Black Flash [Test-Driven Development]

Land the technique precisely. Write the test first. Every time. No exceptions.

## The Cycle

**RED → GREEN → REFACTOR**

1. **RED:** Write a failing test that describes the desired behavior
2. **Verify RED:** Run the test — it MUST fail. If it passes, the test is wrong.
3. **GREEN:** Write the minimal code to make the test pass. Nothing more.
4. **Verify GREEN:** Run the test — it MUST pass.
5. **REFACTOR:** Clean up without changing behavior. Re-run tests after.
6. **Commit:** One focused commit per RED-GREEN-REFACTOR cycle.

## What Makes a Good Test

- Tests one specific behavior
- Has a clear, descriptive name: `test_returns_empty_list_when_no_results`
- Follows Arrange-Act-Assert structure
- Tests behavior, not implementation details
- Fast and deterministic

## Hard Rules

- Never write implementation code before a failing test exists
- Never move to GREEN with a test that wasn't RED first
- Never refactor with failing tests

## Common Traps

- "This is too simple to test" → Write the test anyway
- "I'll add tests later" → There is no later
- "The test is obvious" → Write it — it documents behavior

## Commit Format

```
test: add test for [behavior]
feat: implement [behavior] to make test pass
refactor: clean up [component]
```
