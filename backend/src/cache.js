// backend/src/cache.js

const TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_CACHE_SIZE = 100;

class SimpleCache {
  constructor() {
    this.store = new Map(); // key -> { value, timestamp }
  }

  _isExpired(entry) {
    return Date.now() - entry.timestamp > TTL_MS;
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (this._isExpired(entry)) {
      this.store.delete(key);
      return null;
    }

    // LRU-style: recent use -> move to end
    this.store.delete(key);
    this.store.set(key, entry);

    return entry.value;
  }

  set(key, value) {
    if (this.store.size >= MAX_CACHE_SIZE) {
      // remove least recently used (first key)
      const firstKey = this.store.keys().next().value;
      if (firstKey !== undefined) {
        this.store.delete(firstKey);
      }
    }

    this.store.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  clear() {
    this.store.clear();
  }
}

export const cache = new SimpleCache();
