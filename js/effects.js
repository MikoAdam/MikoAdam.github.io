/**
 * EffectsLibrary - NATO APP-6 style military symbology for geopolitical/conflict maps
 * Professional, bold, filled SVG symbols designed for small-size map readability (32-48px)
 * All symbols use currentColor for flexible color theming
 */

class EffectsLibrary {
    static EFFECTS = {
        // ─── Combat ───
        explosion: {
            label: 'Explosion', cls: 'fx-explosion', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <polygon points="20,1 24,12 31,4 26,14 39,13 28,19 39,27 26,24 31,36 24,28 20,39 16,28 9,36 14,24 1,27 12,19 1,13 14,14 9,4 16,12" fill="currentColor" opacity="0.9"/>
                <polygon points="20,11 23,17 28,14 25,19 30,22 24,22 27,28 23,24 20,29 17,24 13,28 16,22 10,22 15,19 12,14 17,17" fill="currentColor" opacity="0.5"/>
            </svg>`
        },
        battle: {
            label: 'Battle', cls: 'fx-battle', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M6,5 L10,5 L10,9 L26,25 L26,21 L30,21 L30,25 L34,25 L34,29 L30,29 L30,35 L26,35 L26,31 L10,15 L10,19 L6,19 L6,15 L2,15 L2,11 L6,11 Z" fill="currentColor" opacity="0.9"/>
                <path d="M30,5 L26,5 L26,9 L22,13 L25,16 L30,11 L30,15 L34,15 L34,11 L38,11 L38,7 L34,7 L34,1 L30,1 Z" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        bombing: {
            label: 'Bombing', cls: 'fx-bombing', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="3"/>
                <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <circle cx="20" cy="20" r="2.5" fill="currentColor" opacity="0.9"/>
                <line x1="20" y1="0" x2="20" y2="10" stroke="currentColor" stroke-width="3"/>
                <line x1="20" y1="30" x2="20" y2="40" stroke="currentColor" stroke-width="3"/>
                <line x1="0" y1="20" x2="10" y2="20" stroke="currentColor" stroke-width="3"/>
                <line x1="30" y1="20" x2="40" y2="20" stroke="currentColor" stroke-width="3"/>
            </svg>`
        },
        fire: {
            label: 'Fire / Destruction', cls: 'fx-fire', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20,2 C25,8 32,14 30,22 C33,19 34,16 35,20 C37,26 32,34 20,38 C8,34 3,26 5,20 C6,16 7,19 10,22 C8,14 15,8 20,2Z" fill="currentColor" opacity="0.9"/>
                <path d="M20,14 C23,17 26,20 25,25 C27,23 27,21 28,23 C29,27 26,31 20,33 C14,31 11,27 12,23 C13,21 13,23 15,25 C14,20 17,17 20,14Z" fill="currentColor" opacity="0.4"/>
            </svg>`
        },
        skull: {
            label: 'Casualties / Atrocity', cls: 'fx-skull', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20,3 C10,3 4,10 4,18 C4,24 7,28 12,30 L12,35 L16,35 L16,30 L18,30 L18,35 L22,35 L22,30 L24,30 L24,35 L28,35 L28,30 C33,28 36,24 36,18 C36,10 30,3 20,3Z" fill="currentColor" opacity="0.9"/>
                <ellipse cx="14" cy="17" rx="4.5" ry="5" fill="black" opacity="0.35"/>
                <ellipse cx="26" cy="17" rx="4.5" ry="5" fill="black" opacity="0.35"/>
                <path d="M16,25 L16,29 M20,25 L20,29 M24,25 L24,29" stroke="black" stroke-width="2" opacity="0.35" stroke-linecap="round"/>
                <path d="M15,25 L25,25" stroke="black" stroke-width="2" opacity="0.35" stroke-linecap="round"/>
                <path d="M17,22 L23,22 L21,24 L19,24Z" fill="black" opacity="0.3"/>
            </svg>`
        },
        nuke: {
            label: 'Nuclear', cls: 'fx-nuke', category: 'combat',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
                <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.9"/>
                <path d="M20,15 L16,4 Q20,2 24,4 Z" fill="currentColor" opacity="0.9"/>
                <path d="M24.3,22.5 L34,29 Q32,33 28,34 Z" fill="currentColor" opacity="0.9"/>
                <path d="M15.7,22.5 L12,34 Q8,33 6,29 Z" fill="currentColor" opacity="0.9"/>
                <line x1="20" y1="15" x2="24.3" y2="22.5" stroke="currentColor" stroke-width="3"/>
                <line x1="24.3" y1="22.5" x2="15.7" y2="22.5" stroke="currentColor" stroke-width="3"/>
                <line x1="15.7" y1="22.5" x2="20" y2="15" stroke="currentColor" stroke-width="3"/>
            </svg>`
        },

        // ─── Military Units ───
        tank: {
            label: 'Armor / Tank', cls: 'fx-tank', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="5" y="10" width="30" height="20" rx="1" fill="none" stroke="currentColor" stroke-width="3"/>
                <line x1="5" y1="30" x2="35" y2="10" stroke="currentColor" stroke-width="3"/>
                <rect x="13" y="14" width="14" height="12" rx="1" fill="currentColor" opacity="0.2"/>
            </svg>`
        },
        troops: {
            label: 'Infantry / Troops', cls: 'fx-troops', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="5" y="10" width="30" height="20" rx="1" fill="none" stroke="currentColor" stroke-width="3"/>
                <line x1="5" y1="10" x2="35" y2="30" stroke="currentColor" stroke-width="3"/>
                <line x1="35" y1="10" x2="5" y2="30" stroke="currentColor" stroke-width="3"/>
            </svg>`
        },
        plane: {
            label: 'Air Force', cls: 'fx-plane', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20,3 L22,3 L22,13 L36,20 L36,23 L22,19 L22,31 L27,34 L27,37 L20,35 L13,37 L13,34 L18,31 L18,19 L4,23 L4,20 L18,13 L18,3 Z" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        naval: {
            label: 'Navy / Fleet', cls: 'fx-naval', category: 'military',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20,3 L20,18" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M12,11 L28,11" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <path d="M20,18 Q20,14 14,14 L14,18 Q14,20 12,22" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <path d="M20,18 Q20,14 26,14 L26,18 Q26,20 28,22" fill="none" stroke="currentColor" stroke-width="2.5"/>
                <path d="M10,26 C10,34 30,34 30,26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <path d="M8,31 C8,38 32,38 32,31" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>`
        },

        // ─── Resources & Economy ───
        oil: {
            label: 'Oil / Petroleum', cls: 'fx-oil', category: 'resources',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M22,4 L26,4 L26,12 L30,12 L30,16 L26,16 L26,34 L32,34 L32,38 L8,38 L8,34 L14,34 L14,16 L10,16 L10,12 L14,12 L14,10 L18,10 L18,4 Z" fill="currentColor" opacity="0.9"/>
                <path d="M6,18 L14,14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <rect x="2" y="18" width="6" height="5" rx="2" fill="currentColor" opacity="0.9"/>
                <path d="M2,23 L8,23 L8,28 Q5,30 2,28Z" fill="currentColor" opacity="0.7"/>
            </svg>`
        },
        factory: {
            label: 'Industry / Factory', cls: 'fx-factory', category: 'resources',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <rect x="3" y="24" width="34" height="14" fill="currentColor" opacity="0.9"/>
                <rect x="7" y="6" width="7" height="32" fill="currentColor" opacity="0.9"/>
                <rect x="19" y="10" width="7" height="28" fill="currentColor" opacity="0.9"/>
                <path d="M9,6 Q10,2 11,6" fill="currentColor" opacity="0.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M21,10 Q22,6 23,10" fill="currentColor" opacity="0.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <rect x="29" y="28" width="5" height="5" fill="black" opacity="0.2"/>
                <rect x="29" y="28" width="5" height="5" fill="none" stroke="currentColor" stroke-width="1"/>
            </svg>`
        },
        port: {
            label: 'Port / Trade', cls: 'fx-port', category: 'resources',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20,3 L20,26" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M12,10 L28,10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <path d="M20,26 Q20,20 12,20 L12,26" fill="none" stroke="currentColor" stroke-width="3"/>
                <path d="M20,26 Q20,20 28,20 L28,26" fill="none" stroke="currentColor" stroke-width="3"/>
                <rect x="6" y="30" width="28" height="4" rx="2" fill="currentColor" opacity="0.9"/>
                <path d="M6,37 Q13,33 20,37 Q27,33 34,37" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>`
        },

        // ─── Political & Diplomatic ───
        flag: {
            label: 'Flag / Claim', cls: 'fx-flag', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <line x1="7" y1="3" x2="7" y2="38" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
                <path d="M7,4 L35,4 L29,12.5 L35,21 L7,21Z" fill="currentColor" opacity="0.9"/>
                <rect x="5" y="36" width="5" height="3" rx="1" fill="currentColor" opacity="0.7"/>
            </svg>`
        },
        capital: {
            label: 'Capital / Key City', cls: 'fx-capital', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <polygon points="20,2 24.5,13.5 37,14.5 27.5,22.5 30.5,35 20,28.5 9.5,35 12.5,22.5 3,14.5 15.5,13.5" fill="currentColor" opacity="0.9"/>
            </svg>`
        },
        shield: {
            label: 'Defense / Fortification', cls: 'fx-shield', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20,2 L36,9 L36,20 Q36,33 20,39 Q4,33 4,20 L4,9Z" fill="currentColor" opacity="0.9"/>
                <path d="M20,8 L30,13 L30,20 Q30,29 20,33 Q10,29 10,20 L10,13Z" fill="black" opacity="0.15"/>
                <path d="M20,14 L20,27 M14,20.5 L26,20.5" stroke="currentColor" stroke-width="3" opacity="0.4" stroke-linecap="round"/>
            </svg>`
        },
        treaty: {
            label: 'Peace / Treaty', cls: 'fx-treaty', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M20,3 C20,3 26,5 28,10 C30,6 34,6 36,9 C38,12 36,16 33,17 C36,20 35,24 32,26 C29,28 26,27 24,25 C24,28 22,30 19,30 C16,30 14,28 14,25 C12,28 8,28 6,25 C4,22 5,19 8,17 C4,15 3,11 6,8 C9,5 13,6 14,9 C15,5 18,3 20,3Z" fill="currentColor" opacity="0.9"/>
                <line x1="17" y1="30" x2="14" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="23" y1="30" x2="26" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M14,38 Q16,35 18,38" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M22,38 Q24,35 26,38" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>`
        },
        uprising: {
            label: 'Uprising / Revolution', cls: 'fx-uprising', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <path d="M14,38 L14,20 L11,20 L11,24 L8,24 L8,14 L14,14 L14,11 C14,6 16,3 20,3 C24,3 26,6 26,11 L26,14 L32,14 L32,24 L29,24 L29,20 L26,20 L26,38Z" fill="currentColor" opacity="0.9"/>
                <rect x="17" y="11" width="6" height="3" rx="1" fill="black" opacity="0.15"/>
            </svg>`
        },
        occupation: {
            label: 'Occupation', cls: 'fx-occupation', category: 'political',
            svg: `<svg viewBox="0 0 40 40" width="40" height="40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="3.5"/>
                <line x1="7" y1="13" x2="33" y2="13" stroke="currentColor" stroke-width="3"/>
                <line x1="5" y1="20" x2="35" y2="20" stroke="currentColor" stroke-width="3.5"/>
                <line x1="7" y1="27" x2="33" y2="27" stroke="currentColor" stroke-width="3"/>
                <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.5"/>
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
