/* ==========================================================================
   TRAVELMATE - MINIMAL PERSISTENT DATABASE (IndexedDB with LocalStorage fallback)
   Stores only: Trips, Itinerary, Packing, Budget
   ========================================================================== */

const DB = {
  dbName: 'TravelMateDB',
  version: 1,
  db: null,

  async init() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, falling back to LocalStorage.');
        resolve(null);
        return;
      }

      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        // 1. Trips table
        if (!db.objectStoreNames.contains('trips')) {
          db.createObjectStore('trips', { keyPath: 'id' });
        }

        // 2. Itinerary table (stores tripId, day, city, hotel, activities)
        if (!db.objectStoreNames.contains('itinerary')) {
          const itStore = db.createObjectStore('itinerary', { keyPath: 'id' });
          itStore.createIndex('tripId', 'tripId', { unique: false });
        }

        // 3. Packing table (stores tripId, items)
        if (!db.objectStoreNames.contains('packing')) {
          db.createObjectStore('packing', { keyPath: 'tripId' });
        }

        // 4. Budget table (stores tripId, categories, amounts)
        if (!db.objectStoreNames.contains('budget')) {
          db.createObjectStore('budget', { keyPath: 'tripId' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  },

  // --- TRIPS ---
  async getAllTrips() {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('trips', 'readonly');
        const req = tx.objectStore('trips').getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    }
    const data = localStorage.getItem('tm_trips');
    return data ? JSON.parse(data) : [];
  },

  async saveTrip(trip) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('trips', 'readwrite');
        tx.objectStore('trips').put(trip);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    }
    const trips = await this.getAllTrips();
    const idx = trips.findIndex(t => t.id === trip.id);
    if (idx >= 0) trips[idx] = trip;
    else trips.push(trip);
    localStorage.setItem('tm_trips', JSON.stringify(trips));
  },

  async deleteTrip(tripId) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction(['trips', 'itinerary', 'packing', 'budget'], 'readwrite');
        tx.objectStore('trips').delete(tripId);
        tx.objectStore('packing').delete(tripId);
        tx.objectStore('budget').delete(tripId);
        
        const itStore = tx.objectStore('itinerary');
        const index = itStore.index('tripId');
        const req = index.getAllKeys(tripId);
        req.onsuccess = () => {
          (req.result || []).forEach(k => itStore.delete(k));
        };
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    }
    let trips = await this.getAllTrips();
    trips = trips.filter(t => t.id !== tripId);
    localStorage.setItem('tm_trips', JSON.stringify(trips));
  },

  // --- ITINERARY ---
  async getItinerary(tripId) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('itinerary', 'readonly');
        const index = tx.objectStore('itinerary').index('tripId');
        const req = index.getAll(tripId);
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    }
    const data = localStorage.getItem(`tm_itinerary_${tripId}`);
    return data ? JSON.parse(data) : [];
  },

  async saveItinerary(tripId, days) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('itinerary', 'readwrite');
        const store = tx.objectStore('itinerary');
        days.forEach(d => {
          store.put({
            id: `${tripId}-day-${d.day}`,
            tripId: tripId,
            day: d.day,
            city: d.city,
            hotel: d.hotel,
            notes: d.notes,
            activities: {
              morning: d.morning,
              afternoon: d.afternoon,
              evening: d.evening
            }
          });
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    }
    localStorage.setItem(`tm_itinerary_${tripId}`, JSON.stringify(days));
  },

  // --- PACKING ---
  async getPacking(tripId) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('packing', 'readonly');
        const req = tx.objectStore('packing').get(tripId);
        req.onsuccess = () => resolve(req.result ? req.result.items : null);
        req.onerror = () => resolve(null);
      });
    }
    const data = localStorage.getItem(`tm_packing_${tripId}`);
    return data ? JSON.parse(data) : null;
  },

  async savePacking(tripId, items) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('packing', 'readwrite');
        tx.objectStore('packing').put({ tripId: tripId, items: items });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    }
    localStorage.setItem(`tm_packing_${tripId}`, JSON.stringify(items));
  },

  // --- BUDGET ---
  async getBudget(tripId) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('budget', 'readonly');
        const req = tx.objectStore('budget').get(tripId);
        req.onsuccess = () => resolve(req.result ? req.result.data : null);
        req.onerror = () => resolve(null);
      });
    }
    const data = localStorage.getItem(`tm_budget_${tripId}`);
    return data ? JSON.parse(data) : null;
  },

  async saveBudget(tripId, budgetData) {
    if (this.db) {
      return new Promise((resolve) => {
        const tx = this.db.transaction('budget', 'readwrite');
        tx.objectStore('budget').put({ tripId: tripId, data: budgetData });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      });
    }
    localStorage.setItem(`tm_budget_${tripId}`, JSON.stringify(budgetData));
  }
};
