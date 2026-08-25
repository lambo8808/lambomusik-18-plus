## 2024-08-17 - Vercel Analytics Dynamic Import Optimization
**Learning:** Loading `@vercel/analytics` synchronously in `main.js` causes the bundle size of the initial chunk to be bloated, potentially delaying the main application logic and blocking the main thread during initialization.
**Action:** Replace synchronous import of third-party analytics (like `@vercel/analytics`) with dynamic import (`import().then()`) so it's loaded asynchronously, improving initial page load speed.
## LRU Cache for ApiClient

**Date**: 2026-08-25

**Learnings**:
Replaced the unbounded native `Map` in `ApiClient.userCache` with a bounded `LRUCache`. This prevents potential memory leaks by restricting the maximum number of items in the cache (set to 1000). A simple LRU implementation leveraging the insertion order guarantee of JavaScript's `Map` is both memory-efficient and performs well without requiring complex doubly-linked lists. It operates entirely by `delete`ing and re-`set`ting the map entries on access.
