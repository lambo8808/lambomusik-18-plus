import ApiClient from './api.js';

// ⚡ Bolt: Inject Vercel Analytics using requestIdleCallback to avoid blocking the main thread
// during critical initial rendering.
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

// ⚡ Bolt: Since <script type="module"> is deferred by default, we don't need to wait for DOMContentLoaded.
// Executing directly reduces TTI (Time to Interactive).
const appElement = document.getElementById('app');
if (appElement) {
    appElement.innerHTML = `
        <h1>LamboMusik 18+</h1>
        <p>Application ready with analytics tracking enabled.</p>
    `;
}
