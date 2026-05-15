# Clarity

Clarity is an accessibility-focused reading workspace designed to help people with dyslexia, ADHD, low vision, reading fatigue, and focus difficulties consume digital text more comfortably.

The app lets users paste text, read it in a calm interface, listen with browser text-to-speech, adjust reading preferences, and use focus mode to move through content one paragraph at a time.

## Features

- Paste, edit, simplify, and clear text in a single reader panel
- Browser text-to-speech with play and pause controls
- Adjustable reading font size
- Dyslexia-friendly font mode
- Dark mode and high contrast mode
- Focus reading mode with active paragraph highlighting
- Accurate word count and reading time estimate
- Responsive layout for desktop and mobile
- Keyboard-accessible controls and semantic HTML
- Reduced-motion support for users who prefer less animation

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- React Router

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  components/
    AccessibilityControls.jsx
    Footer.jsx
    HeroSection.jsx
    Navbar.jsx
    ReaderPanel.jsx
    ReadingWorkspace.jsx
  utils/
    textStats.js
  App.jsx
  index.css
  main.jsx
```

## Accessibility Notes

Clarity prioritizes readable typography, large interactive targets, strong focus states, contrast options, and support for reduced motion. The goal is to make reading controls visible and direct without requiring an account or complex setup.

## Deployment

This project is ready to deploy on Vercel.

Recommended Vercel settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

## Status

Clarity is still in active development. Future improvements may include saved local preferences, better voice controls, paragraph navigation shortcuts, document upload, and optional AI-powered summaries.
