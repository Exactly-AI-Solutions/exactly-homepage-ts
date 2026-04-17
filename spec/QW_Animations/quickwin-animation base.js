/* quickwin-animation.js */
/* Exactly AI Solutions — Quick Win Animation */
/* 
 * Usage:
 *   1. Link quickwin-animation.css in your <head>
 *   2. Add <script src="quickwin-animation.js"></script> before </body>
 *   3. The animation auto-fires when context = 'quick-wins'
 *
 * To trigger manually:
 *   deliverQuickWin(document.getElementById('chatArea'));
 *
 * To swap client content:
 *   Edit the quickWinGroups array below.
 *
 * Matt: replace the `context` stub with your actual cookie read.
 */

// Cookie-driven context — Matt replaces this with actual cookie read
// e.g. const context = getCookie('exactly_context') || 'default';
const context = 'quick-wins'; // stub — would be read from cookie

const contextMap = {
  'quick-wins':          { label: 'Quick Wins',            message: null, useSequence: true },
  'deep-dives':          { label: 'Deep Dives',            message: "Hey — looks like Deep Dives caught your eye. Want me to walk you through what one looks like?" },
  'cro-chatbots':        { label: 'CRO Chatbots',          message: "Hey — interested in CRO Chatbots? I can show you exactly how one works — you're looking at it right now." },
  'exactly-difference':  { label: 'The Exactly Difference', message: "Hey — good question. Most AI companies hand you a tool. We hand you the outcome. Want me to explain what that means?" },
  'ai-roadmap':          { label: 'Your AI Roadmap',       message: "Hey — thinking about where to start with AI? I can map out the highest-impact moves for a business like yours." },
  'who-we-are':          { label: 'Who We Are',            message: "Hey — happy to tell you about us. Exactly AI builds done-for-you AI solutions for SMBs. No tools, no training — just outcomes. What would you like to know?" },
  'how-it-works':        { label: 'How It Works',          message: "Hey — the short version: you tell us your goal, we build and run the AI solution, you get the result. Want the full picture?" },
  'default':             { label: '',                      message: "Hey — glad you're here. What would you like to explore?" }
};

const ctx = contextMap[context] || contextMap['default'];

// ── QUICK WIN SEQUENCE ──
// Each entry: { text, isHeader, typingDelay (ms before typing starts), postDelay (ms after message before next) }
// ── QUICK WIN GROUPED BUBBLES — PACED VERSION ──

// Typing speeds (ms per char)
const SPEED_HOOK         = 70;  // bubble 1 — slow and confident
const SPEED_PUNCHY_SHORT = 120; // short punchy lines — under 15 chars, truly slow
const SPEED_PUNCHY_LONG  = 75;  // longer punchy lines — deliberate but not labored
const SPEED_BODY         = 40;  // normal body — comfortable, no rush
const SPEED_BULLET       = 35;  // bullet text
const BULLET_POST        = 3500; // ms after last bullet
const BULLET_INTER       = 800;  // ms between bullets (after last word finishes)

// Word-by-word speed per bullet, varied by length
function bulletWordSpeed(text) {
  if (text.length > 70) return 220; // long — slower, more deliberate
  if (text.length > 40) return 160; // medium
  return 110;                        // short — snappier
}

// Pause after a bullet based on its length (reading time after words finish)
function bulletPause(text) {
  if (text.length > 70) return 3200;
  if (text.length > 40) return 2200;
  return 1000;
}

// Type a bullet word by word into an li element, call onDone when finished
function typeWords(el, text, baseSpeed, onDone) {
  const words = text.split(' ');
  let i = 0;
  function nextWord() {
    if (i >= words.length) { if (onDone) onDone(); return; }
    el.textContent += (i === 0 ? '' : ' ') + words[i];
    i++;
    setTimeout(nextWord, baseSpeed);
  }
  nextWord();
}

