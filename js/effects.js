/**
 * SymbolLibrary — Professional map symbols for geopolitical/conflict visualization
 *
 * Design principles:
 *   - Instantly recognizable silhouettes at any size
 *   - Real-world iconography (radiation trefoil, tank profile, oil derrick)
 *   - Bold, clean paths — legible at 24px and beautiful at 96px
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
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 2l5 14 10-10-4 14 15 1-12 8 7 13-14-5-2 15-5-13-7 13-2-15-14 5 7-13-12-8 15-1-4-14 10 10z"/></svg>`
        },
        battle: {
            label: 'Battle',
            cls: 'fx-battle',
            category: 'combat',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M10 10l17 17M27 10L10 27" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M37 37l17 17M54 37L37 54" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="32" cy="32" r="4"/></svg>`
        },
        bombing: {
            label: 'Airstrike',
            cls: 'fx-bombing',
            category: 'combat',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="3"/><line x1="32" y1="2" x2="32" y2="62" stroke="currentColor" stroke-width="2.5"/><line x1="2" y1="32" x2="62" y2="32" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="32" r="5"/></svg>`
        },
        fire: {
            label: 'Fire',
            cls: 'fx-fire',
            category: 'combat',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4c6 10 18 18 18 32a18 18 0 01-36 0C14 22 26 14 32 4z"/><path d="M32 28c3 5 8 8 8 16a8 8 0 01-16 0c0-8 5-11 8-16z" fill="#000" opacity="0.15"/></svg>`
        },
        skull: {
            label: 'Casualties',
            cls: 'fx-skull',
            category: 'combat',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4C19 4 8 15 8 28c0 9 5 16 12 20v8h24v-8c7-4 12-11 12-20C56 15 45 4 32 4z"/><ellipse cx="23" cy="26" rx="6" ry="7" fill="#000" opacity="0.3"/><ellipse cx="41" cy="26" rx="6" ry="7" fill="#000" opacity="0.3"/><path d="M24 44v8m8-8v8m8-8v8" stroke="#000" stroke-width="2.5" opacity="0.3"/><path d="M27 36c0 0 5 4 10 0" fill="none" stroke="#000" stroke-width="2" opacity="0.2"/></svg>`
        },
        nuke: {
            label: 'Nuclear',
            cls: 'fx-nuke',
            category: 'combat',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="32" r="7"/><path d="M32 25c-1.5-2.5-4-7-7.8-13.5a24 24 0 0115.6 0C36 18 33.5 22.5 32 25z"/><path d="M37.1 35.5c2.8 0.7 7.5 1.8 14.4 3.5a24 24 0 01-7.8 13.5c-1.9-3.3-4.4-7.7-6.6-11.5z" transform="rotate(0 32 32)"/><path d="M26.9 35.5c-2.8 0.7-7.5 1.8-14.4 3.5a24 24 0 007.8 13.5c1.9-3.3 4.4-7.7 6.6-11.5z"/></svg>`
        },

        // ═══ MILITARY UNITS ═══
        tank: {
            label: 'Armor',
            cls: 'fx-tank',
            category: 'military',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><rect x="8" y="28" width="48" height="22" rx="4"/><rect x="14" y="36" width="36" height="6" rx="3" fill="#000" opacity="0.15"/><circle cx="16" cy="47" r="5" fill="#000" opacity="0.2"/><circle cx="32" cy="47" r="5" fill="#000" opacity="0.2"/><circle cx="48" cy="47" r="5" fill="#000" opacity="0.2"/><rect x="22" y="16" width="20" height="16" rx="3"/><rect x="38" y="20" width="20" height="4" rx="2"/></svg>`
        },
        troops: {
            label: 'Infantry',
            cls: 'fx-troops',
            category: 'military',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="12" r="8"/><path d="M18 24h28c2 0 4 2 4 4v16c0 2-2 4-4 4h-8v12h-8V48h-8v12h-8V48h-4c-2 0-4-2-4-4V28c0-2 2-4 4-4z"/></svg>`
        },
        plane: {
            label: 'Air Force',
            cls: 'fx-plane',
            category: 'military',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M30 4h4l0 18 20 10v4l-20-6v16l7 5v3L32 50l-9 4v-3l7-5V30L10 36v-4l20-10z"/></svg>`
        },
        naval: {
            label: 'Navy',
            cls: 'fx-naval',
            category: 'military',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M12 36l4-18h32l4 18H12z"/><path d="M30 18V8h4v10"/><path d="M26 8h12" stroke="currentColor" stroke-width="2.5" fill="none"/><path d="M8 40c4-4 8-4 12 0s8 4 12 0 8-4 12 0 8 4 12 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M10 48c4-4 8-4 12 0s8 4 12 0 8-4 12 0" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/></svg>`
        },

        // ═══ RESOURCES ═══
        oil: {
            label: 'Oil',
            cls: 'fx-oil',
            category: 'resources',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M22 58V30l-8 8V58H10V36l14-14V10h4v4l10 10v14l-4 4V58h-4V46l-4 4V58z" opacity="0.9"/><rect x="20" y="6" width="12" height="6" rx="1"/><path d="M44 22l8-16h4l-8 16" opacity="0.6"/><circle cx="50" cy="8" r="3" opacity="0.6"/></svg>`
        },
        factory: {
            label: 'Industry',
            cls: 'fx-factory',
            category: 'resources',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><rect x="4" y="38" width="56" height="22" rx="2"/><rect x="8" y="8" width="10" height="30"/><rect x="22" y="16" width="10" height="22"/><rect x="36" y="12" width="10" height="26"/><path d="M11 8l2-6 2 6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><path d="M25 16l2-6 2 6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><path d="M39 12l2-6 2 6" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><rect x="12" y="44" width="6" height="8" rx="1" fill="#000" opacity="0.2"/><rect x="24" y="44" width="6" height="8" rx="1" fill="#000" opacity="0.2"/><rect x="36" y="44" width="6" height="8" rx="1" fill="#000" opacity="0.2"/><rect x="48" y="44" width="6" height="8" rx="1" fill="#000" opacity="0.2"/></svg>`
        },
        port: {
            label: 'Port',
            cls: 'fx-port',
            category: 'resources',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 6v28" stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M22 16h20" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="32" cy="38" r="4"/><path d="M20 38a12 12 0 0024 0" fill="none" stroke="currentColor" stroke-width="3"/><path d="M6 56c5-5 10-5 15 0s10 5 15 0 10-5 15 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`
        },

        // ═══ POLITICAL ═══
        flag: {
            label: 'Flag',
            cls: 'fx-flag',
            category: 'political',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><line x1="10" y1="6" x2="10" y2="58" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M10 8h38l-10 12 10 12H10z" opacity="0.9"/></svg>`
        },
        capital: {
            label: 'Capital',
            cls: 'fx-capital',
            category: 'political',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4l8 20h20l-16 12 6 20-18-13-18 13 6-20L4 24h20z"/></svg>`
        },
        shield: {
            label: 'Defense',
            cls: 'fx-shield',
            category: 'political',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M32 4L6 16v16c0 14 10 22 26 28 16-6 26-14 26-28V16z"/><path d="M32 14l-18 8v11c0 10 7 16 18 20 11-4 18-10 18-20V22z" fill="#000" opacity="0.1"/></svg>`
        },
        treaty: {
            label: 'Treaty',
            cls: 'fx-treaty',
            category: 'political',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M10 32c0-12 8-20 22-20s22 8 22 20" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M10 32c-4 6-2 12 4 12s8-4 10-8" stroke="currentColor" stroke-width="3.5" fill="none"/><path d="M54 32c4 6 2 12-4 12s-8-4-10-8" stroke="currentColor" stroke-width="3.5" fill="none"/><circle cx="20" cy="50" r="3"/><circle cx="44" cy="50" r="3"/><path d="M20 53l-4 7m28-7l4 7" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`
        },
        uprising: {
            label: 'Uprising',
            cls: 'fx-uprising',
            category: 'political',
            svg: `<svg viewBox="0 0 64 64" fill="currentColor"><path d="M26 58V34h-6v10h-6V24h12V14a8 8 0 0116 0v10h12v20h-6V34h-6v24z"/><path d="M28 8l4-6 4 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`
        },
        occupation: {
            label: 'Occupation',
            cls: 'fx-occupation',
            category: 'political',
            svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3"><circle cx="32" cy="32" r="26"/><line x1="8" y1="22" x2="56" y2="22"/><line x1="6" y1="32" x2="58" y2="32"/><line x1="8" y1="42" x2="56" y2="42"/></svg>`
        }
    };

    /**
     * Create a symbol element for placing on the map as a MapLibre Marker.
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
