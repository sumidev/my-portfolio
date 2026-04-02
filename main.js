/* ================================================
   PORTFOLIO — JAVASCRIPT
   Orbit canvas · Terminal typewriter · Cursor
   Scroll reveals · Counters · Nav scroll · Form
   ================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────
     CUSTOM CURSOR
  ────────────────────────────────────── */
  const blob = document.getElementById('cursor-blob');
  const dot  = document.getElementById('cursor-dot');
  let mouseX = 0, mouseY = 0;
  let blobX  = 0, blobY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Smooth blob follow
  (function animateBlob() {
    blobX += (mouseX - blobX) * 0.1;
    blobY += (mouseY - blobY) * 0.1;
    blob.style.left = blobX + 'px';
    blob.style.top  = blobY + 'px';
    requestAnimationFrame(animateBlob);
  })();

  // Hover states for cursor
  document.querySelectorAll('a, button, .bento-card, .skill-card, .timeline-content').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    blob.style.opacity = '0';
    dot.style.opacity  = '0';
  });
  document.addEventListener('mouseenter', () => {
    blob.style.opacity = '1';
    dot.style.opacity  = '1';
  });

  /* ──────────────────────────────────────
     NAV SCROLL EFFECT
  ────────────────────────────────────── */
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  /* ──────────────────────────────────────
     TERMINAL TYPEWRITER
  ────────────────────────────────────── */
  const terminalBody = document.getElementById('terminal-body');

  const lines = [
    { type: 'cmd',     prompt: '~', text: 'whoami' },
    { type: 'out',     text: 'alex_draghici — Senior Full-Stack Engineer' },
    { type: 'cmd',     prompt: '~', text: 'cat stack.json' },
    { type: 'out',     text: '{ "backend": "PHP/Laravel", "frontend": "React/Next.js" }' },
    { type: 'cmd',     prompt: '~', text: 'ls ./expertise' },
    { type: 'success', text: '✔  API Design   ✔  SaaS   ✔  DevOps   ✔  UI/UX' },
    { type: 'cmd',     prompt: '~', text: 'git log --oneline -3' },
    { type: 'out',     text: 'a1b2c3d  feat: add real-time analytics dashboard' },
    { type: 'out',     text: 'e4f5g6h  perf: optimize N+1 queries (-65% latency)' },
    { type: 'out',     text: 'i7j8k9l  fix: resolve memory leak in queue workers' },
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let isTyping = false;
  let cursor = null;

  function addLine(lineData) {
    const div = document.createElement('div');
    div.classList.add('t-line');

    if (lineData.type === 'cmd') {
      const prompt = document.createElement('span');
      prompt.className = 't-prompt';
      prompt.textContent = lineData.prompt + ' $ ';

      const cmd = document.createElement('span');
      cmd.className = 't-cmd';
      div.appendChild(prompt);
      div.appendChild(cmd);
      terminalBody.appendChild(div);
      return cmd; // return span to type into
    } else {
      const out = document.createElement('span');
      out.className = lineData.type === 'success' ? 't-out--success' : 't-out';
      out.textContent = lineData.text;
      div.appendChild(out);
      terminalBody.appendChild(div);
      return null;
    }
  }

  function addCursor() {
    if (cursor) cursor.remove();
    cursor = document.createElement('span');
    cursor.className = 't-cursor';
    terminalBody.appendChild(cursor);
  }

  function typeNext() {
    if (lineIdx >= lines.length) {
      // Loop after delay
      setTimeout(() => {
        terminalBody.innerHTML = '';
        lineIdx = 0; charIdx = 0;
        addCursor();
        typeNext();
      }, 4000);
      return;
    }

    const lineData = lines[lineIdx];

    if (lineData.type === 'cmd') {
      if (charIdx === 0) {
        isTyping = true;
        addCursor();
      }
      const span = terminalBody.querySelector('.t-line:last-of-type .t-cmd') 
                   || addLine(lineData);

      if (charIdx === 0) {
        // Create the line first
        addLine(lineData);
        if (cursor) cursor.remove();
        addCursor();
      }

      const targetSpan = terminalBody.querySelectorAll('.t-cmd');
      const current = targetSpan[targetSpan.length - 1];

      if (charIdx < lineData.text.length) {
        current.textContent += lineData.text[charIdx];
        charIdx++;
        setTimeout(typeNext, 55 + Math.random() * 40);
      } else {
        charIdx = 0;
        lineIdx++;
        setTimeout(typeNext, 350);
      }
    } else {
      addLine(lineData);
      if (cursor) cursor.remove();
      addCursor();
      lineIdx++;
      charIdx = 0;
      setTimeout(typeNext, 200);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Slightly different approach - clean typewriter
  function initTerminal() {
    terminalBody.innerHTML = '';
    cursor = null;

    const termLines = [
      { kind: 'cmd', text: 'whoami' },
      { kind: 'res', text: 'alex_draghici · Senior Full-Stack Engineer' },
      { kind: 'cmd', text: 'cat ./skills' },
      { kind: 'res', text: '{ "php": "8.3", "laravel": "11", "react": "19" }' },
      { kind: 'cmd', text: 'git log --oneline -2' },
      { kind: 'res', text: 'a1b2c3  feat: multi-tenant analytics SaaS' },
      { kind: 'res', text: 'e4f5g6  perf: -65% API latency via Redis cache' },
      { kind: 'cmd', text: 'echo $STATUS' },
      { kind: 'ok',  text: '✔ Available for new projects' },
    ];

    let li = 0, ci = 0;
    let activeEl = null;

    function tick() {
      if (li >= termLines.length) {
        setTimeout(() => { initTerminal(); }, 5000);
        return;
      }

      const ln = termLines[li];

      if (ci === 0) {
        // Create a new line div
        const row = document.createElement('div');
        row.className = 't-line';
        row.style.opacity = '1';

        if (ln.kind === 'cmd') {
          const p = document.createElement('span');
          p.className = 't-prompt';
          p.textContent = '~$ ';
          const c = document.createElement('span');
          c.className = 't-cmd';
          row.appendChild(p);
          row.appendChild(c);
          terminalBody.insertBefore(row, terminalBody.querySelector('.t-cursor'));
          activeEl = c;
        } else {
          const o = document.createElement('span');
          o.className = ln.kind === 'ok' ? 't-out--success' : 't-out';
          row.appendChild(o);
          terminalBody.insertBefore(row, terminalBody.querySelector('.t-cursor'));
          activeEl = o;
        }
      }

      if (ci < ln.text.length) {
        activeEl.textContent += ln.text[ci];
        ci++;
        const delay = ln.kind === 'cmd' ? 60 + Math.random() * 45 : 18;
        setTimeout(tick, delay);
      } else {
        li++;
        ci = 0;
        activeEl = null;
        const pause = ln.kind === 'cmd' ? 500 : 180;
        setTimeout(tick, pause);
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Init cursor
    const cursorEl = document.createElement('span');
    cursorEl.className = 't-cursor';
    terminalBody.appendChild(cursorEl);

    tick();
  }

  initTerminal();

  /* ──────────────────────────────────────
     ORBIT CANVAS — 3D Particle System
  ────────────────────────────────────── */
  const canvas = document.getElementById('orbit-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, animId;

  function resizeCanvas() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particles
  const PARTICLE_COUNT = 110;
  const particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      this.r    = 0.5 + Math.random() * 1.5;
      this.vx   = (Math.random() - 0.5) * 0.3;
      this.vy   = (Math.random() - 0.5) * 0.3;
      this.life = Math.random();
      this.maxLife = 0.6 + Math.random() * 0.4;
      this.alpha = 0;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life += 0.003;
      if (this.life < 0.3) this.alpha = this.life / 0.3;
      else this.alpha = Math.max(0, 1 - (this.life - 0.3) / 0.7);
      if (this.life >= 1) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha * 0.55;
      ctx.fillStyle = '#818cf8';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new Particle();
    p.life = Math.random(); // stagger
    particles.push(p);
  }

  // Orbit rings
  const orbits = [
    { rx: 380, ry: 160, speed: 0.0004, phase: 0,         color: 'rgba(99,102,241,0.18)', dotColor: '#6366f1', dotR: 4 },
    { rx: 280, ry: 120, speed: 0.0007, phase: Math.PI/3, color: 'rgba(129,140,248,0.1)', dotColor: '#818cf8', dotR: 3 },
    { rx: 200, ry:  80, speed: 0.0012, phase: Math.PI,   color: 'rgba(165,180,252,0.07)', dotColor: '#a5b4fc', dotR: 2.5 },
  ];
  let t = 0;
  let cx, cy;

  function drawOrbits() {
    cx = W * 0.72;
    cy = H * 0.5;

    orbits.forEach(o => {
      // Ellipse
      ctx.save();
      ctx.strokeStyle = o.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, o.rx, o.ry, -0.15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Orbiting dot
      const angle = t * o.speed * 1000 + o.phase;
      const dx = cx + Math.cos(angle) * o.rx;
      const dy = cy + Math.sin(angle) * o.ry;

      // Glow
      ctx.save();
      ctx.shadowColor = o.dotColor;
      ctx.shadowBlur  = 14;
      ctx.fillStyle   = o.dotColor;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(dx, dy, o.dotR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Trailing comet tail
      const tailLen = 12;
      for (let i = 1; i <= tailLen; i++) {
        const ta = angle - i * 0.05;
        const tx = cx + Math.cos(ta) * o.rx;
        const ty = cy + Math.sin(ta) * o.ry;
        ctx.save();
        ctx.globalAlpha = (1 - i / tailLen) * 0.25;
        ctx.fillStyle   = o.dotColor;
        ctx.beginPath();
        ctx.arc(tx, ty, o.dotR * (1 - i / tailLen), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });
  }

  // Grid lines (subtle)
  function drawGrid() {
    const step = 60;
    ctx.save();
    ctx.strokeStyle = 'rgba(99,102,241,0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  let lastTime = 0;
  function animate(ts) {
    const dt = ts - lastTime;
    lastTime = ts;
    t = ts;

    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    drawOrbits();
    animId = requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  /* ──────────────────────────────────────
     INTERSECTION OBSERVER — REVEAL
  ────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.section-header, .bento-card, .skill-card, .timeline-item, .about-bio, ' +
    '.about-image-wrap, .contact-item, .contact-form, .contact-availability, .hero-badge, ' +
    '.hero-title, .hero-sub, .hero-cta-group, .hero-stats'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 4 === 1) el.classList.add('reveal-delay-1');
    if (i % 4 === 2) el.classList.add('reveal-delay-2');
    if (i % 4 === 3) el.classList.add('reveal-delay-3');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────
     SKILL BARS ANIMATION
  ────────────────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar  = entry.target;
        const fill = bar.querySelector('.skill-bar-fill');
        const level = bar.dataset.level || '80';
        setTimeout(() => {
          fill.style.width = level + '%';
        }, 200);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => barObserver.observe(bar));

  /* ──────────────────────────────────────
     ANIMATED COUNTERS
  ────────────────────────────────────── */
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = start;
          if (start >= target) clearInterval(timer);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  counters.forEach(c => counterObserver.observe(c));

  /* ──────────────────────────────────────
     CONTACT FORM
  ────────────────────────────────────── */
  const form   = document.getElementById('contact-form');
  const btnSub = document.getElementById('contact-submit-btn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulate loading
      btnSub.disabled = true;
      btnSub.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        Sending…
      `;

      setTimeout(() => {
        form.innerHTML = `
          <div class="form-success">
            <div class="form-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p class="form-success-title">Message Sent!</p>
            <p class="form-success-sub">Thanks for reaching out. I'll get back to you within 24 hours.</p>
          </div>
        `;
      }, 1800);
    });
  }

  /* ──────────────────────────────────────
     AVATAR RING PARALLAX ON SCROLL
  ────────────────────────────────────── */
  const ring = document.querySelector('.ring-svg');
  if (ring) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      ring.style.transform = `rotate(${scrolled * 0.05}deg)`;
    }, { passive: true });
  }

  /* ──────────────────────────────────────
     BENTO CARD MAGNETIC HOVER
  ────────────────────────────────────── */
  document.querySelectorAll('.bento-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      const tiltX = (y / rect.height) * 6;
      const tiltY = -(x / rect.width)  * 6;
      card.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.transformOrigin = 'center';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ──────────────────────────────────────
     GLITCH EFFECT ON HERO TITLE (subtle)
  ────────────────────────────────────── */
  const titleMain = document.querySelector('.title-line--main');
  if (titleMain) {
    setInterval(() => {
      if (Math.random() > 0.92) {
        titleMain.style.textShadow = '2px 0 #6366f1, -2px 0 #818cf8';
        setTimeout(() => {
          titleMain.style.textShadow = '';
        }, 80);
      }
    }, 2000);
  }

  /* ──────────────────────────────────────
     HERO SECTION PARALLAX
  ────────────────────────────────────── */
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (canvas) canvas.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  console.log(
    '%c[AD] Portfolio loaded — v2.0.0 ',
    'background: #6366f1; color: #fff; padding: 4px 10px; border-radius: 4px; font-family: monospace; font-size: 12px;'
  );

})();
