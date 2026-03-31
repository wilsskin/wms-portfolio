// case-nav.js
// Side navigation: smooth scroll, active link tracking, staggered entry animation

(function initCaseNavOnce() {
  if (window.__caseNavInit) return;
  window.__caseNavInit = true;

  function initSidebarNav() {
    const sectionLinks = document.querySelectorAll('.side-nav-section-link');
    const sections = document.querySelectorAll('section[id]');
    if (!sectionLinks.length || !sections.length) return;

    // Smooth scrolling for section links
    sectionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Update active section based on scroll position
    function updateActiveSection() {
      const scrollPosition = window.scrollY + 100;

      // Near top → Context (hero) active
      if (scrollPosition < 200) {
        sectionLinks.forEach(link => link.classList.remove('active'));
        const heroLink = document.querySelector('.side-nav-section-link[href="#hero"]');
        if (heroLink) heroLink.classList.add('active');
        return;
      }

      // Find current section
      let currentSection = null;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop) {
          currentSection = section;
        }
      }

      sectionLinks.forEach(link => link.classList.remove('active'));
      if (currentSection) {
        const active = document.querySelector(`.side-nav-section-link[href="#${currentSection.id}"]`);
        if (active) active.classList.add('active');
      }
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // Default: Context active if none
    if (!document.querySelector('.side-nav-section-link.active')) {
      const heroLink = document.querySelector('.side-nav-section-link[href="#hero"]');
      if (heroLink) heroLink.classList.add('active');
    }

    // Staggered entry animation on first scroll
    const sectionsContainer = document.querySelector('.side-nav-sections');
    if (sectionsContainer) {
      const items = sectionsContainer.querySelectorAll('.side-nav-pill, .side-nav-section-link');

      window.addEventListener('scroll', function onFirstScroll() {
        window.removeEventListener('scroll', onFirstScroll);
        sectionsContainer.classList.add('revealed');

        // Stagger each item's transition
        items.forEach((item, i) => {
          const delay = i * 60; // 60ms stagger
          item.style.transition = `opacity 350ms cubic-bezier(0.25, 0, 0, 1) ${delay}ms, transform 350ms cubic-bezier(0.25, 0, 0, 1) ${delay}ms, color 0.2s ease`;
        });
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarNav);
  } else {
    initSidebarNav();
  }
})();
