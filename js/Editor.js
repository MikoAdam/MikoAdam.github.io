/**
 * Editor - Text editor operations
 */

class Editor {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }

    getValue() {
        return this.element.value;
    }

    setValue(value) {
        this.element.value = value;
    }

    insert(text) {
        const current = this.element.value.trim();
        this.element.value = current + (current ? '\n' : '') + text;
        this.element.scrollTop = this.element.scrollHeight;
    }

    clear() {
        this.element.value = '';
    }

    focus() {
        this.element.focus();
    }
}