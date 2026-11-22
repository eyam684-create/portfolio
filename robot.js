/* ============================================================
   robot.js — Cute Robot Mascot (inline SVG)
   - Idle floating animation (CSS)
   - Eyes follow the mouse cursor
   - Hover: closes eyes, happy smile, rose blush cheeks
   - Blink every few seconds
   - Click opens the chat assistant
   ============================================================ */

(function () {
  'use strict';

  /* ---- Build the robot SVG ---- */
  function createRobotSVG() {
    return `
    <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-label="Robot mascot" role="img">
      <!-- Antenna -->
      <line x1="100" y1="28" x2="100" y2="8" stroke="#f4a6c0" stroke-width="3" stroke-linecap="round"/>
      <circle cx="100" cy="6" r="5" fill="#ff7aa8">
        <animate attributeName="r" values="5;6;5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="100" cy="6" r="5" fill="none" stroke="#ff7aa8" stroke-width="1" opacity="0.4">
        <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
      </circle>

      <!-- Head -->
      <rect x="50" y="28" width="100" height="80" rx="20" ry="20" fill="#1a1a20" stroke="#ff7aa8" stroke-width="2"/>
      <!-- Head glow -->
      <rect x="50" y="28" width="100" height="80" rx="20" ry="20" fill="none" stroke="#ff7aa8" stroke-width="1" opacity="0.2" filter="url(#glow)"/>

      <!-- Eyes (open) — these are the pupils that follow the cursor -->
      <g class="robot-eye-open">
        <!-- Left eye socket -->
        <ellipse cx="78" cy="62" rx="14" ry="13" fill="#0d0d0f"/>
        <!-- Left pupil (will be moved by JS) -->
        <circle class="robot-pupil-left" cx="78" cy="62" r="6" fill="#ff7aa8">
          <animate attributeName="opacity" values="1;1;1;0.1;1" dur="4s" repeatCount="indefinite" begin="2s"/>
        </circle>
        <!-- Left eye highlight -->
        <circle cx="81" cy="58" r="2" fill="rgba(255,255,255,0.6)"/>

        <!-- Right eye socket -->
        <ellipse cx="122" cy="62" rx="14" ry="13" fill="#0d0d0f"/>
        <!-- Right pupil -->
        <circle class="robot-pupil-right" cx="122" cy="62" r="6" fill="#ff7aa8">
          <animate attributeName="opacity" values="1;1;1;0.1;1" dur="4s" repeatCount="indefinite" begin="2s"/>
        </circle>
        <!-- Right eye highlight -->
        <circle cx="125" cy="58" r="2" fill="rgba(255,255,255,0.6)"/>
      </g>

      <!-- Eyes (closed) — shown on hover -->
      <g class="robot-eye-closed">
        <line x1="66" y1="62" x2="90" y2="62" stroke="#ff7aa8" stroke-width="3" stroke-linecap="round"/>
        <line x1="110" y1="62" x2="134" y2="62" stroke="#ff7aa8" stroke-width="3" stroke-linecap="round"/>
        <!-- Happy curved lines above closed eyes -->
        <path d="M68 58 Q78 52 88 58" fill="none" stroke="#ff7aa8" stroke-width="2" stroke-linecap="round"/>
        <path d="M112 58 Q122 52 132 58" fill="none" stroke="#ff7aa8" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Blush cheeks (shown on hover) -->
      <ellipse class="robot-blush" cx="58" cy="76" rx="10" ry="6" fill="#ff7aa8" opacity="0.3"/>
      <ellipse class="robot-blush" cx="142" cy="76" rx="10" ry="6" fill="#ff7aa8" opacity="0.3"/>

      <!-- Mouth (normal) — small smile -->
      <path class="robot-mouth-normal" d="M90 82 Q100 90 110 82" fill="none" stroke="#f4a6c0" stroke-width="2" stroke-linecap="round"/>

      <!-- Mouth (happy) — big smile, shown on hover -->
      <path class="robot-mouth-happy" d="M82 80 Q100 98 118 80" fill="none" stroke="#ff7aa8" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Neck -->
      <rect x="90" y="108" width="20" height="12" rx="4" fill="#1a1a20" stroke="#ff7aa8" stroke-width="1.5"/>

      <!-- Body -->
      <rect x="40" y="118" width="120" height="72" rx="18" ry="18" fill="#1a1a20" stroke="#ff7aa8" stroke-width="2"/>
      <!-- Body chest light -->
      <circle cx="100" cy="148" r="10" fill="#0d0d0f" stroke="#ff7aa8" stroke-width="1.5"/>
      <circle cx="100" cy="148" r="5" fill="#ff7aa8" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <!-- Body panel lines -->
      <line x1="60" y1="168" x2="80" y2="168" stroke="#ff7aa8" stroke-width="1" opacity="0.3"/>
      <line x1="120" y1="168" x2="140" y2="168" stroke="#ff7aa8" stroke-width="1" opacity="0.3"/>

      <!-- Left arm -->
      <rect x="22" y="128" width="16" height="40" rx="8" fill="#1a1a20" stroke="#ff7aa8" stroke-width="1.5"/>
      <!-- Right arm -->
      <rect x="162" y="128" width="16" height="40" rx="8" fill="#1a1a20" stroke="#ff7aa8" stroke-width="1.5"/>

      <!-- Left leg -->
      <rect x="62" y="188" width="18" height="22" rx="8" fill="#1a1a20" stroke="#ff7aa8" stroke-width="1.5"/>
      <!-- Right leg -->
      <rect x="120" y="188" width="18" height="22" rx="8" fill="#1a1a20" stroke="#ff7aa8" stroke-width="1.5"/>

      <!-- Glow filter -->
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </svg>`;
  }

  /* ---- Initialize ---- */
  function initRobot() {
    const container = document.getElementById('robot-mascot');
    if (!container) return;

    container.innerHTML = createRobotSVG();

    const leftPupil = container.querySelector('.robot-pupil-left');
    const rightPupil = container.querySelector('.robot-pupil-right');
    let isHovered = false;

    /* Eye center positions in SVG coordinates */
    const LEFT_EYE  = { cx: 78, cy: 62 };
    const RIGHT_EYE = { cx: 122, cy: 62 };
    const MAX_MOVE  = 5; /* max pixels the pupil moves */

    /* ---- Eyes follow cursor ---- */
    function movePupils(e) {
      if (isHovered) return;
      const rect = container.getBoundingClientRect();
      const svgW = rect.width;
      const svgH = rect.height;

      /* Mouse position relative to SVG center */
      const mx = e.clientX - rect.left - svgW / 2;
      const my = e.clientY - rect.top - svgH / 2;

      /* Normalize to -1..1 */
      const nx = Math.max(-1, Math.min(1, mx / (svgW / 2)));
      const ny = Math.max(-1, Math.min(1, my / (svgH / 2)));

      leftPupil.setAttribute('cx', LEFT_EYE.cx + nx * MAX_MOVE);
      leftPupil.setAttribute('cy', LEFT_EYE.cy + ny * MAX_MOVE);
      rightPupil.setAttribute('cx', RIGHT_EYE.cx + nx * MAX_MOVE);
      rightPupil.setAttribute('cy', RIGHT_EYE.cy + ny * MAX_MOVE);
    }

    document.addEventListener('mousemove', movePupils);

    /* ---- Hover: close eyes + happy smile + blush ---- */
    container.addEventListener('mouseenter', function () {
      isHovered = true;
      container.classList.add('hovered');
    });
    container.addEventListener('mouseleave', function () {
      isHovered = false;
      container.classList.remove('hovered');
      /* Reset pupils to center */
      leftPupil.setAttribute('cx', LEFT_EYE.cx);
      leftPupil.setAttribute('cy', LEFT_EYE.cy);
      rightPupil.setAttribute('cx', RIGHT_EYE.cx);
      rightPupil.setAttribute('cy', RIGHT_EYE.cy);
    });

    /* ---- Click opens chat ---- */
    container.addEventListener('click', function () {
      if (typeof window.toggleChat === 'function') {
        window.toggleChat(true);
      }
    });

    /* ---- Periodic blink (without hover) ---- */
    const eyeOpen = container.querySelector('.robot-eye-open');
    function doBlink() {
      if (isHovered) return;
      eyeOpen.style.transition = 'opacity 0.1s';
      eyeOpen.style.opacity = '0';
      setTimeout(function () {
        eyeOpen.style.opacity = '1';
      }, 150);
    }
    setInterval(doBlink, 4000 + Math.random() * 2000);
  }

  /* Wait for DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRobot);
  } else {
    initRobot();
  }
})();
