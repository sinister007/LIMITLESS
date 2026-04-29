import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createPatch } from 'diff';
import inquirer from 'inquirer';
import ora from 'ora';
import { getCurrentTheme, paint, createCyclingSpinner } from './themes.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = resolve(__dirname, '..', 'skills');

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

    const spinner = createCyclingSpinner(ora, theme, `Checking ${localDir}...`);

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
