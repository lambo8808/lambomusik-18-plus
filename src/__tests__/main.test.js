import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Vercel Analytics
vi.mock('@vercel/analytics', () => ({
  inject: vi.fn(),
}));

describe('Main Application Initialization', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    // Clear mocks
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('initializes app with expected DOM elements', async () => {
    // Create the container element
    document.body.innerHTML = '<div id="app"></div>';

    // Using import() ensures we can test side effects of importing the module
    await import('../main.js');

    // Trigger DOMContentLoaded event
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    const appElement = document.getElementById('app');
    expect(appElement).not.toBeNull();

    // Check if innerHTML contains expected content
    expect(appElement.innerHTML).toContain('<h1>LamboMusik 18+</h1>');
    expect(appElement.innerHTML).toContain('Application ready with analytics tracking enabled.');
  });

  it('does not throw if app element is missing', async () => {
    // Intentionally omit creating the #app element

    // Using import() ensures we can test side effects of importing the module
    // We import api.js directly first, since main.js has an import side-effect
    // that won't run again if the module is cached in the test runner.
    // However, the event listener itself should be added each time
    // when we dispatch it manually if we set up the test correctly.
    // For this simple case, we just rely on the first test having loaded it,
    // or loading it here if it's the first test to run.
    await import('../main.js');

    // Trigger DOMContentLoaded event - should not throw
    const event = new Event('DOMContentLoaded');
    expect(() => {
      document.dispatchEvent(event);
    }).not.toThrow();
  });
});
