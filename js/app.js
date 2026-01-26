/**
 * ContextMenu - Right-click context menu for map
 */
class ContextMenu {
    constructor(editor, getZoom) {
        this.editor = editor;
        this.getZoom = getZoom;
        this.element = document.getElementById('contextMenu');
        this.titleElement = document.getElementById('menuTitle');
        this.selectedFeature = null;
        this.selectedColor = 'blue';
        this.clickLngLat = null;
        this.setupColorPalette();
        this.setupCloseHandler();
    }

    setupColorPalette() {
        const palette = document.getElementById('colorPalette');
        Object.entries(CONFIG.colors).forEach(([name, hex]) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch' + (name === 'blue' ? ' selected' : '');
            swatch.style.background = hex;
            swatch.title = name;
            swatch.onclick = (e) => {
                e.stopPropagation();
                this.selectColor(name, swatch);
            };
            palette.appendChild(swatch);
        });
    }

    setupCloseHandler() {
        document.addEventListener('click', () => this.close());
    }

    show(event, feature, lngLat) {
        this.selectedFeature = feature;
        this.clickLngLat = lngLat;
        if (feature) {
            this.titleElement.textContent = feature.type === 'region'
                ? `${feature.name}, ${feature.country}`
                : feature.name;
        } else {
            this.titleElement.textContent = `${lngLat.lat.toFixed(2)}, ${lngLat.lng.toFixed(2)}`;
        }
        this.element.style.left = event.clientX + 'px';
        this.element.style.top = event.clientY + 'px';
        this.element.classList.add('visible');
    }

    close() {
        this.element.classList.remove('visible');
    }

    selectColor(name, swatch) {
        this.selectedColor = name;
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
    }

    addRegion() {
        this.close();
        if (!this.selectedFeature) return;
        let line;
        if (this.selectedFeature.type === 'region') {
            line = `region: ${this.selectedFeature.name}, ${this.selectedFeature.country}, ${this.selectedColor}`;
        } else {
            line = `${this.selectedFeature.name.toLowerCase()}: ${this.selectedColor}`;
        }
        this.editor.insert(line);
    }

    addBubble() {
        this.close();
        if (!this.clickLngLat) return;
        const text = this.selectedFeature ? this.selectedFeature.name : 'Label';
        this.editor.insert(`bubble: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, "${text}", ${this.selectedColor}`);
    }

    addFly() {
        this.close();
        if (!this.clickLngLat) return;
        const zoom = Math.round(this.getZoom());
        this.editor.insert(`fly: ${this.clickLngLat.lat.toFixed(1)}, ${this.clickLngLat.lng.toFixed(1)}, ${zoom}`);
    }
}

/**
 * App - Main application controller with DVD-style controls
 */
class App {
    constructor() {
        this.geoData = new GeoData();
        this.renderer = null;
        this.parser = new ScriptParser();
        this.executor = null;
        this.editor = new Editor('editor');
        this.menu = null;
        this.isRunning = false;
        this.isPaused = false;
        this.commands = [];
        this.currentIndex = 0;
        this.scriptLines = [];
        this.highlightTimeout = null;
    }

    async init() {
        this.setStatus('Loading map...');
        await this.geoData.load();
        this.renderer = new MapRenderer('map', this.geoData);
        await this.renderer.init();
        this.executor = new ScriptExecutor(this.renderer, this.geoData);
        this.menu = new ContextMenu(this.editor, () => this.renderer.getZoom());
        this.setupEventHandlers();
        this.loadExamples();
        this.setStatus('Ready');
    }

    setupEventHandlers() {
        document.getElementById('styleSelect').addEventListener('change', e => {
            this.renderer.setStyle(e.target.value);
            this.updateSatelliteControls(e.target.value === 'satellite');
        });
        document.getElementById('showBorders').addEventListener('change', e => {
            this.renderer.toggleBorders(e.target.checked);
        });
        document.getElementById('showLabels').addEventListener('change', e => {
            this.renderer.toggleLabels(e.target.checked);
        });
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        this.renderer.on('contextmenu', e => {
            e.preventDefault();
            const feature = this.renderer.queryFeatures(e.point);
            this.menu.show(e.originalEvent, feature, e.lngLat);
        });
    }

