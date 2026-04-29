#!/usr/bin/env node

import { install } from './wizard.js';
import { sync } from './sync.js';
import { changeTheme, getCurrentTheme, paint } from './themes.js';
import { listSkills, showSkillInfo } from './list.js';
import { printHeader } from './ascii.js';
import { runSession } from './session.js';
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

  case 'run':
    if (!args[1]) {
      console.log(p.error('Usage: npx limitless run <skill-name>'));
      console.log(p.dim('Run `npx limitless list` to see all skill names.'));
      process.exit(1);
    }
    await runSession(args[1]);
    break;

  case '--version':
  case '-v': {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
    console.log(pkg.version);
    break;
  }

  case '--help':
  case '-h':
    printHeader(theme);
    console.log(p.header('Commands'));
    console.log();
    console.log(`  ${p.primary('npx limitless')}                    Interactive setup wizard`);
    console.log(`  ${p.primary('npx limitless install')}            Re-run agent installer`);
    console.log(`  ${p.primary('npx limitless sync')}               Pull skill improvements`);
    console.log(`  ${p.primary('npx limitless theme')}              Change terminal theme`);
    console.log(`  ${p.primary('npx limitless list')}               List all skills`);
    console.log(`  ${p.primary('npx limitless info')} ${p.dim('<name>')}       Show skill details`);
    console.log(`  ${p.primary('npx limitless run')} ${p.dim('<name>')}        Run interactive skill session`);
    console.log();
    break;

  default:
    printHeader(theme);
    console.log(p.error(`Unknown command: ${command}`));
    console.log();
    console.log(p.dim('Run `npx limitless --help` for available commands.'));
    process.exit(1);
}
