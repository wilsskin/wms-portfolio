// main.js
// Add any site-wide JavaScript here

// First paint gate - reveal page after images load
(function() {
  if (document.readyState === 'complete') {
    // Already fully loaded
    document.documentElement.classList.add('ready');
  } else {
    // Wait for all resources (including images) to load
    window.addEventListener('load', function() {
      document.documentElement.classList.add('ready');
    });

    // Safety timeout - show page even if some images are slow
    setTimeout(function() {
      document.documentElement.classList.add('ready');
    }, 300);
  }
})();

// Case study thumbnails: wait until decoded, then reveal all together so
// CSS transition-delay produces a clean stagger. Prevents the flash where
// the page becomes visible before the images have painted.
(function() {
  const thumbnails = document.querySelectorAll('.work-preview');
  if (!thumbnails.length) return;

  const reveal = () => thumbnails.forEach(img => img.classList.add('loaded'));

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveal();
    return;
  }

  const decodes = Array.from(thumbnails).map(img => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return img.decode().catch(() => new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    }));
  });

  Promise.all(decodes).then(reveal);
  setTimeout(reveal, 1200);
})();

const RESUME_URL = 'https://drive.google.com/file/d/1NfbM-w1RAvNZbPZS0g8rHo0r04S-XuhN/view?usp=sharing';

// 1) Global: hydrate resume links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[data-resume-link]').forEach(a => {
    a.setAttribute('href', RESUME_URL);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });
});

// 2) Global: mobile menu controls (referenced by inline onclick handlers)
window.toggleMobileMenu = function toggleMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  const hamburger = document.querySelector('.hamburger');
  if (!overlay || !hamburger) return;
  overlay.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
};

window.closeMobileMenu = function closeMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  const hamburger = document.querySelector('.hamburger');
  if (!overlay || !hamburger) return;
  overlay.classList.remove('active');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
};

// 3) Global: non-breaking listeners (guarded to avoid duplicates while inline scripts still exist)
document.addEventListener('DOMContentLoaded', () => {
  // Guard to prevent duplicate attachment while inline scripts still run
  if (!window.__globalMenuInit) {
    window.__globalMenuInit = true;

    const overlay = document.getElementById('mobileMenuOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) window.closeMobileMenu();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') window.closeMobileMenu();
    });
  }

  // Logo hover (desktop side-nav only). Guard against duplicate listeners
  if (!window.__logoHoverInit) {
    window.__logoHoverInit = true;
    const logo = document.querySelector('.side-nav-logo img');
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'rotate(10deg)';
      });
      logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'rotate(0deg)';
      });
    }
  }

  // About interests photo captions - tap to reveal on mobile
  if (!window.__interestsCaptionsInit) {
    window.__interestsCaptionsInit = true;
    document.querySelectorAll('.about-interests-photo').forEach(photo => {
      photo.addEventListener('click', function() {
        if (window.innerWidth <= 481) {
          const isActive = this.classList.contains('active');
          document.querySelectorAll('.about-interests-photo').forEach(p => p.classList.remove('active'));
          if (!isActive) this.classList.add('active');
        }
      });
    });
  }

  // Hero image: tap to toggle color reveal on mobile/tablet (≤1032px)
  const heroImageWrap = document.getElementById('heroImageWrap');
  if (heroImageWrap && !window.__heroTapRevealInit) {
    window.__heroTapRevealInit = true;
    heroImageWrap.addEventListener('click', function() {
      if (window.innerWidth <= 1032) {
        this.classList.toggle('hero-image--active');
      }
    });
  }
});
