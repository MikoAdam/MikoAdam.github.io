/**
 * MapRenderer - Handles map display, layers, and markers
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
    }

    async init() {
        this.map = new maplibregl.Map({
            container: this.containerId,
            style: CONFIG.styles.liberty,
            center: [10, 50],
            zoom: 4,
            attributionControl: false,
            preserveDrawingBuffer: true
        });

        this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

        return new Promise(resolve => {
            this.map.on('load', () => {
                this.hideClutter();
                this.setupHoverLayers();
                resolve();
            });
        });
    }

    hideClutter() {
        const layersToHide = [
            'park',
            'park_outline',
            'landcover_wood',
            'landcover_grass',
            'landuse_residential',
            'landuse_pitch',
            'landuse_track',
            'landuse_cemetery',
            'landuse_hospital',
            'landuse_school',
            'poi_r20',
            'poi_r7',
            'poi_r1',
            'poi_transit',
            'airport'
        ];

        layersToHide.forEach(id => {
            if (this.map.getLayer(id)) {
                this.map.setLayoutProperty(id, 'visibility', 'none');
            }
        });
    }

    setStyle(styleKey) {
        this.removeBorderLayer();
        this.removeLabelMarkers();

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

            if (styleKey === 'satellite') {
                this.showBorders = true;
                this.showLabels = true;
                document.getElementById('showBorders').checked = true;
                document.getElementById('showLabels').checked = true;
                this.addBorderLayer();
                this.addLabelMarkers();
            } else {
                this.hideClutter();
                this.showBorders = false;
                this.showLabels = false;
                document.getElementById('showBorders').checked = false;
                document.getElementById('showLabels').checked = false;
            }
        });
    }

    updateAttribution(type) {
        const el = document.getElementById('attribution');
        if (type === 'satellite') {
            el.innerHTML = '<a href="https://earthdata.nasa.gov/gibs" target="_blank">NASA Blue Marble</a> · <a href="https://naturalearthdata.com" target="_blank">Natural Earth</a>';
        } else {
            el.innerHTML = '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> · <a href="https://naturalearthdata.com" target="_blank">Natural Earth</a>';
        }
    }

    setupHoverLayers() {
        if (!this.geoData.countries) return;

        if (!this.map.getSource('hover-countries')) {
            this.map.addSource('hover-countries', { type: 'geojson', data: this.geoData.countries });
            this.map.addLayer({ id: 'hover-countries', type: 'fill', source: 'hover-countries', paint: { 'fill-opacity': 0 } });
        }

        if (!this.map.getSource('hover-regions')) {
            this.map.addSource('hover-regions', { type: 'geojson', data: this.geoData.regions });
            this.map.addLayer({ id: 'hover-regions', type: 'fill', source: 'hover-regions', paint: { 'fill-opacity': 0 } });
        }

        const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, className: 'hover-popup' });

        this.map.on('mousemove', 'hover-regions', e => {
            if (e.features[0]) {
                const p = e.features[0].properties;
                const name = p.name || p.NAME;
                const parent = p.admin || p.ADMIN;
                popup.setLngLat(e.lngLat).setHTML(`<strong>${name}</strong> · ${parent}`).addTo(this.map);
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

        this.map.addSource('border-layer', { type: 'geojson', data: this.geoData.countries });
        this.map.addLayer({
            id: 'border-lines',
            type: 'line',
            source: 'border-layer',
            paint: { 'line-color': '#fff', 'line-width': 1, 'line-opacity': 0.6 }
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
    }

    removeLabelMarkers() {
        this.labelMarkers.forEach(m => m.remove());
        this.labelMarkers = [];
    }

    drawFeature(feature, color) {
        const id = 'layer-' + (++this.layerCounter);

        this.map.addSource(id, { type: 'geojson', data: feature });
        this.map.addLayer({
            id: id + '-fill',
            type: 'fill',
            source: id,
            paint: { 'fill-color': color, 'fill-opacity': 0.6 }
        });
        this.map.addLayer({
            id: id + '-line',
            type: 'line',
            source: id,
            paint: { 'line-color': color, 'line-width': 2 }
        });

        this.layers.push(id, id + '-fill', id + '-line');
    }

    addMarker(element, lngLat, anchor = 'center') {
        const marker = new maplibregl.Marker({ element, anchor })
            .setLngLat(lngLat)
            .addTo(this.map);
        this.markers.push(marker);
        this.lastMarker = marker;
        return marker;
    }

    removeLastMarker() {
        if (this.lastMarker) {
            this.lastMarker.remove();
            this.markers = this.markers.filter(m => m !== this.lastMarker);
            this.lastMarker = this.markers[this.markers.length - 1] || null;
        }
    }

    clearAll() {
        this.layers.forEach(id => {
            if (this.map.getLayer(id)) {
                this.map.removeLayer(id);
            }
        });

        this.layers.forEach(id => {
            if (!id.endsWith('-fill') && !id.endsWith('-line')) {
                if (this.map.getSource(id)) {
                    this.map.removeSource(id);
                }
            }
        });

        this.layers = [];

        this.markers.forEach(m => m.remove());
        this.markers = [];
        this.lastMarker = null;
    }

    flyTo(lat, lng, zoom) {
        this.map.flyTo({ center: [lng, lat], zoom, duration: 1200 });
    }

    zoomToFeature(feature) {
        const bounds = this.geoData.getBounds(feature.geometry);
        this.map.fitBounds(bounds, { padding: 50, maxZoom: 8 });
    }

    queryFeatures(point) {
        const regions = this.map.queryRenderedFeatures(point, { layers: ['hover-regions'] });
        if (regions.length) {
            const p = regions[0].properties;
            return { type: 'region', name: p.name || p.NAME, country: p.admin || p.ADMIN };
        }

        const countries = this.map.queryRenderedFeatures(point, { layers: ['hover-countries'] });
        if (countries.length) {
            const p = countries[0].properties;
            return { type: 'country', name: p.NAME || p.ADMIN };
        }

        return null;
    }

    getZoom() {
        return this.map.getZoom();
    }

    on(event, handler) {
        this.map.on(event, handler);
    }
}