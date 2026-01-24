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
const EXAMPLES = {
    nato: {
        title: 'NATO Expansion 1949-2024',
        description: 'Complete cinematic timeline with all 32 members',
        script: `# NATO Expansion 1949-2024 - CINEMATIC

# Opening shot
cinematic: 40, -40, 2, 25, 0
wait: 2s

# 1949 - Founding members
year: 40, -95, "1949", highlight
wait: 1s

bubble: 50, -75, "North Atlantic Treaty signed in Washington D.C.", white
wait: 3s

usa: founding, radial
canada: founding, radial
uk: founding, radial
france: founding, radial
belgium: founding, radial
netherlands: founding, radial
luxembourg: founding, radial
italy: founding, radial
portugal: founding, radial
iceland: founding, radial
norway: founding, radial
denmark: founding, radial

wait: 2s
remove: last

cinematic: 50, -10, 3, 35, 45
wait: 2s

bubble: 55, -15, "12 founding members unite against Soviet expansion", white
wait: 4s
remove: last

# 1952 - Southern flank
remove: last
year: 40, -95, "1952"
cinematic: 38, 28, 4, 40, 90
wait: 2s

greece: southern, sweep
turkey: southern, sweep

bubble: 38, 35, "Greece & Turkey secure Mediterranean flank", white
wait: 4s
remove: last

# 2024 - Nordic expansion
remove: last
year: 40, -95, "2024", highlight
cinematic: 62, 16, 4, 45, 30
wait: 2s

sweden: nordic, radial
finland: nordic, radial

line: Sweden, Finland, nordic

bubble: 63, 20, "Sweden & Finland end centuries of neutrality", white
wait: 4s
remove: last

# Finale
remove: last
year: 40, -95, "2024"
cinematic: 50, 0, 3, 20, 0
wait: 2s

bubble: 50, -20, "From 12 to 32 members in 75 years", white
wait: 4s`
    }
};