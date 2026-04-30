#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import chalk from 'chalk';

const CONFIG_PATH = join(homedir(), '.limitless', 'config.json');
const SKILL_PATH = join(homedir(), '.limitless', 'active-skill.txt');

const config = existsSync(CONFIG_PATH)
  ? JSON.parse(readFileSync(CONFIG_PATH, 'utf8'))
  : { theme: 'infinity' };

const activeSkill = existsSync(SKILL_PATH)
  ? readFileSync(SKILL_PATH, 'utf8').trim()
  : '';

const SKILL_THEME = {
  'domain-expansion': 'infinity',
  'hollow-purple': 'infinity',
  'maximum-hollow-purple': 'infinity',
  'reverse-cursed-technique': 'infinity',
  'six-eyes': 'infinity',
  'cursed-energy': 'infinity',
  'malevolent-shrine': 'malevolent-shrine',
  'shrine': 'malevolent-shrine',
  'cleave': 'malevolent-shrine',
  'ratio': 'malevolent-shrine',
  'ten-shadows': 'ten-shadows',
  'chimera-shadow-garden': 'ten-shadows',
  'barrier-technique': 'ten-shadows',
  'cursed-technique-blue': 'ratio',
  'cursed-technique-red': 'ratio',
  'lapse-blue': 'ratio',
  'stacked-blue': 'ratio',
  'black-flash': 'divergent-fist',
  'divergent-fist': 'divergent-fist',
  'jackpot-one-two': 'divergent-fist',
  'idle-transfiguration': 'divergent-fist',
  'de-merger': 'divergent-fist',
  'prison-realm': 'divergent-fist',
  'innate-technique': 'divergent-fist',
  'malevolent-shrine-skill': 'malevolent-shrine',
  'maximum-hollow-purple-skill': 'infinity',
  'ten-shadows-skill': 'ten-shadows',
};

const themeId = SKILL_THEME[activeSkill] || config.theme || 'infinity';
const frame = Math.floor(Date.now() / 600) % 2;

const THEMES = {
  infinity: {
    color: '#7C3AED',
    dim: '#A78BFA',
    accent: '#FFFFFF',
    character: 'GOJO SATORU',
    title: 'The Honored One',
    frames: [
      [
        '  ∞━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━∞  ',
        '  ◉  GOJO SATORU  ·  The Honored One  ◉  ',
        '  ∞━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━∞  ',
      ],
      [
        '  ○━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━○  ',
        '  ◎  GOJO SATORU  ·  The Honored One  ◎  ',
        '  ○━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━○  ',
      ],
    ],
  },
  'malevolent-shrine': {
    color: '#DC2626',
    dim: '#7F1D1D',
    accent: '#F59E0B',
    character: 'RYOMEN SUKUNA',
    title: 'King of Curses',
    frames: [
      [
        '  ⚡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚡  ',
        '  ✦  RYOMEN SUKUNA  ·  King of Curses  ✦  ',
        '  ⚡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⚡  ',
      ],
      [
        '  ✦━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦  ',
        '  ⚡  RYOMEN SUKUNA  ·  King of Curses  ⚡  ',
        '  ✦━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦  ',
      ],
    ],
  },
  'ten-shadows': {
    color: '#0F766E',
    dim: '#134E4A',
    accent: '#CBD5E1',
    character: 'FUSHIGURO MEGUMI',
    title: 'Ten Shadows',
    frames: [
      [
        '  ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆  ',
        '  ◈  FUSHIGURO MEGUMI  ·  Ten Shadows  ◈  ',
        '  ◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆  ',
      ],
      [
        '  ◇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◇  ',
        '  ◆  FUSHIGURO MEGUMI  ·  Ten Shadows  ◆  ',
        '  ◇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◇  ',
      ],
    ],
  },
  ratio: {
    color: '#D97706',
    dim: '#92400E',
    accent: '#374151',
    character: 'NANAMI KENTO',
    title: '7:3 Ratio',
    frames: [
      [
        '  ▬━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▬  ',
        '  ▪  NANAMI KENTO  ·  7:3 Ratio  ▪  ',
        '  ▬━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▬  ',
      ],
      [
        '  ═━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━═  ',
        '  ▬  NANAMI KENTO  ·  7:3 Ratio  ▬  ',
        '  ═━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━═  ',
      ],
    ],
  },
  'divergent-fist': {
    color: '#EA580C',
    dim: '#9A3412',
    accent: '#1E3A5F',
    character: 'ITADORI YUJI',
    title: 'Divergent Fist',
    frames: [
      [
        '  ★━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━★  ',
        '  ✸  ITADORI YUJI  ·  Divergent Fist  ✸  ',
        '  ★━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━★  ',
      ],
      [
        '  ✸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✸  ',
        '  ★  ITADORI YUJI  ·  Divergent Fist  ★  ',
        '  ✸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✸  ',
      ],
    ],
  },
};

const t = THEMES[themeId] || THEMES.infinity;
const lines = t.frames[frame];

const skillLabel = activeSkill
  ? chalk.hex(t.accent).bold(` ❯ limitless:${activeSkill} `)
  : chalk.hex(t.dim)(' ❯ limitless ');

const output = [
  chalk.hex(t.color)(lines[0]),
  chalk.hex(t.color)(lines[1]) + skillLabel,
  chalk.hex(t.color)(lines[2]),
].join('\n');

process.stdout.write(output + '\n');
