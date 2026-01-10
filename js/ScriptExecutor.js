/**
 * ScriptExecutor - Executes animation commands
 */

class ScriptExecutor {
    constructor(renderer, geoData) {
        this.renderer = renderer;
        this.geoData = geoData;
    }

    async executeCommand(cmd) {
        const color = CONFIG.colors[cmd.color] || cmd.color || '#3498db';

        switch (cmd.type) {
            case 'country': {
                const feature = this.geoData.findCountry(cmd.name);
                if (feature) {
                    this.renderer.drawFeature(feature, color);
                }
                break;
            }

            case 'region': {
                const feature = this.geoData.findRegion(cmd.name, cmd.country);
                if (feature) {
                    this.renderer.drawFeature(feature, color);
                }
                break;
            }

            case 'label': {
                const el = LabelFactory.createLabel(cmd.text, cmd.size, cmd.color);
                this.renderer.addMarker(el, [cmd.lng, cmd.lat]);
                break;
            }

            case 'bubble': {
                const el = LabelFactory.createBubble(cmd.text);
                this.renderer.addMarker(el, [cmd.lng, cmd.lat]);
                break;
            }

            case 'year': {
                const el = document.getElementById('fixedYear');
                const textEl = el.querySelector('.fixed-year-text');
                textEl.textContent = cmd.text;
                el.className = 'fixed-year visible' + (cmd.highlight ? ' highlight' : '');
                break;
            }

            case 'remove': {
                this.renderer.removeLastMarker();
                break;
            }

            case 'zoom': {
                const feature = this.geoData.findCountry(cmd.target);
                if (feature) {
                    this.renderer.zoomToFeature(feature);
                    await this.delay(600);
                    await this.waitForMapIdle();
                }
                break;
            }

            case 'fly': {
                this.renderer.flyTo(cmd.lat, cmd.lng, cmd.zoom);
                // Wait for fly animation to complete
                await this.delay(1300);
                // Wait for map tiles to load
                await this.waitForMapIdle();
                break;
            }

            case 'wait': {
                await this.delay(cmd.ms);
                break;
            }
        }
    }

    /**
     * Wait for map to finish loading tiles
     */
    waitForMapIdle() {
        return new Promise(resolve => {
            if (!this.renderer.map.isMoving() && this.renderer.map.areTilesLoaded()) {
                resolve();
            } else {
                this.renderer.map.once('idle', resolve);
                // Timeout fallback in case idle never fires
                setTimeout(resolve, 2000);
            }
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}