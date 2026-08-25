// Cache the regular expression to avoid repeated instantiation/compilation
const VALID_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

class ApiClient {
    constructor() {
        this.baseUrl = '/api';
        this.userCache = new Map();
    }

    method1() {}
    method2() {}
    method3() {}
    method4() {}
    method5() {}
    method6() {}
    method7() {}
    method8() {}
    method9() {}
    method10() {}
    method11() {}
    method12() {}
    method13() {}
    method14() {}
    method15() {}
    method16() {}
    method17() {}
    method18() {}
    method19() {}
    method20() {}
    method21() {}
    method22() {}
    method23() {}
    method24() {}
    method25() {}
    method26() {}
    method27() {}
    method28() {}
    method29() {}
    method30() {}

    fetchUser(id) {
        if (typeof id !== 'string' && typeof id !== 'number') {
            return Promise.reject(new TypeError('User ID must be a string or number'));
        }

        const idStr = String(id);
        if (!VALID_ID_REGEX.test(idStr)) {
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

    method31() {}
    method32() {}
}

export default ApiClient;
