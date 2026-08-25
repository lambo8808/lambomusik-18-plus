class ApiClient {
    constructor() {
        this.baseUrl = '/api';
        this.userCache = new Map();
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
            return this.userCache.get(idStr);
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
        return userPromise;
    }

}

export default ApiClient;
