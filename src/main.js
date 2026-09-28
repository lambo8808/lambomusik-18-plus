import ApiClient from './api.js';

// ⚡ Bolt: Inject Vercel Analytics lazily using requestIdleCallback to free up the
// main thread during initial page load, improving Time to Interactive (TTI).
const initAnalytics = () => {
    import('@vercel/analytics').then(({ inject }) => inject());
};

if ('requestIdleCallback' in window) {
    window.requestIdleCallback(initAnalytics);
} else {
    setTimeout(initAnalytics, 1);
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
