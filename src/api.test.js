import { describe, it, expect, beforeEach, vi } from 'vitest';
import ApiClient from './api.js';

describe('ApiClient', () => {
    let client;

    beforeEach(() => {
        client = new ApiClient();
        global.fetch = vi.fn();
    });

    describe('fetchUser', () => {
        it('should fetch a valid user by ID', async () => {
            const mockUser = { id: 'user123', name: 'John Doe' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const user = await client.fetchUser('user123');

            expect(global.fetch).toHaveBeenCalledWith('/api/users/user123');
            expect(user).toEqual(mockUser);
        });

        it('should cache the fetch promise', async () => {
            const mockUser = { id: 'user123', name: 'John Doe' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const promise1 = client.fetchUser('user123');
            const promise2 = client.fetchUser('user123');

            expect(promise1).toBe(promise2);

            await Promise.all([promise1, promise2]);

            expect(global.fetch).toHaveBeenCalledTimes(1);
        });

        it('should reject if ID is neither a string nor a number', async () => {
            await expect(client.fetchUser({ id: 123 })).rejects.toThrow(TypeError);
            await expect(client.fetchUser(true)).rejects.toThrow(TypeError);
            await expect(client.fetchUser(null)).rejects.toThrow(TypeError);
        });

        it('should reject if ID format is invalid', async () => {
            await expect(client.fetchUser('invalid@id')).rejects.toThrow('Invalid User ID format');
            await expect(client.fetchUser('user 123')).rejects.toThrow('Invalid User ID format');
            await expect(client.fetchUser('id!@#')).rejects.toThrow('Invalid User ID format');
        });

        it('should throw an error and delete cache on HTTP error', async () => {
            global.fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
            });

            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            await expect(client.fetchUser('missing')).rejects.toThrow('HTTP error! status: 404');

            expect(client.userCache.has('missing')).toBe(false);
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it('should URL encode the ID', async () => {
             const mockUser = { id: 'user-123', name: 'John Doe' };
             global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            await client.fetchUser('user-123');
            expect(global.fetch).toHaveBeenCalledWith('/api/users/user-123');
        });
    });
});
