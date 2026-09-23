export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  classification: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  applications: string[];
  benefits: string[];
  technicalData: {
    property: string;
    value: string;
  }[];
  packaging: string;
  consumption: string;
  shelfLife: string;
  color: string;
  accentColor: string;
  image?: string;
  gallery?: string[];
  isFeatured?: boolean;
  documents: {
    title: string;
    type: 'TDS' | 'MSDS' | 'DoP';
    size: string;
  }[];
  relatedSlugs: string[];
}

export const productCategories = [
  { id: 'all', name: 'All Products', slug: 'all' },
  { id: 'tile-adhesives', name: 'Tile Adhesives & Grouts', slug: 'tile-adhesives' },
  { id: 'cement-renders', name: 'Cement-Based Renders', slug: 'cement-renders' },
  { id: 'masonry-mortars', name: 'Masonry Mortars', slug: 'masonry-mortars' },
  { id: 'repairs', name: 'Structural Repairs', slug: 'repairs' },
  { id: 'specialized', name: 'Specialized Construction Products', slug: 'specialized' },
];

export const products: Product[] = [
  {
    id: 'xtracol-c1te',
    slug: 'xtracol-c1te',
    image: '/images/products/xtracol-c1te.webp',
    name: 'XtraCol C1TE',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 12004 Class C1TE',
    tagline: 'Standard Cementitious Adhesive with Slip Resistance and Extended Open Time',
    shortDescription: 'High-performance standard cementitious adhesive with reduced slip and extended open time for ceramic and porcelain tiles.',
    fullDescription: 'XtraCol C1TE is a dry-mixed cementitious adhesive formulated with high-resistance hydraulic binders, selected aggregates, and specific chemical additives. It complies with EN 12004 as class C1TE, making it ideal for standard interior and exterior ceramic tile installations on conventional concrete and cement screed substrates.',
    features: [
      'Extended open time (≥ 30 minutes) allowing longer adjustments',
      'No vertical slip (T) suitable for wall tiling without spacers',
      'Excellent workability and easy trowel application',
      'Frost and moisture resistant formulated with European polymers'
    ],
    applications: [
      'Interior ceramic tiling on walls and floors',
      'Exterior paving and balconies with non-porcelain tiles',
      'Bonding over traditional cement renders and concrete slabs',
      'Residential and light commercial environments'
    ],
    benefits: [
      'Reduces application labor time due to extended open time',
      'Prevents tile slip on vertical installations',
      'Consistent batch-to-batch quality manufactured under ISO 9001:2015'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 12004:2008 / C1TE' },
      { property: 'Mixing Ratio', value: 'approx. 6.0 - 6.5 L water per 25 kg bag' },
      { property: 'Pot Life', value: 'approx. 4 hours at 20°C' },
      { property: 'Open Time', value: '≥ 30 minutes (EN 1346)' },
      { property: 'Initial Tensile Adhesion', value: '≥ 0.5 N/mm²' },
      { property: 'Adhesion After Heat Aging', value: '≥ 0.5 N/mm²' },
      { property: 'Adhesion After Water Immersion', value: '≥ 0.5 N/mm²' },
      { property: 'Slip Resistance (T)', value: '≤ 0.5 mm' }
    ],
    packaging: '25 kg multi-layer moisture-proof paper bag with plastic inner film',
    consumption: 'Approx. 3.0 - 5.0 kg/m² depending on trowel notch and substrate smoothness',
    shelfLife: '12 months in original unopened packaging stored in cool, dry conditions',
    color: 'Grey & White',
    accentColor: '#C62828',
    isFeatured: true,
    documents: [
      { title: 'XtraCol C1TE - Technical Data Sheet', type: 'TDS', size: '240 KB' },
      { title: 'XtraCol C1TE - Material Safety Data Sheet', type: 'MSDS', size: '310 KB' },
      { title: 'Declaration of Performance (DoP)', type: 'DoP', size: '180 KB' }
    ],
    relatedSlugs: ['xtracol-c2te', 'fibergel-s1', 'supercol-c2tes1']
  },
  {
    id: 'xtracol-c2te',
    slug: 'xtracol-c2te',
    image: '/images/products/xtracol-c2te.webp',
    name: 'XtraCol C2TE',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 12004 Class C2TE',
    tagline: 'Improved Cementitious Adhesive with Zero Vertical Slip & Extended Open Time',
    shortDescription: 'Superior polymer-modified adhesive engineered for large format tiles, porcelain stoneware, and high-traffic areas.',
    fullDescription: 'XtraCol C2TE is an improved cementitious adhesive with high chemical polymer content, offering enhanced bonding strength on dense, low-absorption ceramic tiles and vitrified porcelain. Specially formulated for challenging interior and exterior commercial spaces.',
    features: [
      'High bond strength exceeding 1.0 N/mm²',
      'Zero vertical slip for heavy vertical stone and tiles',
      'Extended open time allowing effortless positioning in warm climates',
      'Excellent resistance to weather cycles, freeze-thaw, and moisture'
    ],
    applications: [
      'Large format porcelain and ceramic tiles on walls and floors',
      'Exterior facades and terraces subject to temperature fluctuations',
      'Commercial shopping malls, airports, and public institutions',
      'Tile over tile applications on sound existing floors'
    ],
    benefits: [
      'Maximum shear and tensile adhesion',
      'Resistant to mechanical stress and foot traffic',
      'Certified CE compliance with European standards'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 12004:2008 / C2TE' },
      { property: 'Mixing Ratio', value: 'approx. 6.2 - 6.8 L water per 25 kg bag' },
      { property: 'Pot Life', value: 'approx. 4.5 hours at 20°C' },
      { property: 'Open Time', value: '≥ 30 minutes' },
      { property: 'Initial Tensile Adhesion', value: '≥ 1.0 N/mm²' },
      { property: 'Adhesion After Heat Aging', value: '≥ 1.0 N/mm²' },
      { property: 'Adhesion After Water Immersion', value: '≥ 1.0 N/mm²' },
      { property: 'Slip Resistance (T)', value: '≤ 0.5 mm' }
    ],
    packaging: '25 kg multi-wall reinforced bag',
    consumption: 'Approx. 3.5 - 6.0 kg/m²',
    shelfLife: '12 months stored in dry covered premises',
    color: 'Grey & White',
    accentColor: '#050A5C',
    isFeatured: true,
    documents: [
      { title: 'XtraCol C2TE - Technical Data Sheet', type: 'TDS', size: '250 KB' },
      { title: 'XtraCol C2TE - Material Safety Data Sheet', type: 'MSDS', size: '320 KB' }
    ],
    relatedSlugs: ['xtracol-c1te', 'supercol-c2tes2', 'fibergel-s2']
  },
  {
    id: 'supercol-piscinas',
    slug: 'supercol-piscinas',
    image: '/images/products/supercol-piscinas.webp',
    name: 'SuperCol PISCINAS',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 12004 Class C2TE-S1 Waterproof',
    tagline: 'Specialized Flexible Adhesive for Swimming Pools, Wet Areas & Immersion',
    shortDescription: 'Formulated specifically for continuous water immersion in swimming pools, spas, fountains, and thermal baths.',
    fullDescription: 'SuperCol PISCINAS is a specialized high-performance adhesive engineered to withstand continuous hydrostatic pressure, chlorinated water, chemical pool treatments, and extreme moisture. Its flexible polymer matrix prevents water debonding and accommodates micro-movements.',
    features: [
      'Engineered for permanent underwater immersion',
      'High resistance to pool sanitizing chemicals, salts, and chlorine',
      'Superior deformable flexibility (Class S1)',
      'High grip on glass mosaics, vitrified tiles, and aquatic ceramics'
    ],
    applications: [
      'Olympic, residential, and commercial swimming pools',
      'Spas, Jacuzzis, hammams, and wellness centers',
      'Water tanks, fountains, and decorative reservoirs',
      'Underground wet basements and shower facilities'
    ],
    benefits: [
      'Zero risk of debonding under hydrostatic immersion',
      'Long-term durability against harsh chemicals',
      'Resistant to thermal shocks during pool water changes'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 12004:2008 / C2TE-S1' },
      { property: 'Mixing Ratio', value: 'approx. 6.5 - 7.0 L water per 25 kg bag' },
      { property: 'Deformability (EN 12002)', value: '≥ 2.5 mm (Class S1)' },
      { property: 'Adhesion After Water Immersion', value: '≥ 1.2 N/mm²' },
      { property: 'Temperature Resistance', value: '-30°C to +80°C' }
    ],
    packaging: '25 kg moisture-resistant bag',
    consumption: 'Approx. 4.0 - 6.0 kg/m²',
    shelfLife: '12 months',
    color: 'Extra White',
    accentColor: '#F4511E',
    isFeatured: true,
    documents: [
      { title: 'SuperCol PISCINAS - Technical Data Sheet', type: 'TDS', size: '280 KB' },
      { title: 'SuperCol PISCINAS - Material Safety Data Sheet', type: 'MSDS', size: '315 KB' }
    ],
    relatedSlugs: ['supercol-c2tes1', 'supercol-c2tes2', 'flexigrout']
  },
  {
    id: 'supercol-c2tes1',
    slug: 'supercol-c2tes1',
    image: '/images/products/supercol-c2tes1.webp',
    name: 'SuperCol C2TES1',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 12004 Class C2TE-S1',
    tagline: 'Deformable Cementitious Adhesive for Facades and Thermal Substrates',
    shortDescription: 'Flexible adhesive (Class S1) designed for external thermal insulation systems (ETICS), underfloor heating, and large facades.',
    fullDescription: 'SuperCol C2TES1 combines high structural adhesion with elastic deformation capacity (S1 deformability ≥ 2.5mm according to EN 12002). It absorbs differential substrate movements caused by solar radiation, thermal shifts, and acoustic vibrations.',
    features: [
      'Deformable Class S1 (deflection ≥ 2.5 mm)',
      'Ideal for heated screeds and radiant floor heating systems',
      'Strong resistance to vertical slip with extended open time',
      'High adhesion on low-porosity materials including granite and basalt'
    ],
    applications: [
      'Exterior building facades and curtain walls',
      'Underfloor heated and cooled floors',
      'Over-tiling on sound existing ceramic or terrazzo floors',
      'Large format porcelain tiles up to 120x120 cm'
    ],
    benefits: [
      'Compensates for differential thermal expansions',
      'Guarantees safety in outdoor elevated facades',
      'High workability and creamy consistency'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 12004 / UNE EN 12002: C2TE-S1' },
      { property: 'Transverse Deformation', value: '≥ 2.5 mm and < 5.0 mm (S1)' },
      { property: 'Tensile Adhesion Strength', value: '≥ 1.0 N/mm²' },
      { property: 'Open Time', value: '≥ 30 min' }
    ],
    packaging: '25 kg bag',
    consumption: 'Approx. 3.5 - 5.5 kg/m²',
    shelfLife: '12 months',
    color: 'White & Grey',
    accentColor: '#C62828',
    isFeatured: true,
    documents: [
      { title: 'SuperCol C2TES1 - Technical Data Sheet', type: 'TDS', size: '260 KB' }
    ],
    relatedSlugs: ['supercol-c2tes2', 'fibergel-s1', 'xtracol-c2te']
  },
  {
    id: 'supercol-c2tes2',
    slug: 'supercol-c2tes2',
    image: '/images/products/supercol-c2tes2.webp',
    name: 'SuperCol C2TES2',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 12004 Class C2TE-S2',
    tagline: 'Highly Deformable Superior Elastic Adhesive for XXL Slabs & Heavy Industry',
    shortDescription: 'Ultra-flexible adhesive (Class S2) engineered for mega-format slim porcelain slabs (up to 300x150cm) and high stress environments.',
    fullDescription: 'SuperCol C2TES2 is the pinnacle of cementitious adhesive technology. Classified as C2TE-S2 with transverse deformation exceeding 5.0 mm, it accommodates severe structural movements, extreme thermal shocks, and heavy dynamic machinery loads.',
    features: [
      'Highly Deformable Class S2 (transverse deformation ≥ 5.0 mm)',
      'Recommended for extra-large format slabs (XXL / gauged porcelain)',
      'Maximum shear absorption on prefabricated concrete and metal structures',
      'Unsurpassed adhesion on difficult and vibrating substrates'
    ],
    applications: [
      'Extra-large porcelain slabs (160x320 cm, 120x240 cm)',
      'Industrial facilities subject to heavy forklift traffic',
      'High-rise building facades exposed to severe wind loads',
      'Flexible wooden floors, plywood, and fiberglass substrates'
    ],
    benefits: [
      'Eliminates the danger of slab cracking due to structural deflection',
      'Premium European polymer grade formulation',
      'Unrivaled longevity in hostile climatic conditions'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 12004 / UNE EN 12002: C2TE-S2' },
      { property: 'Transverse Deformation', value: '≥ 5.0 mm (Class S2)' },
      { property: 'Initial Adhesion Strength', value: '≥ 1.5 N/mm²' },
      { property: 'Adhesion After Heat Aging', value: '≥ 1.3 N/mm²' }
    ],
    packaging: '25 kg bag',
    consumption: 'Approx. 4.0 - 7.0 kg/m²',
    shelfLife: '12 months',
    color: 'White & Grey',
    accentColor: '#050A5C',
    isFeatured: true,
    documents: [
      { title: 'SuperCol C2TES2 - Technical Data Sheet', type: 'TDS', size: '290 KB' }
    ],
    relatedSlugs: ['supercol-c2tes1', 'fibergel-s2', 'xtracol-c2te']
  },
  {
    id: 'fibergel-s1',
    slug: 'fibergel-s1',
    image: '/images/products/fibergel-s1.webp',
    name: 'FiberGel S1',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 12004 Class C2TE-S1 Gel Technology',
    tagline: 'Structural Gel Adhesive Reinforced with High-Tenacity Microfibers',
    shortDescription: 'Next-generation thixotropic gel adhesive featuring active microfibers for zero slump, high transfer wetting, and easy buttering.',
    fullDescription: 'FiberGel S1 combines advanced geopolymer gel matrix chemistry with dispersed structural microfibers. Its buttery fluid consistency makes buttering effortless while maintaining absolute thixotropic body, ensuring 100% void-free contact beneath the tile.',
    features: [
      'Structural synthetic microfibers distribute tension evenly',
      'Gel-technology texture gives effortless trowel glide with low wrist fatigue',
      'Guaranteed 100% full bed wetting without air voids',
      'Extended open time over 40 minutes even in hot, windy conditions'
    ],
    applications: [
      'High-end residential villas and luxury hotel interiors',
      'Porcelain and natural marble stone with moisture sensitivity',
      'Balconies, terraces, and commercial retail stores',
      'Substrates with slight unevenness up to 15 mm thickness'
    ],
    benefits: [
      'Greatly reduces tiler fatigue during extensive floor layouts',
      'Eliminates hollow sounds beneath tiles',
      'Gold quality seal certified for Spanish technology'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 12004 / C2TE-S1' },
      { property: 'Application Thickness', value: '2 mm to 15 mm' },
      { property: 'Deformability S1', value: '≥ 2.5 mm' },
      { property: 'Adhesion Strength', value: '≥ 1.2 N/mm²' }
    ],
    packaging: '25 kg bag with gold quality seal',
    consumption: 'Approx. 3.0 - 5.0 kg/m²',
    shelfLife: '12 months',
    color: 'Extra White',
    accentColor: '#C62828',
    isFeatured: true,
    documents: [
      { title: 'FiberGel S1 - Technical Data Sheet', type: 'TDS', size: '310 KB' }
    ],
    relatedSlugs: ['fibergel-s2', 'supercol-c2tes1', 'xtracol-c2te']
  },
  {
    id: 'fibergel-s2',
    slug: 'fibergel-s2',
    image: '/images/products/fibergel-s2.webp',
    name: 'FiberGel S2',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 12004 Class C2TE-S2 Gel Technology',
    tagline: 'Flagship High-Elasticity Gel Adhesive with Structural Microfiber Reinforcement',
    shortDescription: 'The pinnacle of our product family — supreme elastic gel adhesive with maximum deformability for demanding architectural projects.',
    fullDescription: 'FiberGel S2 represents the absolute highest performance tier in Xtreme product family. Built with structural microfiber mesh and hyper-elastic gel resins, it offers Class S2 deformability (>5.0mm) combined with effortless gel glide and unmatched adhesion strength under all climatic conditions.',
    features: [
      'Supreme deformability exceeding 5.0 mm (Class S2)',
      'High-tenacity structural microfibers eliminate internal shearing',
      'Gel-matrix enables variable water mixing consistency for floor or wall',
      'Maximum adhesion on non-absorbent surfaces: glass, steel, resin, porcelain'
    ],
    applications: [
      'Mega-scale architectural landmarks and civic infrastructure',
      'Airport terminals, subway concourses, and train stations',
      'Ultra-thin large porcelain slabs on flexible building facades',
      'Cold rooms, refrigerated warehouses, and thermal spas'
    ],
    benefits: [
      'Zero failure rate in extreme climates (-30°C to +90°C)',
      'Maximum impact resistance against heavy kinetic shocks',
      'Flagship Xtreme Spanish technology'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 12004 / UNE EN 12002: C2TE-S2' },
      { property: 'Transverse Deformation', value: '≥ 5.5 mm (Class S2 Super Deformable)' },
      { property: 'Tensile Adhesion', value: '≥ 1.6 N/mm²' },
      { property: 'Open Time at 20°C', value: '≥ 45 minutes' }
    ],
    packaging: '25 kg bag with gold quality seal and Spanish technology badge',
    consumption: 'Approx. 3.0 - 5.5 kg/m²',
    shelfLife: '12 months',
    color: 'Extra White',
    accentColor: '#050A5C',
    isFeatured: true,
    documents: [
      { title: 'FiberGel S2 - Technical Data Sheet', type: 'TDS', size: '340 KB' },
      { title: 'FiberGel S2 - Material Safety Sheet', type: 'MSDS', size: '290 KB' }
    ],
    relatedSlugs: ['fibergel-s1', 'supercol-c2tes2', 'xtracol-c2te']
  },
  {
    id: 'cemair',
    slug: 'cemair',
    image: '/images/products/cemair.webp',
    name: 'CemAir Masonry Mortar',
    category: 'Masonry Mortars',
    categorySlug: 'masonry-mortars',
    classification: 'EN 998-2 Class M10 / M15',
    tagline: 'Aerated & Thermal Lightweight Mortar for Concrete Blocks & Bricks',
    shortDescription: 'Engineered lightweight masonry mortar with integrated air-entraining technology for thermal insulation and high structural bonding.',
    fullDescription: 'CemAir is a state-of-the-art masonry mortar engineered with micro-porous air entrainment technology. It offers superior thermal barrier properties, reducing thermal bridging across block joints while providing robust compressive strength according to EN 998-2.',
    features: [
      'Micro-air entraining technology enhances thermal insulation',
      'High workability and prolonged plasticity without bleeding',
      'High bond strength between porous and non-porous masonry blocks',
      'Lightweight formulation increases coverage per bag by 25%'
    ],
    applications: [
      'Laying lightweight aerated concrete blocks (AAC / Autoclaved Aerated Concrete)',
      'Structural brickwork and high-resistance concrete masonry units (CMU)',
      'Thermal perimeter walls and energy-efficient building envelopes',
      'Interior partition walls with high sound-damping requirements'
    ],
    benefits: [
      'Reduces heating and cooling energy loss through masonry joints',
      'Lightweight bags reduce shipping weight and handling effort',
      'Resistant to rain penetration and moisture capillary action'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 998-2:2016' },
      { property: 'Compressive Strength', value: '≥ 10 N/mm² (Class M10) / ≥ 15 N/mm² (Class M15)' },
      { property: 'Thermal Conductivity (λ)', value: '0.35 W/m·K' },
      { property: 'Dry Bulk Density', value: 'approx. 1350 kg/m³' }
    ],
    packaging: '25 kg bag',
    consumption: 'Approx. 15-20 kg/m² for typical 20cm block wall',
    shelfLife: '12 months',
    color: 'Industrial Grey',
    accentColor: '#F4511E',
    isFeatured: true,
    documents: [
      { title: 'CemAir - Technical Data Sheet', type: 'TDS', size: '230 KB' }
    ],
    relatedSlugs: ['masonry-mortars', 'cement-renders', 'repairs']
  },
  {
    id: 'flexigrout',
    slug: 'flexigrout',
    image: '/images/products/flexigrout.webp',
    name: 'FlexiGrout Ceramic Tile Grout',
    category: 'Tile Adhesives & Grouts',
    categorySlug: 'tile-adhesives',
    classification: 'EN 13888 Class CG2WA',
    tagline: 'High-Performance Flexible Water-Repellent Cementitious Grout',
    shortDescription: 'Ultra-durable, mold-resistant cementitious grout with drop-effect water repellency for joints from 1mm to 15mm.',
    fullDescription: 'FlexiGrout is a polymer-fortified, anti-efflorescence colored grout for jointing all types of ceramic tiles, mosaics, and natural stones. Features Hydro-Shield drop effect for extreme moisture resistance and Saniti-Shield biocidal protection against fungus and mildew.',
    features: [
      'Class CG2WA with high abrasion resistance and reduced water absorption',
      'Hydro-Shield technology: water beads off without staining',
      'Smooth surface finish with uniform color consistency',
      'Suitable for joint widths from 1 mm to 15 mm'
    ],
    applications: [
      'Bathrooms, showers, and wellness spas',
      'Commercial kitchen floors and high-hygiene food preparation areas',
      'External patios, terraces, and building facades',
      'Swimming pool copings and water parks'
    ],
    benefits: [
      'Prevents mold, black fungal spots, and bacteria colonization',
      'Zero cracking or shrinkage during curing',
      'Available in a wide range of UV-stable architectural colors'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 13888:2009 / CG2WA' },
      { property: 'Joint Width', value: '1 mm to 15 mm' },
      { property: 'Abrasion Resistance', value: '≤ 1000 mm³' },
      { property: 'Water Absorption (4h)', value: '≤ 2.0 g' }
    ],
    packaging: '5 kg moisture-barrier bag & 20 kg buckets',
    consumption: '0.2 to 1.0 kg/m² depending on tile dimension and joint width',
    shelfLife: '24 months',
    color: 'Multiple UV-Stable Shades',
    accentColor: '#C62828',
    isFeatured: true,
    documents: [
      { title: 'FlexiGrout - Technical Data Sheet', type: 'TDS', size: '270 KB' }
    ],
    relatedSlugs: ['supercol-piscinas', 'xtracol-c1te', 'fibergel-s1']
  },
  {
    id: 'cement-renders',
    slug: 'cement-renders',
    image: '/images/products/cemair.webp',
    name: 'Xtreme Cement-Based Renders',
    category: 'Cement-Based Renders',
    categorySlug: 'cement-renders',
    classification: 'EN 998-1 Class GP / CR CS IV',
    tagline: 'Weather-Resistant Protective Wall Renders & Base Coats',
    shortDescription: 'Industrial-grade renders providing strong, waterproof foundations and smooth versatile surfaces for final architectural finishes.',
    fullDescription: 'Xtreme Cement-Based Renders are factory-prepared dry mortars containing hydraulic cement binders, graded siliceous sands, and water-repellent polymers. They offer outstanding weatherproofing, breathability, and impact resistance for exterior facades and interior masonry.',
    features: [
      'High vapor permeability allowing wall breathing while repelling wind-driven rain',
      'Excellent mechanical adhesion to clay brick, concrete block, and stone',
      'Machine sprayable and manual hand-trowel compatible',
      'Crack-resistant formulation with fiber reinforcement'
    ],
    applications: [
      'Exterior protective basecoat renders for building facades',
      'Interior leveling coats prior to tiling or decorative painting',
      'Substrates in coastal and humid climates',
      'Renovation of old masonry and structural stone walls'
    ],
    benefits: [
      'Protects structural walls from moisture ingress and salt damage',
      'Provides a plumb, smooth canvas for premium coatings',
      'Consistent European quality assurance'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 998-1:2016' },
      { property: 'Compressive Strength', value: 'Class CS IV (≥ 6.0 N/mm²)' },
      { property: 'Water Absorption', value: 'Class W2 (c ≤ 0.2 kg/m²·min⁰˙⁵)' },
      { property: 'Vapor Permeability (μ)', value: '≤ 20' }
    ],
    packaging: '25 kg multi-wall bag',
    consumption: 'Approx. 15 kg/m² per 10 mm thickness',
    shelfLife: '12 months',
    color: 'Natural Grey / Off-White',
    accentColor: '#050A5C',
    isFeatured: true,
    documents: [
      { title: 'Xtreme Renders - Technical Data Sheet', type: 'TDS', size: '250 KB' }
    ],
    relatedSlugs: ['cemair', 'repairs', 'xtracol-c1te']
  },
  {
    id: 'repairs',
    slug: 'repairs',
    image: '/images/products/supercol-c2tes2.webp',
    name: 'Xtreme Structural Repair Mortar',
    category: 'Structural Repairs',
    categorySlug: 'repairs',
    classification: 'EN 1504-3 Class R4 Structural Repair',
    tagline: 'Fiber-Reinforced Thixotropic High-Strength Concrete Repair Mortar',
    shortDescription: 'High-modulus, sulfate-resistant structural repair mortar for restoration of deteriorated reinforced concrete structures.',
    fullDescription: 'Xtreme Structural Repair Mortar is a single-component, shrinkage-compensated cementitious mortar formulated with microsilica, synthetic fibers, and corrosion inhibitors. Conforming to EN 1504-3 Class R4, it restores structural integrity to pillars, beams, bridges, and marine piers.',
    features: [
      'Class R4 structural specification (compressive strength > 45 N/mm² at 28 days)',
      'Thixotropic application up to 50 mm thickness per layer without formwork',
      'Active corrosion inhibiting additives protect internal reinforcing steel',
      'Extreme resistance to carbonation, sulfate attack, and chlorides'
    ],
    applications: [
      'Repair of spalled and damaged concrete pillars, beams, and balconies',
      'Infrastructure projects: highway bridges, viaducts, tunnels, and retaining walls',
      'Marine and coastal structures exposed to aggressive saltwater environments',
      'Industrial floors and loading docks subject to heavy impact'
    ],
    benefits: [
      'Restores the load-bearing design strength of historic and modern concrete',
      'Long-term durability against harsh chemical and marine attacks',
      'Low shrinkage eliminates micro-fissuring and water infiltration'
    ],
    technicalData: [
      { property: 'Standard / Norm', value: 'UNE EN 1504-3:2006 Class R4' },
      { property: 'Compressive Strength (28d)', value: '≥ 50 N/mm²' },
      { property: 'Elastic Modulus', value: '≥ 20 GPa' },
      { property: 'Chloride Ion Diffusion', value: 'Very Low' },
      { property: 'Adhesion to Concrete', value: '≥ 2.0 N/mm²' }
    ],
    packaging: '25 kg moisture-barrier bag',
    consumption: 'Approx. 19 kg/m² per 10 mm thickness',
    shelfLife: '12 months',
    color: 'Concrete Grey',
    accentColor: '#C62828',
    isFeatured: true,
    documents: [
      { title: 'Xtreme R4 Repair Mortar - Technical Data Sheet', type: 'TDS', size: '320 KB' },
      { title: 'Xtreme R4 Repair Mortar - Material Safety Sheet', type: 'MSDS', size: '280 KB' }
    ],
    relatedSlugs: ['cemair', 'cement-renders', 'supercol-c2tes2']
  }
];