// Inter-bubble gaps (ms)
const BUBBLE_GAPS = [10000, 8000, 3000, 6000, 3000, 0];

// Helper: pick punchy speed based on length
function punchySpeed(text) {
  return text.length <= 15 ? SPEED_PUNCHY_SHORT : SPEED_PUNCHY_LONG;
}

// ── SEQUENCE STATE ──
let qwCurrentGroup = 0;
const QW_TOTAL = 2;
const COMPANY = 'Reunited Clothing';

const quickWinGroups = [
  { // 1 — Hook bubble
    parts: [
      { type: 'richbody', html: '<strong>Quick Win: AI Search Visibility Check</strong> When someone asks AI who does what you do — do you show up?' },
    ]
  },
  { // 2 — Full report
    parts: [
      { type: 'header', text: 'AI Search Visibility Check — Reunited Clothing' },
      { type: 'body', text: 'We tested the questions that a retail buyer, brand manager, or talent representative would actually ask AI — across ChatGPT, Gemini, and Perplexity:' },
      { type: 'bold_bullets', lines: [
        '"Who are the best private label apparel manufacturers for major retailers?"',
        '"Which New York design houses offer turnkey apparel from design through delivery?"',
        '"Who helps brands and celebrities launch exclusive clothing lines at retail?"',
      ]},
      { type: 'body', text: 'The results are a split picture — and the split itself is the problem. For the celebrity query, Reunited shows up. Gemini names them twice, citing Royalty by Maluma and Nina Parker. Perplexity surfaces them via a Fashionista article. For the private label and turnkey queries, Reunited does not appear. AI surfaces Apparel Production Inc., Zega Apparel, The Evans Group, and others. Reunited is absent.' },
      { type: 'body', text: "Every mention that does exist traces back to that single Fashionista article — not the website. A journalist described Reunited's business more clearly than Reunited describes it itself." },
      { type: 'header', text: 'Why AI only knows half of you' },
      { type: 'bullets', lines: [
        'The homepage is invisible to AI: The site is almost entirely images. The only indexable text is the tagline "The industry\'s leading design house for retailers, brands, celebrities, and creators." No client names. No proof points. No category phrases AI can parse.',
        'No private label classification language exists: The site never says "private label apparel manufacturer for major department stores" or "turnkey design-to-delivery partner for retail-exclusive fashion lines." Without that language, Reunited doesn\'t exist in AI\'s map of the private label industry.',
        'Proof is hidden behind aspirational language: The about page says "comprehensive solution" and "white space opportunities." It never says "Launched Royalty by Maluma exclusively at Macy\'s" or "Won Revolve\'s Influencer Collaboration of the Year with Olivia Culpo." The credentials are real. The site doesn\'t say so.',
        'Competitors name-drop; Reunited doesn\'t: Celebrity Fashion Group lists Cristiano Ronaldo, Selena Gomez, and the Kardashians. LA Collective names Morgan Stewart and Alexis Ren. Reunited\'s site says "collaborations" and shows images.',
        'One article is carrying the entire visibility load: The Fashionista piece is doing the classification work the website should be doing. When AI systems update their training data, a single third-party article is not enough to hold the position.',
      ]},
      { type: 'header', text: 'What to fix' },
      { type: 'numhead', text: '1.' },
      { type: 'body', text: 'State the full category in text AI can read. "Reunited Clothing is a New York-based design house and apparel manufacturer that builds and launches private label and celebrity brands for major retailers including Macy\'s." That sentence doesn\'t exist on the site. It should — on the homepage, in HTML text, not embedded in an image.' },
      { type: 'numhead', text: '2.' },
      { type: 'richbody', html: 'Name the work. "Royalty by Maluma — launched exclusively at Macy\'s, 2022. Nina Parker — launched exclusively at Macy\'s, 2021. Marled by Olivia Culpo — Revolve Award, Influencer Collaboration of the Year." <strong>Specifics are classification signals. Aspirational language is not.</strong>' },
      { type: 'numhead', text: '3.' },
      { type: 'body', text: 'Make capabilities structurally discoverable. Each capability — design, sourcing, manufacturing, logistics — needs to be a distinct, indexable section connected to proof. "Full design-to-delivery operation: in-house design, global sourcing, quality control, and logistics management — currently serving 30+ retail accounts."' },
      { type: 'numhead', text: '4.' },
      { type: 'richbody', html: 'Close the competitor gap. Reunited\'s work is stronger than the competitors AI is recommending. The site needs to say so in text AI can read. "Reunited Clothing has designed, manufactured, and launched brands with Maluma, Nina Parker, Olivia Culpo, and 30+ additional partners across Macy\'s, Revolve, and other major retailers." <strong>The site needs to say exactly that.</strong>' },
      { type: 'header', text: 'The bottom line' },
      { type: 'body', text: 'AI knows Reunited as a celebrity brand launchpad. It has no idea Reunited is one of New York\'s most experienced private label manufacturers for major retailers. That\'s half the business invisible to every retail buyer, brand manager, and sourcing director using AI to find partners today. The work is exceptional. The site is only telling part of the story — and that part is being carried by a single article Reunited didn\'t write.' },
      { type: 'body', text: 'This AI Search Visibility Check is one of 8 Quick Wins designed to surface strategic leverage inside your business. Want the full diagnostic? Our AI-Search Deep Dive shows exactly how AI systems classify your company — and what to change.' },
      { type: 'cta' },
      { type: 'prepared', text: 'Prepared by Exactly AI Solutions · mitch@exactlyai.solutions' },
    ]
  },
];

