/* ============================================================
   texts.js — All translatable UI strings in one place.
   Edit texts here; the rest of the code reads from this object.
   ============================================================ */

const TEXTS = {
  /* ---- Navigation ---- */
  nav: {
    fr: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      experience: "Parcours",
      cv: "CV",
      contact: "Contact"
    },
    en: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Journey",
      cv: "Resume",
      contact: "Contact"
    }
  },

  /* ---- Hero ---- */
  hero: {
    fr: {
      greeting: "Bonjour, je suis",
      name: "Eya Mhiri",
      typingTexts: [
        "Étudiante en Systèmes Embarqués & IoT",
        "Passionnée de Robotique & IA",
        "Recherche Stage PFE"
      ],
      tagline: "Concevoir des systèmes intelligents et connectés, du prototype à la réalité.",
      btnProjects: "Voir mes projets",
      btnCV: "Télécharger mon CV",
      btnContact: "Me contacter"
    },
    en: {
      greeting: "Hello, I'm",
      name: "Eya Mhiri",
      typingTexts: [
        "Embedded Systems & IoT Student",
        "Robotics & AI Enthusiast",
        "Looking for a PFE Internship"
      ],
      tagline: "Designing smart and connected systems, from prototype to reality.",
      btnProjects: "See my projects",
      btnCV: "Download my CV",
      btnContact: "Contact me"
    }
  },

  /* ---- About ---- */
  about: {
    fr: {
      title: "À propos de moi",
      text: "Étudiante en 3e année de Licence en Ingénierie des Systèmes Informatiques (Systèmes Embarqués & IoT) à l'ISITCOM, j'ai conçu un robot AGV connecté (ESP32, capteurs infrarouges, commande Bluetooth) et développé des applications de gestion pour un hôtel. Passionnée par l'IoT, la robotique et l'IA, je recherche un stage de PFE pour concevoir des systèmes intelligents et connectés. Autonome, rigoureuse et Team Leader d'une équipe lauréate d'un challenge IA, j'apporte à l'entreprise rigueur technique, esprit d'équipe et sens de l'initiative.",
      statsProjects: "Projets",
      statsInternships: "Stages",
      statsCertifications: "Certifications",
      statsEvents: "Événements & Challenges"
    },
    en: {
      title: "About Me",
      text: "Third-year Bachelor student in Computer Systems Engineering (Embedded Systems & IoT) at ISITCOM. I designed a connected AGV robot (ESP32, infrared sensors, Bluetooth control) and developed management applications for a hotel. Passionate about IoT, robotics and AI, I am looking for a final-year internship to design smart and connected systems. Autonomous, rigorous, and Team Leader of an award-winning AI challenge team, I bring technical rigor, teamwork and initiative to the workplace.",
      statsProjects: "Projects",
      statsInternships: "Internships",
      statsCertifications: "Certifications",
      statsEvents: "Events & Challenges"
    }
  },

  /* ---- Skills ---- */
  skills: {
    fr: { title: "Compétences" },
    en: { title: "Skills" }
  },

  /* ---- Projects ---- */
  projects: {
    fr: {
      title: "Projets",
      viewProject: "Voir le projet",
      techLabel: "Technologies"
    },
    en: {
      title: "Projects",
      viewProject: "View project",
      techLabel: "Technologies"
    }
  },

  /* ---- Experience / Timeline ---- */
  timeline: {
    fr: {
      title: "Mon Parcours",
      experienceTab: "Expériences",
      educationTab: "Formation",
      certificationsTab: "Certifications"
    },
    en: {
      title: "My Journey",
      experienceTab: "Experience",
      educationTab: "Education",
      certificationsTab: "Certifications"
    }
  },

  /* ---- CV section ---- */
  cv: {
    fr: {
      title: "CV & Vidéo CV",
      downloadBtn: "Télécharger mon CV (PDF)",
      videoTitle: "Ma vidéo de présentation",
      videoPlaceholder: "[TO FILL — Ajoutez l'URL de votre vidéo YouTube ou un fichier vidéo]"
    },
    en: {
      title: "Resume & Video CV",
      downloadBtn: "Download my CV (PDF)",
      videoTitle: "My introduction video",
      videoPlaceholder: "[TO FILL — Add your YouTube video URL or video file]"
    }
  },

  /* ---- Contact ---- */
  contact: {
    fr: {
      title: "Me contacter",
      subtitle: "N'hésitez pas à me contacter pour discuter d'opportunités de stage, de projets ou de collaborations.",
      formName: "Votre nom",
      formEmail: "Votre email",
      formMessage: "Votre message",
      formSend: "Envoyer",
      orReach: "Ou contactez-moi directement :",
      emailLabel: "Email",
      phoneLabel: "Téléphone",
      locationLabel: "Localisation"
    },
    en: {
      title: "Contact Me",
      subtitle: "Feel free to reach out to discuss internship opportunities, projects, or collaborations.",
      formName: "Your name",
      formEmail: "Your email",
      formMessage: "Your message",
      formSend: "Send",
      orReach: "Or reach me directly:",
      emailLabel: "Email",
      phoneLabel: "Phone",
      locationLabel: "Location"
    }
  },

  /* ---- Footer ---- */
  footer: {
    fr: {
      madeWith: "Fait avec",
      by: "par Eya Mhiri",
      rights: "Tous droits réservés."
    },
    en: {
      madeWith: "Made with",
      by: "by Eya Mhiri",
      rights: "All rights reserved."
    }
  },

  /* ---- Chat Assistant ---- */
  chat: {
    fr: {
      title: "Assistant d'Eya",
      placeholder: "Posez-moi une question...",
      send: "Envoyer"
    },
    en: {
      title: "Eya's Assistant",
      placeholder: "Ask me a question...",
      send: "Send"
    }
  }
};
