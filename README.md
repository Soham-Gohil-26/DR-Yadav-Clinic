# Yadav's Homeopathy & Aesthetic Clinic - Production Website

A luxury, Apple-inspired, high-converting medical website built for **Yadav's Homeopathy & Aesthetic Clinic** in Mira Road.

## Features
- **Design Aesthetic**: Warm editorial medical design using gold, cream, bronze, and obsidian tokens.
- **Responsive UI & Micro-Interactions**: Sticky blur navigation header, cards, ambient lighting, scroll reveals, counters, and reduced-motion support.
- **Interactive Before & After Slider**: Touch/mouse drag handle comparing hair fall and skin treatment clinical outcomes.
- **Filterable Treatments Grid**: Categorized tabs (Hair Care, Skin Care, Aesthetic & Cosmetic, General Wellness) with cards.
- **Animated Counter Stats**: Counts up to 10,000+ Patients, 4.9★ Google Rating, 15+ Yrs Exp, 98% Success Rate.
- **Interactive Lightbox Gallery**: High-res clinic infrastructure & treatment room photo viewer.
- **Interactive Appointment Booking Form**: Live validation with instant modal response and direct prefilled WhatsApp integration.
- **SEO & Local Business Schema**: Included JSON-LD `MedicalClinic` schema, OpenGraph tags, semantic HTML tags.
- **Cross-Browser & Mobile Responsive**: Mobile-first grid layout with touch and keyboard-friendly interactive controls.

## Project Structure
```
DR. Yadav/
├── index.html            # Main production landing page
├── README.md             # Project documentation
└── assets/
    ├── css/
    │   └── styles.css    # Design tokens, glassmorphism, animations, compare slider
    ├── js/
    │   └── main.js      # IntersectionObserver, counters, filters, gallery, appointment logic
    └── images/           # Clinic static assets
```

## Running Locally
Double click `index.html` for a quick preview, or serve it with any static HTTP server (for example `npx serve` or the Live Server extension). The page currently uses CDN-hosted Tailwind, Lucide, Google Fonts, and gallery images, so an internet connection is required for the complete experience.
