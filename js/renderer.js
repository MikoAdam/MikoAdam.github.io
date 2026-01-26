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
        this.markers = [];
        this.labelMarkers = [];
        this.layerCounter = 0;
        this.lastMarker = null;
        this.showBorders = false;
        this.showLabels = false;
        this.lineStartCountry = null;
        this.bubblePositions = [];
        this.attackArrows = [];
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
        
        let r = parseInt(hex.slice(1,3), 16);
        let g = parseInt(hex.slice(3,5), 16);
        let b = parseInt(hex.slice(5,7), 16);
        
        r = Math.max(0, Math.min(255, Math.round(r + (255 * percent / 100))));
        g = Math.max(0, Math.min(255, Math.round(g + (255 * percent / 100))));
        b = Math.max(0, Math.min(255, Math.round(b + (255 * percent / 100))));
        
        return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
    }

    /**
     * Create SVG pattern for proper 45-degree diagonal stripes
     */
    createDiagonalPattern(id, color1, color2) {
        if (!this.map.hasImage(id)) {
            const size = 32;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Background color
            ctx.fillStyle = color2;
            ctx.fillRect(0, 0, size, size);

            // Diagonal stripes at 45 degrees
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
        this.map.on('zoom', () => this.updateLabelSizes());

        return new Promise(resolve => {
            this.map.on('load', () => {
                this.hideClutter();
                this.setupHoverLayers();
                resolve();
            });
        });
    }

    updateLabelSizes() {
        const zoom = this.map.getZoom();
        const baseSize = Math.max(8, Math.min(14, zoom * 1.5));
        
        document.querySelectorAll('.country-name-label').forEach(label => {
            label.style.fontSize = baseSize + 'px';
        });
    }

    setStyle(styleKey) {
        this.removeBorderLayer();
        this.removeLabelMarkers();
        
        document.getElementById('showBorders').checked = false;
        document.getElementById('showLabels').checked = false;
        this.showBorders = false;
        this.showLabels = false;

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

        this.map.once('styledata', () => {
            this.setupHoverLayers();
            
            if (styleKey !== 'satellite') {
                setTimeout(() => {
                    this.hideClutter();
                }, 100);
            }
            
            if (styleKey === 'satellite') {
                this.showLabels = true;
                document.getElementById('showLabels').checked = true;
                this.addLabelMarkers();
            }
        });
    }

    updateAttribution(type) {
        const el = document.querySelector('.map-attribution');
        if (type === 'satellite') {
            el.innerHTML = '<a href="https://earthdata.nasa.gov/gibs" target="_blank">NASA GIBS</a> (public domain)';
        } else {
            el.innerHTML = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> · <a href="https://naturalearthdata.com" target="_blank">Natural Earth</a>';
        }
    }

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

    /**
     * Draw feature with proper diagonal stripes for occupied territories
     */
    drawFeature(feature, color, animation = 'none') {
        const id = 'layer-' + (++this.layerCounter);

        this.map.addSource(id, { type: 'geojson', data: feature });
        
        // DIAGONAL STRIPES for occupied territories (like Wikipedia military maps)
        if (animation === 'striped' || animation === 'disputed' || animation === 'occupied') {
            const patternId = 'stripe-pattern-' + id;
            const baseColor = color;
            const stripeColor = this.adjustColorBrightness(color, -30);
            
            // Create the diagonal stripe pattern
            this.createDiagonalPattern(patternId, stripeColor, baseColor);
            
            // Fill with pattern
            this.map.addLayer({
                id: id + '-fill',
                type: 'fill',
                source: id,
                paint: { 
                    'fill-pattern': patternId,
                    'fill-opacity': 0.8
                }
            });
            
            // Bold dashed border
            this.map.addLayer({
                id: id + '-line',
                type: 'line',
                source: id,
                paint: { 
                    'line-color': stripeColor, 
                    'line-width': 3,
                    'line-opacity': 1,
                    'line-dasharray': [6, 3]
                }
            });
            
            this.layers.push(id, id + '-fill', id + '-line');
            return;
        }
        
        // Normal fills (for non-occupied)
        this.map.addLayer({
            id: id + '-fill',
            type: 'fill',
            source: id,
            paint: { 
                'fill-color': color, 
                'fill-opacity': 0 
            }
        });

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

        // Animations
        if (animation === 'pulse') {
            let step = 0;
            const totalSteps = 80;
            const interval = setInterval(() => {
                step++;
                const progress = step / totalSteps;
                const eased = 1 - Math.pow(1 - progress, 3);
                
                const opacity = eased * 0.7;
                const lineWidth = 6 - (eased * 2);
                const lineOpacity = Math.min(eased * 1.2, 1);
                
                this.map.setPaintProperty(id + '-fill', 'fill-opacity', opacity);
                this.map.setPaintProperty(id + '-line', 'line-width', lineWidth);
                this.map.setPaintProperty(id + '-line', 'line-opacity', lineOpacity);
                
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
                const opacity = progress * 0.7;
                
                this.map.setPaintProperty(id + '-fill', 'fill-opacity', opacity);
                this.map.setPaintProperty(id + '-line', 'line-width', 3);
                this.map.setPaintProperty(id + '-line', 'line-opacity', opacity);
                
                if (step >= totalSteps) {
                    clearInterval(interval);
                }
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
                
                const opacity = eased * 0.7;
                const lineWidth = 8 - (eased * 4);
                const lineOpacity = Math.min(eased * 1.5, 1);
                
                this.map.setPaintProperty(id + '-fill', 'fill-opacity', opacity);
                this.map.setPaintProperty(id + '-line', 'line-width', lineWidth);
                this.map.setPaintProperty(id + '-line', 'line-opacity', lineOpacity);
                
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
                
                const fillOpacity = Math.max(0, (progress - 0.3) / 0.7) * 0.7;
                const lineWidth = 8 - (progress * 4);
                
                this.map.setPaintProperty(id + '-fill', 'fill-opacity', fillOpacity);
                this.map.setPaintProperty(id + '-line', 'line-width', lineWidth);
                
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

        this.layers.push(id, id + '-fill', id + '-line');
    }

    drawLine(fromFeature, toFeature, color) {
        const id = 'line-' + (++this.layerCounter);
        const fromCenter = this.geoData.getCenter(fromFeature.geometry, fromFeature.properties.NAME);
        const toCenter = this.geoData.getCenter(toFeature.geometry, toFeature.properties.NAME);

        const lineGeoJSON = {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [fromCenter, toCenter]
            }
        };

        this.map.addSource(id, { type: 'geojson', data: lineGeoJSON });
        this.map.addLayer({
            id: id + '-line',
            type: 'line',
            source: id,
            paint: {
                'line-color': color,
                'line-width': 2,
                'line-opacity': 0.8
            }
        });

        this.layers.push(id, id + '-line');
    }

    /**
     * Wikipedia-style thick curved attack arrow with outline
     */
    drawAttackArrow(fromFeature, toFeature, color) {
        const id = 'attack-' + (++this.layerCounter);
        const fromCenter = this.geoData.getCenter(fromFeature.geometry, fromFeature.properties.NAME);
        const toCenter = this.geoData.getCenter(toFeature.geometry, toFeature.properties.NAME);

        // Calculate control point for curved arrow
        const midX = (fromCenter[0] + toCenter[0]) / 2;
        const midY = (fromCenter[1] + toCenter[1]) / 2;
        const dx = toCenter[0] - fromCenter[0];
        const dy = toCenter[1] - fromCenter[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const offset = distance * 0.15;
        const perpX = -dy / distance * offset;
        const perpY = dx / distance * offset;
        const controlPoint = [midX + perpX, midY + perpY];

        // Create smooth curve - BUT STOP BEFORE THE END for arrowhead
        const curvePoints = [];
        const steps = 60;
        const stopBeforeEnd = 0.88; // Stop at 88% to leave room for arrowhead
        
        for (let i = 0; i <= steps * stopBeforeEnd; i++) {
            const t = i / steps;
            const x = Math.pow(1-t, 2) * fromCenter[0] + 2 * (1-t) * t * controlPoint[0] + Math.pow(t, 2) * toCenter[0];
            const y = Math.pow(1-t, 2) * fromCenter[1] + 2 * (1-t) * t * controlPoint[1] + Math.pow(t, 2) * toCenter[1];
            curvePoints.push([x, y]);
        }

        // Black outline (thicker)
        this.map.addSource(id + '-outline', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: curvePoints
                }
            }
        });

        this.map.addLayer({
            id: id + '-outline',
            type: 'line',
            source: id + '-outline',
            paint: {
                'line-color': '#000',
                'line-width': 10,
                'line-opacity': 0.7
            }
        });

        // Main colored line
        this.map.addSource(id, {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: curvePoints
                }
            }
        });

        this.map.addLayer({
            id: id + '-line',
            type: 'line',
            source: id,
            paint: {
                'line-color': color,
                'line-width': 7,
                'line-opacity': 1
            }
        });

        // Arrow head positioned AT THE END (not at line end)
        const angle = Math.atan2(toCenter[1] - controlPoint[1], toCenter[0] - controlPoint[0]);
        
        const arrowSize = 0.35;
        const arrowAngle = Math.PI / 5;
        
        const arrowPoints = [
            toCenter, // Tip at actual target
            [
                toCenter[0] - arrowSize * Math.cos(angle - arrowAngle),
                toCenter[1] - arrowSize * Math.sin(angle - arrowAngle)
            ],
            [
                toCenter[0] - arrowSize * Math.cos(angle + arrowAngle),
                toCenter[1] - arrowSize * Math.sin(angle + arrowAngle)
            ],
            toCenter
        ];

        // Arrowhead outline (black)
        this.map.addSource(id + '-head-outline', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [arrowPoints]
                }
            }
        });

        this.map.addLayer({
            id: id + '-head-outline',
            type: 'fill',
            source: id + '-head-outline',
            paint: {
                'fill-color': '#000',
                'fill-opacity': 0.7
            }
        });

        this.map.addLayer({
            id: id + '-head-outline-line',
            type: 'line',
            source: id + '-head-outline',
            paint: {
                'line-color': '#000',
                'line-width': 3,
                'line-opacity': 0.7
            }
        });

        // Arrowhead fill (colored) - slightly inset
        const insetPoints = arrowPoints.map(p => [
            p[0] + 0.01 * Math.cos(angle),
            p[1] + 0.01 * Math.sin(angle)
        ]);

        this.map.addSource(id + '-head', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: [insetPoints]
                }
            }
        });

        this.map.addLayer({
            id: id + '-head',
            type: 'fill',
            source: id + '-head',
            paint: {
                'fill-color': color,
                'fill-opacity': 1
            }
        });

        this.layers.push(id, id + '-outline', id + '-line', id + '-head', id + '-head-outline', id + '-head-outline-line');
    }

    clearAttackArrows() {
        const attackLayers = this.layers.filter(l => l.startsWith('attack-'));
        attackLayers.forEach(id => {
            if (this.map.getLayer(id)) this.map.removeLayer(id);
            if (this.map.getSource(id)) this.map.removeSource(id);
        });
        this.layers = this.layers.filter(l => !l.startsWith('attack-'));
    }

    setYearOverlay(text, highlight = false) {
        const overlay = document.getElementById('yearOverlay');
        if (overlay) {
            overlay.textContent = text;
            overlay.classList.add('visible');
            if (highlight) {
                overlay.classList.add('highlight');
            } else {
                overlay.classList.remove('highlight');
            }
        }
    }

    hideYearOverlay() {
        const overlay = document.getElementById('yearOverlay');
        if (overlay) {
            overlay.classList.remove('visible');
            overlay.classList.remove('highlight');
        }
    }

    addMarker(element, lngLat, anchor = 'center') {
        if (isNaN(lngLat[0]) || isNaN(lngLat[1])) {
            console.error('Invalid coordinates for marker:', lngLat);
            return null;
        }
        
        if (element.classList.contains('map-bubble')) {
            const pixel = this.map.project(lngLat);
            const bubbleWidth = 420;
            const bubbleHeight = 80;
            
            // Avoid year badge (top-left corner)
            const yearBadgeArea = {
                left: 0,
                top: 0,
                right: 300,
                bottom: 100
            };
            
            let offsetY = 0;
            
            // Check if bubble would overlap year badge
            if (pixel.x < yearBadgeArea.right && pixel.y < yearBadgeArea.bottom) {
                offsetY = yearBadgeArea.bottom - pixel.y + 20;
            }
            
            // Check for other bubble overlaps
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
        
        const marker = new maplibregl.Marker({ element, anchor })
            .setLngLat(lngLat)
            .addTo(this.map);
        this.markers.push(marker);
        this.lastMarker = marker;
        return marker;
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

    clearAll() {
        this.layers.forEach(id => {
            if (this.map.getLayer(id)) this.map.removeLayer(id);
        });

        this.layers.forEach(id => {
            if (!id.endsWith('-fill') && !id.endsWith('-line') && !id.endsWith('-head')) {
                if (this.map.getSource(id)) this.map.removeSource(id);
            }
        });

        this.layers = [];
        
        this.markers.forEach(m => m.remove());
        this.markers = [];
        this.lastMarker = null;
        
        this.clearAttackArrows();
        
        this.hideYearOverlay();
        
        this.lineStartCountry = null;
        this.bubblePositions = [];
    }

    flyTo(lat, lng, zoom) {
        this.map.flyTo({ 
            center: [lng, lat], 
            zoom, 
            pitch: 0, 
            bearing: 0, 
            duration: 1200 
        });
    }

    cinematicFlyTo(lat, lng, zoom, pitch = 45, bearing = 0) {
        this.map.flyTo({ 
            center: [lng, lat], 
            zoom, 
            pitch: Math.min(45, Math.max(0, pitch)),
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

    queryFeatures(point) {
        const regions = this.map.queryRenderedFeatures(point, { layers: ['hover-regions'] });
        const countries = this.map.queryRenderedFeatures(point, { layers: ['hover-countries'] });
        
        if (regions.length) {
            const p = regions[0].properties;
            const countryName = countries.length ? (countries[0].properties.NAME || countries[0].properties.ADMIN) : (p.admin || p.ADMIN);
            return { 
                type: 'region', 
                name: p.name || p.NAME, 
                country: p.admin || p.ADMIN,
                countryName: countryName
            };
        }

        if (countries.length) {
            const p = countries[0].properties;
            return { 
                type: 'country', 
                name: p.NAME || p.ADMIN 
            };
        }

        return null;
    }

    getZoom() {
        return this.map.getZoom();
    }

    getPitch() {
        return this.map.getPitch();
    }

    getBearing() {
        return this.map.getBearing();
    }

    getCenter() {
        const center = this.map.getCenter();
        return { lat: center.lat, lng: center.lng };
    }

    on(event, handler) {
        this.map.on(event, handler);
    }
}