    toggleFullscreen() {
        const mapContainer = document.querySelector('.map-container');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            mapContainer.requestFullscreen();
        }
    }

    updateSatelliteControls(isSatellite) {
        document.querySelectorAll('.satellite-only').forEach(el => {
            el.style.display = isSatellite ? 'flex' : 'none';
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById('tab-' + tabName).classList.add('active');
    }

    loadExamples() {
        const container = document.getElementById('examplesList');
        container.innerHTML = Object.entries(EXAMPLES).map(([key, example]) => `
            <div class="example-card" data-key="${key}">
                <h4>${example.title}</h4>
                <p>${example.description}</p>
            </div>
        `).join('');
        container.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', () => this.loadExample(card.dataset.key));
        });
    }

    loadExample(key) {
        this.editor.setValue(EXAMPLES[key].script);
        this.switchTab('editor');
    }

    highlightLine(lineIndex) {
        const editor = document.getElementById('editor');
        if (!editor) return;
        
        const lines = editor.value.split('\n');
        const beforeCursor = lines.slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0);
        const lineLength = lines[lineIndex] ? lines[lineIndex].length : 0;
        
        editor.focus();
        editor.setSelectionRange(beforeCursor, beforeCursor + lineLength);
        editor.scrollTop = Math.max(0, (lineIndex - 5) * 20);
        
        // Clear any existing timeout
        if (this.highlightTimeout) {
            clearTimeout(this.highlightTimeout);
        }
        
        // Keep highlight visible - don't auto-clear
    }

    clearHighlight() {
        const editor = document.getElementById('editor');
        if (editor) {
            editor.setSelectionRange(0, 0);
            editor.blur();
        }
    }

    updateTimeline() {
        const total = this.commands.length;
        const current = this.currentIndex;
        const progress = total > 0 ? (current / total) * 100 : 0;
        const progressBar = document.getElementById('timelineProgress');
        const position = document.getElementById('timelinePosition');
        if (progressBar) progressBar.style.width = progress + '%';
        if (position) position.textContent = `${current} / ${total}`;
        
        // Highlight current line
        if (this.scriptLines[this.currentIndex] !== undefined) {
            this.highlightLine(this.scriptLines[this.currentIndex]);
        } else {
            this.clearHighlight();
        }
    }

    showControls(running) {
        const runBtn = document.getElementById('runBtn');
        const dvdControls = document.getElementById('dvdControls');
        const dvdControls2 = document.getElementById('dvdControls2');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const stopBtn = document.getElementById('stopBtn');
        const playBtn = document.getElementById('playBtn');
        
        if (this.commands.length === 0) {
            if (runBtn) runBtn.style.display = 'block';
            if (dvdControls) dvdControls.style.display = 'none';
            if (dvdControls2) dvdControls2.style.display = 'none';
        } else {
            if (runBtn) runBtn.style.display = 'none';
            if (dvdControls) dvdControls.style.display = 'flex';
            if (dvdControls2) dvdControls2.style.display = 'flex';
            
            if (prevBtn) prevBtn.disabled = (this.currentIndex === 0);
            if (nextBtn) nextBtn.disabled = (this.currentIndex >= this.commands.length);
            if (stopBtn) stopBtn.disabled = !running;
            if (playBtn) playBtn.disabled = running || (this.currentIndex >= this.commands.length);
        }
    }

    stop() {
        this.isPaused = false;
        this.isRunning = false;
        this.showControls(false);
        this.setStatus('Stopped');
    }

    async run() {
        if (this.isRunning) return;
        
        const script = this.editor.getValue();
        const allLines = script.split('\n');
        
        // Only parse if we don't have commands yet or if at start
        if (this.commands.length === 0 || this.currentIndex === 0) {
            this.commands = [];
            this.scriptLines = [];
            
            allLines.forEach((line, index) => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const cmd = this.parser.parseLine(trimmed);
                    if (cmd) {
                        this.commands.push(cmd);
                        this.scriptLines.push(index);
                    }
                }
            });

            if (!this.commands.length) {
                this.setStatus('No commands to run');
                return;
            }
            
            this.renderer.clearAll();
            this.currentIndex = 0;
        }

        this.isRunning = true;
        this.showControls(true);
        this.updateTimeline();
        this.setStatus('Running...');

        while (this.currentIndex < this.commands.length && this.isRunning) {
            await this.executor.executeCommand(this.commands[this.currentIndex]);
            this.currentIndex++;
            this.updateTimeline();
        }

        this.isRunning = false;
        this.showControls(false);
        if (this.currentIndex >= this.commands.length) {
            this.setStatus('Done');
        }
    }

    async stepForward() {
        if (!this.commands.length) {
            await this.prepareCommands();
        }

        if (this.currentIndex < this.commands.length) {
            await this.executor.executeCommand(this.commands[this.currentIndex]);
            this.currentIndex++;
            this.updateTimeline();
            this.setStatus(`Step ${this.currentIndex} / ${this.commands.length}`);
        } else {
            this.setStatus('End');
        }
    }

    async stepBackward() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            
            // ALWAYS replay from start to maintain correct state
            this.renderer.clearAll();
            for (let i = 0; i < this.currentIndex; i++) {
                // Execute silently without delays for speed
                const cmd = this.commands[i];
                if (cmd.type !== 'wait') {
                    await this.executor.executeCommand(cmd);
                }
            }
            
            this.updateTimeline();
            this.setStatus(`Step ${this.currentIndex} / ${this.commands.length}`);
        } else {
            this.setStatus('Start');
        }
    }

    async prepareCommands() {
        const script = this.editor.getValue();
        const allLines = script.split('\n');
        this.commands = [];
        this.scriptLines = [];
        
        allLines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const cmd = this.parser.parseLine(trimmed);
                if (cmd) {
                    this.commands.push(cmd);
                    this.scriptLines.push(index);
                }
            }
        });

        if (!this.commands.length) return;
        this.renderer.clearAll();
        this.currentIndex = 0;
        this.showControls(false);
        this.updateTimeline();
    }

    restart() {
        this.isRunning = false;
        this.renderer.clearAll();
        this.currentIndex = 0;
        this.updateTimeline();
        this.clearHighlight();
        this.showControls(false);
        this.setStatus('Ready to run');
    }

    clearAll() {
        this.renderer.clearAll();
        this.commands = [];
        this.scriptLines = [];
        this.currentIndex = 0;
        this.clearHighlight();
        this.setStatus('Cleared');
    }

    insertCommand(cmd) {
        this.editor.insert(cmd);
    }

    setStatus(message) {
        const el = document.getElementById('status');
        if (el) el.textContent = message;
    }
}

const app = new App();
app.init().catch(err => {
    console.error('Failed to initialize:', err);
    const el = document.getElementById('status');
    if (el) el.textContent = 'Error: ' + err.message;
});
window.app = app;