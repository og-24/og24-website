(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (max-width: 900px)').matches;

  /* ============================================================
     SOCIAL DATA
     ============================================================ */
  const socials = [
    {
      name: 'Tip',
      handle: 'streamlabs.com/og24__/tip',
      url: 'https://streamlabs.com/og24__/tip',
      icon: `<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round"/>`
    },
    {
      name: 'Discord',
      handle: 'discord.com/invite/nUEKKgGPhT',
      url: 'https://discord.com/invite/nUEKKgGPhT',
      icon: `<path d="M20.3 5.3c-1.5-.7-3-1.1-4.6-1.4-.2.4-.4.8-.6 1.3-1.7-.3-3.4-.3-5 0-.2-.4-.4-.9-.6-1.3-1.6.3-3.1.7-4.6 1.4C2.3 9 1.6 12.6 1.9 16.1c1.9 1.4 3.7 2.2 5.5 2.8.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.7-.9.1-.1.3-.2.4-.3 3.4 1.6 7 1.6 10.3 0 .1.1.3.2.4.3-.5.3-1.1.6-1.7.9.3.7.7 1.3 1.1 1.9 1.8-.6 3.6-1.4 5.5-2.8.4-4-.6-7.6-2.5-10.8zM8.7 13.9c-.9 0-1.7-.9-1.7-1.9 0-1.1.7-1.9 1.7-1.9s1.7.9 1.7 1.9c0 1-.7 1.9-1.7 1.9zm6.6 0c-.9 0-1.7-.9-1.7-1.9 0-1.1.7-1.9 1.7-1.9s1.7.9 1.7 1.9c0 1-.8 1.9-1.7 1.9z" stroke-width="1.4"/>`
    },
    {
      name: 'Kick',
      handle: 'kick.com/og244',
      url: 'https://kick.com/og244',
      icon: `<path d="M4 3h5v6l6-6h6l-8 8 8 9h-6l-6-6.5V21H4V3z" stroke-linejoin="round"/>`
    },
    {
      name: 'Instagram',
      handle: 'instagram.com/og24___',
      url: 'https://www.instagram.com/og24___',
      icon: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>`
    },
    {
      name: 'YouTube',
      handle: 'youtube.com/@O.G24',
      url: 'https://www.youtube.com/@O.G24',
      icon: `<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><polygon points="10.5 9 10.5 15 15.5 12" fill="currentColor" stroke="none"/>`
    },
    
 {
  name: 'TikTok',
  handle: 'tiktok.com/@o.g24__',
  url: 'https://www.tiktok.com/@o.g24__',
  icon: `<path d="M14 3v10.5a3 3 0 1 1-2.2-2.9M14 3c.3 2.4 2 4.2 4.4 4.5" stroke-linecap="round" stroke-linejoin="round"/>`
},

  
{
  name: 'PayPal',
  handle: 'paypal.me/OmarGhanem24',
  url: 'https://www.paypal.com/paypalme/OmarGhanem24',
  icon: `<path d="M7 20l2-12h5c2.5 0 4 1.3 4 3.4 0 2.8-2.1 4.6-5.2 4.6H10l-.7 4H7zm3.3-7h2.5c1.7 0 2.7-.8 2.7-2.1 0-1-.7-1.6-2-1.6h-2.7L10.3 13z" stroke-linecap="round" stroke-linejoin="round"/>`
},
];
  const goIcon = `<svg class="social-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

  const socialGrid = document.getElementById('socialGrid');
  socialGrid.innerHTML = socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener" class="social-card interactive">
      <div class="social-top">
        <div class="social-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${s.icon}</svg></div>
        ${goIcon}
      </div>
      <div>
        <div class="social-name">${s.name}</div>
        <div class="social-handle">${s.handle}</div>
      </div>
    </a>
  `).join('');

  const contactActions = document.getElementById('contactActions');
  contactActions.innerHTML = socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener" class="icon-btn interactive" aria-label="${s.name}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">${s.icon}</svg>
    </a>
  `).join('');

  /* ============================================================
     LOADER — CINEMATIC BOOT INTRO v2 (3.2s–4.0s)
     ============================================================ */
  document.body.classList.add('intro-active');

  const loader = document.getElementById('loader');
  const loaderFlash = document.getElementById('loaderFlash');
  const logoWrap = document.getElementById('loaderLogoWrap');
  const loaderRing = document.getElementById('loaderRing');
  const loaderDot = document.getElementById('loaderDot');
  const loaderShockwave = document.getElementById('loaderShockwave');
  const loaderMsgEl = document.getElementById('loaderMsg');
  const loaderLine = document.getElementById('loaderLine').querySelector('i');

  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  // typewriter effect — resolves once fully typed
  function typeMessage(text, charDelay) {
    return new Promise(resolve => {
      loaderMsgEl.textContent = '';
      let i = 0;
      const step = () => {
        if (i <= text.length) {
          loaderMsgEl.textContent = text.slice(0, i);
          i++;
          setTimeout(step, charDelay);
        } else {
          resolve();
        }
      };
      step();
    });
  }

  // small ambient particle field confined to the loader
  const loaderCanvas = document.getElementById('loaderParticles');
  const lctx = loaderCanvas.getContext('2d');
  let lpw, lph, loaderParticles = [], loaderRAF = null;

  function resizeLoaderCanvas() {
    lpw = loaderCanvas.width = window.innerWidth;
    lph = loaderCanvas.height = window.innerHeight;
  }
  function initLoaderParticles() {
    const count = reducedMotion ? 0 : 46;
    loaderParticles = Array.from({ length: count }, () => ({
      x: Math.random() * lpw,
      y: Math.random() * lph,
      r: Math.random() * 1.4 + 0.3,
      vy: -Math.random() * 0.3 - 0.05,
      alpha: Math.random() * 0.4 + 0.1,
      red: Math.random() > 0.75
    }));
  }
  function drawLoaderParticles() {
    lctx.clearRect(0, 0, lpw, lph);
    loaderParticles.forEach(p => {
      p.y += p.vy;
      if (p.y < -5) { p.y = lph + 5; p.x = Math.random() * lpw; }
      lctx.beginPath();
      lctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      lctx.fillStyle = p.red ? `rgba(255,42,56,${p.alpha})` : `rgba(255,255,255,${p.alpha * 0.5})`;
      lctx.fill();
    });
    loaderRAF = requestAnimationFrame(drawLoaderParticles);
  }
  resizeLoaderCanvas();
  initLoaderParticles();
  if (!reducedMotion) drawLoaderParticles();
  window.addEventListener('resize', resizeLoaderCanvas);

  function runIntro() {
    // 0.2s — tiny glowing red dot
    setTimeout(() => loaderDot.classList.add('show'), 200);

    // 0.4s — logo appears at 24px, ring fades in and starts a slow rotation
    setTimeout(() => {
      logoWrap.classList.add('show');
      loaderRing.style.transition = 'opacity .6s ease';
      loaderRing.style.opacity = '1';
      loaderRing.classList.add('spin');
      // single glowing line begins its continuous fill
      loaderLine.style.transition = 'transform 2.5s linear';
      requestAnimationFrame(() => { loaderLine.style.transform = 'scaleX(1)'; });
    }, 400);

    // 0.8s — logo scales to 40px
    setTimeout(() => logoWrap.classList.add('grow-1'), 800);

    // 1.3s — logo scales to 70px
    setTimeout(() => logoWrap.classList.add('grow-2'), 1300);

    // typewriter boot messages — only these three
    setTimeout(() => typeMessage('INITIALIZING...', 24), 500);
    setTimeout(() => typeMessage('VERIFYING PLAYER...', 22), 1300);
    setTimeout(() => typeMessage('WELCOME BACK, OG24', 24), 2150);

    // ~2.95s — begin the finish sequence
    setTimeout(finishIntro, 2950);
  }

  async function finishIntro() {
    if (loaderRAF) cancelAnimationFrame(loaderRAF);

    // logo pulse + soft red shockwave
    logoWrap.classList.add('pulse');
    loaderShockwave.classList.add('fire');
    await wait(120);

    // zoom through the logo toward the camera
    logoWrap.classList.add('expand');

    // subtle flash
    loaderFlash.style.transition = 'opacity .22s ease-out';
    loaderFlash.style.opacity = '1';
    await wait(180);
    loaderFlash.style.transition = 'opacity .4s ease-in';
    loaderFlash.style.opacity = '0';

    loader.classList.add('hidden');
    await wait(140);
    playHeroIntro();
  }

  setTimeout(runIntro, 0);

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  if (!isTouch) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const glow = document.getElementById('mouseGlow');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    function animateRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .interactive').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ============================================================
     PARTICLES CANVAS (hero)
     ============================================================ */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let cw, ch;

  function resizeCanvas() {
    const hero = document.getElementById('hero');
    cw = canvas.width = hero.offsetWidth;
    ch = canvas.height = hero.offsetHeight;
  }

  function initParticles() {
    const count = Math.min(90, Math.floor((cw * ch) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * cw,
      y: Math.random() * ch,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.06,
      alpha: Math.random() * 0.5 + 0.15,
      red: Math.random() > 0.72
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, cw, ch);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = ch + 10; p.x = Math.random() * cw; }
      if (p.x < -10) p.x = cw + 10;
      if (p.x > cw + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.red
        ? `rgba(255,42,56,${p.alpha})`
        : `rgba(255,255,255,${p.alpha * 0.6})`;
      if (p.red) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(229,9,20,0.9)';
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticles();
  if (!reducedMotion) drawParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  /* ============================================================
     HERO INTRO ANIMATION
     ============================================================ */
  function playHeroIntro() {
    document.body.classList.remove('intro-active');

    if (typeof gsap === 'undefined') {
      document.querySelectorAll('#nav,.hero-tag,.hero-subtitle,.hero-desc,.hero-actions,.scroll-indicator,.hero-corners i,.hero-bg-fx')
        .forEach(el => el.style.opacity = 1);
      return;
    }
    // Each group appears ~0.15s after the previous one: Navbar → Title → Subtitle → Description → Buttons → Background fx
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('#nav', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
      .fromTo('.hero-corners i', { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, 0.1)
      .fromTo('.hero-tag', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.15)
      .fromTo('.hero-title', { opacity: 0, y: 32, letterSpacing: '0.15em' }, { opacity: 1, y: 0, letterSpacing: '0.01em', duration: 0.7 }, 0.15)
      .fromTo('.hero-subtitle', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.3)
      .fromTo('.hero-desc', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.45)
      .fromTo('.hero-actions', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.6)
      .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.65)
      .fromTo('.hero-bg-fx', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.75);
  }

  /* ============================================================
     SCROLL REVEAL + SCROLLTRIGGER
     ============================================================ */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.reveal').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // rank bar fill on scroll
    document.querySelectorAll('.rank-bar-fill').forEach(bar => {
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 90%',
        onEnter: () => { bar.style.width = bar.dataset.fill + '%'; }
      });
    });

    // game card subtle parallax tilt
    document.querySelectorAll('.game-card').forEach(card => {
      if (isTouch) return;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card.querySelector('.pattern'), { x: px * 16, y: py * 16, duration: 0.6, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.pattern'), { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
      });
    });
  } else {
    // fallback: IntersectionObserver
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity .8s ease, transform .8s ease';
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    document.querySelectorAll('.rank-bar-fill').forEach(bar => { bar.style.width = bar.dataset.fill + '%'; });
  }

  /* ============================================================
     NAV
     ============================================================ */
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    let current = sections[0].id;
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  links.forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }));

  /* ============================================================
     RE-BIND CURSOR HOVER FOR DYNAMICALLY INJECTED ELEMENTS
     ============================================================ */
  if (!isTouch) {
    const ring = document.getElementById('cursorRing');
    document.querySelectorAll('.interactive').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }
    const aboutTyping = document.getElementById("aboutTyping");

const texts = [
`I'm Omar Ghanem, also known as OG24.

An Egyptian competitive FPS player and content creator passionate about high-level gameplay, ranked competition, and entertaining the gaming community.

Currently competing in Valorant, Call of Duty, PUBG, and FiveM.`
];

let charIndex = 0;

function typeLoop() {
    const current = texts[0];

    aboutTyping.innerHTML =
        current.substring(0, charIndex).replace(/\n/g, "<br><br>") +
        "<span class='cursor'>|</span>";

    if (charIndex < current.length) {
        charIndex++;
        setTimeout(typeLoop, 18);
    } else {
        // بعد ما يخلص الكتابة، يشيل المؤشر ويقف
        aboutTyping.innerHTML =
            current.replace(/\n/g, "<br><br>");
    }
}

typeLoop();
})();
