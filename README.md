# 🎭 Artistly.com – AI-Powered Performing Artist Booking Platform

✨ **Artistly.com** is a full-stack, AI-enhanced platform that enables **Event Planners** to discover, evaluate, and connect with **Performing Artists**, while allowing **Artist Managers** to onboard and manage talent through a structured dashboard.

The platform combines **modern web technologies, machine learning, and AI-driven search** to deliver an intelligent, scalable artist discovery experience.

---

## 📌 Comprehensive Project Overview

Artistly is designed as a **multi-role platform** with intelligent features across discovery, onboarding, validation, and interaction:

### 🔍 For Event Planners

* Browse artists across multiple categories (singers, dancers, DJs, speakers, etc.)
* Apply advanced filters:

  * 💰 Fee range
  * 📍 Location
  * 🎭 Category
* View detailed artist profiles
* Request booking quotes (demo flow)
* Interact with an **AI Assistant** for:

  * Smart artist discovery
  * Personalized recommendations
  * Context-aware queries based on real database data

---

### 🎤 For Artist Managers

* Secure authentication (login/register)
* Onboard artists via a **multi-step form**
* Upload and validate profile images using ML
* Store structured artist data in **MongoDB**
* View and manage submissions via dashboard

---

### 🤖 AI-Powered Experience (Core Highlight)

A fully integrated **AI Chat Assistant** enhances discovery:

* Uses **Groq API (LLM inference)** for ultra-fast responses
* Implements **RAG (Retrieval-Augmented Generation)**:

  * Fetches relevant artist data from MongoDB
  * Injects context into prompts
  * Produces grounded, accurate answers
* Handles natural queries like:

  * “I am looking for a dancer to book for Friday evening”
  * “Suggest artists for a wedding”
* Reduces hallucination via **structured prompt engineering**

---

### 🧠 Intelligent Media Validation

* Uses **TensorFlow.js + COCO-SSD**
* Ensures uploaded artist images:

  * ✔️ Contain a human
  * ❌ Do not contain text/logos

---

### ⚡ System Architecture Highlights

* **Next.js 15 App Router** with Server Components
* **API Routes for backend logic** (auth, AI, data)
* **Prisma ORM** for database interaction
* **MongoDB** for persistent storage
* **Zustand + Context API** for state management
* **Suspense & Streaming UI** for performance

---

## 📸 Profile Image Appropriateness Check

Artistly ensures high-quality profiles using ML-based validation.

✔️ Must contain a person
❌ Must not contain text-like objects

### ✅ Approved

![Profile Approved](/public/screenshots/profile-image-approved.png)

### ❌ Unapproved

![Profile Unapproved](/public/screenshots/profile-image-unapproved.png)
![Profile Unapproved](/public/screenshots/profile-image-unapproved1.png)

---

## 🎥 Project Demo

