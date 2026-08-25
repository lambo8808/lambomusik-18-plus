import { describe, it, expect, beforeEach, vi } from 'vitest';
import ApiClient from '../src/api.js';

describe('ApiClient', () => {
    let api;

    beforeEach(() => {
        api = new ApiClient();
        global.fetch = vi.fn();
    });

    describe('fetchUser', () => {
        it('should reject if ID is not a string or number', async () => {
            await expect(api.fetchUser({})).rejects.toThrow(TypeError);
            await expect(api.fetchUser({})).rejects.toThrow('User ID must be a string or number');
            await expect(api.fetchUser([])).rejects.toThrow(TypeError);
            await expect(api.fetchUser(null)).rejects.toThrow(TypeError);
            await expect(api.fetchUser(undefined)).rejects.toThrow(TypeError);
        });

        it('should reject if ID has an invalid format', async () => {
            await expect(api.fetchUser('invalid id')).rejects.toThrow(Error);
            await expect(api.fetchUser('invalid id')).rejects.toThrow('Invalid User ID format');
            await expect(api.fetchUser('user@123')).rejects.toThrow(Error);
            await expect(api.fetchUser('user!name')).rejects.toThrow(Error);
            await expect(api.fetchUser('user#name')).rejects.toThrow(Error);
        });

        it('should fetch user correctly if ID is valid', async () => {
            const mockUser = { id: 'valid_id', name: 'John Doe' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const user = await api.fetchUser('valid_id');
            expect(user).toEqual(mockUser);
            expect(global.fetch).toHaveBeenCalledWith('/api/users/valid_id');
        });

        it('should fetch user correctly if ID is a valid number', async () => {
            const mockUser = { id: 123, name: 'John Doe' };
            global.fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            const user = await api.fetchUser(123);
            expect(user).toEqual(mockUser);
            expect(global.fetch).toHaveBeenCalledWith('/api/users/123');
        });
    });
});
