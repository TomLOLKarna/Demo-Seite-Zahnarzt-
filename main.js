// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav__links a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Burger menu toggle (mobile)
const burger = document.querySelector('.nav__burger');
const navEl = document.querySelector('.nav');
burger.addEventListener('click', () => navEl.classList.toggle('nav--open'));

// Booking form demo submit
document.querySelector('.booking-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  btn.textContent = '✓ Anfrage gesendet!';
  btn.style.background = '#16a34a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Termin anfragen →';
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
});

// Nav scroll shadow
window.addEventListener('scroll', () => {
  document.querySelector('.nav-wrapper').style.boxShadow =
    window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.08)' : 'none';
});
