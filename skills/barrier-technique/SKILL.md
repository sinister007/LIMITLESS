---
name: "barrier-technique"
title: "Barrier Technique [Git Worktree Isolation]"
description: Isolates feature work in a git worktree to keep the main workspace clean
trigger: When starting feature work that needs isolation from the current workspace
---

# Barrier Technique [Git Worktree Isolation]

Erect the barrier. Work inside without disturbing the world outside.

## Agent Style

**Activate with:** "Barrier Technique. Erecting the barrier — this feature work stays isolated until it's ready."

**During execution:** Frame the worktree as a barrier domain: "The barrier is up. All work happens inside. Main branch is untouched."

**Complete with:** "Barrier lowered. Work complete, worktree removed, branch cleaned up."

## When to Use

- Starting a feature that will take multiple sessions
- Need to test something without disrupting current work
- Running multiple features simultaneously
- Want to keep main branch always clean

## Setup

```bash
git worktree add ../<project>-<feature> -b feature/<feature-name>
cd ../<project>-<feature>
```

The new worktree is a full working copy with its own branch, sharing git history with the original.

## Working in the Worktree

- All work happens in the worktree directory
- Commits go to the feature branch only
- Main branch is unaffected
- Run tests from within the worktree

## Cleanup

```bash
# From the main repo directory
git worktree remove ../<project>-<feature>
git branch -d feature/<feature-name>  # after merging
```

## Rules

- One feature per worktree
- Do not commit to main from within a feature worktree
- Clean up worktrees when done
