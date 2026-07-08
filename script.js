// EJN — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  // ---- Accordion functionality ----
  const triggers = document.querySelectorAll('.accordion-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ---- Page fade-in on load ----
  document.body.style.animation = 'fadeIn 0.4s ease both';

  // ---- Per-click page transition ----
  // Any internal link fades the page out before navigating,
  // giving a smooth transition between pages instead of a hard jump.
  const internalLinkSelector = 'a[href]:not([href^="http"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="#"]):not([target="_blank"])';
  document.querySelectorAll(internalLinkSelector).forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = href; }, 320);
    });
  });

  // ---- Animate nav/drive/help cards on scroll ----
  if ('IntersectionObserver' in window) {
    // Only animate these — NOT accordion items
    const cards = document.querySelectorAll(
      '.nav-card, .drive-card, .help-card, .about-card, .section-block, .cloud-shape'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s, border-color 0.25s, box-shadow 0.25s, background 0.25s`;
      observer.observe(card);
    });
  }

});