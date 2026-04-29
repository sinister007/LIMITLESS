# Limitless Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `limitless`, a JJK-themed agentic skills framework installable via `npx limitless` for 8 coding agents.

**Architecture:** A Node.js ESM package with 24 SKILL.md files and an interactive CLI. The CLI handles installation (copying skills to agent config dirs), theme selection (chalk-colored output), and upstream sync (fetching skill improvements from obra/superpowers). No runtime dependencies beyond the CLI tools.

**Tech Stack:** Node.js 18+, ESM modules, inquirer@9 (prompts), chalk@5 (colors), ora@8 (spinners), diff@5 (unified diffs)

---

## File Map

```
limitless/
├── package.json
├── .gitignore
├── README.md
├── skills/
│   ├── cursed-energy/SKILL.md
│   ├── domain-expansion/SKILL.md
│   ├── cursed-technique-blue/SKILL.md
│   ├── cursed-technique-red/SKILL.md
│   ├── black-flash/SKILL.md
│   ├── reverse-cursed-technique/SKILL.md
│   ├── six-eyes/SKILL.md
│   ├── shrine/SKILL.md
│   ├── malevolent-shrine/SKILL.md
│   ├── ten-shadows/SKILL.md
│   ├── chimera-shadow-garden/SKILL.md
│   ├── hollow-purple/SKILL.md
│   ├── barrier-technique/SKILL.md
│   ├── innate-technique/SKILL.md
│   ├── lapse-blue/SKILL.md
│   ├── maximum-hollow-purple/SKILL.md
│   ├── stacked-blue/SKILL.md
│   ├── ratio/SKILL.md
│   ├── prison-realm/SKILL.md
│   ├── idle-transfiguration/SKILL.md
│   ├── de-merger/SKILL.md
│   ├── divergent-fist/SKILL.md
│   ├── jackpot-one-two/SKILL.md
│   └── cleave/SKILL.md
├── cli/
│   ├── index.js        — entry point, command router
│   ├── wizard.js       — interactive install wizard
│   ├── installer.js    — per-agent file installation
│   ├── themes.js       — theme loader, painter, changeTheme()
│   ├── sync.js         — upstream sync with diff
│   ├── list.js         — list and info commands
│   └── ascii.js        — JJK ASCII art per theme
└── themes/
    ├── infinity.json
    ├── malevolent-shrine.json
    ├── ten-shadows.json
    ├── ratio.json
    └── divergent-fist.json
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git repo**

Run from `/home/vahab/Desktop/LIMITLESS`:
```bash
git init
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "limitless",
  "version": "1.0.0",
  "description": "JJK-themed agentic skills framework for coding agents",
  "type": "module",
  "bin": {
    "limitless": "./cli/index.js"
  },
  "keywords": ["ai", "coding-agent", "claude", "cursor", "skills", "jujutsu-kaisen"],
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "chalk": "^5.3.0",
    "diff": "^5.1.0",
    "inquirer": "^9.2.0",
    "ora": "^8.0.1"
  }
}
```

- [ ] **Step 3: Create .gitignore**

```
node_modules/
.DS_Store
*.log
```

- [ ] **Step 4: Create directory structure**

```bash
mkdir -p skills cli themes docs/specs docs/plans
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: `added N packages` with no errors.

- [ ] **Step 6: Commit scaffold**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: initial project scaffold"
```

---

### Task 2: Theme System

**Files:**
- Create: `themes/infinity.json`
- Create: `themes/malevolent-shrine.json`
- Create: `themes/ten-shadows.json`
- Create: `themes/ratio.json`
- Create: `themes/divergent-fist.json`
- Create: `cli/themes.js`

- [ ] **Step 1: Create themes/infinity.json**

```json
{
  "id": "infinity",
  "name": "Infinity",
  "character": "Gojo Satoru",
  "primary": "#7C3AED",
  "accent": "#FFFFFF",
  "dim": "#A78BFA",
  "success": "#10B981",
  "error": "#EF4444",
  "warning": "#F59E0B",
  "spinner": {
    "loading": "Channeling cursed energy...",
    "success": "Technique activated.",
    "error": "Cursed technique failed."
  },
  "messages": {
    "welcome": "You obtained the Six Eyes. Limitless is yours.",
    "installed": "Skills bound to your cursed energy.",
    "synced": "The Infinity has been updated."
  }
}
```

- [ ] **Step 2: Create themes/malevolent-shrine.json**

```json
{
  "id": "malevolent-shrine",
  "name": "Malevolent Shrine",
  "character": "Ryomen Sukuna",
  "primary": "#DC2626",
  "accent": "#F59E0B",
  "dim": "#7F1D1D",
  "success": "#10B981",
  "error": "#B91C1C",
  "warning": "#D97706",
  "spinner": {
    "loading": "Dismantle...",
    "success": "Shrine expanded.",
    "error": "Technique reversed."
  },
  "messages": {
    "welcome": "Bow. I am the King of Curses.",
    "installed": "Skills carved into existence.",
    "synced": "The shrine has been redrawn."
  }
}
```

- [ ] **Step 3: Create themes/ten-shadows.json**

```json
{
  "id": "ten-shadows",
  "name": "Ten Shadows",
  "character": "Fushiguro Megumi",
  "primary": "#0F766E",
  "accent": "#CBD5E1",
  "dim": "#134E4A",
  "success": "#059669",
  "error": "#EF4444",
  "warning": "#F59E0B",
  "spinner": {
    "loading": "Summoning shikigami...",
    "success": "Shikigami bound.",
    "error": "Shikigami lost."
  },
  "messages": {
    "welcome": "Ten shadows, ten techniques. Use them well.",
    "installed": "Shikigami installed and ready.",
    "synced": "Shadow library updated."
  }
}
```

- [ ] **Step 4: Create themes/ratio.json**

```json
{
  "id": "ratio",
  "name": "Ratio",
  "character": "Nanami Kento",
  "primary": "#D97706",
  "accent": "#374151",
  "dim": "#92400E",
  "success": "#059669",
  "error": "#EF4444",
  "warning": "#F59E0B",
  "spinner": {
    "loading": "Calculating ratio...",
    "success": "7:3 achieved.",
    "error": "Ratio broken."
  },
  "messages": {
    "welcome": "Work is fundamentally about precision.",
    "installed": "Skills distributed at optimal ratio.",
    "synced": "Ratios recalculated."
  }
}
```

- [ ] **Step 5: Create themes/divergent-fist.json**

```json
{
  "id": "divergent-fist",
  "name": "Divergent Fist",
  "character": "Itadori Yuji",
  "primary": "#EA580C",
  "accent": "#1E3A5F",
  "dim": "#9A3412",
  "success": "#16A34A",
  "error": "#DC2626",
  "warning": "#CA8A04",
  "spinner": {
    "loading": "Pushing cursed energy through...",
    "success": "Divergent Fist landed.",
    "error": "Strike missed."
  },
  "messages": {
    "welcome": "I'll keep moving forward no matter what.",
    "installed": "Skills ready to diverge.",
    "synced": "Fist recharged."
  }
}
```

- [ ] **Step 6: Create cli/themes.js**

```javascript
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import chalk from 'chalk';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONFIG_PATH = join(homedir(), '.limitless', 'config.json');
const THEMES_DIR = join(__dirname, '..', 'themes');

const THEME_IDS = ['infinity', 'malevolent-shrine', 'ten-shadows', 'ratio', 'divergent-fist'];

export function loadTheme(id = 'infinity') {
  const themePath = join(THEMES_DIR, `${id}.json`);
  if (!existsSync(themePath)) return loadTheme('infinity');
  return JSON.parse(readFileSync(themePath, 'utf8'));
}

export function loadConfig() {
  if (!existsSync(CONFIG_PATH)) return { theme: 'infinity' };
  try {
    return JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    return { theme: 'infinity' };
  }
}

