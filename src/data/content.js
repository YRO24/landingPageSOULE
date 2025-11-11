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
    name: 'MED BIN RASHID AL MAKTOUM CITY',
    logo: IMAGES.logo
  },
  {
    id: 2,
    name: 'PALM JUMEIRAH',
    logo: IMAGES.palmJumeirah
  },
  {
    id: 3,
    name: 'DUBAI HILLS ESTATE',
    logo: IMAGES.propertyLogo
  },
  {
    id: 4,
    name: 'JUMEIRAH ISLANDS', 
    logo: IMAGES.tilalLogo
  },
  {
    id: 5,
    name: 'SOBHA HARTLAND',
    logo: IMAGES.original
  },
  {
    id: 6,
    name: 'ARABIAN RANCHES',
    logo: IMAGES.logo
  }
];

export const servicesData = [
  {
    id: 1,
    title: 'Architectural Visualisation',
    description: 'We translate approved designs into reality with a network of master craftsmen, site specialists, and project managers, ensuring quality and control at every stage of build and fit-out.',
    applications: 'Villa renovations, new constructions, luxury detailing.'
  },
  {
    id: 2,
    title: 'Interior Styling & Design',
    description: 'From bespoke layouts to handpicked finishes, we curate interiors that speak to our clients\' taste, lifestyle, and legacy. Every detail, from furniture to lighting, is chosen with purpose.',
    applications: 'Turnkey villas, concept homes, investment properties.'
  },
  {
    id: 3,
    title: 'High-End Project Execution',
    description: 'We translate approved designs into reality with a network of master craftsmen, site specialists, and project managers, ensuring quality and control at every stage of build and fit-out.',
    applications: 'Villa renovations, new constructions, luxury detailing.'
  },
  {
    id: 4,
    title: 'Landscape Design',
    description: 'We integrate nature into architecture—designing gardens, courtyards, terraces, and outdoor features that amplify the experience of space.',
    applications: 'Pool areas, driveways, open-air lounges, villa entires.'
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
    title: 'Innovative Visualisation',
    description: 'We help clients see their space before it\'s built.'
  },
  {
    title: 'Client-Centered Vision',
    description: 'We build relationships, not just residences.'
  },
  {
    title: 'Craft with Integrity',
    description: 'No shortcuts. No compromises.'
  },
  {
    title: 'Elegance in Execution',
    description: 'From drawings to delivery, detail is everything.'
  }
];
