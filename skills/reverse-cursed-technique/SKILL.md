---
name: "Reverse Cursed Technique [Systematic Debugging]"
description: Root-cause analysis process — understand the failure before modifying any code
trigger: When encountering any bug, test failure, or unexpected behavior
---

# Reverse Cursed Technique [Systematic Debugging]

Invert the curse. Understand the failure before touching the code.

## Hard Rule

Do NOT modify any code until you have identified the root cause. A fix without a root cause is a guess.

## Process

### Phase 1: Understand the Failure
1. Read the full error message — all of it
2. Identify: what was expected vs. what actually happened
3. Find the exact line where the failure occurs
4. Write your hypothesis in one sentence

### Phase 2: Gather Evidence
5. Add targeted logging near the failure point
6. Run the failing case — observe actual values
7. Are your inputs what you think they are?
8. Are your assumptions about the environment correct?

### Phase 3: Isolate
9. Reproduce the bug in the smallest possible case
10. Confirm your reproduction is reliable
11. Test your hypothesis by changing one thing at a time

### Phase 4: Fix
12. Implement the minimal fix for the root cause
13. Run the full test suite — not just the failing test
14. Verify the fix did not introduce new failures

### Phase 5: Prevent Recurrence
15. Write a test that would have caught this bug
16. Commit: fix + test together

## When You Are Stuck

After 3 failed hypotheses:
- Question your fundamental assumptions
- Read the code path from the entry point, not from where you think the bug is
- Ask: "What if I am wrong about X?" for each assumption

## Commit Format

```
fix: [root cause description and fix]
test: add regression test for [bug description]
```
