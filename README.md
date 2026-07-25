# Resilienta - GenAI SUD Recovery & Prevention Platform

Resilienta is a production-ready, highly accessible React + Vite + Tailwind CSS web application designed as a multi-modal, GenAI-powered recovery and prevention platform. It supports individuals navigating Substance Use Disorder (SUD) and their caregivers during moments of high cognitive load.

Resilienta was created with high-contrast UI layouts, zero-typing inputs, native speech tools, and robust secure generative services to deliver immediate calming assistance in moments of panic, distress, or temptation.

---

## 🌟 Key Features

### 🎙️ 1. Zero-Typing Voice-First Interventions
- **Voice-First Input:** Integrated with the browser's native Web Speech API (`SpeechRecognition`). Users can speak their feelings instead of typing during high cognitive load.
- **Microphone Toggle:** Prominent pulsing microphone interface, keyboard-activated, with real-time transcript visualization.
- **Keyboard Fallback:** Seamless text-based fallback for browsers without Web Speech support or when microphone permissions are denied.

### 🔴 2. 1-Tap Emergency Quick Actions
High-contrast action chips trigger immediate generative support:
- 🔴 **Active Craving SOS:** Immediate calming techniques and reframing advice.
- 🟡 **Caregiver De-escalation Script:** Step-by-step guides for caregivers to de-escalate crisis relapse threats.
- 🟢 **Refusal Response Generator:** Confident, polite social scripts to refuse peer pressure.
- 🔵 **5-4-3-2-1 Grounding Tool:** Instant navigation to sensory grounding checklist.

### 🤖 3. GenAI Emergency Script Engine (Gemini 1.5 Flash)
- Integrated using the `@google/generative-ai` SDK to produce real-time, compassionate, clinical-grade coaching responses.
- **Narrator (Text-to-Speech):** Utilizes the Web Speech Synthesis API to read scripts aloud so users can close their eyes and listen during stress.
- **Robust Offline Fallbacks:** Automatically triggers pre-verified clinical scripts if the API key is missing or on network failures, guaranteeing immediate help.

### 🧘 4. Contextual Safety & Sensory Tools
- **4-7-8 Breathing Guide:** Interactive scaling circle (Inhale 4s, Hold 7s, Exhale 8s) powered by synchronized CSS keyframe transitions and countdown labels.
- **5-4-3-2-1 Sensory Grounding Wizard:** Step-by-step interactive checklist directing attention to sight, touch, sound, smell, and taste to redirect obsessive thoughts.

### 📚 5. Caregiver Coping & Resource Hub
- Interactive AI Search bar where caregivers can ask questions and receive Gemini-powered coping instructions.
- Pre-seeded educational quick-cards for boundaries, early trigger signs, relapse mitigation, and self-care.
- Live dialing tags for 24/7 national hotlines (988 Lifeline, SAMHSA, Crisis Text Line).

---

## 🛠️ Technology Stack

- **Framework:** React 19 (JSX, Hooks, Contexts)
- **Scaffolder/Bundler:** Vite 8 (ESM modules, optimized assets compilation)
- **Styling:** Tailwind CSS v4 (CSS-First variable configuration theme)
- **AI Engine:** Google AI Studio (Gemini 1.5 Flash API)
- **Testing:** Vitest + React Testing Library + JSDOM

---

## 📂 Project Directory Structure

```
resilienta/
├── dist/                     # Optimized production build distribution
├── src/
│   ├── assets/               # Static logo resources
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar & SUD vs Caregiver mode toggle
│   │   ├── VoiceInput.jsx    # Speech recognition & text area fallback
│   │   ├── QuickActions.jsx  # High-contrast crisis chips
│   │   ├── EmergencyScripts.jsx # Generative script container, markdown renderer & TTS
│   │   ├── GroundingTool.jsx # 4-7-8 Breathing Circle & 5-4-3-2-1 Wizard
│   │   ├── ResourceHub.jsx   # Q&A search bar & pre-seeded educational topics
│   │   └── Footer.jsx        # Helplines, privacy rules, and clinical disclaimer
│   ├── services/
│   │   └── geminiService.js  # Google Generative AI API client & offline fallbacks
│   ├── utils/
│   │   └── constants.js      # Prompt templates, fallback scripts, support contacts
│   ├── App.jsx               # Main state coordinator & layouts
│   ├── App.test.jsx          # Unit & integration tests
│   ├── index.css             # Main styling, Tailwind imports, scrollbar settings
│   └── main.jsx              # React app mount entrypoint
├── index.html                # App skeleton & SEO meta headers
├── package.json              # Package manifest and NPM scripts
├── postcss.config.js         # PostCSS plugins config (Tailwind v4 PostCSS)
└── README.md                 # Project documentation
```

---

## 🚀 Setup & Execution Instructions

### Prerequisites
Make sure you have Node.js (version 18+) and npm installed.

### 1. Installation
Clone the repository, navigate to the folder, and install all dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to a new file named `.env`:
```bash
cp .env.example .env
```
Open `.env` and enter your Gemini API Key from Google AI Studio:
```env
VITE_GEMINI_API_KEY=AIzaSy...your_actual_api_key...
```

*Note: If the key is not provided, Resilienta will automatically boot in **Offline Fallback Mode**, pulling pre-verified crisis guidelines locally.*

### 3. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the local address displayed (usually `http://localhost:5173`).

### 4. Run Unit Tests
To run the automated tests via Vitest:
```bash
npm run test
```
This runs the mounting, navigation, role-toggling, and quick-action integration tests under JSDOM.

### 5. Build for Production
To bundle and optimize the application for static deployment:
```bash
npm run build
```
This outputs optimized, minified HTML, CSS, and JS bundles to the `dist/` directory.

---

## ♿ Accessibility & Standards

Resilienta conforms to strict accessibility goals:
- **WCAG High Contrast:** Styled using high-contrast slate, indigo, rose, and amber hues suitable for people under cognitive load or sensory distress.
- **Aria-Labels:** Explicit `aria-label`, `aria-selected`, `role="tab"`, and `role="switch"` tags on all interactive widgets.
- **Keyboard Navigation:** Full support for `Tab`, `Enter`, and `Space` controls to ensure keyboard-only navigation.
- **Screen Reader Compatibility:** Pure semantic DOM structuring (`<main>`, `<section>`, `<nav>`, `<button>`).
