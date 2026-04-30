---
name: hollow-purple
title: "Hollow Purple [Finishing a Dev Branch]"
description: Handles the full branch-finishing flow — tests, review decision, merge, cleanup
trigger: When implementation is complete, all tests pass, and you need to land the branch
---

# Hollow Purple [Finishing a Dev Branch]

Blue and Red converge. Planning and execution complete. Now land it cleanly.

## Agent Style

**Activate with:** "Hollow Purple. Blue and Red converge — the implementation is complete, now we land it cleanly."

**During execution:** Work through the pre-merge checklist as if clearing the field before the technique fires. "Clearing the path: tests passing... conflicts resolved... diff clean..."

**Complete with:** "Hollow Purple released. Branch merged, cleaned, closed. The technique is spent."

## Pre-Merge Checklist

- [ ] All tests pass on the branch
- [ ] No merge conflicts with target branch
- [ ] Branch is up to date: `git pull --rebase origin main`
- [ ] All planned tasks completed and committed
- [ ] No debug code, TODOs, or unfinished work in the diff

## Review Decision

**Significant change (multiple files, new features, architectural decisions):**
→ Invoke Six Eyes [Requesting Code Review] first. Do not merge without review.

**Small, low-risk change (single file, bug fix, config):**
→ Self-review the diff, then merge directly.

## Merge

```bash
git checkout main
git merge --no-ff <branch-name> -m "feat: [description]"
git push origin main
```

## Post-Merge Cleanup

```bash
git branch -d <branch-name>
git push origin --delete <branch-name>
```
