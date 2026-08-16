import { someUtil } from './utils';

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
        if (this.userCache.has(id)) {
            return this.userCache.get(id);
        }

        const userPromise = (async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                this.userCache.delete(id);
                console.error('Error fetching user:', error);
                throw error;
            }
        })();

        this.userCache.set(id, userPromise);
        return userPromise;
    }

    method31() {}
    method32() {}
}

export default ApiClient;
