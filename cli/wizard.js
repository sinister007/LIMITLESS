import inquirer from 'inquirer';
import ora from 'ora';
import { getCurrentTheme, paint, saveConfig, loadConfig, allThemes, loadTheme, getRandomQuote, createCyclingSpinner } from './themes.js';
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
  console.log(p.dim(getRandomQuote(theme)));
  console.log();
  console.log(p.primary('Welcome to Limitless.'));
  console.log(p.dim('JJK-themed skills framework for coding agents.'));
  console.log();

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
    const spinner = createCyclingSpinner(ora, newTheme, `Installing for ${agentName}...`);

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
