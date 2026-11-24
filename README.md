# Shailesh Kasbekar: Portfolio

My personal developer portfolio. It's a static site (HTML, CSS and JavaScript) with no build step and no backend, hosted on GitHub Pages.

## Project structure

```
├── index.html          # Page markup and content
├── style.css           # Styles (dark theme, responsive layout, animations)
├── script.js           # Profile links config, navigation, scroll effects
├── resume.pdf          # Downloadable resume
├── .nojekyll           # Tells GitHub Pages to serve files as-is
├── assets/
│   └── images/
│       └── favicon.svg
└── README.md
```

## Updating profile links

Open `script.js` and fill in `PROFILE_LINKS` at the top:

```js
const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/your-profile/",
  github: "https://github.com/your-username",
  leetcode: "https://leetcode.com/u/your-username/",
  ...
};
```

Any link left empty stays hidden, so the site never shows a broken link.

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploying to GitHub Pages

1. Create a public repository named `<your-username>.github.io` (this gives the shortest URL).
2. Push all files to the `main` branch, keeping `index.html` at the repository root.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose branch **main** and folder **/ (root)**, then click **Save**.
5. After 1–2 minutes the site is live at `https://<your-username>.github.io/`.

## Tech

HTML5 · CSS3 · Vanilla JavaScript · Font Awesome · Google Fonts (Inter, JetBrains Mono)
