# 🎭 Artistly.com – Performing Artist Booking Platform (Frontend Demo)

✨ **Artistly.com** is a functional, mobile-responsive **frontend-only demo** of a fictional platform that connects **Event Planners** with **Artist Managers**.

This 3–4 page application is designed as part of a frontend engineering assignment, built using **Next.js**, **Tailwind CSS**, and **Framer Motion**.

---

## 📌 Project Overview

* **Event Planners** can:

  * Browse artist categories and profiles.
  * Filter artists by fee, location, rating, and availability.
  * Request quotes (demo action only).

* **Artist Managers** can:

  * Onboard new artists.
  * View artist submissions and booking leads.
  * Analyze activity via dashboard charts (mock data only).

⚠️ **Note:** No real backend or database is used. All data is fetched from static `.js` mock files or JSON-like arrays. The project focuses solely on frontend quality.

---

## 📸 Screenshots

### 🎤 Hero Section
![Hero Section](/public/screenshots/hero-section.png)

### 🎭 Artist Categories
![Artist Categories](/public/screenshots/artist-categories.png)

### 🔍 Explore Artists
![Explore Artists](/public/screenshots/explore-artists.png)

### 📝 Onboarding Artist
![Onboarding Artist](/public/screenshots/onboarding-artists.png)

### 📊 Manager Dashboard
![Manager Dashboard](/public/screenshots/manager-dashboard.png)

---

## 🚀 Tech Stack

* **Next.js 14** – App Router & File-based routing
* **Tailwind CSS** – Responsive and utility-first styling
* **Framer Motion** – Page and component animations
* **React Hook Form** – Form management & validation
* **Chart.js + react-chartjs-2** – Visual analytics (pie, doughnut, line)
* **MUI Icons** – Built-in icon support

---

## 📂 Project Structure

Here’s a breakdown of key folders:

```bash
app/
├── page.js                     # Home page
├── artists/                   # Explore Artists page
├── onboard/                   # Onboard Artist form
├── dashboard/                 # Manager Dashboard (tabs: submissions, profiles, analytics)

components/
├── explore-artists/          # ArtistCard, FilterPanel
├── dashboard/                # SidePanel, Table, Charts
├── onboard-artist/           # Artist onboaring form
├── button/                   # DefaultButton, HoverButton
├── heading.js                # Section heading component
├── navbar/                   # Navbar with motion effects
├── footer/                   # Footer with motion effects
├── testimonials/             # Client testimonials section
├── hero/                     # Hero section of home page

data/
├── artists.js                # Mock data for artists
├── steps.js                  # "How it works" steps
├── dashboard.js              # Mock data for manager dashboard
├── testimonials.js           # Mock data for client testimonials
├── onboarding.js             # Mock data for onboarding artists
```

---

## 📱 Pages & Features

### 1. **Homepage**

* Animated intro with hero section.
* How-it-works guide (with scroll-based animation).
* Carousel of popular artist categories.

### 2. **Explore Artists**

* Filter by category, location, rating, fee, availability.
* Artist cards with ratings and fees.
* Search by name.

### 3. **Onboard Artist**

* Dynamic form validation using react-hook-form and conditional error messages.
* Category, Availability, and Fee fields with dropdowns (<select>) and customized styling.
* Image preview before upload (if implemented).
* Bio and Description inputs to allow artists to add personal branding.
* Rating and Review Count input (to simulate popularity).

### 4. **Manager Dashboard**

* Tab-based navigation for:

  * Submissions
  * Booking Requests
  * Artist Profiles
  * Analytics & Reports (Chart.js)

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

3. **Start the dev server:**

```bash
npm run dev
```

4. Open `http://localhost:3000` to view the app.

---

## 🌐 SEO & Performance

* Optimized `<Image />` with `loading="lazy"` where applicable.
* Accessible elements with `aria-labels` where applicable.
* Meta descriptions per page (`metadata` in `layout.js`).
* Suspense loading UI with custom animated loader.

---

## 📦 Deployment

Deployed Vercel Link: https://krisha-artistly-app.vercel.app



