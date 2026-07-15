# Ratul Koley Portfolio

A dark, responsive personal portfolio for Ratul Koley, a Full Stack Developer and Team Lead. The website uses React, Vite, Tailwind CSS v4, Framer Motion, Lucide React, and React Icons.

## Run locally

```bash
npm install
npm run dev
```

Create an optimized production bundle with:

```bash
npm run build
```

## Project structure

```
src/
├── components/       # Reusable UI primitives and navigation
├── data/portfolio.js # All portfolio content and resume data
├── layouts/          # Shared page shell
├── sections/         # Page sections
├── App.jsx           # Page composition
└── index.css         # Tailwind entry and global styles
public/
└── Resume_Minimal.pdf
```

## Customize content

Update `src/data/portfolio.js` to change personal details, navigation, statistics, skills, experience, projects, education, and contact information. Components intentionally source portfolio content from this file so updates remain centralized.

The current resume file is served from `public/Resume_Minimal.pdf`. Replace it with an updated version using the same name, or update the `resume` property in `src/data/portfolio.js`.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the default Vite build settings (`npm run build`, output directory `dist`).
4. Deploy.

Vercel will build the site and serve the static `dist` output.
