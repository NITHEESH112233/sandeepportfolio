// Sandeep Reddy Yadala - Clean Mechanical Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize theme
  initTheme();
});

/* ==========================================================
   1. THEME SWITCHER (Dark / Light)
   ========================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('sandeep_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  themeToggle?.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('sandeep_theme', isDark ? 'dark' : 'light');
    showToast(isDark ? 'Dark theme enabled' : 'Light theme enabled');
  });
}

/* ==========================================================
   2. CV MODAL & DOWNLOAD / PRINT
   ========================================================== */
function downloadOrPrintCV() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }
}

function closeCVModal() {
  const modal = document.getElementById('cvModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Close modal on outside click
document.getElementById('cvModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'cvModal') {
    closeCVModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCVModal();
  }
});

/* ==========================================================
   3. COPY UTILITY & TOAST
   ========================================================== */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2400);
}

function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied to clipboard: ${text}`);
    if (btnElement) {
      btnElement.classList.add('text-emerald-500');
      setTimeout(() => {
        btnElement.classList.remove('text-emerald-500');
      }, 1500);
    }
  }).catch(() => {
    showToast('Failed to copy text');
  });
}

/* ==========================================================
   4. CONTACT FORM HANDLER
   ========================================================== */
function sendDirectEmail(event) {
  event.preventDefault();
  const name = document.getElementById('contactName')?.value || '';
  const email = document.getElementById('contactEmail')?.value || '';
  const message = document.getElementById('contactMessage')?.value || '';

  const subject = `Portfolio Inquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  const mailtoUrl = `mailto:sandeepreddyyadala89@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;

  showToast('Launching email client...');
}
