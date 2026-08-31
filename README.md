# Aurora — Outfits in Your Colour

> A personalised fashion discovery platform that uses colour theory, style profiling, and outfit matching to curate looks that feel distinctly yours.

**Live Demo:** https://aurora-nine-lilac.vercel.app/

---

## ✨ Overview

Aurora is a personalised fashion styling web application designed to answer a simple question:

> **What should I wear when I want an outfit that actually feels like me?**

Instead of presenting users with a generic catalogue of outfits, Aurora builds a personal style profile and uses that profile to rank outfits according to colour harmony and styling characteristics.

The application combines:

- Personal style onboarding
- Photo-based colour estimation
- A style questionnaire
- Seasonal colour analysis
- Colour theory
- Outfit matching and ranking
- Personalised styling explanations
- Curated outfit discovery
- Category and sorting controls
- Saved outfits
- Outfit detail views
- A visual colour-signature dial
- Responsive editorial fashion UI

Aurora is built as a frontend-first application and currently operates without a backend or external API dependency for its core recommendation flow.

---

# 🎯 The Problem

Most fashion discovery platforms primarily recommend clothing based on trends, popularity, or broad categories.

However, a visually appealing outfit is not necessarily an outfit that works for a particular person.

Aurora approaches the problem from the opposite direction.

Instead of asking:

> "What outfits are popular?"

Aurora asks:

> **"Which outfits are most compatible with this person's colouring and style characteristics?"**

The system uses characteristics such as:

- Undertone
- Contrast level
- Colour depth
- Seasonal colour profile
- Face shape
- Hair characteristics
- Loved colours
- Avoided colours
- Outfit palette
- Outfit warmth
- Outfit contrast
- Occasion
- Style category

These attributes are combined to produce a personalised outfit ranking.

---

# 🧠 How Aurora Works

Aurora follows a multi-stage personalisation flow.

```text
                    ┌─────────────────────┐
                    │       Aurora        │
                    │  Personal Styling   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Onboarding      │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌────────────────┐         ┌────────────────┐
        │ Upload a Photo │         │  Take the Quiz │
        └───────┬────────┘         └───────┬────────┘
                │                          │
                └────────────┬─────────────┘
                             ▼
                    ┌─────────────────────┐
                    │ Colour / Style Data │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Season Engine     │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Style Profile     │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Outfit Match Engine │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Ranked Outfit Feed  │
                    └─────────────────────┘
```

---

# 👤 Personalised Onboarding

Aurora begins with an onboarding experience designed to build a user's style profile.

Users can choose between two primary paths.

### 📸 Photo Analysis

Users can upload a photo and Aurora analyses visual colour information from the image.

The current lightweight analysis extracts signals including:

- Estimated skin colour
- Estimated hair colour
- Undertone
- Contrast level
- Colour depth

The analysis is performed client-side using image pixels and colour calculations.

The application deliberately treats face-shape detection as a low-confidence estimate rather than pretending to provide a fully trained facial-landmark model.

This keeps the prototype transparent about what is actually being calculated.

### 📝 Style Quiz

Users can alternatively provide information through the onboarding questionnaire.

This makes the application usable even when a user does not want to upload a photograph.

The quiz allows the application to construct a profile from user-provided style preferences and characteristics.

---

# 🎨 Seasonal Colour Analysis

Aurora uses a seasonal colour system to classify the user's colouring.

The engine considers:

- Warmth
- Contrast
- Lightness / depth

The available seasonal profiles are used to calculate a ranked list of possible colour seasons.

The season engine converts the user's characteristics into numerical values and compares them with the target characteristics of each season.

The result is a **match score**, not a statistical probability.

The top-ranked season is then used to construct the user's `StyleProfile`.

---

# 🌈 Colour Theory Engine

Colour intelligence is one of the central concepts of Aurora.

The application analyses the relationship between a user's colour profile and the colour palette of an outfit.

Outfits contain structured colour metadata such as:

```text
Palette
Warmth
Contrast
Season
Occasion
Style
```

The engine can then compare the outfit against the user's profile.

For example:

```text
User
├── Season: Bright Winter
├── Undertone: Cool
├── Contrast: High
└── Target colours
        │
        ▼
Outfit
├── Palette: Navy / Ice Blue / White
├── Warmth: Cool
└── Contrast: High
        │
        ▼
High compatibility
```

This allows Aurora to rank outfits based on colour compatibility rather than simply displaying them in a fixed order.

---

# 👗 Outfit Recommendation Engine

Every outfit in the catalogue contains structured metadata.

Each outfit can include:

