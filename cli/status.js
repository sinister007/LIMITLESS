#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { Chalk } from 'chalk';

const chalk = new Chalk({ level: 3 });

const CONFIG_PATH = join(homedir(), '.limitless', 'config.json');
const SKILL_PATH = join(homedir(), '.limitless', 'active-skill.txt');

const config = existsSync(CONFIG_PATH)
  ? JSON.parse(readFileSync(CONFIG_PATH, 'utf8'))
  : { theme: 'infinity' };

const activeSkill = existsSync(SKILL_PATH)
  ? readFileSync(SKILL_PATH, 'utf8').trim()
  : '';

if (!activeSkill) process.exit(0);

const SKILL_DESCRIPTIONS = {
  'cursed-energy':            'How to use Limitless',
  'domain-expansion':         'Creative Brainstorming',
  'cursed-technique-blue':    'Implementation Planning',
  'cursed-technique-red':     'Plan Execution',
  'black-flash':              'Test-Driven Development',
  'reverse-cursed-technique': 'Systematic Debugging',
  'six-eyes':                 'Requesting Code Review',
  'shrine':                   'Receiving Code Review',
  'malevolent-shrine':        'Pre-Completion Verification',
  'ten-shadows':              'Subagent-Driven Development',
  'chimera-shadow-garden':    'Parallel Agent Dispatch',
  'hollow-purple':            'Finishing a Dev Branch',
  'barrier-technique':        'Git Worktree Isolation',
  'innate-technique':         'Writing Custom Skills',
  'lapse-blue':               'Code Refactoring',
  'maximum-hollow-purple':    'Full System Architecture',
  'stacked-blue':             'Writing Documentation',
  'ratio':                    'Code Decomposition',
  'prison-realm':             'Dependency Management',
  'idle-transfiguration':     'Legacy Code Modernization',
  'de-merger':                'API Design & Separation',
  'divergent-fist':           'Performance Optimization',
  'jackpot-one-two':          'CI/CD Pipeline Setup',
  'cleave':                   'Managing Breaking Changes',
};

const SKILL_THEME = {
  'domain-expansion':         'infinity',
  'hollow-purple':            'infinity',
  'maximum-hollow-purple':    'infinity',
  'reverse-cursed-technique': 'infinity',
  'six-eyes':                 'infinity',
  'cursed-energy':            'infinity',
  'malevolent-shrine':        'malevolent-shrine',
  'shrine':                   'malevolent-shrine',
  'cleave':                   'malevolent-shrine',
  'ten-shadows':              'ten-shadows',
  'chimera-shadow-garden':    'ten-shadows',
  'barrier-technique':        'ten-shadows',
  'cursed-technique-blue':    'ratio',
  'cursed-technique-red':     'ratio',
  'lapse-blue':               'ratio',
  'stacked-blue':             'ratio',
  'ratio':                    'ratio',
  'black-flash':              'divergent-fist',
  'divergent-fist':           'divergent-fist',
  'jackpot-one-two':          'divergent-fist',
  'idle-transfiguration':     'divergent-fist',
  'de-merger':                'divergent-fist',
  'prison-realm':             'divergent-fist',
  'innate-technique':         'divergent-fist',
};

