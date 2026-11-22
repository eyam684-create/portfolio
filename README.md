# Eya Mhiri — Portfolio

Personal portfolio website showcasing my skills, projects, and experience in Embedded Systems & IoT.

## Structure

```
portfolio/
├── index.html              # Main HTML
├── css/style.css            # All styles (colors in CSS variables at top)
├── js/
│   ├── texts.js             # All UI strings (easy to edit)
│   ├── main.js              # Scroll animations, navbar, language toggle
│   ├── robot.js             # Robot mascot SVG & interactions
│   └── chat.js              # Chat assistant widget
├── data/knowledge.json      # Knowledge base for the chat assistant
└── assets/
    └── cv-eya-mhiri.pdf     # CV file for download
```

## Preview locally

1. Open a terminal in the `portfolio/` folder
2. Run: `python -m http.server 8000`
3. Open `http://localhost:8000` in your browser

## Publish on GitHub Pages

1. Create a new GitHub repository (e.g., `eya-mhiri-portfolio`)
2. Push the contents of the `portfolio/` folder to the `main` branch
3. Go to **Settings > Pages** in your repository
4. Under "Source", select **Deploy from a branch**
5. Select the **main** branch and **/ (root)** folder
6. Click **Save** — your site will be live at `https://your-username.github.io/eya-mhiri-portfolio/`

## Customization

- **Colors**: Edit CSS variables at the top of `css/style.css`
- **Texts**: Edit `js/texts.js` for all UI strings (both FR and EN)
- **CV data**: Edit `data/knowledge.json` for projects, skills, etc.
- **Project images**: Place images in `assets/` and update paths in `knowledge.json`
