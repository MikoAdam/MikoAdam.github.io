/**
 * Pillars of Creation Maps - Script Executor
 */

class ScriptExecutor {
    constructor(renderer, geoData) {
        this.renderer = renderer;
        this.geoData = geoData;
    }

    async execute(commands) {
        for (const cmd of commands) {
            await this.executeCommand(cmd);
        }
    }

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
                    const animation = cmd.occupied ? 'occupied' : (cmd.animation || 'none');
                    this.renderer.drawFeature(feature, color, animation);
                }
                break;
            }

            case 'line': {
                const fromF = typeof cmd.from === 'string' ? this.geoData.findCountry(cmd.from) : null;
                const toF = typeof cmd.to === 'string' ? this.geoData.findCountry(cmd.to) : null;
                if (fromF && toF) {
                    this.renderer.drawLine(fromF, toF, color);
                } else {
                    // Coordinate-based: use canvas line (curve=0, no arrowhead)
                    const coords = this._resolveEndpoints(cmd);
                    if (coords) this.renderer.addArrow(coords.from, coords.to, color, 0, {}, 0.5);
                }
                break;
            }

            case 'attack': {
                const atkCoords = this._resolveEndpoints(cmd);
                if (atkCoords) {
                    this.renderer.addArrow(
                        atkCoords.from, atkCoords.to, color,
                        cmd.curve ?? 0.15, { fromName: atkCoords.fromName, toName: atkCoords.toName },
                        cmd.width ?? 1, cmd.headSize ?? null
                    );
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
                this.renderer.setYearOverlay(cmd.text, cmd.highlight);
                break;
            }

            case 'arrow': {
                const el = LabelFactory.createArrow(cmd.text, cmd.direction, cmd.color);
                const anchor = cmd.direction === 'left' ? 'right' : 'left';
                this.renderer.addMarker(el, [cmd.lng, cmd.lat], anchor);
                break;
            }

            case 'effect': {
                const el = EffectsLibrary.create(cmd.effect, cmd.color, cmd.size);
                if (el) this.renderer.addMarker(el, [cmd.lng, cmd.lat]);
                break;
            }

            case 'remove': {
                this.renderer.removeLastMarker();
                break;
            }

            case 'removeArrows': {
                this.renderer.clearAttackArrows();
                break;
            }

            case 'removeEffects': {
                this.renderer.removeEffects();
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

            case 'legend': {
                const legendColor = CONFIG.colors[cmd.color] || cmd.color || '#3b82f6';
                this.renderer.addLegendEntry(cmd.label, legendColor);
                break;
            }

            case 'legendAuto': {
                this.renderer.generateAutoLegend(this.allCommands || []);
                break;
            }

            case 'legendHide': {
                this.renderer.hideLegend();
                break;
            }
        }
    }

    /**
     * Resolve from/to endpoints — each can be a string (country name)
     * or {lat, lng} coordinates. Returns {from: [lng,lat], to: [lng,lat], fromName, toName}
     */
    _resolveEndpoints(cmd) {
        let from, to, fromName, toName;

        if (typeof cmd.from === 'string') {
            const f = this.geoData.findCountry(cmd.from);
            if (!f) return null;
            fromName = cmd.from;
            from = this.geoData.getCenter(f.geometry, f.properties.NAME);
        } else {
            from = [cmd.from.lng, cmd.from.lat];
            fromName = `${cmd.from.lat.toFixed(1)}, ${cmd.from.lng.toFixed(1)}`;
        }

        if (typeof cmd.to === 'string') {
            const f = this.geoData.findCountry(cmd.to);
            if (!f) return null;
            toName = cmd.to;
            to = this.geoData.getCenter(f.geometry, f.properties.NAME);
        } else {
            to = [cmd.to.lng, cmd.to.lat];
            toName = `${cmd.to.lat.toFixed(1)}, ${cmd.to.lng.toFixed(1)}`;
        }

        return { from, to, fromName, toName };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}