export function saveConfig(config) {
  const dir = join(homedir(), '.limitless');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function getCurrentTheme() {
  const config = loadConfig();
  return loadTheme(config.theme);
}

export function paint(theme) {
  return {
    primary: (text) => chalk.hex(theme.primary)(text),
    accent: (text) => chalk.hex(theme.accent)(text),
    dim: (text) => chalk.hex(theme.dim)(text),
    success: (text) => chalk.hex(theme.success)(text),
    error: (text) => chalk.hex(theme.error)(text),
    warning: (text) => chalk.hex(theme.warning)(text),
    bold: (text) => chalk.bold(text),
    header: (text) => chalk.bold.hex(theme.primary)(text),
    divider: () => chalk.hex(theme.dim)('─'.repeat(50)),
  };
}

export function allThemes() {
  return THEME_IDS.map(id => loadTheme(id));
}

export async function changeTheme() {
  const { default: inquirer } = await import('inquirer');
  const currentConfig = loadConfig();
  const themes = allThemes();
  const p = paint(getCurrentTheme());

  console.log(p.header('Change Theme'));
  console.log();

  const { selectedTheme } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTheme',
      message: 'Choose your technique:',
      choices: themes.map(t => ({
        name: `${t.name} — ${t.character}`,
        value: t.id,
      })),
      default: currentConfig.theme || 'infinity',
    }
  ]);

  currentConfig.theme = selectedTheme;
  saveConfig(currentConfig);

  const newTheme = loadTheme(selectedTheme);
  const np = paint(newTheme);
  console.log();
  console.log(np.success(`✓ Theme changed to: ${newTheme.name} — ${newTheme.character}`));
  console.log(np.primary(newTheme.messages.welcome));
}
```

- [ ] **Step 7: Smoke test themes.js**

Create temp file `test-theme.js` at repo root:
```javascript
import { getCurrentTheme, paint } from './cli/themes.js';
const theme = getCurrentTheme();
const p = paint(theme);
console.log(p.header('LIMITLESS'));
console.log(p.primary('Primary color test'));
console.log(p.success('Success'));
console.log(p.error('Error'));
```

Run: `node test-theme.js`
Expected: colored output in purple (Infinity theme default), no errors.

Delete `test-theme.js` after confirming.

- [ ] **Step 8: Commit**

```bash
git add themes/ cli/themes.js
git commit -m "feat: add theme system with 5 JJK character themes"
```

---

### Task 3: ASCII Art Headers

**Files:**
- Create: `cli/ascii.js`

- [ ] **Step 1: Create cli/ascii.js**

```javascript
import { paint } from './themes.js';

const ART = {
  'infinity': `
██╗     ██╗███╗   ███╗██╗████████╗██╗     ███████╗███████╗███████╗
██║     ██║████╗ ████║██║╚══██╔══╝██║     ██╔════╝██╔════╝██╔════╝
██║     ██║██╔████╔██║██║   ██║   ██║     █████╗  ███████╗███████╗
██║     ██║██║╚██╔╝██║██║   ██║   ██║     ██╔══╝  ╚════██║╚════██║
███████╗██║██║ ╚═╝ ██║██║   ██║   ███████╗███████╗███████║███████║
╚══════╝╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚══════╝`,
  'malevolent-shrine': `
╔╦╗╔═╗╦  ╔═╗╦  ╦╔═╗╦  ╔═╗╔╗╔╔╦╗  ╔═╗╦ ╦╦═╗╦╔╗╔╔═╗
║║║╠═╣║  ║╣ ╚╗╔╝║ ║║  ║╣ ║║║ ║   ╚═╗╠═╣╠╦╝║║║║║╣
╩ ╩╩ ╩╩═╝╚═╝ ╚╝ ╚═╝╩═╝╚═╝╝╚╝ ╩   ╚═╝╩ ╩╩╚═╩╝╚╝╚═╝`,
  'ten-shadows': `
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
█░  L I M I T L E S S              ░█
█░  T E N  S H A D O W S           ░█
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`,
  'ratio': `
┌──────────────────────────────────────┐
│   L I M I T L E S S                 │
│   ── Ratio ─ 7:3 ─ Nanami Kento ─  │
└──────────────────────────────────────┘`,
  'divergent-fist': `
 _     _____ __  __ ___ _____ _     _____ ____ ____
| |   |_   _|  \\/  |_ _|_   _| |   | ____/ ___/ ___|
| |     | | | |\\/| || |  | | | |   |  _| \\___ \\___ \\
| |___  | | | |  | || |  | | | |___| |___ ___) |__) |
|_____| |_| |_|  |_|___| |_| |_____|_____|____/____/`
};

const SUBTITLES = {
  'infinity': 'The Honored One  ·  Gojo Satoru',
  'malevolent-shrine': 'King of Curses  ·  Ryomen Sukuna',
  'ten-shadows': 'Ten Shadows  ·  Fushiguro Megumi',
  'ratio': '7:3 Ratio  ·  Nanami Kento',
  'divergent-fist': 'Divergent Fist  ·  Itadori Yuji'
};

export function printHeader(theme) {
  const p = paint(theme);
  const art = ART[theme.id] || ART['infinity'];
  const subtitle = SUBTITLES[theme.id] || '';
  console.log(p.primary(art));
  console.log(p.dim('  ' + subtitle));
  console.log();
  console.log(p.divider());
  console.log();
}
```

- [ ] **Step 2: Smoke test ASCII header**

Create temp file `test-ascii.js` at repo root:
```javascript
import { printHeader } from './cli/ascii.js';
import { getCurrentTheme } from './cli/themes.js';
printHeader(getCurrentTheme());
```

Run: `node test-ascii.js`
Expected: ASCII art in purple, subtitle, divider line. No errors.

Delete `test-ascii.js` after confirming.

- [ ] **Step 3: Commit**

```bash
git add cli/ascii.js
git commit -m "feat: add JJK ASCII art headers for each theme"
```

---

### Task 4: Core Skills — Batch 1 (Skills 1–7)

**Files:**
- Create: `skills/cursed-energy/SKILL.md`
- Create: `skills/domain-expansion/SKILL.md`
- Create: `skills/cursed-technique-blue/SKILL.md`
- Create: `skills/cursed-technique-red/SKILL.md`
- Create: `skills/black-flash/SKILL.md`
- Create: `skills/reverse-cursed-technique/SKILL.md`
- Create: `skills/six-eyes/SKILL.md`

- [ ] **Step 1: Create skills/cursed-energy/SKILL.md**

```markdown
---
name: "Cursed Energy [How to Use Limitless]"
description: Entry point — establishes when and how to invoke skills before any task
trigger: At the start of every conversation before any response or action
---

# Cursed Energy [How to Use Limitless]

You have access to the Limitless skill framework. These skills are not suggestions — they are techniques. Use them or your cursed energy goes to waste.

## The Rule

Invoke relevant skills BEFORE any response or action. Even a 1% chance a skill applies means you MUST invoke it.

## Priority Order

1. **User's explicit instructions** (highest priority)
2. **Limitless skills** (override default agent behavior)
3. **Default agent behavior** (lowest priority)

## When to Invoke Which Skill

| Situation | Skill |
|-----------|-------|
| Starting any creative or feature work | Domain Expansion [Creative Brainstorming] |
| Have a spec, ready to plan | Cursed Technique: Blue [Implementation Planning] |
| Have a plan, ready to execute | Cursed Technique: Red [Plan Execution] |
| Implementing any feature or fix | Black Flash [Test-Driven Development] |
| Encountering a bug or failure | Reverse Cursed Technique [Systematic Debugging] |
| Finished a major feature | Six Eyes [Requesting Code Review] |
| Received code review feedback | Shrine [Receiving Code Review] |
| About to claim work is done | Malevolent Shrine [Pre-Completion Verification] |
| Executing a plan with independent tasks | Ten Shadows [Subagent-Driven Development] |
| 2+ independent tasks exist | Chimera Shadow Garden [Parallel Agent Dispatch] |
| Implementation complete, merging | Hollow Purple [Finishing a Dev Branch] |
| Need workspace isolation | Barrier Technique [Git Worktree Isolation] |
| Refactoring existing code | Lapse: Blue [Code Refactoring] |
| Designing a new system | Maximum: Hollow Purple [Full System Architecture] |
| Writing documentation | Stacked Blue [Writing Documentation] |
| File or module is too large | Ratio [Code Decomposition] |
| Managing dependencies | Prison Realm [Dependency Management] |
| Modernizing legacy code | Idle Transfiguration [Legacy Code Modernization] |
| Designing an API | De-Merger [API Design & Separation] |
| Performance is a concern | Divergent Fist [Performance Optimization] |
| Setting up CI/CD | Jackpot: One-Two [CI/CD Pipeline Setup] |
| Handling breaking changes | Cleave [Managing Breaking Changes] |
| Creating new skills | Innate Technique [Writing Custom Skills] |

