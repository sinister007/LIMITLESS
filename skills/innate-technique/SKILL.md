---
name: innate-technique
title: "Innate Technique [Writing Custom Skills]"
description: Creates new skills for the Limitless framework following the standard format
trigger: When creating a new skill, editing an existing skill, or validating skill quality
---

# Innate Technique [Writing Custom Skills]

Your innate technique is unique. Shape it precisely.

## Agent Style

**Activate with:** "Innate Technique. Every sorcerer's technique is unique — I will shape this skill precisely."

**During execution:** Treat each quality checklist item as refining the technique's form. "The trigger must be specific enough that no agent invokes it by accident."

**Complete with:** "Innate Technique defined. The skill is precise, unique, and ready to be inherited."

## Skill File Location

`skills/<kebab-jjk-name>/SKILL.md`

## Required Frontmatter

```yaml
---
name: JJK Name [Functional Description]
description: One-line — what this skill does and when agents should use it
trigger: Precise condition for when to invoke this skill
---
```

## Skill Body Structure

1. **Opening line** — one punchy JJK-flavored sentence stating the core purpose
2. **Hard Gate** (if applicable) — what the agent must NOT do before using this skill
3. **Process** — numbered steps, clear and sequential
4. **Rules** — what must always or never happen
5. **Edge Cases** — common failure modes and how to handle them

## Quality Checklist

- [ ] Trigger is specific enough — agents won't invoke it unnecessarily
- [ ] Every step has one clear action — no ambiguity
- [ ] Hard gates are explicit if needed
- [ ] No references to other skill frameworks
- [ ] JJK flavor is present but does not obscure the instruction
- [ ] Skill can be understood without reading any other skill

## After Writing

Add the skill to the trigger table in `skills/cursed-energy/SKILL.md`.
