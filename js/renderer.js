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
        this.attackArrows = []; // Track attack arrows separately
    }

    /**
     * Hide clutter layers from base map
     */
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

    /**
     * Initialize map
     */
    async init() {
        // Fetch the style and ensure no center/zoom is set
        let style;
        try {
            const response = await fetch(CONFIG.styles.liberty);
            style = await response.json();
            // Remove any center/zoom from style
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

    /**
     * Update label sizes based on zoom level
     */
    updateLabelSizes() {
        const zoom = this.map.getZoom();
        const baseSize = Math.max(8, Math.min(14, zoom * 1.5));
        
        document.querySelectorAll('.country-name-label').forEach(label => {
            label.style.fontSize = baseSize + 'px';
        });
    }

    /**
     * Change map style
     */
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

    /**
     * Update attribution text
     */
    updateAttribution(type) {
        const el = document.querySelector('.map-attribution');
        if (type === 'satellite') {
            el.innerHTML = '<a href="https://earthdata.nasa.gov/gibs" target="_blank">NASA GIBS</a> (public domain)';
        } else {
            el.innerHTML = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> · <a href="https://naturalearthdata.com" target="_blank">Natural Earth</a>';
        }
    }

    /**
     * Setup hover interaction layers
     */
    setupHoverLayers() {
        if (!this.geoData.countries) return;

        // Store current view
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

        // Restore view after adding sources (prevent auto-zoom)
        this.map.jumpTo({ center: currentCenter, zoom: currentZoom });

        // Hover popup
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

    /**
     * Toggle border overlay (for satellite view)
     */
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

    /**
     * Toggle country name labels
     */
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
     * Create diagonal stripe pattern for disputed territories
     */
    createStripePattern(patternId, color) {
        // This is a placeholder - MapLibre uses sprites for patterns
        // The visual effect is achieved through multiple line layers instead
    }

    /**
     * Draw a GeoJSON feature with color and animation
     */
    drawFeature(feature, color, animation = 'none') {
        const id = 'layer-' + (++this.layerCounter);

        this.map.addSource(id, { type: 'geojson', data: feature });
        
        // Check if this is a striped/disputed pattern
        if (animation === 'striped' || animation === 'disputed' || animation === 'occupied') {
            // Create diagonal stripe pattern
            const patternId = 'stripe-' + id;
            this.createStripePattern(patternId, color);
            
            // Semi-transparent fill as base
            this.map.addLayer({
                id: id + '-fill',
                type: 'fill',
                source: id,
                paint: { 
                    'fill-color': color, 
                    'fill-opacity': 0.25
                }
            });
            
            // Dashed border to indicate disputed
            this.map.addLayer({
                id: id + '-line',
                type: 'line',
                source: id,
                paint: { 
                    'line-color': color, 
                    'line-width': 3,
                    'line-opacity': 1,
                    'line-dasharray': [6, 4]
                }
            });
            
            // Add a second dashed line slightly offset for stripe effect
            this.map.addLayer({
                id: id + '-stripes',
                type: 'line',
                source: id,
                paint: { 
                    'line-color': color, 
                    'line-width': 1.5,
                    'line-opacity': 0.7,
                    'line-dasharray': [2, 6],
                    'line-offset': 5
                }
            });
            
            this.layers.push(id, id + '-fill', id + '-line', id + '-stripes');
            return;
        }
        
        // Fill layer
        this.map.addLayer({
            id: id + '-fill',
            type: 'fill',
            source: id,
            paint: { 
                'fill-color': color, 
                'fill-opacity': 0 
            }
        });

        // Border
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
            // Instant
            setTimeout(() => {
                this.map.setPaintProperty(id + '-fill', 'fill-opacity', 0.7);
                this.map.setPaintProperty(id + '-line', 'line-width', 4);
                this.map.setPaintProperty(id + '-line', 'line-opacity', 0.9);
            }, 50);
        }

        this.layers.push(id, id + '-fill', id + '-line');
    }

    /**
     * Draw line between two countries
     */
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
     * Draw military-style attack arrow (DOM-based, with proper cleanup)
     */
    drawAttackArrow(fromFeature, toFeature, color) {
        const fromCenter = this.geoData.getCenter(fromFeature.geometry, fromFeature.properties.NAME);
        const toCenter = this.geoData.getCenter(toFeature.geometry, toFeature.properties.NAME);

        // Create arrow container
        const arrowEl = document.createElement('div');
        arrowEl.className = 'map-attack-arrow';
        arrowEl.style.color = CONFIG.colors[color] || color || '#ef4444';

        // Calculate distance and angle
        const fromPixel = this.map.project(fromCenter);
        const toPixel = this.map.project(toCenter);
        const dx = toPixel.x - fromPixel.x;
        const dy = toPixel.y - fromPixel.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Create line and arrowhead
        arrowEl.innerHTML = `
            <div class="map-attack-arrow-line" style="width: ${distance}px;"></div>
            <div class="map-attack-arrow-head"></div>
        `;

        // Position and rotate
        arrowEl.style.position = 'absolute';
        arrowEl.style.left = fromPixel.x + 'px';
        arrowEl.style.top = fromPixel.y + 'px';
        arrowEl.style.transform = `rotate(${angle}deg)`;
        arrowEl.style.transformOrigin = '0 50%';

        // Add to map
        document.getElementById('map').appendChild(arrowEl);

        // Update position on map move/zoom
        const updatePosition = () => {
            if (!arrowEl.parentNode) return; // Check if still in DOM
            
            const newFromPixel = this.map.project(fromCenter);
            const newToPixel = this.map.project(toCenter);
            const newDx = newToPixel.x - newFromPixel.x;
            const newDy = newToPixel.y - newFromPixel.y;
            const newDistance = Math.sqrt(newDx * newDx + newDy * newDy);
            const newAngle = Math.atan2(newDy, newDx) * (180 / Math.PI);

            arrowEl.style.left = newFromPixel.x + 'px';
            arrowEl.style.top = newFromPixel.y + 'px';
            arrowEl.style.transform = `rotate(${newAngle}deg)`;
            
            const lineEl = arrowEl.querySelector('.map-attack-arrow-line');
            if (lineEl) lineEl.style.width = newDistance + 'px';
        };

        this.map.on('move', updatePosition);
        this.map.on('zoom', updatePosition);

        // Store for cleanup with proper removal function
        const arrowData = { 
            element: arrowEl, 
            updatePosition,
            remove: () => {
                if (arrowEl.parentNode) {
                    arrowEl.remove();
                }
                this.map.off('move', updatePosition);
                this.map.off('zoom', updatePosition);
            }
        };
        
        this.attackArrows.push(arrowData);
    }

    /**
     * Clear all attack arrows
     */
    clearAttackArrows() {
        this.attackArrows.forEach(arrow => arrow.remove());
        this.attackArrows = [];
    }

    /**
     * Set the fixed year overlay in upper left corner
     */
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

    /**
     * Hide the year overlay
     */
    hideYearOverlay() {
        const overlay = document.getElementById('yearOverlay');
        if (overlay) {
            overlay.classList.remove('visible');
            overlay.classList.remove('highlight');
        }
    }

    /**
     * Add a marker to the map
     */
    addMarker(element, lngLat, anchor = 'center') {
        // Validate coordinates
        if (isNaN(lngLat[0]) || isNaN(lngLat[1])) {
            console.error('Invalid coordinates for marker:', lngLat);
            return null;
        }
        
        // For bubbles, check for overlaps
        if (element.classList.contains('map-bubble')) {
            const pixel = this.map.project(lngLat);
            const bubbleWidth = 400;
            const bubbleHeight = 80;
            
            let offsetY = 0;
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

    /**
     * Remove the last added marker
     */
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

    /**
     * Clear all drawn layers and markers
     */
    clearAll() {
        // Clear map layers
        this.layers.forEach(id => {
            if (this.map.getLayer(id)) this.map.removeLayer(id);
        });

        this.layers.forEach(id => {
            if (!id.endsWith('-fill') && !id.endsWith('-line') && !id.endsWith('-stripes')) {
                if (this.map.getSource(id)) this.map.removeSource(id);
            }
        });

        this.layers = [];
        
        // Clear markers
        this.markers.forEach(m => m.remove());
        this.markers = [];
        this.lastMarker = null;
        
        // Clear attack arrows properly
        this.attackArrows.forEach(arrow => arrow.remove());
        this.attackArrows = [];
        
        // Hide year overlay
        this.hideYearOverlay();
        
        this.lineStartCountry = null;
        this.bubblePositions = [];
    }

    /**
     * Standard fly-to animation
     */
    flyTo(lat, lng, zoom) {
        this.map.flyTo({ 
            center: [lng, lat], 
            zoom, 
            pitch: 0, 
            bearing: 0, 
            duration: 1200 
        });
    }

    /**
     * Cinematic camera with 3D tilt and rotation (capped at reasonable values)
     */
    cinematicFlyTo(lat, lng, zoom, pitch = 45, bearing = 0) {
        this.map.flyTo({ 
            center: [lng, lat], 
            zoom, 
            pitch: Math.min(45, Math.max(0, pitch)), // Max 45 degree tilt
            bearing: bearing % 360,
            duration: 2000,
            essential: true
        });
    }

    /**
     * Zoom to fit a feature's bounds
     */
    zoomToFeature(feature) {
        const bounds = this.geoData.getBounds(feature.geometry);
        this.map.fitBounds(bounds, { 
            padding: 50, 
            maxZoom: 8, 
            pitch: 0, 
            bearing: 0 
        });
    }

    /**
     * Query features at a point
     */
    queryFeatures(point) {
        const regions = this.map.queryRenderedFeatures(point, { layers: ['hover-regions'] });
        const countries = this.map.queryRenderedFeatures(point, { layers: ['hover-countries'] });
        
        // If we have a region, return it with country info attached
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

        // Just country
        if (countries.length) {
            const p = countries[0].properties;
            return { 
                type: 'country', 
                name: p.NAME || p.ADMIN 
            };
        }

        return null;
    }

    /**
     * Get current map state
     */
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

    /**
     * Register event handler
     */
    on(event, handler) {
        this.map.on(event, handler);
    }
}