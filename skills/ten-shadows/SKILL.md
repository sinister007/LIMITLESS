---
name: "Ten Shadows [Subagent-Driven Development]"
description: Executes implementation plans by dispatching a fresh subagent per task with review between each
trigger: When executing an implementation plan and subagent dispatch is available
---

# Ten Shadows [Subagent-Driven Development]

Ten shikigami. Ten tasks. Each one focused. Each one independent.

## Process

### Before Dispatching
1. Read the full plan
2. Identify dependencies — some tasks must complete before others
3. Group tasks into waves: no-dependency tasks go first

### Dispatching Each Task

For each task, give the subagent:
- The complete task description (all steps, all code)
- The file paths to create or modify
- The test commands to run
- The commit command

The subagent has no memory of previous subagents — give it everything it needs.

### After Each Task
1. Review the subagent output
2. Verify: all steps completed, tests pass, commit made
3. Check for changes outside the task scope
4. Only proceed when current task is verified complete

### Review Between Tasks

After every task:
- Did the subagent follow the plan?
- Are there new issues introduced?
- Do future tasks need adjusting?

## What NOT to Do

- Do not dispatch all tasks simultaneously if they have dependencies
- Do not skip the post-task review
- Do not let a subagent continue past its assigned task