// Type text char by char into an element, call onDone when finished
function typeText(el, text, baseSpeed, onDone) {
  let i = 0;
  function nextChar() {
    if (i < text.length) {
      el.textContent += text[i]; i++;
      setTimeout(nextChar, baseSpeed);
    } else {
      if (onDone) onDone();
    }
  }
  nextChar();
}

// Append a part to a bubble, call onDone when the part is fully rendered
function renderPart(bubble, part, msgDiv, onDone) {
  if (part.type === 'header') {
    const el = document.createElement('div');
    el.className = 'qw-header';
    el.textContent = part.text;
    bubble.appendChild(el);
    if (onDone) onDone();

  } else if (part.type === 'body' || part.type === 'punchy') {
    const el = document.createElement('div');
    el.className = part.type === 'punchy' ? 'qw-body qw-punchy' : 'qw-body';
    bubble.appendChild(el);
    const speed = part.type === 'punchy' ? punchySpeed(part.text) : (part.speed || SPEED_BODY);
    typeText(el, part.text, speed, () => {
      if (onDone) onDone();
    });

  } else if (part.type === 'bullets') {
    const ul = document.createElement('ul');
    ul.className = 'qw-bullets';
    bubble.appendChild(ul);

    function showBullet(i) {
      if (i >= part.lines.length) {
        setTimeout(() => { if (onDone) onDone(); }, BULLET_POST);
        return;
      }
      const li = document.createElement('li');
      ul.appendChild(li);

      const text = part.lines[i];
      const speed = bulletWordSpeed(text);

      typeWords(li, text, speed, () => {
        setTimeout(() => showBullet(i + 1), bulletPause(text) + BULLET_INTER);
      });
    }
    showBullet(0);

  } else if (part.type === 'cta') {
    const row = document.createElement('div');
    row.className = 'qw-cta-row';
    row.innerHTML = `
      <a href="#" class="qw-cta-btn qw-cta-primary">Go deeper on this →</a>
      <a href="#" class="qw-cta-btn qw-cta-secondary" onclick="downloadPDF(); return false;">Download as PDF</a>
      <button class="qw-bookmark-btn" onclick="toggleBookmarkQW(this)" title="Bookmark this report">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </button>`;
    bubble.appendChild(row);
    if (onDone) onDone();
  }
}

