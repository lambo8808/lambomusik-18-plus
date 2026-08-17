import ApiClient from './api.js';

// Inject Vercel Analytics asynchronously to improve initial load performance
import('@vercel/analytics').then(({ inject }) => inject());

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
