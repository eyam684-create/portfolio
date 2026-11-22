
/* ============================================================
   main.js — Portfolio interactions
   - Scroll reveal (IntersectionObserver)
   - Typing effect
   - Navbar active section highlight
   - Language toggle (FR/EN)
   - Timeline tabs
   - Contact form (mailto fallback)
   - Dynamic content rendering from texts.js
   ============================================================ */

(function () {
  'use strict';

  let currentLang = 'fr';

  /* ============================================================
     1. SCROLL REVEAL — IntersectionObserver
     ============================================================ */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');

          const chips = entry.target.querySelectorAll('.skill-chip');
          chips.forEach(function (chip, i) {
            chip.style.animationDelay = (i * 0.06) + 's';
            chip.classList.add('animate-in');
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     2. TYPING EFFECT
     ============================================================ */
  let typingTimeout = null;

  function startTypingEffect() {
    const el = document.getElementById('hero-typing-text');
    if (!el) return;

    const texts = TEXTS.hero[currentLang].typingTexts;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    if (typingTimeout) clearTimeout(typingTimeout);

    function type() {
      const current = texts[textIndex];

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 400;
      }

      typingTimeout = setTimeout(type, speed);
    }

    el.textContent = '';
    type();
  }

  /* ============================================================
     3. NAVBAR — scroll highlight + background
     ============================================================ */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('.section[id]');
    const hamburger = document.getElementById('nav-hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('nav-overlay');

    window.addEventListener('scroll', function () {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      let currentSection = '';

      sections.forEach(function (section) {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('active');
        }
      });
    });

    function closeMenu() {
      if (navLinksContainer) navLinksContainer.classList.remove('open');
      if (hamburger) hamburger.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (hamburger && navLinksContainer && navOverlay) {
      hamburger.addEventListener('click', function () {
        const isOpen = navLinksContainer.classList.contains('open');

        if (isOpen) {
          closeMenu();
        } else {
          navLinksContainer.classList.add('open');
          hamburger.classList.add('open');
          navOverlay.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ============================================================
     4. LANGUAGE TOGGLE
     ============================================================ */
  function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      btn.textContent = currentLang === 'fr' ? 'EN' : 'FR';

      updateAllTexts();
      startTypingEffect();

      if (typeof window.updateChatLang === 'function') {
        window.updateChatLang(currentLang);
      }
    });
  }

  function updateAllTexts() {
    const lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const keys = el.getAttribute('data-i18n').split('.');
      let val = TEXTS;

      for (const k of keys) {
        val = val[k];
        if (!val) break;
      }

      if (val && val[lang] !== undefined) {
        el.textContent = val[lang];
      } else if (val) {
        el.textContent = val;
      }
    });

    setText('hero-greeting', TEXTS.hero[lang].greeting);
    setText('hero-tagline', TEXTS.hero[lang].tagline);
    setText('btn-projects', TEXTS.hero[lang].btnProjects);
    setText('btn-cv', TEXTS.hero[lang].btnCV);
    setText('btn-contact', TEXTS.hero[lang].btnContact);

    setText('about-title', TEXTS.about[lang].title);
    setHTML('about-text', TEXTS.about[lang].text);
    setText('stat-label-projects', TEXTS.about[lang].statsProjects);
    setText('stat-label-internships', TEXTS.about[lang].statsInternships);
    setText('stat-label-certs', TEXTS.about[lang].statsCertifications);
    setText('stat-label-events', TEXTS.about[lang].statsEvents);

    setText('skills-title', TEXTS.skills[lang].title);
    setText('projects-title', TEXTS.projects[lang].title);
    setText('timeline-title', TEXTS.timeline[lang].title);
    setText('tab-experience', TEXTS.timeline[lang].experienceTab);
    setText('tab-education', TEXTS.timeline[lang].educationTab);
    setText('tab-certifications', TEXTS.timeline[lang].certificationsTab);

    setText('cv-title', TEXTS.cv[lang].title);
    setText('cv-download-btn', TEXTS.cv[lang].downloadBtn);
    setText('cv-video-title', TEXTS.cv[lang].videoTitle);

    setText('contact-title', TEXTS.contact[lang].title);
    setText('contact-subtitle', TEXTS.contact[lang].subtitle);
    setText('contact-or-reach', TEXTS.contact[lang].orReach);
    setPlaceholder('form-name', TEXTS.contact[lang].formName);
    setPlaceholder('form-email', TEXTS.contact[lang].formEmail);
    setPlaceholder('form-message', TEXTS.contact[lang].formMessage);
    setText('form-send', TEXTS.contact[lang].formSend);

    setText('footer-made', TEXTS.footer[lang].madeWith);
    setText('footer-by', TEXTS.footer[lang].by);
    setText('footer-rights', TEXTS.footer[lang].rights);

    const navKeys = Object.keys(TEXTS.nav[lang]);

    document.querySelectorAll('.nav-links a[data-nav]').forEach(function (a) {
      const key = a.getAttribute('data-nav');

      if (TEXTS.nav[lang][key]) {
        a.textContent = TEXTS.nav[lang][key];
      }
    });

    document.querySelectorAll('[data-skill-label]').forEach(function (el) {
      const key = el.getAttribute('data-skill-label');

      if (key === 'soft') {
        const container = el.closest('.skill-category');

        if (container) {
          const chipsEl = container.querySelector('.skill-chips');

          if (chipsEl) {
            const items = lang === 'fr'
              ? ["Autonomie", "Rigueur", "Travail en équipe", "Leadership", "Communication", "Adaptabilité"]
              : ["Autonomy", "Rigor", "Teamwork", "Leadership", "Communication", "Adaptability"];

            chipsEl.innerHTML = items.map(function (item) {
              return '<span class="skill-chip">' + item + '</span>';
            }).join('');
          }
        }
      }
    });

    setText('assoc-title', lang === 'fr' ? 'Associations & Engagement' : 'Associations & Engagement');
    setText('lang-title', lang === 'fr' ? 'Langues' : 'Languages');

    renderProjects(lang);
    renderTimeline(lang);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.textContent = text;
  }

  function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el && html !== undefined) el.innerHTML = html;
  }

  function setPlaceholder(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) el.placeholder = text;
  }

  /* ============================================================
     5. RENDER PROJECTS (from knowledge.json)
     ============================================================ */
  function renderProjects(lang) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    fetch('data/knowledge.json')
      .then(function (r) {
        if (!r.ok) throw new Error('Impossible de charger knowledge.json');
        return r.json();
      })
      .then(function (data) {
        container.innerHTML = '';

        data.projects.forEach(function (p) {
          const title = p['title_' + lang] || p.title || '';
          const desc = p['description_' + lang] || p.description_fr || '';
          const link = p.link || '#';
          const viewText = TEXTS.projects[lang].viewProject;

          const projectName = (p.title_fr || p.title || '').toLowerCase();

          let folder = '';

          if (projectName.includes('mitigo')) {
            folder = 'mitigo';
          } else if (projectName.includes('routage')) {
            folder = 'routage-medical';
          } else if (projectName.includes('ai night')) {
            folder = 'ai-night-challenge';
          } else if (projectName.includes('hôtel') || projectName.includes('hotel')) {
            folder = 'gestion-hoteliere';
          }

          const mediaFiles = {
            'mitigo': [
              'image-1.png',
              'image-2.png',
              'image-3.png'
            ],
            'routage-medical': [
              'image-1.png',
              'image-2.png',
              'video.mp4'
            ],
            'ai-night-challenge': [
              'image-1.png',
              'image-2.png',
              'video.mp4'
            ],
            'gestion-hoteliere': [
              'video.mp4'
            ]
          };

          const media = (mediaFiles[folder] || []).map(function (file) {
            return 'assets/images/projects/' + folder + '/' + file;
          });

          const card = document.createElement('div');
          card.className = 'project-card reveal';

          card.innerHTML = `
            <div class="project-image project-gallery">
              <div class="gallery-viewer"></div>

              ${media.length > 1 ? `
                <button class="gallery-arrow gallery-prev"
                        type="button" aria-label="Image précédente">‹</button>
                <button class="gallery-arrow gallery-next"
                        type="button" aria-label="Image suivante">›</button>
                <div class="gallery-counter"></div>
              ` : ''}
            </div>

            <div class="project-body">
              <h3 class="project-title">${title}</h3>
              <p class="project-desc">${desc}</p>

              <div class="project-tech">
                ${(p.tech || []).map(function (t) {
                  return '<span class="project-tech-chip">' + t + '</span>';
                }).join('')}
              </div>

              ${link !== '[TO FILL]'
                ? '<a href="' + link + '" class="project-link" target="_blank">' + viewText + ' →</a>'
                : '<span class="project-link" style="opacity:0.4">' + viewText + ' → [TO FILL]</span>'}
            </div>
          `;

          container.appendChild(card);

          const viewer = card.querySelector('.gallery-viewer');
          let currentIndex = 0;

          function showMedia(index) {
            if (!media.length) {
              viewer.innerHTML = '<div class="project-image-placeholder">🤖</div>';
              return;
            }

            currentIndex = (index + media.length) % media.length;
            const file = media[currentIndex];

            viewer.innerHTML = '';

            if (file.endsWith('.mp4')) {
              const video = document.createElement('video');
              video.src = file;
              video.controls = true;
              video.preload = 'metadata';
              viewer.appendChild(video);
            } else {
              const img = document.createElement('img');
              img.src = file;
              img.alt = title;

              img.onerror = function () {
                viewer.innerHTML = '<p>Image introuvable : ' + file + '</p>';
              };

              viewer.appendChild(img);
            }

            const counter = card.querySelector('.gallery-counter');

            if (counter) {
              counter.textContent = (currentIndex + 1) + ' / ' + media.length;
            }
          }

          const prev = card.querySelector('.gallery-prev');
          const next = card.querySelector('.gallery-next');

          if (prev) {
            prev.addEventListener('click', function () {
              showMedia(currentIndex - 1);
            });
          }

          if (next) {
            next.addEventListener('click', function () {
              showMedia(currentIndex + 1);
            });
          }

          showMedia(0);
        });

        initScrollReveal();
      })
      .catch(function (error) {
        console.error('Erreur lors du chargement des projets :', error);
      });
  }

  /* ============================================================
     6. RENDER TIMELINE
     ============================================================ */
  function renderTimeline(lang) {
    fetch('data/knowledge.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {

        /* Experience */
        const expContainer = document.getElementById('timeline-experience');

        if (expContainer) {
          expContainer.innerHTML = '<div class="timeline-line">' +
            data.experience.map(function (e) {
              const title = e['title_' + lang] || e.title_fr || '';
              const desc = e['description_' + lang] || e.description_fr || '';
              const date = e['date_' + lang] || e.date || '';

              return `
                <div class="timeline-item reveal">
                  <span class="timeline-date">${date}</span>
                  <h3 class="timeline-title">${title}</h3>
                  <p class="timeline-company">${e.company}</p>
                  <p class="timeline-desc">${desc}</p>
                  <div class="timeline-tech-chips">
                    ${(e.tech || []).map(function (t) {
                      return '<span class="timeline-tech-chip">' + t + '</span>';
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('') +
            '</div>';
        }

        /* Education */
        const eduContainer = document.getElementById('timeline-education');

        if (eduContainer) {
          eduContainer.innerHTML = '<div class="timeline-line">' +
            data.education.map(function (e) {
              const title = e['title_' + lang] || e.title_fr || '';
              const details = e['details_' + lang] || e.details_fr || '';
              const date = e['date_' + lang] || e.date || '';

              return `
                <div class="timeline-item reveal">
                  <span class="timeline-date">${date}</span>
                  <h3 class="timeline-title">${title}</h3>
                  <p class="timeline-company">${e.institution}</p>
                  ${details ? '<p class="timeline-desc">' + details + '</p>' : ''}
                </div>
              `;
            }).join('') +
            '</div>';
        }

        /* Certifications */
        const certContainer = document.getElementById('timeline-certifications');

        if (certContainer) {
          certContainer.innerHTML = '<div class="certifications-list">' +
            data.certifications.map(function (c) {
              return `
                <div class="certification-card reveal">
                  <div class="certification-title">${c.title}</div>
                  <div class="certification-org">${c.org}</div>
                  <div class="certification-year">${c.year}</div>
                </div>
              `;
            }).join('') +
            '</div>';
        }

        initScrollReveal();
      });
  }

  /* ============================================================
     7. TIMELINE TABS
     ============================================================ */
  function initTimelineTabs() {
    const tabs = document.querySelectorAll('.timeline-tab');
    const contents = document.querySelectorAll('.timeline-content');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.getAttribute('data-tab');

        tabs.forEach(function (t) {
          t.classList.remove('active');
        });

        tab.classList.add('active');

        contents.forEach(function (c) {
          c.classList.remove('active');

          if (c.id === 'timeline-' + target) {
            c.classList.add('active');
          }
        });

        initScrollReveal();
      });
    });
  }

  /* ============================================================
     8. CONTACT FORM (mailto fallback)
     ============================================================ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) return;

      const subject = encodeURIComponent('Contact via Portfolio – ' + name);

      const body = encodeURIComponent(
        'Nom : ' + name + '\n' +
        'Email : ' + email + '\n\n' +
        message
      );

      window.location.href = 'mailto:eyam684@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

  /* ============================================================
     9. SCROLL TO TOP
     ============================================================ */
  function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     10. INIT ALL
     ============================================================ */
  function init() {
    initScrollReveal();
    startTypingEffect();
    initNavbar();
    initLangToggle();
    initTimelineTabs();
    initContactForm();
    initScrollTop();
    renderProjects(currentLang);
    renderTimeline(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
