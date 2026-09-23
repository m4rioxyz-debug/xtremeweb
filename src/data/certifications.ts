export interface Certification {
  id: string;
  name: string;
  issuer: string;
  scope: string;
  standard: string;
  badgeText: string;
  iconType: 'iso' | 'ce' | 'spain' | 'otabu' | 'smg' | 'applus' | 'crismachem' | 'tika';
  description: string;
  validity: string;
}

export const certifications: Certification[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015 Quality Management',
    issuer: 'International Organization for Standardization',
    scope: 'Design, manufacturing, formulation, and commercialization of construction chemicals, dry mortars, and ceramic adhesives.',
    standard: 'ISO 9001:2015 Certificate No. ES-8942-QM',
    badgeText: 'ISO 9001:2015',
    iconType: 'iso',
    description: 'Certified operational management ensuring consistent product quality, traceability, and continuous manufacturing refinement.',
    validity: 'Active (2024 - 2027)'
  },
  {
    id: 'ce-marking',
    name: 'CE European Conformity',
    issuer: 'European Union Harmonized Standards',
    scope: 'Conformity assessment under European Construction Products Regulation (CPR 305/2011/EU).',
    standard: 'EN 12004, EN 998-1, EN 998-2, EN 1504-3',
    badgeText: 'CE Mark',
    iconType: 'ce',
    description: 'Ensures our materials meet stringent European health, structural safety, environmental protection, and mechanical durability criteria.',
    validity: 'Continuous Compliance'
  },
  {
    id: 'spanish-technology',
    name: 'Spanish Industrial Formulation',
    issuer: 'Manufactured with Spanish Technology',
    scope: 'Polymer formulations and chemical compounding engineered according to Spanish industrial chemical benchmarks.',
    standard: 'UNE (Una Norma Española) Standards',
    badgeText: 'Spain Technology',
    iconType: 'spain',
    description: 'Direct transfer of Spanish technical expertise, guaranteeing superior rheology, weather resilience, and structural longevity.',
    validity: 'Core Brand Origin'
  },
  {
    id: 'tika-accreditation',
    name: 'TIKA Technical Accreditation',
    issuer: 'TIKA Engineering Standards Board',
    scope: 'Approved specification for major public works, governmental infrastructures, and institutional contracts.',
    standard: 'Technical Specification Directive 2024',
    badgeText: 'TIKA تيكا',
    iconType: 'tika',
    description: 'Accredited for compliance with regional civil engineering specifications and government tenders.',
    validity: 'Active'
  },
  {
    id: 'otabu-global',
    name: 'OTABU Global Services Certification',
    issuer: 'OTABU Certification LLP',
    scope: 'Audited environmental management and chemical manufacturing compliance.',
    standard: 'ISO 14001 & ISO 45001',
    badgeText: 'OTABU Certified',
    iconType: 'otabu',
    description: 'Independent third-party verification of factory safety standards, worker protection, and ecological manufacturing integrity.',
    validity: 'Active'
  },
  {
    id: 'smg-standards',
    name: 'SMG Quality Certification',
    issuer: 'Standard Management Group (SMG)',
    scope: 'Batch consistency, high-shear dry mortar blending, and compressive resistance.',
    standard: 'SMG-QC-2023-B',
    badgeText: 'SMG',
    iconType: 'smg',
    description: 'Audited manufacturing precision certifying zero batch variance and high polymer dispersion efficiency.',
    validity: 'Active'
  },
  {
    id: 'applus-laboratories',
    name: 'Applus+ Technical Verification',
    issuer: 'Applus+ Laboratories Spain',
    scope: 'Third-party mechanical testing, transverse deformability (EN 12002), and shear resistance.',
    standard: 'Applus+ Test Protocol EN-12004',
    badgeText: 'Applus+',
    iconType: 'applus',
    description: 'Accredited testing in European certified laboratories confirming tensile adhesion values > 1.5 N/mm².',
    validity: 'Certified Test Reports'
  },
  {
    id: 'crismachem-formulations',
    name: 'Crismachem Chemical Synergy',
    issuer: 'Crismachem Chemical Research',
    scope: 'Specialty redispersible polymer powders, cellulose ethers, and defoamers.',
    standard: 'Polymer Purity Grade A',
    badgeText: 'Crismachem',
    iconType: 'crismachem',
    description: 'Collaboration in high-tenacity polymer synthesis for extreme thermal shock resistance in Mediterranean and desert climates.',
    validity: 'Strategic Partnership'
  }
];
