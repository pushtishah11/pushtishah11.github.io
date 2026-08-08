# pushtishah11.github.io

Personal portfolio — live at **[pushtishah11.github.io](https://pushtishah11.github.io)**

![screenshot](photos/screenshot.png)
<!-- take a screenshot of the homepage and save it as photos/screenshot.png -->

## What it is

A zero-dependency, single-page portfolio built in vanilla HTML/CSS/JS. No framework, no build step, no `node_modules` — by choice. The whole thing ships as three files and loads instantly.

## Features

- **Interactive terminal hero** — auto-types an intro on load, then accepts real commands (`whoami`, `now`, `projects`, `help`…)
- **Quake-style drop-down console** — press <code>`</code> on any page (or the `>_` button) for keyboard-driven navigation across the whole site
- **Custom hash router** — six pages (`/about`, `/experience`, `/projects`, `/skills`, `/beyond`, `/contact`) handled in ~10 lines of JS, no router library
- **Bento-grid layout** — responsive down to mobile
- **Amber-phosphor terminal theme** — a nod to vintage CRTs, easy on the eyes
- Accessible defaults: visible keyboard focus, `prefers-reduced-motion` respected, semantic markup

## Structure

```
├── index.html        # markup for all six pages
├── css/styles.css    # design tokens + all styling
├── js/main.js        # hash router, terminal, drop-down console
└── photos/           # images for the beyond-work page
```

## Running locally

No build step. Either open `index.html` directly, or:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Stack

Vanilla JS · CSS custom properties · IBM Plex Mono/Sans · GitHub Pages

---

Built by [Pushti Shah](https://www.linkedin.com/in/pushti11) — Math–CS @ UC San Diego '27, AI Engineering Intern @ Paramount/CBS News.