## Red Flags (You Are Rationalizing)

Stop and invoke the skill if you think:
- "This is too simple to need a skill"
- "I need more context first"
- "I already know what to do"
- "The skill is overkill here"

These thoughts mean you're about to skip discipline. Invoke the skill anyway.

## How to Invoke

Use your platform's Skill tool with the skill directory name. Announce which skill you are using and why.
```

- [ ] **Step 2: Create skills/domain-expansion/SKILL.md**

```markdown
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
```

- [ ] **Step 3: Create skills/cursed-technique-blue/SKILL.md**

```markdown
---
name: "Cursed Technique: Blue [Implementation Planning]"
description: Converts approved design specs into detailed bite-sized implementation plans with full code
trigger: When you have an approved design spec and need an implementation plan
---

# Cursed Technique: Blue [Implementation Planning]

Pull the plan into existence. From approved spec to precise, executable task list.

## What a Good Plan Contains

- Exact file paths for every file created or modified
- Complete code for every step that changes code
- Exact commands with expected output
- TDD structure: failing test → verify fail → implement → verify pass → commit
- No placeholders, no TBDs, no "similar to Task N"

## Plan Header (required)

```
# [Feature Name] Implementation Plan

> For agentic workers: Use Ten Shadows [Subagent-Driven Development] or
> Cursed Technique: Red [Plan Execution] to execute this plan.

**Goal:** [one sentence]
**Architecture:** [2–3 sentences]
**Tech Stack:** [key libraries/tools]
```

## File Structure First

Before writing tasks, list every file that will be created or modified and its single responsibility. This is where decomposition gets locked in.

Rules:
- One clear responsibility per file
- Files that change together live together
- Prefer small, focused files
- Follow existing codebase patterns

## Task Format

```
### Task N: [Name]

**Files:**
- Create: `exact/path/file.js`
- Modify: `exact/path/existing.js:45-67`
- Test: `tests/exact/path/test.js`

- [ ] Step 1: Write the failing test
[test code]

- [ ] Step 2: Run test — verify it fails
Run: `command`
Expected: FAIL with "[message]"

- [ ] Step 3: Write minimal implementation
[implementation code]

- [ ] Step 4: Run test — verify it passes
Run: `command`
Expected: PASS

- [ ] Step 5: Commit
[git commands]
```

## Granularity

Each step = one action (2–5 minutes):
- "Write the failing test" = one step
- "Run it to verify it fails" = separate step
- "Write the implementation" = separate step
- "Commit" = always its own step

## Save Location

`docs/plans/YYYY-MM-DD-<feature-name>.md`

## Self-Review After Writing

1. Every spec requirement has a task
2. No placeholder text anywhere
3. Function names, types, file paths are consistent across all tasks
4. Every code step shows the actual code

Fix issues inline. Then offer execution choice.
```

- [ ] **Step 4: Create skills/cursed-technique-red/SKILL.md**

```markdown
---
name: "Cursed Technique: Red [Plan Execution]"
description: Executes written implementation plans task-by-task with checkpoints and verification
trigger: When you have a written implementation plan to execute in this session
---

# Cursed Technique: Red [Plan Execution]

Push through the plan. Execute each task. Verify each step. Commit often.

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
```

- [ ] **Step 5: Create skills/black-flash/SKILL.md**

```markdown
---
name: "Black Flash [Test-Driven Development]"
description: Enforces RED-GREEN-REFACTOR cycle — write the failing test before any implementation code
trigger: When implementing any feature, fix, or change to existing behavior
---

# Black Flash [Test-Driven Development]

Land the technique precisely. Write the test first. Every time. No exceptions.

## The Cycle

**RED → GREEN → REFACTOR**

1. **RED:** Write a failing test that describes the desired behavior
2. **Verify RED:** Run the test — it MUST fail. If it passes, the test is wrong.
3. **GREEN:** Write the minimal code to make the test pass. Nothing more.
4. **Verify GREEN:** Run the test — it MUST pass.
5. **REFACTOR:** Clean up without changing behavior. Re-run tests after.
6. **Commit:** One focused commit per RED-GREEN-REFACTOR cycle.

## What Makes a Good Test

- Tests one specific behavior
- Has a clear, descriptive name: `test_returns_empty_list_when_no_results`
- Follows Arrange-Act-Assert structure
- Tests behavior, not implementation details
- Fast and deterministic

## Hard Rules

- Never write implementation code before a failing test exists
- Never move to GREEN with a test that wasn't RED first
- Never refactor with failing tests

## Common Traps

- "This is too simple to test" → Write the test anyway
- "I'll add tests later" → There is no later
- "The test is obvious" → Write it — it documents behavior

## Commit Format

```
test: add test for [behavior]
feat: implement [behavior] to make test pass
refactor: clean up [component]
```
```

- [ ] **Step 6: Create skills/reverse-cursed-technique/SKILL.md**

```markdown
---
name: "Reverse Cursed Technique [Systematic Debugging]"
description: Root-cause analysis process — understand the failure before modifying any code
trigger: When encountering any bug, test failure, or unexpected behavior
---

# Reverse Cursed Technique [Systematic Debugging]

Invert the curse. Understand the failure before touching the code.

## Hard Rule

Do NOT modify any code until you have identified the root cause. A fix without a root cause is a guess.

## Process

### Phase 1: Understand the Failure
1. Read the full error message — all of it
2. Identify: what was expected vs. what actually happened
3. Find the exact line where the failure occurs
4. Write your hypothesis in one sentence

### Phase 2: Gather Evidence
5. Add targeted logging near the failure point
6. Run the failing case — observe actual values
7. Are your inputs what you think they are?
8. Are your assumptions about the environment correct?

### Phase 3: Isolate
9. Reproduce the bug in the smallest possible case
10. Confirm your reproduction is reliable
11. Test your hypothesis by changing one thing at a time

### Phase 4: Fix
12. Implement the minimal fix for the root cause
13. Run the full test suite — not just the failing test
14. Verify the fix did not introduce new failures

### Phase 5: Prevent Recurrence
15. Write a test that would have caught this bug
16. Commit: fix + test together

## When You Are Stuck

After 3 failed hypotheses:
- Question your fundamental assumptions
- Read the code path from the entry point, not from where you think the bug is
- Ask: "What if I am wrong about X?" for each assumption

## Commit Format

```
fix: [root cause description and fix]
test: add regression test for [bug description]
```
```

- [ ] **Step 7: Create skills/six-eyes/SKILL.md**

```markdown
---
name: "Six Eyes [Requesting Code Review]"
description: Triggers structured code review after completing a major feature or logical chunk
trigger: When a major implementation step is complete, before merging or declaring done
---

# Six Eyes [Requesting Code Review]

See everything. Request review at the right moment.

## When to Use

- After completing a major feature (multiple files changed)
- After completing a numbered task in an implementation plan
- Before merging a branch
- When you want a second opinion on an architectural decision

## What to Include in a Review Request

Provide the reviewer with:
1. **What was built** — one paragraph summary
2. **What changed** — specific files and what each one does
3. **What to focus on** — areas of uncertainty, complex logic, security-sensitive code
4. **How to test** — exact commands to verify behavior

## Before Requesting Review

- [ ] All tests pass
- [ ] No debug code or console.log left in
- [ ] Code follows existing patterns in the codebase
- [ ] No obvious security issues
- [ ] Commit messages are clear

## After Submitting

Do not continue implementing new features while waiting for review.

## When Review Comes Back

