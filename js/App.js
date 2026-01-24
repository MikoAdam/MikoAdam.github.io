/**
 * Pillars of Creation Maps - Main Application
 * Orchestrates all components and handles UI events
 */

class App {
    constructor() {
        this.geoData = new GeoData();
        this.renderer = null;
        this.parser = new ScriptParser();
        this.executor = null;
        this.editor = new Editor('editor');
        this.menu = null;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.recordingCanvas = null;
        this.recordingCtx = null;
    }

    /**
     * Initialize the application
     */
    async init() {
        this.setStatus('Loading map...');

        try {
            // Load geographic data
            await this.geoData.load();

            // Initialize renderer
            this.renderer = new MapRenderer('map', this.geoData);
            await this.renderer.init();

            // Initialize executor
            this.executor = new ScriptExecutor(this.renderer, this.geoData);

            // Initialize context menu
            this.menu = new ContextMenu(this.editor, this.renderer);

            // Setup event handlers
            this.setupEventHandlers();

            // Load examples
            this.loadExamples();

            this.setStatus('Ready - Right-click map for options');
        } catch (err) {
            console.error('Initialization failed:', err);
            this.setStatus('Error: ' + err.message);
        }
    }

    /**
     * Setup UI event handlers
     */
    setupEventHandlers() {
        // Style selector
        document.getElementById('styleSelect').addEventListener('change', (e) => {
            this.renderer.setStyle(e.target.value);
            this.updateSatelliteControls(e.target.value === 'satellite');
        });

        // Border toggle
        document.getElementById('showBorders').addEventListener('change', (e) => {
            this.renderer.toggleBorders(e.target.checked);
        });

        // Labels toggle
        document.getElementById('showLabels').addEventListener('change', (e) => {
            this.renderer.toggleLabels(e.target.checked);
        });

        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Right-click context menu
        this.renderer.on('contextmenu', (e) => {
            e.preventDefault();
            const feature = this.renderer.queryFeatures(e.point);
            this.menu.show(e.originalEvent, feature, e.lngLat);
        });
    }

    /**
     * Show/hide satellite-only controls
     */
    updateSatelliteControls(isSatellite) {
        document.querySelectorAll('.satellite-only').forEach(el => {
            el.style.display = isSatellite ? 'flex' : 'none';
        });
    }

    /**
     * Switch active tab
     */
    switchTab(tabName) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

        document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById('tab-' + tabName).classList.add('active');
    }

    /**
     * Load examples into sidebar
     */
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

    /**
     * Load an example into editor
     */
    loadExample(key) {
        this.editor.setValue(EXAMPLES[key].script);
        this.switchTab('editor');
    }

    /**
     * Run the animation script
     */
    async run() {
        const script = this.editor.getValue();
        const commands = this.parser.parse(script);

        if (!commands.length) {
            this.setStatus('No commands to run');
            return;
        }

        this.renderer.clearAll();
        this.setStatus('Running...');

        try {
            await this.executor.execute(commands);
            this.setStatus('Done ✨');
        } catch (err) {
            console.error('Execution error:', err);
            this.setStatus('Error: ' + err.message);
        }
    }

    /**
     * Clear all map content
     */
    clearAll() {
        this.renderer.clearAll();
        this.setStatus('Cleared');
    }

    /**
     * Insert command into editor
     */
    insertCommand(cmd) {
        this.editor.insert(cmd);
    }

    /**
     * Toggle fullscreen mode
     */
    toggleFullscreen() {
        const mapContainer = document.querySelector('.map-container');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            mapContainer.requestFullscreen();
        }
    }

    /**
     * Start video recording
     */
    startVideoRecording() {
        const mapCanvas = this.renderer.map.getCanvas();

        this.recordingCanvas = document.createElement('canvas');
        this.recordingCanvas.width = mapCanvas.width;
        this.recordingCanvas.height = mapCanvas.height;
        this.recordingCtx = this.recordingCanvas.getContext('2d');

        this.isRecording = true;
        this.drawRecordingFrame();

        const stream = this.recordingCanvas.captureStream(30);
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
        this.recordedChunks = [];

        this.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) this.recordedChunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
            this.isRecording = false;
            const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pillars-of-creation-map.webm';
            a.click();
            URL.revokeObjectURL(url);
            this.setStatus('Video saved!');
        };

        this.mediaRecorder.start();
        document.getElementById('recordBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'inline-block';
        this.setStatus('⏺ Recording...');
    }

    /**
     * Draw frame for video recording (with attribution)
     */
    drawRecordingFrame() {
        if (!this.isRecording) return;

        const mapCanvas = this.renderer.map.getCanvas();
        const ctx = this.recordingCtx;

        ctx.drawImage(mapCanvas, 0, 0);

        // Add attribution
        const isSatellite = document.getElementById('styleSelect').value === 'satellite';
        const text = isSatellite
            ? '© NASA GIBS · Natural Earth'
            : '© OpenFreeMap · Natural Earth';

        ctx.font = '12px Space Grotesk, sans-serif';
        const textWidth = ctx.measureText(text).width;
        const padding = 8;
        const x = this.recordingCanvas.width - textWidth - padding - 12;
        const y = this.recordingCanvas.height - 12;

        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.beginPath();
        ctx.roundRect(x - padding, y - 14, textWidth + padding * 2, 20, 4);
        ctx.fill();

        ctx.fillStyle = '#aaa';
        ctx.fillText(text, x, y);

        requestAnimationFrame(() => this.drawRecordingFrame());
    }

    /**
     * Stop video recording
     */
    stopVideoRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            document.getElementById('recordBtn').style.display = 'inline-block';
            document.getElementById('stopBtn').style.display = 'none';
            this.setStatus('Saving video...');
        }
    }

    /**
     * Set status message
     */
    setStatus(message) {
        document.getElementById('status').textContent = message;
    }
}