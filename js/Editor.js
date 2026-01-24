/**
 * Pillars of Creation Maps - Editor
 * Text editor operations and management
 */

class Editor {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }

    /**
     * Get current editor content
     */
    getValue() {
        return this.element.value;
    }

    /**
     * Set editor content
     */
    setValue(value) {
        this.element.value = value;
    }

    /**
     * Insert text at end of current content
     */
    insert(text) {
        const current = this.element.value.trim();
        this.element.value = current + (current ? '\n' : '') + text;
        this.element.scrollTop = this.element.scrollHeight;
    }

    /**
     * Clear all editor content
     */
    clear() {
        this.element.value = '';
    }

    /**
     * Focus the editor
     */
    focus() {
        this.element.focus();
    }
}