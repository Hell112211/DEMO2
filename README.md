# Slenora — Sleep guides for real life

A responsive, editorial-style sleep education website built with React, Vite, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

The production files are output to the `dist/` folder.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the site to GitHub Pages whenever you push to the `main` branch.

To enable it:

1. Push this repository to GitHub.
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` (or trigger the workflow manually) — your site goes live at `https://<your-username>.github.io/<repo-name>/`.

A `.nojekyll` file is added to the build output so GitHub serves Vite's asset filenames (which start with underscores) correctly.
