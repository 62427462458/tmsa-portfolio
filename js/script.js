/* =========================================
   PFE — Cloud Privé HCI — script.js
   Ayoub Ben Moussa · TMPA · 2025
   ========================================= */

/* ===== STICKY HEADER ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.background = 'rgba(5,12,20,0.97)';
    header.style.boxShadow = '0 .2rem 3rem rgba(0,0,0,.4)';
  } else {
    header.style.background = 'rgba(5,12,20,0.88)';
    header.style.boxShadow = 'none';
  }
});

/* ===== MOBILE MENU ===== */
const menuIcon   = document.getElementById('menu-icon');
const mobileNav  = document.getElementById('mobileNav');

menuIcon.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuIcon.className = 'fas fa-bars';
  });
});

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar a');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveNav);

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = header.offsetHeight + 10;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== VIDEO OVERLAY ===== */
const videoOverlay = document.getElementById('videoOverlay');
const playBtnBig   = document.getElementById('playBtnBig');
const localVideo   = document.getElementById('localVideo');

if (videoOverlay && localVideo) {
  videoOverlay.addEventListener('click', () => {
    videoOverlay.classList.add('hidden');
    localVideo.play();
  });

  // Show overlay again if video is paused via native controls
  localVideo.addEventListener('pause', () => {
    if (localVideo.ended) return;
    // Don't re-show overlay on manual pause — keep it clean
  });
}

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, duration = 1800) {
  const isText = isNaN(parseInt(target));
  if (isText) return;
  const start    = 0;
  const end      = parseInt(target);
  const range    = end - start;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current    = start;
  const timer = setInterval(() => {
    current += 1;
    el.textContent = current;
    if (current >= end) clearInterval(timer);
  }, stepTime);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const val = el.textContent.trim();
        animateCounter(el, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ===== TYPED TEXT (hero subtitle) ===== */
const multiText = document.querySelector('.hero-title .accent');
if (multiText) {
  const words = ['Cloud Privé HCI', 'Hyper-Convergée', 'Multi-Tenant', 'Zero-Trust & IaC'];
  let wIdx = 0, cIdx = 0, deleting = false;

  function typeLoop() {
    const word = words[wIdx];
    if (!deleting) {
      multiText.textContent = word.substring(0, cIdx + 1);
      cIdx++;
      if (cIdx === word.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      multiText.textContent = word.substring(0, cIdx - 1);
      cIdx--;
      if (cIdx === 0) {
        deleting = false;
        wIdx = (wIdx + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 60 : 90);
  }

  setTimeout(typeLoop, 1200);
}

/* ===== TILT EFFECT ON CARDS ===== */
document.querySelectorAll('.arch-card, .kp-card, .tl-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

/* ===== PARTICLE DOTS (hero section) ===== */
(function spawnParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 22; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1.5;
    const x    = Math.random() * 100;
    const dur  = 12 + Math.random() * 18;
    const del  = Math.random() * 10;
    Object.assign(dot.style, {
      position: 'absolute',
      width:  size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: Math.random() > 0.5 ? 'rgba(0,212,255,0.35)' : 'rgba(124,58,237,0.35)',
      left: x + '%',
      top:  (Math.random() * 100) + '%',
      pointerEvents: 'none',
      zIndex: '0',
      animation: `floatParticle ${dur}s ${del}s linear infinite`,
    });
    hero.appendChild(dot);
  }

  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes floatParticle {
        0%   { transform: translateY(0)   scale(1);   opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.6; }
        100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();

/* ===== GLITCH LOGO (subtle) ===== */
(function glitchLogo() {
  const logo = document.querySelector('.logo-img');
  if (!logo) return;
  setInterval(() => {
    logo.style.filter = 'brightness(1.3) hue-rotate(20deg)';
    setTimeout(() => { logo.style.filter = 'brightness(1.1)'; }, 80);
  }, 6000);
})();

/* ===== PROGRESS BAR ON SCROLL ===== */
(function progressBar() {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position: 'fixed', top: '0', left: '0',
    height: '2px', width: '0%',
    background: 'linear-gradient(90deg, #0066ff, #00d4ff)',
    zIndex: '9999', transition: 'width 0.1s ease',
    pointerEvents: 'none',
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
})();

/* ===== BACK TO TOP ===== */
(function backToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.title = 'Haut de page';
  Object.assign(btn.style, {
    position: 'fixed', bottom: '3rem', right: '3rem',
    width: '4.8rem', height: '4.8rem', borderRadius: '50%',
    background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
    color: '#fff', fontSize: '1.8rem',
    display: 'none', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', border: 'none', outline: 'none',
    boxShadow: '0 0 2rem rgba(0,212,255,0.4)',
    zIndex: '999', transition: 'transform 0.2s, box-shadow 0.2s',
  });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 500 ? 'flex' : 'none';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-4px) scale(1.1)';
    btn.style.boxShadow = '0 0 4rem rgba(0,212,255,0.7)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.boxShadow = '0 0 2rem rgba(0,212,255,0.4)';
  });
})();

/* ===== CONSOLE EASTER EGG ===== */
console.log('%c🖥️  Cloud Privé HCI — PFE 2025', 'color:#00d4ff;font-size:18px;font-weight:bold;');
console.log('%cConçu par Ayoub Ben Moussa · Tanger Med Port Authority', 'color:#7a9ab5;font-size:12px;');
console.log('%cStack : Proxmox VE · Ceph · pfSense · Terraform · Ansible · ELK', 'color:#7c3aed;font-size:11px;');