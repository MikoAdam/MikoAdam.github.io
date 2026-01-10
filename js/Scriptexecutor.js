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
                el.textContent = cmd.text;
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
                }
                break;
            }

            case 'fly': {
                this.renderer.flyTo(cmd.lat, cmd.lng, cmd.zoom);
                await this.delay(1300);
                break;
            }

            case 'wait': {
                await this.delay(cmd.ms);
                break;
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}