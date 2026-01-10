/**
 * GGMaps - Animated Map Editor
 * 
 * ════════════════════════════════════════════════════════════════════════════
 * LICENSE: 100% FREE FOR COMMERCIAL USE
 * ════════════════════════════════════════════════════════════════════════════
 * - OpenFreeMap (MIT) - vector map tiles
 * - NASA GIBS Blue Marble (Public Domain) - satellite imagery  
 * - Natural Earth (Public Domain) - country/region boundaries
 * - MapLibre GL JS (BSD) - map rendering
 * 
 * You may use, modify, and redistribute freely.
 * 
 * ════════════════════════════════════════════════════════════════════════════
 * DISPUTED TERRITORIES
 * ════════════════════════════════════════════════════════════════════════════
 * ✓ Crimea - reassigned to Ukraine (fixed from source data)
 * Other disputed areas show de facto control per Natural Earth.
 * ════════════════════════════════════════════════════════════════════════════
 */

const app = new App();

app.init().catch(err => {
    console.error('Failed to initialize GGMaps:', err);
    document.getElementById('status').textContent = 'Error: ' + err.message;
});

window.app = app;