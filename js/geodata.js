/**
 * Pillars of Creation Maps - GeoData
 * Handles loading, caching, and querying geographic data
 */

class GeoData {
    constructor() {
        this.countries = null;
        this.regions = null;

        // Fixed centers for better visual positioning
        this.fixedCenters = {
            'france': [2.5, 46.6],
            'united kingdom': [-2.5, 54.5],
            'netherlands': [5.5, 52.2],
            'united states of america': [-98.5, 39.5],
            'denmark': [10.0, 56.0],
            'portugal': [-8.0, 39.6],
            'spain': [-3.5, 40.0],
            'norway': [10.0, 62.0],
            'russia': [37.0, 55.0],
            'russian federation': [37.0, 55.0]
        };
    }

    /**
     * Load geographic data with smart caching and fallback
     */
    async load() {
        const cacheKey = 'poc-maps-geodata-v2';
        
        // Try localStorage cache first
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            try {
                const data = JSON.parse(cached);
                this.countries = data.countries;
                this.regions = data.regions;
                this.fixDisputedTerritories();
                console.log('GeoData: Loaded from cache ⚡');
                return;
            } catch (e) {
                console.warn('Cache corrupted, reloading...');
                localStorage.removeItem(cacheKey);
            }
        }

        // Load from files with fallback
        const timeout = (ms) => new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), ms)
        );

        try {
            console.log('GeoData: Loading from files...');
            
            let countriesRes, regionsRes;
            
            // Try local files first
            try {
                [countriesRes, regionsRes] = await Promise.race([
                    Promise.all([
                        fetch(CONFIG.data.countries),
                        fetch(CONFIG.data.regions)
                    ]),
                    timeout(5000)
                ]);
                
                if (!countriesRes.ok || !regionsRes.ok) {
                    throw new Error('Local files not found');
                }
            } catch (localError) {
                console.log('GeoData: Using GitHub fallback (slower)...');
                // Fallback to GitHub
                [countriesRes, regionsRes] = await Promise.race([
                    Promise.all([
                        fetch(CONFIG.data.countriesFallback),
                        fetch(CONFIG.data.regionsFallback)
                    ]),
                    timeout(30000)
                ]);
            }

            this.countries = await countriesRes.json();
            this.regions = await regionsRes.json();
            
            this.fixDisputedTerritories();

            // Cache for next time (if under 5MB)
            try {
                const cacheData = JSON.stringify({
                    countries: this.countries,
                    regions: this.regions
                });
                
                if (cacheData.length < 5 * 1024 * 1024) {
                    localStorage.setItem(cacheKey, cacheData);
                    console.log('GeoData: Cached for next visit 💾');
                }
            } catch (e) {
                console.warn('Could not cache:', e.message);
            }
        } catch (err) {
            console.error('Failed to load geodata:', err);
            throw err;
        }
    }

    /**
     * Fix disputed territories (Crimea → Ukraine)
     */
    fixDisputedTerritories() {
        // Reassign Crimea regions to Ukraine
        this.regions.features.forEach(f => {
            const name = (f.properties.name || f.properties.NAME || '').toLowerCase();
            if (name.includes('crimea') || name.includes('krym') || name.includes('sevastopol')) {
                f.properties.admin = 'Ukraine';
                f.properties.ADMIN = 'Ukraine';
                f.properties.sovereignt = 'Ukraine';
                f.properties.SOVEREIGNT = 'Ukraine';
            }
        });

        // Merge Crimea geometry into Ukraine
        const ukraine = this.countries.features.find(f =>
            (f.properties.NAME || '').toLowerCase() === 'ukraine'
        );

        const crimeaRegions = this.regions.features.filter(f => {
            const name = (f.properties.name || f.properties.NAME || '').toLowerCase();
            return name.includes('crimea') || name.includes('krym') || name.includes('sevastopol');
        });

        if (ukraine && crimeaRegions.length > 0) {
            crimeaRegions.forEach(crimea => this.mergeGeometry(ukraine, crimea));
        }

        console.log('GeoData: Fixed Crimea → Ukraine');
    }

    /**
     * Merge geometry from source into target
     */
    mergeGeometry(target, source) {
        if (source.geometry.type === 'Polygon') {
            if (target.geometry.type === 'Polygon') {
                target.geometry = {
                    type: 'MultiPolygon',
                    coordinates: [target.geometry.coordinates, source.geometry.coordinates]
                };
            } else if (target.geometry.type === 'MultiPolygon') {
                target.geometry.coordinates.push(source.geometry.coordinates);
            }
        } else if (source.geometry.type === 'MultiPolygon') {
            if (target.geometry.type === 'Polygon') {
                target.geometry = {
                    type: 'MultiPolygon',
                    coordinates: [target.geometry.coordinates, ...source.geometry.coordinates]
                };
            } else if (target.geometry.type === 'MultiPolygon') {
                target.geometry.coordinates.push(...source.geometry.coordinates);
            }
        }
    }

    /**
     * Normalize string for comparison
     */
    normalize(str) {
        return (str || '').toLowerCase().replace(/[-_]/g, ' ').replace(/^the\s+/, '').trim();
    }

    /**
     * Find country by name with fuzzy matching
     */
    findCountry(name) {
        const normalized = this.normalize(name);
        const search = CONFIG.aliases[normalized] || normalized;

        // Try exact match on NAME
        let result = this.countries.features.find(f => 
            this.normalize(f.properties.NAME) === search
        );

        // Try exact match on ADMIN
        if (!result) {
            result = this.countries.features.find(f => 
                this.normalize(f.properties.ADMIN) === search
            );
        }

        // Try NAME_LONG
        if (!result) {
            result = this.countries.features.find(f => 
                f.properties.NAME_LONG && this.normalize(f.properties.NAME_LONG) === search
            );
        }

        // Fuzzy match (starts with)
        if (!result) {
            result = this.countries.features.find(f => {
                const n = this.normalize(f.properties.NAME);
                const a = this.normalize(f.properties.ADMIN);
                return n.startsWith(search) || search.startsWith(n) ||
                       a.startsWith(search) || search.startsWith(a);
            });
        }

        return result;
    }

    /**
     * Find region/subdivision by name and parent country
     */
    findRegion(name, country) {
        const n = this.normalize(name);
        const c = this.normalize(country);
        const ca = CONFIG.aliases[c] || c;

        // Exact match
        let result = this.regions.features.find(f => {
            const props = f.properties;
            const names = [props.name, props.NAME, props.name_en, props.woe_name]
                .filter(Boolean)
                .map(s => this.normalize(s));
            const parents = [props.admin, props.ADMIN, props.sovereignt]
                .filter(Boolean)
                .map(s => this.normalize(s));

            const nameMatch = names.some(x => x === n);
            const parentMatch = parents.some(x => x === c || x === ca || x.includes(c));

            return nameMatch && parentMatch;
        });

        // Fuzzy match
        if (!result) {
            result = this.regions.features.find(f => {
                const props = f.properties;
                const names = [props.name, props.NAME, props.name_en, props.woe_name]
                    .filter(Boolean)
                    .map(s => this.normalize(s));
                const parents = [props.admin, props.ADMIN, props.sovereignt]
                    .filter(Boolean)
                    .map(s => this.normalize(s));

                const nameMatch = names.some(x => {
                    if (x === n) return true;
                    if (Math.abs(x.length - n.length) <= 3 && (x.includes(n) || n.includes(x))) return true;
                    return false;
                });
                const parentMatch = parents.some(x => x === c || x === ca || x.includes(c));

                return nameMatch && parentMatch;
            });
        }

        return result;
    }

    /**
     * Get bounding box of geometry
     */
    getBounds(geometry) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

        const process = (coords) => {
            if (typeof coords[0] === 'number') {
                minX = Math.min(minX, coords[0]);
                maxX = Math.max(maxX, coords[0]);
                minY = Math.min(minY, coords[1]);
                maxY = Math.max(maxY, coords[1]);
            } else {
                coords.forEach(process);
            }
        };

        process(geometry.coordinates);
        return [[minX, minY], [maxX, maxY]];
    }

    /**
     * Get center point of geometry (with fixed overrides)
     */
    getCenter(geometry, countryName = null) {
        if (countryName) {
            const key = countryName.toLowerCase();
            if (this.fixedCenters[key]) {
                return this.fixedCenters[key];
            }
        }

        const bounds = this.getBounds(geometry);
        return [
            (bounds[0][0] + bounds[1][0]) / 2,
            (bounds[0][1] + bounds[1][1]) / 2
        ];
    }
}
