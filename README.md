# XTREME Tunisia — Spanish Technology in Construction Chemicals & Advanced Mortars

![Xtreme Tunisia Banner](/public/images/brand/xtreme-tunisia-banner.png)

Official web platform for **XTREME Tunisia**, engineered with authentic Spanish formulation technology and certified European manufacturing standards (UNE EN 12004, EN 998, ISO 9001:2015).

---

## 🌟 Key Features

- **European Certified Formulations**: Comprehensive product catalog of deformable tile adhesives (C1TE, C2TE, S1, S2), waterproof pool systems (`SuperCol PISCINAS`), lightweight thermal block mortars (`CemAir`), and joint grouts (`FlexiGrout`).
- **Interactive Taurus Mascot**: GPU-accelerated cursor pupil tracking with vector clamping, smooth requestAnimationFrame interpolation, and anatomical SVG clipping matching authentic character art.
- **Multilingual Architecture**: Full 4-language support for **Tunisia & Mediterranean Trade**:
  - 🇫🇷 Français (French)
  - 🇹🇳 العربية (Arabic) with automated bidirectional RTL (`dir="rtl"`) layout
  - 🇬🇧 English
  - 🇪🇸 Español (Spanish)
- **Tunisia Market Localization**: Tailored for Tunisian architectural specifiers, civil engineers, and master tiling contractors with Tunis representation contact desks, specification sheets (TDS, MSDS, DoP), and interactive project inquiries.
- **Corporate Operations Desk**: Full admin panel (`/admin`) for product management, support tickets, and company settings with local persistence.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/)

---

## 📁 Repository Structure

```
├── public/
│   ├── assets/              # Real verified product and brand assets
│   ├── flags/               # National flags (Tunisia, Spain, France, USA)
│   └── images/
│       ├── brand/           # Authentic logos, mascot (bull.webp), banners
│       ├── certifications/  # CE, ISO 9001, Otabu, SMG, TIKA badges
│       ├── hero/            # High-resolution hero banners
│       ├── news/            # Corporate editorial imagery
│       └── products/        # Authentic product packaging bags
├── src/
│   ├── app/                 # Next.js App Router (Home, About, Products, News, Contact, Admin)
│   ├── components/
│   │   ├── home/            # Hero, Solutions, ProductLines, FamilyTree, TunisiaMarket, etc.
│   │   ├── layout/          # TopBar, Navbar, Footer
│   │   ├── products/        # ProductCard, Bag viewer
│   │   └── ui/              # TaurusMascot (Eye tracking), LanguageSwitcher, XtremeLogo
│   ├── config/              # Centralized asset registry
│   ├── context/             # Language, Products, Contact, and Company settings state
│   └── data/                # Products catalog, certifications, news, translations
└── scripts/                 # Utility generation scripts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd xtreme

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Lint check (0 errors, 0 warnings)
npm run lint

# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 🛡️ Certified Standards Compliance

All Xtreme dry mortars and chemical construction systems are formulated under strict European quality standards:
- **UNE EN 12004**: Cementitious adhesives for ceramic tiles (Class C1TE, C2TE, S1, S2 deformable)
- **EN 998-1 / EN 998-2**: Specifications for rendering, plastering, and masonry mortars
- **ISO 9001:2015**: Certified Quality Management System

---

## 📄 License & Rights

© 2025-2026 Xtreme Tunisia & Spanish Technology Core. All rights reserved.
