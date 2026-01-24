/**
 * Pillars of Creation Maps - Context Menu
 * Right-click context menu with event delegation
 */

class ContextMenu {
    constructor(editor, renderer) {
        this.editor = editor;
        this.renderer = renderer;
        this.element = document.getElementById('contextMenu');
        this.titleElement = document.getElementById('menuTitle');
        this.selectedFeature = null;
        this.selectedColor = 'blue';
        this.clickLngLat = null;

        this.setupColorPalette();
        this.setupEventHandlers();
        this.setupCloseHandler();
    }

    /**
     * Build color palette
     */
    setupColorPalette() {
        const palette = document.getElementById('colorPalette');

        Object.entries(CONFIG.colors).forEach(([name, hex]) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch' + (name === 'blue' ? ' selected' : '');
            swatch.style.background = hex;
            swatch.title = name;
            swatch.dataset.color = name;
            palette.appendChild(swatch);
        });
    }

    /**
     * Setup event handlers with delegation
     */
    setupEventHandlers() {
        // Color swatch selection
        document.getElementById('colorPalette').addEventListener('click', (e) => {
            if (e.target.classList.contains('color-swatch')) {
                const color = e.target.dataset.color;
                this.selectColor(color, e.target);
            }
        });

        // Menu item actions
        document.getElementById('contextMenu').addEventListener('click', (e) => {
            const item = e.target.closest('.context-menu-item');
            if (!item) return;

            const action = item.dataset.action;
            if (action && this[action]) {
                this[action]();
            }
        });
    }

    /**
     * Close menu when clicking elsewhere
     */
    setupCloseHandler() {
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.close();
            }
        });
    }

    /**
     * Show context menu at position
     */
    show(event, feature, lngLat) {
        this.selectedFeature = feature;
        this.clickLngLat = lngLat;

        if (feature) {
            this.titleElement.textContent = feature.type === 'region'
                ? `${feature.name}, ${feature.country}`
                : feature.name;
        } else {
            this.titleElement.textContent = `${lngLat.lat.toFixed(2)}, ${lngLat.lng.toFixed(2)}`;
        }

        this.element.style.left = event.clientX + 'px';
        this.element.style.top = event.clientY + 'px';
        this.element.classList.add('visible');
    }

    /**
     * Hide context menu
     */
    close() {
        this.element.classList.remove('visible');
    }

    /**
     * Select a color from palette
     */
    selectColor(name, swatch) {
        this.selectedColor = name;
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
    }

    /**
     * Add country coloring command
     */
    addCountry() {
        this.close();
        if (!this.selectedFeature || this.selectedFeature.type !== 'country') return;
        this.editor.insert(`${this.selectedFeature.name.toLowerCase()}: ${this.selectedColor}, radial`);
    }

    /**
     * Add region coloring command
     */
    addRegion() {
        this.close();
        if (!this.selectedFeature) return;

        let line;
        if (this.selectedFeature.type === 'region') {
            line = `region: ${this.selectedFeature.name}, ${this.selectedFeature.country}, ${this.selectedColor}, sweep`;
        } else {
            line = `${this.selectedFeature.name.toLowerCase()}: ${this.selectedColor}, radial`;
        }
        this.editor.insert(line);
    }

    /**
     * Add line drawing command
     */
    addLine() {
        this.close();
        if (!this.selectedFeature || this.selectedFeature.type !== 'country') return;

        if (!this.renderer.lineStartCountry) {
            this.renderer.lineStartCountry = this.selectedFeature.name;
            if (window.app) {
                app.setStatus(`Line start: ${this.selectedFeature.name} (right-click another country)`);
            }
        } else {
            this.editor.insert(`line: ${this.renderer.lineStartCountry}, ${this.selectedFeature.name}, ${this.selectedColor}`);
            if (window.app) {
                app.setStatus('Line added! Right-click to start another');
            }
            this.renderer.lineStartCountry = null;
        }
    }

    /**
     * Add bubble label command
     */
    addBubble() {
        this.close();
        if (!this.clickLngLat) return;
        
        const text = this.selectedFeature ? this.selectedFeature.name : 'Label';
        this.editor.insert(`bubble: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, "${text}", ${this.selectedColor}`);
    }

    /**
     * Add cinematic camera command
     */
    addCinematic() {
        this.close();
        if (!this.clickLngLat) return;
        
        const zoom = Math.round(this.renderer.getZoom());
        const pitch = Math.round(this.renderer.getPitch());
        const bearing = Math.round(this.renderer.getBearing());
        this.editor.insert(`cinematic: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, ${zoom}, ${pitch}, ${bearing}`);
    }
}