import assert from 'assert';
import ApiClient from './src/api.js';

// Mock fetch
global.fetch = async (url) => {
    return {
        ok: true,
        json: async () => ({ id: url.split('/').pop() })
    };
};

async function runTests() {
    console.log('Running ApiClient tests...');
    const client = new ApiClient();

    assert.strictEqual(client.userCache.size, 0, 'Cache should be empty initially');

    // Fill the cache up to its max size
    for (let i = 0; i < 1000; i++) {
        client.fetchUser(`user_${i}`);
    }

    assert.strictEqual(client.userCache.size, 1000, 'Cache should contain 1000 elements');
    assert.ok(client.userCache.has('user_0'), 'Cache should contain first element user_0');

    // Add one more element to trigger eviction
    client.fetchUser('user_1000');

    assert.strictEqual(client.userCache.size, 1000, 'Cache size should not exceed 1000');
    assert.ok(!client.userCache.has('user_0'), 'Cache should have evicted the oldest element user_0');
    assert.ok(client.userCache.has('user_1'), 'Cache should still contain user_1');
    assert.ok(client.userCache.has('user_1000'), 'Cache should contain the newly added element user_1000');

    // Test LRU behavior on cache hit
    client.fetchUser('user_1'); // This should make user_1 the most recently used

    // Add one more element
    client.fetchUser('user_1001');

    assert.strictEqual(client.userCache.size, 1000, 'Cache size should remain 1000');
    assert.ok(!client.userCache.has('user_2'), 'Cache should have evicted user_2 as the new oldest element');
    assert.ok(client.userCache.has('user_1'), 'Cache should still contain user_1 because it was recently accessed');

    console.log('All tests passed successfully!');
}

runTests().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
