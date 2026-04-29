# Limitless

JJK-themed agentic skills framework for coding agents.

24 techniques. 8 supported agents. One command.

## Install

```bash
npx limitless
```

The wizard will:
1. Let you choose a theme (Gojo · Sukuna · Megumi · Nanami · Yuji)
2. Let you select which agents to install into
3. Install all 24 skills automatically

## Supported Agents

- Claude Code
- Cursor
- Kiro
- Amazon Q
- GitHub Copilot CLI
- Gemini CLI
- OpenAI Codex
- OpenCode

## Commands

```bash
npx limitless              # Setup wizard
npx limitless install      # Re-run installer
npx limitless sync         # Pull skill improvements from upstream
npx limitless theme        # Change theme
npx limitless list         # List all 24 skills
npx limitless info <name>  # Show skill details
npx limitless run <name>   # Interactive skill session
```

## Skills

### Core (14)

| Technique | Function |
|-----------|----------|
| Cursed Energy | How to Use Limitless |
| Domain Expansion | Creative Brainstorming |
| Cursed Technique: Blue | Implementation Planning |
| Cursed Technique: Red | Plan Execution |
| Black Flash | Test-Driven Development |
| Reverse Cursed Technique | Systematic Debugging |
| Six Eyes | Requesting Code Review |
| Shrine | Receiving Code Review |
| Malevolent Shrine | Pre-Completion Verification |
| Ten Shadows | Subagent-Driven Development |
| Chimera Shadow Garden | Parallel Agent Dispatch |
| Hollow Purple | Finishing a Dev Branch |
| Barrier Technique | Git Worktree Isolation |
| Innate Technique | Writing Custom Skills |

### Extended (10)

| Technique | Function |
|-----------|----------|
| Lapse: Blue | Code Refactoring |
| Maximum: Hollow Purple | Full System Architecture |
| Stacked Blue | Writing Documentation |
| Ratio | Code Decomposition |
| Prison Realm | Dependency Management |
| Idle Transfiguration | Legacy Code Modernization |
| De-Merger | API Design & Separation |
| Divergent Fist | Performance Optimization |
| Jackpot: One-Two | CI/CD Pipeline Setup |
| Cleave | Managing Breaking Changes |

## Themes

| Theme | Character | Color |
|-------|-----------|-------|
| Infinity (default) | Gojo Satoru | Deep purple |
| Malevolent Shrine | Ryomen Sukuna | Crimson |
| Ten Shadows | Fushiguro Megumi | Dark teal |
| Ratio | Nanami Kento | Amber |
| Divergent Fist | Itadori Yuji | Orange |

Each theme has a pool of character quotes shown randomly on startup and cycling spinner messages during installs.

## Interactive Sessions

Run any skill interactively with:

```bash
npx limitless run <skill-name>
```

Example:
```bash
npx limitless run domain-expansion
```

Walk through each section of the skill, select from extracted options, or type your own approach. A session summary is printed at the end.

## Upstream Sync

```bash
npx limitless sync
```

Pulls the latest skill improvements from the upstream source for the 14 core skills. Shows a unified diff before applying. Extended skills are never touched by sync.

## License

MIT
