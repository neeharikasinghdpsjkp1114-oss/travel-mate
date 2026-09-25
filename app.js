/* ==========================================================================
   TRAVELMATE - APPLICATION LOGIC & REALISTIC MOCK DATA
   ========================================================================== */

// --- Currency exchange rates reference against INR ---
const CURRENCIES = {
  '₹': { symbol: '₹', rate: 1 },
  '$': { symbol: '$', rate: 0.012 },
  '€': { symbol: '€', rate: 0.011 },
  '£': { symbol: '£', rate: 0.0095 },
  '¥': { symbol: '¥', rate: 1.8 }
};

let currentCurrency = '₹';

// --- Default Active Trip Data ---
let activeTrip = {
  id: 'trip-1',
  destination: 'Kyoto & Osaka, Japan',
  departure: '2026-10-10',
  returnDate: '2026-10-16',
  duration: 7,
  budget: 85000,
  currency: '₹',
  travellerType: 'Couple / Pair',
  travellers: 2,
  styles: ['Cultural & Historic', 'Foodie Trail', 'Romantic'],
  hotel: 'Gion Komachi Boutique Machiya',
  city: 'Kyoto',
  pace: 'Balanced',
  img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
  itinerary: [
    {
      day: 1,
      city: 'Kyoto (Gion & Higashiyama)',
      hotel: 'Gion Komachi Boutique Machiya',
      notes: 'Remember to wear comfortable slip-on shoes for temple floors! Stop at % matchatea parlor.',
      morning: [
        'Arrive at Kansai Airport & take Haruka Express train to Kyoto Station',
        'Check-in at traditional Machiya townhouse in Gion',
        'Stroll through Shirakawa Canal lined with weeping willows'
      ],
      afternoon: [
        'Visit Kiyomizu-dera wooden stage overlooking autumn leaves',
        'Explore Ninenzaka and Sannenzaka preserved cobblestone streets',
        'Sample fresh warm dango & roasted hojicha soft serve'
      ],
      evening: [
        'Lantern-lit stroll along Pontocho Alley',
        'Cozy dinner: handmade Kaiseki tofu & seasonal tempura',
        'Evening reflections at Yasaka Shrine'
      ]
    },
    {
      day: 2,
      city: 'Kyoto (Arashiyama Bamboo Grove)',
      hotel: 'Gion Komachi Boutique Machiya',
      notes: 'Early morning wake-up ensures peaceful photos before tourist crowds arrive.',
      morning: [
        'Catch early Randen retro tram to Arashiyama',
        'Walk through the whispering green Bamboo Forest pathway',
        'Explore Zen rock garden at Tenryu-ji temple'
      ],
      afternoon: [
        'Cross Togetsukyo Bridge & visit Iwatayama Monkey Park',
        'Riverside matcha latte at % Arabica Coffee pavilion',
        'Hozugawa River wooden boat ride in the gentle breeze'
      ],
      evening: [
        'Traditional Kyoto ramen dinner with rich yuzu broth',
        'Pick up hand-carved wooden souvenirs & washi tape notebooks'
      ]
    },
    {
      day: 3,
      city: 'Kyoto (Fushimi Inari & Nara Excursion)',
      hotel: 'Gion Komachi Boutique Machiya',
      notes: 'Buy deer senbei biscuits carefully; the Nara deer are delightfully polite bowed greeters!',
      morning: [
        'Hike through thousands of vermilion Torii gates at Fushimi Inari Shrine',
        'Scenic 40-minute scenic train to Nara Deer Park'
      ],
      afternoon: [
        'Feed sweet bowed deer under pine trees',
        'Visit giant bronze Daibutsu Buddha at Todai-ji temple',
        'Sweet pause: freshly pounded green mugwort mochi at Nakatanidou'
      ],
      evening: [
        'Return to Kyoto for dinner: Wagyu beef hotpot with local mushrooms',
        'Scrapbook journal writing session at café'
      ]
    },
    {
      day: 4,
      city: 'Osaka (Dotonbori & Castle)',
      hotel: 'Cross Hotel Dotonbori',
      notes: 'Osaka is known as the "Nation\'s Kitchen" (Kuidaore) - eat till you drop!',
      morning: [
        'Morning express train transfer to lively Osaka',
        'Tour the towering stone ramparts & moat of Osaka Castle'
      ],
      afternoon: [
        'Explore vintage boutiques and vinyl shops in Amerikamura',
        'Street food safari: piping hot Takoyaki (octopus balls) with bonito flakes'
      ],
      evening: [
        'Neon lights selfie with the iconic Glico Running Man sign',
        'Okonomiyaki savory pancake dinner at a counter teppanyaki grill',
        'Dotonbori canal evening river cruise'
      ]
    },
    {
      day: 5,
      city: 'Osaka & Kansai Departure',
      hotel: 'Cross Hotel Dotonbori',
      notes: 'Keep tax-free receipts handy in your passport for quick customs verification.',
      morning: [
        'Morning breakfast at Kuromon Ichiba Market (fresh strawberries & sea urchin)',
        'Last-minute souvenir shopping for matcha treats & Japanese stationery'
      ],
      afternoon: [
        'Board Nankai Rapi:t retro-futuristic train to Kansai Airport',
        'Stamp final passport pages and departure boarding'
      ],
      evening: [
        'Homeward flight with hearts and cameras full of memories ✈️'
      ]
    }
  ]
};

