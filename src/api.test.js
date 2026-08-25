import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ApiClient from './api.js';

describe('ApiClient', () => {
    let client;
    let originalFetch;

    beforeEach(() => {
        client = new ApiClient();
        originalFetch = global.fetch;
        global.fetch = vi.fn();
    });

    afterEach(() => {
        global.fetch = originalFetch;
        vi.clearAllMocks();
    });

    describe('fetchUser', () => {
        it('should reject invalid user ID formats', async () => {
            await expect(client.fetchUser('invalid id!')).rejects.toThrow('Invalid User ID format');
            await expect(client.fetchUser(null)).rejects.toThrow('User ID must be a string or number');
            await expect(client.fetchUser({})).rejects.toThrow('User ID must be a string or number');

            expect(global.fetch).not.toHaveBeenCalled();
        });

        it('should fetch user and cache the promise, calling fetch only once for the same ID', async () => {
            const mockUser = { id: '123', name: 'Test User' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser
            });

            // Call fetchUser twice concurrently
            const promise1 = client.fetchUser('123');
            const promise2 = client.fetchUser('123');

            // Ensure both promises resolve to the same value
            const user1 = await promise1;
            const user2 = await promise2;

            expect(user1).toEqual(mockUser);
            expect(user2).toEqual(mockUser);

            // Ensure fetch was only called once
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith('/api/users/123');

            // Ensure the promise is the exact same reference
            expect(promise1).toBe(promise2);
        });
    });
});