Invoke **Shrine [Receiving Code Review]** before making any changes.
```

- [ ] **Step 8: Commit batch 1**

```bash
git add skills/cursed-energy/ skills/domain-expansion/ skills/cursed-technique-blue/ skills/cursed-technique-red/ skills/black-flash/ skills/reverse-cursed-technique/ skills/six-eyes/
git commit -m "feat: add core skills batch 1 (skills 1-7)"
```

---

### Task 5: Core Skills — Batch 2 (Skills 8–14)

**Files:**
- Create: `skills/shrine/SKILL.md`
- Create: `skills/malevolent-shrine/SKILL.md`
- Create: `skills/ten-shadows/SKILL.md`
- Create: `skills/chimera-shadow-garden/SKILL.md`
- Create: `skills/hollow-purple/SKILL.md`
- Create: `skills/barrier-technique/SKILL.md`
- Create: `skills/innate-technique/SKILL.md`

- [ ] **Step 1: Create skills/shrine/SKILL.md**

```markdown
---
name: "Shrine [Receiving Code Review]"
description: Processes incoming code review feedback before making any changes
trigger: When receiving code review feedback from a human or automated reviewer
---

# Shrine [Receiving Code Review]

Receive the technique. Process it before you act.

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
```

- [ ] **Step 2: Create skills/malevolent-shrine/SKILL.md**

```markdown
---
name: "Malevolent Shrine [Pre-Completion Verification]"
description: Verification gate — run before claiming any work is done, fixed, or passing
trigger: Before saying "done", "fixed", "complete", or "tests pass"
---

# Malevolent Shrine [Pre-Completion Verification]

The shrine expands. Everything inside gets cut. Verify before you claim victory.

## Hard Rule

Do NOT claim work is complete without running through this checklist. "I believe it works" is not evidence.

## Verification Checklist

### Functional Verification
- [ ] Run the full test suite — not just the new tests
- [ ] Run the specific scenario that was originally broken (if a bug fix)
- [ ] Test edge cases manually if automated tests do not cover them

### Code Quality
- [ ] No dead code, debug statements, or commented-out blocks left in
- [ ] No TODOs introduced that were not there before
- [ ] Code follows patterns in the surrounding codebase

### Documentation
- [ ] Any public APIs or config options are documented
- [ ] README updated if behavior changed

### Integration
- [ ] New code works with existing code, not just in isolation
- [ ] No regressions in adjacent functionality

## After Verification

If all items pass: claim completion with evidence.
"Done. Tests pass (`npm test` — 42 passed, 0 failed). Manually verified [scenario]."

If any items fail: fix them first.
```

- [ ] **Step 3: Create skills/ten-shadows/SKILL.md**

```markdown
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
```

- [ ] **Step 4: Create skills/chimera-shadow-garden/SKILL.md**

```markdown
---
name: "Chimera Shadow Garden [Parallel Agent Dispatch]"
description: Identifies truly independent tasks and dispatches them as parallel agents in one message
trigger: When 2 or more tasks exist that share no state and have no sequential dependencies
---

# Chimera Shadow Garden [Parallel Agent Dispatch]

All shadows merge. All tasks run at once. But only if they are truly independent.

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
```

- [ ] **Step 5: Create skills/hollow-purple/SKILL.md**

```markdown
---
name: "Hollow Purple [Finishing a Dev Branch]"
description: Handles the full branch-finishing flow — tests, review decision, merge, cleanup
trigger: When implementation is complete, all tests pass, and you need to land the branch
---

# Hollow Purple [Finishing a Dev Branch]

Blue and Red converge. Planning and execution complete. Now land it cleanly.

## Pre-Merge Checklist

- [ ] All tests pass on the branch
- [ ] No merge conflicts with target branch
- [ ] Branch is up to date: `git pull --rebase origin main`
- [ ] All planned tasks completed and committed
- [ ] No debug code, TODOs, or unfinished work in the diff

## Review Decision

**Significant change (multiple files, new features, architectural decisions):**
→ Invoke Six Eyes [Requesting Code Review] first. Do not merge without review.

**Small, low-risk change (single file, bug fix, config):**
→ Self-review the diff, then merge directly.

## Merge

```bash
git checkout main
git merge --no-ff <branch-name> -m "feat: [description]"
git push origin main
```

## Post-Merge Cleanup

```bash
git branch -d <branch-name>
git push origin --delete <branch-name>
```
```

- [ ] **Step 6: Create skills/barrier-technique/SKILL.md**

```markdown
---
name: "Barrier Technique [Git Worktree Isolation]"
description: Isolates feature work in a git worktree to keep the main workspace clean
trigger: When starting feature work that needs isolation from the current workspace
---

# Barrier Technique [Git Worktree Isolation]

Erect the barrier. Work inside without disturbing the world outside.

## When to Use

- Starting a feature that will take multiple sessions
- Need to test something without disrupting current work
- Running multiple features simultaneously
- Want to keep main branch always clean

## Setup

```bash
git worktree add ../<project>-<feature> -b feature/<feature-name>
cd ../<project>-<feature>
```

The new worktree is a full working copy with its own branch, sharing git history with the original.

## Working in the Worktree

- All work happens in the worktree directory
- Commits go to the feature branch only
- Main branch is unaffected
- Run tests from within the worktree

## Cleanup

```bash
# From the main repo directory
git worktree remove ../<project>-<feature>
git branch -d feature/<feature-name>  # after merging
```

## Rules

- One feature per worktree
- Do not commit to main from within a feature worktree
- Clean up worktrees when done
```

- [ ] **Step 7: Create skills/innate-technique/SKILL.md**

```markdown
---
name: "Innate Technique [Writing Custom Skills]"
description: Creates new skills for the Limitless framework following the standard format
trigger: When creating a new skill, editing an existing skill, or validating skill quality
---

# Innate Technique [Writing Custom Skills]

Your innate technique is unique. Shape it precisely.

## Skill File Location

`skills/<kebab-jjk-name>/SKILL.md`

## Required Frontmatter

```yaml
---
name: "JJK Name [Functional Description]"
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
```

- [ ] **Step 8: Commit batch 2**

```bash
git add skills/shrine/ skills/malevolent-shrine/ skills/ten-shadows/ skills/chimera-shadow-garden/ skills/hollow-purple/ skills/barrier-technique/ skills/innate-technique/
git commit -m "feat: add core skills batch 2 (skills 8-14)"
```

---

### Task 6: Extended Skills — Batch 1 (Skills 15–19)

**Files:**
- Create: `skills/lapse-blue/SKILL.md`
- Create: `skills/maximum-hollow-purple/SKILL.md`
- Create: `skills/stacked-blue/SKILL.md`
- Create: `skills/ratio/SKILL.md`
- Create: `skills/prison-realm/SKILL.md`

- [ ] **Step 1: Create skills/lapse-blue/SKILL.md**

```markdown
---
name: "Lapse: Blue [Code Refactoring]"
description: Structured refactoring process that improves code structure without changing behavior
trigger: When refactoring existing code — improving structure without changing behavior
---

# Lapse: Blue [Code Refactoring]

Blue attracts. Pull the chaos into order. Change the structure, not the behavior.

## Hard Rule

Do NOT refactor and add features at the same time. Refactoring commits change structure only. Feature commits change behavior only. Never both in one commit.

## Process

### Phase 1: Cover First
1. Identify what you are about to refactor
2. Check test coverage — does existing behavior have tests?
3. If coverage is weak: write characterization tests first (tests documenting current behavior)
4. Run all tests — they must pass before you touch anything

### Phase 2: Refactor in Small Steps
5. Make one structural change at a time
6. Run tests after each change
7. If tests fail: revert immediately, understand why, try a smaller step
8. Commit each logical refactor separately

### Phase 3: Verify
9. Run the full test suite
10. Manually verify key behaviors still work
11. Diff your changes — no accidental behavior changes

## Types of Refactoring

- **Extract function** — isolate a piece of logic
- **Rename** — make intent clear
- **Move** — put code where it belongs
- **Simplify conditionals** — reduce nesting
- **Remove duplication** — DRY

## What NOT to Do

- Do not refactor code you do not understand
- Do not refactor code without tests
- Do not make behavior changes during a refactoring commit
```

- [ ] **Step 2: Create skills/maximum-hollow-purple/SKILL.md**

