export type Language = 'en' | 'es' | 'fr' | 'ar';

export interface Translations {
  // Navigation & TopBar
  phone: string;
  email: string;
  location: string;
  home: string;
  aboutUs: string;
  products: string;
  solutions: string;
  news: string;
  branches: string;
  contact: string;
  certifications: string;

  // Hero
  heroTagline: string;
  heroSubtagline: string;
  exploreProducts: string;
  contactSales: string;

  // Solutions (Home 3-cards)
  solutionsTitle: string;
  solutionsSubtitle: string;
  sol1Title: string;
  sol1Desc: string;
  sol2Title: string;
  sol2Desc: string;
  sol3Title: string;
  sol3Desc: string;
  learnMore: string;

  // Product Lines
  productLinesTitle: string;
  productLinesSubtitle: string;
  line1Title: string;
  line2Title: string;
  line3Title: string;
  viewDetails: string;

  // Xtreme Family
  familyTitle: string;
  familySubtitle: string;
  familyDescription: string;

  // Product Showcase
  xtremeProductsTitle: string;
  allCategories: string;
  moreProducts: string;
  viewProduct: string;
  techSheet: string;
  safetySheet: string;
  applications: string;
  benefits: string;
  packaging: string;
  technicalSpecs: string;
  requestInfo: string;

  // Tunisia Market Section
  marketTitle: string;
  marketSubtitle: string;
  localPresence: string;
  spanishEngineering: string;
  appTilingTitle: string;
  appTilingDesc: string;
  appPoolsTitle: string;
  appPoolsDesc: string;
  appFacadesTitle: string;
  appFacadesDesc: string;
  appMasonryTitle: string;
  appMasonryDesc: string;
  appRenovTitle: string;
  appRenovDesc: string;
  appRepairTitle: string;
  appRepairDesc: string;
  formulationLabel: string;
  techSupportTitle: string;
  techSupportDesc: string;
  inquireProject: string;
  exploreAllProducts: string;
  brandIdentityTitle: string;
  brandIdentityDesc: string;
  downloadHd: string;
  downloadVector: string;

  // News
  newsTitle: string;
  viewAllNews: string;
  readMore: string;
  publishedOn: string;
  newsPageTitle: string;
  newsPageSubtitle: string;

  // Licenses & Certifications
  licensesTitle: string;
  licensesSubtitle: string;
  viewCertifications: string;

  // CTA
  ctaTitle: string;
  ctaSubtitle: string;
  contactUs: string;

  // About Page
  aboutHeroBadge: string;
  aboutHeroTitle: string;
  aboutHeroDesc: string;
  pillarStandards: string;
  pillarStandardsSub: string;
  pillarOrigin: string;
  pillarOriginSub: string;
  pillarClimate: string;
  pillarClimateSub: string;
  pillarTraceability: string;
  pillarTraceabilitySub: string;
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  valuesTitle: string;
  valExcellenceTitle: string;
  valExcellenceDesc: string;
  valConsistencyTitle: string;
  valConsistencyDesc: string;
  valResilienceTitle: string;
  valResilienceDesc: string;
  valEcoTitle: string;
  valEcoDesc: string;

  // About Page (Official Site Content)
  aboutTitle: string;
  aboutText: string;
  missionHeading: string;
  missionText: string;
  statementTitle: string;
  qualityTitle: string;
  qualityDesc: string;
  innovationTitle: string;
  innovationDesc: string;
  reliabilityTitle: string;
  reliabilityDesc: string;
  spanishTechBadge: string;

  // Contact Page
  contactHeroBadge: string;
  contactHeroTitle: string;
  contactHeroDesc: string;
  sendMessageTitle: string;
  sendMessageSubtitle: string;
  fullName: string;
  companyName: string;
  emailAddress: string;
  phoneNumber: string;
  subjectLabel: string;
  messageLabel: string;
  placeholderName: string;
  placeholderCompany: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderMessage: string;
  sendMessageBtn: string;
  sending: string;
  messageSentSuccess: string;
  messageSentDesc: string;
  sendAnother: string;
  officeLocationTitle: string;
  officeHoursTitle: string;
  officeHoursVal: string;

  // Products Page
  catalogTitle: string;
  catalogSubtitle: string;
  allProductsCount: string;
  noProductsFound: string;

  // Footer
  footerDesc: string;
  company: string;
  quickLinks: string;
  getInTouch: string;
  rightsReserved: string;
  spanishTech: string;
  qualityPolicy: string;
  exportInquiries: string;
  technicalStandards: string;
  certifiedStandardsTitle: string;

  // Language selector
  selectLanguage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    phone: '+(34) 696 472 925',
    email: 'info@xtreme-cc.com',
    location: 'Tunis, Tunisia',
    home: 'Home',
    aboutUs: 'About Us',
    products: 'Products',
    solutions: 'Solutions',
    news: 'News',
    branches: 'Contact',
    contact: 'Contact',
    certifications: 'Quality & Standards',

    heroTagline: 'Spanish Technology. Construction Solutions for Tunisia.',
    heroSubtagline: 'European-grade dry mortars, high-flexibility tile adhesives, and specialized chemical building solutions for the Tunisian market.',
    exploreProducts: 'Explore Products',
    contactSales: 'Contact Technical Sales',

    solutionsTitle: 'Solutions for all your construction needs',
    solutionsSubtitle: 'State-of-the-art formulations developed with rigorous European standards for Tunisian jobsites.',
    sol1Title: 'Tiles adhesive & Grout',
    sol1Desc: 'Our tile adhesives deliver lasting performance for any setting. Use our durable cementitious grout for a flawless, moisture-resistant finish.',
    sol2Title: 'Cement-Based Renders',
    sol2Desc: 'Our renders provide strong, weather-resistant foundations for walls. They offer excellent workability and a versatile surface for final finishes.',
    sol3Title: 'Masonry Mortars',
    sol3Desc: 'Strong bonds for blocks with our thermal adhesive, and durable concrete repairs with our specialized mortar.',
    learnMore: 'Learn More',

    productLinesTitle: 'Our Product lines',
    productLinesSubtitle: 'Comprehensive range engineered for high-demand industrial, commercial & residential projects in Tunisia',
    line1Title: 'Super Flexible Tile Adhesive',
    line2Title: 'Ceramic Tile Grouting Material',
    line3Title: 'Cement Substrate Renders',
    viewDetails: 'View Details',

    familyTitle: 'Meet Our Xtreme Family',
    familySubtitle: 'A synchronized ecosystem of advanced bonding, sealing, and structural finishing products',
    familyDescription: 'From high-flexibility polymers to specialized marine and thermal mortars, our product family covers the entire construction lifecycle.',

    xtremeProductsTitle: 'Xtreme Products',
    allCategories: 'All Categories',
    moreProducts: 'More Products',
    viewProduct: 'View Product',
    techSheet: 'Technical Data Sheet (TDS)',
    safetySheet: 'Material Safety Sheet (MSDS)',
    applications: 'Applications',
    benefits: 'Key Benefits',
    packaging: 'Packaging',
    technicalSpecs: 'Technical Specifications',
    requestInfo: 'Request Information',

