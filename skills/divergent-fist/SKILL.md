---
name: "Divergent Fist [Performance Optimization]"
description: Identifies and eliminates performance bottlenecks through measurement-first approach
trigger: When performance is a concern — slow pages, slow queries, high CPU or memory usage
---

# Divergent Fist [Performance Optimization]

The second hit lands harder. Measure first. Then strike exactly.

## Hard Rule

Do NOT optimize without measurement. Guessing where the bottleneck is wastes time and often makes things worse.

## Process

### Phase 1: Establish Baseline
1. Define what "slow" means: what metric, what threshold?
2. Measure the current state with real data
3. Identify the top 3 slowest operations

### Phase 2: Profile
4. Add timing instrumentation around suspected bottlenecks
5. Run under realistic load
6. Find the single biggest bottleneck — it is almost always one thing

### Phase 3: Optimize the Bottleneck
7. Fix only the identified bottleneck — nothing else
8. Re-measure after the fix
9. Did it improve? By how much?

### Phase 4: Iterate or Stop
10. If the goal is met: stop. Over-optimization is waste.
11. If not: find the new bottleneck and repeat from Phase 2

## Common Bottleneck Categories

- **N+1 queries** — fetching in a loop; fix with batch loading
- **Missing indexes** — add targeted database indexes
- **Blocking I/O** — make async
- **Repeated computation** — cache results
- **Large payloads** — paginate, compress, or filter at source

## Commit Format

```
perf: reduce [operation] from Xms to Yms by [technique]
```
