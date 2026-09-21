import ApiClient from './api.js';

// ⚡ Bolt: Defer loading Vercel Analytics until the browser is idle.
// This removes it from the critical rendering path, improving Time to Interactive (TTI).
const loadAnalytics = () => import('@vercel/analytics').then(({ inject }) => inject());
if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadAnalytics);
} else {
    setTimeout(loadAnalytics, 1);
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
