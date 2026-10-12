import ApiClient from './api.js';

// Inject Vercel Analytics asynchronously to improve initial load performance
import('@vercel/analytics').then(({ inject }) => inject());

// Initialize the application
const apiClient = new ApiClient();

console.log('Application initialized with Vercel Analytics');

// ⚡ Bolt: Since main.js is loaded as an ES module (<script type="module">),
// it is deferred by default. Removing the redundant DOMContentLoaded listener
// executes initialization immediately when the script runs, improving Time to Interactive (TTI).
const appElement = document.getElementById('app');
if (appElement) {
    appElement.innerHTML = `
        <h1>LamboMusik 18+</h1>
        <p>Application ready with analytics tracking enabled.</p>
    `;
}