```markdown
---
name: "Maximum: Hollow Purple [Full System Architecture]"
description: End-to-end system design for new systems — requirements, architecture decisions, decomposition, and planning
trigger: When designing a new system, platform, or major feature set from scratch
---

# Maximum: Hollow Purple [Full System Architecture]

Blue and Red at maximum output. The full technique. Design and plan, converged.

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
```

- [ ] **Step 3: Create skills/stacked-blue/SKILL.md**

```markdown
---
name: "Stacked Blue [Writing Documentation]"
description: Layered, structured technical writing — from API reference to architecture guides
trigger: When writing any technical documentation, README, or guide
---

# Stacked Blue [Writing Documentation]

Layer by layer, build clarity. Good documentation is a technique, not an afterthought.

## Levels of Documentation

| Level | Audience | Format |
|-------|----------|--------|
| Reference | Developers using an API | Concise, complete, scannable |
| Guide | Developers learning a workflow | Step-by-step with examples |
| Concept | Developers understanding why | Explanatory prose |
| README | Anyone | Overview + quick start |

## Process

### Before Writing
1. Who is reading this? What do they already know?
2. What do they need to do after reading it?
3. What is the single most important thing to communicate?

### Writing
4. Lead with the answer — do not bury key information
5. One concept per section
6. Every code example must be runnable and correct
7. If you are explaining what something is AND how to use it: split into two sections

### After Writing
8. Read it as someone who has never seen the codebase
9. Every example: does it actually work? Run it.
10. Every claim: is it accurate right now?

## Anti-Patterns

- Documenting implementation details instead of behavior
- Examples that do not work
- Documentation that is out of date immediately after writing
- Writing for yourself instead of your reader
```

- [ ] **Step 4: Create skills/ratio/SKILL.md**

```markdown
---
name: "Ratio [Code Decomposition]"
description: Splits large overloaded files and modules into clean well-bounded units
trigger: When a file has grown too large, has multiple responsibilities, or is hard to test
---

# Ratio [Code Decomposition]

7:3. Find the weak point. Split precisely.

## When a File Needs Decomposition

- File is over 300 lines and contains multiple distinct concerns
- You have to scroll to understand what the file does
- Tests cover fundamentally different behaviors in the same file
- Two people frequently edit the same file for unrelated reasons

## Process

### Phase 1: Map Responsibilities
1. List every thing the file does (not how — what)
2. Group related things together
3. Name each group — that is your new module

### Phase 2: Find the Seam
4. Identify the weakest dependency between groups
5. That is where you cut — the 7:3 ratio point
6. The cut must be clean: one side does not know about the other's internals

### Phase 3: Extract Safely
7. Write tests for the behavior you are about to move (if not covered)
8. Create the new file
9. Move the code — do not change it yet
10. Update imports
11. Run tests — they must pass

### Phase 4: Clean Up
12. Remove dead code exposed by the extraction
13. Improve names now that context is clearer
14. Commit

## Good Module Boundaries

A module has good boundaries if you can answer:
- What does it do? (one sentence)
- How do you use it? (the public interface)
- What does it depend on? (its imports)
```

- [ ] **Step 5: Create skills/prison-realm/SKILL.md**

```markdown
---
name: "Prison Realm [Dependency Management]"
description: Audits, evaluates, and manages project dependencies safely
trigger: When adding, removing, auditing, or troubleshooting project dependencies
---

# Prison Realm [Dependency Management]

Seal the soul. Know what enters your codebase.

## Before Adding a Dependency

Ask:
1. Is this actually needed, or can it be done in 20 lines of code?
2. Is this package actively maintained? (last commit, open issues, download count)
3. Is the license compatible with this project?
4. What does it add to bundle size?
5. Does it have known vulnerabilities? (`npm audit`)

Only add it if all answers are acceptable.

## Adding a Dependency

```bash
npm info <package> dependencies
npm install <package>@<version>
npm audit
```

## Auditing Existing Dependencies

```bash
npm audit              # vulnerabilities
npm outdated           # outdated packages
npx depcheck           # unused dependencies
```

## Removing a Dependency

1. Search codebase for all imports of the package
2. Verify nothing uses it
3. `npm uninstall <package>`
4. Run tests — verify nothing broke
5. Commit

## Vulnerability Response

| Severity | Response |
|----------|----------|
| Critical | Fix immediately before any other work |
| High | Fix within current sprint |
| Moderate | Track and fix in next release |
| Low | Track, fix opportunistically |
```

- [ ] **Step 6: Commit batch 1 extended skills**

```bash
git add skills/lapse-blue/ skills/maximum-hollow-purple/ skills/stacked-blue/ skills/ratio/ skills/prison-realm/
git commit -m "feat: add extended skills batch 1 (skills 15-19)"
```

---

### Task 7: Extended Skills — Batch 2 (Skills 20–24)

**Files:**
- Create: `skills/idle-transfiguration/SKILL.md`
- Create: `skills/de-merger/SKILL.md`
- Create: `skills/divergent-fist/SKILL.md`
- Create: `skills/jackpot-one-two/SKILL.md`
- Create: `skills/cleave/SKILL.md`

- [ ] **Step 1: Create skills/idle-transfiguration/SKILL.md**

```markdown
---
name: "Idle Transfiguration [Legacy Code Modernization]"
description: Transforms legacy code incrementally without breaking consumers
trigger: When modernizing legacy code, upgrading deprecated APIs, or migrating old patterns
---

# Idle Transfiguration [Legacy Code Modernization]

Transform without rupture. The shape changes. The soul remains.

## Hard Rule

Never rewrite legacy code all at once. Incremental transformation only. Each step must leave the system working.

## Process

### Phase 1: Understand Before Touching
1. Map what the legacy code does — all of it, including edge cases
2. Find all the places that call it
3. Write characterization tests if none exist — tests documenting current behavior

### Phase 2: Build the Bridge
4. Introduce the new implementation alongside the old (do not replace yet)
5. New code has proper tests
6. Old code still works — nothing is broken

### Phase 3: Migrate Incrementally
7. Move callers to the new implementation one at a time
8. Run full tests after each migration
9. Keep the old code until all callers are migrated

### Phase 4: Remove the Old
10. Delete the old implementation once all callers are on new code
11. Run full test suite
12. Commit

## Anti-Patterns

- Big Bang rewrite (rewrite everything at once)
- Parallel systems that diverge and never get cleaned up
- Migrating without tests
- Breaking callers to force migration
```

- [ ] **Step 2: Create skills/de-merger/SKILL.md**

```markdown
---
name: "De-Merger [API Design & Separation]"
description: Designs clean API boundaries and well-separated interfaces between components
trigger: When designing a new API, refactoring an existing one, or defining component boundaries
---

# De-Merger [API Design & Separation]

Separate cleanly. What is inside stays inside. What is outside is the contract.

## Principles

1. **Consumers dictate the interface** — design APIs from the caller's perspective
2. **Minimal surface** — expose only what consumers need
3. **Stable contracts** — the interface should change less often than the implementation
4. **No leaky abstractions** — implementation details must not appear in the API

## Process

### Phase 1: Identify the Boundary
1. What is the unit being designed? (service, module, class, function)
2. Who calls it and what do they need?
3. What should callers never need to know about?

### Phase 2: Design the Interface
4. Write the function signatures or endpoint specs first — no implementation
5. Write usage examples from the caller's perspective
6. Can a consumer be written without knowing the internals?

### Phase 3: Validate
7. Would changing the internals require changing the interface? If yes, redesign.
8. Is any internal type leaking through? Fix it.

### Phase 4: Document
9. Document each public endpoint/function: parameters, return values, error cases
10. Provide at least one usage example per endpoint

## API Design Checklist

- [ ] Interface designed from caller's perspective
- [ ] No internal types in the public interface
- [ ] Error cases are explicit
- [ ] Breaking changes require a version bump
```

- [ ] **Step 3: Create skills/divergent-fist/SKILL.md**

```markdown
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
```

- [ ] **Step 4: Create skills/jackpot-one-two/SKILL.md**

