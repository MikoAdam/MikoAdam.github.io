/**
 * Pillars of Creation Maps - Label Factory
 * Creates DOM elements for different label types
 */

class LabelFactory {
    /**
     * Create simple text label
     */
    static createLabel(text, size, color) {
        const el = document.createElement('div');
        el.className = 'map-label';
        el.style.fontSize = size + 'px';
        el.style.color = CONFIG.colors[color] || color || '#fff';
        el.textContent = text;
        return el;
    }

    /**
     * Create bubble/callout label with colored border
     */
    static createBubble(text, color) {
        const el = document.createElement('div');
        el.className = 'map-bubble ' + (color || 'blue');
        el.textContent = text;
        return el;
    }

    /**
     * Create year badge (large, prominent)
     */
    static createYear(text, highlight) {
        const el = document.createElement('div');
        el.className = 'map-year' + (highlight ? ' highlight' : '');
        el.textContent = text;
        return el;
    }

    /**
     * Create arrow label with directional pointer
     */
    static createArrow(text, direction, color) {
        const el = document.createElement('div');
        el.className = 'map-arrow ' + (direction || 'right');
        
        const borderColor = CONFIG.colors[color] || color || '#fff';
        el.innerHTML = `<div class="map-arrow-content" style="border-color: ${borderColor}">${text}</div>`;
        
        return el;
    }
}