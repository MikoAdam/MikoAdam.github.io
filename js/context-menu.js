/**
 * Pillars of Creation Maps - Context Menu
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

    setupEventHandlers() {
        document.getElementById('colorPalette').addEventListener('click', (e) => {
            if (e.target.classList.contains('color-swatch')) {
                const color = e.target.dataset.color;
                this.selectColor(color, e.target);
            }
        });

        document.getElementById('contextMenu').addEventListener('click', (e) => {
            const item = e.target.closest('.context-menu-item');
            if (!item) return;

            const action = item.dataset.action;
            if (action && this[action]) {
                this[action]();
            }
        });
    }

    setupCloseHandler() {
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.close();
            }
        });
    }

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

        let x = event.clientX;
        let y = event.clientY;
        
        this.element.style.display = 'block';
        const rect = this.element.getBoundingClientRect();
        
        if (x + rect.width > window.innerWidth) {
            x = window.innerWidth - rect.width - 10;
        }
        if (y + rect.height > window.innerHeight) {
            y = window.innerHeight - rect.height - 10;
        }
        
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        this.element.classList.add('visible');
    }

    close() {
        this.element.classList.remove('visible');
        this.element.style.display = 'none';
    }

    selectColor(name, swatch) {
        this.selectedColor = name;
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
    }

    addCountry() {
        this.close();
        if (!this.selectedFeature) return;
        
        // Get country name from either country or region's parent
        let countryName;
        if (this.selectedFeature.type === 'country') {
            countryName = this.selectedFeature.name;
        } else if (this.selectedFeature.countryName) {
            countryName = this.selectedFeature.countryName;
        } else if (this.selectedFeature.country) {
            countryName = this.selectedFeature.country;
        } else {
            return;
        }
        
        countryName = countryName.toLowerCase();
        
        if (countryName === 'united states of america') countryName = 'usa';
        if (countryName === 'united kingdom') countryName = 'uk';
        if (countryName === 'russian federation') countryName = 'russia';
        
        this.editor.insert(`${countryName}: ${this.selectedColor}, pulse`);
    }

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

    addBubble() {
        this.close();
        if (!this.clickLngLat) return;
        
        const text = this.selectedFeature ? this.selectedFeature.name : 'Label';
        this.editor.insert(`bubble: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, "${text}", ${this.selectedColor}`);
    }

    addCinematic() {
        this.close();
        if (!this.clickLngLat) return;
        
        const zoom = Math.round(this.renderer.getZoom());
        const pitch = Math.round(this.renderer.getPitch());
        const bearing = Math.round(this.renderer.getBearing());
        this.editor.insert(`cinematic: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, ${zoom}, ${pitch}, ${bearing}`);
    }

    // Cancel just closes the menu
    close() {
        this.element.classList.remove('visible');
        this.element.style.display = 'none';
    }
}