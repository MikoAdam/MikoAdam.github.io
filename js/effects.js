/**
 * EffectsLibrary - Professional SVG map symbols for geopolitical/historical maps
 * Clean, minimalist military-map-style iconography (no emoji)
 */

class EffectsLibrary {
    static EFFECTS = {
        // ─── Combat ───
        explosion: {
            label: 'Explosion', cls: 'fx-explosion', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <polygon points="20,2 23,13 32,6 25,15 38,20 25,25 32,34 23,27 20,38 17,27 8,34 15,25 2,20 15,15 8,6 17,13" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        battle: {
            label: 'Battle', cls: 'fx-battle', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <line x1="7" y1="7" x2="33" y2="33" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="33" y1="7" x2="7" y2="33" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="7" y1="7" x2="12" y2="7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="7" y1="7" x2="7" y2="12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="33" y1="7" x2="28" y2="7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="33" y1="7" x2="33" y2="12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>`
        },
        bombing: {
            label: 'Bombing', cls: 'fx-bombing', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="20" cy="20" r="3" fill="currentColor"/>
                <line x1="20" y1="2" x2="20" y2="12" stroke="currentColor" stroke-width="2.5"/>
                <line x1="20" y1="28" x2="20" y2="38" stroke="currentColor" stroke-width="2.5"/>
                <line x1="2" y1="20" x2="12" y2="20" stroke="currentColor" stroke-width="2.5"/>
                <line x1="28" y1="20" x2="38" y2="20" stroke="currentColor" stroke-width="2.5"/>
            </svg>`
        },
        fire: {
            label: 'Fire / Destruction', cls: 'fx-fire', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20 3 C26 10 30 15 28 22 C32 18 31 14 33 18 C35 24 30 32 20 37 C10 32 5 24 7 18 C9 14 8 18 12 22 C10 15 14 10 20 3Z" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        skull: {
            label: 'Casualties / Atrocity', cls: 'fx-skull', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20 4 C11 4 5 10 5 18 C5 24 8 28 13 29 L13 33 L17 33 L17 29 L23 29 L23 33 L27 33 L27 29 C32 28 35 24 35 18 C35 10 29 4 20 4Z" fill="currentColor" opacity="0.9"/>
                <circle cx="14" cy="16" r="4" fill="black" opacity="0.4"/>
                <circle cx="26" cy="16" r="4" fill="black" opacity="0.4"/>
                <path d="M14 24 L14 27 M17 24 L17 27 M20 24 L20 27 M23 24 L23 27 M26 24 L26 27" stroke="black" stroke-width="1.5" opacity="0.4"/>
                <line x1="11" y1="24" x2="29" y2="24" stroke="black" stroke-width="1.5" opacity="0.4"/>
            </svg>`
        },
        nuke: {
            label: 'Nuclear', cls: 'fx-nuke', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="20" cy="20" r="5" fill="currentColor"/>
                <path d="M20 15 C20 15 23 8 20 3 C17 8 20 15 20 15Z" fill="currentColor" opacity="0.9" transform="rotate(0,20,20)"/>
                <path d="M20 15 C20 15 23 8 20 3 C17 8 20 15 20 15Z" fill="currentColor" opacity="0.9" transform="rotate(120,20,20)"/>
                <path d="M20 15 C20 15 23 8 20 3 C17 8 20 15 20 15Z" fill="currentColor" opacity="0.9" transform="rotate(240,20,20)"/>
            </svg>`
        },

        // ─── Military Units ───
        tank: {
            label: 'Armor / Tank', cls: 'fx-tank', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="6" y="10" width="28" height="20" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <ellipse cx="20" cy="20" rx="10" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
            </svg>`
        },
        troops: {
            label: 'Infantry / Troops', cls: 'fx-troops', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="6" y="10" width="28" height="20" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <line x1="6" y1="10" x2="34" y2="30" stroke="currentColor" stroke-width="2.5"/>
                <line x1="34" y1="10" x2="6" y2="30" stroke="currentColor" stroke-width="2.5"/>
            </svg>`
        },
        plane: {
            label: 'Air Force', cls: 'fx-plane', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M8 20 L16 16 L18 6 L20 4 L22 6 L24 16 L32 20 L24 21 L24 30 L22 32 L20 30 L18 32 L16 30 L16 21Z" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        naval: {
            label: 'Navy / Fleet', cls: 'fx-naval', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <line x1="20" y1="6" x2="20" y2="26" stroke="currentColor" stroke-width="2.5"/>
                <line x1="13" y1="14" x2="27" y2="14" stroke="currentColor" stroke-width="2.5"/>
                <path d="M12 26 Q16 22 20 26 Q24 30 28 26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>`
        },

        // ─── Resources & Economy ───
        oil: {
            label: 'Oil / Petroleum', cls: 'fx-oil', category: 'resources',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M14 37 L14 14 L10 14 L20 4 L30 14 L26 14 L26 37 Z" fill="currentColor" opacity="0.9"/>
                <line x1="8" y1="22" x2="14" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <rect x="4" y="22" width="6" height="4" rx="2" fill="currentColor" opacity="0.7"/>
                <rect x="12" y="37" width="16" height="3" fill="currentColor"/>
            </svg>`
        },
        factory: {
            label: 'Industry / Factory', cls: 'fx-factory', category: 'resources',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="4" y="22" width="32" height="14" fill="currentColor" opacity="0.85"/>
                <rect x="8" y="6" width="6" height="30" fill="currentColor"/>
                <rect x="18" y="10" width="6" height="26" fill="currentColor"/>
                <path d="M10 6 C10 4 11 3 11 3 C11 3 12 4 12 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
                <path d="M20 10 C20 8 21 7 21 7 C21 7 22 8 22 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            </svg>`
        },
        port: {
            label: 'Port / Trade', cls: 'fx-port', category: 'resources',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <line x1="20" y1="4" x2="20" y2="28" stroke="currentColor" stroke-width="3"/>
                <line x1="12" y1="12" x2="28" y2="12" stroke="currentColor" stroke-width="3"/>
                <path d="M10 20 Q15 16 20 20 Q25 24 30 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M10 28 C10 34 30 34 30 28" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>`
        },

        // ─── Political & Diplomatic ───
        flag: {
            label: 'Flag / Claim', cls: 'fx-flag', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <line x1="8" y1="4" x2="8" y2="37" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <path d="M8 5 L33 5 L28 13 L33 21 L8 21Z" fill="currentColor" opacity="0.85"/>
            </svg>`
        },
        capital: {
            label: 'Capital / Key City', cls: 'fx-capital', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <polygon points="20,3 24,14 36,14 27,22 30,33 20,27 10,33 13,22 4,14 16,14" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        shield: {
            label: 'Defense / Fortification', cls: 'fx-shield', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20 3 L35 10 L35 20 Q35 32 20 38 Q5 32 5 20 L5 10Z" fill="currentColor" opacity="0.85"/>
                <path d="M20 10 L29 14 L29 20 Q29 28 20 33 Q11 28 11 20 L11 14Z" fill="black" opacity="0.15"/>
            </svg>`
        },
        treaty: {
            label: 'Peace / Treaty', cls: 'fx-treaty', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M12 36 C10 30 6 28 8 22 C4 20 6 16 10 16 C10 12 14 10 18 12 C20 8 24 8 26 12 C30 10 34 12 34 16 C38 16 38 22 34 24 C34 28 30 30 28 28 C26 32 22 32 20 30 C18 34 14 34 12 36Z" fill="currentColor" opacity="0.85"/>
                <line x1="20" y1="24" x2="20" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>`
        },
        uprising: {
            label: 'Uprising / Revolution', cls: 'fx-uprising', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M16 38 L16 18 L12 18 L12 22 L10 22 L10 14 L16 14 L16 10 C16 6 18 4 20 4 C22 4 24 6 24 10 L24 14 L30 14 L30 22 L28 22 L28 18 L24 18 L24 38Z" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        occupation: {
            label: 'Occupation', cls: 'fx-occupation', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <line x1="8" y1="14" x2="32" y2="14" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="20" x2="32" y2="20" stroke="currentColor" stroke-width="2"/>
                <line x1="8" y1="26" x2="32" y2="26" stroke="currentColor" stroke-width="2"/>
                <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" stroke-width="2.5"/>
            </svg>`
        }
    };

    /**
     * Create an animated effect element for use as a map marker.
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

        const scale = Math.max(0.5, Math.min(3, size));
        el.style.setProperty('--fx-scale', scale);
        if (scale !== 1) el.style.transform = `scale(${scale})`;

        el.innerHTML = def.svg;
        return el;
    }

    /**
     * Get all effect names grouped by category
     */
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
