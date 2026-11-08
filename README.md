# Jonathan Farr Therapy — Website Redesign

Boutique private-pay therapy practice website redesign for **Jonathan Farr, M.Ed., M.S., LMHC** (`#10134`, Massachusetts).

- **Current Live Site:** [https://www.jonathanfarrtherapy.com/](https://www.jonathanfarrtherapy.com/) ([/about](https://www.jonathanfarrtherapy.com/about))
- **Strategic Intake Brief:** [Project Brief - Boutique Therapy Website Redesign.md](./Project%20Brief%20-%20Boutique%20Therapy%20Website%20Redesign.md)
- **Existing Copy & URL Reference:** [docs/existing-site-reference.md](./docs/existing-site-reference.md)

---

## 1. Strategic Positioning & Target Audience

Transitioning from general coverage to a specialized, private-pay practice requires an immediate five-second impression: **“This guy’s different.”**

### Core Niche
High-achievers struggling with imposter syndrome—especially adult children of narcissistic or abusive parents—who are ready to stop cycles of people-pleasing and emerge into a life that truly belongs to them.

### Key Populations Called Out
- **Aviation Professionals:** Pilots, Air Traffic Control Specialists (ATCS), and Flight Attendants navigating cockpit/controller stress and FAA medical certification concerns.
- **Performers & Creatives:** Musicians, actors, TV presenters, and creative directors battling performance anxiety and perfectionism.
- **Managers, Leaders & Academics:** Executives, product leads, and PhD candidates carrying high-stakes external expectations while feeling like a fraud internally.
- **Adult Children of Narcissistic Parents:** Breaking generational people-pleasing, establishing boundaries, and reconnecting daily behaviors to personal values.

### Why Private-Pay ($200 / 55-Minute Virtual Session)
1. **Scheduling Flexibility:** Immediate openings Monday–Thursday without six-month in-network waitlists.
2. **Values-Driven Clarity:** Connecting daily behaviors back to sustainable personal values (community, relationships, self-confidence) rather than external metrics.
3. **Uniqueness & Candor:** Active, colorful, often humorous reflection and metaphor (such as the autocross tire-chirp limit) rather than passive clinical nodding.
4. **Out-of-Network Reimbursement:** Monthly superbills provided + instant out-of-network benefits verification via the integrated **Mentaya** widget.

---

## 2. Visual Language & Aesthetic Guardrails

- **Benchmarks:**
  - [**Braun**](https://www.braun.com/) — Functional industrial clarity, warm alabaster/carbon contrast, exposed structural hairlines, and purposeful signal-orange accents (`#E04F26`).
  - [**Rey Junco**](https://www.reyjunco.com/) — Strong editorial typography and clear narrative pacing (without purple color schemes).
- **Anti-Inspiration (Strictly Avoided):**
  - Generic therapy clichés (empty couches, stacked zen stones, waiting-room stock photography, muted beige/sage sameness).
  - Visual clutter or unintuitive navigation paths that obscure the primary CTA (**Schedule a Free 15-Minute Consultation**).

---

## 3. Repository Structure

```text
├── Project Brief - Boutique Therapy Website Redesign.md
├── docs/
│   └── existing-site-reference.md   # Full copy & external URL snapshot of current Squarespace site
├── scripts/
│   └── security-audit.mjs           # Zero-dependency pre-commit secret scanner
├── src/
│   ├── components/
│   │   └── Layout.tsx               # Semantic shell, telemetry header, and conversion footer
│   ├── data/
│   │   └── siteContent.ts           # Structured copy, populations, credentials, and FAQs
│   ├── pages/
│   │   ├── HomePage.tsx             # Hero, Tipping Points, Autocross Metaphor, Pillars, FAQs
│   │   ├── AboutPage.tsx            # "I was an imposter, too", Signal vs. Noise, Fit Matrix
│   │   ├── AviationPage.tsx         # Aviation mental health & FAA reporting transparency
│   │   └── ServicesPage.tsx         # Private-pay rates, superbills, & Mentaya OON widget
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 4. Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Type-check and build for production
npm run build

# Run pre-commit security & secret scan
npm run audit:secrets
```
