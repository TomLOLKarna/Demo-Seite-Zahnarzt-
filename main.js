// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// ===== NAV SCROLL STATE =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== ACTIVE NAV LINKS =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => io.observe(s));

// ===== BURGER MENU =====
const burger = document.querySelector('.nav__burger');
const navEl = document.querySelector('.nav');
burger.addEventListener('click', () => navEl.classList.toggle('nav--open'));
document.addEventListener('click', e => {
  if (!navEl.contains(e.target)) navEl.classList.remove('nav--open');
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimal = parseInt(el.dataset.decimal) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    // ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = decimal > 0 ? value.toFixed(decimal) + suffix : Math.floor(value) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ===== PARTICLES IN HERO =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 10 + 10;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ===== CARD 3D TILT =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    card.style.transition = 'box-shadow .35s, border-color .35s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'box-shadow .35s, transform .35s, border-color .35s';
  });
});

// ===== BUTTON RIPPLE =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${x}px; top: ${y}px;
      background: rgba(255,255,255,.25);
      border-radius: 50%;
      pointer-events: none;
      transform: scale(0);
      animation: ripple-anim .5s ease-out forwards;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Add ripple keyframe dynamically
const style = document.createElement('style');
style.textContent = `@keyframes ripple-anim { to { transform: scale(1); opacity: 0; } }`;
document.head.appendChild(style);

// ===== BOOKING FORM =====
document.querySelector('.booking-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  const span = btn.querySelector('span');
  const original = span.textContent;
  span.textContent = '✓ Anfrage gesendet!';
  btn.style.background = '#16a34a';
  btn.style.borderColor = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    span.textContent = original;
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.disabled = false;
  }, 3500);
});

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      navEl.classList.remove('nav--open');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
