/* ============================================================
   chat.js — AI Assistant Widget
   - Keyword-matching chatbot using data/knowledge.json
   - Suggested question chips
   - FR/EN support
   - Ready for a real LLM backend: just set CHAT_API_ENDPOINT
   ============================================================ */

(function () {
  'use strict';

  /* ---- Configuration ---- */
  /* Set this to your backend URL to switch from local matching to LLM.
     Example: "https://your-api.example.com/chat"
     The endpoint should accept POST { message, lang } and return { reply }. */
  const CHAT_API_ENDPOINT = null;

  let knowledgeBase = null;
  let chatOpen = false;
  let currentLang = 'fr';

  /* ---- Load knowledge base ---- */
  async function loadKnowledge() {
    try {
      const res = await fetch('data/knowledge.json');
      knowledgeBase = await res.json();
    } catch (e) {
      console.warn('Could not load knowledge.json', e);
    }
  }

  /* ---- Local keyword matching ---- */
  function localAnswer(message) {
    if (!knowledgeBase) return getFallback();

    const lower = message.toLowerCase();
    const keywords = knowledgeBase.chatbot_responses.keywords;
    const responses = knowledgeBase.chatbot_responses[currentLang];

    /* Score each category */
    let bestCategory = null;
    let bestScore = 0;

    for (const [category, words] of Object.entries(keywords)) {
      let score = 0;
      for (const word of words) {
        if (lower.includes(word.toLowerCase())) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category;
      }
    }

    /* Greeting detection */
    const greetings = ['bonjour', 'salut', 'hello', 'hi', 'hey', 'coucou', 'bonsoir'];
    for (const g of greetings) {
      if (lower.includes(g)) return responses.greeting;
    }

    if (bestCategory && bestScore > 0 && responses[bestCategory]) {
      return responses[bestCategory];
    }

    return responses.fallback || getFallback();
  }

  function getFallback() {
    if (currentLang === 'en') {
      return "I'm not sure I understand. Try asking about Eya's skills, projects, education, or how to contact her! 😊";
    }
    return "Je ne suis pas sûr de comprendre. Essayez de me demander des infos sur les compétences, projets, formation ou comment contacter Eya ! 😊";
  }

  /* ---- Send message (local or API) ---- */
  async function sendMessage(text) {
    if (!text.trim()) return;

    addMessage(text, 'user');
    clearSuggestions();

    /* Show typing indicator */
    const typingId = showTyping();

    let reply;
    if (CHAT_API_ENDPOINT) {
      /* ---- Remote LLM backend ---- */
      try {
        const res = await fetch(CHAT_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, lang: currentLang })
        });
        const data = await res.json();
        reply = data.reply || getFallback();
      } catch (e) {
        reply = currentLang === 'fr'
          ? "Désolé, le service est temporairement indisponible. Essayez plus tard !"
          : "Sorry, the service is temporarily unavailable. Try again later!";
      }
    } else {
      /* ---- Local matching ---- */
      await new Promise(r => setTimeout(r, 500 + Math.random() * 500));
      reply = localAnswer(text);
    }

    removeTyping(typingId);
    addMessage(reply, 'bot');
    showSuggestions();
  }

  /* ---- UI Helpers ---- */
  function addMessage(text, sender) {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function showTyping() {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.id = 'chat-typing';
    div.innerHTML = '<span style="opacity:0.6">●●●</span>';
    div.style.animation = 'msgSlideIn 0.3s var(--ease-out)';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return 'chat-typing';
  }

  function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function showSuggestions() {
    const container = document.getElementById('chat-suggestions');
    if (!container || !knowledgeBase) return;
    container.innerHTML = '';
    const questions = knowledgeBase.chatbot_responses.suggested_questions[currentLang] || [];
    questions.forEach(function (q) {
      const btn = document.createElement('button');
      btn.className = 'chat-suggestion';
      btn.textContent = q;
      btn.addEventListener('click', function () {
        sendMessage(q);
      });
      container.appendChild(btn);
    });
  }

  function clearSuggestions() {
    const container = document.getElementById('chat-suggestions');
    if (container) container.innerHTML = '';
  }

  /* ---- Toggle Chat Window ---- */
  window.toggleChat = function (forceOpen) {
    const win = document.getElementById('chat-window');
    if (!win) return;

    if (typeof forceOpen === 'boolean') {
      chatOpen = forceOpen;
    } else {
      chatOpen = !chatOpen;
    }

    if (chatOpen) {
      win.classList.add('open');
      /* Show greeting on first open */
      const msgs = document.getElementById('chat-messages');
      if (msgs && msgs.children.length === 0) {
        if (knowledgeBase) {
          addMessage(knowledgeBase.chatbot_responses[currentLang].greeting, 'bot');
        }
        showSuggestions();
      }
      /* Focus input */
      setTimeout(function () {
        const input = document.getElementById('chat-input');
        if (input) input.focus();
      }, 300);
    } else {
      win.classList.remove('open');
    }
  };

  /* ---- Update language for chat ---- */
  window.updateChatLang = function (lang) {
    currentLang = lang;
    /* Update placeholder text */
    const input = document.getElementById('chat-input');
    if (input && typeof TEXTS !== 'undefined') {
      input.placeholder = TEXTS.chat[lang].placeholder;
    }
    /* Update header title */
    const title = document.querySelector('.chat-header-title');
    if (title && typeof TEXTS !== 'undefined') {
      title.textContent = TEXTS.chat[lang].title;
    }
  };

  /* ---- Initialize ---- */
  function initChat() {
    loadKnowledge();

    /* FAB click */
    const fab = document.getElementById('chat-fab');
    if (fab) {
      fab.addEventListener('click', function () { window.toggleChat(); });
    }

    /* Close button */
    const closeBtn = document.getElementById('chat-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () { window.toggleChat(false); });
    }

    /* Send button */
    const sendBtn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    if (sendBtn && input) {
      sendBtn.addEventListener('click', function () {
        sendMessage(input.value);
        input.value = '';
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage(input.value);
          input.value = '';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }
})();
