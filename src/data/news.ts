export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  tags: string[];
  relatedSlugs: string[];
  isArchived?: boolean;
  region?: 'tunisia' | 'rd' | 'international';
}

export const newsArticles: NewsArticle[] = [
  // 1. Genuine Spanish R&D Technology Article (Active)
  {
    id: 'fibergel-next-gen',
    slug: 'launch-of-fibergel-s2-technology',
    title: 'Xtreme Unveils FiberGel S2: The Evolution of Gel Microfiber Adhesion',
    category: 'R&D & Technology',
    date: 'January 10, 2024',
    readTime: '4 min read',
    excerpt: 'Developed in our Spanish laboratories, FiberGel S2 combines nanostructured mineral binders with synthetic microfibers for unprecedented flexibility and vertical hold.',
    content: [
      'Following two years of rigorous laboratory formulation and field trials across extreme thermal zones, Xtreme is proud to commercialize FiberGel S2.',
      'Unlike conventional adhesives, FiberGel S2 utilizes a specialized mineral geogel matrix that delivers exceptional rheological control. The adhesive glides effortlessly under the trowel while providing zero slump on heavy vertical tiles.',
      'Structural microfibers embedded in each bag create an internal stress-absorbing network, achieving Class S2 transverse deformation exceeding 5.0 mm.',
      'The formulation is certified under UNE EN 12004 and carries the CE European Conformity mark, now available for construction specifications in Tunisia.'
    ],
    image: '/images/news/lab-testing.jpg',
    author: 'R&D Division - Spain',
    tags: ['FiberGel', 'Innovation', 'Spanish Technology', 'R&D', 'European Standards'],
    relatedSlugs: ['xtreme-tunisia-technical-symposium', 'xtreme-tunisia-distribution-network'],
    isArchived: false,
    region: 'rd'
  },

  // 2. Tunisia Technical Workshop & Demonstration
  {
    id: 'tunisia-technical-workshop',
    slug: 'xtreme-tunisia-technical-symposium',
    title: 'Technical Seminar & High-Performance Tile Adhesive Demonstration — Tunis',
    category: 'Technical Events',
    date: 'February 2025',
    readTime: '3 min read',
    excerpt: 'Xtreme hosts an accredited technical workshop in Tunis for civil engineers, architectural specifiers, and tiling contractors on UNE EN 12004 standards.',
    content: [
      'Xtreme Tunisia has concluded its specialized technical workshop for civil engineering firms, architectural studios, and professional tiling contractors operating in the Tunisian market.',
      'The session addressed high-stress ceramic installations, large-format porcelain installation protocols, and proper substrate preparation to avoid debonding under Mediterranean coastal humidity.',
      'Technical engineers conducted live mixing and workability demonstrations of FiberGel S1/S2 and SuperCol PISCINAS, accompanied by accredited European technical documentation.',
      'Professionals interested in upcoming sessions or requesting jobsite technical demonstrations in Greater Tunis are invited to contact our technical team.'
    ],
    image: '/images/news/lab-testing.jpg',
    author: 'Xtreme Tunisia Technical Desk',
    tags: ['Tunisia', 'Tunis', 'Technical Workshop', 'Engineering', 'FiberGel S2'],
    relatedSlugs: ['launch-of-fibergel-s2-technology', 'xtreme-tunisia-distribution-network'],
    isArchived: false,
    region: 'tunisia'
  },

  // 3. Tunisia Certified Distribution Network
  {
    id: 'tunisia-distribution-network',
    slug: 'xtreme-tunisia-distribution-network',
    title: 'Developing Certified Distribution Points Across Greater Tunis & Coastal Regions',
    category: 'Distribution & Network',
    date: 'January 2025',
    readTime: '3 min read',
    excerpt: 'Establishing authorized commercial distribution partnerships with leading building material suppliers and hardware merchants across Tunisia.',
    content: [
      'To provide building contractors with immediate jobsite availability of European-standard dry mortars and tile adhesives, Xtreme is actively developing its distributor network across Tunisia.',
      'Selected distribution partners receive direct logistical support, certified product training for staff, and point-of-sale technical documentation.',
      'Contractors, builders, and retailers can contact our commercial desk in Tunis to locate their nearest authorized supplier or discuss commercial supply terms.'
    ],
    image: '/images/news/lab-testing.jpg',
    author: 'Commercial Development Tunisia',
    tags: ['Tunisia', 'Distribution', 'Building Materials', 'Contractors', 'Tunis'],
    relatedSlugs: ['launch-of-fibergel-s2-technology', 'xtreme-tunisia-technical-symposium'],
    isArchived: false,
    region: 'tunisia'
  },

  // --- Archived International History (Kept in database for historical continuity, hidden from main Tunisia feed) ---
  {
    id: 'libya-build-2024',
    slug: 'libya-build-benghazi-2024',
    title: 'Our Participation in Libya Build Event – Benghazi 2024',
    category: 'International Archive',
    date: 'November 18, 2024',
    readTime: '4 min read',
    excerpt: 'Xtreme showcased its latest high-performance mortar technologies, flexible tile adhesives, and regional expansion plans at Libya Build Benghazi.',
    content: [
      '[Historical Archive Record]',
      'Xtreme Construction Chemicals participated in the 2024 edition of the Libya Build Exhibition held in Benghazi as part of its regional North African trade presentations.',
      'During the exhibition, the Xtreme engineering delegation presented European-specification tile adhesives and lightweight mortars to regional trade visitors.'
    ],
    image: '/images/news/libya-build.jpg',
    author: 'International Communications Archive',
    tags: ['Historical', 'International Exhibition'],
    relatedSlugs: ['product-launch-event-tika-tripoli-2024', 'first-xtreme-production-line-havana-cuba'],
    isArchived: true,
    region: 'international'
  },
  {
    id: 'cuba-production-line',
    slug: 'first-xtreme-production-line-havana-cuba',
    title: 'First Xtreme Production Line in Havana, Cuba – A Milestone Achievement',
    category: 'International Archive',
    date: 'August 14, 2024',
    readTime: '5 min read',
    excerpt: 'Marking a major milestone in Caribbean and Latin American operations, Xtreme officially inaugurates its automated dry-mortar production facility in Havana.',
    content: [
      '[Historical Archive Record]',
      'Xtreme announced the commissioning of a dry mortar manufacturing plant in Havana, Cuba, supplying domestic building contractors with European-standard tile adhesives and renders.'
    ],
    image: '/images/news/cuba-factory.jpg',
    author: 'International Operations Archive',
    tags: ['Historical', 'Manufacturing', 'International'],
    relatedSlugs: ['libya-build-benghazi-2024', 'launch-of-fibergel-s2-technology'],
    isArchived: true,
    region: 'international'
  },
  {
    id: 'tika-tripoli-launch',
    slug: 'product-launch-event-tika-tripoli-2024',
    title: 'Product Launch Event – Tika, Tripoli 2024',
    category: 'International Archive',
    date: 'May 22, 2024',
    readTime: '3 min read',
    excerpt: 'In collaboration with TIKA, Xtreme held a symposium in Tripoli introducing advanced FiberGel S2 and SuperCol marine series to engineers.',
    content: [
      '[Historical Archive Record]',
      'Xtreme hosted a technical symposium in Tripoli introducing the FiberGel S2 deformable gel adhesive to regional civil engineers and architects.'
    ],
    image: '/images/news/tika-tripoli.jpg',
    author: 'International Commercial Archive',
    tags: ['Historical', 'Product Launch'],
    relatedSlugs: ['libya-build-benghazi-2024', 'launch-of-fibergel-s2-technology'],
    isArchived: true,
    region: 'international'
  }
];
