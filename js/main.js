/**
 * Pillars of Creation Maps - Initialization
 * Entry point - starts the application
 */

// Create global app instance
const app = new App();

// Initialize when DOM is ready
app.init().catch(err => {
    console.error('Failed to initialize Pillars of Creation Maps:', err);
    document.getElementById('status').textContent = 'Error: ' + err.message;
});

// Expose app globally for inline onclick handlers
window.app = app;