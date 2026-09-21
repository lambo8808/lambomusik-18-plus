## 2024-08-17 - Vercel Analytics Dynamic Import Optimization
**Learning:** Loading `@vercel/analytics` synchronously in `main.js` causes the bundle size of the initial chunk to be bloated, potentially delaying the main application logic and blocking the main thread during initialization.
**Action:** Replace synchronous import of third-party analytics (like `@vercel/analytics`) with dynamic import (`import().then()`) so it's loaded asynchronously, improving initial page load speed.
## 2024-08-24 - LRU Cache with standard Map
**Learning:** In long-running SPA sessions, unbounded caches like a standard `Map` can cause memory leaks. Utilizing ES6 `Map`'s insertion order property provides a performant, dependency-free way to implement an LRU (Least Recently Used) cache without complex logic.
**Action:** Always bound caches. For LRU behavior, when retrieving an item, `delete` and `set` it to push it to the end of the insertion order. When the `size` exceeds the limit, remove the first element via `map.keys().next().value`.
## 2024-05-18 - requestIdleCallback for Third-Party Analytics
**Learning:** Even asynchronous dynamic imports (`import().then()?`) for third-party scripts like `@vercel/analytics` can compete for resources during the critical initial rendering path. The `requestIdleCallback` API ensures the script is deferred until the main thread is genuinely idle, effectively removing it from the critical path and improving Time to Interactive (TTI) without sacrificing functionality.
**Action:** Use `requestIdleCallback` (with a `setTimeout` fallback for broader browser compatibility) for deferring non-critical initializations like analytics and telemetry, instead of just using dynamic imports or async script tags.
