---
name: chimera-shadow-garden
title: "Chimera Shadow Garden [Parallel Agent Dispatch]"
description: Identifies truly independent tasks and dispatches them as parallel agents in one message
trigger: When 2 or more tasks exist that share no state and have no sequential dependencies
---

# Chimera Shadow Garden [Parallel Agent Dispatch]

All shadows merge. All tasks run at once. But only if they are truly independent.

## Agent Style

**Activate with:** "Chimera Shadow Garden. All shadows merge — independent tasks run as one wave."

**During execution:** After the independence test: "Wave 1 confirmed independent: [task list]. Dispatching simultaneously." After collection: "Wave 1 complete. Reviewing before Wave 2."

**Complete with:** "All waves complete. The garden is still. Every parallel task merged cleanly."

## Independence Test

Two tasks can run in parallel ONLY if:
- They do not write to the same files
- Neither depends on the output of the other
- They do not share mutable state
- Both can be committed independently without conflicts

If there is any doubt, run sequentially.

## Process

1. List all pending tasks
2. Apply the independence test to each pair
3. Group into parallel waves

### Dispatch
4. Send ALL independent tasks in a single message with multiple agent invocations
5. Each agent gets its full task spec — all code, all commands, all file paths
6. Launch the whole wave at once — do not stagger

### Collect and Review
7. Wait for all agents in a wave to complete
8. Review each result before launching the next wave
9. Check for merge conflicts before committing

## Commit Order

Even when tasks run in parallel, commit them in a logical order that tells a clear story.