- Title
- Image
- Source
- Category
- Colour palette
- Individual clothing items
- Season compatibility
- Occasion
- Style characteristics
- Warmth
- Contrast

The recommendation system analyses every outfit against the current user's profile.

The application then produces a match score for each look and sorts the catalogue accordingly.

The main feed therefore becomes:

```text
Curated Catalogue
       ↓
Profile Analysis
       ↓
Outfit Analysis
       ↓
Compatibility Score
       ↓
Ranking
       ↓
Personalised Feed
```

---

# 🗂️ Fashion Catalogue

Aurora's catalogue is designed as a structured fashion library rather than a collection of unrelated demo images.

Looks are organised into four primary categories:

- **Casual**
- **Formal**
- **Street**
- **Evening**

Each outfit is represented as structured data so that the recommendation engine can reason about it.

Example:

```text
Champagne After Dark

Category:
Evening

Palette:
Champagne / Ivory / Brown

Season:
Autumn / Winter

Occasion:
Party / Wedding / Formal Event

Style:
Romantic / Quiet Luxury

Warmth:
Warm

Contrast:
Medium
```

This metadata-driven approach makes it possible to expand the catalogue without changing the recommendation architecture.

---

# 🧩 Project Structure

```text
Aurora/
│
├── public/
│   └── favicon.svg
│
├── scripts/
│   └── build-standalone.mjs
│
├── src/
│   │
│   ├── ai/
│   │   └── faceAnalysis.ts
│   │
│   ├── components/
│   │   ├── feed/
│   │   │   ├── Avatar.tsx
│   │   │   ├── ColorDial.tsx
│   │   │   ├── DetailDrawer.tsx
│   │   │   ├── GridHeader.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Nav.tsx
│   │   │   ├── OutfitCard.tsx
│   │   │   ├── OutfitGrid.tsx
│   │   │   └── UploadModal.tsx
│   │   │
│   │   └── onboarding/
│   │       ├── Onboarding.tsx
│   │       ├── PhotoStep.tsx
│   │       ├── QuizStep.tsx
│   │       ├── SeasonStep.tsx
│   │       └── types.ts
│   │
│   ├── data/
│   │   ├── outfits.ts
│   │   ├── profile.ts
│   │   └── seasons.ts
│   │
│   ├── lib/
│   │   ├── color.ts
│   │   ├── colorTheory.ts
│   │   ├── hash.ts
│   │   ├── motion.ts
│   │   ├── photoAnalysis.ts
│   │   └── seasonEngine.ts
│   │
│   ├── state/
│   │   └── ProfileContext.tsx
│   │
│   ├── test/
│   │   ├── engine.test.ts
│   │   ├── seasonEngine.test.ts
│   │   └── setup.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── aurora.template.html
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

# 🛠️ Technology Stack

Aurora is built using modern frontend technologies.

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe application development |
| Vite | Development server and production build |
| Tailwind CSS | Styling and responsive UI |
| Motion | UI animations and transitions |
| Lucide React | Interface icons |
| MediaPipe Tasks Vision | Vision-related capability support |
| Vitest | Testing |
| Testing Library | Component testing |
| Browser localStorage | Persisting saved looks |

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

---

## 1. Clone the repository

```bash
git clone https://github.com/acorn266/Aurora.git
```

Move into the project directory:

```bash
cd Aurora
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Start the development server

```bash
npm run dev
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173/
```

If that port is already in use, Vite will automatically select another available port.

---

# ☁️ Deployment

Aurora is deployed using Vercel.

### Live application

https://aurora-nine-lilac.vercel.app/

### Deploying your own copy

1. Fork or clone the repository.
2. Install dependencies.
3. Push the repository to GitHub.
4. Import the repository into Vercel.
5. Select **Vite** as the framework preset.
6. Use the default project root.
7. Deploy.

For the current project, Vercel builds the application from the GitHub repository.

---

# 🤖 AI & Intelligence

Aurora is designed around an intelligent recommendation architecture, but the current prototype does not depend on a remote generative-AI API for its core outfit-ranking process.

Instead, the application uses deterministic algorithms for:

- Colour analysis
- Seasonal classification
- Outfit matching
- Outfit ranking
- Styling explanations

This has several advantages during development:

- No API key required
- No API costs
- No backend required
- Fast local execution
- Reproducible results
- Easier testing

The architecture leaves room for future integration with more advanced multimodal AI systems.

---

## 👩‍💻 Author

**Aastha** 

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aastha-karn-61876a298/)

---

<div align="center">
Built with ❤️ 
</div>
