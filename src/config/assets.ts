/**
 * Centralized Asset Architecture for Xtreme Construction Chemicals
 * All assets reference the verified, audited files in /public/images/
 */

export const assets = {
  brand: {
    logoWhite: '/images/brand/xtremelogo.png',
    logoSvg: '/images/brand/newLogo.svg',
    mascot: '/images/brand/bull.webp',
    tunisiaBanner: '/images/brand/xtreme-tunisia-banner.png',
    tunisiaBanner2x: '/images/brand/xtreme-tunisia-banner-2x.png',
    tunisiaBannerSvg: '/images/brand/xtreme-tunisia-banner.svg',
  },

  hero: {
    banner: '/images/hero/banner.png',
  },

  about: {
    boxingX: '/images/about/boxingX.webp',
    aboutUs2: '/images/about/aboutUs2.webp',
    hand: '/images/about/hand.webp',
    highQuality: '/images/about/high-quality.webp',
    innovation: '/images/about/innovation.webp',
    bull: '/images/about/bull.webp',
    spain: '/images/about/spain.jpeg',
    tunisia: '/images/about/tunisia.png',
    newLogo: '/images/about/newLogo.svg',
  },

  products: {
    'xtracol-c1te': '/images/products/xtracol-c1te.webp',
    'xtracol-c2te': '/images/products/xtracol-c2te.webp',
    'supercol-piscinas': '/images/products/supercol-piscinas.webp',
    'supercol-c2tes1': '/images/products/supercol-c2tes1.webp',
    'supercol-c2tes2': '/images/products/supercol-c2tes2.webp',
    'fibergel-s1': '/images/products/fibergel-s1.webp',
    'fibergel-s2': '/images/products/fibergel-s2.webp',
    'cemair': '/images/products/cemair.webp',
    'flexigrout': '/images/products/flexigrout.webp',
    'cement-renders': '/images/products/cemair.webp',
    'repairs': '/images/products/supercol-c2tes2.webp',
  } as Record<string, string>,

  certifications: {
    tika: '/images/certifications/tika.png',
    smg: '/images/certifications/smg.png',
    spain: '/images/certifications/spain.png',
    ce: '/images/certifications/ce.png',
    otabu: '/images/certifications/otabu.png',
    iso9001: '/images/certifications/iso9001.png',
  },

  news: {
    libyaBuild: '/images/news/libya-build.jpg',
    cubaFactory: '/images/news/cuba-factory.jpg',
    tikaTripoli: '/images/news/tika-tripoli.jpg',
    labTesting: '/images/news/lab-testing.jpg',
  }
} as const;

export type ProductAssetKey = keyof typeof assets.products;
