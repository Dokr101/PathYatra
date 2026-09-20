/**
 * Fallback destinations — used when /api/destinations returns an error or
 * non-array data (e.g. 404 → Vite returns HTML). Validate with Array.isArray
 * before using live data.
 *
 * Colors are palette-accurate tonal blocks matching the design system.
 * Replace `placeholderColor` with a real image path once photos are available.
 */
export const fallbackDestinations = [
  {
    id: 1,
    name: 'Kathmandu',
    region: 'Bagmati Province',
    description: 'Ancient temples, living heritage and the vibrant heart of Himalayan culture. Durbar Square, Swayambhunath and Boudhanath await.',
    suitable_seasons: 'Spring,Autumn',
    avg_cost_per_day: 3500,
    avg_rating: 4.8,
    activity_count: 24,
    placeholderColor: '#2B3A45',
    lat: 27.7172,
    lng: 85.3240,
  },
  {
    id: 2,
    name: 'Pokhara',
    region: 'Gandaki Province',
    description: 'Phewa Lake at dusk, Annapurna on the horizon. Nepal\'s adventure capital is also its most serene.',
    suitable_seasons: 'Spring,Autumn,Winter',
    avg_cost_per_day: 3200,
    avg_rating: 4.9,
    activity_count: 31,
    placeholderColor: '#1B3B4B',
    lat: 28.2096,
    lng: 83.9856,
  },
  {
    id: 3,
    name: 'Chitwan',
    region: 'Bagmati Province',
    description: 'Jungle mornings with one-horned rhinos and Bengal tigers. Chitwan National Park is a UNESCO World Heritage Site.',
    suitable_seasons: 'Autumn,Winter,Spring',
    avg_cost_per_day: 4200,
    avg_rating: 4.7,
    activity_count: 18,
    placeholderColor: '#227744',
    lat: 27.5291,
    lng: 84.3542,
  },
  {
    id: 4,
    name: 'Bhaktapur',
    region: 'Bagmati Province',
    description: 'The medieval city of devotees. Intricate Newari woodcarving, pottery squares and temples preserved across centuries.',
    suitable_seasons: 'Spring,Autumn,Winter',
    avg_cost_per_day: 2800,
    avg_rating: 4.6,
    activity_count: 15,
    placeholderColor: '#B4533A',
    lat: 27.6710,
    lng: 85.4298,
  },
  {
    id: 5,
    name: 'Nagarkot',
    region: 'Bagmati Province',
    description: 'Dawn over eight Himalayan ranges. This hill station is Nepal\'s finest sunrise viewpoint, just an hour from Kathmandu.',
    suitable_seasons: 'Autumn,Winter,Spring',
    avg_cost_per_day: 2500,
    avg_rating: 4.5,
    activity_count: 12,
    placeholderColor: '#8FA58A',
    lat: 27.7133,
    lng: 85.5167,
  },
  {
    id: 6,
    name: 'Lumbini',
    region: 'Lumbini Province',
    description: 'Birthplace of the Buddha. Sacred gardens, the Maya Devi Temple and monasteries from twenty nations circle the eternal flame.',
    suitable_seasons: 'Winter,Spring',
    avg_cost_per_day: 2200,
    avg_rating: 4.4,
    activity_count: 10,
    placeholderColor: '#D3A045',
    lat: 27.4833,
    lng: 83.2760,
  },
];

export default fallbackDestinations;
