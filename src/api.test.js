import { describe, it } from 'node:test';
import assert from 'node:assert';
import ApiClient from './api.js';

describe('ApiClient', () => {
    describe('fetchUser', () => {
        it('should reject with TypeError when id is neither a string nor a number', async () => {
            const api = new ApiClient();

            const invalidIds = [null, undefined, true, {}, []];

            for (const id of invalidIds) {
                await assert.rejects(
                    () => api.fetchUser(id),
                    (err) => {
                        assert.strictEqual(err.name, 'TypeError');
                        assert.strictEqual(err.message, 'User ID must be a string or number');
                        return true;
                    },
                    `Failed on id type: ${typeof id} (value: ${String(id)})`
                );
            }
        });
    });
});
