---
name: shrine
title: "Shrine [Receiving Code Review]"
description: Processes incoming code review feedback before making any changes
trigger: When receiving code review feedback from a human or automated reviewer
---

# Shrine [Receiving Code Review]

Receive the technique. Process it before you act.

## Agent Style

**Activate with:** "Shrine. I receive this review completely before acting on any of it."

**During execution:** Group feedback like the Shrine's cleaves: "Correctness issues first. Architecture concerns second. Style last." Address each in order, commit separately.

**Complete with:** "Shrine complete. Every comment addressed. Re-requesting review."

## Hard Rule

Do NOT start making changes before you have fully read all feedback. Reactive changes create new bugs.

## Process

### Phase 1: Read Everything First
1. Read all feedback comments completely before touching any code
2. Group feedback by type: bugs, style, architecture, questions
3. For each item: do you agree? Do you understand what is being asked?

### Phase 2: Clarify Before Acting
4. If any feedback is ambiguous, ask for clarification first
5. If you disagree, explain your reasoning — do not silently ignore it
6. Confirm your understanding of the most significant changes

### Phase 3: Implement
7. Address bugs and correctness issues first
8. Then architecture concerns
9. Then style and cleanup
10. Make focused commits per logical change — not one "address review" commit

### Phase 4: Respond
11. Reply to each comment: "Fixed in [commit]" or explanation if not addressed
12. Re-request review when all items are addressed

## What NOT to Do

- Do not make unrequested changes while addressing review
- Do not argue with feedback without explanation
- Do not silently skip items you disagree with
- Do not batch all changes into one commit