function deliverQuickWin(chatArea) {

  // Group 0: opener bubble — small, direct, immediate
  const openerDiv = document.createElement('div');
  openerDiv.className = 'msg-bot';
  openerDiv.style.opacity = '0';
  openerDiv.style.transition = 'opacity 1.5s ease';
  openerDiv.innerHTML = `<div class="bot-avatar"><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="17" cy="17" r="17" fill="#7D8F3C"/><image x="4" y="4" width="26" height="26" xlink:href="data:image/png;base64,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"/></svg></div><div class="bot-bubble qw-bubble" id="qwb_opener"></div>`;
  chatArea.appendChild(openerDiv);

  const openerBubble = document.getElementById('qwb_opener');
  const nameEl = document.createElement('div');
  nameEl.className = 'bot-name';
  nameEl.textContent = 'Exactly';
  openerBubble.appendChild(nameEl);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    openerDiv.style.opacity = '1';
  }));

  // Type opener parts sequentially, then slight beat before micro bubble
  const openerParts = quickWinGroups[0].parts;
  let openerIndex = 0;
  function typeNextOpenerPart() {
    if (openerIndex >= openerParts.length) {
      // All opener parts done — wait 4s then deliver micro
      waitForMicro();
      return;
    }
    renderPartInstant(openerBubble, openerParts[openerIndex++]); typeNextOpenerPart();
  }
  typeNextOpenerPart();

  function waitForMicro() {
  setTimeout(() => {
    // Micro bubble — types "Here's what we found."
    const microDiv = document.createElement('div');
    microDiv.className = 'msg-bot';
    microDiv.style.opacity = '0';
    microDiv.style.transition = 'opacity 1.5s ease';

    const microSpacer = document.createElement('div');
    microSpacer.className = 'bot-avatar-spacer';

    const microBubble = document.createElement('div');
    microBubble.className = 'bot-bubble';

    const microTextEl = document.createElement('span');
    microTextEl.className = 'qw-body';
    microTextEl.style.fontWeight = '500';
    microTextEl.style.color = '#4B5563'; microTextEl.style.fontSize = '14px';

    microBubble.appendChild(microTextEl);
    microDiv.appendChild(microSpacer);
    microDiv.appendChild(microBubble);
    chatArea.appendChild(microDiv);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      microDiv.style.opacity = '1';
      microTextEl.textContent = "Reunited Clothing | reunitedclothing.com · 1375 Broadway, Floor 22, New York, NY 10018";
      setTimeout(deliverReport, 3000);
    }));
  }, 4000);
} // end waitForMicro

function deliverReport() {
  const reportDiv = document.createElement('div');
  reportDiv.className = 'msg-bot';
  reportDiv.style.opacity = '0';
  reportDiv.style.transition = 'opacity 1.5s ease';

  const reportSpacer = document.createElement('div');
  reportSpacer.className = 'bot-avatar-spacer';

  const reportBubble = document.createElement('div');
  reportBubble.className = 'bot-bubble qw-bubble';

  reportDiv.appendChild(reportSpacer);
  reportDiv.appendChild(reportBubble);
  chatArea.appendChild(reportDiv);
  chatArea.scrollTop = 0;

  quickWinGroups[1].parts.forEach(part => renderPartInstant(reportBubble, part));

  requestAnimationFrame(() => requestAnimationFrame(() => {
    reportDiv.style.opacity = '1';
    chatArea.scrollTop = 0;
  }));
}
}




