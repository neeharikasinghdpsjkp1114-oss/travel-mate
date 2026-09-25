/* ==========================================================================
   TRAVELMATE - BACKEND API BRIDGE & PERSISTENCE
   Connects: Frontend -> Backend -> Database (SQLite) -> Backend -> Frontend
   ========================================================================== */

const API_BASE = '/api';

const DB = {
  isBackendAvailable: false,

  async init() {
    try {
      const res = await fetch(`${API_BASE}/trips`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        this.isBackendAvailable = true;
        console.log('Connected to TravelMate backend database.');
        return;
      }
    } catch (e) {
      console.warn('Backend server not responding, falling back to local storage.');
      this.isBackendAvailable = false;
    }
  },

  // --- TRIPS (Create, View, Edit, Delete) ---
  async getAllTrips() {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.error('API Error in getAllTrips:', e);
      }
    }
    const data = localStorage.getItem('tm_trips');
    return data ? JSON.parse(data) : [];
  },

  async getTrip(tripId) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.error('API Error in getTrip:', e);
      }
    }
    const trips = await this.getAllTrips();
    return trips.find(t => t.id === tripId) || null;
  },

  async saveTrip(trip) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trip)
        });
        return res.ok;
      } catch (e) {
        console.error('API Error in saveTrip:', e);
      }
    }
    const trips = await this.getAllTrips();
    const idx = trips.findIndex(t => t.id === trip.id);
    if (idx >= 0) trips[idx] = trip;
    else trips.unshift(trip);
    localStorage.setItem('tm_trips', JSON.stringify(trips));
    return true;
  },

  async updateTrip(tripId, updates) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        return res.ok;
      } catch (e) {
        console.error('API Error in updateTrip:', e);
      }
    }
    const trips = await this.getAllTrips();
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      Object.assign(trip, updates);
      localStorage.setItem('tm_trips', JSON.stringify(trips));
    }
    return true;
  },

  async deleteTrip(tripId) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}`, { method: 'DELETE' });
        return res.ok;
      } catch (e) {
        console.error('API Error in deleteTrip:', e);
      }
    }
    let trips = await this.getAllTrips();
    trips = trips.filter(t => t.id !== tripId);
    localStorage.setItem('tm_trips', JSON.stringify(trips));
    return true;
  },

  // --- ITINERARY (Load, Save) ---
  async getItinerary(tripId) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}/itinerary`);
        if (res.ok) {
          const rows = await res.json();
          if (rows && rows.length > 0) return rows;
        }
      } catch (e) {
        console.error('API Error in getItinerary:', e);
      }
    }
    const data = localStorage.getItem(`tm_itinerary_${tripId}`);
    return data ? JSON.parse(data) : [];
  },

  async saveItinerary(tripId, days) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}/itinerary`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(days)
        });
        return res.ok;
      } catch (e) {
        console.error('API Error in saveItinerary:', e);
      }
    }
    localStorage.setItem(`tm_itinerary_${tripId}`, JSON.stringify(days));
    return true;
  },

  // --- PACKING (Load, Save) ---
  async getPacking(tripId) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}/packing`);
        if (res.ok) {
          const items = await res.json();
          if (items) return items;
        }
      } catch (e) {
        console.error('API Error in getPacking:', e);
      }
    }
    const data = localStorage.getItem(`tm_packing_${tripId}`);
    return data ? JSON.parse(data) : null;
  },

  async savePacking(tripId, items) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}/packing`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(items)
        });
        return res.ok;
      } catch (e) {
        console.error('API Error in savePacking:', e);
      }
    }
    localStorage.setItem(`tm_packing_${tripId}`, JSON.stringify(items));
    return true;
  },

  // --- BUDGET (Load, Save) ---
  async getBudget(tripId) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}/budget`);
        if (res.ok) {
          const data = await res.json();
          if (data) return data;
        }
      } catch (e) {
        console.error('API Error in getBudget:', e);
      }
    }
    const data = localStorage.getItem(`tm_budget_${tripId}`);
    return data ? JSON.parse(data) : null;
  },

  async saveBudget(tripId, budgetData) {
    if (this.isBackendAvailable) {
      try {
        const res = await fetch(`${API_BASE}/trips/${tripId}/budget`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(budgetData)
        });
        return res.ok;
      } catch (e) {
        console.error('API Error in saveBudget:', e);
      }
    }
    localStorage.setItem(`tm_budget_${tripId}`, JSON.stringify(budgetData));
    return true;
  }
};
