import { existsSync, mkdirSync, readdirSync, cpSync, readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = resolve(__dirname, '..', 'skills');
const PKG = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8'));
const VERSION = PKG.version;

const AGENT_CONFIGS = {
  'claude-code': {
    name: 'Claude Code',
    path: null, // handled specially via installClaudeCode()
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

async function installClaudeCode(skillDirs) {
  const pluginCachePath = join(homedir(), '.claude', 'plugins', 'cache', 'vahabpv', 'limitless', VERSION);
  const skillsPath = join(pluginCachePath, 'skills');
  const manifestPath = join(pluginCachePath, '.claude-plugin');
  const registryPath = join(homedir(), '.claude', 'plugins', 'installed_plugins.json');

  // Create directories
  mkdirSync(skillsPath, { recursive: true });
  mkdirSync(manifestPath, { recursive: true });

  // Copy skills
  for (const skillDir of skillDirs) {
    cpSync(join(SKILLS_DIR, skillDir), join(skillsPath, skillDir), { recursive: true });
  }

  // Write package.json
  writeFileSync(join(pluginCachePath, 'package.json'), JSON.stringify({
    name: 'limitless',
    version: VERSION,
    type: 'module',
  }, null, 2));

  // Write .claude-plugin/plugin.json
  writeFileSync(join(manifestPath, 'plugin.json'), JSON.stringify({
    name: 'limitless',
    description: 'JJK-themed agentic skills framework — 24 techniques for coding agents',
    version: VERSION,
    author: { name: 'vahabpv' },
    homepage: 'https://github.com/sinister007/LIMITLESS',
    repository: 'https://github.com/sinister007/LIMITLESS',
    license: 'MIT',
    keywords: ['skills', 'jujutsu-kaisen', 'ai', 'coding-agent'],
  }, null, 2));

  // Write .claude-plugin/marketplace.json
  writeFileSync(join(manifestPath, 'marketplace.json'), JSON.stringify({
    name: 'limitless-marketplace',
    description: 'Limitless JJK skills marketplace',
    owner: { name: 'vahabpv' },
    plugins: [{
      name: 'limitless',
      description: 'JJK-themed agentic skills framework — 24 techniques for coding agents',
      version: VERSION,
      source: './',
      author: { name: 'vahabpv' },
    }],
  }, null, 2));

  // Register in installed_plugins.json
  let registry = { version: 2, plugins: {} };
  if (existsSync(registryPath)) {
    try { registry = JSON.parse(readFileSync(registryPath, 'utf8')); } catch {}
  }

  const now = new Date().toISOString();
  registry.plugins['limitless@vahabpv'] = [{
    scope: 'user',
    installPath: pluginCachePath,
    version: VERSION,
    installedAt: now,
    lastUpdated: now,
    gitCommitSha: VERSION.replace(/\./g, '') + '0'.repeat(32),
  }];

  writeFileSync(registryPath, JSON.stringify(registry, null, 2));

  return {
    skillsInstalled: skillDirs.length,
    path: skillsPath,
    unverified: false,
    instructions: null,
  };
}

export async function installForAgent(agentId) {
  const config = AGENT_CONFIGS[agentId];
  if (!config) throw new Error(`Unknown agent: ${agentId}`);

  const skillDirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  if (agentId === 'claude-code') {
    return installClaudeCode(skillDirs);
  }

  if (!config.path) {
    throw new Error(config.instructions || `No install path configured for ${config.name}`);
  }

  if (!existsSync(config.path)) {
    mkdirSync(config.path, { recursive: true });
  }

  for (const skillDir of skillDirs) {
    cpSync(join(SKILLS_DIR, skillDir), join(config.path, skillDir), { recursive: true });
  }

  return {
    skillsInstalled: skillDirs.length,
    path: config.path,
    unverified: !config.verified,
    instructions: config.instructions,
  };
}
