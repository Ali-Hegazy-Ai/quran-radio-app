# Contributing to Quran Kareem Radio | المساهمة في إذاعة القرآن الكريم

بسم الله الرحمن الرحيم

Thank you for your interest in contributing! This project aims to make Quran Kareem Radio more accessible worldwide.

شكراً لاهتمامك بالمساهمة! يهدف هذا المشروع لتسهيل الوصول إلى إذاعة القرآن الكريم في جميع أنحاء العالم.

## Getting Started

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/quran-radio-app.git
cd quran-radio-app

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env.local

# 5. Start development server
npm run dev
```

## Development Guidelines

### Code Style
- **TypeScript** — all files must be typed
- **Components** — one component per file in `src/components/`
- **Utilities** — shared logic in `src/lib/`
- **CSS** — Tailwind classes preferred, custom CSS in `globals.css`

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: add new audio visualization
fix: resolve volume slider RTL issue
docs: update README with deployment steps
style: improve card glassmorphism effect
refactor: simplify audio engine state machine
```

### Branch Naming
```
feature/description
fix/description
docs/description
```

## Pull Request Process

1. Create a feature branch from `master`
2. Make your changes
3. Run `npm run build` — must pass with zero errors
4. Submit a PR with a clear description
5. Wait for review

## What to Contribute

### 🟢 Good First Issues
- Improve accessibility (aria labels, keyboard navigation)
- Add more languages beyond Arabic and English
- Improve mobile responsiveness
- Write tests

### 🟡 Feature Ideas
- Sleep timer
- Favorite stations list
- PWA support (offline page, install prompt)
- Audio recording/bookmark timestamps
- Dark/light theme toggle

### 🔴 Please Don't
- Add tracking or analytics
- Add advertisements
- Modify the disclaimer or attribution
- Add non-Islamic content

## Code of Conduct

Be respectful. This is a project for the Muslim community. Please maintain Islamic etiquette (adab) in all interactions.

## Questions?

Open a [Discussion](https://github.com/Ali-Hegazy-Ai/quran-radio-app/discussions) or [Issue](https://github.com/Ali-Hegazy-Ai/quran-radio-app/issues).

---

جزاكم الله خيراً — May Allah reward you for your contributions.
