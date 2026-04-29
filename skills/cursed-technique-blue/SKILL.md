---
name: "cursed-technique-blue"
title: "Cursed Technique: Blue [Implementation Planning]"
description: Converts approved design specs into detailed bite-sized implementation plans with full code
trigger: When you have an approved design spec and need an implementation plan
---

# Cursed Technique: Blue [Implementation Planning]

Pull the plan into existence. From approved spec to precise, executable task list.

## Agent Style

**Activate with:** "Cursed Technique: Blue. Pulling the plan into existence. Every task will be exact — no placeholders, no ambiguity."

**During execution:** Frame each task as a convergence point being defined. "The technique attracts Task N into focus..."

**Complete with:** "Blue complete. The plan exists. Invoke Cursed Technique: Red to execute it."

## What a Good Plan Contains

- Exact file paths for every file created or modified
- Complete code for every step that changes code
- Exact commands with expected output
- TDD structure: failing test → verify fail → implement → verify pass → commit
- No placeholders, no TBDs, no "similar to Task N"

## Plan Header (required)

Every plan must start with:

```
# [Feature Name] Implementation Plan

> For agentic workers: Use Ten Shadows [Subagent-Driven Development] or
> Cursed Technique: Red [Plan Execution] to execute this plan.

**Goal:** [one sentence]
**Architecture:** [2–3 sentences]
**Tech Stack:** [key libraries/tools]
```

## File Structure First

Before writing tasks, list every file that will be created or modified and its single responsibility. This is where decomposition gets locked in.

Rules:
- One clear responsibility per file
- Files that change together live together
- Prefer small, focused files
- Follow existing codebase patterns

## Task Format

Each task follows this structure:

```
### Task N: [Name]

**Files:**
- Create: `exact/path/file.js`
- Modify: `exact/path/existing.js:45-67`

- [ ] Step 1: Write the failing test
[test code]

- [ ] Step 2: Run test — verify it fails
Run: `command`
Expected: FAIL with "[message]"

- [ ] Step 3: Write minimal implementation
[implementation code]

- [ ] Step 4: Run test — verify it passes
Run: `command`
Expected: PASS

- [ ] Step 5: Commit
[git commands]
```

## Granularity

Each step = one action (2–5 minutes):
- "Write the failing test" = one step
- "Run it to verify it fails" = separate step
- "Write the implementation" = separate step
- "Commit" = always its own step

## Save Location

`docs/plans/YYYY-MM-DD-<feature-name>.md`

## Self-Review After Writing

1. Every spec requirement has a task
2. No placeholder text anywhere
3. Function names, types, file paths are consistent across all tasks
4. Every code step shows the actual code

Fix issues inline. Then offer execution choice.
