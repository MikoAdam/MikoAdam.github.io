/**
 * GGMaps Configuration
 */

const CONFIG = {
    styles: {
        liberty: 'https://tiles.openfreemap.org/styles/liberty',
        satellite: 'nasa-satellite'
    },

    colors: {
        red: '#ff4757',
        orange: '#ffa502',
        yellow: '#ffda00',
        gold: '#f9ca24',
        green: '#2ed573',
        blue: '#3742fa',
        cyan: '#00d2d3',
        purple: '#8854d0',
        pink: '#ff6b81',
        magenta: '#a55eea',
        white: '#ffffff',
        maroon: '#b71540',
        coral: '#ff7675',
        salmon: '#ffb8b8',
        navy: '#1e3799',
        lime: '#7bed9f'
    },

    data: {
        countries: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson',
        regions: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson'
    },

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

    satellite: {
        tiles: 'https://gibs-a.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg',
        maxZoom: 8
    }
};