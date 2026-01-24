/**
 * Pillars of Creation Maps - Script Executor
 * Executes parsed animation commands
 */

class ScriptExecutor {
    constructor(renderer, geoData) {
        this.renderer = renderer;
        this.geoData = geoData;
    }

    /**
     * Execute array of commands sequentially
     */
    async execute(commands) {
        for (const cmd of commands) {
            await this.executeCommand(cmd);
        }
    }

    /**
     * Execute a single command
     */
    async executeCommand(cmd) {
        const color = CONFIG.colors[cmd.color] || cmd.color || '#3b82f6';

        switch (cmd.type) {
            case 'country': {
                const feature = this.geoData.findCountry(cmd.name);
                if (feature) {
                    this.renderer.drawFeature(feature, color, cmd.animation);
                }
                break;
            }

            case 'region': {
                const feature = this.geoData.findRegion(cmd.name, cmd.country);
                if (feature) {
                    this.renderer.drawFeature(feature, color, cmd.animation);
                }
                break;
            }

            case 'line': {
                const from = this.geoData.findCountry(cmd.from);
                const to = this.geoData.findCountry(cmd.to);
                if (from && to) {
                    this.renderer.drawLine(from, to, color);
                }
                break;
            }

            case 'label': {
                const el = LabelFactory.createLabel(cmd.text, cmd.size, cmd.color);
                this.renderer.addMarker(el, [cmd.lng, cmd.lat]);
                break;
            }

            case 'bubble': {
                const el = LabelFactory.createBubble(cmd.text, cmd.color);
                this.renderer.addMarker(el, [cmd.lng, cmd.lat]);
                break;
            }

            case 'year': {
                const el = LabelFactory.createYear(cmd.text, cmd.highlight);
                this.renderer.addMarker(el, [cmd.lng, cmd.lat]);
                break;
            }

            case 'arrow': {
                const el = LabelFactory.createArrow(cmd.text, cmd.direction, cmd.color);
                const anchor = cmd.direction === 'left' ? 'right' : 'left';
                this.renderer.addMarker(el, [cmd.lng, cmd.lat], anchor);
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

            case 'cinematic': {
                this.renderer.cinematicFlyTo(cmd.lat, cmd.lng, cmd.zoom, cmd.pitch, cmd.bearing);
                await this.delay(2100);
                break;
            }

            case 'wait': {
                await this.delay(cmd.ms);
                break;
            }
        }
    }

    /**
     * Delay helper for async timing
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}