    marketTitle: 'Construction Solutions for Tunisia',
    marketSubtitle: 'European-certified chemical building materials engineered to solve real jobsite challenges faced by Tunisian civil engineers, architectural firms, and master tiling contractors.',
    localPresence: 'Local Presence',
    spanishEngineering: 'Spanish Engineering',
    appTilingTitle: 'Residential & Commercial Tiling',
    appTilingDesc: 'High-performance polymer-modified adhesives for large-format porcelain, marble, and granite in high-traffic commercial and luxury residential projects.',
    appPoolsTitle: 'Swimming Pools & Coastal Resorts',
    appPoolsDesc: 'Specialized marine adhesives and flexible grouts with zero shrinkage and high resistance to chlorinated, saline, and thermal waters.',
    appFacadesTitle: 'Exterior Facades & Thermal Renders',
    appFacadesDesc: 'Breathable, weather-resistant basecoats and mineral renders engineered to withstand intense Mediterranean sun, seasonal rains, and coastal salt-air.',
    appMasonryTitle: 'Thermal Block & Aerated Masonry',
    appMasonryDesc: 'High-yield lightweight mortars delivering thermal break continuity and crack-free jointing for autoclaved aerated concrete and hollow clay bricks.',
    appRenovTitle: 'Renovation & Tile-on-Tile',
    appRenovDesc: 'Deformable gel formulas enabling direct bonding over existing smooth tiles, terrazzo, and dense concrete without mechanical roughening.',
    appRepairTitle: 'Concrete Repair & Protection',
    appRepairDesc: 'Structural repair mortars and flexible waterproofing slurries engineered to restore damaged concrete and prevent chloride-induced corrosion.',
    formulationLabel: 'Formulation',
    techSupportTitle: 'Direct Technical Support in Tunisia',
    techSupportDesc: 'Consult with our materials engineers in Tunis for jobsite visits, pull-off adhesion tests, and customized specifications.',
    inquireProject: 'Inquire for Your Project',
    exploreAllProducts: 'Explore All Products',
    brandIdentityTitle: 'Official Corporate Brand Identity — Tunisia',
    brandIdentityDesc: 'The official Xtreme Spanish Technology Tunisia national emblem banner represents certified European construction excellence localized for Tunisian infrastructure.',
    downloadHd: 'Download Ultra-HD (2048×560)',
    downloadVector: 'Download Vector SVG',

    newsTitle: 'Xtreme News & Updates',
    viewAllNews: 'View All News',
    readMore: 'Read More',
    publishedOn: 'Published',
    newsPageTitle: 'Corporate News & Industry Updates',
    newsPageSubtitle: 'Stay informed with the latest developments, technical bulletins, and Tunisian site achievements.',

    licensesTitle: 'European Quality & Accreditations',
    licensesSubtitle: 'Certified under strict European Union Construction Regulations & ISO 9001 Protocols',
    viewCertifications: 'View Standards & Accreditations',

    ctaTitle: 'Need technical advice for your project in Tunisia?',
    ctaSubtitle: 'Talk to our technical engineering team in Tunis for product specifications and contractor support.',
    contactUs: 'Contact Us',

    aboutHeroBadge: 'Spanish Technology • Xtreme Tunisia',
    aboutHeroTitle: 'About Xtreme Tunisia',
    aboutHeroDesc: 'Xtreme Tunisia provides professional construction solutions for the Tunisian building industry, with a product range focused on tile adhesives, grouts, cement-based renders, masonry mortars, and specialized construction products based on Spanish technology and European quality standards.',
    pillarStandards: 'European Standards',
    pillarStandardsSub: 'Certified under EN 12004 & EN 998',
    pillarOrigin: 'Formulation Origin',
    pillarOriginSub: 'Advanced Spanish Chemical Engineering',
    pillarClimate: 'Climate Proven',
    pillarClimateSub: 'High Thermal & Saline Resistance',
    pillarTraceability: 'Batch Traceability',
    pillarTraceabilitySub: 'Audited ISO 9001 Protocols',
    missionTitle: 'Our Mission',
    missionDesc: 'To equip Tunisian construction professionals with top-tier Spanish formulated dry mortars and adhesives that elevate quality and durability across every building site.',
    visionTitle: 'Our Vision',
    visionDesc: "To become Tunisia's premier reference partner in high-performance construction chemicals, known for technical integrity and unwavering consistency.",
    valuesTitle: 'Core Pillars of Formulation & Quality',
    valExcellenceTitle: 'Spanish Chemical Excellence',
    valExcellenceDesc: 'Formulations engineered with high-purity redispersible polymers, synthetic microfibers, and selected graded mineral aggregates.',
    valConsistencyTitle: 'Absolute Batch Consistency',
    valConsistencyDesc: 'Automated dry mortar manufacturing and precise chemical dosing ensuring zero deviation across thousands of bags delivered to Tunisian jobsites.',
    valResilienceTitle: 'Climatic Resilience for Tunisia',
    valResilienceDesc: 'Formulations proven under Mediterranean coastal humidity, strong solar UV radiation, and seasonal thermal swings.',
    valEcoTitle: 'Environmental Integrity',
    valEcoDesc: 'Sustainable production protocols, reduced-carbon mineral binders, and zero volatile organic compound (VOC) emissions.',

    aboutTitle: 'ABOUT US',
    aboutText: "We're a trusted provider of high-quality building materials, empowering builders with innovative solutions and exceptional customer service. Our commitment to quality, progress, and support ensures strong, sustainable structures for the future.",
    missionHeading: 'OUR MISSION',
    missionText: 'We are committed to providing the construction industry with high-quality, reliable building materials. We strive to empower builders and developers with innovative solutions that meet the evolving needs of the market.',
    statementTitle: 'Statement From Mr.Fran Clemente',
    qualityTitle: 'Quality',
    qualityDesc: 'We are dedicated to delivering superior products that consistently meet the highest standards.',
    innovationTitle: 'Innovation',
    innovationDesc: 'We continuously explore new technologies and materials to drive progress in construction.',
    reliabilityTitle: 'Reliability',
    reliabilityDesc: 'We are a trusted partner, ensuring consistent product availability and on-time delivery.',
    spanishTechBadge: 'Spanish Technology',

