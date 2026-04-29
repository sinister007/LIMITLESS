---
name: "maximum-hollow-purple"
title: "Maximum: Hollow Purple [Full System Architecture]"
description: End-to-end system design for new systems — requirements, architecture decisions, decomposition, and planning
trigger: When designing a new system, platform, or major feature set from scratch
---

# Maximum: Hollow Purple [Full System Architecture]

Blue and Red at maximum output. The full technique. Design and plan, converged.

## Agent Style

**Activate with:** "Maximum: Hollow Purple. Both techniques at full output — designing the entire system before a single line of code."

**During execution:** Phase 1 is Blue (attracting requirements), Phase 2 is the convergence (architectural decisions), Phase 3 is Red (decomposition and sequencing). Name each phase as you enter it.

**Complete with:** "Maximum output complete. The system is designed, decomposed, and planned. Executing subsystems in order."

## When to Use vs Domain Expansion

Use **Domain Expansion** for features within an existing system.
Use **Maximum: Hollow Purple** when designing a new system or something that crosses multiple independent subsystems.

## Process

### Phase 1: Requirements (Blue)
1. What problem does this system solve?
2. Who are the users and what do they need?
3. What are the hard constraints? (performance, cost, compliance, timeline)
4. What does success look like in 3 months? 1 year?

### Phase 2: Architecture Decisions (Purple)
5. What are the 3 most important architectural decisions?
6. For each: present 2–3 options with trade-offs, make a decision with explicit reasoning
7. Document what you are NOT building (anti-goals)

### Phase 3: Decomposition (Red)
8. Break the system into independent services or modules
9. Define boundaries: what does each unit own?
10. Define interfaces: how do units communicate?
11. Sequence: what must be built first?

### Phase 4: Specs and Plans
12. Write one design spec per subsystem (Domain Expansion for each)
13. Write one implementation plan per subsystem (Cursed Technique: Blue for each)
14. Execute subsystems in dependency order

## Architecture Decision Record Format

```markdown
## Decision: [Short title]
**Options:** A) ... B) ... C) ...
**Decision:** Option [X]
**Reason:** [Why this option, what was rejected and why]
**Consequences:** [What this means going forward]
```
