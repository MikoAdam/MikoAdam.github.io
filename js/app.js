/**
 * Pillars of Creation Maps - Main Application
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

    async init() {
        this.setStatus('Loading map...');

        try {
            await this.geoData.load();

            this.renderer = new MapRenderer('map', this.geoData);
            await this.renderer.init();

            this.executor = new ScriptExecutor(this.renderer, this.geoData);

            this.menu = new ContextMenu(this.editor, this.renderer);

            this.setupEventHandlers();

            this.loadExamples();

            // Force camera to desired position after everything is loaded
            this.renderer.map.jumpTo({
                center: [20, 48],
                zoom: 3,
                pitch: 0,
                bearing: 0
            });

            this.setStatus('Ready');
        } catch (err) {
            console.error('Initialization failed:', err);
            this.setStatus('Error: ' + err.message);
        }
    }

    setupEventHandlers() {
        document.getElementById('styleSelect').addEventListener('change', (e) => {
            this.renderer.setStyle(e.target.value);
            this.updateSatelliteControls(e.target.value === 'satellite');
        });

        document.getElementById('showBorders').addEventListener('change', (e) => {
            this.renderer.toggleBorders(e.target.checked);
        });

        document.getElementById('showLabels').addEventListener('change', (e) => {
            this.renderer.toggleLabels(e.target.checked);
        });

        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        this.renderer.on('contextmenu', (e) => {
            e.preventDefault();
            const feature = this.renderer.queryFeatures(e.point);
            this.menu.show(e.originalEvent, feature, e.lngLat);
        });
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

    async run() {
        const script = this.editor.getValue();
        const commands = this.parser.parse(script);

        if (!commands.length) {
            this.setStatus('No commands to run');
            return;
        }

        this.renderer.clearAll();
        this.setStatus('Running animation...');

        try {
            await this.executor.execute(commands);
            this.setStatus('Done');
        } catch (err) {
            console.error('Execution error:', err);
            this.setStatus('Error: ' + err.message);
        }
    }

    clearAll() {
        this.renderer.clearAll();
        this.setStatus('Cleared');
    }

    insertCommand(cmd) {
        this.editor.insert(cmd);
    }

    toggleFullscreen() {
        const mapContainer = document.querySelector('.map-container');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            mapContainer.requestFullscreen();
        }
    }

    takeScreenshot() {
        const mapCanvas = this.renderer.map.getCanvas();
        
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = mapCanvas.width;
        tempCanvas.height = mapCanvas.height;
        const ctx = tempCanvas.getContext('2d');
        
        ctx.drawImage(mapCanvas, 0, 0);
        
        const isSatellite = document.getElementById('styleSelect').value === 'satellite';
        const text = isSatellite
            ? '© NASA GIBS · Natural Earth'
            : '© OpenFreeMap · Natural Earth';
        
        ctx.font = '14px Space Grotesk, sans-serif';
        const textWidth = ctx.measureText(text).width;
        const padding = 10;
        const x = tempCanvas.width - textWidth - padding - 14;
        const y = tempCanvas.height - 14;
        
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.beginPath();
        ctx.roundRect(x - padding, y - 16, textWidth + padding * 2, 24, 6);
        ctx.fill();
        
        ctx.fillStyle = '#aaa';
        ctx.fillText(text, x, y);
        
        tempCanvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pillars-of-creation-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
            this.setStatus('Screenshot saved!');
            
            setTimeout(() => this.setStatus('Ready'), 2000);
        }, 'image/png');
    }

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
        this.setStatus('Recording...');
    }

    drawRecordingFrame() {
        if (!this.isRecording) return;

        const mapCanvas = this.renderer.map.getCanvas();
        const ctx = this.recordingCtx;

        ctx.drawImage(mapCanvas, 0, 0);

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

    stopVideoRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            document.getElementById('recordBtn').style.display = 'inline-block';
            document.getElementById('stopBtn').style.display = 'none';
            this.setStatus('Saving video...');
        }
    }

    setStatus(message) {
        document.getElementById('status').textContent = message;
    }
}