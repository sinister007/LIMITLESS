import { existsSync, mkdirSync, readdirSync, cpSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = resolve(__dirname, '..', 'skills');

const AGENT_CONFIGS = {
  'claude-code': {
    name: 'Claude Code',
    path: join(homedir(), '.claude', 'plugins', 'limitless', 'skills'),
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
