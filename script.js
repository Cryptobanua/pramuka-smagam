// Mobile nav toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const isLight = root.classList.toggle('light');
    themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('light');
}

// Events data (contoh — ganti sesuai kegiatan)
const eventData = [
  { date: '2025-09-05', title: 'Latihan Gabungan', desc: 'Materi pioneering & tali-temali.' },
  { date: '2025-09-20', title: 'Perjusami', desc: 'Perkemahan Sabtu–Minggu di lapangan sekolah.' },
  { date: '2025-10-10', title: 'Aksi Bakti Lingkungan', desc: 'Bersih-bersih sekolah & penanaman pohon.' },
];

// Render timeline
const eventsWrap = document.getElementById('events');
if (eventsWrap) {
  eventData.forEach(ev => {
    const item = document.createElement('article');
    item.className = 'event';
    item.innerHTML = `<time datetime="${ev.date}">${new Date(ev.date).toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'})}</time>
      <strong>${ev.title}</strong>
      <p>${ev.desc}</p>`;
    eventsWrap.appendChild(item);
  });
}

// Forms simple validation
function setupForm(formId, msgId, successText) {
  const form = document.getElementById(formId);
  const msg = document.getElementById(msgId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());
    for (const v of Object.values(entries)) {
      if (!v || String(v).trim().length < 2) {
        msg.textContent = 'Isi semua field dengan benar.';
        return;
      }
    }
    msg.textContent = successText + ' (simulasi).';
    form.reset();
  });
}
setupForm('contactForm', 'formMsg', 'Terima kasih! Pesan Anda diterima');
setupForm('registerForm', 'regMsg', 'Pendaftaran berhasil');

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    lightboxImg.src = src;
    lightbox.showModal();
  });
});
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.hasAttribute('data-close')) lightbox.close();
});

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
