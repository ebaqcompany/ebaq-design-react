// Where clients are based, for the map on /locations. Only confirmed locations belong here: a client
// without a known city is left out rather than guessed. `study` is a case study slug in caseStudies.ts.
export type ClientPlace = {
  id: string;
  label: string;
  country: string;
  lat: number;
  lon: number;
  clients: { name: string; industry?: string; logo?: string; study?: string }[];
};

export const clientPlaces: ClientPlace[] = [
  {
    id: "new-york", label: "New York", country: "United States", lat: 40.68, lon: -73.94,
    clients: [
      { name: "The Savory Team", industry: "Real estate", logo: "/client-logos/savory-wordmark.svg", study: "savory" },
      { name: "NextDim AI", industry: "Healthcare AI", logo: "/client-logos/nextdim-wordmark.svg", study: "next-dimension" },
      { name: "Brevidee", industry: "Education technology", logo: "/client-logos/brevidee-logo.svg", study: "brevidee" },
      { name: "Orbio", industry: "AI infrastructure", study: "orbio" },
      { name: "Sukoon", industry: "Travel" },
      { name: "Flush Wash", industry: "Personal brand" },
    ],
  },
  {
    id: "new-jersey", label: "New Jersey", country: "United States", lat: 40.06, lon: -74.41,
    clients: [{ name: "Elevate", industry: "Ecommerce technology", logo: "/client-logos/elevate-wordmark.svg", study: "elevate" }],
  },
  {
    id: "georgia", label: "Georgia", country: "United States", lat: 33.94, lon: -84.21,
    clients: [{ name: "Vessels of Glory", industry: "Clergy and church apparel" }],
  },
  {
    id: "miami", label: "Miami", country: "United States", lat: 25.76, lon: -80.19,
    clients: [
      { name: "Wingnut Social", industry: "Digital marketing", logo: "/client-logos/wingnut-logo-black.svg", study: "wingnut" },
      { name: "Nathalie Sadler", industry: "Speaker coaching", study: "nathalie-sadler" },
    ],
  },
  {
    id: "florida", label: "Florida", country: "United States", lat: 27.99, lon: -81.76,
    clients: [{ name: "The Cawley Family Dog Foundation", industry: "Nonprofit" }],
  },
  {
    id: "shalimar", label: "Shalimar", country: "United States", lat: 30.45, lon: -86.58,
    clients: [{ name: "Kultra", industry: "Art markers" }],
  },
  {
    id: "biloxi", label: "Biloxi", country: "United States", lat: 30.39, lon: -88.99,
    clients: [{ name: "SweetGrass", industry: "Cannabis retail", logo: "/client-logos/sweetgrass-logo-black.svg", study: "sweetgrass" }],
  },
  {
    id: "houston", label: "Houston", country: "United States", lat: 29.76, lon: -95.37,
    clients: [{ name: "Drilling Tools International", industry: "Oil and gas services" }],
  },
  {
    id: "austin", label: "Austin", country: "United States", lat: 30.27, lon: -97.74,
    clients: [{ name: "Iris Telehealth", industry: "Telehealth" }],
  },
  {
    id: "utah", label: "Utah", country: "United States", lat: 40.11, lon: -111.65,
    clients: [{ name: "Brand Makers", industry: "Promotional products", logo: "/client-logos/brand-makers-logo-black.svg" }],
  },
  {
    id: "san-francisco", label: "San Francisco", country: "United States", lat: 37.77, lon: -122.42,
    clients: [
      { name: "Runware", industry: "AI infrastructure", logo: "/runware-logo.webp" },
      { name: "Octane Security", industry: "Blockchain security", logo: "/client-logos/octane.svg" },
    ],
  },
  {
    id: "sint-maarten", label: "Sint Maarten", country: "Sint Maarten", lat: 18.03, lon: -63.05,
    clients: [{ name: "Fox Berman", industry: "Legal services", logo: "/client-logos/foxberman-wordmark.svg", study: "fox-berman" }],
  },
  {
    id: "dublin", label: "Dublin", country: "Ireland", lat: 53.34, lon: -6.26,
    clients: [{ name: "Periti Digital", industry: "Digital consultancy", logo: "/client-logos/periti-logo-black.svg", study: "periti" }],
  },
  {
    id: "london", label: "London", country: "United Kingdom", lat: 51.51, lon: -0.13,
    clients: [{ name: "Airport Executive", industry: "Luxury transportation", logo: "/client-logos/airport-executive-logo.svg", study: "airport-executive" }],
  },
  {
    id: "spain", label: "Spain", country: "Spain", lat: 40.42, lon: -3.7,
    clients: [{ name: "Figr", industry: "Design software", logo: "/client-logos/figrr.svg" }],
  },
  {
    id: "athens", label: "Athens", country: "Greece", lat: 37.98, lon: 23.73,
    clients: [{ name: "FocalPM", industry: "Construction project management" }],
  },
  {
    id: "abu-dhabi", label: "Abu Dhabi", country: "United Arab Emirates", lat: 24.47, lon: 54.37,
    clients: [{ name: "Spark", industry: "Marketing & communications", logo: "/client-logos/spark-wordmark-black.svg", study: "spark" }],
  },
  {
    id: "ahmedabad", label: "Ahmedabad", country: "India", lat: 23.03, lon: 72.58,
    clients: [{ name: "Shri Ami Corporation", industry: "Real estate development", logo: "/client-logos/ami-logo-black.svg" }],
  },
  {
    id: "india", label: "India", country: "India", lat: 21.15, lon: 79.09,
    clients: [{ name: "SNM Group", industry: "Import and export" }],
  },
  {
    id: "sydney", label: "Sydney", country: "Australia", lat: -33.87, lon: 151.21,
    clients: [{ name: "Medihuanna", industry: "Medical education", logo: "/client-logos/medihuanna-wordmark-black.svg", study: "medihuanna" }],
  },
];
