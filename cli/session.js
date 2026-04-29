import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import { getCurrentTheme, paint } from './themes.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = resolve(__dirname, '..', 'skills');

function parseSkillContent(content) {
  // Strip frontmatter
  const body = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();

  // Split into sections by ## headings
  const sections = [];
  const lines = body.split('\n');
  let currentSection = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentSection) sections.push(currentSection);
      currentSection = { heading: line.replace('## ', '').trim(), lines: [] };
    } else if (line.startsWith('# ')) {
      // Top-level heading — treat as title, skip
    } else {
      if (currentSection) currentSection.lines.push(line);
    }
  }
  if (currentSection) sections.push(currentSection);

  return sections;
}

function extractChecklistItems(lines) {
  return lines
    .filter(l => l.match(/^[-*]\s+\*\*[^*]+\*\*|^[-*]\s+`[^`]+`|^\d+\.\s+\*\*[^*]+\*\*/))
    .map(l => l.replace(/^[-*\d.]+\s+/, '').replace(/\*\*/g, '').replace(/`/g, '').trim())
    .filter(Boolean);
}

function extractTableRows(lines) {
  const tableLines = lines.filter(l => l.startsWith('|') && !l.match(/^\|[-| ]+\|$/));
  if (tableLines.length < 2) return [];
  // Skip header row
  return tableLines.slice(1).map(l => {
    const cols = l.split('|').map(c => c.trim()).filter(Boolean);
    return cols.join(' → ');
  });
}

function buildChoicesForSection(section) {
  const choices = [];

  // Look for numbered steps
  const steps = section.lines.filter(l => /^\d+\./.test(l));
  if (steps.length > 0) {
    choices.push(...steps.map(l => l.replace(/^\d+\.\s+/, '').replace(/\*\*/g, '').trim()));
  }

  // Look for bullet list items that are meaningful (not just sub-bullets)
  const bullets = section.lines.filter(l => /^[-*]\s+[A-Z`\*]/.test(l) && !l.includes('[ ]'));
  if (bullets.length > 0 && choices.length === 0) {
    choices.push(...bullets.map(l => l.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim()));
  }

  // Table rows
  if (choices.length === 0) {
    choices.push(...extractTableRows(section.lines));
  }

  return choices.slice(0, 8); // cap at 8 choices
}

export async function runSession(skillName) {
  const theme = getCurrentTheme();
  const p = paint(theme);
  const skillPath = join(SKILLS_DIR, skillName, 'SKILL.md');

  if (!existsSync(skillPath)) {
    console.log(p.error(`Skill not found: ${skillName}`));
    console.log(p.dim('Run `npx limitless list` to see available skills.'));
    process.exit(1);
  }

  const content = readFileSync(skillPath, 'utf8');
  const sections = parseSkillContent(content);

  // Extract skill name from frontmatter
  const nameMatch = content.match(/name:\s*"(.+?)"/);
  const skillTitle = nameMatch ? nameMatch[1] : skillName;

  console.log();
  console.log(p.header(skillTitle));
  console.log(p.dim('Interactive session — work through each section'));
  console.log(p.divider());
  console.log();

  const sessionLog = [];

  for (const section of sections) {
    const sectionText = section.lines.join('\n').trim();
    if (!sectionText) continue;

    console.log(p.primary(`[ ${section.heading} ]`));
    console.log();

    // Print section content (non-interactive display)
    for (const line of section.lines) {
      if (line.trim()) {
        console.log(p.dim(line));
      } else {
        console.log();
      }
    }
    console.log();

    const choices = buildChoicesForSection(section);

    if (choices.length > 0) {
      // Offer selectable options + custom input
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: p.accent(`How will you apply "${section.heading}"?`),
          choices: [
            ...choices.map(c => ({ name: c, value: c })),
            new inquirer.Separator(),
            { name: '✏  Type my own approach', value: '__custom__' },
            { name: '⏭  Skip this section', value: '__skip__' },
          ],
        }
      ]);

      if (action === '__skip__') {
        console.log(p.dim('  → skipped'));
      } else if (action === '__custom__') {
        const { customAnswer } = await inquirer.prompt([
          {
            type: 'input',
            name: 'customAnswer',
            message: p.accent('Your approach:'),
          }
        ]);
        if (customAnswer.trim()) {
          sessionLog.push({ section: section.heading, answer: customAnswer.trim() });
          console.log(p.success(`  → ${customAnswer.trim()}`));
        }
      } else {
        sessionLog.push({ section: section.heading, answer: action });
        console.log(p.success(`  → ${action}`));
      }
    } else {
      // No extractable choices — ask open-ended
      const { response } = await inquirer.prompt([
        {
          type: 'list',
          name: 'response',
          message: p.accent(`Section "${section.heading}" — ready to proceed?`),
          choices: [
            { name: 'Yes, understood', value: 'understood' },
            { name: 'Add a note', value: 'note' },
            { name: 'Skip', value: 'skip' },
          ],
        }
      ]);

      if (response === 'note') {
        const { note } = await inquirer.prompt([
          {
            type: 'input',
            name: 'note',
            message: p.accent('Your note:'),
          }
        ]);
        if (note.trim()) {
          sessionLog.push({ section: section.heading, answer: note.trim() });
          console.log(p.success(`  → ${note.trim()}`));
        }
      } else if (response === 'skip') {
        console.log(p.dim('  → skipped'));
      } else {
        sessionLog.push({ section: section.heading, answer: 'understood' });
      }
    }

    console.log();
  }

  // Session summary
  console.log(p.divider());
  console.log();
  console.log(p.header('Session Summary'));
  console.log();

  if (sessionLog.length === 0) {
    console.log(p.dim('No notes captured.'));
  } else {
    for (const entry of sessionLog) {
      console.log(p.primary(`${entry.section}:`));
      console.log(`  ${p.accent(entry.answer)}`);
      console.log();
    }
  }

  console.log(p.success('Technique activated.'));
  console.log();
}
