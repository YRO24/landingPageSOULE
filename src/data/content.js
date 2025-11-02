import { IMAGES } from '../utils/constants';

export const projectsData = [
  {
    id: 1,
    title: 'Lagoon Serenity Villa',
    location: 'Damac Hills, Dubai',
    type: 'Ultra-luxury Residential Villa',
    completionYear: '2024 (Under concept phase)',
    plotArea: '2500 sq. mt (Built-up area: 4500 sq. mt)',
    description: 'A timeless, mahogany residence set ablaze in the heart of Dubai\'s most emerging global community. Combining a modern family living experience and ultra-luxe finishes, our client\'s home is a lakeside oasis, natural materials, and light all come perfectly in sync.',
    challenge: 'Harmonizing scale with intimacy in a massive open-plan layout.',
    solution: 'We introduced zones through furniture, lighting, and bespoke dividers, ensuring distinct functional experiences through neutral palettes and reflective surfaces.',
    technologies: [
      'High-performance frameless glass',
      'Custom marble slabs from India',
      'Smart lighting + HVAC integration',
      '3D visualizations (pre-construction)'
    ],
    images: [
      IMAGES.hero,
      IMAGES.bedroom4,
      IMAGES.bedroom5,
      IMAGES.guestWalkIn,
      IMAGES.kalpesh4,
      IMAGES.kalpesh5,
      IMAGES.kalpesh6,
      IMAGES.office1
    ],
    category: 'residential',
    featured: true
  }
];

export const communitiesData = [
  {
    id: 1,
    name: 'Tilal Al Ghaf',
    logo: IMAGES.tilalLogo
  },
  {
    id: 2,
    name: 'Property Development',
    logo: IMAGES.propertyLogo
  },
  {
    id: 3,
    name: 'Palm Jumeirah',
    logo: IMAGES.palmJumeirah
  }
];

export const servicesData = [
  {
    id: 1,
    title: 'Architectural Visualisation',
    description: 'We offer the acclaimed design of your upcoming project, along with the photorealistic images. We also assist you with technical details, project deadlines, ensuring quality potential at every stage of build and lift-off.',
    applications: 'Competitions, new constructions, real conversions, luxury interiors.'
  },
  {
    id: 2,
    title: 'Interior Styling & Design',
    description: 'Transforming interior spaces to balance functionality with refined aesthetics. We tailor our conceptual designs to individual taste, lifestyle, and legacy. Every detail, from furniture to lighting, is curated with precision.',
    applications: 'Turnkey sites, concept homes, statement properties.'
  },
  {
    id: 3,
    title: 'High-End Project Execution',
    description: 'We translate approved designs into reality with a network of premier craftsmen. Our end-to-end coordination ensures seamless builds that elevate every stage of build and lift-off.',
    applications: 'Villas, penthouses, new constructions, luxury refitting.'
  },
  {
    id: 4,
    title: 'Landscape Design',
    description: 'We bring intricate into architecture — designing gardens, courtyards, terraces, and open-air spaces that honor sustainability and visual drama.',
    applications: 'Pool areas, driveways, open-air volumetrics.'
  }
];

export const teamData = [
  {
    id: 1,
    name: 'Sonali Potdar',
    role: 'FOUNDER',
    image: IMAGES.original
  },
  {
    id: 2,
    name: 'Siddhesh Mule',
    role: 'MANAGING DIRECTORY',
    image: IMAGES.original
  }
];

export const coreValues = [
  {
    title: 'Clarity through Design',
    description: 'Every space starts with intention and ends with harmony.'
  },
  {
    title: 'Craft with Integrity',
    description: 'No shortcuts. No compromises.'
  },
  {
    title: 'Innovative Visualisation',
    description: 'We help clients see their space before it\'s built.'
  },
  {
    title: 'Client-Centered Vision',
    description: 'We build relationships, not just spaces.'
  },
  {
    title: 'Elegance in Execution',
    description: 'From drawings to delivery, beauty in everything.'
  }
];
