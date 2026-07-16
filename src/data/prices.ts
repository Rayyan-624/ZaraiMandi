export interface Rate {
  id: string;
  commodity: string;
  commodityUrdu: string;
  emoji: string;
  category: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  unit: string;
  unitUrdu: string;
  mandi: string;
  mandiUrdu: string;
  district: string;
  change: number; // percentage
  changeAbs: number;
  lastUpdated: string;
  quality: 'A' | 'B' | 'C';
  arrivals: number; // in tons
  history: { date: string; price: number }[];
}

export interface Vertical {
  id: string;
  name: string;
  nameUrdu: string;
  emoji: string;
  color: string;
  productCount: number;
  byproductCount: number;
}

export const verticals: Vertical[] = [
  { id: 'wheat', name: 'Wheat', nameUrdu: 'گندم', emoji: '🌾', color: '#f5c518', productCount: 4, byproductCount: 12 },
  { id: 'cotton', name: 'Cotton', nameUrdu: 'کپاس', emoji: '🌿', color: '#48bb78', productCount: 5, byproductCount: 18 },
  { id: 'maize', name: 'Maize', nameUrdu: 'مکئی', emoji: '🌽', color: '#ed8936', productCount: 3, byproductCount: 8 },
  { id: 'rice', name: 'Rice', nameUrdu: 'چاول', emoji: '🍚', color: '#63b3ed', productCount: 21, byproductCount: 14 },
  { id: 'sugar', name: 'Sugar', nameUrdu: 'چینی', emoji: '🍬', color: '#b794f4', productCount: 2, byproductCount: 6 },
  { id: 'vegetables', name: 'Vegetables', nameUrdu: 'سبزیاں', emoji: '🥬', color: '#68d391', productCount: 26, byproductCount: 10 },
  { id: 'pulses', name: 'Pulses', nameUrdu: 'دالیں', emoji: '🫘', color: '#fc8181', productCount: 24, byproductCount: 9 },
];

export const todayRates: Rate[] = [
  {
    id: 'wheat-fsd',
    commodity: 'Wheat', commodityUrdu: 'گندم', emoji: '🌾',
    category: 'wheat',
    price: 4050, minPrice: 3980, maxPrice: 4120,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Faisalabad Grain Market', mandiUrdu: 'فیصل آباد اناج منڈی',
    district: 'Faisalabad',
    change: 1.8, changeAbs: 70,
    lastUpdated: '09:45 AM',
    quality: 'A', arrivals: 820,
    history: [
      { date: 'Jul 10', price: 3900 }, { date: 'Jul 11', price: 3950 },
      { date: 'Jul 12', price: 3980 }, { date: 'Jul 13', price: 4000 },
      { date: 'Jul 14', price: 3980 }, { date: 'Jul 15', price: 4050 },
    ],
  },
  {
    id: 'wheat-lhr',
    commodity: 'Wheat', commodityUrdu: 'گندم', emoji: '🌾',
    category: 'wheat',
    price: 4020, minPrice: 3960, maxPrice: 4080,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Lahore Mandi', mandiUrdu: 'لاہور منڈی',
    district: 'Lahore',
    change: 0.5, changeAbs: 20,
    lastUpdated: '09:30 AM',
    quality: 'A', arrivals: 1240,
    history: [
      { date: 'Jul 10', price: 3920 }, { date: 'Jul 11', price: 3940 },
      { date: 'Jul 12', price: 3960 }, { date: 'Jul 13', price: 4000 },
      { date: 'Jul 14', price: 4000 }, { date: 'Jul 15', price: 4020 },
    ],
  },
  {
    id: 'maize-fsd',
    commodity: 'Maize', commodityUrdu: 'مکئی', emoji: '🌽',
    category: 'maize',
    price: 2380, minPrice: 2300, maxPrice: 2450,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Faisalabad Grain Market', mandiUrdu: 'فیصل آباد اناج منڈی',
    district: 'Faisalabad',
    change: -2.1, changeAbs: -51,
    lastUpdated: '10:00 AM',
    quality: 'B', arrivals: 560,
    history: [
      { date: 'Jul 10', price: 2500 }, { date: 'Jul 11', price: 2480 },
      { date: 'Jul 12', price: 2460 }, { date: 'Jul 13', price: 2430 },
      { date: 'Jul 14', price: 2431 }, { date: 'Jul 15', price: 2380 },
    ],
  },
  {
    id: 'cotton-bwp',
    commodity: 'Cotton (Phutti)', commodityUrdu: 'کپاس (پھٹی)', emoji: '🌿',
    category: 'cotton',
    price: 8750, minPrice: 8600, maxPrice: 8900,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Bahawalpur Cotton Market', mandiUrdu: 'بہاولپور کپاس منڈی',
    district: 'Bahawalpur',
    change: 3.2, changeAbs: 272,
    lastUpdated: '10:15 AM',
    quality: 'A', arrivals: 340,
    history: [
      { date: 'Jul 10', price: 8200 }, { date: 'Jul 11', price: 8350 },
      { date: 'Jul 12', price: 8400 }, { date: 'Jul 13', price: 8478 },
      { date: 'Jul 14', price: 8478 }, { date: 'Jul 15', price: 8750 },
    ],
  },
  {
    id: 'rice-skr',
    commodity: 'Rice (Super Basmati)', commodityUrdu: 'چاول (سپر باسمتی)', emoji: '🍚',
    category: 'rice',
    price: 6200, minPrice: 6050, maxPrice: 6350,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Sukkur Rice Market', mandiUrdu: 'سکھر چاول منڈی',
    district: 'Sukkur',
    change: -0.8, changeAbs: -50,
    lastUpdated: '09:50 AM',
    quality: 'A', arrivals: 180,
    history: [
      { date: 'Jul 10', price: 6100 }, { date: 'Jul 11', price: 6150 },
      { date: 'Jul 12', price: 6250 }, { date: 'Jul 13', price: 6250 },
      { date: 'Jul 14', price: 6250 }, { date: 'Jul 15', price: 6200 },
    ],
  },
  {
    id: 'sugar-lhr',
    commodity: 'Sugar', commodityUrdu: 'چینی', emoji: '🍬',
    category: 'sugar',
    price: 5800, minPrice: 5750, maxPrice: 5850,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Lahore Wholesale Market', mandiUrdu: 'لاہور تھوک منڈی',
    district: 'Lahore',
    change: 0.0, changeAbs: 0,
    lastUpdated: '09:30 AM',
    quality: 'A', arrivals: 420,
    history: [
      { date: 'Jul 10', price: 5750 }, { date: 'Jul 11', price: 5780 },
      { date: 'Jul 12', price: 5800 }, { date: 'Jul 13', price: 5800 },
      { date: 'Jul 14', price: 5800 }, { date: 'Jul 15', price: 5800 },
    ],
  },
  {
    id: 'onion-khi',
    commodity: 'Onion', commodityUrdu: 'پیاز', emoji: '🧅',
    category: 'vegetables',
    price: 3200, minPrice: 3000, maxPrice: 3400,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Karachi Sabzi Mandi', mandiUrdu: 'کراچی سبزی منڈی',
    district: 'Karachi',
    change: -5.9, changeAbs: -200,
    lastUpdated: '10:20 AM',
    quality: 'B', arrivals: 750,
    history: [
      { date: 'Jul 10', price: 3600 }, { date: 'Jul 11', price: 3500 },
      { date: 'Jul 12', price: 3450 }, { date: 'Jul 13', price: 3400 },
      { date: 'Jul 14', price: 3400 }, { date: 'Jul 15', price: 3200 },
    ],
  },
  {
    id: 'moong-mlt',
    commodity: 'Moong Dal', commodityUrdu: 'مونگ دال', emoji: '🫘',
    category: 'pulses',
    price: 14500, minPrice: 14200, maxPrice: 14800,
    unit: '40kg', unitUrdu: '40 کلو',
    mandi: 'Multan Pulse Market', mandiUrdu: 'ملتان دال منڈی',
    district: 'Multan',
    change: 2.1, changeAbs: 300,
    lastUpdated: '09:45 AM',
    quality: 'A', arrivals: 95,
    history: [
      { date: 'Jul 10', price: 13800 }, { date: 'Jul 11', price: 14000 },
      { date: 'Jul 12', price: 14100 }, { date: 'Jul 13', price: 14200 },
      { date: 'Jul 14', price: 14200 }, { date: 'Jul 15', price: 14500 },
    ],
  },
];

