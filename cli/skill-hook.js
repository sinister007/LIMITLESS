#!/usr/bin/env node
// Claude Code PreToolUse hook — writes active limitless skill to ~/.limitless/active-skill.txt
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw);
    const skill = input?.tool_input?.skill || input?.skill || '';
    if (skill.startsWith('limitless:')) {
      const skillName = skill.replace('limitless:', '');
      const dir = join(homedir(), '.limitless');
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'active-skill.txt'), skillName, 'utf8');
    }
  } catch {}
  process.exit(0);
});
