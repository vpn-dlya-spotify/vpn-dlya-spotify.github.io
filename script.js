/* ============================================================
   VPN для Huawei — Script 2026
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Read progress bar ──
  const progressBar = document.getElementById('read-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }, { passive: true });
  }

  // ── Back to top button ──
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Mobile menu ──
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      burgerBtn.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Active nav pill on scroll ──
  const navLinks = document.querySelectorAll('.nav-pills a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const link = document.querySelector(`.nav-pills a[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));
  }

  // ── VPN card filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vpnCards = document.querySelectorAll('.vpn-card[data-tags]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      vpnCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
        } else {
          const tags = (card.dataset.tags || '').split(' ');
          card.style.display = tags.includes(filter) ? '' : 'none';
        }
      });
    });
  });

  // ── VPN card expand/collapse ──
  document.querySelectorAll('.vpn-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const extra = document.getElementById(targetId);
      if (!extra) return;
      const isOpen = extra.classList.toggle('open');
      btn.classList.toggle('active', isOpen);
    });
  });

  // ── Install method tabs ──
  const installTabs = document.querySelectorAll('#install-tabs .pill-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  installTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      installTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      tabContents.forEach(content => {
        content.style.display = content.id === targetId ? '' : 'none';
      });
    });
  });

  // ── Fade-up on scroll (IntersectionObserver) ──
  const fadeEls = document.querySelectorAll('.vpn-card, .review-card, .method-card, .bento-card');
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

    fadeEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      fadeObserver.observe(el);
    });
  }

  // ── Smooth anchor scroll with offset for sticky nav ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.site-nav')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
