// ===== Loading Screen =====
const loadingMessages = [
  ">> INITIALIZING SYSTEM...",
  ">> ESTABLISHING SECURE CONNECTION...",
  ">> BYPASSING FIREWALL...",
  ">> DECRYPTING PROTOCOLS...",
  ">> LOADING TNT NETWORK...",
  ">> ACCESS GRANTED",
];

let currentLine = 0;
let charIndex = 0;
let progress = 0;

function createLoadingMatrixRain() {
  const container = document.getElementById('loading-matrix');
  const cols = Math.floor(window.innerWidth / 20);
  
  for (let i = 0; i < cols; i++) {
    const column = document.createElement('div');
    column.className = 'matrix-column';
    column.style.left = `${i * 20}px`;
    column.style.animationDelay = `${Math.random() * 3}s`;
    
    let chars = '';
    for (let j = 0; j < 30; j++) {
      chars += String.fromCharCode(0x30a0 + Math.random() * 96) + '\n';
    }
    column.textContent = chars;
    container.appendChild(column);
  }
}

function typeLoadingMessage() {
  if (currentLine >= loadingMessages.length) {
    setTimeout(() => {
      document.getElementById('loading-screen').classList.add('hidden');
      document.getElementById('main-content').classList.remove('hidden');
      initMainContent();
    }, 500);
    return;
  }

  const messagesContainer = document.getElementById('loading-messages');
  const message = loadingMessages[currentLine];
  
  if (charIndex === 0) {
    const newLine = document.createElement('div');
    newLine.className = 'loading-message current';
    newLine.id = `loading-line-${currentLine}`;
    messagesContainer.appendChild(newLine);
  }

  const currentLineEl = document.getElementById(`loading-line-${currentLine}`);
  
  if (charIndex <= message.length) {
    currentLineEl.textContent = message.slice(0, charIndex) + '_';
    charIndex++;
    setTimeout(typeLoadingMessage, 30);
  } else {
    currentLineEl.textContent = message;
    currentLineEl.classList.remove('current');
    charIndex = 0;
    currentLine++;
    progress = (currentLine / loadingMessages.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    setTimeout(typeLoadingMessage, 300);
  }
}

// ===== Matrix Background =====
function initMatrixBackground() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const columns = Math.floor(canvas.width / 20);
  const drops = Array(columns).fill(1);
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

  function draw() {
    ctx.fillStyle = "rgba(5, 5, 7, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff9f";
    ctx.font = "15px monospace";

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 20;
      const y = drops[i] * 20;

      ctx.globalAlpha = Math.random() * 0.5 + 0.1;
      ctx.fillText(char, x, y);
      ctx.globalAlpha = 1;

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

// ===== Terminal Animation =====
const terminalLines = [
  { text: "whoami", isCommand: true, delay: 400 },
  { text: "visitor", delay: 300 },
  { text: "", delay: 200 },
  { text: "access TNT", isCommand: true, delay: 400 },
  { text: "permission granted", delay: 500 },
];

let terminalLineIndex = 0;
let terminalCharIndex = 0;
let showCursor = true;

function initTerminal() {
  const terminalContent = document.getElementById('terminal-content');
  
  // Cursor blink
  setInterval(() => {
    showCursor = !showCursor;
    updateTerminalCursor();
  }, 500);

  typeTerminalLine();
}

function typeTerminalLine() {
  if (terminalLineIndex >= terminalLines.length) return;

  const terminalContent = document.getElementById('terminal-content');
  const line = terminalLines[terminalLineIndex];
  const typeSpeed = line.isCommand ? 30 : 10;

  if (terminalCharIndex === 0) {
    const lineEl = document.createElement('div');
    lineEl.className = `terminal-line ${line.isCommand ? 'command' : 'output'}`;
    lineEl.id = `terminal-line-${terminalLineIndex}`;
    
    if (line.isCommand) {
      lineEl.innerHTML = '<span class="terminal-prompt">></span><span class="terminal-text"></span><span class="terminal-cursor">_</span>';
    } else {
      lineEl.innerHTML = '<span class="terminal-text"></span><span class="terminal-cursor">_</span>';
    }
    
    terminalContent.appendChild(lineEl);
  }

  const currentLineEl = document.getElementById(`terminal-line-${terminalLineIndex}`);
  const textEl = currentLineEl.querySelector('.terminal-text');

  if (terminalCharIndex <= line.text.length) {
    textEl.textContent = line.text.slice(0, terminalCharIndex);
    terminalCharIndex++;
    setTimeout(typeTerminalLine, typeSpeed);
  } else {
    const cursor = currentLineEl.querySelector('.terminal-cursor');
    if (cursor) cursor.remove();
    
    terminalCharIndex = 0;
    terminalLineIndex++;
    setTimeout(typeTerminalLine, line.delay || 200);
  }
}

function updateTerminalCursor() {
  const cursors = document.querySelectorAll('.terminal-cursor');
  cursors.forEach(cursor => {
    cursor.style.opacity = showCursor ? '1' : '0';
  });
}

// ===== Glitch Text Effect =====
function initGlitchTexts() {
  const glitchTexts = document.querySelectorAll('.glitch-text');
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/\\`~";

  setInterval(() => {
    glitchTexts.forEach(el => {
      const originalText = el.getAttribute('data-text');
      
      if (Math.random() > 0.95) {
        const glitched = originalText
          .split('')
          .map(char => Math.random() > 0.9 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
          .join('');
        
        el.textContent = glitched;
        
        setTimeout(() => {
          el.textContent = originalText;
        }, 100);
      }
    });
  }, 100);
}

// ===== Hacker Cards Animation =====
function initHackerCards() {
  const cards = document.querySelectorAll('.hacker-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

// ===== Initialize Main Content =====
function initMainContent() {
  initMatrixBackground();
  initTerminal();
  initGlitchTexts();
  initHackerCards();
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', () => {
  createLoadingMatrixRain();
  typeLoadingMessage();
});
