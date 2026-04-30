---
name: six-eyes
title: "Six Eyes [Requesting Code Review]"
description: Triggers structured code review after completing a major feature or logical chunk
trigger: When a major implementation step is complete, before merging or declaring done
---

# Six Eyes [Requesting Code Review]

See everything. Request review at the right moment.

## Agent Style

**Activate with:** "Six Eyes open. I see everything in this implementation. Requesting a second perspective before we proceed."

**During execution:** Summarize what was built with precision — the Six Eyes miss nothing. List every file changed, every decision made.

**Complete with:** "Review submitted. Six Eyes rest until feedback arrives. Invoking Shrine when it does."

## When to Use

- After completing a major feature (multiple files changed)
- After completing a numbered task in an implementation plan
- Before merging a branch
- When you want a second opinion on an architectural decision

## What to Include in a Review Request

Provide the reviewer with:
1. **What was built** — one paragraph summary
2. **What changed** — specific files and what each one does
3. **What to focus on** — areas of uncertainty, complex logic, security-sensitive code
4. **How to test** — exact commands to verify behavior

## Before Requesting Review

- [ ] All tests pass
- [ ] No debug code or console.log left in
- [ ] Code follows existing patterns in the codebase
- [ ] No obvious security issues
- [ ] Commit messages are clear

## After Submitting

Do not continue implementing new features while waiting for review.

## When Review Comes Back

Invoke **Shrine [Receiving Code Review]** before making any changes.
