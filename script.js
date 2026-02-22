/* ═════════════════════════════════════════════════════════════════
   GEORGE JOJO — CYBERSECURITY PORTFOLIO
   script.js | Vanilla JS | Matrix + Terminal Engine
   ═════════════════════════════════════════════════════════════════ */

'use strict';

/* ───────────────────────────────────────────────────────────────
   1. MATRIX RAIN ANIMATION
─────────────────────────────────────────────────────────────────*/
(function initMatrix() {
  const canvas  = document.getElementById('matrix-canvas');
  const ctx     = canvas.getContext('2d');
  const CHARS   = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`';
  const FONT_SZ = 16;
  const FPS     = 30;
  const DURATION_MS = 5000;   // matrix runs for 5 seconds
  const FADE_MS     = 1200;   // CSS transition duration

  let cols, drops, animId;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / FONT_SZ);
    drops = new Array(cols).fill(1);
  }

  function draw() {
    // Semi-transparent black creates the fading trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font      = `${FONT_SZ}px monospace`;
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur  = 8;

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * FONT_SZ;
      const y = drops[i] * FONT_SZ;

      // Leading character is bright white for depth
      ctx.fillStyle = (Math.random() > 0.95) ? '#ffffff' : '#00ff00';
      ctx.fillText(char, x, y);

      // Reset drop randomly or when off screen
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function start() {
    resize();
    window.addEventListener('resize', resize);

    let last = 0;
    const interval = 1000 / FPS;

    function loop(ts) {
      animId = requestAnimationFrame(loop);
      if (ts - last < interval) return;
      last = ts;
      draw();
    }
    animId = requestAnimationFrame(loop);

    // After DURATION_MS, fade out matrix and show terminal
    setTimeout(() => {
      canvas.classList.add('fading');
      cancelAnimationFrame(animId);
      // Wait for CSS fade to finish, then show terminal
      setTimeout(showTerminal, FADE_MS);
    }, DURATION_MS);
  }

  start();
})();


/* ───────────────────────────────────────────────────────────────
   2. TERMINAL BOOT + INTERFACE
─────────────────────────────────────────────────────────────────*/

// ── DOM references ──
const terminalWrapper = document.getElementById('terminal-wrapper');
const outputArea      = document.getElementById('output-area');
const cmdInput        = document.getElementById('cmd-input');
const typedText       = document.getElementById('typed-text');

// ── State ──
let cmdHistory    = [];   // stores past commands
let historyIndex  = -1;   // pointer for arrow-key navigation
let inputLocked   = false; // prevent input while response is typing

// ── Boot message lines ──
const BOOT_LINES = [
  '',
  '  ██████╗ ███████╗ ██████╗ ██████╗  ██████╗ ███████╗',
  '  ██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝',
  '  ██║     █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  ',
  '  ██║     ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  ',
  '  ╚██████╗███████╗╚██████╔╝██║  ██║╚██████╔╝███████╗',
  '   ╚═════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝',
  '',
  '  George Jojo | Cybersecurity Portfolio v1.0',
  '  [ Bug Hunter | Penetration Tester | CSE Student ]',
  '',
  '  Type  help  to see available commands.',
  '',
];

/* ───────────────────────────────────────────────────────────────
   3. COMMAND DEFINITIONS
─────────────────────────────────────────────────────────────────*/
const COMMANDS = {

  help: () => [
    '┌─────────────────────────────────────────────┐',
    '│              AVAILABLE COMMANDS             │',
    '└─────────────────────────────────────────────┘',
    '',
    '  <cmd>whoami    </cmd><desc>→ About me</desc>',
    '  <cmd>ls        </cmd><desc>→ List projects</desc>',
    '  <cmd>projects  </cmd><desc>→ Project details</desc>',
    '  <cmd>contact   </cmd><desc>→ Get in touch</desc>',
    '  <cmd>clear     </cmd><desc>→ Clear terminal</desc>',
    '  <cmd>help      </cmd><desc>→ Show this menu</desc>',
    '',
  ],

  whoami: () => [
    '',
    '  ┌──────────────────────────────────────────┐',
    '  │              IDENTITY                    │',
    '  └──────────────────────────────────────────┘',
    '',
    '  Name    : George Jojo',
    '  Role    : B.Tech CSE Student',
    '  Focus   : Cybersecurity Enthusiast | Bug Hunter',
    '',
    '  Skills  :',
    '   ► Kali Linux',
    '   ► Burp Suite',
    '   ► Subdomain Enumeration',
    '   ► Cross-Site Scripting (XSS)',
    '   ► Insecure Direct Object Reference (IDOR)',
    '',
  ],

  ls: () => [
    '',
    '  projects/',
    '    ├── subdomain-enumeration/',
    '    ├── xss-lab/',
    '    ├── idor-testing/',
    '    └── android-secure-app/',
    '',
    '  [ Run  projects  for details ]',
    '',
  ],

  projects: () => [
    '',
    '  ┌──────────────────────────────────────────┐',
    '  │              PROJECTS                    │',
    '  └──────────────────────────────────────────┘',
    '',
    '  01. subdomain-enumeration',
    '      Automated subdomain discovery and',
    '      takeover detection toolkit.',
    '',
    '  02. xss-lab',
    '      Practical reflected and stored XSS',
    '      testing lab environment.',
    '',
    '  03. idor-testing',
    '      Access control vulnerability testing',
    '      project with real-world scenarios.',
    '',
    '  04. android-secure-app',
    '      Secure authentication Android',
    '      application with OWASP best practices.',
    '',
  ],

  contact: () => [
    '',
    '  ┌──────────────────────────────────────────┐',
    '  │              CONTACT                     │',
    '  └──────────────────────────────────────────┘',
    '',
    '  Email   : your-email@example.com',
    '  Twitter : @Georgejojo4567',
    '',
    '  [ DMs open for bug bounty collabs & CTFs ]',
    '',
  ],

  clear: () => {
    outputArea.innerHTML = '';
    return null; // null = no output to render
  },
};


/* ───────────────────────────────────────────────────────────────
   4. SHOW TERMINAL  (called after matrix fades)
─────────────────────────────────────────────────────────────────*/
function showTerminal() {
  terminalWrapper.classList.add('visible');
  cmdInput.focus();

  // Print boot lines with a staggered delay
  printBootSequence(BOOT_LINES, () => {
    // After boot text, terminal is ready
    scrollToBottom();
  });
}


/* ───────────────────────────────────────────────────────────────
   5. BOOT SEQUENCE — line by line
─────────────────────────────────────────────────────────────────*/
function printBootSequence(lines, onDone) {
  let i = 0;
  const isBanner = (line) => line.trim().startsWith('█') || line.includes('╗') || line.includes('╝') || line.includes('║');

  function printNext() {
    if (i >= lines.length) {
      if (onDone) onDone();
      return;
    }
    const line = lines[i++];
    const span = document.createElement('span');
    span.className = isBanner(line) ? 'boot-line boot-banner' : 'boot-line';
    span.textContent = line;
    outputArea.appendChild(span);
    outputArea.appendChild(document.createElement('br'));
    scrollToBottom();
    setTimeout(printNext, 45);
  }
  printNext();
}


/* ───────────────────────────────────────────────────────────────
   6. PROCESS A COMMAND
─────────────────────────────────────────────────────────────────*/
function processCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  // Add to history
  cmdHistory.unshift(cmd);
  historyIndex = -1;

  // Print echoed line
  const block = document.createElement('div');
  block.className = 'cmd-block';

  const echo = document.createElement('div');
  echo.className = 'cmd-echo';
  echo.textContent = `root@george:~$ ${raw}`;
  block.appendChild(echo);
  outputArea.appendChild(block);

  // Execute
  if (cmd in COMMANDS) {
    const result = COMMANDS[cmd]();
    if (result !== null && result !== undefined) {
      typeLines(result, block);
    } else {
      scrollToBottom();
    }
  } else {
    const errDiv = document.createElement('div');
    errDiv.className = 'cmd-response cmd-error';
    errDiv.textContent = `bash: ${cmd}: command not found`;
    block.appendChild(errDiv);
    scrollToBottom();
  }
}


/* ───────────────────────────────────────────────────────────────
   7. TYPING ANIMATION  — prints lines one character at a time
─────────────────────────────────────────────────────────────────*/
function typeLines(lines, container) {
  inputLocked = true;
  const responseDiv = document.createElement('div');
  responseDiv.className = 'cmd-response';
  container.appendChild(responseDiv);

  let lineIdx = 0;
  let charIdx = 0;

  // Speed: characters per ms (fast but visible)
  const CHAR_DELAY = 8;
  const LINE_DELAY = 18;

  function typeChar() {
    if (lineIdx >= lines.length) {
      inputLocked = false;
      scrollToBottom();
      return;
    }

    const line = lines[lineIdx];

    if (charIdx < line.length) {
      // Build current line text progressively
      updateResponseLine(responseDiv, lines, lineIdx, charIdx + 1);
      charIdx++;
      scrollToBottom();
      setTimeout(typeChar, CHAR_DELAY);
    } else {
      // Move to next line
      lineIdx++;
      charIdx = 0;
      setTimeout(typeChar, LINE_DELAY);
    }
  }

  typeChar();
}


/* ───────────────────────────────────────────────────────────────
   8. RENDER RESPONSE WITH TAG SUBSTITUTION
   <cmd>text</cmd>  → highlighted command
   <desc>text</desc>→ dimmer description
─────────────────────────────────────────────────────────────────*/
function updateResponseLine(container, lines, currentLine, charCount) {
  let html = '';
  for (let i = 0; i < currentLine; i++) {
    html += renderLine(lines[i]) + '\n';
  }
  // Partial current line
  const partialRaw = lines[currentLine].slice(0, charCount);
  html += renderLine(partialRaw);
  container.innerHTML = html;
}

function renderLine(raw) {
  // Replace <cmd>...</cmd>
  let out = raw
    .replace(/<cmd>(.*?)<\/cmd>/g, '<span class="highlight">$1</span>')
    .replace(/<desc>(.*?)<\/desc>/g, '<span class="help-desc">$1</span>');
  return out;
}


/* ───────────────────────────────────────────────────────────────
   9. SCROLL HELPER
─────────────────────────────────────────────────────────────────*/
function scrollToBottom() {
  const body = document.getElementById('terminal-body');
  body.scrollTop = body.scrollHeight;
}


/* ───────────────────────────────────────────────────────────────
   10. INPUT HANDLING
─────────────────────────────────────────────────────────────────*/

// Mirror invisible input into visible span
cmdInput.addEventListener('input', () => {
  typedText.textContent = cmdInput.value;
  scrollToBottom();
});

// Keyboard events
cmdInput.addEventListener('keydown', (e) => {

  if (e.key === 'Enter') {
    if (inputLocked) return;
    const val = cmdInput.value;
    cmdInput.value = '';
    typedText.textContent = '';
    processCommand(val);
    return;
  }

  // Arrow Up → previous command
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (cmdHistory.length === 0) return;
    historyIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
    cmdInput.value = cmdHistory[historyIndex];
    typedText.textContent = cmdInput.value;
    // Move caret to end
    setTimeout(() => {
      cmdInput.selectionStart = cmdInput.selectionEnd = cmdInput.value.length;
    }, 0);
    return;
  }

  // Arrow Down → next command
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex <= 0) {
      historyIndex = -1;
      cmdInput.value = '';
      typedText.textContent = '';
      return;
    }
    historyIndex--;
    cmdInput.value = cmdHistory[historyIndex];
    typedText.textContent = cmdInput.value;
    return;
  }
});

// Keep input focused whenever user clicks anywhere
document.addEventListener('click', () => {
  if (terminalWrapper.classList.contains('visible')) {
    cmdInput.focus();
  }
});

// Tab key — prevent focus leaving input
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') e.preventDefault();
});
