import { paint, getRandomQuote } from './themes.js';

const ART = {
  'infinity': `
██╗     ██╗███╗   ███╗██╗████████╗██╗     ███████╗███████╗███████╗
██║     ██║████╗ ████║██║╚══██╔══╝██║     ██╔════╝██╔════╝██╔════╝
██║     ██║██╔████╔██║██║   ██║   ██║     █████╗  ███████╗███████╗
██║     ██║██║╚██╔╝██║██║   ██║   ██║     ██╔══╝  ╚════██║╚════██║
███████╗██║██║ ╚═╝ ██║██║   ██║   ███████╗███████╗███████║███████║
╚══════╝╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚══════╝╚══════╝╚══════╝╚══════╝`,
  'malevolent-shrine': `
╔╦╗╔═╗╦  ╔═╗╦  ╦╔═╗╦  ╔═╗╔╗╔╔╦╗  ╔═╗╦ ╦╦═╗╦╔╗╔╔═╗
║║║╠═╣║  ║╣ ╚╗╔╝║ ║║  ║╣ ║║║ ║   ╚═╗╠═╣╠╦╝║║║║║╣
╩ ╩╩ ╩╩═╝╚═╝ ╚╝ ╚═╝╩═╝╚═╝╝╚╝ ╩   ╚═╝╩ ╩╩╚═╩╝╚╝╚═╝`,
  'ten-shadows': `
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
█░  L I M I T L E S S              ░█
█░  T E N  S H A D O W S           ░█
█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`,
  'ratio': `
┌──────────────────────────────────────┐
│   L I M I T L E S S                 │
│   ── Ratio ─ 7:3 ─ Nanami Kento ─  │
└──────────────────────────────────────┘`,
  'divergent-fist': `
 _     _____ __  __ ___ _____ _     _____ ____ ____
| |   |_   _|  \\/  |_ _|_   _| |   | ____/ ___/ ___|
| |     | | | |\\/| || |  | | | |   |  _| \\___ \\___ \\
| |___  | | | |  | || |  | | | |___| |___ ___) |__) |
|_____| |_| |_|  |_|___| |_| |_____|_____|____/____/`
};

const SUBTITLES = {
  'infinity': 'The Honored One  ·  Gojo Satoru',
  'malevolent-shrine': 'King of Curses  ·  Ryomen Sukuna',
  'ten-shadows': 'Ten Shadows  ·  Fushiguro Megumi',
  'ratio': '7:3 Ratio  ·  Nanami Kento',
  'divergent-fist': 'Divergent Fist  ·  Itadori Yuji'
};

export function printHeader(theme) {
  const p = paint(theme);
  const art = ART[theme.id] || ART['infinity'];
  const subtitle = SUBTITLES[theme.id] || '';
  console.log(p.primary(art));
  console.log(p.dim('  ' + subtitle));
  console.log();
  console.log(p.divider());
  const quote = getRandomQuote(theme);
  if (quote) {
    console.log(p.dim(`  "${quote}"`));
    console.log();
  }
}
