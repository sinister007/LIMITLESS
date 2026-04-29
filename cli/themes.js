import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import chalk from 'chalk';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONFIG_PATH = join(homedir(), '.limitless', 'config.json');
const THEMES_DIR = join(__dirname, '..', 'themes');

const THEME_IDS = ['infinity', 'malevolent-shrine', 'ten-shadows', 'ratio', 'divergent-fist'];

export function loadTheme(id = 'infinity') {
  const themePath = join(THEMES_DIR, `${id}.json`);
  if (!existsSync(themePath)) return loadTheme('infinity');
  return JSON.parse(readFileSync(themePath, 'utf8'));
}

export function loadConfig() {
  if (!existsSync(CONFIG_PATH)) return { theme: 'infinity' };
  try {
    return JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    return { theme: 'infinity' };
  }
}

export function saveConfig(config) {
  const dir = join(homedir(), '.limitless');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function getCurrentTheme() {
  const config = loadConfig();
  return loadTheme(config.theme);
}

export function paint(theme) {
  return {
    primary: (text) => chalk.hex(theme.primary)(text),
    accent: (text) => chalk.hex(theme.accent)(text),
    dim: (text) => chalk.hex(theme.dim)(text),
    success: (text) => chalk.hex(theme.success)(text),
    error: (text) => chalk.hex(theme.error)(text),
    warning: (text) => chalk.hex(theme.warning)(text),
    bold: (text) => chalk.bold(text),
    header: (text) => chalk.bold.hex(theme.primary)(text),
    divider: () => chalk.hex(theme.dim)('─'.repeat(50)),
  };
}

export function allThemes() {
  return THEME_IDS.map(id => loadTheme(id));
}

export function getRandomQuote(theme) {
  const quotes = theme.quotes;
  if (!quotes || quotes.length === 0) return theme.messages?.welcome || '';
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function createCyclingSpinner(ora, theme, initialText) {
  const messages = theme.spinnerMessages || [initialText || theme.spinner?.loading || 'Loading...'];
  let idx = 0;
  const spinner = ora({ text: messages[0], color: 'cyan' }).start();
  const interval = setInterval(() => {
    idx = (idx + 1) % messages.length;
    spinner.text = messages[idx];
  }, 1500);
  spinner._cycleInterval = interval;

  const originalSucceed = spinner.succeed.bind(spinner);
  const originalFail = spinner.fail.bind(spinner);
  const originalStop = spinner.stop.bind(spinner);

  spinner.succeed = (text) => { clearInterval(interval); return originalSucceed(text); };
  spinner.fail = (text) => { clearInterval(interval); return originalFail(text); };
  spinner.stop = () => { clearInterval(interval); return originalStop(); };

  return spinner;
}

export async function changeTheme() {
  const { selectThemeInteractive } = await import('./theme-selector.js');
  const currentConfig = loadConfig();

  const selectedThemeObj = await selectThemeInteractive(currentConfig.theme || 'infinity');

  console.clear();
  currentConfig.theme = selectedThemeObj.id;
  saveConfig(currentConfig);

  const np = paint(selectedThemeObj);
  console.log();
  console.log(np.success(`✓ Theme changed to: ${selectedThemeObj.name} — ${selectedThemeObj.character}`));
  console.log(np.primary(selectedThemeObj.messages.welcome));
  console.log();
}