// --- Mock Trips Library for "My Trips" ---
let mySavedTrips = [
  {
    id: 'trip-1',
    destination: 'Kyoto & Osaka, Japan',
    dates: 'Oct 10 – Oct 16, 2026',
    duration: '7 Days',
    budget: '₹85,000',
    type: 'Couple / Pair',
    hotel: 'Gion Komachi Boutique Machiya',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    active: true
  },
  {
    id: 'trip-2',
    destination: 'Santorini & Milos, Greece',
    dates: 'May 14 – May 21, 2026',
    duration: '8 Days',
    budget: '€1,800',
    type: 'Solo 🎒',
    hotel: 'White Haven Cave House Oia',
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    active: false
  },
  {
    id: 'trip-3',
    destination: 'Bali & Nusa Penida, Indonesia',
    dates: 'Dec 02 – Dec 09, 2026',
    duration: '8 Days',
    budget: '$1,200',
    type: 'Friends ⛺',
    hotel: 'Ubud Bamboo Canopy Eco-Villa',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    active: false
  }
];

// --- Curated Destinations Mock Data ---
const destinationsData = [
  {
    name: 'Kyoto, Japan',
    tag: 'Cultural & Serene',
    desc: 'Ancient shrines enveloped in bamboo groves, quiet Zen rock gardens, and lantern-lit stone alleys.',
    bestTime: 'Mar – May & Oct – Nov',
    cost: '₹75,000 - ₹95,000',
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Amalfi Coast, Italy',
    tag: 'Romantic & Coastal',
    desc: 'Pastel cliffside villages tumbling into turquoise waters, fragrant lemon groves, and Vespa road trips.',
    bestTime: 'May – Sep',
    cost: '€1,900 - €2,400',
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Ubud & Canggu, Bali',
    tag: 'Nature & Wellness',
    desc: 'Emerald terraced rice paddies, serene yoga shalas, artisan markets, and bohemian seaside cafés.',
    bestTime: 'Apr – Oct',
    cost: '$1,000 - $1,400',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Jaipur & Udaipur, India',
    tag: 'Historic Royalty',
    desc: 'Majestic terracotta palaces, shimmering lake view forts, vibrant handloom textiles, and rooftop chai.',
    bestTime: 'Oct – Mar',
    cost: '₹35,000 - ₹50,000',
    img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Interlaken & Lauterbrunnen, Swiss',
    tag: 'Alpine Adventure',
    desc: '72 cascading valley waterfalls, cogwheel mountain trains, wildflower meadows, and cozy chalets.',
    bestTime: 'Jun – Sep & Dec – Mar',
    cost: '€2,200 - €2,800',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Santorini, Greece',
    tag: 'Island Romance',
    desc: 'Iconic whitewashed caldera architecture, breathtaking Aegean sunsets, and sailing cruises.',
    bestTime: 'Apr – Jun & Sep – Oct',
    cost: '€1,600 - €2,100',
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80'
  }
];

// --- Packing Checklist Mock Data ---
let packingData = {
  clothing: [
    { text: 'Lightweight linen shirts & tops (x4)', done: true },
    { text: 'Comfy walking sneakers (broken in)', done: true },
    { text: 'Cozy evening sweater or cardigan', done: false },
    { text: 'Breathable travel trousers / skirt', done: true },
    { text: 'Underwear & socks set (7 days)', done: false },
    { text: 'Rain poncho / compact windbreaker', done: false }
  ],
  toiletries: [
    { text: 'SPF 50 mineral sunscreen', done: true },
    { text: 'Hydrating lip balm & moisturizer', done: false },
    { text: 'Refillable travel shampoo & soap bars', done: true },
    { text: 'Small first-aid kit & blister plasters', done: false },
    { text: 'Toothbrush & bamboo paste tablets', done: true }
  ],
  electronics: [
    { text: 'Universal plug adapter (Type A/C)', done: true },
    { text: '10,000 mAh portable powerbank', done: false },
    { text: 'Polaroid or mirrorless camera + film', done: false },
    { text: 'Noise-canceling earphones & cables', done: true }
  ],
  documents: [
    { text: 'Passport (valid 6+ months)', done: true },
    { text: 'Physical paper copies of booking vouchers', done: true },
    { text: 'Travel health insurance card', done: false },
    { text: 'Multi-currency travel forex card & cash', done: true }
  ],
  miscellaneous: [
    { text: 'Washi tape & travel scrapbook journal', done: true },
    { text: 'Gel pens & mini glue stick', done: false },
    { text: 'Insulated stainless steel water bottle', done: true },
    { text: 'Canvas fold-away tote for flea markets', done: false }
  ]
};

