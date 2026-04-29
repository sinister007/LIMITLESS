# Limitless — Design Spec
**Date:** 2026-04-29  
**Status:** Approved

---

## Overview

`limitless` is a JJK (Jujutsu Kaisen) themed agentic skills framework for coding agents. It provides composable skills — named after techniques from the anime — that guide coding agents through structured development workflows. Skills are installed into any supported coding agent via an interactive `npx limitless` CLI.

This is a standalone framework. No external dependencies on other skill frameworks.

---

## Skill System

All skills use the format: **JJK Technique Name [Functional Description]**

### Core Skills (14)

| Skill Name | Function |
|---|---|
| Cursed Energy [How to Use Limitless] | Entry point — establishes how to find and invoke other skills |
| Domain Expansion [Creative Brainstorming] | Turns ideas into fully-formed designs through collaborative dialogue |
| Cursed Technique: Blue [Implementation Planning] | Converts approved designs into step-by-step implementation plans |
| Cursed Technique: Red [Plan Execution] | Executes written implementation plans via structured subagents |
| Black Flash [Test-Driven Development] | RED-GREEN-REFACTOR cycle enforcement before writing implementation code |
| Reverse Cursed Technique [Systematic Debugging] | Root-cause analysis before attempting any fix |
| Six Eyes [Requesting Code Review] | Triggers structured code review after completing a major feature |
| Shrine [Receiving Code Review] | Processes incoming code review feedback before making changes |
| Malevolent Shrine [Pre-Completion Verification] | Verification gate before claiming work is done |
| Ten Shadows [Subagent-Driven Development] | Executes plans by dispatching multiple independent subagents |
| Chimera Shadow Garden [Parallel Agent Dispatch] | Identifies and parallelizes independent tasks across agents |
| Hollow Purple [Finishing a Dev Branch] | Handles merge/PR/cleanup after implementation is complete |
| Barrier Technique [Git Worktree Isolation] | Isolates feature work in a git worktree |
| Innate Technique [Writing Custom Skills] | Creates new skills following the limitless skill format |

### Extended Skills (10 new)

| Skill Name | Function |
|---|---|
| Lapse: Blue [Code Refactoring] | Structured cleanup of existing code — attract order, remove chaos |
| Maximum: Hollow Purple [Full System Architecture] | End-to-end system design combining planning and execution in one pass |
| Stacked Blue [Writing Documentation] | Layered, structured technical writing for any codebase |
| Ratio [Code Decomposition] | Splits large files/modules into clean, well-bounded units |
| Prison Realm [Dependency Management] | Audits, isolates, and manages project dependencies |
| Idle Transfiguration [Legacy Code Modernization] | Transforms legacy code incrementally without breaking consumers |
| De-Merger [API Design & Separation] | Designs clean API boundaries and separation of concerns |
| Divergent Fist [Performance Optimization] | Identifies and eliminates performance bottlenecks |
| Jackpot: One-Two [CI/CD Pipeline Setup] | Sets up automated build, test, and deploy pipelines |
| Cleave [Managing Breaking Changes] | Handles breaking changes safely with migration paths |

### Skill File Format

Each skill lives at `skills/<kebab-jjk-name>/SKILL.md` with frontmatter:

```markdown
---
name: "<JJK Name> [Functional Description]"
description: One-line description used by agents to decide relevance
trigger: When this skill should be invoked
---
```

---

## Terminal Themes

5 selectable themes applied to all CLI output, skill invocation messages, spinners, and headers.

| Theme | Primary Color | Accent | Character |
|---|---|---|---|
| **Infinity** (default) | Deep purple `#7C3AED` | White | Gojo Satoru |
| **Malevolent Shrine** | Crimson `#DC2626` | Black + Gold | Ryomen Sukuna |
| **Ten Shadows** | Dark teal `#0F766E` | Silver | Fushiguro Megumi |
| **Ratio** | Amber `#D97706` | Charcoal | Nanami Kento |
| **Divergent Fist** | Orange `#EA580C` | Navy | Itadori Yuji |

