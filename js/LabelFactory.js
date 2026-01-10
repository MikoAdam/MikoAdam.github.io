/**
 * LabelFactory - Creates DOM elements for map labels
 */

class LabelFactory {
    static createLabel(text, size, color) {
        const el = document.createElement('div');
        el.className = 'map-label';
        el.style.fontSize = size + 'px';
        el.style.color = CONFIG.colors[color] || color || '#fff';
        el.textContent = text;
        return el;
    }

    static createBubble(text) {
        const el = document.createElement('div');
        el.className = 'map-bubble';
        el.textContent = text;
        return el;
    }
}