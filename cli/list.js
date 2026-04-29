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
  const name = fm.match(/title:\s*"(.+?)"/)?.[1] || fm.match(/name:\s*"(.+?)"/)?.[1] || 'Unknown';
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
    console.log(`  ${p.dim('limitless')} ${p.primary(name)}`);
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

  console.log(p.dim('limitless') + ' ' + p.header(name));
  console.log();
  console.log(p.primary('Description:  ') + p.accent(description));
  console.log(p.primary('Invoke when:  ') + p.accent(trigger));
  console.log();
  console.log(p.divider());
  console.log();
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  console.log(body);
}
