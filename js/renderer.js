/**
 * Pillars of Creation Maps - Renderer
 * Map rendering, camera control, and visual effects
 */

class MapRenderer {
    constructor(containerId, geoData) {
        this.containerId = containerId;
        this.geoData = geoData;
        this.map = null;
        this.layers = [];
        this.sourceIds = new Set();
        this.markers = [];
        this.labelMarkers = [];
        this.layerCounter = 0;
        this.lastMarker = null;
        this.showBorders = false;
        this.showLabels = false;
        this.lineStartCountry = null;
        this.bubblePositions = [];
        this.legendEntries = [];
        this.legendElement = null;
        this._coloredFeatures = []; // Track colored features for style switch
    }

    hideClutter() {
        const layersToHide = [
            'park', 'park_outline', 'landcover_wood', 'landcover_grass',
            'landuse_residential', 'landuse_pitch', 'landuse_track',
            'landuse_cemetery', 'landuse_hospital', 'landuse_school',
            'poi_r20', 'poi_r7', 'poi_r1', 'poi_transit', 'airport'
        ];

        layersToHide.forEach(id => {
            if (this.map.getLayer(id)) {
                this.map.setLayoutProperty(id, 'visibility', 'none');
            }
        });
    }

    adjustColorBrightness(hex, percent) {
        if (!hex || !hex.startsWith('#')) return hex;

        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        r = Math.max(0, Math.min(255, Math.round(r + (255 * percent / 100))));
        g = Math.max(0, Math.min(255, Math.round(g + (255 * percent / 100))));
        b = Math.max(0, Math.min(255, Math.round(b + (255 * percent / 100))));

        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    }

    createDiagonalPattern(id, color1, color2) {
        if (!this.map.hasImage(id)) {
            const size = 32;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = color2;
            ctx.fillRect(0, 0, size, size);

            ctx.strokeStyle = color1;
            ctx.lineWidth = 4;
            ctx.lineCap = 'square';

            for (let i = -size; i < size * 2; i += 8) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i + size, size);
                ctx.stroke();
            }