👉 [https://www.youtube.com/watch?v=2rOZXsLHYWs](https://www.youtube.com/watch?v=2rOZXsLHYWs)

---

## 🚀 Tech Stack

### 🧩 Core Technologies

* **Next.js 15 (App Router + Server Components)**
* **React (Hooks + Functional Components)**
* **Prisma ORM**
* **MongoDB**

---

### 🎨 Frontend & UX

* Tailwind CSS (responsive design)
* Framer Motion (animations)
* Zustand (state management)
* MUI Icons

---

### 🧪 Forms & Validation

* React Hook Form
* Yup schema validation

---

### 🤖 AI & Backend Intelligence (⭐ Key Highlight)

* Groq API (LLM inference)
* RAG (Retrieval-Augmented Generation)
* MongoDB-based context retrieval
* Prompt engineering for structured outputs
* Custom `/api/chat` endpoint

---

### 🧠 Machine Learning

* TensorFlow.js
* COCO-SSD object detection

---

```bash

📦 artistly/
├── actions/                # Server actions (auth, artist CRUD, AI execution)
│   ├── chat/run-ai.js      # Core AI execution logic (Groq API call + response handling)
│   ├── fetch-artist.js     # Fetch artists from DB with filters
│   ├── login.js            # User authentication logic
│   ├── register.js         # User registration logic
│   ├── onboard-artist.js   # Create new artist entries in DB
│
├── context/                # Global React Context (app-wide state)
│   ├── theme-context.js    # Light/Dark mode toggle
│
├── hooks/                  # Custom React hooks
│   ├── use-fetch-artist.js # Client-side data fetching with filters (useEffect + state)
│
├── lib/                    # Core integrations & shared services
│   ├── cloudinary.js       # Cloudinary config
│   ├── cloudinary-upload.js# Image upload handler
│   ├── vision-check.js     # TensorFlow.js image validation (person detection, no text)
│   ├── db.js               # MongoDB/Prisma DB connection setup
│
├── prisma/                 # Prisma ORM configuration
│   ├── schema.prisma       # Database schema (users, artists, etc.)
│
├── schemas/                # Form validation schemas (Yup)
│   ├── login-schema.js
│   ├── register-schema.js
│   ├── onboarding-schema.js
│
├── utils/                  # Shared utility functions
│   ├── chat/               # ⭐ AI/RAG utility layer
│       ├── build-context.js        # Builds RAG context from MongoDB data
│       ├── build-redirect-url.js   # Generates navigation links from AI responses
│       ├── extract-filters.js      # Parses user intent into structured filters
│       ├── get-session-history.js  # Maintains chat history for conversational context
│       ├── parse-ai-response.js    # Ensures structured/JSON AI output parsing
│   ├── date-formatter.js  # Formats timestamps & UI-friendly dates
│   ├── user.js            # User helper utilities (lookup, formatting, etc.)
│
├── public/                 # Static assets
│   ├── images/            # UI images
│   ├── screenshots/       # README/demo screenshots
│   ├── models/            # ML models (COCO-SSD, TensorFlow assets)
│
├── src/app/               # Next.js App Router (pages + API routes)
│   ├── api/               # Backend API endpoints
│       ├── artists/       # Artist APIs (fetch/filter)
│       ├── bookings/      # Booking-related endpoints
│       ├── chat/          # ⭐ AI chatbot endpoint (RAG + Groq)
│       ├── create-checkout-session/ # Payment/checkout session (e.g., Stripe)
│       ├── dashboard/     # Dashboard data APIs
│   ├── artists/           # Artist listing page
│   ├── cancel/            # Payment cancel page
│   ├── dashboard/         # Manager dashboard UI
│   ├── get-quote/         # Quote request flow
│   ├── onboard/           # Artist onboarding flow
│   ├── state/             # Zustand global store
│   ├── success/           # Payment success page
│   ├── page.js            # Homepage
│   ├── layout.js          # Root layout (shared UI + providers)
│   ├── loading.js         # Suspense fallback loader
│   ├── globals.css        # Tailwind base styles
│
├── components/            # Reusable UI components
│   ├── navbar/            # Navigation bar
│   ├── hero/              # Landing hero section
│   ├── explore-artists/   # ArtistCard, FilterPanel, listing UI
│   ├── artist-categories/ # Category navigation & discovery UI
│   ├── onboard-artists/   # Multi-step onboarding form components
│   ├── dashboard/         # Tables, charts, analytics UI
│   ├── testimonials/      # Testimonials section (static/demo)
│   ├── footer/            # Footer with animations
│   ├── chatbot-popup.js   # Floating AI chatbot UI component
│
├── data/                  # Static/mock data (fallback/demo content)
│   ├── artists.js
│   ├── dashboard.js
│   ├── testimonials.js
│
├── .env                   # Environment variables (DB, Groq, Cloudinary, etc.)
├── package.json
├── next.config.js
└── README.md

```

## 📱 Pages & Features

### 🏠 Homepage

![Hero Section](/public/screenshots/hero_section.png)

* Hero section with animations
* Category exploration
* Responsive layout

---

### 🔍 Explore Artists

![Explore Artists](/public/screenshots/explore-artists.png)

* MongoDB-driven artist listing
* Advanced filtering
* Custom hook (`useFetchArtists`) using `useEffect`

---

### 🤖 AI Chat Assistant 

![AI Chatbot](/public/screenshots/chatbot.png)

* Floating chatbot interface
* Real-time Groq-powered responses
* Context-aware answers using MongoDB data
* Enhances discovery beyond traditional filters

---

### 📝 Onboard Artist

![Onboarding Artist](/public/screenshots/onboarding-artists.png)

* Multi-step form
* File uploads
* Schema validation (Yup)
* ML-based image moderation

---

### 📊 Manager Dashboard

![Manager Dashboard](/public/screenshots/manager-dashboard.png)

* View artist submissions
* Manage onboarding data
* Static analytics (demo)

---

### 🌙 Theme & UX Enhancements

* Dark/Light mode via Context API
* Smooth animations (Framer Motion)
* Responsive mobile-first design

---

### ⚡ Performance & Optimization

* Suspense + streaming UI
* Dynamic imports for heavy components
* Optimized images using Next.js

---

## 🌐 SEO & Accessibility

* Semantic HTML structure
* Accessible forms with labels & ARIA
* Optimized images (`next/image`)
* Lazy loading & code splitting

---

## 🧪 Test Accounts

### 👨‍💼 Admin / Manager

* Email: [artistly@manager.com](mailto:artistly@manager.com)
* Password: test123

---

### 👤 Test User (Event Planner)

* Email: [testuser@example.com](mailto:testuser@example.com)
* Password: test1234

---

## 🔐 Environment Variables

# 🗄️ Database
DATABASE_URL=your_mongodb_connection_string

# 💳 Stripe (Payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# 🤖 AI (Groq LLM)
GROQ_API_KEY=your_groq_api_key

# ☁️ Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

---

## 🥪 Running Locally

```bash
git clone https://github.com/Krisha1703/artistly.git
cd artistly
npm install
npx prisma generate
npm run dev
```

👉 [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

🌍 Live on Vercel:
👉 [https://krisha-artistly-app.vercel.app](https://krisha-artistly-app.vercel.app)

---