// --- Budget Categories Data ---
let budgetBreakdown = [
  { name: 'Stay & Hotels', key: 'Stay', amount: 32000, colorClass: 'fill-mint' },
  { name: 'Flights & Transit', key: 'Transit', amount: 20000, colorClass: 'fill-pink' },
  { name: 'Food & Cafés', key: 'Food', amount: 14000, colorClass: 'fill-yellow' },
  { name: 'Activities & Tickets', key: 'Activities', amount: 8000, colorClass: 'fill-teal' },
  { name: 'Souvenirs & Extras', key: 'Shopping', amount: 6000, colorClass: 'fill-lavender' }
];

let selectedDayNumber = 1;

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', async () => {
  setupNavigation();
  initFormDefaults();

  // Initialize DB and load persisted data
  await initDatabaseData();

  renderItinerary();
  renderPackingList();
  renderBudget();
  renderMyTrips();
  renderDestinations();
});

async function initDatabaseData() {
  await DB.init();

  const storedTrips = await DB.getAllTrips();
  if (storedTrips && storedTrips.length > 0) {
    mySavedTrips = storedTrips;
    const currentActive = mySavedTrips.find(t => t.active) || mySavedTrips[0];
    currentActive.active = true;
    
    // Load full active trip details with backend SQLite mappings
    activeTrip.id = currentActive.id;
    activeTrip.destination = currentActive.destination;
    activeTrip.departure = currentActive.departure || '2026-10-10';
    activeTrip.returnDate = currentActive.return_date || currentActive.returnDate || '2026-10-16';
    activeTrip.duration = currentActive.duration_num || currentActive.durationNum || 7;
    activeTrip.budget = currentActive.budget_num || currentActive.budgetNum || 85000;
    activeTrip.currency = currentActive.currency || '₹';
    activeTrip.travellerType = currentActive.traveller_type || currentActive.travellerType || currentActive.type || 'Couple / Pair';
    activeTrip.travellers = currentActive.travellers || 2;
    activeTrip.styles = currentActive.styles || ['Cultural & Historic'];
    activeTrip.hotel = currentActive.hotel || 'Cozy Boutique Stay';
    activeTrip.city = currentActive.city || currentActive.destination.split(',')[0];
    activeTrip.pace = currentActive.pace || 'Balanced';
    activeTrip.img = currentActive.img || activeTrip.img;

    currentCurrency = activeTrip.currency;

    // Load Itinerary from DB
    const storedItinerary = await DB.getItinerary(activeTrip.id);
    if (storedItinerary && storedItinerary.length > 0) {
      activeTrip.itinerary = storedItinerary.map(it => ({
        day: it.day,
        city: it.city,
        hotel: it.hotel,
        notes: it.notes,
        morning: it.activities?.morning || [],
        afternoon: it.activities?.afternoon || [],
        evening: it.activities?.evening || []
      })).sort((a, b) => a.day - b.day);
    }

    // Load Packing from DB
    const storedPacking = await DB.getPacking(activeTrip.id);
    if (storedPacking) {
      packingData = storedPacking;
    }

    // Load Budget from DB
    const storedBudget = await DB.getBudget(activeTrip.id);
    if (storedBudget) {
      budgetBreakdown = storedBudget.categories || storedBudget.breakdown || budgetBreakdown;
      currentCurrency = storedBudget.currency || currentCurrency;
    }
  } else {
    // Seed initial trip data into DB
    const initialTripRecord = {
      id: activeTrip.id,
      destination: activeTrip.destination,
      departure: activeTrip.departure,
      return_date: activeTrip.returnDate,
      dates: `${activeTrip.departure} to ${activeTrip.returnDate}`,
      duration: `${activeTrip.duration} Days`,
      duration_num: activeTrip.duration,
      budget: `${activeTrip.currency}${activeTrip.budget.toLocaleString()}`,
      budget_num: activeTrip.budget,
      currency: activeTrip.currency,
      traveller_type: `${activeTrip.travellerType} (${activeTrip.travellers})`,
      travellers: activeTrip.travellers,
      styles: activeTrip.styles,
      hotel: activeTrip.hotel,
      city: activeTrip.city,
      pace: activeTrip.pace,
      img: activeTrip.img,
      active: true
    };

    await DB.saveTrip(initialTripRecord);
    await DB.saveItinerary(activeTrip.id, activeTrip.itinerary);
    await DB.savePacking(activeTrip.id, packingData);
    await DB.saveBudget(activeTrip.id, { categories: budgetBreakdown, currency: currentCurrency });
  }
}

// ================= NAVIGATION =================
function setupNavigation() {
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.scrap-header') && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }
  });
}

