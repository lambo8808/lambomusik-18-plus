class ApiClient {
    constructor() {
        this.baseUrl = '/api';
        // ⚡ Bolt: Use a bounded Map for LRU caching to prevent memory leaks
        // over long sessions while keeping frequently accessed users fast.
        this.userCache = new Map();
        this.maxCacheSize = 100;
    }


    fetchUser(id) {
        if (typeof id !== 'string' && typeof id !== 'number') {
            return Promise.reject(new TypeError('User ID must be a string or number'));
        }

        const idStr = String(id);
        if (!/^[a-zA-Z0-9_-]+$/.test(idStr)) {
            return Promise.reject(new Error('Invalid User ID format'));
        }

        if (this.userCache.has(idStr)) {
            // ⚡ Bolt: Move accessed item to the end (most recently used)
            const cachedPromise = this.userCache.get(idStr);
            this.userCache.delete(idStr);
            this.userCache.set(idStr, cachedPromise);
            return cachedPromise;
        }

        const userPromise = (async () => {
            try {
                const response = await fetch(`/api/users/${encodeURIComponent(idStr)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                this.userCache.delete(idStr);
                console.error('Error fetching user:', error);
                throw error;
            }
        })();

        this.userCache.set(idStr, userPromise);

        // ⚡ Bolt: Enforce cache limit by removing oldest (first) item
        if (this.userCache.size > this.maxCacheSize) {
            const oldestKey = this.userCache.keys().next().value;
            this.userCache.delete(oldestKey);
        }

        return userPromise;
    }

}

export default ApiClient;
