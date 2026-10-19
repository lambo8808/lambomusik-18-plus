import ApiClient from './api.js';

// Inject Vercel Analytics asynchronously to improve initial load performance
import('@vercel/analytics').then(({ inject }) => inject());

// Initialize the application
const apiClient = new ApiClient();

console.log('Application initialized with Vercel Analytics');

// Example: Initialize your app here
// ⚡ Bolt: Removed redundant DOMContentLoaded listener.
// Scripts with type="module" are deferred by default, meaning the DOM is already parsed when this runs.
// Running it immediately reduces Time to Interactive (TTI).
const appElement = document.getElementById('app');
if (appElement) {
    appElement.innerHTML = `
        <h1>LamboMusik 18+</h1>
        <p>Application ready with analytics tracking enabled.</p>
    `;
}