export interface RepSubmission {
  id: string;
  rep: string;
  location: string;
  commodity: string;
  priceMin: number;
  priceMax: number;
  priceType: 'retail' | 'wholesale' | 'farm-gate';
  unit: string;
  quality: 'A' | 'B' | 'C';
  arrivals: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'flagged' | 'rejected';
  isAnomaly: boolean;
  anomalyReason?: string;
}

export const pendingSubmissions: RepSubmission[] = [
  {
    id: 'sub-001', rep: 'Muhammad Aslam', location: 'Okara',
    commodity: 'Wheat', priceMin: 4000, priceMax: 4080,
    priceType: 'wholesale', unit: '40kg', quality: 'A', arrivals: 650,
    timestamp: '09:32 AM', status: 'pending', isAnomaly: false,
  },
  {
    id: 'sub-002', rep: 'Zafar Iqbal', location: 'Sahiwal',
    commodity: 'Maize', priceMin: 2350, priceMax: 2420,
    priceType: 'wholesale', unit: '40kg', quality: 'B', arrivals: 420,
    timestamp: '09:41 AM', status: 'pending', isAnomaly: false,
  },
  {
    id: 'sub-003', rep: 'Abdul Waheed', location: 'Rahim Yar Khan',
    commodity: 'Cotton (Phutti)', priceMin: 12000, priceMax: 12500,
    priceType: 'wholesale', unit: '40kg', quality: 'A', arrivals: 210,
    timestamp: '09:55 AM', status: 'flagged', isAnomaly: true,
    anomalyReason: 'Price 37% above 7-day average (Rs. 8,750). Verify with rep.',
  },
  {
    id: 'sub-004', rep: 'Dur Muhammad', location: 'Larkana',
    commodity: 'Rice (Super Basmati)', priceMin: 6100, priceMax: 6300,
    priceType: 'farm-gate', unit: '40kg', quality: 'A', arrivals: 155,
    timestamp: '10:05 AM', status: 'pending', isAnomaly: false,
  },
];

export const pricingPlans = [
  { name: 'Basic', nameUrdu: 'بنیادی', duration: '1 Month', price: 399, commodities: 1, discount: 0, color: '#48bb78' },
  { name: 'Advance', nameUrdu: 'ایڈوانس', duration: '3 Months', price: 999, commodities: 1, discount: 10, color: '#63b3ed', popular: false },
  { name: 'Professional', nameUrdu: 'پروفیشنل', duration: '6 Months', price: 1999, commodities: 1, discount: 15, color: '#f5c518', popular: true },
  { name: 'Expert', nameUrdu: 'ماہر', duration: '10 Months', price: 3399, commodities: 1, discount: 15, color: '#fc8181' },
];