            this.map.addImage(id, {
                width: size,
                height: size,
                data: ctx.getImageData(0, 0, size, size).data
            });
        }
    }

    // ─── Helpers for adding GeoJSON sources/layers ───

    addGeoSource(id, data) {
        this.map.addSource(id, { type: 'geojson', data });
        this.sourceIds.add(id);
    }

    addLineLayer(id, sourceId, color, width, opacity, options = {}) {
        const paint = {
            'line-color': color,
            'line-width': width,
            'line-opacity': opacity
        };
        if (options.dasharray) paint['line-dasharray'] = options.dasharray;
        if (options.blur) paint['line-blur'] = options.blur;

        this.map.addLayer({ id, type: 'line', source: sourceId, paint });
        this.layers.push(id);
    }

    addFillLayer(id, sourceId, color, opacity, options = {}) {
        const paint = {
            'fill-color': color,
            'fill-opacity': opacity
        };
        if (options.pattern) paint['fill-pattern'] = options.pattern;

        this.map.addLayer({ id, type: 'fill', source: sourceId, paint });
        this.layers.push(id);
    }

    // ─── Map initialization ───

    async init() {
        let style;
        try {
            const response = await fetch(CONFIG.styles.liberty);
            style = await response.json();
            delete style.center;
            delete style.zoom;
        } catch (e) {
            style = CONFIG.styles.liberty;
        }

        this.map = new maplibregl.Map({
            container: this.containerId,
            style: style,
            center: [20, 48],
            zoom: 3,
            pitch: 0,
            bearing: 0,
            attributionControl: false,
            preserveDrawingBuffer: true
        });

        this.map.addControl(new maplibregl.NavigationControl(), 'top-right');
        this.map.on('zoom', () => {
            this.updateLabelSizes();
            this.updateSymbolSizes();
        });
        this._baseZoom = 3; // Reference zoom level for symbol sizing

        // Move pitch/rotate from right-click-drag to middle-mouse-drag
        // Disable default right-click drag rotate
        this.map.dragRotate.disable();

        // Middle mouse button drag for pitch/rotate
        let mmDragging = false, mmStartX = 0, mmStartY = 0, mmStartBearing = 0, mmStartPitch = 0;
        const canvas = this.map.getCanvas();

        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 1) { // middle mouse button
                e.preventDefault();
                mmDragging = true;
                mmStartX = e.clientX;
                mmStartY = e.clientY;
                mmStartBearing = this.map.getBearing();
                mmStartPitch = this.map.getPitch();
                this.map.dragPan.disable();
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!mmDragging) return;
            const dx = e.clientX - mmStartX;
            const dy = e.clientY - mmStartY;
            this.map.setBearing(mmStartBearing + dx * 0.5);
            this.map.setPitch(Math.max(0, Math.min(85, mmStartPitch - dy * 0.5)));
        });

        document.addEventListener('mouseup', (e) => {
            if (e.button === 1 && mmDragging) {
                mmDragging = false;
                this.map.dragPan.enable();
            }
        });

        // Prevent middle-click scroll/paste behavior on the map canvas
        canvas.addEventListener('auxclick', (e) => { if (e.button === 1) e.preventDefault(); });

        return new Promise(resolve => {
            this.map.on('load', () => {
                this.hideClutter();
                this.setupHoverLayers();
                resolve();
            });
        });
    }

    /**
     * Compensate symbol sizes for zoom level.
     * Symbols at fixed screen size look disproportionately huge when zoomed out.
     * This gently scales them down when zoomed out, up when zoomed in.
     */
    updateSymbolSizes() {
        const zoom = this.map.getZoom();
        // At reference zoom (4), symbols are at their base size
        // Each zoom level doubles/halves map scale, so we do a gentler factor
        const factor = Math.pow(2, (zoom - 4) * 0.25); // 0.25 = quarter-strength
        const clamped = Math.max(0.4, Math.min(2.0, factor));

        this.markers.forEach(m => {
            const el = m.getElement();
            if (!el || !el.classList.contains('map-effect')) return;
            const baseSize = parseFloat(el.dataset.effectSize) || 1;
            const scale = Math.max(0.5, Math.min(3, baseSize));
            const px = Math.round(48 * scale * clamped);
            el.style.width = px + 'px';
            el.style.height = px + 'px';
        });
    }

    updateLabelSizes() {
        const zoom = this.map.getZoom();
        const isSatellite = document.getElementById('styleSelect').value === 'satellite';

        const baseSize = isSatellite
            ? Math.max(12, Math.min(22, zoom * 2.5))
            : Math.max(8, Math.min(14, zoom * 1.5));

        document.querySelectorAll('.country-name-label').forEach(label => {
            label.style.fontSize = baseSize + 'px';
            if (isSatellite) {
                label.style.textShadow = '0 2px 6px #000, 0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.5)';
                label.style.letterSpacing = '1px';
            } else {
                label.style.textShadow = '';
                label.style.letterSpacing = '';
            }
        });
    }

    // ─── Style switching ───

    setStyle(styleKey) {
        this.removeBorderLayer();
        this.removeLabelMarkers();

        // Save colored features to re-apply after style switch
        const savedFeatures = [...this._coloredFeatures];

        const onStyleReady = () => {
            this.setupHoverLayers();

            // Re-apply colored countries/regions (clear tracking first to avoid duplicates)
            this._coloredFeatures = [];
            for (const { feature, color, animation } of savedFeatures) {
                this.drawFeature(feature, color, animation === 'occupied' ? 'occupied' : 'none');
            }

            if (styleKey !== 'satellite') {
                this.hideClutter();
                this.showBorders = false;
                this.showLabels = false;
                const bordersEl = document.getElementById('showBorders');
                const labelsEl = document.getElementById('showLabels');
                if (bordersEl) bordersEl.checked = false;
                if (labelsEl) labelsEl.checked = false;
                document.querySelectorAll('.satellite-only').forEach(el => {
                    el.style.display = 'none';
                });
            } else {
                this.showBorders = true;
                this.showLabels = true;
                const bordersEl = document.getElementById('showBorders');
                const labelsEl = document.getElementById('showLabels');
                if (bordersEl) bordersEl.checked = true;
                if (labelsEl) labelsEl.checked = true;
                document.querySelectorAll('.satellite-only').forEach(el => {
                    el.style.display = 'flex';
                });
                this.addBorderLayer();
                this.addLabelMarkers();
            }
        };

        // Register listeners BEFORE setStyle to avoid missing synchronous events
        let fired = false;
        const runOnce = () => {
            if (fired) return;
            fired = true;
            onStyleReady();
        };
        this.map.once('style.load', runOnce);
        this.map.once('idle', runOnce);

        if (styleKey === 'satellite') {
            this.map.setStyle({
                version: 8,
                sources: {
                    nasa: {
                        type: 'raster',
                        tiles: [CONFIG.satellite.tiles],
                        tileSize: 256,
                        maxzoom: CONFIG.satellite.maxZoom
                    }
                },
                layers: [{ id: 'nasa', type: 'raster', source: 'nasa' }]
            });
            this.updateAttribution('satellite');
        } else {
            this.map.setStyle(CONFIG.styles[styleKey]);
            this.updateAttribution('vector');
        }

        // Extra safety: if neither event fires within 2s, force it
        setTimeout(runOnce, 2000);
    }

    updateAttribution(type) {
        const el = document.querySelector('.map-attribution');
        if (type === 'satellite') {
            el.innerHTML = '<a href="https://earthdata.nasa.gov/gibs" target="_blank">NASA GIBS</a> (public domain)';
        } else {
            el.innerHTML = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> · <a href="https://naturalearthdata.com" target="_blank">Natural Earth</a>';
        }
    }

    // ─── Hover layers ───

    setupHoverLayers() {
        if (!this.geoData.countries) return;

        const currentCenter = this.map.getCenter();
        const currentZoom = this.map.getZoom();

        if (!this.map.getSource('hover-countries')) {
            this.map.addSource('hover-countries', {
                type: 'geojson',
                data: this.geoData.countries
            });
            this.map.addLayer({
                id: 'hover-countries',
                type: 'fill',
                source: 'hover-countries',
                paint: { 'fill-opacity': 0 }
            });
        }

        if (!this.map.getSource('hover-regions')) {
            this.map.addSource('hover-regions', {
                type: 'geojson',
                data: this.geoData.regions
            });
            this.map.addLayer({
                id: 'hover-regions',
                type: 'fill',
                source: 'hover-regions',
                paint: { 'fill-opacity': 0 }
            });
        }

        this.map.jumpTo({ center: currentCenter, zoom: currentZoom });

        const popup = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false,
            className: 'hover-popup'
        });

        this.map.on('mousemove', 'hover-regions', e => {
            if (e.features[0]) {
                const p = e.features[0].properties;
                popup.setLngLat(e.lngLat)
                    .setHTML(`<strong>${p.name || p.NAME}</strong> · ${p.admin || p.ADMIN}`)
                    .addTo(this.map);
            }
        });

        this.map.on('mouseleave', 'hover-regions', () => popup.remove());
    }

    // ─── Border / label toggles ───

    toggleBorders(show) {
        this.showBorders = show;
        if (show) this.addBorderLayer();
        else this.removeBorderLayer();
    }

    addBorderLayer() {
        if (!this.geoData.countries || this.map.getSource('border-layer')) return;

        this.map.addSource('border-layer', {
            type: 'geojson',
            data: this.geoData.countries
        });
        this.map.addLayer({
            id: 'border-lines',
            type: 'line',
            source: 'border-layer',
            paint: {
                'line-color': '#fff',
                'line-width': 1,
                'line-opacity': 0.6
            }
        });
    }

    removeBorderLayer() {
        if (this.map.getLayer('border-lines')) this.map.removeLayer('border-lines');
        if (this.map.getSource('border-layer')) this.map.removeSource('border-layer');
    }

    toggleLabels(show) {
        this.showLabels = show;
        if (show) this.addLabelMarkers();
        else this.removeLabelMarkers();
    }

    addLabelMarkers() {
        if (!this.geoData.countries) return;
        this.removeLabelMarkers();

        this.geoData.countries.features.forEach(f => {
            const name = f.properties.NAME || f.properties.ADMIN;
            const center = this.geoData.getCenter(f.geometry, name);

            const el = document.createElement('div');
            el.className = 'country-name-label';
            el.textContent = name;

            const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
                .setLngLat(center)
                .addTo(this.map);
            this.labelMarkers.push(marker);
        });

        this.updateLabelSizes();
    }

    removeLabelMarkers() {
        this.labelMarkers.forEach(m => m.remove());
        this.labelMarkers = [];
    }

    // ─── Feature drawing ───

    drawFeature(feature, color, animation = 'none') {
        const id = 'layer-' + (++this.layerCounter);

        // Track for re-apply on style switch
        this._coloredFeatures.push({ feature, color, animation });

        this.addGeoSource(id, feature);

        // Diagonal stripes for occupied territories
        if (animation === 'striped' || animation === 'disputed' || animation === 'occupied') {
            const patternId = 'stripe-pattern-' + id;
            const stripeColor = this.adjustColorBrightness(color, -30);

            this.createDiagonalPattern(patternId, stripeColor, color);

            this.addFillLayer(id + '-fill', id, color, 0.8, { pattern: patternId });
            this.addLineLayer(id + '-line', id, stripeColor, 3, 1, { dasharray: [6, 3] });
            return;
        }

        // Normal fill + border
        this.addFillLayer(id + '-fill', id, color, 0);
        this.map.addLayer({
            id: id + '-line',
            type: 'line',
            source: id,
            paint: {
                'line-color': color,
                'line-width': 0,
                'line-opacity': 0,
                'line-blur': 3
            }
        });
        this.layers.push(id + '-line');

        // Animations
        if (animation === 'pulse') {
            let step = 0;
            const totalSteps = 80;
            const interval = setInterval(() => {
                step++;
                const progress = step / totalSteps;
                const eased = 1 - Math.pow(1 - progress, 3);

                this.map.setPaintProperty(id + '-fill', 'fill-opacity', eased * 0.7);
                this.map.setPaintProperty(id + '-line', 'line-width', 6 - (eased * 2));
                this.map.setPaintProperty(id + '-line', 'line-opacity', Math.min(eased * 1.2, 1));

                if (step >= totalSteps) {
                    clearInterval(interval);
                    this.map.setPaintProperty(id + '-fill', 'fill-opacity', 0.7);
                    this.map.setPaintProperty(id + '-line', 'line-width', 4);
                    this.map.setPaintProperty(id + '-line', 'line-opacity', 1);
                }
            }, 30);

        } else if (animation === 'fade') {
            let step = 0;
            const totalSteps = 65;
            const interval = setInterval(() => {
                step++;
                const progress = step / totalSteps;

                this.map.setPaintProperty(id + '-fill', 'fill-opacity', progress * 0.7);
                this.map.setPaintProperty(id + '-line', 'line-width', 3);
                this.map.setPaintProperty(id + '-line', 'line-opacity', progress * 0.7);

                if (step >= totalSteps) clearInterval(interval);
            }, 30);

        } else if (animation === 'radial') {
            let step = 0;
            const totalSteps = 80;
            const interval = setInterval(() => {
                step++;
                const progress = step / totalSteps;
                const eased = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                this.map.setPaintProperty(id + '-fill', 'fill-opacity', eased * 0.7);
                this.map.setPaintProperty(id + '-line', 'line-width', 8 - (eased * 4));
                this.map.setPaintProperty(id + '-line', 'line-opacity', Math.min(eased * 1.5, 1));

                if (step >= totalSteps) {
                    clearInterval(interval);
                    this.map.setPaintProperty(id + '-fill', 'fill-opacity', 0.7);
                    this.map.setPaintProperty(id + '-line', 'line-width', 4);
                }
            }, 30);

        } else if (animation === 'sweep') {
            let step = 0;
            const totalSteps = 80;

            this.map.setPaintProperty(id + '-fill', 'fill-opacity', 0);
            this.map.setPaintProperty(id + '-line', 'line-width', 8);
            this.map.setPaintProperty(id + '-line', 'line-opacity', 1);

            const interval = setInterval(() => {
                step++;
                const progress = step / totalSteps;

                this.map.setPaintProperty(id + '-fill', 'fill-opacity', Math.max(0, (progress - 0.3) / 0.7) * 0.7);
                this.map.setPaintProperty(id + '-line', 'line-width', 8 - (progress * 4));

                if (step >= totalSteps) {
                    clearInterval(interval);
                    this.map.setPaintProperty(id + '-fill', 'fill-opacity', 0.7);
                    this.map.setPaintProperty(id + '-line', 'line-width', 4);
                }
            }, 30);

        } else {
            setTimeout(() => {
                this.map.setPaintProperty(id + '-fill', 'fill-opacity', 0.7);
                this.map.setPaintProperty(id + '-line', 'line-width', 4);
                this.map.setPaintProperty(id + '-line', 'line-opacity', 0.9);
            }, 50);
        }
    }

    // ─── Lines (dashed, subtle) ───

    drawLine(fromFeature, toFeature, color) {
        const id = 'line-' + (++this.layerCounter);
        const fromCenter = this.geoData.getCenter(fromFeature.geometry, fromFeature.properties.NAME);
        const toCenter = this.geoData.getCenter(toFeature.geometry, toFeature.properties.NAME);

        this.addGeoSource(id, {
            type: 'Feature',
            geometry: { type: 'LineString', coordinates: [fromCenter, toCenter] }
        });

        this.addLineLayer(id + '-line', id, color, 2, 0.6, { dasharray: [6, 4] });
    }

    // ─── Attack arrows (canvas overlay — screen-space) ───

    initArrowCanvas() {
        if (this.arrowCanvas) return;
        const container = document.querySelector('.map-container');
        this.arrowCanvas = document.createElement('canvas');
        this.arrowCanvas.className = 'arrow-overlay';
        this.arrowCanvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:5;';
        container.appendChild(this.arrowCanvas);
        this.arrowCtx = this.arrowCanvas.getContext('2d');
        this.arrows = [];

        // Redraw on every map move
        this.map.on('move', () => this.renderArrows());
        this.map.on('resize', () => this.renderArrows());
    }

    drawAttackArrow(fromFeature, toFeature, color, curve = 0.15, width = 1, headSize = null) {
        const fromName = fromFeature.properties.NAME || fromFeature.properties.ADMIN;
        const toName = toFeature.properties.NAME || toFeature.properties.ADMIN;
        const fromCenter = this.geoData.getCenter(fromFeature.geometry, fromName);
        const toCenter = this.geoData.getCenter(toFeature.geometry, toName);
        this.addArrow(fromCenter, toCenter, color, curve, { fromName, toName }, width, headSize);
    }

    addArrow(from, to, color, curve = 0.15, meta = {}, width = 1, headSize = null) {
        this.initArrowCanvas();
        this.initArrowDragEditing();
        this.arrows.push({ from, to, color, curve, meta, width, headSize: headSize ?? width });
        this.renderArrows();
    }

    renderArrows() {
        if (!this.arrowCanvas || !this.arrowCtx) return;
        const canvas = this.arrowCanvas;
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = this.arrowCtx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(dpr, dpr);

        const selIdx = this._selectedArrowIdx ?? -1;

        for (let i = 0; i < this.arrows.length; i++) {
            const arrow = this.arrows[i];

            // Highlight selected arrow with a glow
            if (i === selIdx) {
                ctx.save();
                ctx.shadowColor = 'rgba(102, 126, 234, 0.6)';
                ctx.shadowBlur = 12;
                this.drawArrowOnCanvas(ctx, arrow);
                ctx.restore();
            } else {
                this.drawArrowOnCanvas(ctx, arrow);
            }

            // Draw handles for selected arrow
            if (i === selIdx) {
                const p1 = this.map.project(arrow.from);
                const p2 = this.map.project(arrow.to);
                const dx = p2.x - p1.x, dy = p2.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const px = -dy / dist, py = dx / dist;
                const co = dist * arrow.curve;
                const cp = { x: (p1.x + p2.x) / 2 + px * co, y: (p1.y + p2.y) / 2 + py * co };

                // Dashed line from midpoint to curve handle
                const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(mid.x, mid.y);
                ctx.lineTo(cp.x, cp.y);
                ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.restore();

                // Handles
                const handles = [
                    { x: p1.x, y: p1.y, fill: '#4ade80', icon: '\u25C0' },  // start: green ◀
                    { x: p2.x, y: p2.y, fill: '#ef4444', icon: '\u25B6' },  // end: red ▶
                    { x: cp.x, y: cp.y, fill: '#facc15', icon: '\u25CF' }   // curve: yellow ●
                ];
                for (const h of handles) {
                    ctx.save();
                    // White circle with colored border
                    ctx.beginPath();
                    ctx.arc(h.x, h.y, 8, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0,0,0,0.85)';
                    ctx.fill();
                    ctx.strokeStyle = h.fill;
                    ctx.lineWidth = 2.5;
                    ctx.stroke();
                    // Icon
                    ctx.fillStyle = h.fill;
                    ctx.font = 'bold 8px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(h.icon, h.x, h.y);
                    ctx.restore();
                }
            }
        }
    }

    drawArrowOnCanvas(ctx, arrow) {
        const p1 = this.map.project(arrow.from);
        const p2 = this.map.project(arrow.to);
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 5) return;

        // Perpendicular for curve
        const nx = -dy / dist;
        const ny = dx / dist;
        const curveOffset = dist * arrow.curve;
        const cp = {
            x: (p1.x + p2.x) / 2 + nx * curveOffset,
            y: (p1.y + p2.y) / 2 + ny * curveOffset
        };

        // Arrowhead sizing — independent shaft width and head size
        const shaftScale = arrow.width || 1;
        const headScale = arrow.headSize ?? shaftScale;
        const headLen = Math.max(14, Math.min(32, dist * 0.1)) * headScale;
        const headHalfW = headLen * 0.42;
        const shaftW = Math.max(2, Math.min(4, dist * 0.012)) * shaftScale;

        // Bezier helper
        const bPt = (t) => ({
            x: (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cp.x + t * t * p2.x,
            y: (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cp.y + t * t * p2.y
        });

        // Bezier tangent (derivative)
        const bTan = (t) => ({
            x: 2 * (1 - t) * (cp.x - p1.x) + 2 * t * (p2.x - cp.x),
            y: 2 * (1 - t) * (cp.y - p1.y) + 2 * t * (p2.y - cp.y)
        });

        // Find t where the shaft ends (headLen pixels before the tip)
        // Use binary search for accuracy
        let lo = 0.5, hi = 1.0;
        for (let i = 0; i < 30; i++) {
            const mid = (lo + hi) / 2;
            const pt = bPt(mid);
            const d = Math.sqrt((pt.x - p2.x) ** 2 + (pt.y - p2.y) ** 2);
            if (d > headLen) lo = mid;
            else hi = mid;
        }
        const tEnd = (lo + hi) / 2;

        // Tangent at tip for arrowhead direction
        const tan = bTan(0.99);
        const tanLen = Math.sqrt(tan.x * tan.x + tan.y * tan.y) || 1;
        const tx = tan.x / tanLen;
        const ty = tan.y / tanLen;
        const tpx = -ty; // perpendicular
        const tpy = tx;

        // ── Shaft ──
        const shaftEnd = bPt(tEnd);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(cp.x, cp.y, shaftEnd.x, shaftEnd.y);
        ctx.strokeStyle = arrow.color;
        ctx.lineWidth = shaftW;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.restore();

        // ── Arrowhead: filled triangle touching the tip ──
        const base = bPt(tEnd);
        const wingL = { x: base.x + tpx * headHalfW, y: base.y + tpy * headHalfW };
        const wingR = { x: base.x - tpx * headHalfW, y: base.y - tpy * headHalfW };

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);       // tip
        ctx.lineTo(wingL.x, wingL.y);  // left wing
        ctx.lineTo(wingR.x, wingR.y);  // right wing
        ctx.closePath();
        ctx.fillStyle = arrow.color;
        ctx.fill();
        ctx.restore();
    }

    clearAttackArrows() {
        this.arrows = [];
        if (this.arrowCtx) {
            this.arrowCtx.clearRect(0, 0, this.arrowCanvas.width, this.arrowCanvas.height);
        }
    }

    /**
     * Hit-test arrows at a screen point. Returns {arrow, index} if hit, null otherwise.
     */
    hitTestArrow(point) {
        if (!this.arrows || !this.arrows.length) return null;
        const idx = this._hitTestScreen(point.x, point.y);
        if (idx === null) return null;
        return { arrow: this.arrows[idx], index: idx };
    }

    removeArrow(index) {
        if (index >= 0 && index < this.arrows.length) {
            this.arrows.splice(index, 1);
            this.renderArrows();
        }
    }

    // ─── Arrow selection & drag editing (PowerPoint-style) ───

    initArrowDragEditing() {
        if (this._arrowDragInitialized) return;
        this._arrowDragInitialized = true;
        this._selectedArrowIdx = -1;
        this._draggingHandle = null;
        this._isDragging = false;

        const canvas = this.arrowCanvas;

        // CRITICAL: Canvas pointer-events are OFF by default.
        // Only enable when hovering over an arrow or when an arrow is selected.
        canvas.style.pointerEvents = 'none';

        // Use map click to detect arrow clicks via hit-testing the map point
        this.map.on('click', (e) => {
            if (this._isDragging) return;
            const hit = this._hitTestScreen(e.point.x, e.point.y);
            if (hit !== null) {
                this._selectedArrowIdx = hit;
                canvas.style.pointerEvents = 'auto';
                this.renderArrows();
            } else if (this._selectedArrowIdx >= 0) {
                this._selectedArrowIdx = -1;
                canvas.style.pointerEvents = 'none';
                this.renderArrows();
            }
        });

        // Right-click: check for arrow hit, then fire contextmenu
        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this._selectedArrowIdx >= 0) {
                this._selectedArrowIdx = -1;
                this.renderArrows();
            }
            // Pass through to map
            canvas.style.pointerEvents = 'none';
            const rect = this.map.getCanvas().getBoundingClientRect();
            const point = new maplibregl.Point(
                e.clientX - rect.left,
                e.clientY - rect.top
            );
            this.map.fire('contextmenu', {
                point: point,
                lngLat: this.map.unproject(point),
                originalEvent: e
            });
        });

        // When canvas has pointer events (arrow selected), handle handle-dragging
        canvas.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            if (this._selectedArrowIdx >= 0) {
                const handle = this._findHandle(mx, my, this.arrows[this._selectedArrowIdx]);
                if (handle) {
                    e.stopPropagation();
                    e.preventDefault();
                    this._draggingHandle = handle;
                    this._isDragging = true;
                    this.map.dragPan.disable();
                    return;
                }
                // Click on arrow body — keep selected
                const hit = this._hitTestScreen(mx, my);
                if (hit !== null) {
                    e.stopPropagation();
                    e.preventDefault();
                    this._selectedArrowIdx = hit;
                    this.renderArrows();
                    return;
                }
                // Clicked empty space — deselect, pass through
                this._selectedArrowIdx = -1;
                canvas.style.pointerEvents = 'none';
                this.renderArrows();
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!this._isDragging || !this._draggingHandle) return;
            e.stopPropagation();
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            const arrow = this.arrows[this._selectedArrowIdx];
            if (!arrow) return;

            if (this._draggingHandle === 'from') {
                const ll = this.map.unproject([mx, my]);
                arrow.from = [ll.lng, ll.lat];
            } else if (this._draggingHandle === 'to') {
                const ll = this.map.unproject([mx, my]);
                arrow.to = [ll.lng, ll.lat];
            } else if (this._draggingHandle === 'curve') {
                const p1 = this.map.project(arrow.from);
                const p2 = this.map.project(arrow.to);
                const dx = p2.x - p1.x, dy = p2.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const px = -dy / dist, py = dx / dist;
                const ox = mx - (p1.x + p2.x) / 2;
                const oy = my - (p1.y + p2.y) / 2;
                arrow.curve = (ox * px + oy * py) / dist;
            }
            this.renderArrows();
        });

        const endDrag = () => {
            if (this._isDragging) {
                this.map.dragPan.enable();
                this._draggingHandle = null;
                this._isDragging = false;
                this.renderArrows();
            }
        };
        canvas.addEventListener('mouseup', endDrag);
        canvas.addEventListener('mouseleave', endDrag);

        // Hover: update cursor based on arrow/handle proximity
        // Use map mousemove (works even when canvas has no pointer events)
        this.map.on('mousemove', (e) => {
            if (this._isDragging) return;
            if (!this.arrows.length) return;

            if (this._selectedArrowIdx >= 0) {
                const handle = this._findHandle(e.point.x, e.point.y, this.arrows[this._selectedArrowIdx]);
                canvas.style.cursor = handle ? 'grab' : 'default';
            } else {
                const hit = this._hitTestScreen(e.point.x, e.point.y);
                this.map.getCanvas().style.cursor = hit !== null ? 'pointer' : '';
            }
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this._selectedArrowIdx >= 0) {
                this._selectedArrowIdx = -1;
                canvas.style.pointerEvents = 'none';
                this.renderArrows();
            }
            if ((e.key === 'Delete' || e.key === 'Backspace') && this._selectedArrowIdx >= 0) {
                if (!e.target.matches('input, textarea, select')) {
                    this.removeArrow(this._selectedArrowIdx);
                    this._selectedArrowIdx = -1;
                    canvas.style.pointerEvents = 'none';
                    e.preventDefault();
                }
            }
        });
    }

    _findHandle(mx, my, arrow) {
        if (!arrow) return null;
        const p1 = this.map.project(arrow.from);
        const p2 = this.map.project(arrow.to);
        const dx = p2.x - p1.x, dy = p2.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / dist, ny = dx / dist;
        const co = dist * arrow.curve;
        const cp = { x: (p1.x + p2.x) / 2 + nx * co, y: (p1.y + p2.y) / 2 + ny * co };

        const handles = [
            { name: 'from', x: p1.x, y: p1.y },
            { name: 'to', x: p2.x, y: p2.y },
            { name: 'curve', x: cp.x, y: cp.y }
        ];
        const pickRadius = 16;
        for (const h of handles) {
            if (Math.sqrt((mx - h.x) ** 2 + (my - h.y) ** 2) < pickRadius) return h.name;
        }
        return null;
    }

    _hitTestScreen(mx, my) {
        if (!this.arrows || !this.arrows.length) return null;
        const threshold = 20;
        for (let i = this.arrows.length - 1; i >= 0; i--) {
            const arrow = this.arrows[i];
            const p1 = this.map.project(arrow.from);
            const p2 = this.map.project(arrow.to);
            const dx = p2.x - p1.x, dy = p2.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = -dy / dist, ny = dx / dist;
            const co = dist * arrow.curve;
            const cp = { x: (p1.x + p2.x) / 2 + nx * co, y: (p1.y + p2.y) / 2 + ny * co };

            for (let t = 0; t <= 1; t += 0.02) {
                const bx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cp.x + t * t * p2.x;
                const by = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cp.y + t * t * p2.y;
                if (Math.sqrt((mx - bx) ** 2 + (my - by) ** 2) < threshold) return i;
            }
        }
        return null;
    }

    // ─── Year overlay ───

    setYearOverlay(text, highlight = false) {
        const overlay = document.getElementById('yearOverlay');
        if (overlay) {
            overlay.textContent = text;
            overlay.classList.add('visible');
            if (highlight) overlay.classList.add('highlight');
            else overlay.classList.remove('highlight');
        }
    }

    hideYearOverlay() {
        const overlay = document.getElementById('yearOverlay');
        if (overlay) {
            overlay.classList.remove('visible');
            overlay.classList.remove('highlight');
        }
    }

    // ─── Markers ───

    addMarker(element, lngLat, anchor = 'center') {
        if (isNaN(lngLat[0]) || isNaN(lngLat[1])) {
            console.error('Invalid coordinates for marker:', lngLat);
            return null;
        }

        if (element.classList.contains('map-bubble')) {
            const pixel = this.map.project(lngLat);
            const bubbleWidth = 420;
            const bubbleHeight = 80;

            const yearBadgeArea = { left: 0, top: 0, right: 300, bottom: 100 };
            let offsetY = 0;

            if (pixel.x < yearBadgeArea.right && pixel.y < yearBadgeArea.bottom) {
                offsetY = yearBadgeArea.bottom - pixel.y + 20;
            }

            for (const pos of this.bubblePositions) {
                const dx = Math.abs(pixel.x - pos.x);
                const dy = Math.abs(pixel.y + offsetY - pos.y);
                if (dx < bubbleWidth / 2 && dy < bubbleHeight) {
                    offsetY += bubbleHeight + 10;
                }
            }

            if (offsetY > 0) {
                const newLatLng = this.map.unproject([pixel.x, pixel.y + offsetY]);
                lngLat = [newLatLng.lng, newLatLng.lat];
            }

            const finalPixel = this.map.project(lngLat);
            this.bubblePositions.push({ x: finalPixel.x, y: finalPixel.y });
        }

        const isEffect = element.classList.contains('map-effect');
        const isLabel = element.classList.contains('country-name-label');
        // All placed markers are draggable except country name labels
        const isDraggable = !isLabel;

        const marker = new maplibregl.Marker({
            element,
            anchor,
            draggable: isDraggable
        })
            .setLngLat(lngLat)
            .addTo(this.map);

        // Make all placed markers interactive (draggable)
        if (isDraggable && !isLabel) {
            element.style.pointerEvents = 'auto';
            element.style.cursor = 'grab';
            marker.on('dragstart', () => { element.style.cursor = 'grabbing'; });
            marker.on('dragend', () => { element.style.cursor = 'grab'; });
        }

        // Effects get extra selection/edit behavior
        if (isEffect) {
            // Use click (not mousedown) for selection so it doesn't block drag
            element.addEventListener('click', (e) => {
                if (e.button === 0) {
                    e.stopPropagation();
                    this._selectEffect(marker);
                }
            });

            element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._selectEffect(marker);
                const lngLat = marker.getLngLat();
                const point = this.map.project([lngLat.lng, lngLat.lat]);
                this.map.fire('contextmenu', {
                    point: point,
                    lngLat: lngLat,
                    originalEvent: e,
                    _effectMarker: marker
                });
            });
        }

        this.markers.push(marker);
        this.lastMarker = marker;
        return marker;
    }

    _selectEffect(marker) {
        // Deselect previous
        if (this._selectedEffectMarker && this._selectedEffectMarker !== marker) {
            this._selectedEffectMarker.getElement().classList.remove('fx-selected');
        }
        this._selectedEffectMarker = marker;
        marker.getElement().classList.add('fx-selected');
    }

    deselectEffect() {
        if (this._selectedEffectMarker) {
            this._selectedEffectMarker.getElement().classList.remove('fx-selected');
            this._selectedEffectMarker = null;
        }
    }

    removeSelectedEffect() {
        if (!this._selectedEffectMarker) return;
        const marker = this._selectedEffectMarker;
        marker.remove();
        this.markers = this.markers.filter(m => m !== marker);
        this.lastMarker = this.markers[this.markers.length - 1] || null;
        this._selectedEffectMarker = null;
    }

    removeEffects() {
        this.markers = this.markers.filter(m => {
            const el = m.getElement();
            if (el && el.classList.contains('map-effect')) {
                m.remove();
                return false;
            }
            return true;
        });
        this.lastMarker = this.markers[this.markers.length - 1] || null;
    }

    removeLastMarker() {
        if (this.lastMarker) {
            const element = this.lastMarker.getElement();
            if (element && element.classList.contains('map-bubble')) {
                this.bubblePositions.pop();
            }

            this.lastMarker.remove();
            this.markers = this.markers.filter(m => m !== this.lastMarker);
            this.lastMarker = this.markers[this.markers.length - 1] || null;
        }
    }

    // ─── Legend ───

    addLegendEntry(label, color) {
        this.legendEntries.push({ label, color });
        this.renderLegend();
    }

    generateAutoLegend(commands) {
        this.legendEntries = [];
        const seen = new Set();
        commands.forEach(cmd => {
            if (cmd.type === 'country' && cmd.color) {
                const color = CONFIG.colors[cmd.color] || cmd.color;
                if (!seen.has(color)) {
                    seen.add(color);
                    this.legendEntries.push({ label: cmd.name, color });
                }
            }
        });
        this.renderLegend();
    }

    renderLegend() {
        if (this.legendElement) this.legendElement.remove();
        if (this.legendEntries.length === 0) return;

        const container = document.querySelector('.map-container');
        this.legendElement = document.createElement('div');
        this.legendElement.className = 'map-legend';

        this.legendEntries.forEach(entry => {
            const row = document.createElement('div');
            row.className = 'legend-row';
            row.innerHTML = `<span class="legend-swatch" style="background:${entry.color}"></span><span class="legend-label">${entry.label}</span>`;
            this.legendElement.appendChild(row);
        });

        container.appendChild(this.legendElement);
    }

    hideLegend() {
        if (this.legendElement) {
            this.legendElement.remove();
            this.legendElement = null;
        }
        this.legendEntries = [];
    }

    // ─── Clear all ───

    clearAll() {
        // Remove all layers
        this.layers.forEach(id => {
            if (this.map.getLayer(id)) this.map.removeLayer(id);
        });
        this.layers = [];

        // Remove all tracked sources
        for (const id of this.sourceIds) {
            if (this.map.getSource(id)) this.map.removeSource(id);
        }
        this.sourceIds.clear();

        // Remove markers
        this.markers.forEach(m => m.remove());
        this.markers = [];
        this.lastMarker = null;

        this.hideYearOverlay();
        this.hideLegend();
        this.clearAttackArrows();

        this.lineStartCountry = null;
        this.bubblePositions = [];
        this._coloredFeatures = [];
    }

    // ─── Camera ───

    flyTo(lat, lng, zoom) {
        this.map.flyTo({
            center: [lng, lat],
            zoom,
            pitch: 0,
            bearing: 0,
            duration: 1200
        });
    }

    cinematicFlyTo(lat, lng, zoom, pitch = 30, bearing = 0) {
        this.map.flyTo({
            center: [lng, lat],
            zoom,
            pitch: Math.min(30, Math.max(0, pitch)),
            bearing: bearing % 360,
            duration: 2000,
            essential: true
        });
    }

    zoomToFeature(feature) {
        const bounds = this.geoData.getBounds(feature.geometry);
        this.map.fitBounds(bounds, {
            padding: 50,
            maxZoom: 8,
            pitch: 0,
            bearing: 0
        });
    }

    // ─── Query ───

    queryFeatures(point) {
        const regions = this.map.queryRenderedFeatures(point, { layers: ['hover-regions'] });
        const countries = this.map.queryRenderedFeatures(point, { layers: ['hover-countries'] });

        if (regions.length) {
            const p = regions[0].properties;
            const countryName = countries.length
                ? (countries[0].properties.NAME || countries[0].properties.ADMIN)
                : (p.admin || p.ADMIN);
            return {
                type: 'region',
                name: p.name || p.NAME,
                country: p.admin || p.ADMIN,
                countryName: countryName
            };
        }

        if (countries.length) {
            const p = countries[0].properties;
            return { type: 'country', name: p.NAME || p.ADMIN };
        }

        return null;
    }

    getZoom() { return this.map.getZoom(); }
    getPitch() { return this.map.getPitch(); }
    getBearing() { return this.map.getBearing(); }

    getCenter() {
        const center = this.map.getCenter();
        return { lat: center.lat, lng: center.lng };
    }

    on(event, handler) {
        this.map.on(event, handler);
    }

    off(event, handler) {
        this.map.off(event, handler);
    }
}