function navigateTo(sectionId) {
  // Update nav buttons
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    if (btn.getAttribute('data-tab') === sectionId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Hide all sections, show target
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));

  const target = document.getElementById(`sec-${sectionId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Close mobile menu if open
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.remove('open');
}

// ================= TOAST NOTIFICATION =================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ================= PLAN TRIP FORM =================
function initFormDefaults() {
  const today = new Date();
  const dep = new Date();
  dep.setDate(today.getDate() + 14);
  const ret = new Date();
  ret.setDate(today.getDate() + 21);

  const depInput = document.getElementById('depDate');
  const retInput = document.getElementById('retDate');

  if (depInput && retInput) {
    depInput.value = dep.toISOString().split('T')[0];
    retInput.value = ret.toISOString().split('T')[0];
    calculateDuration();
  }
}

function stepCount(delta) {
  const input = document.getElementById('travellerCount');
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, Math.min(25, val + delta));
  input.value = val;
}

function calculateDuration() {
  const depVal = document.getElementById('depDate').value;
  const retVal = document.getElementById('retDate').value;
  const badge = document.getElementById('durationDays');

  if (depVal && retVal) {
    const d1 = new Date(depVal);
    const d2 = new Date(retVal);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      badge.textContent = `${diffDays} Days / ${diffDays - 1} Nights`;
    } else {
      badge.textContent = 'Return must be after departure';
    }
  }
}

let editingTripId = null;

async function handleTripPlan(e) {
  e.preventDefault();

  const dest = document.getElementById('destination').value.trim();
  const dep = document.getElementById('depDate').value;
  const ret = document.getElementById('retDate').value;
  const currency = document.getElementById('budgetCurrency').value;
  const budget = parseFloat(document.getElementById('budgetAmount').value) || 50000;
  
  const typeRadio = document.querySelector('input[name="travellerType"]:checked');
  const travellerType = typeRadio ? typeRadio.value : 'Solo';
  const travellerCount = parseInt(document.getElementById('travellerCount').value, 10) || 1;

  const styleEls = document.querySelectorAll('input[name="travelStyle"]:checked');
  const styles = Array.from(styleEls).map(el => el.value);

  const hotel = document.getElementById('accommodation').value;
  const paceRadio = document.querySelector('input[name="tripPace"]:checked');
  const pace = paceRadio ? paceRadio.value : 'Balanced';

  // Calculate days
  const d1 = new Date(dep);
  const d2 = new Date(ret);
  const daysCount = Math.max(2, Math.min(10, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)))) || 5;
  const city = dest.split(',')[0] || dest;

  if (editingTripId) {
    const tripId = editingTripId;
    editingTripId = null;
    const submitBtn = document.querySelector('#tripPlanForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = '✨ Tape into Journal & Build Itinerary';

    activeTrip.destination = dest;
    activeTrip.departure = dep;
    activeTrip.returnDate = ret;
    activeTrip.duration = daysCount;
    activeTrip.budget = budget;
    activeTrip.currency = currency;
    activeTrip.travellerType = travellerType;
    activeTrip.travellers = travellerCount;
    activeTrip.styles = styles.length ? styles : ['Cultural & Historic'];
    activeTrip.hotel = hotel;
    activeTrip.city = city;
    activeTrip.pace = pace;

    const existingTrip = mySavedTrips.find(t => t.id === tripId);
    if (existingTrip) {
      existingTrip.destination = dest;
      existingTrip.departure = dep;
      existingTrip.return_date = ret;
      existingTrip.dates = `${dep} to ${ret}`;
      existingTrip.duration = `${daysCount} Days`;
      existingTrip.duration_num = daysCount;
      existingTrip.budget = `${currency}${budget.toLocaleString()}`;
      existingTrip.budget_num = budget;
      existingTrip.currency = currency;
      existingTrip.traveller_type = `${travellerType} (${travellerCount})`;
      existingTrip.hotel = hotel;
    }

    await DB.updateTrip(tripId, {
      destination: dest,
      departure: dep,
      return_date: ret,
      dates: `${dep} to ${ret}`,
      duration: `${daysCount} Days`,
      duration_num: daysCount,
      budget: `${currency}${budget.toLocaleString()}`,
      budget_num: budget,
      currency: currency,
      traveller_type: `${travellerType} (${travellerCount})`,
      travellers: travellerCount,
      styles: styles,
      hotel: hotel,
      city: city,
      pace: pace
    });

    renderItinerary();
    renderBudget();
    renderMyTrips();
    showToast(`✏️ Updated journey: ${dest}!`);
    navigateTo('itinerary');
    return;
  }

  // Generate dynamic mock itinerary days
  const generatedItinerary = [];

  for (let i = 1; i <= daysCount; i++) {
    generatedItinerary.push({
      day: i,
      city: `${city} Highlights`,
      hotel: hotel,
      notes: `Pace set to ${pace}. Remember your camera and comfortable shoes for exploring ${city}!`,
      morning: [
        `Morning breakfast at cozy local café near ${hotel}`,
        `Visit historic landmark and scenic lookout points around ${city}`,
        `Take scrapbook photos & sample morning local specialties`
      ],
      afternoon: [
        `Explore cultural museums, artisan boutiques, and hidden alleys`,
        `Leisurely lunch tasting signature dishes of the region`,
        `Afternoon stroll through botanical gardens or old town squares`
      ],
      evening: [
        `Sunset views over the city skyline or coastline`,
        `Dinner at a handpicked cozy restaurant (${styles[0] || 'Local'} style)`,
        `Evening walk and journal sketching in your TravelMate diary`
      ]
    });
  }

  // Update activeTrip
  activeTrip = {
    id: 'trip-' + Date.now(),
    destination: dest,
    departure: dep,
    returnDate: ret,
    duration: daysCount,
    budget: budget,
    currency: currency,
    travellerType: travellerType,
    travellers: travellerCount,
    styles: styles.length ? styles : ['Cultural & Historic'],
    hotel: hotel,
    city: city,
    pace: pace,
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    itinerary: generatedItinerary
  };

  // Save new trip & update all saved trips in DB
  const newTripRecord = {
    id: activeTrip.id,
    destination: dest,
    departure: dep,
    return_date: ret,
    dates: `${dep} to ${ret}`,
    duration: `${daysCount} Days`,
    duration_num: daysCount,
    budget: `${currency}${budget.toLocaleString()}`,
    budget_num: budget,
    currency: currency,
    traveller_type: `${travellerType} (${travellerCount})`,
    travellers: travellerCount,
    styles: styles.length ? styles : ['Cultural & Historic'],
    hotel: hotel,
    city: city,
    pace: pace,
    img: activeTrip.img,
    active: true
  };

  mySavedTrips.forEach(t => t.active = false);
  mySavedTrips.unshift(newTripRecord);

  // Update budget amounts
  budgetBreakdown = [
    { name: 'Stay & Hotels', key: 'Stay', amount: Math.round(budget * 0.40), colorClass: 'fill-mint' },
    { name: 'Flights & Transit', key: 'Transit', amount: Math.round(budget * 0.25), colorClass: 'fill-pink' },
    { name: 'Food & Cafés', key: 'Food', amount: Math.round(budget * 0.18), colorClass: 'fill-yellow' },
    { name: 'Activities & Tickets', key: 'Activities', amount: Math.round(budget * 0.10), colorClass: 'fill-teal' },
    { name: 'Souvenirs & Extras', key: 'Shopping', amount: Math.round(budget * 0.07), colorClass: 'fill-lavender' }
  ];
  currentCurrency = currency;
  const currSelect = document.getElementById('budgetViewCurrency');
  if (currSelect) currSelect.value = currency;

  // Persist to DB
  for (const t of mySavedTrips) {
    await DB.saveTrip(t);
  }
  await DB.saveItinerary(activeTrip.id, activeTrip.itinerary);
  await DB.savePacking(activeTrip.id, packingData);
  await DB.saveBudget(activeTrip.id, { categories: budgetBreakdown, currency: currentCurrency });

  // Re-render
  selectedDayNumber = 1;
  renderItinerary();
  renderBudget();
  renderMyTrips();

  showToast(`🎉 New trip to ${dest} created & taped into your journal!`);
}

// ================= ITINERARY RENDERING =================
function renderItinerary() {
  document.getElementById('itineraryDestTitle').textContent = activeTrip.destination;
  document.getElementById('itineraryMetaSub').textContent = 
    `${activeTrip.duration} Days • ${activeTrip.travellerType} (${activeTrip.travellers}) • ${activeTrip.pace} Pace • ${activeTrip.styles.join(', ')}`;
  document.getElementById('itineraryHotelName').textContent = activeTrip.hotel;

  // Render Day Tabs
  const tabsContainer = document.getElementById('dayTabsContainer');
  tabsContainer.innerHTML = '';

  activeTrip.itinerary.forEach((dayData, idx) => {
    const btn = document.createElement('button');
    btn.className = `day-tab ${dayData.day === selectedDayNumber ? 'active' : ''}`;
    btn.textContent = `Day ${dayData.day}`;
    btn.onclick = () => selectDay(dayData.day);
    tabsContainer.appendChild(btn);
  });

  renderDayContent();
}

function selectDay(dayNum) {
  selectedDayNumber = dayNum;
  const tabs = document.querySelectorAll('.day-tab');
  tabs.forEach((t, i) => {
    if (i + 1 === dayNum) t.classList.add('active');
    else t.classList.remove('active');
  });
  renderDayContent();
}

function renderDayContent() {
  const container = document.getElementById('dayContentCard');
  const day = activeTrip.itinerary.find(d => d.day === selectedDayNumber) || activeTrip.itinerary[0];

  if (!day) return;

  container.innerHTML = `
    <div class="day-top-info">
      <div>
        <h3>Day ${day.day}: ${day.city}</h3>
        <p style="color: #63554b; font-size: 0.95rem;">Stay: <strong>${day.hotel}</strong></p>
      </div>
      <span class="day-city-badge">📍 ${day.city}</span>
    </div>

    <div class="schedule-timeline">
      <!-- Morning -->
      <div class="period-slot">
        <div class="period-header">
          <span class="period-tag morning-tag">☕ Morning</span>
        </div>
        <ul class="period-activities">
          ${day.morning.map((act, i) => `
            <li class="activity-item" id="act-m-${i}">
              <input type="checkbox" onchange="toggleActivity(this)" />
              <span>${act}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Afternoon -->
      <div class="period-slot">
        <div class="period-header">
          <span class="period-tag afternoon-tag">☀️ Afternoon</span>
        </div>
        <ul class="period-activities">
          ${day.afternoon.map((act, i) => `
            <li class="activity-item" id="act-a-${i}">
              <input type="checkbox" onchange="toggleActivity(this)" />
              <span>${act}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Evening -->
      <div class="period-slot">
        <div class="period-header">
          <span class="period-tag evening-tag">🌙 Evening</span>
        </div>
        <ul class="period-activities">
          ${day.evening.map((act, i) => `
            <li class="activity-item" id="act-e-${i}">
              <input type="checkbox" onchange="toggleActivity(this)" />
              <span>${act}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>

    <div class="day-scrap-notes">
      <strong>✎ Scrapbooker's Note:</strong>
      <p>${day.notes}</p>
    </div>
  `;
}

function toggleActivity(checkbox) {
  const parent = checkbox.closest('.activity-item');
  if (checkbox.checked) {
    parent.classList.add('checked');
    showToast('✨ Stamped item as completed!');
  } else {
    parent.classList.remove('checked');
  }
}

// ================= PACKING LIST LOGIC =================
function renderPackingList() {
  const container = document.getElementById('packingGridContainer');
  container.innerHTML = '';

  let totalItems = 0;
  let packedItems = 0;

  const categoryTitles = {
    clothing: { title: '👕 Clothing & Attire', key: 'clothing' },
    toiletries: { title: '🧴 Toiletries & Care', key: 'toiletries' },
    electronics: { title: '🔌 Tech & Gadgets', key: 'electronics' },
    documents: { title: '📑 Passports & Tickets', key: 'documents' },
    miscellaneous: { title: '🌸 Extras & Scrapbook', key: 'miscellaneous' }
  };

  Object.keys(categoryTitles).forEach(catKey => {
    const items = packingData[catKey] || [];
    const catCard = document.createElement('div');
    catCard.className = 'pack-category-card';

    const header = document.createElement('div');
    header.className = 'pack-cat-header';
    header.innerHTML = `<span>${categoryTitles[catKey].title}</span> <small style="font-size: 1.1rem; color: #7f746d;">${items.length}</small>`;
    catCard.appendChild(header);

    const list = document.createElement('ul');
    list.className = 'pack-list';

    items.forEach((item, index) => {
      totalItems++;
      if (item.done) packedItems++;

      const li = document.createElement('li');
      li.className = `pack-item ${item.done ? 'checked' : ''}`;
      li.innerHTML = `
        <label>
          <input type="checkbox" ${item.done ? 'checked' : ''} onchange="togglePackItem('${catKey}', ${index})" />
          <span>${item.text}</span>
        </label>
        <button class="del-item-btn" title="Remove item" onclick="deletePackItem('${catKey}', ${index})">✕</button>
      `;
      list.appendChild(li);
    });

    catCard.appendChild(list);
    container.appendChild(catCard);
  });

  // Update progress
  document.getElementById('packProgressText').textContent = `${packedItems} / ${totalItems} Packed`;
  const pct = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;
  document.getElementById('packProgressBar').style.width = `${pct}%`;
}

async function togglePackItem(catKey, index) {
  packingData[catKey][index].done = !packingData[catKey][index].done;
  renderPackingList();
  await DB.savePacking(activeTrip.id, packingData);
}

async function deletePackItem(catKey, index) {
  packingData[catKey].splice(index, 1);
  renderPackingList();
  await DB.savePacking(activeTrip.id, packingData);
  showToast('🗑️ Item removed from packing list');
}

async function addPackingItem() {
  const input = document.getElementById('customPackInput');
  const catSelect = document.getElementById('customPackCategory');
  const text = input.value.trim();

  if (!text) {
    showToast('⚠️ Please type an item description!');
    return;
  }

  const cat = catSelect.value;
  if (!packingData[cat]) packingData[cat] = [];

  packingData[cat].push({ text, done: false });
  input.value = '';
  renderPackingList();
  await DB.savePacking(activeTrip.id, packingData);
  showToast(`🎒 Added "${text}" to checklist!`);
}

// ================= BUDGET LOGIC =================
function renderBudget() {
  let totalAllocated = budgetBreakdown.reduce((sum, item) => sum + item.amount, 0);
  let totalCap = activeTrip.budget || 85000;
  let remaining = totalCap - totalAllocated;
  let dailyAvg = Math.round(totalAllocated / (activeTrip.duration || 7) / (activeTrip.travellers || 1));

  // Currency formats
  document.getElementById('statTotalBudget').textContent = `${currentCurrency}${totalCap.toLocaleString()}`;
  document.getElementById('statAllocatedBudget').textContent = `${currentCurrency}${totalAllocated.toLocaleString()}`;
  document.getElementById('statRemainingBudget').textContent = 
    remaining >= 0 ? `${currentCurrency}${remaining.toLocaleString()} Safe Buffer` : `⚠️ Over budget by ${currentCurrency}${Math.abs(remaining).toLocaleString()}`;
  document.getElementById('statDailyAvg').textContent = `${currentCurrency}${dailyAvg.toLocaleString()}`;

  // Render bars
  const container = document.getElementById('categoryBars');
  container.innerHTML = '';

  budgetBreakdown.forEach(cat => {
    const pct = totalCap > 0 ? Math.min(100, Math.round((cat.amount / totalCap) * 100)) : 0;
    const itemEl = document.createElement('div');
    itemEl.className = 'cat-bar-item';
    itemEl.innerHTML = `
      <div class="cat-bar-info">
        <span>${cat.name}</span>
        <span>${currentCurrency}${cat.amount.toLocaleString()} (${pct}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill ${cat.colorClass}" style="width: ${pct}%;"></div>
      </div>
    `;
    container.appendChild(itemEl);
  });
}

async function changeBudgetCurrency(newCurr) {
  currentCurrency = newCurr;
  renderBudget();
  await DB.saveBudget(activeTrip.id, { breakdown: budgetBreakdown, currency: currentCurrency });
  showToast(`Currency updated to ${newCurr}`);
}

async function addCustomExpense() {
  const desc = document.getElementById('expenseName').value.trim();
  const catKey = document.getElementById('expenseCategory').value;
  const cost = parseFloat(document.getElementById('expenseAmount').value);

  if (!desc || isNaN(cost) || cost <= 0) {
    showToast('⚠️ Please enter a valid expense description & cost');
    return;
  }

  const found = budgetBreakdown.find(b => b.key === catKey);
  if (found) {
    found.amount += cost;
  } else {
    budgetBreakdown.push({
      name: catKey,
      key: catKey,
      amount: cost,
      colorClass: 'fill-mint'
    });
  }

  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';
  renderBudget();
  await DB.saveBudget(activeTrip.id, { breakdown: budgetBreakdown, currency: currentCurrency });
  showToast(`🪙 Added ${currentCurrency}${cost} to ${catKey}!`);
}

// ================= MY TRIPS RENDERING =================
function renderMyTrips() {
  const container = document.getElementById('myTripsGrid');
  container.innerHTML = '';

  mySavedTrips.forEach(trip => {
    const card = document.createElement('div');
    card.className = 'trip-polaroid-card';
    const dispDates = trip.dates || (trip.departure ? `${trip.departure} to ${trip.return_date || trip.returnDate}` : 'Flexible Dates');
    const dispDuration = trip.duration || `${trip.duration_num || 5} Days`;
    const dispBudget = trip.budget || `${trip.currency || '₹'}${trip.budget_num || 0}`;
    const dispType = trip.traveller_type || trip.travellerType || trip.type || 'Traveler';
    const dispHotel = trip.hotel ? trip.hotel.split(' ')[0] : 'Stay';

    card.innerHTML = `
      <div class="trip-tape"></div>
      <div class="trip-card-img-wrap">
        <img src="${trip.img || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80'}" alt="${trip.destination}" />
        <span class="trip-status-tag">${trip.active ? '🌟 Active Journal' : 'Saved Plan'}</span>
      </div>
      <div class="trip-card-details">
        <h3>${trip.destination}</h3>
        <p style="font-size: 0.9rem; color: #6a5d55;">${dispDates} • ${dispDuration}</p>
        <div class="trip-meta-chips">
          <span class="t-chip">🪙 ${dispBudget}</span>
          <span class="t-chip">👥 ${dispType}</span>
          <span class="t-chip">🏡 ${dispHotel}</span>
        </div>
        <div class="trip-card-actions">
          <button class="btn btn-mint" onclick="switchActiveTrip('${trip.id}')">
            ${trip.active ? '📖 View' : '⚡ Select'}
          </button>
          <button class="btn btn-yellow" onclick="editTrip('${trip.id}')" title="Edit trip">
            ✏️
          </button>
          <button class="btn btn-pink" onclick="deleteTrip('${trip.id}')" title="Delete trip">
            🗑️
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

async function editTrip(tripId) {
  const trip = await DB.getTrip(tripId) || mySavedTrips.find(t => t.id === tripId);
  if (!trip) return;

  editingTripId = tripId;
  navigateTo('plan');

  document.getElementById('destination').value = trip.destination || '';
  if (trip.departure) document.getElementById('depDate').value = trip.departure;
  if (trip.return_date || trip.returnDate) document.getElementById('retDate').value = trip.return_date || trip.returnDate;
  calculateDuration();

  if (trip.currency) document.getElementById('budgetCurrency').value = trip.currency;
  if (trip.budget_num || trip.budgetNum) document.getElementById('budgetAmount').value = trip.budget_num || trip.budgetNum;

  const travType = trip.traveller_type || trip.travellerType || trip.type;
  if (travType) {
    const cleanType = travType.split(' ')[0];
    const radio = document.querySelector(`input[name="travellerType"][value^="${cleanType}"]`);
    if (radio) radio.checked = true;
  }
  if (trip.travellers) document.getElementById('travellerCount').value = trip.travellers;
  if (trip.hotel) document.getElementById('accommodation').value = trip.hotel;

  const submitBtn = document.querySelector('#tripPlanForm button[type="submit"]');
  if (submitBtn) submitBtn.textContent = '✨ Update Trip & Save Changes';
  showToast(`✏️ Editing ${trip.destination}. Update fields and save!`);
}

async function switchActiveTrip(tripId) {
  mySavedTrips.forEach(t => t.active = (t.id === tripId));
  for (const t of mySavedTrips) {
    await DB.saveTrip(t);
  }

  const selected = mySavedTrips.find(t => t.id === tripId);
  if (selected) {
    activeTrip.id = selected.id;
    activeTrip.destination = selected.destination;
    activeTrip.hotel = selected.hotel;
    if (selected.duration_num || selected.durationNum) activeTrip.duration = selected.duration_num || selected.durationNum;
    if (selected.budget_num || selected.budgetNum) activeTrip.budget = selected.budget_num || selected.budgetNum;
    if (selected.currency) currentCurrency = selected.currency;

    // Load Itinerary
    const storedItinerary = await DB.getItinerary(selected.id);
    if (storedItinerary && storedItinerary.length > 0) {
      activeTrip.itinerary = storedItinerary.map(it => ({
        day: it.day,
        city: it.city,
        hotel: it.hotel,
        notes: it.notes,
        morning: it.activities?.morning || [],
        afternoon: it.activities?.afternoon || [],
        evening: it.activities?.evening || []
      })).sort((a, b) => a.day - b.day);
    }

    // Load Packing
    const storedPacking = await DB.getPacking(selected.id);
    if (storedPacking) packingData = storedPacking;

    // Load Budget
    const storedBudget = await DB.getBudget(selected.id);
    if (storedBudget) {
      budgetBreakdown = storedBudget.categories || storedBudget.breakdown || budgetBreakdown;
      currentCurrency = storedBudget.currency || currentCurrency;
    }

    selectedDayNumber = 1;
    renderItinerary();
    renderPackingList();
    renderBudget();
    renderMyTrips();
    showToast(`📔 Opened scrapbook for ${selected.destination}!`);
    navigateTo('itinerary');
}

async function deleteTrip(tripId) {
  if (mySavedTrips.length <= 1) {
    showToast('Keep at least one trip in your scrapbook journal!');
    return;
  }
  mySavedTrips = mySavedTrips.filter(t => t.id !== tripId);
  await DB.deleteTrip(tripId);

  if (activeTrip.id === tripId && mySavedTrips.length > 0) {
    await switchActiveTrip(mySavedTrips[0].id);
  } else {
    renderMyTrips();
  }
  showToast('🗑️ Journey removed from scrapbook.');
}

// ================= DESTINATIONS RENDERING =================
function renderDestinations() {
  const container = document.getElementById('destGrid');
  container.innerHTML = '';

  destinationsData.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'dest-card';
    card.innerHTML = `
      <div class="dest-img-box">
        <span class="dest-vibe-tag">✦ ${dest.tag}</span>
        <img src="${dest.img}" alt="${dest.name}" />
      </div>
      <h3>${dest.name}</h3>
      <p class="dest-highlight">${dest.desc}</p>
      <div class="dest-info-row">
        <span>🗓️ ${dest.bestTime}</span>
        <span>🪙 ${dest.cost}</span>
      </div>
      <button class="btn btn-yellow" onclick="quickPlan('${dest.name}')">✍️ Plan This Journey</button>
    `;
    container.appendChild(card);
  });
}

function quickPlan(destName) {
  navigateTo('plan');
  const input = document.getElementById('destination');
  if (input) {
    input.value = destName;
    input.focus();
  }
  showToast(`📍 Prefilled destination: ${destName}!`);
}

// ================= NEWSLETTER & FOOTER =================
function handleNewsletter(e) {
  e.preventDefault();
  e.target.reset();
  showToast('💌 Welcome to the Postcard Club! Check your letters soon.');
}
