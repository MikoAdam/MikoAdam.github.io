/**
 * ContextMenu - Right-click context menu for map
 */

class ContextMenu {
    constructor(editor, getZoom) {
        this.editor = editor;
        this.getZoom = getZoom;
        this.element = document.getElementById('contextMenu');
        this.titleElement = document.getElementById('menuTitle');
        this.selectedFeature = null;
        this.selectedColor = 'blue';
        this.clickLngLat = null;

        this.setupColorPalette();
        this.setupCloseHandler();
    }

    setupColorPalette() {
        const palette = document.getElementById('colorPalette');

        Object.entries(CONFIG.colors).forEach(([name, hex]) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch' + (name === 'blue' ? ' selected' : '');
            swatch.style.background = hex;
            swatch.title = name;
            swatch.onclick = (e) => {
                e.stopPropagation();
                this.selectColor(name, swatch);
            };
            palette.appendChild(swatch);
        });
    }

    setupCloseHandler() {
        document.addEventListener('click', () => this.close());
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

        this.element.style.left = event.clientX + 'px';
        this.element.style.top = event.clientY + 'px';
        this.element.classList.add('visible');
    }

    close() {
        this.element.classList.remove('visible');
    }

    selectColor(name, swatch) {
        this.selectedColor = name;
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
    }

    addRegion() {
        this.close();
        if (!this.selectedFeature) return;

        let line;
        if (this.selectedFeature.type === 'region') {
            line = `region: ${this.selectedFeature.name}, ${this.selectedFeature.country}, ${this.selectedColor}`;
        } else {
            line = `${this.selectedFeature.name.toLowerCase()}: ${this.selectedColor}`;
        }

        this.editor.insert(line);
    }

    addBubble() {
        this.close();
        if (!this.clickLngLat) return;

        const text = this.selectedFeature ? this.selectedFeature.name : 'Label';
        this.editor.insert(`bubble: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, "${text}"`);
    }

    addFly() {
        this.close();
        if (!this.clickLngLat) return;

        const zoom = Math.round(this.getZoom());
        this.editor.insert(`fly: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, ${zoom}`);
    }
}