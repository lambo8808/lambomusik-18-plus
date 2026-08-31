import ApiClient from './api.js';

// ⚡ Bolt: Defer Vercel Analytics injection until main thread is idle
// This prevents analytics from blocking critical rendering path and improves TTI/TBT.
const injectAnalytics = () => {
    import('@vercel/analytics').then(({ inject }) => {
        inject();
        console.log('Application initialized with Vercel Analytics');
    });
};

if ('requestIdleCallback' in window) {
    requestIdleCallback(injectAnalytics);
} else {
    setTimeout(injectAnalytics, 1);
}

// Initialize the application
const apiClient = new ApiClient();

// Example: Initialize your app here
const initApp = () => {
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.innerHTML = `
            <h1>LamboMusik 18+</h1>
            <p>Application ready with analytics tracking enabled.</p>
        `;
    }
};

// ⚡ Bolt: Check document.readyState because module scripts are deferred
// and DOMContentLoaded might have already fired.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