    contactHeroBadge: 'Commercial & Technical Representation in Tunisia',
    contactHeroTitle: 'Contact Xtreme Tunisia',
    contactHeroDesc: 'Our technical sales engineers and materials specialists in Tunis are ready to assist with project specifications, product inquiries, and contractor orders.',
    sendMessageTitle: 'Send Us a Message',
    sendMessageSubtitle: 'Fill in your project details and a technical engineer will reply within 24 hours.',
    fullName: 'Full Name',
    companyName: 'Company Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    subjectLabel: 'Subject',
    messageLabel: 'Message or Project Requirements',
    placeholderName: 'Mohamed Trabelsi',
    placeholderCompany: 'Tunisian General Contracting',
    placeholderEmail: 'contact@company.tn',
    placeholderPhone: '+216 XX XXX XXX',
    placeholderMessage: 'Please provide technical guidance and quotation for our upcoming residential project...',
    sendMessageBtn: 'Send Message Now',
    sending: 'Sending...',
    messageSentSuccess: 'Your message has been sent successfully!',
    messageSentDesc: 'Thank you for reaching out to Xtreme Tunisia. Our technical engineers will contact you shortly.',
    sendAnother: 'Send Another Inquiry',
    officeLocationTitle: 'Office & Representation',
    officeHoursTitle: 'Working Hours',
    officeHoursVal: 'Monday - Friday: 8:00 AM - 5:00 PM',

    catalogTitle: 'Product Catalog & Construction Solutions',
    catalogSubtitle: 'European-certified mortars, specialized adhesives, and technical building chemicals for Tunisia.',
    allProductsCount: 'Available Products',
    noProductsFound: 'No products found matching the selected category.',

    footerDesc: 'Xtreme Tunisia delivers European-certified construction chemicals and advanced mortars based on Spanish formulation technology for durable building projects across Tunisia.',
    company: 'Company',
    quickLinks: 'Quick Links',
    getInTouch: 'Get in Touch (Tunisia)',
    rightsReserved: 'All Rights Reserved. Xtreme Tunisia — Spanish Technology.',
    spanishTech: 'SPANISH TECHNOLOGY',
    qualityPolicy: 'Quality Policy',
    exportInquiries: 'Export Inquiries',
    technicalStandards: 'Technical Standards',
    certifiedStandardsTitle: 'Certified Management & Quality Standards',

