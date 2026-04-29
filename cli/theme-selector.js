import readline from 'readline';
import { allThemes, paint, getRandomQuote } from './themes.js';
import { printHeader } from './ascii.js';

export async function selectThemeInteractive(currentThemeId = 'infinity') {
  const themes = allThemes();
  let idx = Math.max(0, themes.findIndex(t => t.id === currentThemeId));

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);

  const render = () => {
    console.clear();
    const highlighted = themes[idx];
    printHeader(highlighted);
    const p = paint(highlighted);
    console.log(p.header('Choose your technique:'));
    console.log();
    themes.forEach((t, i) => {
      const isSelected = i === idx;
      const marker = isSelected ? p.primary('❯ ') : '  ';
      const label = isSelected
        ? p.primary(`${t.name}`) + p.dim(` — ${t.character}`)
        : p.dim(`${t.name} — ${t.character}`);
      console.log(marker + label);
    });
    console.log();
    console.log(paint(highlighted).dim('↑ ↓ navigate   Enter select   Ctrl+C exit'));
  };

  render();

  return new Promise((resolve, reject) => {
    function handler(str, key) {
      if (!key) return;
      if (key.ctrl && key.name === 'c') {
        cleanup();
        process.exit(0);
      } else if (key.name === 'up') {
        idx = (idx - 1 + themes.length) % themes.length;
        render();
      } else if (key.name === 'down') {
        idx = (idx + 1) % themes.length;
        render();
      } else if (key.name === 'return') {
        cleanup();
        resolve(themes[idx]);
      }
    }

    function cleanup() {
      if (process.stdin.isTTY) process.stdin.setRawMode(false);
      process.stdin.removeListener('keypress', handler);
    }

    process.stdin.on('keypress', handler);
  });
}
