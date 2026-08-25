import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ApiClient from './api.js';

describe('ApiClient', () => {
    let apiClient;

    beforeEach(() => {
        apiClient = new ApiClient();
        vi.spyOn(global, 'fetch');
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('fetchUser', () => {
        it('throws an error and clears cache on non-ok HTTP response', async () => {
            const userId = '123';
            const mockStatus = 404;

            // Setup the mock to return a non-ok response
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: mockStatus,
            });

            // Call the method and assert it rejects with the correct error
            await expect(apiClient.fetchUser(userId)).rejects.toThrowError(
                `HTTP error! status: ${mockStatus}`
            );

            // Verify the console.error was called (as per the catch block)
            expect(console.error).toHaveBeenCalledWith(
                'Error fetching user:',
                expect.any(Error)
            );

            // Verify that the cache is empty after the failure
            expect(apiClient.userCache.has(userId)).toBe(false);

            // Verify that fetch was actually called
            expect(global.fetch).toHaveBeenCalledWith(`/api/users/${userId}`);
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
    });
});