Theme affects:
- Skill names in terminal output (colored)
- Spinner text (e.g. "Channeling cursed energy...", "Expanding domain...", "Activating Six Eyes...")
- Section headers and dividers
- Success messages ("Technique activated.")
- Error messages ("Cursed technique failed.")
- ASCII art header shown on `npx limitless`

Theme is stored in `~/.limitless/config.json` and persists across sessions.

---

## CLI: `npx limitless`

### Commands

```
npx limitless             # Interactive setup wizard (first run)
npx limitless install     # Re-run agent installer
npx limitless sync        # Pull upstream skill improvements
npx limitless theme       # Change terminal theme interactively
npx limitless list        # List all skills with JJK names and descriptions
npx limitless info <name> # Show full details for a skill
```

### Install Wizard Flow

1. Display JJK ASCII art header in current theme
2. Prompt: select terminal theme (radio list with color preview)
3. Prompt: select agents to install into (multi-select checkboxes):
   - Claude Code
   - Cursor
   - Kiro
   - Amazon Q
   - GitHub Copilot CLI
   - Gemini CLI
   - OpenAI Codex
   - OpenCode
4. For each selected agent, install skill files into the correct config directory
5. Print per-agent confirmation with flavored success messages
6. Print summary: skills installed, agents configured, theme set

### Agent Install Targets

| Agent | Install Path | Notes |
|---|---|---|
| Claude Code | `~/.claude/skills/` | Verified |
| Cursor | `.cursor/skills/` (project) or `~/.cursor/skills/` (global) | Verified |
| OpenCode | `.opencode/skills/` | Verified |
| Kiro | `~/.kiro/skills/` | Verify during implementation |
| Amazon Q | `~/.aws/amazonq/skills/` | Verify during implementation |
| GitHub Copilot CLI | `~/.copilot/skills/` | Verify during implementation |
| Gemini CLI | `~/.gemini/skills/` | Verify during implementation |
| OpenAI Codex | `~/.codex/skills/` | Verify during implementation |

---

## Upstream Sync

`npx limitless sync` keeps skill content current by pulling improvements from the upstream source.

### Sync Flow

1. Fetch latest skill content from `https://raw.githubusercontent.com/obra/superpowers/main/skills/<name>/SKILL.md`
2. Map each upstream skill to its corresponding limitless JJK-named skill
3. Preserve: JJK name, frontmatter, any limitless-specific additions
4. Update: skill body content with upstream improvements
5. Show unified diff of changes
6. Prompt: "Apply these updates? (y/n)"
7. On confirm: write updated files, print summary

### Sync Rules

- The 10 extended skills are **never touched** by sync (no upstream equivalent)
- JJK names and brackets are **never changed** by sync
- Custom additions within a skill file are preserved (marked with `<!-- limitless -->` comments)

---

## Repository Structure

```
limitless/
├── package.json               # name: "limitless", bin: {limitless: "./cli/index.js"}
├── skills/
│   ├── cursed-energy/
│   │   └── SKILL.md
│   ├── domain-expansion/
│   │   └── SKILL.md
│   ├── cursed-technique-blue/
│   │   └── SKILL.md
│   └── ... (24 skills total)
├── cli/
│   ├── index.js               # Entry point, command router
│   ├── wizard.js              # Interactive install wizard
│   ├── installer.js           # Per-agent file installation logic
│   ├── themes.js              # Theme definitions and renderer
│   ├── sync.js                # Upstream sync logic
│   └── ascii.js               # JJK ASCII art headers per theme
├── themes/
│   ├── infinity.json
│   ├── malevolent-shrine.json
│   ├── ten-shadows.json
│   ├── ratio.json
│   └── divergent-fist.json
└── docs/
    └── specs/
        └── 2026-04-29-limitless-design.md
```

---

## Package Configuration

```json
{
  "name": "limitless",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "limitless": "./cli/index.js"
  },
  "dependencies": {
    "inquirer": "^9.x",
    "chalk": "^5.x",
    "ora": "^8.x",
    "diff": "^5.x"
  }
}
```

---

## Non-Goals

- No GUI or web interface
- No cloud sync or accounts
- No telemetry
- No backwards compatibility with other skill frameworks
