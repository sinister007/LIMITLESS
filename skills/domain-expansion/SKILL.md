---
name: "Domain Expansion [Creative Brainstorming]"
description: Turns ideas into fully-formed designs through collaborative dialogue before any code is written
trigger: When starting any new feature, project, component, or creative work
---

# Domain Expansion [Creative Brainstorming]

Expand the domain. Turn a vague idea into a precise, approved design before touching any code.

## Hard Gate

Do NOT write code, scaffold projects, or take any implementation action until you have presented a design and the user has explicitly approved it.

## Process

1. **Explore project context** — read files, docs, recent commits before asking anything
2. **Ask clarifying questions** — one at a time, multiple choice when possible
3. **Propose 2–3 approaches** — with trade-offs and your recommendation
4. **Present design in sections** — get approval after each section
5. **Write design doc** — save to `docs/specs/YYYY-MM-DD-<topic>-design.md`
6. **Spec self-review** — scan for TBDs, contradictions, ambiguity, scope issues
7. **Ask user to review** — wait for approval before proceeding
8. **Invoke Cursed Technique: Blue** — to create the implementation plan

## Clarifying Questions

- One question per message — never two at once
- Multiple choice preferred over open-ended
- Focus on: purpose, constraints, success criteria, scale
- Flag large scope early — if the idea spans independent subsystems, decompose first

## Proposing Approaches

Present 2–3 options with trade-offs. Lead with your recommendation. Explain why.

## Design Sections

Present the design in sections. For each:
- Write it clearly
- Ask "Does this look right?"
- Revise before moving on

Cover: architecture, components, data flow, error handling, testing approach.

## Spec Self-Review Checklist

1. Any TBD, TODO, or vague requirements? Fix them.
2. Any sections that contradict each other? Resolve them.
3. Is scope focused enough for one plan? If not, decompose.
4. Can any requirement be interpreted two ways? Pick one.

## Save Location

`docs/specs/YYYY-MM-DD-<topic>-design.md`

## After Approval

Invoke **Cursed Technique: Blue [Implementation Planning]** — not any other skill.
