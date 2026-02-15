/**
 * EffectsLibrary — Clean, minimal map symbols for geopolitical/conflict visualization
 *
 * Design principles:
 *   - Maximum 2-3 SVG shapes per icon (road-sign simplicity)
 *   - Bold filled silhouettes, instantly recognizable at 32px
 *   - Respectful & serious — these mark real events
 *   - All use currentColor for color theming
 *   - NO transform on container (MapLibre Marker owns transform)
 *   - Size via width/height, not scale
 */

class EffectsLibrary {
    static EFFECTS = {
        // ═══ COMBAT ═══
        explosion: {
            label: 'Explosion',
            cls: 'fx-explosion',
            category: 'combat',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 0l3.5 10.5L26 4l-4.5 8.5L32 16l-10.5 3.5L26 28l-8.5-4.5L16 32l-1.5-8.5L6 28l4.5-8.5L0 16l10.5-3.5L6 4l8.5 4.5Z" opacity="0.9"/></svg>`
        },
        battle: {
            label: 'Battle',
            cls: 'fx-battle',
            category: 'combat',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M4 4l8 8m0-8L4 12" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><path d="M20 20l8 8m0-8l-8 8" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/><circle cx="16" cy="16" r="3" opacity="0.9"/></svg>`
        },
        bombing: {
            label: 'Airstrike',
            cls: 'fx-bombing',
            category: 'combat',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/><line x1="16" y1="0" x2="16" y2="32" stroke="currentColor" stroke-width="2"/><line x1="0" y1="16" x2="32" y2="16" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="3" opacity="0.9"/></svg>`
        },
        fire: {
            label: 'Fire',
            cls: 'fx-fire',
            category: 'combat',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C20 8 26 12 26 20a10 10 0 01-20 0C6 12 12 8 16 2z" opacity="0.9"/><path d="M16 14c2 3 5 5 5 9a5 5 0 01-10 0c0-4 3-6 5-9z" fill="black" opacity="0.15"/></svg>`
        },
        skull: {
            label: 'Casualties',
            cls: 'fx-skull',
            category: 'combat',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C9 2 4 7.5 4 14c0 4.5 2.5 8 6 10v4h12v-4c3.5-2 6-5.5 6-10 0-6.5-5-12-12-12z" opacity="0.9"/><circle cx="11.5" cy="13" r="3.5" fill="black" opacity="0.3"/><circle cx="20.5" cy="13" r="3.5" fill="black" opacity="0.3"/><path d="M12 22v4m4-4v4m4-4v4" stroke="black" stroke-width="1.5" opacity="0.3"/></svg>`
        },
        nuke: {
            label: 'Nuclear',
            cls: 'fx-nuke',
            category: 'combat',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16" cy="16" r="4" opacity="0.9"/><path d="M16 12l-5.2-9a15 15 0 0110.4 0z" opacity="0.85"/><path d="M19.5 17.5l9-5.2a15 15 0 01-5.2 9z" opacity="0.85"/><path d="M14.5 19.5l-9 5.2a15 15 0 015.2-9z" opacity="0.85"/></svg>`
        },

        // ═══ MILITARY UNITS ═══
        tank: {
            label: 'Armor',
            cls: 'fx-tank',
            category: 'military',
            svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="8" width="24" height="16" rx="1"/><line x1="4" y1="24" x2="28" y2="8"/></svg>`
        },
        troops: {
            label: 'Infantry',
            cls: 'fx-troops',
            category: 'military',
            svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="8" width="24" height="16" rx="1"/><line x1="4" y1="8" x2="28" y2="24"/><line x1="28" y1="8" x2="4" y2="24"/></svg>`
        },
        plane: {
            label: 'Air Force',
            cls: 'fx-plane',
            category: 'military',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2l1.5 0 0 9 10 5v2.5l-10-3v9l3.5 2.5v2L16 27l-5 2v-2L14.5 24.5v-9l-10 3V16l10-5V2z" opacity="0.9"/></svg>`
        },
        naval: {
            label: 'Navy',
            cls: 'fx-naval',
            category: 'military',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2v18" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M10 8h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M16 20c-3-2-6-1-6 0s3 2 6 4 6 2 6 0-3-2-6-4z" opacity="0.8"/><path d="M6 28c3-3 7-3 10 0s7 3 10 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`
        },

        // ═══ RESOURCES ═══
        oil: {
            label: 'Oil',
            cls: 'fx-oil',
            category: 'resources',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2c-3 5-8 8-8 14a8 8 0 0016 0c0-6-5-9-8-14z" opacity="0.9"/></svg>`
        },
        factory: {
            label: 'Industry',
            cls: 'fx-factory',
            category: 'resources',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><rect x="3" y="20" width="26" height="10" opacity="0.9"/><rect x="6" y="6" width="6" height="24" opacity="0.9"/><rect x="16" y="10" width="6" height="20" opacity="0.9"/></svg>`
        },
        port: {
            label: 'Port',
            cls: 'fx-port',
            category: 'resources',
            svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M16 3v16"/><path d="M10 9h12"/><path d="M10 19a6 6 0 0012 0"/><path d="M6 28c3-3 7-3 10 0s7 3 10 0"/></svg>`
        },

        // ═══ POLITICAL ═══
        flag: {
            label: 'Flag',
            cls: 'fx-flag',
            category: 'political',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><line x1="6" y1="3" x2="6" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M6 4h20l-5 7 5 7H6z" opacity="0.9"/></svg>`
        },
        capital: {
            label: 'Capital',
            cls: 'fx-capital',
            category: 'political',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2l4 9.5h10l-8 6 3 9.5-9-6.5-9 6.5 3-9.5-8-6h10z" opacity="0.9"/></svg>`
        },
        shield: {
            label: 'Defense',
            cls: 'fx-shield',
            category: 'political',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 2l13 6v8c0 8-5.5 12-13 16C8.5 28 3 24 3 16V8z" opacity="0.9"/><path d="M16 8l8 4v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10v-5z" fill="black" opacity="0.12"/></svg>`
        },
        treaty: {
            label: 'Treaty',
            cls: 'fx-treaty',
            category: 'political',
            svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 18c0-6 4-10 10-10s10 4 10 10"/><path d="M6 18c-2 3 0 6 3 6s4-2 5-4"/><path d="M26 18c2 3 0 6-3 6s-4-2-5-4"/><path d="M14 26l-2 4m6-4l2 4"/></svg>`
        },
        uprising: {
            label: 'Uprising',
            cls: 'fx-uprising',
            category: 'political',
            svg: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M11 30V16H8v5H5V11h6V7a5 5 0 0110 0v4h6v10h-3v-5h-3v14z" opacity="0.9"/></svg>`
        },
        occupation: {
            label: 'Occupation',
            cls: 'fx-occupation',
            category: 'political',
            svg: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="16" cy="16" r="13"/><line x1="5" y1="11" x2="27" y2="11"/><line x1="3" y1="16" x2="29" y2="16"/><line x1="5" y1="21" x2="27" y2="21"/></svg>`
        }
    };

    /**
     * Create an effect element for placing on the map as a MapLibre Marker.
     * Size is applied via width/height — NEVER transform (Marker owns transform).
     */
    static create(effectName, color, size = 1) {
        const def = this.EFFECTS[effectName];
        if (!def) return null;

        const resolvedColor = CONFIG.colors[color] || color || '#ef4444';
        const el = document.createElement('div');
        el.className = `map-effect ${def.cls}`;
        el.style.color = resolvedColor;
        el.dataset.effectName = effectName;
        el.dataset.effectColor = color || 'red';
        el.dataset.effectSize = size;

        // Scale via width/height, NOT transform (MapLibre Marker uses transform for positioning)
        const scale = Math.max(0.5, Math.min(3, size));
        const baseSize = 48;
        const px = Math.round(baseSize * scale);
        el.style.width = px + 'px';
        el.style.height = px + 'px';

        el.innerHTML = def.svg;
        return el;
    }

    /** Get all effect names grouped by category */
    static getCategories() {
        const cats = {};
        for (const [name, def] of Object.entries(this.EFFECTS)) {
            if (!cats[def.category]) cats[def.category] = [];
            cats[def.category].push({ name, ...def });
        }
        return cats;
    }

    static list() {
        return Object.keys(this.EFFECTS);
    }
}