const ASCII_ART = {
  'infinity': [
    '   ___  ___     _  ___    ___   _ _____ ___  ___ _   _ ',
    '  / __|/ _ \\ _ | |/ _ \\  / __| /_\\_   _/ _ \\| _ \\ | | |',
    ' | (_ | (_) | || | (_) | \\__ \\/ _ \\| || (_) |   / |_| |',
    '  \\___|\\___/ \\__/ \\___/  |___/_/ \\_\\_| \\___/|_|_\\\\___/ ',
  ],
  'malevolent-shrine': [
    '  _____   _____  __  __ ___ _  _   ___ _   _ _  ___   _ _  _   _   ',
    ' | _ \\ \\ / / _ \\|  \\/  | __| \\| | / __| | | | |/ / | | | \\| | /_\\  ',
    ' |   /\\ V / (_) | |\\/| | _|| .` | \\__ \\ |_| | \' <| |_| | .` |/ _ \\ ',
    ' |_|_\\ |_| \\___/|_|  |_|___|_|\\_| |___/\\___/|_|\\_\\\\___/|_|\\_/_/ \\_\\',
  ],
  'ten-shadows': [
    '  ___ _   _ ___ _  _ ___ ___ _   _ ___  ___    __  __ ___ ___ _   _ __  __ ___ ',
    ' | __| | | / __| || |_ _/ __| | | | _ \\/ _ \\  |  \\/  | __/ __| | | |  \\/  |_ _|',
    ' | _|| |_| \\__ \\ __ || | (_ | |_| |   / (_) | | |\\/| | _| (_ | |_| | |\\/| || | ',
    ' |_|  \\___/|___/_||_|___\\___|\\___/|_|_\\\\___/  |_|  |_|___\\___|\\___/|_|  |_|___|',
  ],
  'ratio': [
    '  _  _   _   _  _   _   __  __ ___   _  _____ _  _ _____ ___  ',
    ' | \\| | /_\\ | \\| | /_\\ |  \\/  |_ _| | |/ / __| \\| |_   _/ _ \\ ',
    ' | .` |/ _ \\| .` |/ _ \\| |\\/| || |  | \' <| _|| .` | | || (_) |',
    ' |_|\\_/_/ \\_\\_|\\_/_/ \\_\\_|  |_|___| |_|\\_\\___|_|\\_| |_| \\___/ ',
  ],
  'divergent-fist': [
    '  ___ _____ _   ___   ___  ___ ___  __   ___   _    _ ___ ',
    ' |_ _|_   _/_\\ |   \\ / _ \\| _ \\_ _| \\ \\ / / | | |_ | |_ _|',
    '  | |  | |/ _ \\| |) | (_) |   /| |   \\ V /| |_| | || || | ',
    ' |___| |_/_/ \\_\\___/ \\___/|_|_\\___|   |_|  \\___/ \\__/|___|',
  ],
};

const SUBTITLES = {
  'infinity':          'The Honored One  ·  Gojo Satoru',
  'malevolent-shrine': 'King of Curses  ·  Ryomen Sukuna',
  'ten-shadows':       'Ten Shadows  ·  Fushiguro Megumi',
  'ratio':             '7:3 Ratio  ·  Nanami Kento',
  'divergent-fist':    'Divergent Fist  ·  Itadori Yuji',
};

const THEME_COLORS = {
  'infinity':          ['#7C3AED', '#A78BFA', '#C4B5FD'],
  'malevolent-shrine': ['#DC2626', '#EF4444', '#F59E0B'],
  'ten-shadows':       ['#0F766E', '#14B8A6', '#5EEAD4'],
  'ratio':             ['#D97706', '#F59E0B', '#FCD34D'],
  'divergent-fist':    ['#EA580C', '#F97316', '#FB923C'],
};

const themeId = SKILL_THEME[activeSkill] || config.theme || 'infinity';
const tick = Math.floor(Date.now() / 500);
const frame = tick % 3;

const colors = THEME_COLORS[themeId] || THEME_COLORS['infinity'];
const c0 = colors[frame % colors.length];
const c1 = colors[(frame + 1) % colors.length];
const c2 = colors[(frame + 2) % colors.length];

const art = ASCII_ART[themeId] || ASCII_ART['infinity'];
const subtitle = SUBTITLES[themeId] || '';
const desc = SKILL_DESCRIPTIONS[activeSkill] || activeSkill;
const divider = chalk.hex(c2)('─'.repeat(50));

const output = [
  ...art.map(line => chalk.hex(c0).bold(line)),
  chalk.hex(c1)('  ' + subtitle),
  divider,
  chalk.hex(c1)(`  ◈ ${desc}`) + chalk.hex(c2)(` — limitless:${activeSkill}`),
];

process.stdout.write(output.join('\n') + '\n');