```markdown
---
name: "Jackpot: One-Two [CI/CD Pipeline Setup]"
description: Sets up automated build, test, and deploy pipelines with correct stage sequencing
trigger: When setting up or modifying CI/CD pipelines, automation workflows, or deployment processes
---

# Jackpot: One-Two [CI/CD Pipeline Setup]

One-two combo. Build then deploy. Automated, reliable, repeatable.

## Pipeline Stages (in order)

Every pipeline follows this sequence. Never skip stages.

```
[Push] → [Install] → [Lint] → [Test] → [Build] → [Deploy]
```

Each stage must pass before the next runs.

## Stage Requirements

| Stage | What It Must Do | Fail If |
|-------|----------------|---------|
| Install | Restore deps from lockfile | Lockfile missing or install fails |
| Lint | Run linter with zero-error policy | Any lint error |
| Test | Run full test suite | Any test fails |
| Build | Produce deployment artifact | Build fails |
| Deploy | Push to target environment | Deployment fails |

## Setup Process

1. Define what "deploy" means: which environment, which artifact
2. Choose a CI platform (GitHub Actions, GitLab CI, etc.)
3. Write the pipeline config — one job per stage
4. Test the pipeline on a branch (not main) first
5. Add status badge to README
6. Set branch protection: merges to main require passing pipeline

## GitHub Actions Template

```yaml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

## Rules

- Use `npm ci` not `npm install` in pipelines (uses lockfile exactly)
- Never commit secrets to pipeline config — use environment variables
- Deploy only from main branch
```

- [ ] **Step 5: Create skills/cleave/SKILL.md**

```markdown
---
name: "Cleave [Managing Breaking Changes]"
description: Handles breaking changes safely with versioning, deprecation warnings, and migration paths
trigger: When making a change that breaks existing consumers, APIs, or published interfaces
---

# Cleave [Managing Breaking Changes]

Cut cleanly. A breaking change handled well is better than one avoided forever.

## What Counts as Breaking

- Removes a function, endpoint, or config option
- Changes the signature of a public function
- Changes the format of a data structure consumers depend on
- Changes default behavior of something previously defined

## Process

### Phase 1: Is It Worth It?
1. How many consumers are affected?
2. Is there a non-breaking alternative that achieves the same goal?
3. If yes: do that instead.

### Phase 2: Version the Break
4. Bump the major version (semver: breaking = major bump)
5. Add a changelog entry describing what broke and why

### Phase 3: Migration Path
6. Write migration documentation: what changed, how to update
7. If possible: provide a codemod or migration script
8. Keep the old behavior available for at least one version under a deprecation warning

### Phase 4: Deprecate Before Removing
9. Mark old behavior as deprecated in the current version
10. Log a deprecation warning when it is used
11. Remove in the next major version

## Deprecation Warning Format

```javascript
console.warn(
  '[limitless] DEPRECATED: `oldFunction()` will be removed in v3.0.0. ' +
  'Use `newFunction()` instead.'
);
```

## Changelog Entry Format

```markdown
## [2.0.0] - YYYY-MM-DD
### Breaking Changes
- `oldFunction()` removed. Use `newFunction()` instead.
```
```

- [ ] **Step 6: Commit batch 2 extended skills**

```bash
git add skills/idle-transfiguration/ skills/de-merger/ skills/divergent-fist/ skills/jackpot-one-two/ skills/cleave/
git commit -m "feat: add extended skills batch 2 (skills 20-24)"
```

---

### Task 8: CLI Entry Point

**Files:**
- Create: `cli/index.js`

- [ ] **Step 1: Create cli/index.js**

```javascript
#!/usr/bin/env node

import { install } from './wizard.js';
import { sync } from './sync.js';
import { changeTheme, getCurrentTheme, paint } from './themes.js';
import { listSkills, showSkillInfo } from './list.js';
import { printHeader } from './ascii.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const args = process.argv.slice(2);
const command = args[0];

const theme = getCurrentTheme();
const p = paint(theme);

switch (command) {
  case undefined:
  case 'install':
    await install();
    break;

  case 'sync':
    await sync();
    break;

  case 'theme':
    await changeTheme();
    break;

  case 'list':
    await listSkills();
    break;

  case 'info':
    if (!args[1]) {
      console.log(p.error('Usage: npx limitless info <skill-name>'));
      console.log(p.dim('Run `npx limitless list` to see all skill names.'));
      process.exit(1);
    }
    await showSkillInfo(args[1]);
    break;

  case '--version':
  case '-v': {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
    console.log(pkg.version);
    break;
  }

  case '--help':
  case '-h':
  default:
    printHeader(theme);
    console.log(p.header('Commands'));
    console.log();
    console.log(`  ${p.primary('npx limitless')}               Interactive setup wizard`);
    console.log(`  ${p.primary('npx limitless install')}       Re-run agent installer`);
    console.log(`  ${p.primary('npx limitless sync')}          Pull skill improvements`);
    console.log(`  ${p.primary('npx limitless theme')}         Change terminal theme`);
    console.log(`  ${p.primary('npx limitless list')}          List all skills`);
    console.log(`  ${p.primary('npx limitless info')} ${p.dim('<name>')}  Show skill details`);
    console.log();
    if (command && !['--help', '-h'].includes(command)) {
      console.log(p.error(`Unknown command: ${command}`));
      process.exit(1);
    }
}
```

- [ ] **Step 2: Make cli/index.js executable**

```bash
chmod +x cli/index.js
```

- [ ] **Step 3: Test --help**

```bash
node cli/index.js --help
```

Expected: ASCII art header + commands list, no errors.

- [ ] **Step 4: Test --version**

```bash
node cli/index.js --version
```

Expected: `1.0.0`

- [ ] **Step 5: Commit**

```bash
git add cli/index.js
git commit -m "feat: add CLI entry point with command routing"
```

---

### Task 9: Agent Installer

**Files:**
- Create: `cli/installer.js`

- [ ] **Step 1: Verify install paths for unverified agents**

For each agent marked "Verify during implementation" in the spec, check official docs:

- **Kiro**: Visit `https://kiro.dev/docs` — find the skills or extensions directory path
- **Amazon Q**: Visit `https://docs.aws.amazon.com/amazonq` — find custom skills path
- **GitHub Copilot CLI**: Visit `https://docs.github.com/en/copilot` — find extensions/skills path
- **Gemini CLI**: Visit `https://github.com/google-gemini/gemini-cli` — find GEMINI.md/skills path
- **OpenAI Codex**: Visit `https://github.com/openai/codex` — find skills path

Update `AGENT_CONFIGS` below with verified paths. Set `path: null` and provide manual `instructions` for any that cannot be verified — the installer will print manual steps instead of failing.

- [ ] **Step 2: Create cli/installer.js**

```javascript
import { existsSync, mkdirSync, readdirSync, cpSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = resolve(__dirname, '..', 'skills');

const AGENT_CONFIGS = {
  'claude-code': {
    name: 'Claude Code',
    path: join(homedir(), '.claude', 'skills'),
    verified: true,
    instructions: null,
  },
  'cursor': {
    name: 'Cursor',
    path: join(homedir(), '.cursor', 'skills'),
    verified: true,
    instructions: null,
  },
  'opencode': {
    name: 'OpenCode',
    path: join(process.cwd(), '.opencode', 'skills'),
    verified: true,
    instructions: null,
  },
  'kiro': {
    name: 'Kiro',
    path: join(homedir(), '.kiro', 'skills'),
    verified: false,
    instructions: 'If this path is wrong, manually copy the skills/ directory to your Kiro skills folder. See https://kiro.dev/docs',
  },
  'amazon-q': {
    name: 'Amazon Q',
    path: join(homedir(), '.aws', 'amazonq', 'skills'),
    verified: false,
    instructions: 'If this path is wrong, manually copy the skills/ directory to your Amazon Q skills folder.',
  },
  'copilot-cli': {
    name: 'GitHub Copilot CLI',
    path: join(homedir(), '.copilot', 'skills'),
    verified: false,
    instructions: 'If this path is wrong, manually copy the skills/ directory to your Copilot CLI skills folder.',
  },
  'gemini-cli': {
    name: 'Gemini CLI',
    path: join(homedir(), '.gemini', 'skills'),
    verified: false,
    instructions: 'If this path is wrong, manually copy the skills/ directory to your Gemini CLI skills folder. See https://github.com/google-gemini/gemini-cli',
  },
  'codex': {
    name: 'OpenAI Codex',
    path: join(homedir(), '.codex', 'skills'),
    verified: false,
    instructions: 'If this path is wrong, manually copy the skills/ directory to your Codex skills folder.',
  },
};

export async function installForAgent(agentId) {
  const config = AGENT_CONFIGS[agentId];
  if (!config) throw new Error(`Unknown agent: ${agentId}`);

  if (!config.path) {
    throw new Error(config.instructions || `No install path configured for ${config.name}`);
  }

  if (!existsSync(config.path)) {
    mkdirSync(config.path, { recursive: true });
  }

  const skillDirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const skillDir of skillDirs) {
    const src = join(SKILLS_DIR, skillDir);
    const dest = join(config.path, skillDir);
    cpSync(src, dest, { recursive: true });
  }

  return {
    skillsInstalled: skillDirs.length,
    path: config.path,
    unverified: !config.verified,
    instructions: config.instructions,
  };
}
```

