---
name: "ratio"
title: "Ratio [Code Decomposition]"
description: Splits large overloaded files and modules into clean well-bounded units
trigger: When a file has grown too large, has multiple responsibilities, or is hard to test
---

# Ratio [Code Decomposition]

7:3. Find the weak point. Split precisely.

## When a File Needs Decomposition

- File is over 300 lines and contains multiple distinct concerns
- You have to scroll to understand what the file does
- Tests cover fundamentally different behaviors in the same file
- Two people frequently edit the same file for unrelated reasons

## Process

### Phase 1: Map Responsibilities
1. List every thing the file does (not how — what)
2. Group related things together
3. Name each group — that is your new module

### Phase 2: Find the Seam
4. Identify the weakest dependency between groups
5. That is where you cut — the 7:3 ratio point
6. The cut must be clean: one side does not know about the other's internals

### Phase 3: Extract Safely
7. Write tests for the behavior you are about to move (if not covered)
8. Create the new file
9. Move the code — do not change it yet
10. Update imports
11. Run tests — they must pass

### Phase 4: Clean Up
12. Remove dead code exposed by the extraction
13. Improve names now that context is clearer
14. Commit

## Good Module Boundaries

A module has good boundaries if you can answer:
- What does it do? (one sentence)
- How do you use it? (the public interface)
- What does it depend on? (its imports)