function renderPartInstant(bubble, part) {
  if (part.type === 'header') {
    const el = document.createElement('div');
    el.className = 'qw-header';
    el.textContent = part.text;
    bubble.appendChild(el);
  } else if (part.type === 'numhead') {
    const el = document.createElement('div');
    el.className = 'qw-numhead';
    el.textContent = part.text;
    bubble.appendChild(el);
  } else if (part.type === 'body' || part.type === 'punchy') {
    const el = document.createElement('div');
    el.className = part.type === 'punchy' ? 'qw-body qw-punchy' : 'qw-body';
    el.textContent = part.text;
    bubble.appendChild(el);
  } else if (part.type === 'richbody') {
    const el = document.createElement('div');
    el.className = 'qw-body';
    el.innerHTML = part.html;
    bubble.appendChild(el);
  } else if (part.type === 'bullets' || part.type === 'bold_bullets') {
    const ul = document.createElement('ul');
    ul.className = 'qw-bullets';
    part.lines.forEach(line => {
      const li = document.createElement('li');
      li.textContent = line;
      if (part.type === 'bold_bullets') li.style.fontWeight = '600';
      ul.appendChild(li);
    });
    bubble.appendChild(ul);
  } else if (part.type === 'cta') {
    const row = document.createElement('div');
    row.className = 'qw-cta-row';
    row.innerHTML = `
      <a href="#" class="qw-cta-btn qw-cta-primary">Go deeper on this →</a>
      <a href="#" class="qw-cta-btn qw-cta-secondary" onclick="downloadPDF(); return false;">Download as PDF</a>
      <button class="qw-bookmark-btn" onclick="toggleBookmarkQW(this)" title="Bookmark this report">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
      </button>`;
    bubble.appendChild(row);
  } else if (part.type === 'prepared') {
    const el = document.createElement('div');
    el.className = 'qw-prepared';
    el.textContent = part.text;
    bubble.appendChild(el);
  }
}






function toggleBookmarkQW(btn) {
  btn.classList.toggle('saved');
  const saved = btn.classList.contains('saved');
  if (saved) {
    localStorage.setItem('exactly_qw_bookmark', 'ai-search-visibility-reunited');
    btn.querySelector('svg').setAttribute('fill', 'currentColor');
  } else {
    localStorage.removeItem('exactly_qw_bookmark');
    btn.querySelector('svg').setAttribute('fill', 'none');
  }
}


// Scroll so new bubble appears near top of the chat area (20% from top)
function scrollToEyeline(el) {
  const chatArea = document.getElementById('chatArea');
  if (!chatArea || !el) return;
  setTimeout(() => {
    if (chatArea.scrollHeight <= chatArea.clientHeight) return;
    let top = 0, node = el;
    while (node && node !== chatArea) { top += node.offsetTop || 0; node = node.parentElement; }
    const target = top - Math.round(chatArea.clientHeight * 0.15);
    chatArea.scrollTop = Math.max(0, target);
  }, 50);
}

// Highlight active topnav item
function setActiveSidebarItem(key) {
  document.querySelectorAll('.topnav-item').forEach(el => el.classList.remove('active'));
  const keys = ['quick-wins','deep-dives','cro-chatbots','exactly-difference'];
  const items = document.querySelectorAll('.topnav-item');
  const idx = keys.indexOf(key);
  if (idx >= 0 && items[idx]) items[idx].classList.add('active');
}


setActiveSidebarItem(context);

// Open with typing then context-aware message or sequence
setTimeout(() => {
  const chatArea = document.getElementById('chatArea');
  document.getElementById('typingIndicator').remove();

  if (ctx.useSequence) {
    deliverQuickWin(chatArea);
  } else {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'msg-bot';
    msgDiv.innerHTML = `
      <div class="bot-avatar"><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="17" cy="17" r="17" fill="#7D8F3C"/><image x="4" y="4" width="26" height="26" xlink:href="data:image/png;base64,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"/></svg></div>
      <div class="bot-bubble">
        <div class="bot-name">Exactly</div>
        <span id="typingText"></span>
      </div>
    `;
    chatArea.appendChild(msgDiv);

    const letters = ctx.message.split('');
    const textEl = document.getElementById('typingText');
    let i = 0;
    const interval = setInterval(() => {
      if (i < letters.length) {
        textEl.textContent += letters[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 38);
  }
}, 1000);