- [ ] **Step 3: Test installer for Claude Code**

```bash
node -e "
import('./cli/installer.js').then(async ({ installForAgent }) => {
  const result = await installForAgent('claude-code');
  console.log('Installed:', result.skillsInstalled, 'skills to', result.path);
});
"
```

Expected: `Installed: 24 skills to /home/<user>/.claude/skills`

Verify: `ls ~/.claude/skills/ | wc -l` should output `24`.

- [ ] **Step 4: Commit**

```bash
git add cli/installer.js
git commit -m "feat: add agent installer with per-agent path config"
```

---

### Task 10: Install Wizard

**Files:**
- Create: `cli/wizard.js`

- [ ] **Step 1: Create cli/wizard.js**

```javascript
import inquirer from 'inquirer';
import ora from 'ora';
import { getCurrentTheme, paint, saveConfig, loadConfig, allThemes, loadTheme } from './themes.js';
import { printHeader } from './ascii.js';
import { installForAgent } from './installer.js';

const AGENTS = [
  { name: 'Claude Code', value: 'claude-code' },
  { name: 'Cursor', value: 'cursor' },
  { name: 'Kiro', value: 'kiro' },
  { name: 'Amazon Q', value: 'amazon-q' },
  { name: 'GitHub Copilot CLI', value: 'copilot-cli' },
  { name: 'Gemini CLI', value: 'gemini-cli' },
  { name: 'OpenAI Codex', value: 'codex' },
  { name: 'OpenCode', value: 'opencode' },
];

export async function install() {
  const theme = getCurrentTheme();
  const p = paint(theme);

  printHeader(theme);
  console.log(p.primary('Welcome to Limitless.'));
  console.log(p.dim('JJK-themed skills framework for coding agents.'));
  console.log();

  // Theme selection
  const themes = allThemes();
  const { selectedTheme } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTheme',
      message: p.header('Choose your technique (theme):'),
      choices: themes.map(t => ({
        name: `${t.name} — ${t.character}`,
        value: t.id,
      })),
      default: loadConfig().theme || 'infinity',
    }
  ]);

  const config = loadConfig();
  config.theme = selectedTheme;
  saveConfig(config);

  const newTheme = loadTheme(selectedTheme);
  const np = paint(newTheme);
  console.log();
  console.log(np.success(`✓ Theme set: ${newTheme.name} — ${newTheme.character}`));
  console.log();

  // Agent selection
  const { selectedAgents } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedAgents',
      message: np.header('Select agents to install skills into:'),
      choices: AGENTS,
      validate: (answers) => answers.length > 0 || 'Select at least one agent.',
    }
  ]);

  console.log();

  let installed = 0;
  let failed = 0;

  for (const agentId of selectedAgents) {
    const agentName = AGENTS.find(a => a.value === agentId).name;
    const spinner = ora({
      text: np.dim(`${newTheme.spinner.loading} Installing for ${agentName}...`),
      color: 'cyan',
    }).start();

    try {
      const result = await installForAgent(agentId);
      let msg = `${agentName}: ${result.skillsInstalled} skills installed → ${result.path}`;
      if (result.unverified) msg += np.warning(' (path unverified — check if skills loaded)');
      spinner.succeed(np.success(msg));
      if (result.instructions) console.log(np.dim('    ' + result.instructions));
      installed++;
    } catch (err) {
      spinner.fail(np.error(`${agentName}: ${err.message}`));
      failed++;
    }
  }

  console.log();
  console.log(np.divider());
  console.log();

  if (installed > 0) {
    console.log(np.success(`✓ ${installed} agent${installed > 1 ? 's' : ''} configured.`));
  }
  if (failed > 0) {
    console.log(np.warning(`⚠ ${failed} agent${failed > 1 ? 's' : ''} failed. Check paths above.`));
  }
  console.log();
  console.log(np.primary(newTheme.messages.installed));
  console.log();
}
```

- [ ] **Step 2: Smoke test wizard (interactive)**

```bash
node cli/index.js install
```

Walk through the wizard:
1. Select "Infinity" theme
2. Select "Claude Code" only
3. Expected: success message "24 skills installed"

Verify: `ls ~/.claude/skills/cursed-energy/` should show `SKILL.md`.

- [ ] **Step 3: Commit**

```bash
git add cli/wizard.js
git commit -m "feat: add interactive install wizard"
```

---

### Task 11: Upstream Sync

**Files:**
- Create: `cli/sync.js`

- [ ] **Step 1: Create cli/sync.js**

```javascript
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createPatch } from 'diff';
import inquirer from 'inquirer';
import ora from 'ora';
import { getCurrentTheme, paint } from './themes.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = resolve(__dirname, '..', 'skills');

// Maps limitless skill dirs to upstream skill dirs. Extended skills omitted — never synced.
const UPSTREAM_MAP = {
  'cursed-energy': 'using-superpowers',
  'domain-expansion': 'brainstorming',
  'cursed-technique-blue': 'writing-plans',
  'cursed-technique-red': 'executing-plans',
  'black-flash': 'test-driven-development',
  'reverse-cursed-technique': 'systematic-debugging',
  'six-eyes': 'requesting-code-review',
  'shrine': 'receiving-code-review',
  'malevolent-shrine': 'verification-before-completion',
  'ten-shadows': 'subagent-driven-development',
  'chimera-shadow-garden': 'dispatching-parallel-agents',
  'hollow-purple': 'finishing-a-development-branch',
  'barrier-technique': 'using-git-worktrees',
  'innate-technique': 'writing-skills',
};

const UPSTREAM_BASE = 'https://raw.githubusercontent.com/obra/superpowers/main/skills';

async function fetchUpstreamSkill(upstreamName) {
  const url = `${UPSTREAM_BASE}/${upstreamName}/SKILL.md`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} fetching ${upstreamName}`);
  return await response.text();
}

function extractBody(content) {
  const match = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return match ? match[1].trim() : content.trim();
}

function extractFrontmatter(content) {
  const match = content.match(/^(---\n[\s\S]*?\n---\n)/);
  return match ? match[1] : '';
}

function extractLimitlessBlocks(content) {
  const blocks = [];
  const regex = /<!-- limitless -->([\s\S]*?)<!-- \/limitless -->/g;
  let match;
  while ((match = regex.exec(content)) !== null) blocks.push(match[0]);
  return blocks;
}

