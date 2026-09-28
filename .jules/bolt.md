## 2024-08-17 - Vercel Analytics Dynamic Import Optimization
**Learning:** Loading `@vercel/analytics` synchronously in `main.js` causes the bundle size of the initial chunk to be bloated, potentially delaying the main application logic and blocking the main thread during initialization.
**Action:** Replace synchronous import of third-party analytics (like `@vercel/analytics`) with dynamic import (`import().then()`) so it's loaded asynchronously, improving initial page load speed.
## 2024-08-24 - LRU Cache with standard Map
**Learning:** In long-running SPA sessions, unbounded caches like a standard `Map` can cause memory leaks. Utilizing ES6 `Map`'s insertion order property provides a performant, dependency-free way to implement an LRU (Least Recently Used) cache without complex logic.
**Action:** Always bound caches. For LRU behavior, when retrieving an item, `delete` and `set` it to push it to the end of the insertion order. When the `size` exceeds the limit, remove the first element via `map.keys().next().value`.
## 2024-05-24 - Vercel Analytics with requestIdleCallback
**Learning:** While dynamic imports (`import()`) help split bundles, they still execute immediately upon resolution. In client entry points (`main.js`), this can still block the main thread and delay Time to Interactive (TTI). Wrapping the import in `requestIdleCallback` (with a `setTimeout` fallback) ensures the browser prioritizes critical rendering over fetching/parsing analytics.
**Action:** Use `requestIdleCallback` to defer non-critical third-party scripts. Always provide a fallback for unsupported browsers.
