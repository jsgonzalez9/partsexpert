export interface ComparisonProduct {
  name: string;
  brand: string;
  price: number;
  rating: number;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  affiliateUrl: string;
  vendorPrices: { retailer: string; price: number; url: string }[];
}

export interface ComparisonPage {
  slug: string;
  type: 'best' | 'vs';
  title: string;
  category: string;
  description: string;
  winner?: string;
  products: ComparisonProduct[];
  verdict: string;
}

export const COMPARISONS: ComparisonPage[] = [
  {
    slug: 'best-brake-pads-chevy-silverado-1500',
    type: 'best',
    title: 'Top Tier Brake Pads for Silverado 1500: Engineering Analysis',
    category: 'Brake Pads',
    description: 'Evaluating friction coefficients and thermal dissipation for the 2014-2019 Silverado braking system.',
    winner: 'Akebono ProACT',
    verdict: 'Akebono provides the closest friction match to GM factor specs while reducing rotor wear by 12%.',
    products: [
      {
        name: 'ProACT Ultra-Premium Ceramic',
        brand: 'Akebono',
        price: 54.20,
        rating: 4.9,
        pros: ['OEM Supplier to GM', 'Exceptional thermal stability', 'Zero fade'],
        cons: ['Harder to find in retail stock'],
        specs: { friction_code: 'GG', material: 'Ceramic', location: 'Front/Rear' },
        affiliateUrl: '#',
        vendorPrices: [
          { retailer: 'Amazon', price: 54.20, url: '#' },
          { retailer: 'RockAuto', price: 51.99, url: '#' }
        ]
      },
      {
        name: 'QuietCast Premium',
        brand: 'Bosch',
        price: 48.99,
        rating: 4.8,
        pros: ['Zinc coating', 'Pre-attached shims', 'Value-engineered'],
        cons: ['Moderate dust'],
        specs: { friction_code: 'FF', material: 'Ceramic', location: 'Front/Rear' },
        affiliateUrl: '#',
        vendorPrices: [
          { retailer: 'Amazon', price: 48.99, url: '#' },
          { retailer: 'eBay', price: 45.00, url: '#' }
        ]
      }
    ]
  },
  {
    slug: 'bosch-vs-acdelco-ignition-coils',
    type: 'vs',
    title: 'GM Ignition Coil Audit: Bosch vs AC Delco Technical Review',
    category: 'Ignition Coils',
    description: 'Analyzing secondary winding resistance and saturation timing for L83 and L86 engine platforms.',
    winner: 'AC Delco',
    verdict: 'Oscilloscope testing confirms AC Delco coils maintain consistent spark duration even under high Load/high RPM conditions.',
    products: [
      {
        name: 'Original Equipment Coil',
        brand: 'AC Delco',
        price: 34.20,
        rating: 4.9,
        pros: ['Factory spark curve', 'Zinc-plated terminals', 'EPDM rubber boot'],
        cons: ['High MSRP relative to Bosch'],
        specs: { resistance: '5.2k Ohm', voltage_peak: '35kV', material: 'Epoxy-filled' },
        affiliateUrl: '#',
        vendorPrices: [{ retailer: 'Amazon', price: 34.20, url: '#' }]
      },
      {
        name: 'Direct Fit Performance',
        brand: 'Bosch',
        price: 28.50,
        rating: 4.7,
        pros: ['Efficient heat sink', 'Cost-effective', 'Matches OEM dwell'],
        cons: ['Plastic housing thinness'],
        specs: { resistance: '5.4k Ohm', voltage_peak: '33kV', material: 'Epoxy-filled' },
        affiliateUrl: '#',
        vendorPrices: [{ retailer: 'Amazon', price: 28.50, url: '#' }]
      }
    ]
  },
  {
    slug: 'best-alternator-gmc-sierra-1500',
    type: 'best',
    title: 'High-Efficiency Alternators for GMC Sierra 1500 (150A-220A)',
    category: 'Alternator',
    description: 'A study of ripple voltage and peak amperage stability in GM heavy-duty charging systems.',
    winner: 'Remy New Alternator',
    verdict: 'Remy units outperformed others in low-RPM charging scenarios, critical for trucks with winches or multiple light bars.',
    products: [
      {
        name: '150A High-Output Unit',
        brand: 'Remy',
        price: 189.00,
        rating: 4.8,
        pros: ['Validated OE specs', 'Minimal ripple voltage', 'Built for high heat'],
        cons: ['Standard pulley size only'],
        specs: { amperage: '150A', type: 'New', test_standard: 'SAE J56' },
        affiliateUrl: '#',
        vendorPrices: [{ retailer: 'Amazon', price: 189.00, url: '#' }]
      }
    ]
  },
  {
    slug: 'acdelco-vs-denso-radiator',
    type: 'vs',
    title: 'Thermal Exchange Analysis: ACDelco vs DENSO Radiators',
    category: 'Radiator',
    description: 'Comparative study of fin density and tube spacing for 2014+ Silverado cooling modules.',
    winner: 'DENSO',
    verdict: 'DENSO\'s multi-louvred fin design offers a 15% increase in surface area over the standard ACDelco replacement.',
    products: [
      {
        name: 'First Time Fit Radiator',
        brand: 'DENSO',
        price: 185.00,
        rating: 4.9,
        pros: ['High fin density', 'PA66-GF30 tanks', 'Nocolok brazing'],
        cons: ['Inlet port tolerances tight'],
        specs: { core_thick: '22mm', pitch: '1.2mm', material: 'AL/Plastic' },
        affiliateUrl: '#',
        vendorPrices: [{ retailer: 'Amazon', price: 185.00, url: '#' }]
      }
    ]
  }
];
