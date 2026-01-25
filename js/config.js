/**
 * Pillars of Creation Maps - Configuration
 * Colors, data sources, examples, and settings
 */

const CONFIG = {
    // Map styles
    styles: {
        liberty: 'https://tiles.openfreemap.org/styles/liberty',
        satellite: 'nasa-satellite'
    },

    // Color palette
    colors: {
        // Primary colors
        red: '#ef4444',
        orange: '#f97316',
        yellow: '#eab308',
        gold: '#f59e0b',
        green: '#22c55e',
        blue: '#3b82f6',
        cyan: '#06b6d4',
        purple: '#a855f7',
        pink: '#ec4899',
        magenta: '#d946ef',
        
        // NATO expansion theme
        founding: '#8b5cf6',
        southern: '#14b8a6',
        coldwar: '#f59e0b',
        expansion99: '#f97316',
        bigbang: '#3b82f6',
        balkans: '#ec4899',
        nordic: '#ef4444',
        
        // Utilities
        white: '#ffffff',
        maroon: '#991b1b',
        coral: '#fb7185',
        salmon: '#fca5a5',
        tan: '#d6d3d1',
        brown: '#78350f',
        navy: '#1e3a8a',
        lime: '#84cc16'
    },

    // Data sources
    data: {
        countries: './data/countries.geojson',
        regions: './data/regions.geojson',
        // Fallback URLs if local files don't exist
        countriesFallback: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson',
        regionsFallback: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson'
    },

    // Country name aliases for easier searching
    aliases: {
        usa: 'united states of america',
        us: 'united states of america',
        america: 'united states of america',
        uk: 'united kingdom',
        britain: 'united kingdom',
        england: 'united kingdom',
        uae: 'united arab emirates',
        czech: 'czechia',
        russia: 'russian federation',
        holland: 'netherlands'
    },

    // Satellite imagery settings
    satellite: {
        tiles: 'https://gibs-a.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg',
        maxZoom: 8
    }
};

// Example scripts