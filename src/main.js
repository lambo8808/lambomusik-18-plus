import ApiClient from './api.js';

// ⚡ Bolt: Defer non-critical analytics loading to improve Time to Interactive (TTI).
// Using requestIdleCallback ensures analytics tracking is initialized when the main thread is idle,
// preventing it from blocking critical rendering path.
const injectAnalytics = () => import('@vercel/analytics').then(({ inject }) => inject());
if ('requestIdleCallback' in window) {
    requestIdleCallback(injectAnalytics);
} else {
    setTimeout(injectAnalytics, 1);
}

// Initialize the application
const apiClient = new ApiClient();

console.log('Application initialized with Vercel Analytics');

// Example: Initialize your app here
document.addEventListener('DOMContentLoaded', () => {
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.innerHTML = `
            <h1>LamboMusik 18+</h1>
            <p>Application ready with analytics tracking enabled.</p>
        `;
    }
});