export async function sync() {
  const theme = getCurrentTheme();
  const p = paint(theme);

  console.log(p.header('Limitless Sync'));
  console.log(p.dim('Checking for upstream skill improvements...'));
  console.log();

  const updates = [];

  for (const [localDir, upstreamName] of Object.entries(UPSTREAM_MAP)) {
    const localPath = join(SKILLS_DIR, localDir, 'SKILL.md');
    if (!existsSync(localPath)) continue;

    const spinner = ora({ text: p.dim(`Checking ${localDir}...`), color: 'cyan' }).start();

    try {
      const upstreamContent = await fetchUpstreamSkill(upstreamName);
      const upstreamBody = extractBody(upstreamContent);
      const localContent = readFileSync(localPath, 'utf8');
      const localFrontmatter = extractFrontmatter(localContent);
      const localBody = extractBody(localContent);
      const limitlessBlocks = extractLimitlessBlocks(localContent);

      if (localBody.trim() === upstreamBody.trim()) {
        spinner.succeed(p.dim(`${localDir}: up to date`));
        continue;
      }

      let newBody = upstreamBody;
      if (limitlessBlocks.length > 0) newBody += '\n\n' + limitlessBlocks.join('\n\n');
      const newContent = localFrontmatter + newBody;

      const patch = createPatch(`skills/${localDir}/SKILL.md`, localContent, newContent, 'current', 'upstream');
      updates.push({ localDir, localPath, newContent, patch });
      spinner.succeed(p.warning(`${localDir}: updates available`));
    } catch (err) {
      spinner.fail(p.error(`${localDir}: ${err.message}`));
    }
  }

  console.log();

  if (updates.length === 0) {
    console.log(p.success('All skills are up to date.'));
    return;
  }

  console.log(p.header(`${updates.length} skill(s) have updates:`));
  console.log();

  for (const update of updates) {
    console.log(p.primary(`── ${update.localDir} ──`));
    console.log(p.dim(update.patch));
    console.log();
  }

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: p.header(`Apply ${updates.length} update(s)?`),
      default: false,
    }
  ]);

  if (!confirm) {
    console.log(p.dim('Sync cancelled.'));
    return;
  }

  for (const update of updates) {
    writeFileSync(update.localPath, update.newContent);
    console.log(p.success(`✓ Updated: ${update.localDir}`));
  }

  console.log();
  console.log(p.success(theme.messages?.synced || 'Sync complete.'));
}
```

- [ ] **Step 2: Test sync**

```bash
node cli/index.js sync
```

Expected: Fetches upstream for each of the 14 core skills, shows "up to date" or diff. Prompts for confirmation. Answer `n` to cancel.

No crash, no unhandled rejections.

- [ ] **Step 3: Commit**

```bash
git add cli/sync.js
git commit -m "feat: add upstream sync with diff preview and confirmation"
```

---

### Task 12: List and Info Commands

**Files:**
- Create: `cli/list.js`

- [ ] **Step 1: Create cli/list.js**

```javascript
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { getCurrentTheme, paint } from './themes.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = resolve(__dirname, '..', 'skills');

function parseSkillMeta(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { name: 'Unknown', description: '', trigger: '' };
  const fm = match[1];
  const name = fm.match(/name:\s*"(.+?)"/)?.[1] || 'Unknown';
  const description = fm.match(/description:\s*(.+)/)?.[1]?.trim() || '';
  const trigger = fm.match(/trigger:\s*(.+)/)?.[1]?.trim() || '';
  return { name, description, trigger };
}

export async function listSkills() {
  const theme = getCurrentTheme();
  const p = paint(theme);

  const skillDirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(p.header('Limitless Skills'));
  console.log(p.dim(`${skillDirs.length} techniques available`));
  console.log();

  for (const dir of skillDirs) {
    const skillPath = join(SKILLS_DIR, dir.name, 'SKILL.md');
    if (!existsSync(skillPath)) continue;
    const content = readFileSync(skillPath, 'utf8');
    const { name, description } = parseSkillMeta(content);
    console.log(`  ${p.primary(name)}`);
    console.log(`  ${p.dim(description)}`);
    console.log();
  }

  console.log(p.dim('Run `npx limitless info <skill-dir-name>` for full details.'));
}

export async function showSkillInfo(skillName) {
  const theme = getCurrentTheme();
  const p = paint(theme);
  const skillPath = join(SKILLS_DIR, skillName, 'SKILL.md');

  if (!existsSync(skillPath)) {
    console.log(p.error(`Skill not found: ${skillName}`));
    console.log(p.dim('Run `npx limitless list` to see available skills.'));
    process.exit(1);
  }

  const content = readFileSync(skillPath, 'utf8');
  const { name, description, trigger } = parseSkillMeta(content);

  console.log(p.header(name));
  console.log();
  console.log(p.primary('Description:  ') + p.accent(description));
  console.log(p.primary('Invoke when:  ') + p.accent(trigger));
  console.log();
  console.log(p.divider());
  console.log();
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  console.log(body);
}
```

- [ ] **Step 2: Test list**

```bash
node cli/index.js list
```

Expected: 24 skills listed, each with JJK name in primary theme color and description in dim color.

- [ ] **Step 3: Test info — valid skill**

```bash
node cli/index.js info domain-expansion
```

Expected: name, description, trigger, divider, full skill body.

- [ ] **Step 4: Test info — invalid skill**

```bash
node cli/index.js info nonexistent-skill
```

Expected: error message, suggestion to run list, exit code 1.

- [ ] **Step 5: Commit**

```bash
git add cli/list.js
git commit -m "feat: add list and info CLI commands"
```

---

### Task 13: End-to-End Smoke Test + README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Run full end-to-end smoke test**

```bash
node cli/index.js --version
```
Expected: `1.0.0`

```bash
node cli/index.js --help
```
Expected: ASCII art + full commands list, no errors.

```bash
node cli/index.js list
```
Expected: 24 skills listed with colored names and descriptions.

```bash
node cli/index.js info black-flash
```
Expected: Black Flash full details with theme colors.

```bash
node cli/index.js info divergent-fist
```
Expected: Divergent Fist full details.

```bash
node cli/index.js info fake-skill-xyz
```
Expected: error message, exit code 1.

```bash
node cli/index.js sync
```
Expected: fetches 14 upstream skills, shows status, prompts — answer `n`.

```bash
node cli/index.js install
```
Walk through: select Infinity, select Claude Code only.
Expected: "24 skills installed" success.

Verify:
```bash
ls ~/.claude/skills/ | wc -l
```
Expected: `24`

- [ ] **Step 2: Create README.md**

```markdown
# Limitless

JJK-themed agentic skills framework for coding agents.

24 techniques. 8 supported agents. One command.

## Install

\`\`\`bash
npx limitless
\`\`\`

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

\`\`\`bash
npx limitless              # Setup wizard
npx limitless install      # Re-run installer
npx limitless sync         # Pull skill improvements
npx limitless theme        # Change theme
npx limitless list         # List all skills
npx limitless info <name>  # Skill details
\`\`\`

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

| Theme | Character |
|-------|-----------|
| Infinity (default) | Gojo Satoru |
| Malevolent Shrine | Ryomen Sukuna |
| Ten Shadows | Fushiguro Megumi |
| Ratio | Nanami Kento |
| Divergent Fist | Itadori Yuji |

## License

MIT
```

- [ ] **Step 3: Final commit and tag**

```bash
git add README.md
git commit -m "docs: add README"
git tag v1.0.0
```

---

## Self-Review

**Spec coverage:**
- ✓ All 14 core skills with complete SKILL.md content (Tasks 4–5)
- ✓ All 10 extended skills with complete SKILL.md content (Tasks 6–7)
- ✓ 5 terminal themes with JSON files + `cli/themes.js` renderer (Task 2)
- ✓ ASCII art headers for each theme (Task 3)
- ✓ All 6 CLI commands: `install`, `sync`, `theme`, `list`, `info`, `--help`/`--version` (Tasks 8, 10–12)
- ✓ Interactive wizard: theme selection → agent multi-select → install (Task 10)
- ✓ All 8 agent install targets in `AGENT_CONFIGS` (Task 9)
- ✓ Upstream sync with diff preview, confirmation prompt, `<!-- limitless -->` block preservation (Task 11)
- ✓ Extended skills protected from sync (not in `UPSTREAM_MAP`)
- ✓ JJK frontmatter preserved during sync (extractFrontmatter)

**Placeholder scan:** No TBDs. Agent paths for unverified agents are flagged in Task 9 Step 1 with specific documentation URLs.

**Type consistency:**
- `installForAgent()` returns `{ skillsInstalled, path, unverified, instructions }` — consumed consistently in `wizard.js`
- `paint(theme)` returns `{ primary, accent, dim, success, error, warning, bold, header, divider }` — same shape used in all CLI modules
- `parseSkillMeta()` returns `{ name, description, trigger }` — used consistently in `list.js`
- `loadTheme(id)` returns theme object with `id`, `name`, `character`, `primary`, `accent`, `dim`, `success`, `error`, `warning`, `spinner`, `messages` — matches all consumers
