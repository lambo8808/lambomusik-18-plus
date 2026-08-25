import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the ApiClient
vi.mock('./api.js', () => {
  return {
    default: class ApiClient {
      constructor() {
        this.initialized = true;
      }
    }
  };
});

// Mock Vercel Analytics
vi.mock('@vercel/analytics', () => {
  return {
    inject: vi.fn()
  };
});

describe('Main App Initialization', () => {
  beforeEach(() => {
    // Reset the document
    document.body.innerHTML = '<div id="app"></div>';

    // Clear modules to ensure main.js runs fresh if imported multiple times
    vi.resetModules();
  });

  it('should initialize the app and render content on DOMContentLoaded', async () => {
    // Import main.js dynamically so it executes after we setup the DOM
    await import('./main.js');

    // Dispatch the DOMContentLoaded event
    document.dispatchEvent(new Event('DOMContentLoaded'));

    // Check if the content was rendered
    const appElement = document.getElementById('app');
    expect(appElement.innerHTML).toContain('<h1>LamboMusik 18+</h1>');
    expect(appElement.innerHTML).toContain('<p>Application ready with analytics tracking enabled.</p>');
  });

  it('should not throw if #app element is missing', async () => {
    // Remove the app element
    document.body.innerHTML = '';

    // Import main.js
    await import('./main.js?noapp=1');

    // Dispatch the event, it shouldn't throw an error
    expect(() => {
      document.dispatchEvent(new Event('DOMContentLoaded'));
    }).not.toThrow();
  });
});
