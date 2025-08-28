# 🎭 Artistly.com – Performing Artist Booking Platform

✨ **Artistly.com** is a functional, mobile-responsive **full-stack demo** of a fictional platform that connects **Event Planners** with **Artist Managers**.

Originally scoped as a frontend-only test, it now includes a real backend with **Next.js server components**, **Prisma**, and **MongoDB** for user authentication and artist submissions. It also uses **TensorFlow.js** with **COCO-SSD** to ensure profile images are appropriate.

---

## 📌 Project Overview

* **Event Planners** can:

  * Browse artist categories and profiles.
  * Filter artists by fee, location, and category.
  * Request quotes (demo action).

* **Artist Managers** can:

  * Onboard new artists via a multi-step, validated form.
  * Store artist data in a MongoDB database.
  * View artist submissions and manage leads through a simple dashboard.

🔒 **Note:** Some data, like testimonials and analytics, still use static JSON/mock files.

---

## 📸 **Profile Image Appropriateness Check**

Artistly uses **TensorFlow.js** with the **COCO-SSD** model to detect people and possible text-like objects in profile images.  
If the image:
- ✔️ **Contains at least one person**
- ❌ **Contains no text-like elements**

…it will be approved!

Examples:

✅ **Approved:**

![Profile Aapproved](/public/screenshots/profile-image-approved.png)

❌ **Unapproved Examples:**

![Profile Unapproved 1](/public/screenshots/profile-image-unapproved.png)
![Profile Unapproved 2](/public/screenshots/profile-image-unapproved1.png)

---

## 🎥 Project Video Demo

[![Watch the demo video](https://img.youtube.com/vi/gKN4PvytSzQ/0.jpg)](https://youtu.be/gKN4PvytSzQ)

👉 [Click here to watch the full video on YouTube](https://youtu.be/gKN4PvytSzQ)


---

## 🚀 Tech Stack

* **Next.js 15 (App Router)** — modern app router and react server components
* **React functional components & hooks** — `useState`, `useEffect`, `useContext` for state management and side effects
* **Prisma ORM** — for database operations with MongoDB
* **React Hook Form + Yup** — for robust form handling and validation
* **Tailwind CSS** — utility-first styling for responsive UI
* **Framer Motion** — page & component animations
* **Zustand** — simple state management
* **MUI Icons** — icon library support
* **Suspense** — with custom `Loading` fallback for streaming routes
- **TensorFlow.js + COCO-SSD** — smart profile image validation (person detected, no text)

---

## 📂 Project Structure Highlights

```bash
📦 artistly/
├── Actions/               # Server actions (login, register, fetch, onboard artist)
│   ├── fetch-artist.js
│   ├── login.js
│   ├── register.js
│   ├── onboard-artist.js
│
├── Context/               # Global React Context
│   ├── theme-context.js   # Theme toggling (light/dark)
│
├── Hooks/                 # Custom hooks
│   ├── use-fetch-artist.js # useEffect + useState logic
│
├── Lib/                   # Integrations & Prisma client
│   ├── cloudinary.js
│   ├── cloudinary-upload.js
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── db.js
│
├── Schemas/               # Yup validation schemas
│   ├── login-schema.js
│   ├── register-schema.js
│   ├── onboarding-schema.js
│
├── Utils/                 # Shared helper functions
│   ├── getUserByEmail.js
│
├── Public/                # Static assets & images
│   ├── images/
│   ├── screenshots/
│
├── src/app/               # Next.js App Router structure
│   ├── page.js            # Homepage
│   ├── loading.js         # Suspense fallback
│   ├── artists/page.js    # Artist listing page
│   ├── onboard/page.js    # Onboard artist form
│   ├── dashboard/page.js  # Manager dashboard
│   ├── state/store.js     # Zustand store
│   ├── globals.css        # Tailwind base styles
│
├── components/            # Reusable UI components
│   ├── navbar/            # Navigation bar
│   ├── hero/              # Hero section
│   ├── explore-artists/   # ArtistCard, FilterPanel
│   ├── onboard-artists/   # Onboarding form sections
│   ├── dashboard/         # Dashboard table & charts
│   ├── testimonials/      # Testimonials section
│   ├── footer/            # Footer with motion
│
├── data/                  # Mock/static data
│   ├── artists.js
│   ├── dashboard.js
│   ├── testimonials.js
│
├── .env                   # Environment variables (DB, Cloudinary)
├── package.json
├── next.config.js
└── README.md

```

---

## 📱 Pages & Features

✅ **Homepage:**
![Hero Section](/public/screenshots/hero_section.png)
Hero section, category cards, and smooth Framer Motion animations.

✅ **Explore Artists:**
![Explore Artists](/public/screenshots/explore-artists.png)
Artist cards grid with responsive filter panel. Data fetched from MongoDB via custom `useFetchArtists` hook that uses `useEffect` for side effects.

✅ **Onboard Artist:**
![Onboarding Artist](/public/screenshots/onboarding-artists.png)
Multi-section form with file upload and dropdowns. Yup schemas + React Hook Form for real-time validation.

✅ **Manager Dashboard:**
Displays artist submissions stored in the database. Static data used for testimonials and charts.
![Manager Dashboard](/public/screenshots/manager-dashboard.png)

✅ **Suspense & Performance:**
Root layout wraps pages in `<Suspense>` with a custom `<Loading />` component to handle server component streaming.

✅ **Dark Mode & Theme Context:**
Theme toggling implemented globally via React Context.

---

## 🌐 SEO & Accessibility

* Next.js <Image /> component: Optimized image loading with priority and loading="lazy" where appropriate.
* Alt text for all images: Images include descriptive alt tags.
* Accessible form fields: Inputs include aria-labels and linked <label> tags.
* Semantic HTML: Proper use of <main>, <header>, <section>, <nav>, and <footer> for better readability and screen reader support.
* Dynamic Imports with next/dynamic: Heavy or client-only components — like charts, dashboard widgets, or large UI blocks — are loaded dynamically using next/dynamic for code splitting.

---

## 🧪 Test Manager Account

To test the manager dashboard:

Email: artistly@manager.com
Password: test123

---

## 🥪 Running Locally

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Krisha1703/artistly.git
   cd artistly
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```
4. **Start the dev server:**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` to view the app.

---

## 📦 Deployment

Deployed on **Vercel**:
[krisha-artistly-app.vercel.app](https://krisha-artistly-app.vercel.app)

---

Issues to fix:

6. need to improve the beta version. to start: cd api/event-classifier -> .\venv\Scripts\Activate -> uvicorn main:app --reload --port 8000

7. too much loading time, need to improve speed and performance.

9. create suspense and fallback states/page
