## 2024-08-17 - Vercel Analytics Dynamic Import Optimization
**Learning:** Loading `@vercel/analytics` synchronously in `main.js` causes the bundle size of the initial chunk to be bloated, potentially delaying the main application logic and blocking the main thread during initialization.
**Action:** Replace synchronous import of third-party analytics (like `@vercel/analytics`) with dynamic import (`import().then()`) so it's loaded asynchronously, improving initial page load speed.
## 2024-08-24 - LRU Cache with standard Map
**Learning:** In long-running SPA sessions, unbounded caches like a standard `Map` can cause memory leaks. Utilizing ES6 `Map`'s insertion order property provides a performant, dependency-free way to implement an LRU (Least Recently Used) cache without complex logic.
**Action:** Always bound caches. For LRU behavior, when retrieving an item, `delete` and `set` it to push it to the end of the insertion order. When the `size` exceeds the limit, remove the first element via `map.keys().next().value`.
## 2024-10-24 - Redundant DOMContentLoaded in ES Modules
**Learning:** In this codebase, JavaScript entry points (like `src/main.js`) are loaded as ES modules (`<script type="module">`). Because these are deferred by default, wrapping initialization logic in `DOMContentLoaded` event listeners is redundant and should be avoided to prevent delaying execution and Time to Interactive (TTI).
**Action:** Remove `DOMContentLoaded` wrappers for initialization code in scripts loaded with `type="module"`. Let the deferred loading handle the timing, executing the script as soon as the DOM is ready without the overhead of the extra event listener.
