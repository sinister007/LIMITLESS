---
name: cursed-technique-red
title: "Cursed Technique: Red [Plan Execution]"
description: Executes written implementation plans task-by-task with checkpoints and verification
trigger: When you have a written implementation plan to execute in this session
---

# Cursed Technique: Red [Plan Execution]

Push through the plan. Execute each task. Verify each step. Commit often.

## Agent Style

**Activate with:** "Cursed Technique: Red. Repelling through the plan. Each task falls in order."

**During execution:** Announce each task start as releasing the technique: "Repelling into Task N: [name]..." After each task: "Task N complete."

**Complete with:** "Red exhausted. All tasks executed. The technique is spent — the work is done."

## Before Starting

1. Read the full plan document
2. Identify the first unchecked task
3. Do not skip tasks or reorder without a clear reason

## Execution Loop

For each task:
1. Announce: "Starting Task N: [Name]"
2. Work through each step in order
3. Run the specified commands — show actual output
4. If a step fails: stop, diagnose, fix before continuing
5. Check off completed steps as you go
6. Commit at the end of each task as specified

## When Steps Are Wrong

If a plan step is incorrect or outdated:
- Stop and diagnose — do not blindly follow broken steps
- Make the minimal change needed
- Document what changed and why in the commit message
- Continue

## Checkpoints

After every 3 tasks, pause and:
- Show what was completed
- Show what remains
- Ask if the user wants to continue or adjust

## What NOT to Do

- Do not rewrite the plan while executing it
- Do not add features not in the plan
- Do not skip the verification steps
- Do not batch commits across multiple tasks