    selectLanguage: 'Select Language'
  },
  ar: {
    phone: '+(34) 696 472 925',
    email: 'info@xtreme-cc.com',
    location: 'تونس، الجمهورية التونسية',
    home: 'الرئيسية',
    aboutUs: 'من نحن',
    products: 'المنتجات',
    solutions: 'الحلول',
    news: 'الأخبار',
    branches: 'الفروع',
    contact: 'اتصل بنا',
    certifications: 'الجودة والمعايير',

    heroTagline: 'تكنولوجيا إسبانية. حلول البناء والتشييد لتونس.',
    heroSubtagline: 'ملاط جاف بمواصفات أوروبية ومواد لاصقة عالية المرونة للبلاط وحلول كيميائية متطورة لقطاع البناء في تونس.',
    exploreProducts: 'استكشف المنتجات',
    contactSales: 'تواصل مع الفريق الفني',

    solutionsTitle: 'حلول متكاملة لجميع احتياجات البناء والتشييد',
    solutionsSubtitle: 'تركيبات متقدمة مصممة وفق أحدث المعايير الأوروبية لضمان أعلى مستويات الأداء في المشاريع التونسية.',
    sol1Title: 'لاصق وترويبة البلاط والسيراميك',
    sol1Desc: 'مواد لاصقة فائقة الأداء للسيراميك والبورسلين وترويبات أسمنتية مقاومة للرطوبة والعوامل الجوية.',
    sol2Title: 'لياسة وملاط الواجهات الإسمنتية',
    sol2Desc: 'ملاط يوفر أساساً متيناً ومقاوماً للرطوبة مع سهولة في التطبيق وجودة تشطيب عالية.',
    sol3Title: 'ملاط البناء والترميم الإنشائي',
    sol3Desc: 'روابط قوية للبلوك الإسمنتي والحراري مع منتجات متخصصة في معالجة وترميم الخرسانة.',
    learnMore: 'اعرف المزيد',

    productLinesTitle: 'خطوط الإنتاج المتخصصة',
    productLinesSubtitle: 'مجموعة شاملة مصممة للمشاريع السكنية والتجارية والصناعية الكبرى في تونس',
    line1Title: 'لاصق سيراميك فائق المرونة',
    line2Title: 'ترويبة وفواصل سيراميك عالية الجودة',
    line3Title: 'ملاط وبياض الأساس الإسمنتي',
    viewDetails: 'عرض التفاصيل',

    familyTitle: 'تعرف على عائلة إكستريم',
    familySubtitle: 'منظومة متكاملة من حلول اللصق والعزل والتشطيب الإنشائي المتقدم',
    familyDescription: 'من البوليمرات المرنة إلى ملاط المسابح والبيئات الساحلية، تغطي منتجاتنا دورة البناء بالكامل.',

    xtremeProductsTitle: 'منتجات إكستريم',
    allCategories: 'جميع الفئات',
    moreProducts: 'المزيد من المنتجات',
    viewProduct: 'عرض المنتج',
    techSheet: 'صحيفة البيانات الفنية (TDS)',
    safetySheet: 'صحيفة بيانات السلامة (MSDS)',
    applications: 'مجالات الاستخدام',
    benefits: 'المزايا الرئيسية',
    packaging: 'التعبئة والتغليف',
    technicalSpecs: 'المواصفات الفنية',
    requestInfo: 'طلب معلومات',

    marketTitle: 'حلول البناء والتشييد لتونس',
    marketSubtitle: 'مواد كيميائية للبناء معتمدة وفق المعايير الأوروبية ومصممة لمواجهة التحديات الميدانية للمهندسين المعماريين والمدنيين ومقاولي التبليط في تونس.',
    localPresence: 'تواجد محلي',
    spanishEngineering: 'هندسة إسبانية',
    appTilingTitle: 'تبليط المباني السكنية والتجارية',
    appTilingDesc: 'مواد لاصقة متطورة ومعززة بالبوليمر للبورسلين كبير الحجم والرخام والجرانيت في المشاريع التجارية الفاخرة والمجمعات السكنية.',
    appPoolsTitle: 'المسابح والمنتجعات الساحلية',
    appPoolsDesc: 'مواد لاصقة بحرية وترويبات مرنة فائقة المقاومة للمياه المعالجة بالكلور والمياه المالحة والمعدنية مع انعدام الانكماش.',
    appFacadesTitle: 'واجهات خارجية وعوازل حرارية',
    appFacadesDesc: 'طبقات أساس وأندوي وملاط واجهات مسامية مقاومة للعوامل الجوية ومصممة لتحمل شمس البحر الأبيض المتوسط والرطوبة الساحلية.',
    appMasonryTitle: 'بناء البلوك الحراري والخرسانة الخلوية',
    appMasonryDesc: 'ملاط خفيف الوزن عالي المردود يوفر عزلاً حرارياً مستمراً ومفاصل خالية من التشققات للخرسانة الخلوية والطوب الأحمر.',
    appRenovTitle: 'الترميم ولصق بلاط على بلاط',
    appRenovDesc: 'تركيبات هلامية مرنة تتيح اللصق المباشر فوق البلاط القديم والرخام والموزاييك والخرسانة الكثيفة دون الحاجة للتكسير.',
    appRepairTitle: 'إصلاح الخرسانة وحمايتها',
    appRepairDesc: 'ملاط إصلاح إنشائي ومواد عزل مائي مرنة مصممة لإعادة تأهيل الخرسانة المتضررة وحمايتها من تآكل الكلوريدات.',
    formulationLabel: 'التركيبة الفنية',
    techSupportTitle: 'الدعم الهندسي والفني المباشر في تونس',
    techSupportDesc: 'تواصل مع فريق مهندسي المواد لدينا في تونس للزيارات الميدانية واختبارات الشد والالتصاق وتحديد المواصفات الدقيقة.',
    inquireProject: 'اطلب استشارة لمشروعك',
    exploreAllProducts: 'استكشف جميع المنتجات',
    brandIdentityTitle: 'الهوية المؤسسية الرسمية — تونس',
    brandIdentityDesc: 'شعار إكستريم الرسمي بتقنية إسبانية مع العلم الوطني التونسي لضمان أعلى مستويات الثقة والموثوقية لمشاريع البنية التحتية التونسية.',
    downloadHd: 'تحميل بجودة فائقة (2048×560)',
    downloadVector: 'تحميل بصيغة المتجهات SVG',

    newsTitle: 'أخبار وتحديثات إكستريم',
    viewAllNews: 'عرض كافة الأخبار',
    readMore: 'اقرأ المزيد',
    publishedOn: 'تاريخ النشر',
    newsPageTitle: 'أخبار ومستجدات إكستريم تونس',
    newsPageSubtitle: 'تابع أحدث التطورات التقنية والنشرات الفنية والفعاليات والمشاريع المنفذة في تونس.',

    licensesTitle: 'الجودة الأوروبية والاعتمادات الرسمية',
    licensesSubtitle: 'معتمدة وفقاً لأعلى لوائح البناء في الاتحاد الأوروبي وأنظمة ISO 9001',
    viewCertifications: 'عرض المعايير والاعتمادات',

    ctaTitle: 'هل تحتاج إلى استشارة فنية لمشروعك في تونس؟',
    ctaSubtitle: 'تواصل مع فريق الدعم الفني والهندسي في تونس للحصول على المواصفات والاستشارات الميدانية.',
    contactUs: 'اتصل بنا الآن',

    aboutHeroBadge: 'تكنولوجيا إسبانية • إكستريم تونس',
    aboutHeroTitle: 'عن إكستريم تونس',
    aboutHeroDesc: 'تقدم إكستريم تونس حلول بناء احترافية لقطاع التشييد، من خلال مجموعة متكاملة تركز على المواد اللاصقة للبلاط، الترويبات، ملاط الواجهات، وملاط البناء والترميم، معتمدة على التكنولوجيا الإسبانية الصارمة والمعايير الأوروبية المعتمدة.',
    pillarStandards: 'معايير أوروبية',
    pillarStandardsSub: 'معتمد وفق EN 12004 و EN 998',
    pillarOrigin: 'أصل الصياغة',
    pillarOriginSub: 'هندسة كيميائية إسبانية متقدمة',
    pillarClimate: 'ملائم للمناخ',
    pillarClimateSub: 'مقاومة تامة للحرارة والملوحة',
    pillarTraceability: 'مراقبة الجودة',
    pillarTraceabilitySub: 'بروتوكولات مدققة وفق ISO 9001',
    missionTitle: 'مهمتنا',
    missionDesc: 'تزويد المتخصصين في قطاع البناء التونسي بأفضل أنواع الملاط والمواد اللاصقة المطورة في إسبانيا، لضمان أعلى معايير الجودة والمتانة الإنشائية في كل موقع بناء.',
    visionTitle: 'رؤيتنا',
    visionDesc: 'أن نكون الشريك المرجعي الأول في تونس للمواد الكيميائية للبناء، المشهود لها بالتميز التقني والجودة الموحدة والمستمرة.',
    valuesTitle: 'ركائز الجودة والهندسة الكيميائية',
    valExcellenceTitle: 'التميز الكيميائي الإسباني',
    valExcellenceDesc: 'تركيبات مطورة باستخدام بوليمرات نقية قابلة لإعادة التشتت، وألياف دقيقة صناعية، وركام معدني منتقى بعناية فائقة.',
    valConsistencyTitle: 'ثبات تام في جودة الدفعات',
    valConsistencyDesc: 'تصنيع آلي متطور للملاط الجاف وجرعات كيميائية دقيقة تضمن عدم وجود أي انحراف في الجودة عبر آلاف الأكياس الموردة.',
    valResilienceTitle: 'مقاومة المناخ التونسي',
    valResilienceDesc: 'منتجات أثبتت كفاءتها في تحمل رطوبة السواحل التونسية، وأشعة الشمس فوق البنفسجية، والتغيرات الحرارية الموسمية.',
    valEcoTitle: 'المسؤولية البيئية',
    valEcoDesc: 'بروتوكولات إنتاج مستدامة، ومواد رابطة معدنية منخفضة الكربون، وانعدام تام للمركبات العضوية المتطايرة (VOC).',

    aboutTitle: 'من نحن',
    aboutText: 'نحن شريك موثوق لمواد البناء عالية الجودة، نُمكّن البنائين من خلال حلول مبتكرة وخدمة عملاء متميزة. التزامنا بالجودة والتقدم والدعم يضمن مباني قوية ومستدامة للمستقبل.',
    missionHeading: 'مهمتنا',
    missionText: 'نحن ملتزمون بتزويد قطاع البناء بمواد بناء عالية الجودة وموثوقة. نسعى جاهدين لتمكين المقاولين والمطورين بحلول مبتكرة تلبي الاحتياجات المتطورة للسوق.',
    statementTitle: 'كلمة السيد فران كليمنتي',
    qualityTitle: 'الجودة',
    qualityDesc: 'نحن مكرسون لتقديم منتجات فائقة تلبي باستمرار أعلى المعايير.',
    innovationTitle: 'الابتكار',
    innovationDesc: 'نستكشف باستمرار تقنيات ومواد جديدة لدفع عجلة التقدم في مجال البناء.',
    reliabilityTitle: 'الموثوقية',
    reliabilityDesc: 'نحن شريك موثوق يضمن توفر المنتجات باستمرار والتسليم في المواعيد المحددة.',
    spanishTechBadge: 'تكنولوجيا إسبانية',

    contactHeroBadge: 'التمثيل التجاري والفني في تونس',
    contactHeroTitle: 'اتصل بإكستريم تونس',
    contactHeroDesc: 'فريقنا من المهندسين والمختصين الفنيين في تونس جاهز للإجابة على كافة استفساراتكم، وتقديم الاستشارات الميدانية ودراسة متطلبات المشاريع.',
    sendMessageTitle: 'أرسل لنا رسالة أو استفساراً',
    sendMessageSubtitle: 'املأ بيانات المشروع وسيقوم مهندس فني بالرد عليكم خلال 24 ساعة.',
    fullName: 'الاسم الكامل',
    companyName: 'اسم الشركة أو المقاولة',
    emailAddress: 'البريد الإلكتروني',
    phoneNumber: 'رقم الهاتف',
    subjectLabel: 'الموضوع',
    messageLabel: 'تفاصيل الرسالة أو متطلبات المشروع',
    placeholderName: 'محمد الطرابلسي',
    placeholderCompany: 'شركة المقاولات العامة',
    placeholderEmail: 'contact@company.tn',
    placeholderPhone: '+216 XX XXX XXX',
    placeholderMessage: 'يرجى تقديم المشورة الفنية وعروض الأسعار لمشروعنا...',
    sendMessageBtn: 'إرسال الرسالة الآن',
    sending: 'جاري الإرسال...',
    messageSentSuccess: 'تم إرسال رسالتكم بنجاح!',
    messageSentDesc: 'شكراً لتواصلك مع إكستريم تونس. سيقوم مهندسونا بالاتصال بك قريباً.',
    sendAnother: 'إرسال رسالة أخرى',
    officeLocationTitle: 'المقر والممثلية الفنية',
    officeHoursTitle: 'أوقات العمل المكتبي',
    officeHoursVal: 'الإثنين - الجمعة: 8:00 صباحاً - 5:00 مساءً',

    catalogTitle: 'كتالوج المنتجات والحلول الإنشائية',
    catalogSubtitle: 'مواد لاصقة، ترويبات، وملاط بناء معتمد وفق المواصفات الأوروبية للمشاريع في تونس.',
    allProductsCount: 'المنتجات المتاحة',
    noProductsFound: 'لم يتم العثور على منتجات مطابقة لهذا الفلتر.',

    footerDesc: 'إكستريم تونس تقدم منتجات كيميائية وملاط بناء معتمد وفق المواصفات الأوروبية وبتكنولوجيا صياغة إسبانية لمشاريع البناء في تونس.',
    company: 'الشركة',
    quickLinks: 'روابط سريعة',
    getInTouch: 'تواصل معنا (تونس)',
    rightsReserved: 'جميع الحقوق محفوظة. إكستريم تونس — تكنولوجيا إسبانية.',
    spanishTech: 'تكنولوجيا إسبانية',
    qualityPolicy: 'سياسة الجودة والامتثال',
    exportInquiries: 'استفسارات التصدير',
    technicalStandards: 'المعايير والمواصفات الفنية',
    certifiedStandardsTitle: 'معايير إدارة الجودة والمطابقة المعتمدة',

    selectLanguage: 'اختر اللغة'
  },
  fr: {
    phone: '+216 XX XXX XXX',
    email: 'contact@xtreme.tn',
    location: 'Tunis, Tunisie',
    home: 'Accueil',
    aboutUs: 'À Propos',
    products: 'Produits',
    solutions: 'Solutions',
    news: 'Actualités',
    branches: 'Contact',
    contact: 'Contact',
    certifications: 'Qualité & Normes',

    heroTagline: 'Technologie Espagnole. Solutions de Construction pour la Tunisie.',
    heroSubtagline: 'Mortiers de qualité européenne, colles carrelage haute performance et solutions chimiques adaptées au secteur du bâtiment en Tunisie.',
    exploreProducts: 'Explorer les Produits',
    contactSales: 'Contacter le Service Technique',

    solutionsTitle: 'Des solutions pour tous vos besoins de construction',
    solutionsSubtitle: 'Formulations de pointe développées selon les normes européennes les plus rigoureuses pour les chantiers tunisiens.',
    sol1Title: 'Colles Carrelage & Joints',
    sol1Desc: 'Nos colles pour carrelage offrent une adhérence maximale. Utilisez notre mortier de jointoiement pour une finition parfaite et résistante à l\'humidité.',
    sol2Title: 'Enduits de Façade & Ragréage',
    sol2Desc: 'Nos enduits assurent une protection durable contre les intempéries et une surface optimale pour tous types de finitions.',
    sol3Title: 'Mortiers de Maçonnerie & Réparation',
    sol3Desc: 'Adhésion renforcée pour blocs de béton et briques thermiques, et réparations structurelles pérennes.',
    learnMore: 'En Savoir Plus',

    productLinesTitle: 'Nos Gammes de Produits',
    productLinesSubtitle: 'Gamme complète conçue pour les chantiers résidentiels, commerciaux et industriels en Tunisie',
    line1Title: 'Colle Carrelage Super Flexible',
    line2Title: 'Matériaux de Jointoiement Céramique',
    line3Title: 'Enduits et Sous-Couches Ciment',
    viewDetails: 'Voir les Détails',

    familyTitle: 'Découvrez la Famille Xtreme',
    familySubtitle: 'Un écosystème synchronisé de produits haute adhérence, d\'étanchéité et de finition structurelle',
    familyDescription: 'Des polymères à haute flexibilité aux mortiers techniques et marins, notre gamme couvre l\'intégralité du cycle de construction.',

    xtremeProductsTitle: 'Produits Xtreme',
    allCategories: 'Toutes les Catégories',
    moreProducts: 'Plus de Produits',
    viewProduct: 'Voir le Produit',
    techSheet: 'Fiche Technique (FT)',
    safetySheet: 'Fiche de Données de Sécurité (FDS)',
    applications: 'Applications',
    benefits: 'Avantages Clés',
    packaging: 'Conditionnement',
    technicalSpecs: 'Spécifications Techniques',
    requestInfo: 'Demander des Infos',

    marketTitle: 'Solutions de Construction pour la Tunisie',
    marketSubtitle: 'Matériaux chimiques de construction certifiés européens conçus pour répondre aux défis réels des ingénieurs civils, architectes et carreleurs en Tunisie.',
    localPresence: 'Présence Locale',
    spanishEngineering: 'Ingénierie Espagnole',
    appTilingTitle: 'Carrelage Résidentiel & Commercial',
    appTilingDesc: 'Adhésifs modifiés aux polymères haute performance pour grès cérame grand format, marbre et granit dans les projets commerciaux et résidentiels de luxe.',
    appPoolsTitle: 'Piscines & Stations Balnéaires',
    appPoolsDesc: 'Adhésifs marins spécialisés et mortiers de jointoiement souples sans retrait à haute résistance aux eaux chlorées, salines et thermales.',
    appFacadesTitle: 'Façades Extérieures & Enduits Thermiques',
    appFacadesDesc: 'Sous-couches respirantes et enduits minéraux résistants aux intempéries conçus pour résister au soleil méditerranéen et à l\'air salin côtier.',
    appMasonryTitle: 'Blocs Thermiques & Maçonnerie Cellulaire',
    appMasonryDesc: 'Mortiers légers à haut rendement assurant la continuité de rupture thermique et des joints sans fissure pour le béton cellulaire et les briques creuses.',
    appRenovTitle: 'Rénovation & Pose Carrelage sur Carrelage',
    appRenovDesc: 'Formules en gel déformable permettant le collage direct sur carrelage existant, terrazzo et béton dense sans piquage mécanique.',
    appRepairTitle: 'Réparation & Protection du Béton',
    appRepairDesc: 'Mortiers de réparation structurale et barbotines d\'étanchéité souples pour restaurer le béton dégradé et prévenir la corrosion.',
    formulationLabel: 'Formulation',
    techSupportTitle: 'Support Technique Direct en Tunisie',
    techSupportDesc: 'Consultez nos ingénieurs matériaux à Tunis pour des visites de chantier, des essais d\'arrachement et des prescriptions sur mesure.',
    inquireProject: 'Demander pour Votre Projet',
    exploreAllProducts: 'Explorer Tous les Produits',
    brandIdentityTitle: 'Identité Visuelle Officielle — Tunisie',
    brandIdentityDesc: 'La bannière officielle Xtreme Spanish Technology Tunisie avec emblème national incarne l\'excellence européenne certifiée au service des chantiers tunisiens.',
    downloadHd: 'Télécharger Ultra-HD (2048×560)',
    downloadVector: 'Télécharger Vectoriel SVG',

    newsTitle: 'Actualités & Événements Xtreme',
    viewAllNews: 'Voir Toutes les Actualités',
    readMore: 'Lire Plus',
    publishedOn: 'Publié le',
    newsPageTitle: 'Actualités et Événements de l\'Industrie',
    newsPageSubtitle: 'Restez informé des dernières innovations, fiches techniques et réalisations de chantiers en Tunisie.',

    licensesTitle: 'Qualité Européenne & Accréditations',
    licensesSubtitle: 'Certifié selon les réglementations strictes de l\'Union Européenne et les normes ISO 9001',
    viewCertifications: 'Voir Normes et Accréditations',

    ctaTitle: 'Besoin d\'un conseil technique pour votre chantier en Tunisie ?',
    ctaSubtitle: 'Contactez notre équipe d\'ingénieurs et technico-commerciaux à Tunis dès aujourd\'hui.',
    contactUs: 'Contactez-nous',

    aboutHeroBadge: 'Technologie Espagnole • Xtreme Tunisie',
    aboutHeroTitle: 'À Propos d\'Xtreme Tunisie',
    aboutHeroDesc: 'Xtreme Tunisie fournit des produits chimiques de construction certifiés européens et des mortiers de pointe basés sur la technologie espagnole pour les chantiers en Tunisie.',
    pillarStandards: 'Normes Européennes',
    pillarStandardsSub: 'Certifié sous EN 12004 & EN 998',
    pillarOrigin: 'Origine de Formulation',
    pillarOriginSub: 'Ingénierie Chimique Espagnole',
    pillarClimate: 'Éprouvé au Climat',
    pillarClimateSub: 'Haute Résistance Thermique et Saline',
    pillarTraceability: 'Traçabilité des Lots',
    pillarTraceabilitySub: 'Protocoles Audités ISO 9001',
    missionTitle: 'Notre Mission',
    missionDesc: 'Équiper les professionnels du bâtiment en Tunisie avec des mortiers secs et adhésifs de pointe formulés en Espagne pour garantir une durabilité maximale.',
    visionTitle: 'Notre Vision',
    visionDesc: 'Devenir le partenaire de référence en Tunisie pour les produits chimiques de construction haute performance et la rigueur technique.',
    valuesTitle: 'Piliers Fondamentaux de Qualité et Formulation',
    valExcellenceTitle: 'Excellence Chimique Espagnole',
    valExcellenceDesc: 'Formulations conçues avec des polymères redispersables de haute pureté, des microfibres synthétiques et des agrégats minéraux sélectionnés.',
    valConsistencyTitle: 'Régularité Absolue des Lots',
    valConsistencyDesc: 'Fabrication automatisée et dosage chimique de précision garantissant zéro déviation sur tous les sacs livrés en Tunisie.',
    valResilienceTitle: 'Résilience Climatique pour la Tunisie',
    valResilienceDesc: 'Produits testés sous la chaleur méditerranéenne, les UV intenses et l\'humidité côtière saline.',
    valEcoTitle: 'Intégrité Environnementale',
    valEcoDesc: 'Procédés de fabrication durables, liants minéraux à faible empreinte carbone et zéro émission de COV.',

    aboutTitle: 'À PROPOS DE NOUS',
    aboutText: "Nous sommes un fournisseur de confiance de matériaux de construction de haute qualité, offrant aux constructeurs des solutions innovantes et un service client exceptionnel. Notre engagement envers la qualité, le progrès et l'assistance garantit des structures solides et durables pour l'avenir.",
    missionHeading: 'NOTRE MISSION',
    missionText: "Nous nous engageons à fournir à l'industrie de la construction des matériaux de haute qualité et fiables. Nous nous efforçons d'accompagner les constructeurs avec des solutions innovantes qui répondent aux besoins évolutifs du marché.",
    statementTitle: 'Déclaration de M. Fran Clemente',
    qualityTitle: 'Qualité',
    qualityDesc: 'Nous nous engageons à fournir des produits supérieurs répondant constamment aux normes les plus élevées.',
    innovationTitle: 'Innovation',
    innovationDesc: 'Nous explorons continuellement de nouvelles technologies et matériaux pour stimuler le progrès.',
    reliabilityTitle: 'Fiabilité',
    reliabilityDesc: 'Nous sommes un partenaire de confiance assurant une disponibilité constante et une livraison ponctuelle.',
    spanishTechBadge: 'Technologie Espagnole',

    contactHeroBadge: 'Représentation Commerciale et Technique en Tunisie',
    contactHeroTitle: 'Contacter Xtreme Tunisie',
    contactHeroDesc: 'Nos ingénieurs technico-commerciaux et spécialistes matériaux à Tunis sont à votre disposition pour vos prescriptions de projets et commandes.',
    sendMessageTitle: 'Envoyez-nous un Message',
    sendMessageSubtitle: 'Renseignez les détails de votre projet et un ingénieur technique vous répondra sous 24h.',
    fullName: 'Nom Complet',
    companyName: 'Nom de l\'Entreprise',
    emailAddress: 'Adresse Email',
    phoneNumber: 'Numéro de Téléphone',
    subjectLabel: 'Sujet',
    messageLabel: 'Message ou Besoins du Projet',
    placeholderName: 'Mohamed Trabelsi',
    placeholderCompany: 'Société Générale de Bâtiment',
    placeholderEmail: 'contact@entreprise.tn',
    placeholderPhone: '+216 XX XXX XXX',
    placeholderMessage: 'Merci de nous conseiller et transmettre un devis technique pour notre projet...',
    sendMessageBtn: 'Envoyer le Message',
    sending: 'Envoi en cours...',
    messageSentSuccess: 'Votre message a été envoyé avec succès !',
    messageSentDesc: 'Merci de contacter Xtreme Tunisie. Notre équipe technique prendra contact avec vous rapidement.',
    sendAnother: 'Envoyer une Autre Demande',
    officeLocationTitle: 'Bureau et Représentation',
    officeHoursTitle: 'Horaires de Bureau',
    officeHoursVal: 'Lundi - Vendredi: 8h00 - 17h00',

    catalogTitle: 'Catalogue Produits & Solutions Constructives',
    catalogSubtitle: 'Mortiers certifiés européens, adhésifs spécialisés et chimie du bâtiment pour la Tunisie.',
    allProductsCount: 'Produits Disponibles',
    noProductsFound: 'Aucun produit ne correspond à la catégorie sélectionnée.',

    footerDesc: 'Xtreme Tunisie fournit des produits chimiques de construction certifiés européens et des mortiers de pointe basés sur la technologie espagnole pour les chantiers en Tunisie.',
    company: 'Entreprise',
    quickLinks: 'Liens Rapides',
    getInTouch: 'Contactez-nous (Tunisie)',
    rightsReserved: 'Tous droits réservés. Xtreme Tunisie — Technologie Espagnole.',
    spanishTech: 'TECHNOLOGIE ESPAGNOLE',
    qualityPolicy: 'Politique Qualité',
    exportInquiries: 'Demandes Export',
    technicalStandards: 'Normes Techniques',
    certifiedStandardsTitle: 'Systèmes de Management de Qualité Certifiés',

    selectLanguage: 'Choisir la Langue'
  },
  es: {
    phone: '+216 XX XXX XXX',
    email: 'contact@xtreme.tn',
    location: 'Túnez, Túnez',
    home: 'Inicio',
    aboutUs: 'Sobre Nosotros',
    products: 'Productos',
    solutions: 'Soluciones',
    news: 'Noticias',
    branches: 'Contacto',
    contact: 'Contacto',
    certifications: 'Calidad y Normas',

    heroTagline: 'Tecnología Española. Soluciones de Construcción para Túnez.',
    heroSubtagline: 'Morteros de calidad europea y adhesivos de alto rendimiento diseñados para el sector de la construcción en Túnez.',
    exploreProducts: 'Explorar Productos',
    contactSales: 'Contactar Asesor Técnico',

    solutionsTitle: 'Soluciones para todas sus necesidades constructivas',
    solutionsSubtitle: 'Formulaciones de vanguardia desarrolladas bajo rigurosos estándares europeos para obras en Túnez.',
    sol1Title: 'Adhesivo para Baldosas y Rejuntado',
    sol1Desc: 'Nuestros adhesivos proporcionan un rendimiento duradero. Utilice nuestro mortero cementoso para acabados impecables y resistentes a la humedad.',
    sol2Title: 'Revocos y Enlucidos de Base Cemento',
    sol2Desc: 'Nuestros revocos proporcionan bases resistentes y duraderas para muros, con excelente trabajabilidad.',
    sol3Title: 'Morteros de Albañilería y Reparación',
    sol3Desc: 'Unión resistente para bloques con nuestro adhesivo térmico y reparaciones estructurales con morteros especializados.',
    learnMore: 'Más Información',

    productLinesTitle: 'Nuestras Líneas de Productos',
    productLinesSubtitle: 'Gama integral diseñada para proyectos residenciales, comerciales e industriales en Túnez',
    line1Title: 'Adhesivo Cerámico Súper Flexible',
    line2Title: 'Material de Rejuntado Cerámico',
    line3Title: 'Revocos para Soporte Cementoso',
    viewDetails: 'Ver Detalles',

    familyTitle: 'Conozca la Familia Xtreme',
    familySubtitle: 'Un ecosistema coordinado de productos de unión, sellado y acabado estructural',
    familyDescription: 'Desde polímeros de alta deformabilidad hasta morteros marinos y térmicos, nuestra familia cubre todo el ciclo constructivo.',

    xtremeProductsTitle: 'Productos Xtreme',
    allCategories: 'Todas las Categorías',
    moreProducts: 'Más Productos',
    viewProduct: 'Ver Producto',
    techSheet: 'Ficha Técnica (TDS)',
    safetySheet: 'Ficha de Seguridad (MSDS)',
    applications: 'Aplicaciones',
    benefits: 'Beneficios Clave',
    packaging: 'Presentación',
    technicalSpecs: 'Especificaciones Técnicas',
    requestInfo: 'Solicitar Información',

    marketTitle: 'Soluciones de Construcción para Túnez',
    marketSubtitle: 'Materiales químicos de construcción con certificación europea formulados para resolver los desafíos reales en obra en Túnez.',
    localPresence: 'Presencia Local',
    spanishEngineering: 'Ingeniería Española',
    appTilingTitle: 'Colocación de Baldosas Residenciales y Comerciales',
    appTilingDesc: 'Adhesivos modificados con polímeros para porcelánicos de gran formato, mármol y granito en proyectos de alto tránsito.',
    appPoolsTitle: 'Piscinas y Complejos Costeros',
    appPoolsDesc: 'Adhesivos marinos especializados y juntas deformables con nula retracción y resistencia al agua clorada y marina.',
    appFacadesTitle: 'Fachadas Exteriores y Revocos Térmicos',
    appFacadesDesc: 'Capas base transpirables y revocos minerales resistentes al sol mediterráneo y la salinidad costera.',
    appMasonryTitle: 'Bloque Térmico y Mampostería Celular',
    appMasonryDesc: 'Morteros ligeros de alto rendimiento para rotura de puente térmico y juntas sin fisuras en bloques de hormigón celular.',
    appRenovTitle: 'Renovación y Baldosa sobre Baldosa',
    appRenovDesc: 'Fórmulas de gel deformable que permiten el pegado directo sobre baldosas existentes sin picado mecánico previo.',
    appRepairTitle: 'Reparación y Protección de Hormigón',
    appRepairDesc: 'Morteros de reparación estructural y revestimientos impermeabilizantes para restaurar hormigón deteriorado.',
    formulationLabel: 'Formulación',
    techSupportTitle: 'Soporte Técnico Directo en Túnez',
    techSupportDesc: 'Consulte con nuestros ingenieros en Túnez para ensayos de adherencia en obra y especificaciones a medida.',
    inquireProject: 'Consultar para su Proyecto',
    exploreAllProducts: 'Explorar Todos los Productos',
    brandIdentityTitle: 'Identidad Corporativa Oficial — Túnez',
    brandIdentityDesc: 'El banner corporativo oficial Xtreme Spanish Technology Túnez con emblema nacional representa la garantía europea adaptada a Túnez.',
    downloadHd: 'Descargar Ultra-HD (2048×560)',
    downloadVector: 'Descargar Vectorial SVG',

    newsTitle: 'Noticias y Actualidad Xtreme',
    viewAllNews: 'Ver Todas las Noticias',
    readMore: 'Leer Más',
    publishedOn: 'Publicado',
    newsPageTitle: 'Noticias Corporativas y del Sector',
    newsPageSubtitle: 'Manténgase al día con las últimas novedades, fichas técnicas y proyectos en Túnez.',

    licensesTitle: 'Calidad Europea y Acreditaciones',
    licensesSubtitle: 'Certificado bajo normas estrictas de la Unión Europea y protocolos ISO 9001',
    viewCertifications: 'Ver Normas y Certificaciones',

    ctaTitle: '¿Necesita asesoramiento técnico para su proyecto en Túnez?',
    ctaSubtitle: 'Hable con nuestro equipo de ingeniería técnica en Túnez hoy mismo.',
    contactUs: 'Contáctenos',

    aboutHeroBadge: 'Tecnología Española • Xtreme Túnez',
    aboutHeroTitle: 'Sobre Xtreme Túnez',
    aboutHeroDesc: 'Xtreme Túnez ofrece químicos de construcción certificados y morteros avanzados basados en tecnología española para proyectos en Túnez.',
    pillarStandards: 'Normas Europeas',
    pillarStandardsSub: 'Certificado bajo EN 12004 y EN 998',
    pillarOrigin: 'Origen de Formulación',
    pillarOriginSub: 'Ingeniería Química Española Avanzada',
    pillarClimate: 'Probado en Clima',
    pillarClimateSub: 'Alta Resistencia Térmica y Salina',
    pillarTraceability: 'Trazabilidad de Lotes',
    pillarTraceabilitySub: 'Protocolos Auditados ISO 9001',
    missionTitle: 'Nuestra Misión',
    missionDesc: 'Equipar a los profesionales de la construcción en Túnez con morteros y adhesivos de calidad española para maximizar la durabilidad.',
    visionTitle: 'Nuestra Visión',
    visionDesc: 'Convertirnos en el socio de referencia en Túnez en química de construcción de alto rendimiento y fiabilidad técnica.',
    valuesTitle: 'Pilares Fundamentales de Formulación y Calidad',
    valExcellenceTitle: 'Excelencia Química Española',
    valExcellenceDesc: 'Formulaciones diseñadas con polímeros redispersables de alta pureza, microfibras sintéticas y áridos seleccionados.',
    valConsistencyTitle: 'Consistencia Absoluta de Lotes',
    valConsistencyDesc: 'Fabricación automatizada y dosificación química de precisión que garantizan cero variación entre sacos entregados.',
    valResilienceTitle: 'Resiliencia Climática para Túnez',
    valResilienceDesc: 'Fórmulas probadas bajo la humedad costera mediterránea, radiación solar UV y cambios térmicos estacionales.',
    valEcoTitle: 'Integridad Medioambiental',
    valEcoDesc: 'Protocolos de fabricación sostenible, conglomerantes de baja huella de carbono y cero emisiones de COV.',

    aboutTitle: 'SOBRE NOSOTROS',
    aboutText: 'Somos un proveedor de confianza de materiales de construcción de alta calidad, empoderando a los constructores con soluciones innovadoras y un servicio excepcional. Nuestro compromiso con la calidad, el progreso y el soporte asegura estructuras sólidas y sostenibles.',
    missionHeading: 'NUESTRA MISIÓN',
    missionText: 'Estamos comprometidos a proporcionar a la industria de la construcción materiales confiables y de alta calidad. Nos esforzamos por capacitar a constructores con soluciones innovadoras.',
    statementTitle: 'Declaración del Sr. Fran Clemente',
    qualityTitle: 'Calidad',
    qualityDesc: 'Estamos dedicados a entregar productos superiores que cumplen constantemente con los más altos estándares.',
    innovationTitle: 'Innovación',
    innovationDesc: 'Exploramos continuamente nuevas tecnologías y materiales para impulsar el progreso en la construcción.',
    reliabilityTitle: 'Fiabilidad',
    reliabilityDesc: 'Somos un socio de confianza, garantizando disponibilidad constante y entregas a tiempo.',
    spanishTechBadge: 'Tecnología Española',

    contactHeroBadge: 'Representación Comercial y Técnica en Túnez',
    contactHeroTitle: 'Contactar Xtreme Túnez',
    contactHeroDesc: 'Nuestros ingenieros técnicos y especialistas en Túnez están listos para asesorarle en especificaciones y pedidos.',
    sendMessageTitle: 'Envíenos un Mensaje',
    sendMessageSubtitle: 'Complete los datos de su obra y un ingeniero técnico se pondrá en contacto en menos de 24 horas.',
    fullName: 'Nombre Completo',
    companyName: 'Nombre de la Empresa',
    emailAddress: 'Correo Electrónico',
    phoneNumber: 'Número de Teléfono',
    subjectLabel: 'Asunto',
    messageLabel: 'Mensaje o Requerimientos de la Obra',
    placeholderName: 'Mohamed Trabelsi',
    placeholderCompany: 'Empresa Constructora General',
    placeholderEmail: 'contacto@empresa.tn',
    placeholderPhone: '+216 XX XXX XXX',
    placeholderMessage: 'Solicito asesoramiento técnico y presupuesto para nuestro proyecto...',
    sendMessageBtn: 'Enviar Mensaje Ahora',
    sending: 'Enviando...',
    messageSentSuccess: '¡Su mensaje ha sido enviado con éxito!',
    messageSentDesc: 'Gracias por comunicarse con Xtreme Túnez. Nuestro equipo se pondrá en contacto a la brevedad.',
    sendAnother: 'Enviar Otra Consulta',
    officeLocationTitle: 'Oficina y Representación',
    officeHoursTitle: 'Horario de Atención',
    officeHoursVal: 'Lunes - Viernes: 8:00 AM - 5:00 PM',

    catalogTitle: 'Catálogo de Productos y Soluciones',
    catalogSubtitle: 'Morteros certificados, adhesivos especializados y química de construcción para Túnez.',
    allProductsCount: 'Productos Disponibles',
    noProductsFound: 'No se encontraron productos en la categoría seleccionada.',

    footerDesc: 'Xtreme Túnez ofrece químicos de construcción certificados y morteros avanzados basados en tecnología española para proyectos en Túnez.',
    company: 'Empresa',
    quickLinks: 'Enlaces Rápidos',
    getInTouch: 'Contacto (Túnez)',
    rightsReserved: 'Todos los Derechos Reservados. Xtreme Túnez — Tecnología Española.',
    spanishTech: 'TECNOLOGÍA ESPAÑOLA',
    qualityPolicy: 'Política de Calidad',
    exportInquiries: 'Consultas de Exportación',
    technicalStandards: 'Normas Técnicas',
    certifiedStandardsTitle: 'Sistemas de Gestión de Calidad Certificados',

    selectLanguage: 'Seleccionar Idioma'
  }
};
